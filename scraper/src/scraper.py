from src.yupoo import YupooScraper
from selenium import webdriver
import os, json

class Scraper:
    def __init__(self, config, emojis=None) -> None:
        self.cfg = config
        self.emojis = emojis
        self.driver = webdriver.Chrome()
        self.db = self.loadDatabase()
        self.yupoo = YupooScraper(self.cfg, self.db, self.driver, self.emojis)
    
    def loadDatabase(self):
        if not os.path.exists("../src/config/db.json"):
            db = {
                "shops": []
            }
            f = open("../src/config/db.json", 'w')
            f.write(json.dumps(db, indent=4))
            f.close()
            return { "known": [] }
        else:
            f = open("../src/config/db.json")
            db = json.loads(f.read())
            f.close()

            known, itemDB = [], {}
            for shop in db["shops"]:
                for item in db[shop]:
                    known.append(item["id"])
                    itemDB[item["id"]] = item
            
            return { "known": known, "items": itemDB }

    
    def updateDatabase(self, seller, shop, data):
        f = open("../src/config/db.json", 'r')
        db = json.loads(f.read())
        f.close()

        shopID = shop.split(".")[0].replace("https://", "").replace("http://", "").replace("-", "_")

        if shopID not in db["shops"]:
            db["shops"].append(shopID)
        
        db[shopID] = data

        f = open("../src/config/db.json", 'w')
        f.write(json.dumps(db, indent=4))
        f.close()

    def run(self):
        for seller in self.cfg["sellers"].keys():
            for shop in self.cfg["sellers"][seller]["shops"]:
                print("[S] Found {} with url '{}'".format(seller, shop))
                data = self.yupoo.scrape(self.cfg["sellers"][seller], shop)
                print("[S] Successfully scraped {} items! ({} c)".format(len(data), len(str(data))))
                print("[S] Updating database...")
                self.updateDatabase(seller, shop, data)
        print("[S] Shutting down the Chrome driver...")
        self.driver.close()
        print("[S] Saving the database...")