//later do a chats.db for holding the chats of everyone so that it 
// can be only one file, Python will handle the rest
login.onsubmit=()=>{
    event.preventDefault();
    loading.show(undefined, 'green');
    let x = new FormData(login);
    fetch(`cgi-bin/login.py?phone=${
        x.get('phone')}&password=${x.get('password')}`).then(resp=>{
        resp.text().then(det=>{
            console.log(det);
            det = JSON.parse(det);
            loading.hide(det[1], det[0]?'green':'');
            if (det[0]) {
                sessionStorage.PyChat = JSON.stringify(det[2]);
                location = `user.html`;
            }
        })
        .catch(loading.hide)
    }).catch(err=>loading.hide(err));
}