submitter = getE('type', 'submit'),
form = document.forms[0],
msg = get('msg'),
newPin = get('NP'),
confPin = get('CP');
[newPin, confPin].forEach(p=>p.onkeyup = p.onchange = event=>{
    msg.innerHTML = (newPin.value != confPin.value /*add other tests*/
    ) ? 'Passwords Do Not Match' : ''
}
)
form.querySelectorAll('input').forEach(i=>i.required = true)
form.addEventListener('submit', event=>{
    event.preventDefault();
    if (!form.reportValidity() || newPin.value != confPin.value)
        return;
    load(1);
    fetch(detail).then(response=>{
        response.text().then(t=>{
            try {
                let txt = JSON.parse(t);
                msg.innerHTML = txt[0];
                msg.style.color = ['red', 'green'][txt[1]];
                if (txt[1]) {
                    location = '/login';
                }
            } catch (error) {
                msg.innerHTML = t;
            }
            load(0);
        }
        ).catch(error=>{
            console.log(error)
            msg.innerHTML = 'An Error Occured, Please try again';
            load(0);
        }
        );
    }
    ).catch(error=>{
        console.log(error)
        msg.innerHTML = 'An Error Occured, Please try again';
        load(0);
    }
    );
}
)
window.__defineGetter__('detail', ()=>{
    let data = new FormData(form)
      , ret = '../cgi-bin/reg.py?';
    for (let e of data.entries()) {
        ret += `${e[0]}=${e[1]}&`
    }
    return ret.slice(0, ret.length - 1)
}
)
