import urllib, json, os, zlib, sys, site
import urllib.parse as u
from pathlib import Path
from datetime import datetime
from zipfile import ZipFile as Z
from email.message import EmailMessage as M

#import all from urllib
for x in [y.split('.')[0] for y in os.listdir(urllib.__path__[0])[0:5]]:
    exec(f"from urllib import {x}")
sys.stderr = sys.stdout
P = p = print
form = u.parse_qs(os.environ["QUERY_STRING"])
for x in form:
    form[x] = form[x][0]
P('Content-type: html')
P()
P(form)
l = M()
p(l)

p("message")
# for x in dir(site):
#     print(x, ": ", eval(f"site.{x}"), sep='')

p(dir(robotparser))