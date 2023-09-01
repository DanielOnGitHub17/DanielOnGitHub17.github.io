// identify();
showmore.onclick=()=>{
    let x = showmore.textContent=='>';
    more.style.width= x?"70%":'';
    showmore.textContent = x?'<':'>';
};
friendsList.onclick=()=>{
    
}
//get allDetails
let allDetails;
fetch('cgi-bin/everyone.py').then(i=>{
    i.json().then(j=>allDetails=j);
});