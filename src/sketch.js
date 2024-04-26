//ascii based on video from Daniel Shiffman/thecoding train 
const density = 'Ñ@#W$9876543210?!abc;:+=-,._ ';
let img;
let txt; 
let slogans;
let asciiFlag, pixelFlag, asciiNoise

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
        //image(img, 0, 0, width, height)
        img.resize(64, 64);
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
                //ascii 
                //noise 
                //add in the filters: 
                //full color = c
                fill(255)
                if(keyIsPressed == true){
                    switch(keyCode){
                    //full color (b)
                    case 66:
                        fill(r, g, b)
                        break
                    //greyscale (g)
                    case 71:
                        fill(avg)
                        break 
                    //white (w)
                    case 87:
                        fill(255)
                        break  
                    default:
                        fill(255)
                        break;
                    }
                }
                const len = density.length;
                const charIndex = floor(map(avg, 0, 255, len, 0))
                //square(i * w, j * h, w)   
                //textSize(30)
                //asked gpt to give me a list of slogans 
                let chooseLine = random(slogans)
                //textAlign(CENTER, CENTER)
                //text(chooseLine, i * w, j * h)
                text(density.charAt(charIndex), i * w, j * h);
            }
        }
    }
    }
//}

function goSave(){
    saveCanvas('image_filter', 'jpg')
}

function imageFilter(){

}