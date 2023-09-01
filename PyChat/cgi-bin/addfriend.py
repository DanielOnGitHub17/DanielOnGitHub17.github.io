from general import *
friend = request['friend'].value
user = request['user'].value
os.chdir('chats')
if friend in os.listdir():
    #first append friend to user's friends list
    with open(f"{user}/details.json", 'r') as j:
        det = json.load(j)
        det['friends'].append(friend)
    with open(f"{user}/details.json", 'w') as j:
        json.dump(det, j)
    #then append user to friends's friends list
    with open(f"{friend}/details.json", 'r') as j:
        det = json.load(j)
        det['friends'].append(user)
    with open(f"{friend}/details.json", 'w') as j:
        json.dump(det, j)
    #next create a friend.json file for user
    with open(f"{user}/{friend}.json", 'w') as j:
        json.dump([], j)
    #then create a user.json file for friend
    with open(f"{friend}/{user}.json", 'w') as j:
        json.dump([], j)
    #get friend's final details
    with open(f"{friend}/details.json") as j:
        det = json.load(j)
    #get out
    leave([1, det])
else:
    leave([0, f"No account exists for {friend}"])
