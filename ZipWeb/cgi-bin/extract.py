import cgi, cgitb, os, json, zipfile
from datetime import datetime
from zipfile import ZipFile as Z
cgitb.enable()
form = cgi.FieldStorage()
P=print
P('Content-type: html')
P()
archivename = form.getfirst('archivename');
path = form.getfirst('user');
files = json.loads(form.getfirst('files'));
os.chdir(f'users/{path}')
if os.path.isdir('extracted'): os.system('rmdir extracted /s /q');
os.mkdir('extracted');
with Z(archivename) as arc:
    arc.extractall(path='extracted', members=files)
P('Action successful')