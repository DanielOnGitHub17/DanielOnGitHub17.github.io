/*for nav*/
background = '#558b2f'
ul.addEventListener('click', function d(){
    let a= event.target; background = a.style.background;
    /*generateOptions();console.log(a.textContent)*/
    if(a.textContent==TYPE) return
    at=0;dabled(); marked=false; timer.stop()
    TYPE = a.textContent; questions = [];
    [container, Array.from(container.children),
     Array.from(document.querySelectorAll("#settings input"))].flat().
     forEach(i=>i.style.borderColor=background)
    a.style.zIndex = 3;
    for (let i=3; i>-1; i--){
        each = ul.children[3-i]
        if (each!=a) each.style.zIndex = i;
    }
})
/*for form*/
submit. onclick = () =>{
    event.preventDefault();
    abled();
}
/*for question('s')*/
document.querySelectorAll('#question *').forEach(i=>i.disabled = true)
next.onclick=function jj(){
    if(at>=N-1) {
        !marked?mark():0; return;
    };
    questions[++at].display();
    next.style.cssText = (at>=N-1 && !marked)?'--s: "submit"':''
}
prev.onclick=function jj(){
    if(at<=0) return;
    questions[--at].display();
    next.style.cssText = ''
}
checkAnswer.onclick=()=>{
    event.preventDefault(); questions[at].check()
}

document.querySelectorAll('#options [name=choice]').forEach(i=>{
    i.onchange=()=>{questions[at].attempt(Array.from(options.children).indexOf(event.target.parentElement))}
})