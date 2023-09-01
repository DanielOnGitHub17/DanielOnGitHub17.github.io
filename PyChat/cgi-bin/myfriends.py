from general import *
from glob import glob
whose = request["whose"].value
def getDetail(friend):
    with open(f"chats/{friend}/details.json") as f:
        return json.load(f)
with open(f"chats/{whose}/details.json") as j:
    ff = json.load(j)["friends"]
    leave([1, [getDetail(x) for x in ff]])