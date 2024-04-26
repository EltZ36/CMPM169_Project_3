class flame {
    constructor(x, y, size) {
        this.x = x
        this.y = y
        this.size = size
        this.blade_color = ""
        this.blade_pattern = ""
    }
    
    show() {
        //priori artifact: 
        fill(170)
        //the blade itself 
        beginShape()
        //include extra conditions depending on the knife shape
        //if its chef knife, then do the bezier and stuff like that 
        vertex(this.x, this.y)
        vertex(this.x, this.y - 160)
        vertex(this.x, this.y - 170)
        bezierVertex(this.x + 5, this.y - 160, this.x + 40, this.y - 130, this.x + 50, this.y)
        /*vertex(180, 190)
        vertex(180, 30)
        vertex(180, 20)
        bezierVertex(185, 30, 220, 60, 230, 180)
        vertex(230, 190)*/
        endShape()
    }

    setX(x) {
        this.x = x
    }

    getX() {
        return this.x
    }

    setY(y) {
        this.y = y
    }

    getY() {
        return this.y
    }

    setSize(size){
        this.size = size 
    }

    getSize(){
        return this.size
    }
}

