generatePiMaker.onclick=()=>{
    event.preventDefault();
    if(numberOfSides.reportValidity()){
        let n = +numberOfSides.value;
        Polygon.blink((new PiMaker(n, userMadePiMakers)).innerPolygon.polygon);
    }
}
numberOfSides.onchange=()=>{
    lengthOfSide.value = 400/+event.target.value;
}
