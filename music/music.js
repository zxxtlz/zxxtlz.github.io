let button = document.getElementById('button1');
let videoPlay = document.getElementById('VideoLOL');
const canvas = document.getElementById('canvas1');
const box1 = document.getElementById('container1');
let randomhtml = document.getElementById('randomhtml');
let randonum;
let source = document.createElement('source');
let windows95 = document.getElementById('container2');
let background = document.getElementById('background-canvas');

button.onclick = function MusicPlay(){

    randomnum = Math.floor((Math.random() * 5) + 1);
    randomhtml.textContent = randomnum

    if ( randomnum == 1 ) {
        videoPlay.style.width="80%"
        videoPlay.setAttribute('src', 'video/Kalamede.mp4'); audio1.setAttribute('src', 'music/antifact.mp3')
        document.getElementById("audio1").play();
        if (audio1.currentTime < 52){audio1.currentTime = 52; videoPlay.style.visibility="hidden"; canvas.style.visibility="hidden"; box1.style.visibility="hidden";}
        setTimeout(function(){
        if (audio1.currentTime >= 63.5){videoPlay.play(); videoPlay.currentTime=1.25; videoPlay.style.visibility="visible"; canvas.style.visibility="visible"; box1.style.visibility="hidden";}
        }, 18500);
        setTimeout(function(){
        if (audio1.currentTime >= 111){audio1.currentTime = 164, videoPlay.pause(), videoPlay.style.visibility="hidden", canvas.style.visibility="hidden", box1.style.visibility="visible"}
        }, 71000); // 69 seconds, the check has to be made AFTER the certain amount above has gone by
    }
    if ( randomnum == 2 ) {
        //windows 95//
        videoPlay.style.width="400px"
        windows95.style.visibility="visible"; background.style.background="#008080" ;videoPlay.setAttribute('src', 'video/HXSI.mp4'); audio1.setAttribute('src', 'music/shockyoursenses.mp3');
        document.getElementById("audio1").play();
        if ( audio1.currentTime < 170) {audio1.currentTime = 171; canvas.style.visibility="hidden"; box1.style.visibility="hidden";}
        setTimeout(function(){
            if ( audio1.currentTime > 170 ) {videoPlay.style.visibility="visible"; videoPlay.play(); videoPlay.currentTime = 0;}
        }, 14500);
        setTimeout(function(){
            if (audio1.currentTime >= 190 ) {videoPlay.style.visibility="hidden"; audio1.pause(); box1.style.visibility="visible"; windows95.style.visibility="hidden"; background.style.background="black";}
        }, 45500);
        
    }
}



//  matrix start
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let gradient = ctx.createLinearGradient(0,0, canvas.width, canvas.height);
gradient.addColorStop(0, 'red');
gradient.addColorStop(0.2, 'yellow');
gradient.addColorStop(0.4, 'green');
gradient.addColorStop(0.6, 'cyan');
gradient.addColorStop(0.8, 'blue');
gradient.addColorStop(1, 'magenta');

class Symbol {
constructor(x, y, fontSize, canvasHeight){  
this.characters = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
this.x = x;
this.y = y;
this.fontSize = fontSize;
this.text = 'A';
this.canvasHeight = canvasHeight;
}
draw(context){
this.text = this.characters.charAt(Math.floor(Math.random()*this.characters.length));
context.fillStyle = 'green';
context.fillText(this.text, this.x * this.fontSize, this.y * this.fontSize);
if (this.y * this.fontSize > this.canvasHeight && Math.random() > 0.97){
this.y = 0;
} 
else { 
this.y += 0.9;
}
}
}

class Effect {
constructor(canvasWidth, canvasHeight){
this.fontSize = 16;
this.canvasWidth = canvasWidth;
this.canvasHeight = canvasHeight;
this.columns = this.canvasWidth/this.fontSize;
this.symbols = [];
this.#initialize();
}
#initialize(){   
for (let i = 0; i < this.columns; i++){
this.symbols[i] = new Symbol(i, 0, this.fontSize, this.canvasHeight);
}
}
resize(width, height){
this.canvasWidth = width;
this.canvasHeight = height;
this.columns = this.canvasWidth/this.fontSize;
this.symbols = [];
this.#initialize();
}
}
 
const effect = new Effect(canvas.width, canvas.height);
let lastTime = 0;
const fps = 26;
const nextFrame = 1000/fps;
let timer = 0;

function animate(timeStamp){
const deltaTime = timeStamp - lastTime;
lastTime = timeStamp;
if(timer > nextFrame){
ctx.textAlign = 'center';
ctx.fillStyle = 'rgba(0,0,0,0.05)';
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.font = effect.fontSize + 'px monospace';
ctx.fillStyle = gradient;
effect.symbols.forEach(symbol => symbol.draw(ctx));
} else {
timer += deltaTime;
}
requestAnimationFrame(animate);
}

animate(0);

window.addEventListener('resize', function(){
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
effect.resize(canvas.width, canvas.height);
gradient.addColorStop(0, 'red');
gradient.addColorStop(0.2, 'yellow');
gradient.addColorStop(0.4, 'green');
gradient.addColorStop(0.6, 'cyan');
gradient.addColorStop(0.8, 'blue');
gradient.addColorStop(1, 'magenta');
})

// matrix end
