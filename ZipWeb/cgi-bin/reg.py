from all import *
form = cgi.FieldStorage()
get = lambda name: form.getfirst(name)
jpath = 'users/users.json'
hold = os.getcwd();
with open(jpath) as file: all_users = json.load(file)
UN = get('username')
def leave(msg='Action Successful', ok=1):
    os.chdir(hold)
    with open(jpath, 'w') as file: json.dump(all_users, file)
    p(json.dumps([msg, ok]))
    exit()
# for all these above maybe i'll just write a py file containing it and then
#call 'from starters import *'
P('Content-type: html')
P()
if UN in all_users:
    leave(f'Choose another name: account for {UN} already exists', 0)
all_users[UN] = get('password')
properties = {
    'space_used': 0
    , 'files': {}, 'archives': {}
}
os.chdir('users');os.mkdir(UN);os.chdir(UN)
with open('details.json', 'w') as file: json.dump(properties, file)
leave()