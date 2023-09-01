/*console.log(3)*/
let ul = document.querySelector('ul'),score=0, TYPE='Quadratics', at=0, questions = [], marked = false;
 container = container; options = options;

/*maybe move all these(on me) to another JS file / html*/
function dabled(){
    document.querySelectorAll('#question *').forEach(i=>i.disabled = true)
    document.querySelectorAll('#settings input').forEach(i=>i.disabled=false);
    questions.length = 0;
}
function abled(){
    document.querySelectorAll('#question *').forEach(i=>i.disabled = false)
    checkAnswer.disabled = true;
    N = parseInt(document.getElementById('N').value);
    NAME = User.value;
    question.style.opacity = '1';
    document.querySelectorAll('#settings input').forEach(i=>i.disabled=true);
    start(TYPE)
}
function start(type = TYPE){
    let n = N;
    for(let i = 0; i<n; i++){
        questions.push(
         new Question(type, randBtw(0, Topics[type].length-1), i+1)
         )
    }
    questions[0].display();
    hiS.firstElementChild.textContent=`${score=0}/${N}`; timer.start()
}
function AT(q = at){
    questions[q].display();
}
// function checkAnswer(){
//     Array.from(options.children).forEach(i=>{
//         if(i.firstElementChild.getAttribute('class')=='wrong'){
//             i.style.border = '2px solid red';
//         } else{
//             i.style.border = '2px solid blue'
//         }
//     })
// }
// function clearAnswer(){
//     document.querySelector(`#question [value='check answer']`).disabled = true;
//     Array.from(options.children).forEach(i=>i.style.border='')
// }
class Question{
    constructor(type, subtype, QuestionNo){
        this.type = type;
        this.subtype = subtype;
        this.QuestionNo = QuestionNo;
        [this.text, this.answer, this.suffix] = Topics[type][subtype]()
        this.options = generateOptions(this.answer);
        this.attempted = false; this.checked = false;
        this.choice = ''
    }
    display(){
        document.getElementById('text').innerHTML = `<span id='questionNo'>${this.QuestionNo}. </span>`+this.text;
        for (let i = 0; i<4; i++){
            let a = options.children[i], b = a.firstElementChild;
            a.lastElementChild.innerHTML = this.options[i];
            b.setAttribute('class', this.options[i]==this.answer?'correct':'wrong')
            b.checked = false; b.parentElement.style.border = ''
        }
        if(this.attempted) options.children[this.choice].firstElementChild.checked=true
        document.querySelectorAll('.correct')[0].parentElement.style.border
         = this.checked?`5px dotted ${background}`:'';
        /*19th october, 2022: make it look as if it never left*/
        checkAnswer.disabled=this.checked||!this.attempted;
        document.querySelectorAll('#question [name=choice]')
         .forEach(i=>i.disabled = this.checked)
    }
    get correct(){
        return this.answer==this.options[this.choice]
    }
    check(){
        this.checked = true;
        document.querySelectorAll('.correct')[0].parentElement.style.border = `5px dotted ${background}`
        checkAnswer.disabled = true;
        document.querySelectorAll('#question [name=choice]')
           .forEach(i=>i.disabled = this.checked)
        hiS.firstElementChild.textContent=`${score+=this.correct}/${N}`
    }
    attempt(choice){
        this.choice = choice;
        this.attempted = true; checkAnswer.disabled = false;
    }
}
class Timer{
    constructor(div){
        this.time = 0;
        this.clock = div;
    }
    start(){
        this.time = 0;
        this.stopper = setInterval(()=>{
            this.clock.textContent = 
            `${parseInt(this.time/3600)}:${this.minutes}:${this.seconds}`;
            this.time+=1
        }, 1000)
    };
    get seconds(){
        let m = this.time%60+'';
        if (m.length==1) m = 0+m;
        return m
    }
    get minutes(){
        let m = parseInt(this.time/60)%60+''
        if (m.length==1) m = 0+m;
        return m
    }
    get now(){
        return 3
    }
    stop(){
        clearInterval(this.stopper)
    }
}
timer = new Timer(time)
function mark(){
    marked=true;
    questions.forEach(i=>{
        if (!i.checked) {
            hiS.firstElementChild.textContent=`${score+=i.correct}/${N}`
            i.checked = true;
        }
    })
    questions[N-1].display();
    submit.value = 'restart';
    submit.onclick = ()=>{event.preventDefault(); load()}; submit.disabled = false;
    timer.stop()
}