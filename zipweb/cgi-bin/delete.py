from imp import *
os.chdir(f"users/{form['path']}");
fiLe = form['filename'];
change = False
try:
    os.remove(f"{form['filename']}");
    P(f"{fiLe} was successfully deleted"); change = True;
except:
    P(f"Sorry, failed to delete {fiLe}")

if change:
    with open('details.json', 'r') as file:
        details = json.load(file);
        del details['files' if fiLe in details['files'] else 'archives'][fiLe]
    with open('details.json', 'w') as file:
        json.dump(details, file)