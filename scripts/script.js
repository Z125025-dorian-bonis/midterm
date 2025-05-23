/*VARIABLES*/

const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');
const navbg = document.querySelector('.nav-bg');
const themeSwitch = document.getElementById('theme-switch');
const canvas = document.getElementById('canvas');
const el = document.getElementById("typewriter");
const carousel = document.querySelector(".carousel");
const arrowBtns = document.querySelectorAll(".wrapper i ");
const firstCardWidth = carousel.querySelector(".card").offsetWidth;
const show = document.getElementById('message');
const bg = document.getElementById("mainback");
const moon = document.getElementById("moonback");
const footerheight = document.querySelector("footer").offsetHeight;
const contactheight = document.querySelector(".contact").offsetHeight;

let phrases = [
    "Game Designer",
    "Web Developer",
    "Machine Learning Engineer",
    "C# Teacher",
    "Computer Engineer"
];
let carouselChildren = [...carousel.children];
let typeDuration = 2000;
let pauseDuration = 1000;
let eraseDuration = 2000;
let initialmoonleft = moon.offsetLeft;
let initialmoontop = moon.offsetTop;
let isDragging = false, startX, startScrollLeft;
let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);
let today = new Date();
let time = today.getHours();
let index = 0;
let darkmode = localStorage.getItem('darkmode');

var greet;
var starback;
var light;
var dark;


/*EVENT LISTENERS*/

menuIcon.addEventListener('click', () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
    navbg.classList.toggle('active');
});

themeSwitch.addEventListener("click", ()=>{
    darkmode = localStorage.getItem('darkmode');
    darkmode !== "active" ? enableDarkmode() : disableDarkmode();
    location.reload();
});

window.addEventListener('scroll', () =>{
    var value = window.scrollY;
    bg.style.top = value * 0.5 + 'px';
    moon.style.left = initialmoonleft - value*0.5 + 'px';
    moon.style.top = initialmoontop + value * 0.4 + 'px';
});

carousel.addEventListener("mousemove", dragging);
carousel.addEventListener("mousedown", dragStart);
document.addEventListener("mouseup",dragStop);
carousel.addEventListener("scroll", infiniteScroll);

arrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        carousel.scrollLeft += btn.id === "left" ? -firstCardWidth : firstCardWidth;
    });
});

  

/*FUNCTIONS*/

function dragging(e){
    if (!isDragging) return;
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
}

function dragStart(e){
    isDragging = true;
    carousel.classList.add("dragging");
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
}

function dragStop(){
    isDragging = false;
    carousel.classList.remove("dragging");
}

function infiniteScroll(){
    if(Math.floor(carousel.scrollLeft) === 0){
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
        carousel.classList.remove("no-transition");
    }else if(Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth){
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove("no-transition");
    }
}

function typeNextPhrase() {
    const nextPhrase = phrases[index];
    el.style.width = "0ch";
    setTimeout(() => {
        el.textContent = nextPhrase;
        void el.offsetWidth; 
        el.style.width = nextPhrase.length + 1 + "ch";
        setTimeout(() => {
            index = (index + 1) % phrases.length;
            typeNextPhrase();
        }, typeDuration + pauseDuration);
  
    }, eraseDuration);
}

function enableDarkmode(){
    document.body.classList.add('darkmode')
    localStorage.setItem('darkmode', 'active')
}

function disableDarkmode(){
    document.body.classList.remove('darkmode')
    localStorage.setItem('darkmode', null)
}

window.isMobile = function(){return (window.matchMedia("(any-hover:none)").matches) }



/*STATE OF WORLD/WEBSITE*/

if(darkmode === 'active') enableDarkmode()

if(darkmode === 'active'){
    light = getComputedStyle(document.documentElement).getPropertyValue('--light');
    dark = getComputedStyle(document.documentElement).getPropertyValue('--dark');
}else{
    dark = getComputedStyle(document.documentElement).getPropertyValue('--light');
    light = getComputedStyle(document.documentElement).getPropertyValue('--dark');
}

if(window.isMobile()){
    for(const elem of document.getElementsByClassName("mobtext")){elem.style.opacity = "1"; elem.style.maxHeight = "40px"; console.log("hey");}
    for(const elem of document.getElementsByClassName("mobicon")){
        elem.style.backgroundPosition = "-120px";
    }
    for(const elem of document.getElementsByClassName("mobbx")){
        elem.style.background= "linear-gradient(90deg, var(--accent1), var(--accent2))";
        elem.style.backgroundClip = "text";
        elem.style.WebkitTextFillColor = "transparent";
        elem.style.opacity = "1";
    }
    for(const elem of document.getElementsByClassName("card")){
        elem.style.height="390px";
        elem.style.borderRadius="80px";
    }
}

if(time > 18){
    greet = 'Good evening!';
}
else if(time > 12){
    greet = 'Good afternoon!';
}
else{
    greet = 'Good morning!';
}



/*INIT OF WEBSITE*/

typeNextPhrase();

starback = new Starback(canvas, {
    type: 'dot',
    quantity: 1000,
    direction: 180,
    backgroundColor: dark,
    randomOpacity: true,
    width: window.innerWidth,
    height: document.documentElement.scrollHeight - contactheight - footerheight,
    starColor: light,
});

show.textContent = greet;

carouselChildren.slice(-cardPerView).reverse().forEach(card => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
});

carouselChildren.slice(0, cardPerView).forEach(card => {
    carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});
