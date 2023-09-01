/*for switches*/
SC = shuffleCards;
SC.addEventListener('change',function solve(){
    let aids = document.getElementById('aids');
    let a = SC.value;
    if(a!='solve'){
         [draw, dot].flat().forEach(i=>i.style.display='none');
    } else{
        [draw, dot].flat().forEach(i=>i.style.display='')
    }
    SC.style.borderColor = document.
     querySelector(`[value = ${a}]`).style.background;
    for (let i=3; i>0; i--){
        each = aids.children[i];
        each.style.zIndex = -i;
        each.active = false;
    }
    let aa = document.getElementById(a)
    aa.style.zIndex = 4; aa.active = true
})

calculator = calculator;
buttons = ['sin()', 'cos()', 'tan()', '/', '7', '8',
'9', '*', '4', '5', '6', '-', '1', '2', '3', '+', '^', '0',
'.', '=']
buttons.forEach(i=>{
    let button = make('button');
    button.textContent = i;
    if (!isNaN(i)) button.setAttribute('class', 'number');
    calculator.appendChild(button);
})
calculator.addEventListener('click', event=>{
    if (event.target.nodeName!='BUTTON') return
    let button = event.target.textContent;
    if (button=='='){
        calculator.firstElementChild.value
         = eval(String(calculator.firstElementChild.value)
         .replace('^', '**'));
    } else{
        calculator.firstElementChild.value += button;
    }
})
/*finished friday, 30sep2022*/