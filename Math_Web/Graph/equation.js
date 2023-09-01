class Equation{
    constructor(n){
        this.HP = n;
        this.encapsulator = make();
        this.board = make();
        this.cover = make()
        this.board.className = 'board'; this.cover.className = 'cover';
        [this.board, this.cover].forEach(i=>this.encapsulator.appendChild(i));
        this.encapsulator.className = 'encapsulator'
        EQUATIONS.appendChild(this.encapsulator);
        for (let i=n; i>0; i--){
            let coef = make('input');
            coef.type='number'; coef.min = 0; coef.placeholder = coefs[this.HP-i];
            coef.onkeydown = stopSign
            let variable = make('sup');
            variable.innerHTML = i!=1?i:'';
            let sign = make('button')
            sign.textContent = '+';
            sign.onclick=changeSign;
            this.parts = [coef, variable, sign]
            this.parts.forEach(i=>this.board.appendChild(i))
            variable.before('X')
        }
        let p = make('input')
        p.type = 'number';
        p.onkeydown = stopSign;
        p.min = 0; p.placeholder=coefs[this.HP];
        this.board.appendChild(p);
        this.board.children[0].min ='';
        let x = make('button');
        x.textContent = '-';
        x.addEventListener('click', changeSign);
        x.onclick = ()=>this.hidden = !this.hidden;
        this.board.appendChild(x)
        this.toggler = x;
        this.cover.style.width = this.board.offsetWidth-22+'px';
        this.cover.style.height = this.board.offsetHeight-22+'px';
    }
    get equation(){
        let n = [], s = [], t = '';
        this.board.querySelectorAll('input').forEach(i=>n.push(i.value))
        this.board.querySelectorAll('button').forEach(i=>s.push(i.textContent))
        s.pop();
        for (let i=0; i<this.HP; i++){
            t += `${n[i]}*X**${this.HP-i}${s[i]}`
        }
        t+=n[this.HP]
        return t;
    }
    get hidden(){
        this.cover.innerHTML = this.text?this.text:'complete-->';
        return this.toggler.textContent=='+';
    }
    set hidden(bool){
        this.cover.style.opacity = !bool+0;
        this.cover.style.zIndex = !bool-1;
        Array.from(this.board.children).forEach(i=>i.disabled=!bool)
        this.toggler.style.opacity = 1;
        this.toggler.disabled=false;
    }
    get text(){
        if(!this.ready) return ''
        let t = this.equation.split('*');
        let h = 'Y = ', p = '+', n = '-';
        for (let x of t){
            let s
            if (x.includes(p)) s=p
            if(x.includes(n)) s=n
            if (s){
                let two = x.split(s)
                h += `${two[0]==1?'':two[0].sup()} ${s} ${two[1]}`
            }else {h+=x}
        }
        let hh = h.split('')//for later
        return h
}
    get ready(){
        try{
            if(!this.equation) return false
            let X = 0;
            eval(this.equation)
            return true;
        } catch{
            return false
        }
    }
}