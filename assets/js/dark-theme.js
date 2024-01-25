const body = document.querySelector('body');
const themeBtn = document.querySelector('.theme-selector-btn');

let saveTheme = JSON.parse(localStorage.getItem('theme')) || [];

function saveThemeToLocalStorage(){
    return localStorage.setItem('theme',JSON.stringify(saveTheme));
}

themeBtn.addEventListener('click',switchTheme);

function switchTheme(){
    saveTheme = [];
    if(body.classList.contains('dark-theme')){
        body.classList.remove('dark-theme');
        themeBtn.innerHTML = 
        `
        DARK
        <img src="assets/img/moon.svg" alt="">
        `;
        saveTheme.push(
            {
                theme: 'light'
            }
        )
        saveThemeToLocalStorage();
    }else{
        body.classList.add('dark-theme');
        themeBtn.innerHTML = 
        `
        LIGHT
        <img src="assets/img/light-theme-icon.svg" alt="">
        `;
        saveTheme.push(
            {
                theme: 'dark'
            }
        )
        saveThemeToLocalStorage();
    }
}

if(saveTheme[0].theme == 'light'){
    body.classList.remove('dark-theme');
}else{
    body.classList.add('dark-theme');
}