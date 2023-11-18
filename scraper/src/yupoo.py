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
    
    def loadBrandDB(self):
        brand_db = {}
        
        f = open("./data/brand_db.json", 'r')
        db = json.loads(f.read())
        f.close()

        for brand in db["brands"].keys():
            for alias in db["brands"][brand]["aliases"] + [ brand ]:
                if self.emojis: # Using Emojis
                    for emoji in list(self.emojis.keys()):
                        if emoji in alias:
                            alias.replace(emoji, self.emojis[emoji])
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
                iconPath = "./data/images/"+seller["name"].replace(" ", "_").lower()+"/"+itemID+"/icon.png"
                imagePath = "./data/images/"+seller["name"].replace(" ", "_").lower()+"/"+itemID

                # Create directories for the item imgs
                if not os.path.exists("./data/images"):
                    os.mkdir("./data/images")
                if not os.path.exists("./data/images/"+seller["name"].replace(" ", "_").lower()):
                    os.mkdir("./data/images/"+seller["name"].replace(" ", "_").lower())
                if not os.path.exists("./data/images/"+seller["name"].replace(" ", "_").lower()+"/"+itemID):
                    os.mkdir("./data/images/"+seller["name"].replace(" ", "_").lower()+"/"+itemID)

                i = {
                    "iconPath": iconPath,
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
                return scraped # DEBUG

        return scraped
    
    def parseCategory(self, seller, category, scraped):
        print("[Y] Parsing {} items in category: '{}'".format(len(scraped), category["name"]))
        parsed = []
        
        for item in scraped:
            self.driver.get(item["link"])
            s = BeautifulSoup(self.driver.page_source, 'html.parser')
            
            name = s.find_all('span', { "class": "showalbumheader__gallerytitle" })[0].text
            print("Name: {}".format(name))
            w2c = s.find_all('div', { "class": "showalbumheader__gallerysubtitle" })[0].find_all('a')[0].text
            print("W2C: {}".format(w2c))
            iconID = s.find_all('img', { "class": "autocover" })[0]['src'].split("/")[-2]
            print("iconID: {}".format(iconID))

            images = self.driver.find_elements(By.CLASS_NAME, "image__imagewrap")
            c = 1
            for image in images:
                if image.get_attribute("data-type") == "photo": # Click on the image and save it
                    image.click()
                    time.sleep(self.cfg["options"]["image_load_time"])
                    viewer = self.driver.find_element(By.CLASS_NAME, "viewer__img")
                    if viewer.get_attribute("src").split("/")[-2] == iconID: # If the image is used as an icon
                        viewer.screenshot(item["iconPath"])
                    viewer.screenshot(item["imagePath"]+"/"+str(c)+".png")
                    self.driver.back()
                    c += 1
            
            i = { # FINAL ITEM SCRTUCTURE
                "name": "",
                "price": (0, 0), # Min value and Max value
                "basePrice": {
                    "yuan": 0,
                    "euro": 0
                },
                "brand": "",
                "type": "",
            }
            
            if "items" in category.keys(): # Applying prespecified info
                if "type" in category["items"].keys():
                    i["type"] = category["items"]["type"]
                if "brand" in category["items"].keys():
                    i["brand"] = category["items"]["brand"]

            if "husky" in seller["name"] or True: # DEFAULT NAME PARSING ROUTE
                # SKIPPING ITEMS WE CANNOT PARSE
                nums = re.findall(r'\d+', name)
                if len(nums) == 0:
                    print("[Y] ! Warning: Didn't find any numbers in item named '{}'\n >> Skipping item...".format(name))
                    continue
                if "￥" not in name:
                    print("[Y] ! Warning: Didn't find YUAN in item named '{}'\n >> Skipping item...".format(name))
                    continue
                
                # NAME PARSING
                i["name"] = name.split("(")[0].replace(".", "").replace("~", "").replace(",", "")
                i["name"] = i["name"][i["name"].index(str(nums[0]))+len(str(nums[0])):]
                
                # BRAND DECODING + PARSING
                for brand in list(self.brands.keys()) + [ "" ]:
                    if brand in i["name"]:
                        break
                if brand == "": # Brand not found in name of the item -> skipping...
                    print("[Y] ! Warning: No brand was found in item '{}'\n > Skipping item...".format(i["name"]))
                    continue
                i["brand"] = self.brands[brand]
                
                # NAME PARSING - REMOVING SPACES AFTER BRAND DECODING
                i["name"] = i["name"].replace(brand, "") # Removing brand from item name
                while i["name"][0] == " ": # Remove additional spaces at the start
                    i["name"] = i["name"][1:]
                while i["name"][-1] == " ": # Remove additional spaces at the end
                    i["name"] = i["name"][:-1]

                # BASE PRICE PARSING
                i["basePrice"]["yuan"] = int(nums[0])
                i["basePrice"]["eur"] = round(i["basePrice"]["yuan"]/self.conversionRate["yuanToEur"], 2)
                
                # PRICE PARSING
                rounded = round(i["basePrice"]["eur"]/5)*5
                i["price"] = (rounded, rounded+(5*(math.floor(rounded/50) + 1)))
                
                # TODO: TYPE PARSING (NOT REQUIRED WITH HUSKY REPS)
                print(i)
                self.driver.close()
                exit()

            parsed.append(i)

            self.driver.close()
            exit()

    def scrape(self, seller, url):
        print("[Y] Scraping '{}'".format(url))
        categories = self.loadCategories(seller, url)
        items = []
        for cat in categories:
            data = self.scrapeCategory(seller, cat)
            parsed = self.parseCategory(seller, cat, data)