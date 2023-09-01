// [...get('actionsPane').querySelectorAll('input')].forEach(i=>i.type='button');
let propertiesDiv = get('propertiesDiv'),
importers = getAll('.import'),
importbutton = getS("[type=file]"),
downloadbutton = get('downloader'),
newarchive = get('newarchive');
importers.forEach(i=>{
    i.addEventListener('click', event=>{
        importbutton.click(); importbutton.clickedfor = [
        'files', 'archives'][importers.indexOf(i)];
    })
})
newarchive.onclick=()=>{
    prompt(()=>{
        sstream = sstream.trim().split(' ').join('_');
        if(!sstream) return setTimeout(()=>alert('Input a name!', 1000));
        loading.hidden = 0;
        fetch(`/cgi-bin/createArchive.py?user=${user}&archivename=${sstream
        }`).then(i=>{
            i.text().then(j=>{window.c = j; alert(j.trim()=='Action Successful'?j:'Action Failed');
             if(j.trim()=='Action Successful') getDetailsBack(); loading.hidden=1})
        }).catch(i=>{alert('Action Failed'); loading.hidden=1})
    }
     ,`<h2>Archive Creation Wizard.</h2><p>Enter the name of the new archive.<br>Note: if you have another archive with that name, it will be replaced!</p><br><b>Please do not include extentions</b>`)
}
let texts = {}, fet, current, sender = new XMLHttpRequest(), reader = new FileReader;

importbutton.addEventListener('change', event=>{
    //clearing
    for (let t in texts){texts[t].length=0; delete texts[t]}
    let files = [...event.target.files];
    if (!files.length)return;
    for (let f of files){
        if (f.name=='details.json') return;
        new (importbutton.clickedfor=='files'?FiLe:Archive)(f.name.split(' ').join('_'), f, false);
    }
})
onload=()=>{
    window.user = localStorage.ZipWebUserName;
    window.userDetails = JSON.parse(localStorage.ZipWebUser);
    getDetailsBack(true);
//     loadFiles(userDetails)
}
onbeforeunload=()=>{
    if (files.filter(i=>!i.uploaded).length) return false;
    files.filter(i=>!i.uploaded).forEach(i=>{i.delete();})
}
lo.onclick=onclose=()=>{
    delete localStorage.ZipWebUser;
    delete localStorage.ZipWebUserName;
}
addEventListener('close', onclose)
/*For accessories*/
let actionsbar = get('actionsPane')
actionsbar.onclick=()=>{
    if(event.target.nodeName=='INPUT'){
//         files.forEach(i=>i.selected&&i.selectar.click())
    }else{return}
    let l = selectedfiles.length,
     lu = selectedfiles.filter(i=>i.uploaded).length,
     ln = selectedfiles.filter(i=>!i.uploaded).length;
    switch (event.target.value.toUpperCase()){
        case 'COMPRESS':
            if(cmpdiv.open) return maximize(cmpdiv)
            if(!l) return alert('No files Selected');
            showCompressor();
            break;
        case 'PROPERTIES':
            break;
        case 'RENAME':
            break;
        case 'DOWNLOAD':
            lu&&confirm(()=>{selectedfiles.forEach(i=>i.uploaded&&i.download(1))}, `Do you want to download th${l==1?'is':'ese'} file${l==1?'':'s'}?`, 'YES', 'No')
            break;
        case 'REMOVE':
            ln&&confirm(()=>selectedfiles.filter(i=>!i.uploaded).
            forEach(i=>{i.uploading&&i.stopupload();i.remove()}), 'Remove? Not yet uploaded!', 'YES', 'NO')
            break;
        case 'DELETE':
            l&&confirm(()=>selectedfiles.forEach(i=>i.uploaded&&i.delete(1)), 'Delete files? This action cannot be undone'); break;
        case 'EXTRACT':
            if (selectedfiles.filter(i=>i.for=='archive').length!=1){
                alert('You must select <i>an archive</i> for extraction')
            } else selectedfiles.filter(i=>i.for=='archive')[0].beautifiar.ondblclick();
            
    }
}
function showdesc(){}