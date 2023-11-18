from src.yupoo import YupooScraper
from selenium import webdriver
import os, json

class Scraper:
    def __init__(self, config, emojis=None) -> None:
        self.cfg = config
        self.emojis = emojis
        self.loadDatabase()
        self.driver = webdriver.Chrome()
        self.yupoo = YupooScraper(self.cfg, self.db, self.driver, self.emojis)
    
    def loadDatabase(self):
        if os.path.isfile("./data/database.json"):
            f = open("./data/database.json", 'r')
            self.db = json.loads(f.read())
        else:
            f = open("./data/databaseTemplate.json", 'r')
            self.db = json.loads(f.read())
        f.close()
    
    def saveDatabases(self):
        f = open("./data/database.json", 'w')
        f.write(json.dumps(self.db))
        f.close()

    def run(self):
        for seller in self.cfg["sellers"].keys():
            for shop in self.cfg["sellers"][seller]["shops"]:
                print("[S] Found {} with url '{}'".format(seller, shop))
                self.yupoo.scrape(self.cfg["sellers"][seller], shop)
        print("[S] Shutting down the Chrome driver...")
        self.driver.close()