class Table{
    constructor(equation){
        this.equation = equation;
        this.equation.table = this;
        this.board = make('table');
        this.caption = this.board.createCaption(equation.text);
        this.ranges = make();
        this.board.appendChild(this.ranges)
        this.rows()
        TABLES.appendChild(this.board);
        this.inputs();
    }
    rows(){
        this.Xrow = this.board.insertRow(); let X = this.Xrow.insertCell(); X.textContent = 'X';
        this.Yrow = this.board.insertRow(); let Y = this.Yrow.insertCell(); Y.textContent = 'Y';
        this.Xrow.onscroll = () =>{
            this.Yrow.scroll(this.Xrow.scrollLeft, 0)
        }
        this.Yrow.onscroll = () =>{
            this.Xrow.scroll(this.Yrow.scrollLeft, 0)
        }
    }
    inputs(){
        //children
        let ranges = [],
         type = [],
         placeholder = ['min', 'max', 'step', '']
        for (let i=0;i<4;i++){
            let input = make('input');
            input.placeholder = placeholder[i];
            input.type = i!=3?'number':'button';
            ranges.push(input)
        }
        ranges[2].min = 1; ranges[2].value = 1; ranges[2].onchange = function step(){
            ranges[0].min = -ranges[2].value*100;
            ranges[0].max = 0; ranges[0].value = -10*ranges[2].value;
            ranges[1].max = ranges[2].value*100;
            ranges[1].min = 0; ranges[1].value = 10*ranges[2].value;
            ranges[0].step = ranges[1].step = ranges[2].value;
            ranges[3].disabled = false;
        };
        ranges[2].onchange();
        ranges[0].onchange = ranges[1].onchange =()=> ranges[3].disabled = false;
        ranges[3].value = 'draw';
        ranges[3].onclick = () => {if(this.equation.ready){this.draw(); ranges[3].disabled = true}}
        ranges.forEach(i=>{this.ranges.appendChild(i);});
    }
    get range(){
        let k = this.ranges.children;
        return [+(k[0].value), +(k[1].value), +(k[2].value)];
    }
    draw(){
        this.caption.innerHTML = this.equation.text;
        [this.Xrow, this.Yrow].forEach(i=>i.remove())
        this.rows();
        let prec = this.range[2]!=parseInt(this.range[2])?2:0;
        for (let X=this.range[0]; X<this.range[1]+this.range[2]; X+=this.range[2]){
            let tdx = this.Xrow.insertCell();
            tdx.textContent = X.toFixed(prec);
            let tdy = this.Yrow.insertCell();
            tdy.textContent = eval(this.equation.equation).toFixed(prec);
            tdx.offsetWidth<tdy.offsetWidth?tdx.style.width = tdy.offsetWidth-10-2 + 'px':tdy.style.width = tdx.offsetWidth-10-2 + 'px'
        }
    }
}