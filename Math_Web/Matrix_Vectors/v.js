// function addVector(dim, )
ADDVECTOR.children[2].onclick = ()=>Vectors.push(new Vector(new Vec(1, ADDVECTOR.children[0].value)))
class Vector{
    constructor(dim){
        this.dim = dim;
        this.space = make(); VECTORS.appendChild(this.space);
        addVM(this.space, dim, this, 'vector');
//         this.space.className = 'vector';
    }
}