from selenium.webdriver.common.by import By
from bs4 import BeautifulSoup
import json, time, os, requests, re, math

class YupooScraper:
    def __init__(self, config, database, driver, emojis):
        self.cfg = config
        self.db = database
        self.emojis = emojis
        self.driver = driver
        self.conversionRate = self.calcYuan()
        self.brands = self.loadBrandDB()
        self.types = self.loadTypeDB()
    
    def loadTypeDB(self):
        f = open("./data/type_db.json", 'r')
        type_db = json.loads(f.read())
        f.close()
        return type_db

    def loadBrandDB(self):
        brand_db = {}
        
        f = open("./data/brand_db.json", 'r')
        db = json.loads(f.read())
        f.close()

        for brand in db["brands"].keys():
            for alias in db["brands"][brand]["aliases"]:
                if self.emojis: # Using Emojis
                    for emoji in list(self.emojis.keys()):
                        if emoji in alias:
                            alias = alias.replace(emoji, self.emojis[emoji])
                else:
                    print("[!] Warning: Not using any emojis for the brand decoding process!")
                brand_db[alias] = db["brands"][brand]["name"]
        
        return brand_db
    
    def calcYuan(self):
        r = requests.get('https://api.frankfurter.app/latest?amount=1&from=EUR&to=CNY')
        if r.status_code != 200:
            print("[Y] Warning: Failed to parse the conversion rate\n > Now: Using a static conversion of 1Euro -> 7.8414 YUAN")
            return {
                "yuanToEuro": 7.8414,
                "euroToYuan": 0.12753
            }
        else:
            conv = r.json()
            eurToYuan = round(1/conv["rates"]["CNY"], 5)
            print("[Y] Now using conversion: 1EURO -> {} YUAN".format(eurToYuan))
            return {
                "yuanToEuro": conv["rates"]["CNY"],
                "euroToYuan": eurToYuan
            }

    def loadCategories(self, seller, url):
        if "URLwhitelist" in seller.keys():
            print("[Y] Found URL whitelist with {} categories".format(len(seller["URLwhitelist"])))
            return seller["URLwhitelist"]

        categories = []
        self.driver.get(url)
        s = BeautifulSoup(self.driver.page_source, 'html.parser')
        cats = s.find_all('div', {"class": "yupoo-collapse-header"})
        
        for cat in cats:
            x = str(cat).split("a href=\"")[-1]
            catName = x.split(">")[1].split("</")[0]
            c = {
                "name": catName,
                "url": url+x.split("\" ")[0].split("/")[-1]
            }
            save = True

            # BLACKLIST
            for black in self.cfg["blacklist"]:
                if black.lower() in catName.lower():
                    save = False
                    break
            
            # WHITELIST
            if "whitelist" in seller.keys():
                save = False
                for white in seller["whitelist"]:
                    if white.lower() in catName.lower():
                        save = True
                        break
            
            # SAVING
            if save:
                categories.append(c)
        
        print("[Y] Found {} categories on '{}'".format(len(categories), url))
        return categories
    
    def scrapeCategory(self, seller, category):
        scraped = []
        
        print("[Y] Scraping category {} on url '{}'".format(category["name"], category["url"]))
        self.driver.get(category["url"])
        s = BeautifulSoup(self.driver.page_source, 'html.parser')
        
        emptyCat = s.find_all('div', { "class": "empty_emptymain" })
        if len(emptyCat) > 0 : # Empty category detected
            print("[Y] Empty category detected")
            return None
        
        pages = int((s.find_all('span', {"class": "categories__box-right-pagination-span"})[0].text).split(" / ")[-1])
        for p in range(pages):
            print("[Y] Scraping page {} / {}".format(p+1, pages))
            if p != 0: # Load the next page
                self.driver.get(category["url"]+"?page={}".format(p+1))
                s = BeautifulSoup(self.driver.page_source, 'html.parser')
            
            items = s.find_all('div', { "class": "categories__children" })
            print("[Y] Found {} items on page {}".format(len(items), p+1))
            for item in items:
                link = category["url"].split("/categories")[0] + item.find_all('a', href=True)[0]['href']
                itemID = link.split("/")[-1].split("?")[0] + "_" + link.split("=")[-1]
                imagePath = "./data/images/"+seller["name"].replace(" ", "_").lower()+"/"+itemID

                if not os.path.exists("./data/images/"+seller["name"].replace(" ", "_").lower()):
                    os.mkdir("./data/images/"+seller["name"].replace(" ", "_").lower())

                i = {
                    "imagePath": imagePath,
                    "link": link,
                    "id": itemID,
                }

                if "items" in category.keys():
                    if "type" in category["items"].keys():
                        i["type"] = category["items"]["type"]
                    if "brand" in category["items"].keys():
                        i["brand"] = category["items"]["brand"]

                scraped.append(i)

        return scraped
    
    def parseCategory(self, seller, category, scraped):
        print("[Y] Parsing {} items in category: '{}'".format(len(scraped), category["name"]))
        parsed = []
        
        for item in scraped:
            try:
                if item["id"] in self.db["known"]:
                    print("[Y] Item {} is already in our database!".format(item["id"]))
                    parsed.append(self.db["items"][item["id"]])
                    continue
                self.driver.get(item["link"])
                s = BeautifulSoup(self.driver.page_source, 'html.parser')
                
                name = s.find_all('span', { "class": "showalbumheader__gallerytitle" })[0].text
                w2c = s.find_all('div', { "class": "showalbumheader__gallerysubtitle" })[0].find_all('a')[0].text
                iconID = s.find_all('img', { "class": "autocover" })[0]['src'].split("/")[-2]

                images = self.driver.find_elements(By.CLASS_NAME, "image__imagewrap")
                c = 1
                
                images[0].click()
                time.sleep(self.cfg["options"]["image_load_time"])
                sizeChart = False
                iconImg = False
                while True:
                    nextImg = self.driver.find_element(By.CLASS_NAME, "viewer__next")
                    if not nextImg:
                        break
                    
                    viewer = self.driver.find_element(By.CLASS_NAME, "viewer__img")
                    loadts = time.time()
                    while "viewer__loading" in viewer.get_attribute("class").split(" "): # Wait for the image to load
                        time.sleep(self.cfg["options"]["image_load_time"])
                        viewer = self.driver.find_element(By.CLASS_NAME, "viewer__img")
                        if loadts+self.cfg["options"]["image_load_timeout"] < time.time(): # Load timeout
                            self.driver.back()
                            print("Image load timeout exceeded {} seconds".format(self.cfg["options"]["image_load_timeout"]))
                            break
                    if loadts+self.cfg["options"]["image_load_timeout"] < time.time():
                        continue
                    if "displaynone" in viewer.get_attribute("class").split(" "): # If its a video, skip it
                        try:
                            nextImg.click()
                        except:
                            break
                        time.sleep(self.cfg["options"]["image_load_time"])
                        continue
                    
                    if viewer.get_attribute("src").split("/")[-2] == iconID: # If the image is used as an icon
                        viewer.screenshot(item["imagePath"]+"_icon.png")
                        iconImg = True
                    elif not sizeChart:
                        viewer.screenshot(item["imagePath"]+"_size.png")
                        sizeChart = True
                    if sizeChart and iconImg:
                        break
                    
                    try:
                        nextImg.click()
                    except:
                        break
                    time.sleep(self.cfg["options"]["image_load_time"])
                    c += 1
                
                i = { # FINAL ITEM SCRTUCTURE
                    "name": "",
                    "desc": "",
                    "price": [], # (Min value, Max value)
                    "basePrice": {
                        "yuan": [],
                        "euro": []
                    },
                    "brand": [],
                    "type": [],
                    "w2c": w2c,
                    "yupoo": item["link"],
                    "id": item["id"],
                    "seller": seller["name"].lower().replace(" ", "_")
                }
                
                if "items" in category.keys(): # Applying prespecified info
                    if "type" in category["items"].keys():
                        if type(category["items"]["type"]) is str:
                            i["type"] = [ category["items"]["type"] ]
                        else:
                            i["type"] = category["items"]["type"]
                    if "brand" in category["items"].keys():
                        i["brand"] = category["items"]["brand"]

                if "husky" in seller["name"] or True: # 'or True' ==> DEFAULT NAME PARSING ROUTE
                    # SKIPPING ITEMS WE CANNOT PARSE
                    nums = re.findall(r'\d+', name)
                    if len(nums) == 0:
                        print("[Y] ! Warning: Didn't find any numbers in item named '{}'\n >> Skipping item...".format(name))
                        continue
                    if "￥" not in name:
                        print("[Y] ! Warning: Didn't find YUAN in item named '{}'\n >> Skipping item...".format(name))
                        continue
                    if name.count("￥") > len(nums):
                        print("[Y] ! Warning: There are {} prices in item named '{}' but only {} numbers\n >> Skipping item...".format(name.count("￥"), name, len(nums)))
                        continue
                    
                    # NAME PARSING
                    i["name"] = name.split("（")[0].split("(")[0].replace(".", "").replace("~", "").replace(",", "").replace(self.emojis["<FIRE>"], "")
                    i["name"] = i["name"][i["name"].index(str(nums[0]))+len(str(nums[0])):]

                    # TYPE PARSING
                    detected = [] # !
                    for t in list(self.types.keys()):
                        if t in name and t not in detected:
                            detected.append(t)
                    if "items" in category.keys() and "type" in category["items"].keys(): # We can modify predetermined item types here
                        if len(detected) > 0:
                            i["type"] = []
                            for t in detected:
                                i["type"].append(self.types[t])
                    else:
                        for t in detected:
                            i["type"].append(self.types[t])

                    # DESCRIPTION PARSING
                    if "（" in name:
                        i["desc"] = name.split("（")[1].replace("）", "")
                    elif "(" in name:
                        i["desc"] = name.split("(")[1].replace(")", "")
                    else:
                        i["desc"] = None
                    if i["desc"] is not None:
                        if i["desc"][-4:] == "phot":
                            i["desc"] += "o"
                    
                    # BRAND DECODING + PARSING
                    foundBrands = []
                    for brand in list(self.brands.keys()):
                        if brand in i["name"]: # Brand found in decoding table
                            foundBrands.append(brand)
                            i["brand"].append(self.brands[brand])
                            i["name"] = i["name"].replace(brand, "") # Remove the brand from the item name
                    
                    if len(foundBrands) < i["name"].upper().count(" X ") + 1: # If there were brands that were not found in the decoding table
                        for namePart in i["name"].split(" X "):
                            for idx in range(len(namePart)):
                                if namePart[idx].isalpha():
                                    break
                            if len(namePart) > 0:
                                namePart = namePart[idx:].split(" ")[0]
                                namePart = namePart[0].upper() + namePart[1:].lower()
                                i["brand"].append(namePart)
                    
                    # NAME PARSING - REMOVING SPACES AFTER BRAND DECODING
                    while i["name"][0] == " ": # Remove additional spaces at the start
                        i["name"] = i["name"][1:]
                    while i["name"][-1] == " ": # Remove additional spaces at the end
                        i["name"] = i["name"][:-1]

                    # BASE PRICE PARSING
                    for x in range(name.count("￥")):
                        i["basePrice"]["yuan"].append( int(nums[x]) )
                        i["basePrice"]["euro"].append( round(i["basePrice"]["yuan"][x]/self.conversionRate["yuanToEuro"], 2) )
                    
                    # PRICE PARSING
                    for basePrice in i["basePrice"]["euro"]:
                        rounded = round(basePrice/5)*5
                        i["price"].append( (rounded, rounded+(5*(math.floor(rounded/50) + 1))) )
                    
                    # TYPE PARSING (FULL DETECTION IS NOT REQUIRED WITH HUSKY REPS (hopefully))
                    if len(i["type"]) > 1:
                        i["type"] = i["type"][:name.count("￥")]
                    
                    print("[Y] Parsed an {} {} selling for ￥ {}".format(i["brand"], i["type"], i["basePrice"]["yuan"]))
            except Exception as e:
                print("[Y] Unknown exception occurred: {}\n >> Skipping item...".format(str(e)))
                continue

            parsed.append(i)
        return parsed

    def scrape(self, seller, url):
        # Create directories for the item imgs
        if not os.path.exists("./data/images"):
            os.mkdir("./data/images")
        print("[Y] Scraping '{}'".format(url))
        
        categories = self.loadCategories(seller, url)
        items = []
        for cat in categories:
            data = self.scrapeCategory(seller, cat)
            parsed = self.parseCategory(seller, cat, data)
            items += parsed
        return items