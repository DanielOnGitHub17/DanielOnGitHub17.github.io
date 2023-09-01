identify();
let cute = (com, val)=>document.execCommand(com, false, val),
    reader = new FileReader, D = new DOMParser;
onkeyup=onkeydown=(event)=>{
    onchange()||event.key=='s' && event.ctrlKey && event.preventDefault()||(localStorage.markup = markup.value, localStorage.style=style.value)
};
editor.onkeydown=editor.onkeyup=()=>{
    return `${(viewer.innerHTML = markup.value)+(styleeffector.innerHTML=style.value)}`
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
        cute('fontSize', o_fsize.value)
    }
    markup.value = viewer.innerHTML;
}
//options
// for edition bold, italics, underline, etc; use document.execCommand()
o_edit.onclick=()=>{
    // event.stopPropagation();
    let c = event.target,
    com = c.getAttribute('command'); val = c.getAttribute('value');
    if (!['BUTTON', 'INPUT'].includes(c.nodeName)||c.parentElement!=o_edit) return;
    // if(['number', 'color'].includes(c.type)||c.nodeName=='SELECT') val = c.value;
    cute(com, val);
    viewer.onkeydown()
}
o_edit.oninput=()=>{
    let com = event.target.getAttribute('command'), val = event.target.value;
    cute(com, val/*+com=='fontSize'?'px':''*/);
    viewer.onkeydown()
}

['Arial', 'Fantasy', 'Cursive', 'Serif', 'Sans serif'].forEach(f=>{
    o_font.add(new Option(f))
})

//saving
o_save.onclick=()=>{
    let t = new Blob([...`${viewer.outerHTML+'\n'+styleeffector.outerHTML}`]);
    reader.readAsDataURL(t);
    reader.onload=()=>{
        save.download = o_name.value+'.html';
        save.href = reader.result;
        save.click();
    }
}
o_open.onclick=()=>{
    o_file.click();
}
o_file.onchange=()=>{
    let x = o_file.files[0];
    if(x.type!='text/html') return alert('No supported editor for '+x.type);
    x.text().then(i=>{
        dx = D.parseFromString(i, 'text/html');
        markup.value = dx.body.innerHTML;
        o_name.value = x.name.split('.html')[0];
        editor.onkeydown();
    })
}
onload=()=>{markup.value=localStorage.markup; style.value=localStorage.style!='undefined'?localStorage.style:style.value; editor.onkeydown(); onchange()}
onbeforeunload=()=>{localStorage.markup=markup.value; localStorage.style=style.value};
//for stats
onchange=()=>{
    NoC.textContent = viewer.textContent.length;
    WWr.textContent = viewer.textContent.split(' ').length;
    NoP.textContent = viewer.querySelectorAll('p').length;
}