from imp import *
path = form["user"]
archive = form["archivename"]
# with open("check.txt", "w") as df: df.write(str(form))
arcname = archive+".zip"
os.chdir(f"users/{path}")
obj = {"files": [], "Date Modified": str(datetime.now())}
with Z(arcname, 'w'): pass
with open(arcname, "rb") as arc: obj["size"]=len(arc.read())
with open("details.json", 'r') as file:
    details = json.load(file)

details["archives"][arcname] = obj;
with open("details.json", 'w') as file: json.dump(details, file)
P("Action Successful")