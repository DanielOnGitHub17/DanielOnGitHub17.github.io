from general import *
whose = request['whose'].value;
with open(f"chats/{whose}/details.json") as j:
    detail = json.load(j);
    detail['online']=False;
    detail['log']=str(datetime.now())
with open(f"chats/{whose}/details.json", 'w') as j:
    json.dump(detail, j);
leave("successful")