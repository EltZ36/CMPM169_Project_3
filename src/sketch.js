//ascii based on video from Daniel Shiffman/thecoding train 
const density = 'Ñ@#W$9876543210?!abc;:+=-,._ ';
let img;
let txt; 
let slogans;
let asciiFlag, pixelFlag, asciiNoise
let fillFull, fillGrey, fillStevia, fillWhite

function preload() {
    slogans = loadStrings('txt/slogans.txt')
}

//add in user input
//file input from gpt and asking how to make an image take input 
function setup(){
    createCanvas(600, 600)
    fileInput = createFileInput(handleFile);
    fileInput.position(20, 620);

    button = createButton('save');
    button.position(20, 650);
    button.mousePressed(goSave);
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
    //ascii conversion code from the coding train link: https://www.youtube.com/watch?v=55iwMYv8tGI 
    if(img){
        img.resize(64, 64)
        let w = width / img.width;
        let h = height/ img.height;
        img.loadPixels(); 
        let r = 0
        let g = 0
        let b = 0
        let avg = 0
        let asciiFlag = true
        for(let i = 0; i < img.width; i++){
            for(let j = 0; j < img.height; j++){
                const pixelIndex = (i + j * img.width) * 4;
                const r = img.pixels[pixelIndex + 0]
                const g = img.pixels[pixelIndex + 1]
                const b = img.pixels[pixelIndex + 2]
                //https://idmnyu.github.io/p5.js-image/Filters/index.html#sepia
                var tr = r *.393 + g *.769 + b *.189;
                var tg = r *.349 + g *.686 + b *.168;
                var tb = r *.272 + g *.534 + b *.131;
                img.pixels[pixelIndex+0] = tr;
                img.pixels[pixelIndex+1] = tg;
                img.pixels[pixelIndex+2] = tb;
                const avg = (r + g + b) / 3
                //the third index is transparency
                noStroke();
                //ascii 
                //noise 
                //add in the filters: 
                //full color = c
                //fill(tr, tg, tb)
                fill(avg)
                if(fillFull){
                    fill(r, g, b)
                }
                if(fillGrey){
                    fill(avg)
                }
                if(fillStevia){
                    fill(tr, tg, tb)
                }
                if(fillWhite){
                    fill(255)
                }
                if(asciiFlag && pixelFlag != true && asciiNoise != true ){
                    const len = density.length;
                    const charIndex = floor(map(avg, 0, 255, len, 0))
                    text(density.charAt(charIndex), i * w, j * h);
                }
                if(pixelFlag){
                    square(i * w, j * h, w)   
                }
                if(asciiNoise){
                    //asked gpt to give me a list of slogans 
                    let chooseLine = random(slogans)
                    //textAlign(CENTER, CENTER)
                    text(chooseLine, i * w, j * h)
                }
            }
        }
    }
    }
//}

function goSave(){
    saveCanvas('image_filter', 'jpg')
}

function keyPressed(){
    if(key == "a"){
        asciiFlag = true 
        pixelFlag = false 
        asciiNoise = false 
    }
    if(key == "p"){
        pixelFlag = true 
        asciiFlag = false 
        asciiNoise = false 
    }
    if(key == 'n'){
        asciiFlag = false 
        pixelFlag = false 
        asciiNoise = true 
    }
    if(key == "b"){
        fillFull = true  
        fillGrey = false
        fillStevia = false 
        fillWhite = false 
    }
    if(key == "g"){
        fillFull = false 
        fillGrey = true 
        fillStevia = false 
        fillWhite = false 
    }
    if(key == "s"){
        fillFull = false 
        fillGrey = false
        fillStevia = true
        fillWhite = false 
    }
    if(key == "w"){
        fillFull = false  
        fillGrey = false
        fillStevia = false 
        fillWhite = true 
    }
}