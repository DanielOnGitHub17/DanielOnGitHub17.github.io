from general import *
phone = request["phone"].value
password = request["password"].value
os.chdir('chats');
if phone in os.listdir():
    with open(phone+'/details.json') as d:
        x = json.load(d);
        leave([1, "Login successful", x] if x["password"]==password else [0, "Incorrect password"])
else:
    leave([0, f"No account exists for {phone}"])