import urllib, json, os, zlib, sys
import urllib.parse as u
from pathlib import Path
from datetime import datetime
from zipfile import ZipFile as Z
sys.stderr = sys.stdout
P = p = print
form = u.parse_qs(os.environ["QUERY_STRING"])
for x in form:
    form[x] = form[x][0]
P('Content-type: html')
P()