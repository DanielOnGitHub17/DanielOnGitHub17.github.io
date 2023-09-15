import cgi, json
F = cgi.FieldStorage()
h = F.getfirst('num')
with open('hii.txt', 'a') as aa:
    aa.write(h)