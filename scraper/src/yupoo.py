from selenium.webdriver.common.by import By
from bs4 import BeautifulSoup
import json, time, os, urllib

class YupooScraper:
    def __init__(self, config, database, driver):
        self.cfg = config
        self.db = database
        self.loadCookies()
        self.driver = driver
    
    def loadCookies(self):
        f = open('./data/cookies.json', 'r')
        self.cookies = json.loads(f.read())["cookies"]
        f.close()

        if type(self.cookies) == list:
            newCookies = {}
            for cookie in self.cookies:
                if cookie["expirationDate"] < time.time():
                    print("[Y] Warning: Cookies are outdated!")
                newCookies[cookie["name"]] = cookie["value"]
            self.cookies = newCookies

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

                # Create directories for the item imgs
                if not os.path.exists("./data/images"):
                    os.mkdir("./data/images")
                if not os.path.exists("./data/images/"+seller["name"].replace(" ", "_").lower()):
                    os.mkdir("./data/images/"+seller["name"].replace(" ", "_").lower())
                if not os.path.exists("./data/images/"+seller["name"].replace(" ", "_").lower()+"/"+itemID):
                    os.mkdir("./data/images/"+seller["name"].replace(" ", "_").lower()+"/"+itemID)

                i = {
                    "iconPath": iconPath,
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
        for item in scraped:
            pass

    def scrape(self, seller, url):
        print("[Y] Scraping '{}'".format(url))
        categories = self.loadCategories(seller, url)
        items = []
        for cat in categories:
            data = self.scrapeCategory(seller, cat)
            self.parseCategory(seller, cat, data)