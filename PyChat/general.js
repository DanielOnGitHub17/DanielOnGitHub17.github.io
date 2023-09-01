identify();
function loader() {
    window.loading = make();
    loading.id = 'loading';
    for (let n = 0; n < 8; n++) {
        let c = make();
        c.id = 'c' + n;
        c.style.animationDelay = n / 8 + 's';
        loading.appendChild(c);
        loading.hide = (text='', color='')=>{
            loading.hidden = 1; messageFromServer.innerHTML=text;
            messageFromServer.style.color=color;
        }
        loading.show = (text='', color='')=>{
            loading.hidden = 0; messageFromServer.innerHTML=text;
            messageFromServer.style.color=color;
        }
        loading.hide();
    }
    document.body.appendChild(loading);
}
;loader();
