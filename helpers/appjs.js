//import { themeSignal } from "@/contexts/signals";
export const pwaName = "LyveCity"; 

export function onAppLoad(){
    if (typeof window !== "undefined") {
         if (document.readyState !== 'loading') {
            appjsCode();
         }else{
            document.addEventListener("DOMContentLoaded", (event) => {
              appjsCode();
            });
         }
  }
}

const toggleDark = typeof window !== 'undefined' ? document.querySelectorAll('[data-toggle-theme]') : [];

/* function lightCssLink(status){
    let newUrl = status ? '/scss/sticky/_light.css' : '/scss/sticky/_darky.css';
    document.getElementById("light-css-link").href = newUrl;
} */

function activateDarkMode(){
    if (typeof window !== 'undefined') {
        document.body.classList.add('theme-dark');
        document.body.classList.remove('theme-light');
        document.body.classList.remove('detect-theme');

        //themeSignal.value = 'dark';

        for(let i = 0; i < toggleDark.length; i++){toggleDark[i].checked=true};
        localStorage.setItem(pwaName+'-Theme', 'dark-mode');
        //themeCssLink('_dark')
    }
}

function activateLightMode(){
    if (typeof window !== 'undefined') {
    document.body.classList.add('theme-light');
    document.body.classList.remove('theme-dark','detect-theme');
    //themeSignal.value = 'light';
    for(let i = 0; i < toggleDark.length; i++){toggleDark[i].checked=false};
    localStorage.setItem(pwaName+'-Theme', 'light-mode');
    //themeCssLink('_light');
    }
}

function removeTransitions(){
    if (typeof window !== 'undefined') {
    var falseTransitions = document.querySelectorAll('.btn, .header, #footer-bar, .menu-box, .menu-active'); for(let i = 0; i < falseTransitions.length; i++) {falseTransitions[i].style.transition = "all 0s ease";}
    }}

function addTransitions(){
    if (typeof window !== 'undefined') {
    var trueTransitions = document.querySelectorAll('.btn, .header, #footer-bar, .menu-box, .menu-active'); for(let i = 0; i < trueTransitions.length; i++) {trueTransitions[i].style.transition = "";}
}}


function appjsCode(){

//Set Color Based on Remembered Preference.
if(localStorage.getItem(pwaName+'-Theme')){
    if(localStorage.getItem(pwaName+'-Theme') == "dark-mode"){
       activateDarkMode()
    }
    if(localStorage.getItem(pwaName+'-Theme') == "light-mode"){
        activateLightMode()
    }
}else{
    activateLightMode();
    }
}

/* function setColorScheme() {
    if (typeof window !== 'undefined') {
    const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches
    const isLightMode = window.matchMedia("(prefers-color-scheme: light)").matches
    const isNoPreference = window.matchMedia("(prefers-color-scheme: no-preference)").matches
    window.matchMedia("(prefers-color-scheme: dark)").addListener(e => e.matches && activateDarkMode())
    window.matchMedia("(prefers-color-scheme: light)").addListener(e => e.matches && activateLightMode())
    if(isDarkMode) activateDarkMode();
    if(isLightMode) activateLightMode();
    }
} */

//Activating Dark Mode
/* const darkModeSwitch = typeof window !== 'undefined' ? document.querySelectorAll('[data-toggle-theme]') : [];

darkModeSwitch.forEach(el => el.addEventListener('click',e =>{
    if(document.body.className == "theme-light"){ 
        removeTransitions(); activateDarkMode();}
    else if(document.body.className == "theme-dark"){ removeTransitions(); activateLightMode();}
    setTimeout(function(){addTransitions();},350);
})); */


export function toggleTheme(){
    if (typeof window !== 'undefined') {
        if(document.body.className == "theme-light"){ 
            removeTransitions(); activateDarkMode();}
        else if(document.body.className == "theme-dark"){ 
            removeTransitions(); activateLightMode(); 
        }
        setTimeout(function(){addTransitions();},350);
    }
}

/* 

//Opening Menus
var menuOpen = document.querySelectorAll('[data-menu]');
var wrappers = document.querySelectorAll('.header, #footer-bar, .page-content');

menuOpen.forEach(el => el.addEventListener('click',e =>{
    //Close Existing Opened Menus
    const activeMenu = document.querySelectorAll('.menu-active');
    for(let i=0; i < activeMenu.length; i++){activeMenu[i].classList.remove('menu-active');}
    //Open Clicked Menu
    var menuData = el.getAttribute('data-menu');
    document.getElementById(menuData).classList.add('menu-active');
    document.getElementsByClassName('menu-hider')[0].classList.add('menu-active');
    //Check and Apply Effects
    var menu = document.getElementById(menuData);
    var menuEffect = menu.getAttribute('data-menu-effect');
    var menuLeft = menu.classList.contains('menu-box-left');
    var menuRight = menu.classList.contains('menu-box-right');
    var menuTop = menu.classList.contains('menu-box-top');
    var menuBottom = menu.classList.contains('menu-box-bottom');
    var menuWidth = menu.offsetWidth;
    var menuHeight = menu.offsetHeight;

    if(menuEffect === "menu-push"){
        var menuWidth = document.getElementById(menuData).getAttribute('data-menu-width');
        if(menuLeft){for(let i=0; i < wrappers.length; i++){wrappers[i].style.transform = "translateX("+menuWidth+"px)"}}
        if(menuRight){for(let i=0; i < wrappers.length; i++){wrappers[i].style.transform = "translateX(-"+menuWidth+"px)"}}
        if(menuBottom){for(let i=0; i < wrappers.length; i++){wrappers[i].style.transform = "translateY(-"+menuHeight+"px)"}}
        if(menuTop){for(let i=0; i < wrappers.length; i++){wrappers[i].style.transform = "translateY("+menuHeight+"px)"}}
    }
    if(menuEffect === "menu-parallax"){
        var menuWidth = document.getElementById(menuData).getAttribute('data-menu-width');
        if(menuLeft){for(let i=0; i < wrappers.length; i++){wrappers[i].style.transform = "translateX("+menuWidth/10+"px)"}}
        if(menuRight){for(let i=0; i < wrappers.length; i++){wrappers[i].style.transform = "translateX(-"+menuWidth/10+"px)"}}
        if(menuBottom){for(let i=0; i < wrappers.length; i++){wrappers[i].style.transform = "translateY(-"+menuHeight/5+"px)"}}
        if(menuTop){for(let i=0; i < wrappers.length; i++){wrappers[i].style.transform = "translateY("+menuHeight/5+"px)"}}
    }
})); */

export function openOffCanvas(e){
    if(typeof window !== 'undefined'){
        let el = e.currentTarget;
        //Close Existing Opened Menus
        const activeMenu = document.querySelectorAll('.menu-active');
        for(let i=0; i < activeMenu.length; i++){activeMenu[i].classList.remove('menu-active');}
        //Open Clicked Menu
        var menuData = el.getAttribute('data-menu');
        var menu = document.getElementById(menuData);
        menu.classList.add('menu-active');
        document.getElementsByClassName('menu-hider')[0].classList.add('menu-active');
        //Check and Apply Effects
        // var menu = document.getElementById(menuData);
        var menuEffect = menu.getAttribute('data-menu-effect');
        var menuLeft = menu.classList.contains('menu-box-left');
        var menuRight = menu.classList.contains('menu-box-right');
        var menuTop = menu.classList.contains('menu-box-top');
        var menuBottom = menu.classList.contains('menu-box-bottom');
        var menuWidth = menu.offsetWidth;
        var menuHeight = menu.offsetHeight;
    
        if(menuEffect === "menu-push"){
            var menuWidth = document.getElementById(menuData).getAttribute('data-menu-width');
            if(menuLeft){for(let i=0; i < wrappers.length; i++){wrappers[i].style.transform = "translateX("+menuWidth+"px)"}}
            if(menuRight){for(let i=0; i < wrappers.length; i++){wrappers[i].style.transform = "translateX(-"+menuWidth+"px)"}}
            if(menuBottom){for(let i=0; i < wrappers.length; i++){wrappers[i].style.transform = "translateY(-"+menuHeight+"px)"}}
            if(menuTop){for(let i=0; i < wrappers.length; i++){wrappers[i].style.transform = "translateY("+menuHeight+"px)"}}
        }
        if(menuEffect === "menu-parallax"){
            var menuWidth = document.getElementById(menuData).getAttribute('data-menu-width');
            if(menuLeft){for(let i=0; i < wrappers.length; i++){wrappers[i].style.transform = "translateX("+menuWidth/10+"px)"}}
            if(menuRight){for(let i=0; i < wrappers.length; i++){wrappers[i].style.transform = "translateX(-"+menuWidth/10+"px)"}}
            if(menuBottom){for(let i=0; i < wrappers.length; i++){wrappers[i].style.transform = "translateY(-"+menuHeight/5+"px)"}}
            if(menuTop){for(let i=0; i < wrappers.length; i++){wrappers[i].style.transform = "translateY("+menuHeight/5+"px)"}}
        }
    }
}

//Closing menus
export function closeMenus(){
    if(typeof window !== 'undefined'){
        //let el = e.currentTarget;

        const activeMenu = document.querySelectorAll('.menu-active');
        for(let i=0; i < activeMenu.length; i++){activeMenu[i].classList.remove('menu-active');}
        //for(let i=0; i < wrappers.length; i++){wrappers[i].style.transform = "translateX(-"+0+"px)"}
        var iframes = document.querySelectorAll('iframe');
        iframes.forEach(el => {var hrefer = el.getAttribute('src'); el.setAttribute('newSrc', hrefer); el.setAttribute('src',''); var newSrc = el.getAttribute('newSrc');el.setAttribute('src', newSrc)});
    }
}

 //Toasts
 export function showToast(e){
    if(typeof window !== 'undefined'){
        let el = e.target;
        console.log('e', e)
        var toastData = el.getAttribute('data-toast')
        var notificationElement = document.getElementById(toastData);
        var notificationToast = new bootstrap.Toast(notificationElement);
        notificationToast.show();
    }
 }


 export function changeHighlight(e){
    let el = e.currentTarget;

    var highlight = el.getAttribute('data-change-highlight');
    var pageHighlight = document.querySelectorAll('.page-highlight');
    if(pageHighlight.length){pageHighlight.forEach(function(e){e.remove();});}
    var loadHighlight = document.createElement("link");
    loadHighlight.rel = "stylesheet";
    loadHighlight.className = "page-highlight";
    loadHighlight.type = "text/css";
    loadHighlight.href = '/scss/highlights/highlight_' + highlight +'.css';
    document.getElementsByTagName("head")[0].appendChild(loadHighlight);
    document.body.setAttribute('data-highlight', 'highlight-'+highlight)
    localStorage.setItem(pwaName+'-Highlight', highlight)
 }