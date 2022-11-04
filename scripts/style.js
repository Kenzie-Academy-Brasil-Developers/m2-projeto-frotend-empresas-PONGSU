const dropMenu = document.getElementById('drop-menu')
const navButtons = document.getElementById('nav-buttons')
let menuOpen = false

dropMenu.addEventListener('click', ()=>{
    if(navButtons.style.display == 'none'){
    navButtons.style.display = 'flex'
    dropMenu.setAttribute('src', "../../src/closeBTTN.png")
    menuOpen = true
    }else{
        navButtons.style.display = 'none'
        dropMenu.setAttribute('src', "../../src/burg.svg")
        menuOpen = false
    }
})

const widthOutput = document.querySelector('body');

function reportWindowSize() {
  console.log(window.innerWidth)
}

window.addEventListener('resize', ()=>{
    if (window.innerWidth > 450) {
        navButtons.style.display = 'flex'
    }if (window.innerWidth < 450 && menuOpen == false) {
        navButtons.style.display = 'none'
        dropMenu.setAttribute('src', "../../src/burg.svg")
    }
});


/* body{    
    overflow: hidden;
} */
const body = document.querySelector('body')
function lockScroll() {
    window.scroll(0,0)
    body.style.overflow = 'hidden'
}

function unlockScroll() {    
    body.style.overflow = 'auto'    
}