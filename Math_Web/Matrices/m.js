ADDMATRIX.children[3].onclick = ()=>{let mat = new Matrix(new Vec(ADDMATRIX.children[0].value, ADDMATRIX.children[1].value)); Matrices.push(mat); mat.space.before(Matrices.indexOf(mat)+1+'.'); mat.space.scrollIntoView()};
let mhud = {general: {det: 'For the Matrix in general:<br>Determinant: ', kind: '<br>Type of Matrix: ', dim: '. Dimension: '},
 specific: {row: 'Selected:<br>Position of selected: Row ', col: ', Column ',
 minor: '<br>Minor of selected: ', cofactor: '<br>Co-factor of selected: ',
 sign: '<br>Sign of selected: '}
},
 /*add scale later*/allops = ['+', '-', 'X', 'transpose', 'minor', 'cofactor', 'adjoint', 'inverse'],
t2s = ['second', 'answer'], two = allops.slice(0, 3), one = allops.slice(3),
h = ['operation', 'row', 'col'], rc= h.slice(1), pm = allops.slice(0, 2), square=allops.slice(4),
n = [4,3,2,1, '?'];
// alert(32); to test
class Matrix{
    constructor(dim){
        this.dim = dim; this.out = this.dim.x!=this.dim.y;
        this.space = make(); this.space.className = 'space'; MATRICES.appendChild(this.space);
//         console.log(this);
        addVM(this.space, dim, this, 'matrix');
        this.help();
        this.HUD = createHUD(mhud);
        this.space.appendChild(this.HUD);/*tommorrow is chirstmas*/;
        setTimeout(()=>{this.HUD.dim.textContent = `rows: ${this.dim.x}, columns: ${this.dim.y}`}, 1000);
        this.HUD.querySelectorAll('[class]').forEach(i=>this.HUD[i.className]= i);
    }
    help(){
        //making and appendChilding
        h.forEach(i=>{this.space[i] = make('select'); this.space.appendChild(this.space[i]);/* this.space[i].value=''*/});
        t2s.forEach(i=>{this.space[i] = make('table'); this.space.appendChild(this.space[i]); this.space[i].className=i});
        this.space.solve = make('button'); this.space.solve.disabled=1;
        this.space.insertBefore(this.space.solve, this.space.answer);
        //adding content (and options)
        allops.
        forEach(i=>{
            let x = make('option');
            x.textContent = i; x.disabled = this.out && square.includes(i);
            this.space.operation.add(x);
        }); this.space.operation.value = '';
        rc.forEach(i=>{
            this.space[i].className = i;
            this.space[i].disabled = 1;
            n.forEach(j=>{
                let x = make('option');
                x.textContent = j; x.disabled=j=='?';
                this.space[i].add(x);
            })
            this.space[i].value = '';
        });
        this.space.solve.textContent = '=';
        //Eventing
        this.space.operation.onchange = ()=>{
            let op = event.target.value;
            this.space.solve.disabled = false;
            this.space.col.disabled = op!='X';
            this.space.row.value = op=='X'?this.dim.y:'';
            this.space.col.value = op=='X'?'?':'';
            t2s.forEach(i=>this.fromArray([], this.space[i], 1))
            if(pm.includes(op)) this.fromArray(copy(this.content, 0), this.space[t2s[0]]);
        }
        this.space.solve.onclick = (dd, s =this)=>{
            if (!this.space.operation.value||!this.space.second.content||!this.space.second.content.length) return;
            let dec = {'+': 'sum', '-': 'difference', 'X': 'product'}, v = s.space.operation.value;
            this.fromArray(s[dec[v]?dec[v]:v], s.space.answer, 0, 0);
            dd.target.disabled = true;
        }
        this.space.col.onchange = ()=>{
            let array = [],x = this.space.row.value, y = this.space.col.value;
            //do a 'make array from dimensions' function later
            for (let r = 0; r<x; r++){
                let ro = [];
                for(let c=0; c<y; c++/*really? 'c++'?*/){
                    ro.push(0);
                }
                array.push(ro);
            }
            this.fromArray(array, this.space.second);
        }
    }
    fromArray(array, table, clear=false, edit=true){
        //clearing
        Array.from(table.children).forEach(i=>i.remove()); table.content=[];
        if(clear) return;
        //building (maybe do a subclass later)
        table.content = array;
        table.parentElement.row.value = array.length; table.parentElement.col.value = array[0].length;
        let x = 0, y = 0;
        array.forEach(r=>{
            let ro = table.insertRow();
            r.forEach(c=>{
                let co = ro.insertCell();
                let inp = make('input'); inp.type = 'number'; inp.value = array[x][y];
                co.appendChild(inp); inp.disabled=!edit;
                let rw = x, cl = y;
//              console.log('x: ', x, 'y: ', y)
                inp.onchange = ()=>{;
                    table.content[rw][cl] = parseInt(inp.value);
                    this.space.solve.disabled = false;
                };y++
            }); x++; y = 0;
        })
    }
    get kind(){
        let kind = [], x = this.dim.x, y = this.dim.y;
        if (!this.content.flat().some(i=>i)) kind.push('null')
        if(x==1)kind.push('row');if(y==1)kind.push('column');
        if (this.out) return kind;
         kind.push((this.det==0?'':'non-')+'singular');
        if(x==y)kind.push('square'); let unidi = [true, true];
        for (let i = 0; i < x; i++) {
            for (let j = 0; j < y; j++) {
                unidi[0]=this.content[i][j]==0; /*console.log(unidi)*/
                unidi[0]*=i==j&&this.content[i][j]!=0;
                unidi[1]*=i==j&&this.content[i][j]==1;
            }
        }//use forEach later if you think it will be more convinient
        if (unidi[0]) kind.push('diagonal'); if (unidi[1]) kind.push('unit');
        kind.push('dont forget unidi')
        return kind;
    }
    tran(n=this.content){
        let fin = [];
        for (let i=0; i<n[0].length; i++){
            let x = [];
            n.forEach(j=>x.push(j[i]));
            fin.push(x);
        }
        return fin;
    }
    scale(k, mat= this.content){
        let ans = [];
        mat.forEach(i=>{
            let n = [];
            i.forEach(j=>n.push(j*k));
            ans.push(n);
        }); return ans;
        
    }; get rank(){};
    cofactorset(array, x, y){
        let ans = copy(array);
        delete ans.splice(x,1);;
        for (let r = 0; r < ans[0].length; r++) {
            delete ans[r].splice(y,1);
        }
        return ans;
    }
    detfrom(array, ans=0){
        let n = array[0].length;
        // console.log(0, ans);
        if (n==1) return array[0][0];
        for (let a = 0; a < n; a++) {
            ans+=(
                ((-1)**a)*array[0][a]*(
                    this.detfrom(this.cofactorset(array, 0, a), 0)
                )
            );
            // n==3?console.log(a+':', array[0][a], ':', /*this.detfrom(*/this.cofactorset(array, 0, a)/*, hold)*/):'';
        };//finally on 5th jan, 2023 (for 2*2 matrix sha)
        // (6th of Jan)So this was the bug i got - i found it out when i tried
        // getting determinants for a 3*3 matrix- I was compiling the
        // addition for the other (recursive) det calls instead of using 0
        // i'll try now. - it worked - thank you Jesus (i was 
        // thinking of giving up and doing another thing(ludo game)
        // next is multiplication -then i'm done with Matrices)
        //except I want to do a step by step solving process (how I got it feature)
        return ans; 
    }
    get transpose(){return this.tran()}
    get minor(){
        let ans = [];
        for (let i = 0; i < this.dim.x; i++) {
            let r = [];
            for (let j = 0; j < this.dim.y; j++) {
                r.push(this.detfrom(this.cofactorset(this.content, i, j)))
            };ans.push(r);
        };return ans;
    };
    get cofactor(){
        let ans = this.minor;
        for (let i = 0; i < this.dim.x; i++) {
            for (let j = 0; j < this.dim.y; j++) {
                ans[i][j] *= ((-1)**(i+j))
            }
        }; return ans;
    };
    get adjoint(){return this.tran(this.cofactor)};
    get inverse(){return this.scale(1/this.det, this.adjoint)}
    get det(){
        return this.detfrom(this.content)
    }
    get sum(){
        let me = this.content, you = this.space.second.content;
        let ans = [];
        for (let r=0; r<this.dim.x; r++){
            let ro = [];
            for(let c=0; c<this.dim.y; c++){
                ro.push(me[r][c]+you[r][c]);
            }
            ans.push(ro);
        }
        return ans;
    }
    get difference(){
        let hold = copy(this.space.second.content)
        this.space.second.content = copy(this.scale(-1, this.space.second.content));
        setTimeout(()=>this.space.second.content = hold, 1000);
        return this.sum
    }
    get product(){
        let other = copy(this.space.second.content), trans = this.tran(other), ans = [];
        this.content.forEach(r=>{
            let row = [];
            trans.forEach(c=>{
                let col = [], v = 0;
                for (let i = 0; i < r.length; i++) {
                    v+=r[i]*c[i];
                    // if(r.length-i==1) col.push(v)
                }
                // col.push(v)
                if(trans.length-trans.indexOf(c)==1) row.push(col);
            }); ans.push(row);
        })
        return ans;
    }
    update(pointerPos){
        let [y, x] = pointerPos;
        this.HUD.kind.textContent = this.kind.join(', ');
        [this.HUD.row.textContent, this.HUD.col.textContent] = [y+1, x+1];
        if (this.out) return;
        this.HUD.sign.textContent = (-1)**sum(pointerPos)+1?'+':'-';
        this.HUD.det.textContent = this.det;
        ['minor', 'cofactor'].forEach(i=>this.HUD[i].textContent = this[i][y][x]);
    }
}
// Innocent oyosume: 07067303392