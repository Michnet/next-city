//import Script from "next/script";
//import { run_template } from "./../../helpers/js";
import { useRecoilValue, useRecoilState } from 'recoil';
import RouteLoader from "./RouteLoader";
import {useMemo, memo, useState } from "react";
import { Client } from "react-hydration-provider";
import AuthUI from "../auth/AuthUI";
import { closeMenus, changeHighlight, openOffCanvas } from "@/helpers/appjs";
import Scaffold from "./Scaffold";
import {UISizes, UIWidthState} from '@/contexts/atoms';
//import Header from "./partials/Header";
import { useRouter } from "next/router"
import BottomMenu from "./BottomMenu";
import { BSReveal } from "../UI/partials/BSReveal";
import SearchForm1 from "../UI/search/SearchForm1";
//import Splash from "../UI/Splash";
import SnackBar from "../UI/partials/SnackBar";
import UserSideMenu from "../UI/user/UserSideMenu";
import UISettings from "./UISettings";
//import { getSession } from "next-auth/react";

function sizing(width, setWidth){
  if (typeof window !== 'undefined') {
    if(window.innerWidth != width){
      setWidth(window.innerWidth);
    }
    window.addEventListener('resize', () => {
      let newWid = window.innerWidth;
      setWidth(newWid);
    }, {passive : true})
  }
}

function pinHeader(){
  if (typeof window !== 'undefined') {
    const header_el = document.querySelector(".header-bar");
    const inters_el = document.getElementById("header_intersector");
    if(header_el){
      const observer = new IntersectionObserver( 
        ([e]) => header_el.classList.toggle("header-active", e.intersectionRatio < 1),
        { threshold: [1] }
      );
      if(inters_el){
        observer.observe(inters_el);
      }
    }
  }
}

function LayoutConst({ children, headerTitle, settings}) {
  const uiSize = useRecoilValue(UISizes);
  //const {isMobile, isTab, isLargeTab, isDeskTop} = uiSize
  const [width, setWidth] = useRecoilState(UIWidthState);
  const router = useRouter();
  const {mMenuContent, noFooter} = settings ?? {};
  const {btnProps, icon} = mMenuContent ?? {}
  const [loading, setLoading] = useState(true);


  const cachedChildren = useMemo(() => children, [headerTitle])
  const cachedSettings = useMemo(() => settings, [headerTitle])
  
  let themeColorsArr = [
    {highlight:"blue", icon: "fa fa-circle color-blue-dark",
      colorClass: "color-blue-light", themeName : "Default"},
    {highlight:"red", icon: "fa fa-circle color-red-dark",
      colorClass: "color-red-light", themeName : "Red"},
    {highlight:"orange", icon: "fa fa-circle color-orange-dark",
      colorClass: "color-orange-light", themeName : "Orange"},
    {highlight:"pink2", icon: "fa fa-circle color-pink2-dark",
      colorClass: "color-pink-dark", themeName: "Pink"},
    {highlight:"magenta", icon: "fa fa-circle color-magenta-dark",
      colorClass: "color-magenta-light", themeName : "Purple"},
    {highlight:"aqua", icon: "fa fa-circle color-aqua-dark",
      colorClass: "color-aqua-light", themeName : "Aqua"},
    {highlight:"teal", icon: "fa fa-circle color-teal-dark",
      colorClass: "color-teal-light", themeName : "Teal"},
    {highlight:"mint", icon: "fa fa-circle color-mint-dark",
      colorClass: "color-mint-light", themeName : "Mint"},
    {highlight:"green", icon: "fa fa-circle color-green-light",
      colorClass: "color-green-light", themeName : "Lemon"},
    {highlight:"grass", icon: "fa fa-circle color-green-dark",
      colorClass: "color-green-dark", themeName: "Grass"},
    {highlight:"sunny", icon: "fa fa-circle color-yellow-light",
      colorClass: "color-yellow-light", themeName : "Sunny"},
    {highlight:"yellow", icon: "fa fa-circle color-yellow-dark",
      colorClass: "color-yellow-light", themeName : "Goldish"},
    {highlight:"brown", icon: "fa fa-circle color-brown-dark",
      colorClass: "color-brown-light", themeName : "Coffee"},
    {highlight:"night", icon: "fa fa-circle color-dark-dark",
      colorClass: "color-dark-light", themeName : "Night"},
    {highlight:"dark", icon: "fa fa-circle color-dark-light",
      colorClass: "color-dark-light", themeName : "Dark"},
]

  return (
    <>
      <main /* className={`${inter.className}`} */ onLoad={() => {console.log('sizing in main'); sizing(width, setWidth);}}>
        {/* <div id="preloader">
          <div className="spinner-border color-highlight" role="status"></div>
        </div> */}
        <div id="page" onLoad={() => pinHeader()}>
          {/* {!noHeader && <Header headerTitle={headerTitle}/>} */}
          {noFooter ? <></> : <BottomMenu btnProps={btnProps} icon={icon}/>}
          {/* <!--start of page content, add your stuff here--> */}
          {/* <!--Page modals, sheets, offcanvas*/}
          <div id='header_intersector' className="w-100 position-absolute" style={{height: '1px', top: '30px'}}/>
          <Scaffold headerTitle={headerTitle} settings={cachedSettings} uiSize={uiSize}>
            {children}
            </Scaffold>
          <Client>
		  <div
            id="menu-settings"
            className="menu menu-box-bottom menu-box-detached"
          >
            <div className="menu-title mt-0 pt-0">
              <h1>Settings</h1>
              <p className="color-highlight">Choose Your Style</p>
              <span className="close-menu" onClick={() => closeMenus()}>
                <i className="fa fa-times"></i>
              </span>
            </div>
            <div className="divider divider-margins mb-n2"></div>
            <UISettings exClass='px-3'/>
          </div>


          <BSReveal id={'login_modal'}>
          <AuthUI/>

          </BSReveal>

          <BSReveal id='search_form_1'>
            <SearchForm1/>
          </BSReveal>
          <UserSideMenu/>

            <SnackBar/>
          <div id="snackbar-liked" className="snackbar-toast rounded-m bg-green-dark" data-bs-delay="1500" data-bs-autohide="true"><i className="fa fa-check me-3"></i>Added to favourites</div>
          <div id="snackbar-unliked" className="snackbar-toast rounded-m bg-yellow-dark" data-bs-delay="1500" data-bs-autohide="true"><i className="fa fa-info me-3"></i>Removed from favourites!</div>


            <BSReveal id={'menu-highlights'}>
            <div className="menu-title">
              <h1>Theme Colors</h1>
              
              <span className="close-menu" onClick={() => closeMenus()}>
                <i className="fa fa-times"></i>
              </span>
            </div>
            <div className="divider divider-margins mb-n2"></div>
            <div className="content">
              <div className="highlight-changer">
                {themeColorsArr.map((el, ind) => {
                  const {highlight, icon, colorClass, themeName} = el;
                  return <a onClick={(e) => changeHighlight(e)} key={ind} href="#" data-change-highlight={highlight}>
                    <i className={icon}/>
                    <span className={colorClass}>{themeName}</span>
                  </a>
                })}
                <div className="clearfix"></div>
              </div>
              <button onClick={(e) => openOffCanvas(e)}
                data-menu="menu-settings" 
                className="w-100 mb-3 btn btn-full btn-m rounded-sm bg-highlight shadow-xl text-uppercase font-900 mt-4"
              >
                Back to Settings
              </button>
            </div>
            </BSReveal>
          
          <div
            id="menu-share"
            className="menu menu-box-bottom menu-box-detached"
          >
            <div className="menu-title mt-n1">
              <h1>Share the Love</h1>
              <p className="color-highlight">
                Just Tap the Social Icon. We'll add the Link
              </p>
              <a href="#" className="close-menu" onClick={() => closeMenus()}>
                <i className="fa fa-times"></i>
              </a>
            </div>
            <div className="content mb-0">
              <div className="divider mb-0"></div>
              <div className="list-group list-custom-small list-icon-0">
                <a
                  href="auto_generated"
                  className="shareToFacebook external-link"
                >
                  <i className="font-18 fab fa-facebook-square color-facebook"></i>
                  <span className="font-13">Facebook</span>
                  <i className="fa fa-angle-right"></i>
                </a>
                <a
                  href="auto_generated"
                  className="shareToTwitter external-link"
                >
                  <i className="font-18 fab fa-twitter-square color-twitter"></i>
                  <span className="font-13">Twitter</span>
                  <i className="fa fa-angle-right"></i>
                </a>
                <a
                  href="auto_generated"
                  className="shareToLinkedIn external-link"
                >
                  <i className="font-18 fab fa-linkedin color-linkedin"></i>
                  <span className="font-13">LinkedIn</span>
                  <i className="fa fa-angle-right"></i>
                </a>
                <a
                  href="auto_generated"
                  className="shareToWhatsApp external-link"
                >
                  <i className="font-18 fab fa-whatsapp-square color-whatsapp"></i>
                  <span className="font-13">WhatsApp</span>
                  <i className="fa fa-angle-right"></i>
                </a>
                <a
                  href="auto_generated"
                  className="shareToMail external-link border-0"
                >
                  <i className="font-18 fa fa-envelope-square color-mail"></i>
                  <span className="font-13">Email</span>
                  <i className="fa fa-angle-right"></i>
                </a>
              </div>
            </div>
          </div>
          {/* <!-- Be sure this is on your main visiting page, for example, the index.html page-->
	<!-- Install Prompt for Android --> */}

          <div
            id="menu-install-pwa-android"
            className="menu menu-box-bottom menu-box-detached rounded-l"
          >
            <div className="boxed-text-l mt-4 pb-3">
              <img
                className="rounded-l mb-3"
                src="/app/icons/icon-128x128.png"
                alt="img"
                width="90"
              />
              <h4 className="mt-3">Add Sticky on your Home Screen</h4>
              <p>
                Install Sticky on your home screen, and access it just like a
                regular app. It really is that simple!
              </p>
              <a
                href="#"
                className="pwa-install btn btn-s rounded-s shadow-l text-uppercase font-900 bg-highlight mb-2"
              >
                Add to Home Screen
              </a>
              <br />
              <a
                href="#"
                className="pwa-dismiss close-menu color-gray-dark text-uppercase font-900 opacity-60 font-10 pt-2"
              >
                Maybe later
              </a>
              <div className="clear"></div>
            </div>
          </div>

          {/* <!-- Install instructions for iOS --> */}

          <div
            id="menu-install-pwa-ios"
            className="menu menu-box-bottom menu-box-detached rounded-l"
          >
            <div className="boxed-text-xl mt-4 pb-3">
              <img
                className="rounded-l mb-3"
                src="/app/icons/icon-128x128.png"
                alt="img"
                width="90"
              />
              <h4 className="mt-3">Add Sticky on your Home Screen</h4>
              <p className="mb-0 pb-0">
                Install Sticky, and access it like a regular app. Open your
                Safari menu and tap "Add to Home Screen".
              </p>
              <div className="clearfix pt-3"></div>
              <a
                href="#"
                className="pwa-dismiss close-menu color-highlight text-uppercase font-700"
              >
                Maybe later
              </a>
            </div>
          </div>
		  </Client>

      <Client><style>{`:root{
           --miniFontSize: 13px;
           --fontSize: var(--font-size);
           --mdFontSise: 15px;--smFontSize: 14px;
           --xsFontSize: 12px;
           --bgFontSize: 19px;
           --exBigFontSize: 22px;
           --lh: 24px;
          --headingFont: "Jost", sans-serif !important;
          --handFont: 'Dr Sugiyama', cursive;
          --fontFamily: "Roboto", sans-serif !important;
          --bgDarkTransparent: rgba(0, 0, 0, 0.902);
          --bgDarkTransparent2: rgba(15, 17, 23, 0.76);
          --bgDarkTransparent3: #0f11178c;
        }

        @scope (.theme-light) {
          :scope {
              --colorTheme: #0f1117;
              --bgTheme: #FFFFFF;
              --bgThemeLight: #c7c7c7;
              --bgThemeTransparent: #ffffffe6;
              --bgThemeTransparent2: #ffffffd0;
              --bgThemeTransparent3: #ffffff94;
              --borderTheme: rgba(0, 0, 0, 0.1);
              --borderThemeAlt: rgba(255, 255, 255, 0.12);
              --bgBrightness:2;
          }
      }  
      
      @scope(.theme-dark) {
          :scope {
              --colorTheme: #FFF;
              --bgTheme: #0f1117;
              --borderThemeAlt: rgba(0, 0, 0, 0.1);
              --bgThemeLight: #232426;
              --bgThemeTransparent: var(--bgDarkTransparent);
              --bgThemeTransparent2: var(--bgDarkTransparent2);
              --bgThemeTransparent3: var(--bgDarkTransparent3);
              --borderTheme: rgba(255, 255, 255, 0.12);
              --bgBrightness:0.8;
            }
      }
      @scope(.smLine) {
        :scope {
            --lh:18px;
          }
      }
      .bg-theme-transparent-2{
        background-color: var(--bgThemeTransparent2);
      }
      
      h1, h2, h3, h4, h5, h6{
        font-family: var(--headingFont);
      }
      body {
        line-height: var(--lh);
      }`}</style></Client>
        </div>
        {/* <Script strategy={'afterInteractive'} onReady={() => console.log('Main loaded')} src="/scripts/bootstrap.min.js"/> */}
        {/* <Script defer='true'  strategy={"afterInteractive"} onReady={() => console.log('Custom loaded')} src="/scripts/custom.js"/> */}
        {/* {run_template()} */}
        {/* <Script>{onAppLoad()}</Script> */}
        <RouteLoader />
      </main>
      {/* <Splash/> */}
    </>
  )
}

const Layout = memo(LayoutConst);
export default Layout;
