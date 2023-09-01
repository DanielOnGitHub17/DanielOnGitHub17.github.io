identify();
showmore.onclick = ()=>{
    let x = showmore.textContent == '>';
    more.style.width = x ? "70%" : '';
    showmore.textContent = x ? '<' : '>';
}
;
onclose = ()=>{
    delete sessionStorage.PyChat
}
//change online status
onload = ()=>{
    user = JSON.parse(sessionStorage.PyChat);
    delete user.password
    fetch(`cgi-bin/online.py?whose=${user.phone}`).then(m=>{
        m.text().then(t=>{
            if (!sessionStorage.PyChat) {
                alert(sessionStorage.PyChat);
                throw "cannot login";
            }
            if (t.trim() == "successful") {
                refriends(f=>new Friend(f));
                console.log(friends.length)
                // friends[user.phone].checkar.click()
            } else {
                throw 'cannot login'
            }
        }).catch(error=>{
            alert(error),
            location = '/'
        });
    }
    ).catch(alert);
}
function refriends(todo) {
    fetch(`cgi-bin/myfriends.py?whose=${user.phone}`).then(i=>{
        i.text().then(j=>{
            // console.log(j);
            j = JSON.parse(j);
            if (j[0]) {
                allDetails = j[1];
                if (todo)
                    allDetails.forEach(d=>todo(d));
            } else {
                alert('failed');
                location = '/';
            }
        }
        ).catch(console.log)
    }
    )
}
addFriend.onclick = ()=>{
    let friend = prompt("input phone number");
    if (!friend)
        return
    if (friend == user.phone)
        return alert("already in your contacts")
    fetch(`cgi-bin/addfriend.py?user=${user.phone}&friend=${friend}`).then(i=>{
        i.text().then(j=>{
            // console.log(j)
            j = JSON.parse(j)
            if (j[0]) {
                new Friend(j[1]);
            } else {
                alert(`${friend} is not on PyChat.\nPlease tell him/her to sign up.`);
            }
        }
        ).catch(alert)
    }
    ).catch(alert);
}
//33:55 harry porter
getAll('#friendsDetails *').forEach(i=>{
    friendsDetails[i.className] = i;
}
);
Object.defineProperty(friendsDetails, 'friend', {
    set: function(obj) {
        this.phone = obj.phone;
        this.friendName.innerHTML = obj.fullname
        this.friendPhone.innerHTML = obj.phone
    },
    get: function() {
        return this.phone;
    }
})
