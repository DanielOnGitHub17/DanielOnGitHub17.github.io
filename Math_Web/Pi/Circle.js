class Circle {
    constructor(container, center, radius) {
        add(this.circle = makeSVG('circle'), container);
    }
    draw(center, radius){
        this.r = radius;
        this.center = new Vec(...center);
        ['x', 'y'].forEach(p=>this.circle.setAttribute('c'+p, this.center[p]));
        this.circle.setAttribute('r', this.r);
    }
    get area(){
        return Math.PI*(this.r**2);
    }
}
