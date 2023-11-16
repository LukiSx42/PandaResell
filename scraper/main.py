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
for seller in config["sellers"].keys():
    for decoder in list(config["sellers"][seller]["brandDecoder"].keys()).copy():
        for emoji in emoji_db.keys():
            if emoji in decoder:
                config["sellers"][seller]["brandDecoder"][decoder.replace(emoji, emoji_db[emoji])] = config["sellers"][seller]["brandDecoder"].pop(decoder)


## STARTING SCRAPER ##
s = Scraper(config)
s.run()