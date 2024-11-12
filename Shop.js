const myList = document.body.querySelectorAll("ul li")
const clostBtn = document.querySelector(".closeListIndex");
myList.forEach((ele) => {
    ele.onclick = () => {
        removeActive()
        ele.setAttribute("class", "active");
        clostBtn.click();
    }
})

const myIcon = document.querySelector(".desktop i");
myIcon.onclick = ()=>{
    document.querySelector("ul").classList.toggle("visibiltyCls");
    document.querySelector(".closeList").classList.remove('closeList');
    document.querySelector("body").style.overflow = "hidden"
 }
 clostBtn.onclick = ()=>{
    myIcon.click();
    document.querySelector(".closeListIndex").classList.add("closeList");
    document.querySelector("body").style.overflow = ""
 }
 
function removeActive() {
    myList.forEach((ele) => {
        ele.removeAttribute("class");
    })
}