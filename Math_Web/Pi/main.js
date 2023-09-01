//initialise all
identify();
navi = getS('ul'),
selected = {margin: '5px 3px 0 0', background: 'white'
            , borderTop: 'inherit', cursor: 'default'}
disselected= {margin: '', background: '', borderTop: ''
              , cursor: ''};

container = container;
Array.from(navi.children).forEach(l=>{
    l.onclick=()=>{
        Array.from(navi.children).forEach(c=>c.setAttribute("selected", l==c));
        show(l.getAttribute("whose"));
    }
    if(l.textContent=='User Defined') l.click();
})
function show(which){
    Array.from(container.children).forEach(i=>i.style.display='none')
    document.getElementById(which).style.display='';
}