
class Draw {
    ctx;
    canvas;
    circle (x,y,r,c){
        this.ctx.beginPath();
        this.ctx.arc(x, this.canvas.height-y, r, 0, 2*Math.PI);
        this.ctx.fillStyle = c;
        this.ctx.fill();
    }

    clearCanvas(){
        this.ctx.fillStyle = "white";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }



}
