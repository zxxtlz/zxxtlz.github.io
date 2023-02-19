

//button.onclick = function Warningxd(){
//    alert("OPAAAAAAAAa")
//    alert("OPAAAAAAAAa")
//}

let counter = 0;
var button = document.getElementById('button1');

button.onclick = function clickCounter(){
    counter = counter + 2
    console.log(counter);
}

var button = document.getElementById('button2');

button.onclick = function clickCounter(){
    counter = counter - 2
    console.log(counter);
}

var button = document.getElementById('button3');

button.onclick = function clickCounter(){
    counter = counter * 2
    console.log(counter);
}

var button = document.getElementById('button4');

button.onclick = function clickCounter(){
    counter = counter / 2
    console.log(counter);
}

var button = document.getElementById('button5');

button.onclick = function Linkxd(){
    window.open("https://www.telerikacademy.com/");
    console.log("отвори телерик без href връзка");
}