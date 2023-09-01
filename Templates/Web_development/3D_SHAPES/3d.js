function hex(string=0){
    string = 0+string;
    N = n = parseInt(string)
    result = []
    let change = {'10':'a', '11':'b', '12':'c', '13':'d', '14':'e', '15':'f'}
    do{
        result.push(n%16>9?change[n%16]: n%16);
        n = parseInt(n/16);
    } while(n>0);
    return result.reverse().join('').padStart(2, 0)
}
let div = document.getElementById('first')
let color = document.querySelector("[type='color']")
let transparency = document.querySelector("[type='number']")
window.addEventListener('click', event=>{
    if([div, box].includes(event.target.parentElement)) {
       event.target.style.background = color.value+hex(transparency.value);
    }
    }
)
function ani(block, style, start, end=100, suffix='px'){
    block.style[style] = start + suffix
    start++; console.log(start);
    if(start<end) requestAnimationFrame(()=>ani(block, style, start, end, suffix))
}
function earthRotation(){
    let allStyles = [{rY: 90, }]
    `rotateY(${rY}deg) rotateX(${rX}deg)
     translateX(${tX})px translateY(${tY})px translateZ(${tZ})px`
}