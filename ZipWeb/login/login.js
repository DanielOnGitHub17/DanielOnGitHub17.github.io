//get all the useful elements
let form = document.forms[0],
msg = get('msg')

//set requireds
form.querySelectorAll('input').forEach(i=>i.required=true)

//on submit
form.addEventListener('submit', event=>{
    event.preventDefault();
    if (!form.reportValidity()) return;
    load(1);
    let all = new FormData(form), user = all.get('username')
        , password = all.get('password');
    fetch('/users/users.json').then(response=>{
        response.json().then(j=>{
            if (j[user]==pwd.value) {
                fetch(`/users/${user}/details.json`).then(resp=>{
                    localStorage.ZipWebUserName = user;
                    resp.text().then(J=>{
                        localStorage.setItem('ZipWebUser', J);
                        location.href = '../user';
                    });
                })
                .catch(e=>{
                    console.log(e); errorStop()
                })
            }else if(!j[user]){
                errorStop(`No Account found for ${user}`)
            }else{
                errorStop('Incorrect password')
            }
        })
        .catch(error=>{
            console.log(error); errorStop()
         });
    })
    .catch(error=>{
        console.log(error); errorStop();
    });
})