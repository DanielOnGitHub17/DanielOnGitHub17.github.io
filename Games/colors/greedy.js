container = document.getElementById('container');
make=(name='div')=>document.createElement(name)
window.addEventListener('click', event=>{
    if (event.target.parentNode!=container) return;
    highlight(event.target)
    boxForTwo.push(event.target)
    if (boxForTwo.length==2){
        if(thoseTouching(boxForTwo[0]).includes(boxForTwo[1])){
            switchNodes(allBoxes.indexOf(boxForTwo[0]), allBoxes.indexOf(boxForTwo[1]))
                for(let box of boxForTwo){
                    try{
                        clearNear(box)
                    } catch (error){
                        console.log('error')
                    }
                 }
        } else{
            console.log('not my neighbour')
        }
        for(let i=0; i<2; i++){
            highlight(boxForTwo[i])
        }; boxForTwo = []; movesBox.textContent= --movesleft
    }
})
window.addEventListener('dblclick', event=>{event.preventDefault()})
window.addEventListener('error', event=>{
    a = event;
})
colors = ['skyblue','red','orange','yellow','green','blue','purple'
 ,'pink','brown','gold','gray','silver']

function loadGrid(n){
    if(n>12) n = 12
    container.style.width = 52*n+'px'
    for(let i=0; i<n;i++){
        for (let j=0; j<n; j++){
            let box = make();
            box.style.background = colors[i%13];
            container.appendChild(box);
        }
    }
    allBoxes = Array.from(container.children);
}
let n = parseInt(prompt('Difficulty: '))
if(n<2||n>12||!n) n=6
if(n%2) n++;
boxForTwo = []; movesleft = parseInt(n*n)/2;
function renewBoxes(){
    allBoxes = Array.from(container.children);
}
function random(n){
    return parseInt(10000*Math.random())%n
}
function thoseTouching(box){
    let pos = allBoxes.indexOf(box)
    return [allBoxes[pos-n], allBoxes[pos+1], allBoxes[pos+n], allBoxes[pos-1]].filter(i=>i);
}
function highlight(dom){
    (dom.style.boxShadow) ? dom.style.boxShadow = '': dom.style.boxShadow = '3px 3px 7px 8px black';
}
function switchNodes(first, last, time){
    if (first>last){let hold=first; first=last, last=hold}
    let firstbox = allBoxes[first], lastbox = allBoxes[last]
    firstbox.replaceWith(lastbox); container.insertBefore(firstbox, allBoxes[last+1])
    renewBoxes()
}
function scatterThem(){
    for(let i=0; i<2*n*n; i++){
        switchNodes(random(n*n), random(n*n))
    }
}
function loadLevel(){
    document.querySelector('div').setAttribute('id', 'moves')
    movesBox = document.getElementById('moves');
    loadGrid(n);
    scatterThem();
    clear = setInterval(refresh, 2000)/*
    clear = setInterval(scatterThemAgain, 1000)
    clear = setInterval(checkForClearing, 500)*/
    container.removeEventListener('click', loadLevel)
}
function clearNear(box){
    n=Math.round(Math.sqrt(allBoxes.length))
    container.style.width = 52*n+'px';
    for (let neighbour  of thoseTouching(box)){
        if(neighbour.style.background==box.style.background){
            container.removeChild(box); container.removeChild(neighbour)
            renewBoxes()
            return 'cleared'
        }
    }
}
container.addEventListener('click', loadLevel)
function refresh(){
    if(movesleft>0 && allBoxes.length) return;
    if (movesleft<1) {alert('you lose')} else {alert('you win')}
    clearInterval(clear)
    document.location.href = document.location.href
}
/*
function scatterThemAgain(){
    if (allBoxes.length<1) refresh()
    for(let box of allBoxes){
        for (let neighbour of thoseTouching(box)){
            if(neighbour.style.background==box.style.background){
                return;
            }
         }
         alert('no more matches: time to shuffle');
         scatterThem()
    }
}
function checkForClearing(){
    if (allBoxes.length<1) {clearInterval(clear); return}
    n = Math.round(Math.sqrt(allBoxes.length));
    container.style.width = 52*n+'px';
    for (let box of allBoxes){
        for (let neighbour of thoseTouching(box)){
            if(neighbour.style.background==box.style.background){
                container.removeChild(neighbour); container.removeChild(box)
                renewBoxes(); return; checkForClearing()
            }
        }
    }
}*/