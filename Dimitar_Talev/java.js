function reveal() {
    let reveals = document.querySelectorAll(".reveal");
  
    for (let i = 0; i < reveals.length; i++) {
      let windowHeight = window.innerHeight;
      let elementTop = reveals[i].getBoundingClientRect().top;
      let elementVisible = 150;
  
      if (elementTop < windowHeight - elementVisible) {
        reveals[i].classList.add("active");
      } else {
        reveals[i].classList.remove("active");
      }
    }
  }

  window.addEventListener("scroll", reveal);


// random text VVV

const citati = ("„Орелът лети към небето със свободни крила, а нашите крила са сковани и трябва да пречистим сърцата си от вража, гибелна отрова.“", "„Човек не бива и не може да живее само за себе си.“", "„Което човек не може да види с очите си и да чуе с ушите си, намира го с душата си.“", "„Во секо нещо требва да има чест и човещина.“");
const button = document.getElementById('button1');
const tekst = document.getElementById('tekst');

button.onclick = function RandomCitat(){
    tekst.textContent = Math.Random()
  }