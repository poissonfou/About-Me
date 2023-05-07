function loadTitle(){
    let title = document.querySelector('.title');
    title.classList.remove('inactive');
}

function loadText(){
    const text = document.querySelector('.resume');
    var y = window.pageYOffset;
    if(y >= 350){
        text.classList.remove('inactive');
    } else {
        console.log('erro')
    }
}


function loadTextArt(){
    const text = document.querySelector('.about-art');
    const h1 = document.querySelector('.art');
    var y = window.pageYOffset;
    if(y >= 800){
        text.classList.remove('inactive');
        h1.classList.remove('inactive')
    } else {
        console.log('erro')
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
    } else {
        console.log('erro')
    }
}

function loadTextChess(){
    const text = document.querySelector('.about-chess');
    const h1 = document.querySelector('.chess');
    var y = window.pageYOffset;
    if(y >= 2170){
        text.classList.remove('inactive');
        h1.classList.remove('inactive');
    } else {
        console.log('erro')
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
    } else {
        console.log('erro')
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
    } else {
        console.log('erro')
    }
}


function loadTextFinally(){
    const h1 = document.querySelector('.finally');
    var y = window.pageYOffset;
    if(y >= 3000){
        h1.classList.remove('inactive');
    } else {
        console.log('erro')
    }
}



window.addEventListener('scroll', loadText);
window.addEventListener('scroll', loadTextArt);
window.addEventListener('scroll', loadTextPoli);
window.addEventListener('scroll', loadTextChess);
window.addEventListener('scroll', loadTextReading);
window.addEventListener('scroll', loadTextCode);
window.addEventListener('scroll', loadTextFinally);





