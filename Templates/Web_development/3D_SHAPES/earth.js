let get = (name)=>document.getElementById(name),
 rotors = [...document.querySelectorAll('[id*=rotate]')],
canroll = get('canroll'),
stopper = get('stopper'), V = 0, d = -2,
earth = get('earth');
rotors.forEach(i=>i.onchange=()=>earth.style.transform=`rotateX(${rotateX.value}deg) rotateY(${rotateY.value}deg) rotateZ(${rotateZ.value}deg)`)
function roll(){
    if (canroll.checked) {
        V+=d
        rotors.forEach(i=>i.value=V);
        earth.style.transform = `rotateX(${V}deg) rotateY(${V}deg) rotateZ(${V}deg)`;
    }
//     V+=d;
    if (stopper.checked) V=0;
//     if (V%360<5) d=.05
    if(V>=3600)d=-2;
    if (V<=-3600)d=2;
    requestAnimationFrame(roll)
}
roll();
// descriptions
let descriptions = ["Greenwhich Meridian", "Longitude", "Longitude"
, "Longitude", "Equator", "Tropic of Cancer", "Tropic of Cancer"
, "Tropic of Capricorn", "Tropic of Capricorn"]

earth.onmouseover = (event)=>{
    earth.style.setProperty('--description'
    , `"${descriptions[[...earth.children].indexOf(event.target)]}"`
    )
}
addEventListener('touchstart', onmouseover)