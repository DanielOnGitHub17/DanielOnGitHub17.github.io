let FasReg = document.getElementById('FasReg'),
FasPay = document.getElementById('FasPay'),
home = document.getElementById('home'),
pic = document.getElementById('pic'),
homepage = document.getElementById('homepage'),
Reg = document.getElementById('Reg'),
Buy = document.getElementById('Buy'),
hidden = document.getElementById('hidden'), cap = 1;
ww = first;
pic.innerHTML = "<img src='caps/cap1.jpg'>"
turn = (sn) => {pic.style.opacity =  '0'; setTimeout(()=>{pic.style.opacity =  '100'; sn?pic.innerHTML = `<img src='caps/cap${cap==8?8:++cap}.jpg'>`:pic.innerHTML = `<img src='caps/cap${cap==1?1:--cap}.jpg'>`;}, 500)};
function switchOn(link, content){
    content.style.height = 'initial'; content.style.opacity = '1';
    link.style.background = '#f3e5f5cc'
}
function switchOf(link, content){
    content.forEach(i=>{i.style.opacity = i.style.height='0'})
    link.forEach(i=>i.style.background = '')
}

/**/
document.body.addEventListener('click', event=>{
    hidden.style.top = '0px'; let target = event.target;
//     if(target == hidden) {
//         hidden.style.opacity="100%"; hidden.style.width="fit-content"; hidden.style.height="300px";
//     } else{
//         hidden.style.opacity="0"; hidden.style.width="70"; hidden.style.height="60px";
//     }
//     if(target.parentElement.parentElement.parentElement==hidden){
//         target.style.border="3px dotted purple"
//         target.style.paddingLeft="30px"
//         target.style.borderRadius="1em"
//     }
    switch(event.target.textContent){
        case "Home Page":
            switchOf([FasReg, FasPay],[Reg, Buy])
            switchOn(home, homepage)
            break;
        case "Register":
            switchOn(FasReg, Reg)
            switchOf([FasPay, home],[Buy, homepage])
            break;
        case "Buy Items":
            switchOn(FasPay, Buy)
            switchOf([FasReg, home],[Reg, homepage])
            break;
        case "previous":
            turn(0); 
            break;
        case "next pic":
            turn(1); ;
            break;
    }
});