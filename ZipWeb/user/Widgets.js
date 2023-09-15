let widgets = get('widgets')
  , wids = {}
  , u = undefined
  // , say = (text)=>!speechSynthesis.speaking && speechSynthesis.speak(new SpeechSynthesisUtterance(text))
  , widnames = ['alert', 'confirm', 'prompt']
  , sstream = '';
say=(text)=>{};
window.__defineGetter__('stream', ()=>wids.prompt.inputbox.value)
alt = alert;
cnf = confirm;
prt = prompt;
class Widget {
    constructor(use) {
        this.name = use;
        (this.modal = make()).id = use + 'Box';
        this.modal.className = 'widget';
        ['closar', 'ok', 'cancel'].forEach(i=>{
            (this[i] = make('button')).innerHTML = i == 'closar' ? 'x' : i;
        })
        this.inputbox = make('input');
        this.text = make('p');
        ['closar', 'text', 'inputbox', 'ok', 'cancel'].forEach(i=>{
            this[i].className = i;
            this.modal.appendChild(this[i])
        })
        this.inputbox.onkeyup = ()=>{
            event.key == 'Enter' && this.ok.click()
        };
        widgets.appendChild(this.modal);
        [this.cancel, this.closar].forEach(i=>i.addEventListener('click', ()=>this.close()))
        wids[this.name] = this;
        this.waiters = [];
        this.close();
    }
    show(f=(text)=>{}
    , text=this.name, former='', ok, cancel=ok ? 'CANCEL' : 'OK') {
        if (wids[this.name].open) {
            return this.waiters.push(
            ()=>{
                setTimeout(()=>this.show(f, text, former, ok, cancel), 200)
            })
        }
        this.open = true;
        ok = ok ? ok : 'OK'
        this.ok.innerHTML = ok;
        this.cancel.innerHTML = cancel;
        this.inputbox.value = former;
        this.ok.onclick = ()=>{
            f(stream);
            this.close()
        };
        this.modal.style.transform = 'scale(1)';
        getAll('body>*').forEach(e=>e.style.opacity=0.3);
        widgets.style.opacity=1
        this.text.innerHTML = text
    }
    close() {
        this.modal.style.transform = '';
        this.ok.onclick = null;
        this.inputbox.value = '';
        this.ok.innerHTML = 'ok';
        this.cancel.innerHTML = 'cancel';
        this.open = 0;
        getAll('body *').forEach(e=>e.style.opacity='');
        //for opening the the ones that were blocked
        if (this.waiters.length){
            this.waiters[0]();
            delete this.waiters.splice(0, 1)[1]
        }
    }
}
widnames.forEach(w=>{
    let W = new Widget(w);
})
alert = (text, s ,button)=>{
    wids.alert.show(u, text, u, u, button);
    s && setTimeout(()=>wids.alert.close(), s)
};
confirm = (f=()=>{}, text, ok='OK', cancel)=>
  wids.confirm.show(f, text, u, ok, cancel);
prompt = (f=()=>{}, text, former, ok='OK', cancel)=>
  wids.prompt.show(f, text, former, ok, cancel);

function wait(condition, f) {
    if (condition()) {
      f();
    } else {
      requestAnimationFrame(()=>wait(condition, f))
    }
}