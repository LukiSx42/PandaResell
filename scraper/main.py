from src.scraper import Scraper
import json


## CONFIG ##
config = None
if not config:
    f = open("./data/config.json", 'r')
    config = json.loads(f.read())
    f.close()


## ASCII EMOJIS DECODING ##
emoji_db = {
    "<STAR>": '⭐'
}

## STARTING SCRAPER ##
s = Scraper(config, emojis=emoji_db)
s.run()