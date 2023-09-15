import cgi, cgitb, os, json, zipfile
from datetime import datetime as D
from zipfile import ZipFile as Z
cgitb.enable()
form = cgi.FieldStorage()
P=print
P('Content-type: html')
P()
folder = form.getfirst('username')
arcname = form.getfirst('archive')
os.chdir(f'users/{folder}')
with open('details.json') as file: details=json.load(file);
if zipfile.is_zipfile(arcname):
    with Z(arcname) as arc: pass;
    details['archives'][arcname]['files'] = [{'name': f.filename, 'size': f.file_size, 'Date Modified': str(D(*f.date_time))} for f in arc.filelist]
    print('true')
else:
    details['files'][arcname] = details['archives'][arcname]
    del details['archives'][arcname]
    print('false')
with open('details.json', 'w') as file: json.dump(details, file);