import cgi, cgitb, os, json, zipfile
from datetime import datetime
from zipfile import ZipFile as Z
cgitb.enable()
form = cgi.FieldStorage()
P=print
P('Content-type: html')
P()
folder = form.getfirst('username')
obj = json.loads(form.getfirst('files'))
os.chdir('users'); os.chdir(folder);
s = '';
if obj['mode'] == 's':
    s = obj['mode']
    obj['mode'] = 'a';
with open('details.json') as file: details = json.load(file)

with open(obj['name'], obj['mode']+'b+') as newfile:
    newfile.write(bytearray(obj['text']))

details['archives'][obj['name']] = {}

with open(obj['name'], 'rb') as justcreatedfile:
    details['archives'][obj['name']]['size'] = len(justcreatedfile.read())

details['archives'][obj['name']]['Date Modified'] = str(datetime.now());
if(s=='s'):
    if zipfile.is_zipfile(obj['name']):
        'codes'
    else:
        'reverse turn it to file'

with open('details.json', 'w') as file: json.dump(details, file);
P(json.dumps(details))
# later just add these to codes