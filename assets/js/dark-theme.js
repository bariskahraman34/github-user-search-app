const body = document.querySelector('body');
const themeBtn = document.querySelector('.theme-selector-btn');

themeBtn.addEventListener('click',switchTheme);

function switchTheme(){
    if(body.classList.contains('dark-theme')){
        body.classList.remove('dark-theme');
        themeBtn.innerHTML = 
        `
        DARK
        <img src="assets/img/moon.svg" alt="">
        `
    }else{
        body.classList.add('dark-theme');
        themeBtn.innerHTML = 
        `
        LIGHT
        <img src="assets/img/light-theme-icon.svg" alt="">
        `
    }
}