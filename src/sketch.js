//ascii based on video from Daniel Shiffman/thecoding train 
const density = 'Ñ@#W$9876543210?!abc;:+=-,._    ';
//const density = "abcdefghijklmnopqrstuvwxyz1234"
let img;

//add in user input

//file input from gpt and asking how to make an image take input 
function setup(){
    createCanvas(600, 600)
    fileInput = createFileInput(handleFile);
    fileInput.position(20, 20);
}

function handleFile(file) {
    // Load the image file
    if (file.type === 'image') {
      loadImage(file.data, (loadedImg) => {
        img = loadedImg;
      });
    } else {
      alert('Please upload an image file.');
    }
}

function draw(){
    background(0);
    if(img){
        //image(img, 0, 0, width, height)
        img.resize(48, 48);
        let w = width / img.width;
        let h = height/ img.height;
        img.loadPixels(); 
        for(let i = 0; i < img.width; i++){
            for(let j = 0; j < img.height; j++){
                const pixelIndex = (i + j * img.width) * 4;
                const r = img.pixels[pixelIndex + 0]
                const g = img.pixels[pixelIndex + 1]
                const b = img.pixels[pixelIndex + 2]
                const avg = (r + g + b) / 3
                //the third index is transparency
                noStroke();
                //fill(r, g, b)
                //simple grayscale filter if you just divide instead 
                //fill(avg)
                fill(255)
                const len = density.length;
                const charIndex = floor(map(avg, 0, 255, len, 0))
                //square(i * w, j * h, w)   
                //textSize(30)
                text(density.charAt(charIndex), i * w, j * h);
            }
        }

    }
}

function switchFilter(image){
    switch(filter){
        //based on the one by daniel shiffman
        case "ascii":
        case "sepia":
        case "pixelate": 
        case "oil":
        default: 
    }
}

//turn the image into more of a 40 by 40 image instead 
function descale(image){

}