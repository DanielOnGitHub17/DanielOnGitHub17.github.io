class Polygon {
    constructor(numberOfSides, container, startPoint, length) {
        if(typeof numberOfSides == "number"){
            // if(numberOfSides%2)throw 'cant do for odds';
            this.numberOfSides = numberOfSides;
            this.startPoint = startPoint;
            this.length = length;
            this.makePoints(numberOfSides, startPoint, length);
        }else{
            this.points = numberOfSides;
            this.startPoint = numberOfSides[0];
            this.numberOfSides = this.points.length;
            if(this.numberOfSides<4)throw 'Must be more than three';
            this.angle = ((this.numberOfSides-2)*180)/this.numberOfSides;
            this.length = Polygon.distance(this.points[0], this.points[1]);
        }
        container&&this.domize(this.container = container);
        polygons.push(this);
    }
    domize(){
        if (this.numberOfSides<4) {
            // throw TypeError("Number of sides for a polygon must be up to 4")
        }
        add((this.polygon = makeSVG("polygon")), this.container);
        // this.draw();
    }
    draw(){
        this.length = Polygon.distance(this.points[0], this.points[1]);
        this.polygon.setAttribute("points", this.points.join(' '));
    }
    makePoints(numberOfSides, startPoint, length){
        //clear points
        if (this.points) {
            this.points.forEach(i=>i.length=0); this.points.length=0;
        }
        //re-assignment to this
        this.points = JSON.parse(JSON.stringify(this.startPoint=startPoint));
        // console.log(this.points);
        this.angle = ((numberOfSides-2)*180)/numberOfSides;
        this.ext = 180-this.angle;
        this.numberOfSides=numberOfSides; this.length=length;
        //end re-assignment to this
        for (let p = 1; p < numberOfSides; p++) {
            let ca = this.ext*p-this.ext/2;//this 180-this.ext*p worked 22:16 jul 18, 2023 thank God(now for modifications for it to work how I want it to work)
                //get write different formulas for different patterns
                //(180-)this.angle*p with large numberOfSides to make stars (higher n to make ...)
                //to be used=this.ext*p (-this.ext/2(for turning it))
            this.points[p] =
                Polygon.getNextPointThroughTrig(
                    this.points[p-1], ca, this.length
                )
        }
    }
    get midPoints(){
        let s = [], x = this.points, n = this.numberOfSides;
        for (let p = 0; p < n; p++) {
            s[p] = Polygon.midPoint(
                [x[p][0], x[p][1]]
                ,    [x[(p+1)%n][0], x[(p+1)%n][1]]
            )
        }
        return s;
    }
    get shortEnds(){
        let ends = [this.midPoints[0]],
            mid = parseInt(this.numberOfSides/2);
        ends.push(
            this.numberOfSides%2
            ?Polygon.midPoint(
                this.midPoints[mid], this.midPoints[mid+1]
            )
            :this.midPoints[mid]
        );
        return ends;
    }
    get longEnds(){
        let ends = [this.points[0]]
            , mid = parseInt(this.numberOfSides/2);
        ends.push(
            this[(this.numberOfSides%2?'midP':'p')+'oints'][mid]
        );
        return ends;
    }
    get shortDiameter(){
        return this.numberOfSides%2
            ?2*Polygon.distance(this.center, this.midPoints[0])
            :Polygon.distance(...this.shortEnds);
    }
    get longDiameter(){
        return this.numberOfSides%2
            ?2*Polygon.distance(this.center, this.points[0])
            :Polygon.distance(...this.longEnds);
    }
    get center(){
        if (this.numberOfSides%2) {
            let mid = 1+parseInt(this.numberOfSides/2);
            return Polygon.intersection([this.points[2], this.midPoints[mid+1]], [this.points[1], this.midPoints[mid]])
        } else {
           return  Polygon.midPoint(...this.longEnds);
        }
    }
    get trianglePoints(){
        let z = Polygon.getTrianglePoints(this.points), x = [z.triangles], y = z.firsts, i=0;
        // console.log('x: ', x, '\ny: ', y, '\nz: ', z);
        while (y.length>2){
            z = Polygon.getTrianglePoints(y);
            y = z.firsts;
            x.push(z.triangles);
            // console.log('x: ', x, '\ny: ', y, '\nz: ', z);
        }
        return x;
    }
    get triangles(){
        return this.trianglePoints.flat().map(i=>new Triangle(i));
    }
    get area(){
        return sum(this.triangles.map(i=>i.area));
    }
    get perimeter(){
        return this.length*this.numberOfSides;
    }
    static blink(s){
        s.scrollIntoView();
        let i = 0, x = setInterval(()=>{
            s.style.stroke = ['black', 'white'][i++%2];
            if(i==10){
                s.style.stroke = '';
                clearInterval(x);
            }
        }, 100)
    }
    static intersection(pointSet1, pointSet2){
        // console.log(arguments);
        let a = Polygon.gradient(...pointSet1)
            ,b = Polygon.intercept(pointSet1[0], a)
        ,c = Polygon.gradient(...pointSet2)
        ,d = Polygon.intercept(pointSet2[0], c)
        //y = mx + c
        //y = ax + b
        //y = cx + d
        ,x = (b-d)/(c-a)
        ,y = (b*c - a*d)/(c-a);
        // console.log(a, b, c, d, x, y)
        return [x, y];
    }
    static gradient(point1, point2){
        return [point1, point2].reduce((f, s)=>
            (s[1] - f[1])/(s[0] - f[0]))
    }
    static intercept(point, gradient){
        return point[1] - gradient*point[0];
    }
    static midPoint(point1, point2){
        return [point1, point2].reduce((f, s)=>[(f[0]+s[0])/2, (f[1]+s[1])/2]);
    }
    static distance(point1, point2){
        return Math.sqrt((point2[0]-point1[0])**2 + (point2[1]-point1[1])**2);
    }
    static getNextPointThroughTrig(firstPoint, angle, length){
        let vec = [cos(angle)*length, sin(angle)*length];
        return [firstPoint[0]+vec[0], firstPoint[1]+vec[1]];
    }
    static getNextPointThroughCoord(firstPoint, angle, length){
        //first calculate y = mx + c;
        let a = firstPoint[0], b = firstPoint[1]
            ,m = tan(angle), c = b-m*a
            ,A = (1+m**2), B = (2*(m*(c-b) - a))
            ,C = (a**2 + (c-b)**2 - length**2), x = solveQuadraticEquation(A, B, C)
            ,y = x.length?x.map(i=>(m*i + c)):[];
       // console.log(x[0]*m + c))
        return y.length?[x[0], y[0]]:[];
    }
    static names = ['', '', 'triangle', 'quadrilateral'];
    static getPolygonName(n){
        let ret = 'agon';
        ['pent', 'hex', 'hept', 'oct', 'non', 'dec', ''];
        return names[n-1]+ret;
    }
    static getTrianglePoints(points){
        let ret = {firsts: [], triangles: []}
        for (let i=0; i<points.length; i+=2) {
            ret.firsts.push(points[i]);
            if (i==points.length-1) break;
            ret.triangles.push([i, i+1, (i+2)%points.length].map(i=>points[i]));
        }
        return ret;
    }
}