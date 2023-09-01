class Triangle {
    constructor(points) {
        this.points = points;
    }
    get sides(){
        let p = this.points;
        return [ [p[0], p[1]], [p[1], p[2]], [p[2], p[0]] ];
    }
    get area(){
        //hero's formula from lengths;
        let [a,b,c] = this.lengths,
            s = (a+b+c)/2;
        return Math.sqrt(s*(s-a)*(s-b)*(s-c));
    }
    get lengths(){
        return this.sides.map(i=>Polygon.distance(...i))
    }
}