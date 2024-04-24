function setup(){
    createCanvas(800, 800)
    background(200)
}

function draw(){
    var rand_flame = new Flame(180, 190, 2)
    //priori artifact 
    rand_flame.show()
    gen_blade.show()
    stroke(0, 150,0)
    strokeWeight(3)
    //left side 
    point(180, 190)
}

