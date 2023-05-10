function loadTitle(){
    let title = document.querySelector('.title');
    title.classList.remove('inactive');
}

function loadText(){
    const text = document.querySelector('.resume');
    var y = window.pageYOffset;
    if(y >= 350){
        text.classList.remove('inactive');
    }
}


function loadTextArt(){
    const text = document.querySelector('.about-art');
    const h1 = document.querySelector('.art');
    var y = window.pageYOffset;
    if(y >= 800){
        text.classList.remove('inactive');
        h1.classList.remove('inactive')
    }
}

function loadTextPoli(){
    const text = document.querySelector('.about-poliglot');
    const songs = document.querySelector('.songs')
    const h1 = document.querySelector('.poliglot');
    var y = window.pageYOffset;
    if(y >= 1200){
        text.classList.remove('inactive');
        h1.classList.remove('inactive');
        songs.classList.remove('inactive');
    }
}

function loadTextChess(){
    const text = document.querySelector('.about-chess');
    const h1 = document.querySelector('.chess');
    var y = window.pageYOffset;
    if(y >= 2170){
        text.classList.remove('inactive');
        h1.classList.remove('inactive');
    }
}

function loadTextReading(){
    const text = document.querySelector('.about-reading');
    const h1 = document.querySelector('.reading');
    const div = document.querySelector('.div-reading')
    var y = window.pageYOffset;
    if(y >= 2500){
        setTimeout(() =>{
            text.classList.remove('inactive');
            h1.classList.remove('inactive');
        }, 1000)
        div.classList.remove('div-reading-inactive')
    }
}

function loadTextCode(){
    const text = document.querySelector('.about-coding');
    const h1 = document.querySelector('.coding');
    const img = document.querySelector('.project-image')
    var y = window.pageYOffset;
    if(y >= 3300){
        text.classList.remove('inactive');
        h1.classList.remove('inactive');
        img.classList.remove('inactive');
    }
}


function loadTextFinally(){
    const h1 = document.querySelector('.finally');
    var y = window.pageYOffset;
    if(y >= 3000){
        h1.classList.remove('inactive');
    }
}


window.addEventListener('load', loadTitle)
window.addEventListener('scroll', loadText);
window.addEventListener('scroll', loadTextArt);
window.addEventListener('scroll', loadTextPoli);
window.addEventListener('scroll', loadTextChess);
window.addEventListener('scroll', loadTextReading);
window.addEventListener('scroll', loadTextCode);
window.addEventListener('scroll', loadTextFinally);

var responsiveSlider = function () {

    var slider = document.getElementById("slider");
    var sliderWidth = slider.offsetWidth;
    var slideList = document.getElementById("slideWrap");
    var count = 1;
    var items = slideList.querySelectorAll("li").length;

    window.addEventListener('resize', function () {
        sliderWidth = slider.offsetWidth;
    });

    var prevSlide = function () {
        if (count > 1) {
            count = count - 2;
            slideList.style.left = "-" + count * sliderWidth + "px";
            count++;
        }
        else if (count = 1) {
            count = items - 1;
            slideList.style.left = "-" + count * sliderWidth + "px";
            count++;
        }
    };

    var nextSlide = function () {
        if (count < items) {
            slideList.style.left = "-" + count * sliderWidth + "px";
            count++;
        }
        else if (count = items) {
            slideList.style.left = "0px";
            count = 1;
        }
    };

    setInterval(function () {
        nextSlide()
    }, 5000);

};

window.onload = function () {
    responsiveSlider();
}

