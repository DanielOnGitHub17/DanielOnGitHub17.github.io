import os, json, sys, cgi, cgitb, datetime
from zipfile import ZipFile as Z
import zipfile;
P = print
cgitb.enable()
P('Content-type: html')
P()
form = cgi.FieldStorage()

files = json.loads(form.getfirst('files'));
archivename = form.getfirst('archivename');
toadd = form.getfirst('toadd');
if archivename:
    m = 'w'
elif toadd:
    m = 'a'
    archivename = toadd
else:
    m='w'
    archivename=''
    for jj in files:
        archivename+=jj[0:1];
archivename += '.zip'
user = form.getfirst('user')
os.chdir(f'users/{user}')
with open('details.json') as file: details = json.load(file)
if m=='w':
    details['archives'][archivename] = {}
    details['archives'][archivename]['files'] = [];
    details['archives'][archivename]['size']=0;
with Z(archivename, m, zipfile.ZIP_DEFLATED, compresslevel=9) as archive:
    for file in files:
        archive.write(file, compresslevel=9)
        nn = json.loads(json.dumps(details['files' if file in details['files'] else 'archives'][file]))
        nn['name'] = file;
        details['archives'][archivename]['files'].append(nn)
        details['archives'][archivename]['size']+=nn['size']

details['archives'][archivename]['Date Modified'] = str(datetime.datetime.now())
with open('details.json', 'w') as file: json.dump(details, file)
P('Action Successful')