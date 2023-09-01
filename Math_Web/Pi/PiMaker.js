class PiMaker {
    constructor(n, container, length=400/n) {
        this.container = container;
        this.n = n; this.length = length;
        this.toBeMensurated = [
            "s = Length of side"
            , "A = Area", "P = Perimeter"
            , "L = 'Long diameter'", "S = 'Short diameter'",
            , "a = A.M Diameters", "g = G.M Diameters"
            , "h = H.M Diameters", "q = Q.M Diameters"
        ];
        this.toBeRatioed = [
            "P/L", "P,S", "L/S"
            , "A/(L/2)<sup>2</sup>", "A/(S/2)<sup>2</sup>"
            , "P/a", "P/g", "P/h", "P, q"
        ];
        this.mensured=[
            "length", "area", "perimeter", "long Diameter", "short Diameter"
        ];
        this.domize();
        piMakers.push(this);
    }
    domize(){
        (this.box = make()).className = 'PiMaker';
        add((this.visual = makeSVG('svg')), this.box).setAttribute('class', 'polygonContainer');
        add((this.mensurations = make('table')), this.box).className = 'polygonMensurations';
        add((this.ratios = make('table')), this.box).className = 'polygonRatios';
        ['out', 'inn'].forEach(
            p=>this[p+'erPolygon'] = new Polygon(this.n, this.visual, [[0,0]]), this.length);
        this.circle = new Circle(this.visual);
        this.env = this.length;
        this.container.append(this.box);
    }
    set env(length){
        this.length = length;
        this.width = this.height= length*2+60;
        // this.visual.setAttribute(
        //     'viewBox', `0 0 ${this.width} ${this.height}`);
        this.outerPolygon.makePoints(this.n, this.startPoint, length);
        this.innerPolygon.points =this.outerPolygon.midPoints;
        // ['width', 'height'].forEach(i=>this.visual.setAttribute(i, this.outerPolygon.longDiameter*1.2));
        this.forEach(p=>p.draw());
        this.circle.draw(this.center, this.radius);
        this.makeCalculations();
    }
    get startPoint(){
        return [[100, 5]];
    }
    get center(){
        return this.outerPolygon.center;
    }
    get radius(){
        return this.outerPolygon.shortDiameter/2;
    }
    forEach(f){
        ['out', 'inn'].map(p=>this[p+'erPolygon']).forEach(i=>f(i));
    }
    makeCalculations(){
        this.mensurate(); this.ratio();
    }
    mensurate(){
        let mens = this.mensurations.querySelectorAll('*');
        while (mens.length){
            mens[0].remove();
        }
        let [dd, d, D] =
            [this.innerPolygon.shortDiameter
             ,this.outerPolygon.shortDiameter
             ,this.outerPolygon.longDiameter]
            , [rr, r, R] = [dd, d, D].map(i=>i/2);
        let row = this.mensurations.insertRow();
        [this.n, "outer polygon", "inner polygon"].forEach(i=>add(make("th"), row).innerHTML = i);
        this.mensured.forEach((m, i)=>{
            let r = this.mensurations.insertRow();
            [m, this.outerPolygon[m.split(' ').join('')], this.innerPolygon[m.split(' ').join('')]].forEach(j=>r.insertCell().innerHTML=j);
        });
        return this.mensurations.innerHTML;
    }
    ratio(){
        
    }
}
'POLYGONNAME'||                 'outer'    ||    'inner'
'perimeter'            
'Area'
'LongDiam'
'short diam'
'';