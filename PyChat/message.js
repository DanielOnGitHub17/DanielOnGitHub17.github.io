let messages = [];
class Message {
    constructor(text, received=1) {
        this.received=received;
        this.text=text;
        this.sent=false; this.gotten = false;
        messages.push(this);
        this.domize();
    }
    domize(){
        add(this.messageBox=make(), chats).className=
            `messageBox ${this.received?'received':'sent'}`;
        this.messageBox.innerHTML = this.text;
        this.event();
    }
    get selected(){
        return Boolean(eval(this.messageBox.getAttribute('selected')));
    }
    set selected(b){
        this.messageBox.setAttribute('selected', Boolean(b));
    }
    event(){
        this.messageBox.onclick=()=>{
            this.selected = !this.selected;
        }
    }
    send(to, text){
        3
    }
    receive(from, text){
        3
    }
    static get selected(){
        return messages.filter(i=>i.selected)
    }
}
for (let index = 0; index < 9; index++) {
     j = new Message("Daniel is a good boy; listen to him")
    ,k = new Message("Why should I listen to him? is he important?", 0);   
}