//helpers
function manyStyles(node, a={}) {
    for (let x in node.style) {
        if (x in a) {
            node.style[x] = a[x];
        }
    }
}
function stopSign(){
    if (['-', '+', ''].includes(event.key)){
        event.preventDefault()
    }
}
/*was for matrix.html*/function changeSign(){
    event.target.textContent = (event.target.textContent == '+')?'-':'+'
}
function sum(array){
    let s = 0;
    array.forEach(i=>s+=i);
    return s;
}

let make = (name='div')=>document.createElement(name)
  , makeSVG = (name)=>document.createElementNS('http://www.w3.org/2000/svg', name)
  , get = (id)=>document.getElementById(id)
  , getE = (selector,value)=>document.querySelector(`[${selector}=${value}]`)
  , getS = (query)=>document.querySelector(query)
  , getAll = (query)=>[...document.querySelectorAll(query)];
let identify = ()=>getAll('[id]').forEach(i=>window[i.id] = i)
  , add = (what,to=document.body)=>to.appendChild(what)
  , bx = (who)=>who.getBoundingClientRect();

EQUATIONS = EQUATIONS;
let equations = []
  , addEq = document.querySelector('#ADDEQUATION button')
  , coefs = ['a', 'b', 'c', 'd', 'e', 'f']
  , //equations var

tables = [], 
  graphs = [];
//tables var
TABLES = TABLES;
GRAPHS = GRAPHS;

navi = document.querySelector('ul'),
selected = {
    top: '5px',
    background: 'white',
    borderTop: 'inherit',
    right: '3px',
    cursor: 'default'
}
disselected = {
    top: '',
    background: '',
    borderTop: '',
    right: '',
    cursor: ''
};

container = container;
Array.from(navi.children).forEach(i=>{
    i.onclick = function select() {
        Array.from(navi.children).forEach(j=>{
            manyStyles(j, disselected);
            j.selected = false;
        }
        )
        manyStyles(i, selected);
        i.selected = true;
        show(i.textContent)
    }
    if (i.textContent == 'Equations')
        i.onclick();
}
)
function show(which) {
    which = which.toUpperCase()
    Array.from(container.children).forEach(i=>i.style.display = 'none')
    document.getElementById(which).style.display = ''
}
addEq.addEventListener('click', event=>{
    let equation = new Equation(document.querySelector('#ADDEQUATION select').value)
      , table = new Table(equation),
      graph = new Graph(table);
    equations.push(equation)
    tables.push(table)
    graphs.push(graph)
})
