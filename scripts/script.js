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

/* Responsive navbar icon */
menuIcon.addEventListener('click', () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
    navbg.classList.toggle('active');
});

/* Darkmode management */
themeSwitch.addEventListener("click", ()=>{
    darkmode = localStorage.getItem('darkmode');
    darkmode !== "active" ? enableDarkmode() : disableDarkmode();
    location.reload();
});

/* Parallax for hero section */
window.addEventListener('scroll', () =>{
    var value = window.scrollY;
    bg.style.top = value * 0.5 + 'px';
    moon.style.left = initialmoonleft - value*0.5 + 'px';
    moon.style.top = initialmoontop + value * 0.4 + 'px';
});

/* Carousel of Projects section */
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

/* Direct mouse dragging on carousel */
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

/* Typewriter effect on hero section */
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

/* Darkmode management */
function enableDarkmode(){
    document.body.classList.add('darkmode')
    localStorage.setItem('darkmode', 'active')
}

function disableDarkmode(){
    document.body.classList.remove('darkmode')
    localStorage.setItem('darkmode', null)
}



/*STATE OF WORLD/WEBSITE*/

if(darkmode === 'active') enableDarkmode()

/* Exchange light and dark colors for darkmode */
if(darkmode === 'active'){
    light = getComputedStyle(document.documentElement).getPropertyValue('--light');
    dark = getComputedStyle(document.documentElement).getPropertyValue('--dark');
}else{
    dark = getComputedStyle(document.documentElement).getPropertyValue('--light');
    light = getComputedStyle(document.documentElement).getPropertyValue('--dark');
}

/* Greet message on hero section */
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

/* Start typewriter effect */
typeNextPhrase();

/* Setup of starry background */
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

/* Shows good morning/afternoon/evening */
show.textContent = greet;

/* Adds copies of carousel cards on the left */
carouselChildren.slice(-cardPerView).reverse().forEach(card => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
});

/* Adds copies of carousel cards on the right */
carouselChildren.slice(0, cardPerView).forEach(card => {
    carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});
