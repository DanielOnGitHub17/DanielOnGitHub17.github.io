solve = solve, eraser = eraser
, dot = dot,
write=write;
eraser.addEventListener('mousedown', event=>{
    eraser.style.boxShadow = '0 3px 5px #7cb342';
})
eraser.addEventListener('mouseup', event=>{
    eraser.style.boxShadow = '0 12px 10px #7cb342';
    write.setAttribute('d', '');
    console.clear()
})
draw.addEventListener('mousedown', event=>{
    if(solve.active) {;
        let [x, y] = [event.layerX, event.layerY]
        D(`M ${x} ${y}`)
    }
})
draw.addEventListener('mousemove', event=>{
    if(solve.active) {
        dot.style.left = (event.pageX) + "px";
        dot.style.top = (event.pageY) + "px";
        if (!event.buttons) return;
        let [x, y] = [event.layerX, event.layerY];
        D(`L ${x} ${y}`)
    }
})

function D(x=''){
    write.setAttribute('d', write.getAttribute('d')+x)
    return write.getAttribute('d')
}

addEventListener('keydown', event=>{
    if(solve.active && event.key=='z' && event.ctrlKey){
        let d = D(),
        x = d.lastIndexOf('L');
        if (x==-1){x = d.lastIndexOf('M')}
        write.setAttribute('d', d.slice(0, x))
    }
})