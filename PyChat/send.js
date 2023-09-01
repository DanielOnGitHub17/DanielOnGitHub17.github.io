sendar.onclick=()=>{
    if (!messagar.innerHTML) return;
    sendar.disabled=1;
    let text = messagar.innerHTML;
    messagar.innerHTML='';
    
}