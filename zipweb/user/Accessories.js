//compressor
let cmpdiv = get('compressor');
[...accessories.children].forEach(i=>{
    i.manager = new XMLHttpRequest;
    [...i.querySelectorAll('*')].filter(j=>j.className).forEach(x=>i[x.className]=x);
    ['closebutton', 'minimizebutton'].forEach(b=>{
        i[b].onclick = ()=> window[b.slice(0, b.search('button'))](i);
    });
});
//events
cmpdiv.__defineGetter__('url', ()=>`
    ../cgi-bin/zipfiles.py?user=${
            user}&archivename=${
            cmpdiv.archivename.value.trim().split(' ').join('_')
            }&files=${JSON.stringify(cmpdiv.filess)}&toadd=${
                cmpdiv.archivesname.value.split('.')[0]}`);
cmpdiv.onclick=()=>{
    event.stopPropagation();
    cmpdiv.parentElement==accessories&&(cmpdiv.open?maximize(cmpdiv):showCompressor());
    let x = event.target.className;
    switch (x){
        case 'compressbutton':
            event.preventDefault();
            cmpdiv.compressionoptions
            cmpdiv.filess = [];
            [...cmpdiv.fileslist.children].forEach(f=>{
                if(f.obj.selectref.checked)cmpdiv.filess.push(f.obj.name);
            })
//             console.log(cmpdiv.filess);
            if (!cmpdiv.filess.length) {return alert('You must select at least one file for compression!'); break}
            if(cmpdiv.shouldadd.checked?!cmpdiv.archivesname.value
            :!cmpdiv.archivename.value) {return alert('Please input name of file'); break}
            if(cmpdiv.archivesname.checked&&
            cmpdiv.filess.some(i=>i==cmpdiv.archivesname.value)
            ) {return alert(`<span style='color: red'>
            Cannot compress self, Please unselect ${cmpdiv.archivesname.value}!</span>`); break}
            event.target.disabled=true;
            alert('File Compression started',1000);
            minimize(cmpdiv); loading.hidden=0;
            cmpdiv.manager.open('get', cmpdiv.url)
            cmpdiv.manager.send()
            cmpdiv.manager.onload=()=>{
                let r = cmpdiv.manager.response;
                if(r.trim()=='Action Successful'){
                    alert(r,1000); getDetailsBack()
                }else{errors.innerHTML = r; alert('Sorry, Action Failed',1000)}
                console.log(cmpdiv.manager.response);
                close(cmpdiv); loading.hidden = 1;
            }; break;
         
    }
}
cmpdiv.onchange=()=>{
    let e = event.target;
    switch (event.target.className){
        case 'complevel':
            cmpdiv.complevel.style.setProperty('--msg', `'${cmpdiv.complevel.value}'`); break;
        case 'addtolist':
            let n = event.target.value;
            if(n=='+') return;
            cmpdiv.addtolist.options.remove(event.target.selectedIndex)
            new FileRef(n, 'compressor')
            cmpdiv.addtolist.value = '+';
            break;
            case 'shouldadd':
                ['archivename'].forEach(i=>
                cmpdiv[i].parentElement.parentElement.hidden=e.checked);
                cmpdiv.archivesname.parentElement.parentElement.hidden=!e.checked;
                break;
    }
}
cmpdiv.archivename.onkeydown=()=>{if('./*\\\'"<>?|`:'.includes(event.key))event.preventDefault()};
function showCompressor(tobecompressed=selectedfiles.map(i=>{if(i.uploaded) return i.name}).filter(i=>i)){
    maximize(cmpdiv);
    for (let ref of tobecompressed){
        new FileRef(ref, 'compressor');
    }
    ['archivesname', 'addtolist'].forEach(i=>{
        while (cmpdiv[i].length) cmpdiv[i].remove(0)
    })
    cmpdiv.addtolist.add(new Option('+'))
    files.filter(i=>!i.selected).
    forEach(n=>cmpdiv.addtolist.add(new Option(n.name)));
    for (let ar of archives){
        cmpdiv.archivesname.add(new Option(ar.name));
    }
    cmpdiv.open = true;
};function minimize(win, size=0){win.style.transform= `scale(${size})`;setTimeout(()=>{accessories.appendChild(win); win.style.transform=''}, 500);}
function maximize(win){document.body.appendChild(win);win.style.transform='scale(0)';setTimeout(()=>win.style.transform='',100)}
function close(win){minimize(win, size=.3);win.open=0; win[win.id.slice(0, win.id.length-2)+'button'].disabled=0; while(iconrefs[win.id].length) iconrefs[win.id].forEach(i=>i.remove())}
// Extractor
let extdiv = get('extractor'); extdiv.filess = [];
function showExtractor(archive){
    maximize(extdiv)
    extdiv.files = archive.files;
    for(let ref of extdiv.files){
        new FileRef(ref.name, 'extractor');
    }
    extdiv.nameofarchive.textContent = archive.name;
    extdiv.open = true;
}
extdiv.onclick=()=>{
   event.stopPropagation();
   let s = event.target.className;
   extdiv.parentElement==accessories&&extdiv.open&&maximize(extdiv);
   switch (s){
       case 'extractbutton':
           extdiv.filess.length=0;
           [...extdiv.fileslist.children].forEach(f=>{
               if(f.obj.selectref.checked)extdiv.filess.push(f.obj.name);
           })
           if (!extdiv.filess.length) {return alert('You must select at least one file for extraction!'); break}
           alert('Extraction started!',1000); minimize(extdiv);
           loading.hidden=0;
           event.target.disabled = true;
           extdiv.manager.open('get',`../cgi-bin/extract.py?user=${user}&archivename=${
               extdiv.files.archive.name
           }&files=${JSON.stringify(extdiv.filess)}`);
           extdiv.manager.send();
           extdiv.manager.onload=()=>{
               if (extdiv.manager.response.trim()=='Action successful'){
                   alert('Action successful',1000);
                   extdiv.filess.forEach(f=>{
                       downloadbutton.href = `/users/${user}/extracted/${f}`;
                       downloadbutton.download = f; downloadbutton.click();
                   })
               }else{alert('Sorry, action could not be performed',1000)}
               close(extdiv); loading.hidden=1;
           }
           break;
   }
}