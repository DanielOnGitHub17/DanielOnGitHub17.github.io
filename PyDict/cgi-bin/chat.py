import cgi, cgitb, os, sys
P = print
x = cgi.FieldStorage().getfirst("name")
P("Content-type: html")
P()
P(f"Hello {x}!")
