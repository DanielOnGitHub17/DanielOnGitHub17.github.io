from general import *
phone = request["phone"].value;
password = request["password"].value;
fullname = request["fullname"].value;
os.chdir("chats");
if phone in os.listdir():
    leave([0
           , f"Account already exists for {phone}"])
else:
    os.mkdir(phone); os.chdir(phone)
    with open("details.json", "w") as p:
        json.dump({
            "phone":phone, "password": password
            ,"fullname": fullname, "created": str(datetime.now())
            , "log": str(datetime.now()), "online": False
            , "friends": [phone]
        }, p)
    with open(phone+'.json', 'w') as me:
        json.dump([], me);
    leave([1
           , "Account created successfully"])

#July 29, 2023 finally tested await (wonderful) test daniel.setTimeout

# Oya oya you don catch me: The king asked, “Isn’t the hand of Joab with you in all this?�? The woman answered, “As surely as you live, my lord the king, no one can turn to the right or to the left from anything my lord the king says; Yes, it was your servant Joab who instructed me to do this and who put all these words into the mouth of your servant;
