generatePiMaker.onclick=()=>{
    event.preventDefault();
    if(numberOfSides.reportValidity()){
        let n = +numberOfSides.value, l = +lengthOfSide.value;
        Polygon.blink((new PiMaker(n, userMadePiMakers, l?l:undefined)).innerPolygon.polygon);
    }
}
numberOfSides.onchange=()=>{
    lengthOfSide.value = 400/+event.target.value;
}