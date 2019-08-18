
class Physics{
    constructor(width=0, heigth=0){
        this.width=width;
        this.heigth=heigth;
    }
    masses = [];
    width;
    heigth;
    createMass(x,y,r=10,xVel=0,yVel=0){
        let mass = new Mass(x,y,r,xVel,yVel);
        this.masses.push(mass);
        return mass;
    }

    deleteMass(mass){
       let index = this.masses.indexOf(mass);
       if(index==-1){throw "Mass already deleted";}
       this.masses.splice(index,1);
    }

   
    gravityLoopyDoopy(){
        for(let i = 0; i<this.masses.length; i++){
            for(let j = 0; j<this.masses.length; j++){
                if (i==j){continue;}
                let mass1 = this.masses[i];
                const mass2 = this.masses[j];
                
                

                let pos1 = new Vec (mass1.x, mass1.y);
                let pos2 = new Vec (mass2.x, mass2.y);
                let diff = Vec.sub(pos2,pos1);
                let r = Vec.distance(pos1,pos2);
                let force = diff.resize(mass2.r**2 * 100/r**2);
                
                //-------------------------------------------quickFix
                
                const maxForce = 40*99999999;
                
                if(force.size() > maxForce){
                    force = force.resize(maxForce);
                }
                
                //-------------------------------------------quickFix

                let xAccl = force.x/mass1.r**2;
                let yAccl = force.y/mass1.r**2;
                mass1.xVel+=xAccl;
                mass1.yVel+=yAccl;

            }

        }
    }

    wallCollision(){
        for(let i = 0; i<this.masses.length; i++){
            let mass = this.masses[i];

            if ((mass.x+mass.r)>=(this.width)){ //Collision right wall
                let temp = Math.abs(mass.xVel);
                mass.xVel = -temp;
            }
            if ((mass.x-mass.r)<=0){            //Collision left wall
                let temp = Math.abs(mass.xVel);
                mass.xVel = temp;
            }

            if ((mass.y+mass.r)>=(this.heigth)){ //Collision roof
                let temp = Math.abs(mass.yVel);
                mass.yVel = -temp;
            }
            if ((mass.y-mass.r)<=0){            //Collision floor
                let temp = Math.abs(mass.yVel);
                mass.yVel = temp;
            }


        }
    }

    timeStep(){
        this.gravityLoopyDoopy();
        this.wallCollision();
        for (let i = 0; i<this.masses.length; i++){
            const mass = this.masses[i];
            
            mass.x += mass.xVel;
            mass.y += mass.yVel;
            
           
        }

    }
    

}
