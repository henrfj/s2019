class Vec{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
    x;
    y;
    static distance(u,v) {
        return Math.sqrt((u.x-v.x)**2 + (u.y-v.y)**2);
    }
    static sub(u,v){
        return new Vec(u.x-v.x, u.y-v.y);
    }
    static add(u,v){
        return new Vec(u.x+v.x, u.y+v.y);
    }

    static weightedAvrg(u,v,mu,mv){
        return new Vec(
            (u.x*mu+v.x*mv)/(mu+mv),
            (u.y*mu+v.y*mv)/(mu+mv),
        );
    }

    size(){
        return Math.sqrt(this.x**2 + this.y**2);
    }
    resize(newSize){
        let vec = new Vec(this.x, this.y);
        let size = this.size();
        if(size == 0){throw "poop";}
        vec.x *= newSize/size;
        vec.y *= newSize/size;
        return vec;
    }
    

}