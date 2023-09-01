import cgi, cgitb, os, json
from datetime import datetime
cgitb.enable()
form = cgi.FieldStorage()
P=print
P('Content-type: html')
P()
folder = form.getfirst('username')
obj = json.loads(form.getfirst('files'))
os.chdir('users'); os.chdir(folder);
with open('details.json') as file: details = json.load(file)

with open(obj['name'], obj['mode']+'b+') as newfile:
    newfile.write(bytearray(obj['text']))

details['files'][obj['name']] = {}

with open(obj['name'], 'rb') as justcreatedfile:
    details['files'][obj['name']]['size'] = len(justcreatedfile.read())

details['files'][obj['name']]['Date Modified'] = str(datetime.now());

with open('details.json', 'w') as file: json.dump(details, file);

P(json.dumps(details))