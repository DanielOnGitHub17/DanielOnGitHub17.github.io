identify();
let Q = Array.from(container.children),
 nav = document.querySelector('nav ul'),
navs = Array.from(nav.children);
navs.forEach(i=>i.onclick = ()=>{
    goToScreen(i.textContent.toUpperCase(), '', container);
    navs.forEach(j=>manyStyles(j, j==i?selected:disselected));
//     console.log(Q[navs.indexOf(i)])
//     manyStyles(i, Q[navs.indexOf(i)].selected?selected:disselected)
})
selected = {top: '5px', background: 'white', borderTop: 'inherit',
 right: '3px', cursor: 'default'}
disselected= {top: '', background: '', borderTop: '',
 right: '', cursor: ''};
// VECTORS.selected = true;
nav.children[1].click();
function addVM(to, dim=new Vec(1, 2), obj, prop){
    obj[prop] = make('table'); obj[prop].className = prop;
    obj.content = [];
    for (let x=0; x<dim.x; x++){
        let r = obj[prop].insertRow(), rr = [];
        for (let y=0; y<dim.y; y++){
            let c = r.insertCell(); rr.push(0)
            let inp = make('input');
            inp.type = 'number'; inp.value = 0;
            inp.onchange = inp.onfocus = ()=>{
                obj.content[x][y] = eval(inp.value);
                obj.space.solve.disabled = false;
                obj.update([x, y]);
            }
            c.appendChild(inp);
        }
        obj.content.push(rr)
    }
    to.appendChild(obj[prop]);
}
let Vectors = [], Matrices = [];
function createHUD(hud){
        let HUD = make();
        HUD.className = 'HUD';
        for (let node in hud){
            HUD[node] = make();
            HUD[node].className = node;
            for (let x in hud[node]){
                let n = make('span');
                n.className = x;
                HUD[node].innerHTML += hud[node][x];
                HUD[node].appendChild(n);
            }
            HUD.appendChild(HUD[node])
        }
        return HUD;
}