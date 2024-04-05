from imp import *
folder = form["username"]
obj = json.loads(form["files"])
which = obj['which']
os.chdir(f'users/{folder}');
with open('details.json') as file: details = json.load(file)

with open(obj['name'], obj['mode']+'b+') as newfile:
    newfile.write(bytearray(obj['text']))

details[which][obj['name']] = {}

with open(obj['name'], 'rb') as justcreatedfile:
    details[which][obj['name']]['size'] = len(justcreatedfile.read())

details[which][obj['name']]['Date Modified'] = str(datetime.now());

with open('details.json', 'w') as file: json.dump(details, file);

P(json.dumps(details))
#Just in case: I had a plan of uploading the files, first into a
#json file by the numbers, but I have found a better way: Thank God