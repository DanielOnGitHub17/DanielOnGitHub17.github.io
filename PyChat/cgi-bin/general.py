import cgi, cgitb, os, json, sys
from datetime import datetime
sys.stderr = sys.stdout
P = print
request = cgi.FieldStorage();
def leave(text):
    if type(text)==str:
        P(text)
    else:
        P(json.dumps(text));
    exit()
P("Content-Type: text/html")
P()