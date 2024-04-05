import cgi, cgitb, os, json
from datetime import datetime
cgitb.enable()
form = cgi.FieldStorage()
P=print
P('Content-type: html')
P()
folder = form.getfirst('username')
obj = json.loads(form.getfirst('files'))
which = obj['which']
os.chdir('users'); os.chdir(folder);
with open('details.json') as file: details = json.load(file)

with open(obj['name'], obj['mode']+'b+') as newfile:
    newfile.write(bytearray(obj['text']))

details[which][obj['name']] = {}

with open(obj['name'], 'rb') as justcreatedfile:
    details[which][obj['name']]['size'] = len(justcreatedfile.read())

details[which][obj['name']]['Date Modified'] = str(datetime.now());

with open('details.json', 'w') as file: json.dump(details, file);

P(json.dumps(details))