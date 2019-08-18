//console.log("Hello world");
var game;

window.addEventListener("load", function(){
    game = new Game();
    let canvas = document.getElementById("myCanvas");
    game.setCanvas(canvas);
    //game.draw.circle(200,200,40,"red");
    game.massInit(canvas.width, canvas.height);
    window.requestAnimationFrame(game.gameLoop.bind(game));
    

});

class Game{
    asteroids = [];
    physics = new Physics();
    draw = new Draw;
    massInit(width, height){
        this.physics.width=width;
        this.physics.heigth=height;
        //creating astroids with starting momentum of system = 0
        let avrg = new Vec(0,0);
        let numMasses = 15;
        for (let i = 0; i<numMasses; i++){
            let rndVel = new Vec(Math.random()*4,Math.random()*4);
            let mass = this.physics.createMass(Math.random()*width, Math.random()*height,undefined,rndVel.x,rndVel.y);
            avrg = Vec.add(avrg, rndVel);
            let asteroid = this.createAsteroid(mass, "#ff00"+(i)+""+(i)); 
        }
        avrg.x /= numMasses;
        avrg.y /= numMasses;
        for (let i = 0; i<numMasses; i++){
            let a = this.asteroids[i];
            a.xVel -= avrg.x;
            a.yVel -= avrg.y;
        }
        

    }

    createAsteroid(mass,c){
        let asteroid = new Asteroid(mass,c);
        this.asteroids.push(asteroid);
        return asteroid;
    }

    massMerge(){
        outer:
        for (let i = 0; i < this.asteroids.length; i++) {
            const asteroid1 = this.asteroids[i];
            for (let j = i+1; j < this.asteroids.length; j++) {
                const asteroid2 = this.asteroids[j];
                let R = Math.max(asteroid1.r, asteroid2.r);
                if (R*0.7>Vec.distance(asteroid1.pos, asteroid2.pos)){
                    let v = Vec.weightedAvrg(asteroid1.pos, asteroid2.pos, asteroid1.r**2, asteroid2.r**2);
                    let vel = Vec.weightedAvrg(asteroid1.vel, asteroid2.vel, asteroid1.r**2, asteroid2.r**2);
                    let bigMass = this.physics.createMass(
                        v.x,
                        v.y,
                        Math.sqrt(asteroid1.r**2 + asteroid2.r**2),
                        vel.x,
                        vel.y,
                    ); 
                    let bigAsteroid = this.createAsteroid(bigMass, "red");
                    
                    
                    this.deleteAsteroid(asteroid1);
                    this.deleteAsteroid(asteroid2);
                    continue outer; // To prevent asteriod1 which is deleted from being compared again.
                }
                

            }
        }

    }


    deleteAsteroid(asteroid){
        this.physics.deleteMass(asteroid.mass);
        let index = this.asteroids.indexOf(asteroid);
        if(index==-1){throw "Asteroid already deleted";}
        this.asteroids.splice(index,1);
    }

    setCanvas(canvas){
        this.draw;
        let ctx = canvas.getContext("2d");
        this.draw.ctx = ctx;
        this.draw.canvas = canvas;
    }
    
    gameLoop(){
        this.physics.timeStep();
        this.massMerge();
        this.draw.clearCanvas();
        for (let i = 0; i<this.asteroids.length; i++){
            const asteroid = this.asteroids[i];
            const x = asteroid.x;
            const y = asteroid.y;
            const r = asteroid.r;
            this.draw.circle(x,y,r, asteroid.c);
        }
       
        window.requestAnimationFrame(this.gameLoop.bind(this));
    }   
}


class Asteroid{
    constructor(mass, c){
        this.mass = mass;
        this.c = c;
    }
    c;
    mass;
    set x(x){
        this.mass.x = x;
    }
    get x(){
        return this.mass.x;
    }

    set xVel(xVel){
        this.mass.xVel = xVel;
    }
    get xVel(){
        return this.mass.xVel;
    }
    set yVel(yVel){
        this.mass.yVel = yVel;
    }
    get yVel(){
        return this.mass.yVel;
    }

    set y(y){
        this.mass.y = y;
    }
    get y(){
        return this.mass.y;
    }
    set r(r){
        this.mass.r = r;
    }
    get r(){
        return this.mass.r;
    }
    set pos(v){
        this.x = v.x;
        this.y = v.y;
    }
    get pos(){
        let v = new Vec(this.x, this.y);
        return v;
    }
    set vel(vel){
        this.xVel=vel.x;
        this.yVel=vel.y;
    }
    get vel(){
        let v = new Vec(this.xVel, this.yVel);
        return v;
    }



}