function appjsCode(){
    var pwaName = "Sticky"; 

    //Tabs
    var tabTrigger = document.querySelectorAll('.tab-controls a');
        if(tabTrigger.length){
        tabTrigger.forEach(function(e){
            if(e.hasAttribute('data-active')){
                var highlightColor = e.parentNode.getAttribute('data-highlight');
                e.classList.add(highlightColor);
                e.classList.add('no-click');
            }
        });
        tabTrigger.forEach(el => el.addEventListener('click',e =>{
            var highlightColor = el.parentNode.getAttribute('data-highlight');
            var tabParentGroup = el.parentNode.querySelectorAll('a');
            tabParentGroup.forEach(function(e){
                e.classList.remove(highlightColor);
                e.classList.remove('no-click');
            });
            el.classList.add(highlightColor);
            el.classList.add('no-click');
        }));
    }

  //Scroll Ads
  var scrollItems = document.querySelectorAll('.scroll-ad, .header-auto-show')
  if(scrollItems.length){
       console.log('scrollers', scrollItems);
      var scrollAd = document.querySelectorAll('.scroll-ad');
      var scrollHeader = document.querySelectorAll('.header-auto-show');
      window.addEventListener('scroll', function() {
          if (document.querySelectorAll('.scroll-ad, .header-auto-show').length) {
              function showScrollAd(){scrollAd[0].classList.add('scroll-ad-visible');}
              function hideScrollAd(){scrollAd[0].classList.remove('scroll-ad-visible');}
              function showHeader(){scrollHeader[0].classList.add('header-active');}
              function hideHeader(){scrollHeader[0].classList.remove('header-active');}
              var window_height = window.outerWidth;
              var total_scroll_height = document.documentElement.scrollTop
              let inside_header = total_scroll_height <= 150;
              var passed_header = total_scroll_height >= 150;
              let inside_footer = (window_height - total_scroll_height + 1000) <= 150
              if(scrollAd.length){
                  inside_header ? hideScrollAd() : null
                  passed_header ? showScrollAd() : null
                  inside_footer ? hideScrollAd() : null
              }
              if(scrollHeader.length){
                  inside_header ? hideHeader() : null
                  passed_header ? showHeader() : null
              }
          }
      });
  }else{
    console.log('No scrollers in the dom', scrollItems);

  }

  var highlightData = document.querySelectorAll('[data-change-highlight]');
  highlightData.forEach(el => el.addEventListener('click', e =>{
      var highlight = el.getAttribute('data-change-highlight');
      var pageHighlight = document.querySelectorAll('.page-highlight');
      if(pageHighlight.length){pageHighlight.forEach(function(e){e.remove();});}
      var loadHighlight = document.createElement("link");
      loadHighlight.rel = "stylesheet";
      loadHighlight.className = "page-highlight";
      loadHighlight.type = "text/css";
      loadHighlight.href = '/styles/highlights/highlight_' + highlight +'.css';
      document.getElementsByTagName("head")[0].appendChild(loadHighlight);
      document.body.setAttribute('data-highlight', 'highlight-'+highlight)
      localStorage.setItem(pwaName+'-Highlight', highlight)
  }))
  var rememberHighlight = localStorage.getItem(pwaName+'-Highlight');
  if(rememberHighlight){
      document.body.setAttribute('data-highlight', rememberHighlight);
      var loadHighlight = document.createElement("link");
      loadHighlight.rel = "stylesheet";
      loadHighlight.className = "page-highlight";
      loadHighlight.type = "text/css";
      loadHighlight.href = '/styles/highlights/highlight_' + rememberHighlight +'.css';
      if(!document.querySelectorAll('.page-highlight').length){
          document.getElementsByTagName("head")[0].appendChild(loadHighlight);
          document.body.setAttribute('data-highlight', 'highlight-'+rememberHighlight)
      }
  } else {
      var bodyHighlight = document.body.getAttribute('data-highlight');
      var defaultHighlight = bodyHighlight.split("highlight-")
      document.body.setAttribute('data-highlight', defaultHighlight[1]);
      var loadHighlight = document.createElement("link");
      loadHighlight.rel = "stylesheet";
      loadHighlight.className = "page-highlight";
      loadHighlight.type = "text/css";
      loadHighlight.href = '/styles/highlights/highlight_' + defaultHighlight[1] +'.css';
      if(!document.querySelectorAll('.page-highlight').length){
          document.getElementsByTagName("head")[0].appendChild(loadHighlight);
          document.body.setAttribute('data-highlight', 'highlight-'+defaultHighlight[1])
          localStorage.setItem(pwaName+'-Highlight', defaultHighlight[1])
      }
  }

  //Background Gradient Color
  var gradientData = document.querySelectorAll('[data-change-background]');
  gradientData.forEach(el => el.addEventListener('click',e =>{
      var gradient = el.getAttribute('data-change-background');
      document.body.setAttribute('data-gradient', 'body-'+gradient+'');
      localStorage.setItem(pwaName+'-Gradient', gradient)
  }));

  //Set Background and Highlight
  var pageBackground = localStorage.getItem(pwaName+'-Gradient');
  if(pageBackground){document.body.setAttribute('data-gradient', 'body-'+pageBackground+'');}
const toggleDark = document.querySelectorAll('[data-toggle-theme]');
function activateDarkMode(){
    console.log('activating mode', toggleDark);
    document.body.classList.add('theme-dark');
    document.body.classList.remove('theme-light');
    document.body.classList.remove('detect-theme');
    for(let i = 0; i < toggleDark.length; i++){toggleDark[i].checked=true};
    localStorage.setItem(pwaName+'-Theme', 'dark-mode');
}
function activateLightMode(){
    document.body.classList.add('theme-light');
    document.body.classList.remove('theme-dark','detect-theme');
    for(let i = 0; i < toggleDark.length; i++){toggleDark[i].checked=false};
    localStorage.setItem(pwaName+'-Theme', 'light-mode');
}
function removeTransitions(){var falseTransitions = document.querySelectorAll('.btn, .header, #footer-bar, .menu-box, .menu-active'); for(let i = 0; i < falseTransitions.length; i++) {falseTransitions[i].style.transition = "all 0s ease";}}
function addTransitions(){var trueTransitions = document.querySelectorAll('.btn, .header, #footer-bar, .menu-box, .menu-active'); for(let i = 0; i < trueTransitions.length; i++) {trueTransitions[i].style.transition = "";}}

function setColorScheme() {
    const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches
    const isLightMode = window.matchMedia("(prefers-color-scheme: light)").matches
    const isNoPreference = window.matchMedia("(prefers-color-scheme: no-preference)").matches
    window.matchMedia("(prefers-color-scheme: dark)").addListener(e => e.matches && activateDarkMode())
    window.matchMedia("(prefers-color-scheme: light)").addListener(e => e.matches && activateLightMode())
    if(isDarkMode) activateDarkMode();
    if(isLightMode) activateLightMode();
}

//Activating Dark Mode
const darkModeSwitch = document.querySelectorAll('[data-toggle-theme]')
darkModeSwitch.forEach(el => el.addEventListener('click',e =>{
    if(document.body.className == "theme-light"){ 
        removeTransitions(); activateDarkMode();}
    else if(document.body.className == "theme-dark"){ removeTransitions(); activateLightMode();}
    setTimeout(function(){addTransitions();},350);
}));

//Set Color Based on Remembered Preference.
if(localStorage.getItem(pwaName+'-Theme') == "dark-mode"){for(let i = 0; i < toggleDark.length; i++){toggleDark[i].checked="checked"};document.body.className = 'theme-dark';}
if(localStorage.getItem(pwaName+'-Theme') == "light-mode"){document.body.className = 'theme-light';} if(document.body.className == "detect-theme"){setColorScheme();}

//Detect Dark/Light Mode
const darkModeDetect = document.querySelectorAll('.detect-dark-mode');
darkModeDetect.forEach(el => el.addEventListener('click',e =>{
    document.body.classList.remove('theme-light', 'theme-dark');
    document.body.classList.add('detect-theme')
    setTimeout(function(){setColorScheme();},50)
}));
}

export function onAppLoad(){
    console.log('loading app js')
    if (typeof window !== "undefined") {
         if (document.readyState !== 'loading') {
            console.log('Even the document is ready');
            appjsCode();
         }else{
            document.addEventListener("DOMContentLoaded", (event) => {
              console.log('Running after DOm loading');
              appjsCode();
            });
         }
  }
}