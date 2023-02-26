let visiblexd = false;
document.getElementById("TextID")

const tekst = document.getElementById("TextID")
const Buttonn  = document.getElementById("ButtonXD")

Buttonn.onclick = function showhide(){
    if (visiblexd){
        tekst.style.visibility="hidden"
        Buttonn.textContent="Show"
        Buttonn.style.backgroundColor="red"

        visiblexd=false
    }
    else{
        tekst.style.visibility="visible"
        Buttonn.textContent="Hide"
        Buttonn.style.backgroundColor="blue"

        visiblexd=true
    }
}