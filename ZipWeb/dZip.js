//do so that links will never load the page (if it supports JS anyway)
//functions definition
// onload=function (){
let submitter = msg = 0
  , load = (n=true)=>loading.hidden = !(submitter.disabled = n)
  , writeErr = (n='An Error Occured, Please try again')=>msg.innerHTML = n
  , errorStop = (n='An Error Occured, Please try again')=>{
    writeErr(n);
    load(0)
}
;
var make = (name='div')=>document.createElement(name)
  , get = (id)=>document.getElementById(id)
  , getE = (selector,value)=>document.querySelector(`[${selector}=${value}]`);
getS = (query)=>document.querySelector(query);
getAll = (query)=>[...document.querySelectorAll(query)];
function loader() {
    window.loading = make();
    loading.id = 'loading';
    for (let n = 0; n < 8; n++) {
        let c = make();
        c.id = 'c' + n;
        c.style.animationDelay = n / 8 + 's';
        //         use other numbers appart from .125 to see effects;
        loading.appendChild(c);
        loading.hidden = 1;
    }
    document.body.appendChild(loading);
}
;loader();
// instance for every one
let d = new DOMParser;
