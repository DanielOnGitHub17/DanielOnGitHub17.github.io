let make= (name='div')=>document.createElement(name),
get=(id)=>document.getElementById(id),
getE=(selector, value)=>document.querySelector(`[${selector}=${value}]`),
getS=(query)=>document.querySelector(query),
getAll=(query)=>[...document.querySelectorAll(query)];
let identify=()=>getAll('[id]').forEach(i=>window[i.id]=i),
    add=(what, to=document.body)=>to.appendChild(what),
    bx = (who)=>who.getBoundingClientRect();
identify();
let cute = (com, val)=>document.execCommand(com, false, val),
    reader = new FileReader, D = new DOMParser;
onkeyup=onkeydown=(event)=>{
    onchange()||event.key=='s' && event.ctrlKey && event.preventDefault()||(localStorage.markup = markup.value, localStorage.style=style.value)
};
editor.onkeydown=editor.onkeyup=()=>{
    return [(viewer.innerHTML = markup.value), (styleeffector.innerHTML=style.value)]
};
style.onkeydown=()=>{
    let x = style.value.split(''), s = style.selectionStart;
    if(event.key=='{'){
        x[s] = '{\n    \n}';
        style.value = x.join('')
        style.setSelectionRange(s+6, s+6);
        event.preventDefault()
    }
    if (event.key=='Enter' && !'}'.includes(style.value[s-1])){
        x[s-1]+='\n    '
        style.value = x.join('');
        style.setSelectionRange(s+5, s+5);
        event.preventDefault()
    };
}
editor.onkeydown()
viewer.contentEditable = true;

viewer.spellcheck=!(markup.spellcheck = style.spellcheck=0)
viewer.onchange=viewer.onkeydown=viewer.onkeyup=()=>{
    event.stopPropagation();
    onkeydown(event)
    if(event.altKey&&event.key=='f'){
        event.preventDefault();
        cute('fontSize', o_fontSize.value)
    }
    markup.value = viewer.innerHTML;
}
//options
// for edition bold, italics, underline, etc; use document.execCommand()
o_edit.onclick=()=>{
    event.stopPropagation();
    let c = event.target,
    com = c.getAttribute('command'), val = c.getAttribute('value');
    if (c.nodeName!='BUTTON') return;
    // console.log(com, val)
    cute(com, val);
    viewer.onkeydown()
};
getAll('#o_edit>button>*').forEach(e=>e.onclick=()=>e.parentElement.click());
o_edit.oninput=()=>{
    let com = event.target.getAttribute('command'), val = event.target.value;
    cute(com, val/*+com=='fontSize'?'px':''*/);
    viewer.onkeydown()
}
['Arial', 'Fantasy', 'Cursive', 'Serif', 'Sans serif'].forEach(f=>{
    fontFamily.add(new Option(f))
})

getAll('#o_edit>:not(button, h3)').forEach((e, i)=>{
        e.onchange=()=>{
            let x = get('o_'+e.id);
            x.setAttribute('value', e.value);
            i==1?x.children[0].size=e.value:x.style[e.id]=e.value
        }
        e.onchange()
});

//saving
o_save.onclick=()=>{
    let t = new Blob([...`${forHTML?(viewer.outerHTML+'\n'+styleeffector.outerHTML):(viewer.innerText)}`]);
    reader.readAsDataURL(t);
    reader.onload=()=>{
        let x = o_name.value.split('.');
        if (!forHTML && x.length==1) {o_name.value+='.txt'}
        save.download = o_name.value+(forHTML&&!o_name.value.endsWith('.html')?'.html':'');
        save.href = reader.result;
        save.click();
    }
}
o_open.onclick=()=>{
    o_file.click();
}
o_file.onchange=()=>{
    let x = o_file.files[0];
    if (!x) return alert('no file selected');
    if(!x.type.includes('text/')) return alert('No supported editor for '+x.type);
    x.text().then(i=>{
        if (forHTML){
            dx = D.parseFromString(i, 'text/html');
            markup.value = dx.firstElementChild.innerHTML;
            o_name.value = x.name.split('.html')[0];
        }else{
            markup.value=i.replaceAll('  ', ' &nbsp;');
            markup.value=markup.value.replaceAll('\n', '<br>')
            markup.value=markup.value.replaceAll('\t', ' &nbsp;'.repeat(2))
            o_name.value=x.name;
        }
        editor.onkeydown();
    })
}
onload=()=>{
    editor.style.display = (forHTML = confirm('Use Editor to make HTML5 files?'))?'':'none';
    markup.value=localStorage.markup;
    style.value=localStorage.style!='undefined'?localStorage.style:style.value;
    editor.onkeydown();
    onchange()
}
onbeforeunload=()=>{
    localStorage.markup=markup.value;
    localStorage.style=style.value
};
//for stats
onchange=()=>{
    NoC.textContent = viewer.innerText.length;
    WWr.textContent = viewer.innerText.split(/ +/).length;
    NoP.textContent = viewer.innerText.split(/\n+/).length;
}

ras.onclick= function s(){
    let x = getSelection().getRangeAt(0);
    speechSynthesis.speak(new SpeechSynthesisUtterance(x.startContainer.textContent.slice(x.startOffset, x.endOffset)))
}
//May 15, 2023; goaty child born; 20: 37 make it nice so it can be used for phone

// Earlier today I wanted to do Web Dev Website or DevD or DDev