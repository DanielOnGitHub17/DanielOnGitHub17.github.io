let nn = ['files', 'archives'], nnn = [FiLe, Archive]; 
function clearScreen(){
    while (files.length){
        files.forEach(f=>f.remove())
    }
}
function loadFiles(from=userDetails){
    clearScreen();
    pathdiv.textContent = user+'/';
    nn.forEach((f, i)=>{
        for (let det in from[f]){
            let obj = {};
            obj.size = from[f][det]['size'];
            obj.lastModifiedDate = from[f][det]['Date Modified'];
            i&&(obj.files = from[f][det]['files']);
            new nnn[i](det, obj, true)
        }
    })
}
function getDetailsBack(){
    let holdfiles = [];
    files.filter(i=>!i.uploaded).forEach(f=>{
        holdfiles.push([f.name, f])
    })
    fetch('/users/'+user+'/'+'details.json')
    .then(resp=>resp.json().then(i=>{
        userDetails=i; localStorage.ZipWebUser 
        = JSON.stringify(userDetails); loadFiles()}))
    //     .catch(requestAnimationFrame(getDetailsBack))
}
function getDetailsBack(andload){
    fetch('/users/'+user+'/'+'details.json').then(resp=>resp.json().then(i=>{
        hold = i;
        // console.log('fetched')
//         if (hold==userDetails) return
        nn.forEach((f, n)=>{
            for (let x in hold[f]){if (!(x in userDetails[f])) {FiLe.getByName(x)&&FiLe.getByName(x).remove(); (new nnn[n](x, hold[f][x], true))}}
            for (let y in userDetails[f]){if (!(y in hold[f])) delete userDetails[f][y]}
        })
        localStorage.ZipWebUser = JSON.stringify(userDetails=hold);
        andload&&loadFiles(userDetails)
    }))
}
function clearAllIn(array){
    while (array.length){
        array.forEach(i=>i.remove())
    }
}