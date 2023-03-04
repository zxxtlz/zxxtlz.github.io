var button = document.getElementById('button1');
var videoPlay = document.getElementById('VideoLOL')
const canvas = document.getElementById('canvas1');
const box1 = document.getElementById('container1')

button.onclick = function MusicPlay(){

    document.getElementById("audio1").play();
    if (audio1.currentTime < 52){audio1.currentTime = 52; videoPlay.style.visibility="hidden"; canvas.style.visibility="hidden"; container1.style.visibility="hidden";}
    setTimeout(function(){
        if (audio1.currentTime >= 63.5){videoPlay.currentTime=1.5; videoPlay.style.visibility="visible"; canvas.style.visibility="visible"; container1.style.visibility="hidden";}
    }, 18500);
    setTimeout(function(){
    if (audio1.currentTime >= 105){audio1.currentTime = 164, videoPlay.style.visibility="hidden", canvas.style.visibility="hidden", container1.style.visibility="visible"}
    }, 65000); // 55 seconds, the check has to be made AFTER the certain amount above has gone by
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
gradient = createLinearGradient(0,0, canvas.width, canvas.height);
gradient.addColorStop(0, 'red');
gradient.addColorStop(0.2, 'yellow');
gradient.addColorStop(0.4, 'green');
gradient.addColorStop(0.6, 'cyan');
gradient.addColorStop(0.8, 'blue');
gradient.addColorStop(1, 'magenta');
})