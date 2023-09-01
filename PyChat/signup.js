onerror=alert; let X
signup.onsubmit=()=>{
    if(0/*sth for slow connections*/) return;
    event.preventDefault();
    loading.show();
    let x = new FormData(signup);
    X=x;
    fetch(`cgi-bin/signup.py?phone=${
        x.get('phone')}&password=${
        x.get('password')}&fullname=${
        x.get('fullname')}`).then(response=>{
            let c;
            response.json().then(m=>{
                c=m;
                if(c[0]){
                    loading.show("Registered successfully. Proceeding to login...");
                    location = "/";
                }else{throw c[1]}
            }).catch(err=>{
                loading.hide(err);
            });            
        }).catch(error=>{
            loading.hide(error);
        });
    
}
confirm.oninput=password.oninput=()=>{
    messageFromServer.innerHTML = 
        (password.value==confirm.value)?"":"Passwords do not match";
}