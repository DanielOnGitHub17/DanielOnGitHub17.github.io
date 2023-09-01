let friends={};
class Friend {
    constructor(det) {
        this.detail(det);
        friends[this.phone] = this;
        this.domize(det);
    }
    domize(det){
        friendsList.append(this.holder = make('li'));
        add(this.checkar=make('input'), this.holder).type='radio';
        this.checkar.name = 'friend';
        ['name', ,'hasUnread', 'isOnline'].forEach(i=>{
            add(this[i]=make('span'), this.holder);
        })
        this.name.textContent = this.fullname;
        (this.contact = make()).className='contact';
        ['']
        this.refresh(det);
        this.event();
        // console.log(1);
    }
    detail(det){
        delete det.password;
        for (let d in det){
            this[d]=det[d];
        }
    }
    refresh(){
        //first fetch friend's details
        fetch(`chats/${this.phone}/details.json`).then(det=>{
            det.json().then(j=>{
                this.detail(j);
                this.isOnline.setAttribute('online', this.online);
            })
        })
        //then fetch friend's messages
        fetch(`chats/${user.phone}/${this.phone}.json`).then(det=>{
            det.json().then(j=>{
                // this
            })
        })
    }
    event(){
        this.checkar.onclick=()=>{
            this.friend = this.checkar.checked
        }
    }
    message(text){
        (new Message(this.phone, text)).send();
    }
    set friend(v){
        if(v) friendsList.friend=this;
    }
    get friend(){
        return this.phone==friendsList.phone;
    }
}
isToMany.onchange=()=>{
    let x = isToMany.checked?'checkbox':'radio',
        y = isToMany.checked?'radio':'checkbox';
    getAll(`[name=friend]`).forEach(i=>{i.type=x; i.checked=false});
}