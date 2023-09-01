import cgi, cgitb, os, json
cgitb.enable()
form = cgi.FieldStorage();
P=print
P('Content-type: html')
P()
os.chdir(f"users/{form.getfirst('path')}");
fiLe = form.getfirst('filename');
change = False
try:
    os.remove(f"{form.getfirst('filename')}");
    P(f"{fiLe} was successfully deleted"); change = True;
except:
    P(f"Sorry, failed to delete {fiLe}")

if change:
    with open('details.json', 'r') as file:
        details = json.load(file);
        del details['files' if fiLe in details['files'] else 'archives'][fiLe]
    with open('details.json', 'w') as file:
        json.dump(details, file)