import Script from "next/script";
import { run_template } from "./../../helpers/js";
import { useRecoilValue, useRecoilState } from 'recoil';
import RouteLoader from "./RouteLoader";
import {useMemo, memo } from "react";
import { Client } from "react-hydration-provider";
import AuthUI from "../auth/AuthUI";
import { closeMenus, onAppLoad, openOffCanvas, toggleTheme } from "@/helpers/appjs";
import Scaffold from "./Scaffold";
import {UISizes, UIWidthState} from '@/contexts/atoms';
//import Header from "./partials/Header";
import { useRouter } from "next/router"
import BottomMenu from "./BottomMenu";
import { BSReveal } from "../UI/partials/BSReveal";
import SearchForm1 from "../UI/search/SearchForm1";
import Splash from "../UI/Splash";
import SnackBar from "../UI/partials/SnackBar";
import UserSideMenu from "../UI/user/UserSideMenu";

function sizing(width, setWidth){
  console.log('running sizing')
  if (typeof window !== 'undefined') {
    if(window.innerWidth != width){
      setWidth(window.innerWidth);
      console.log('running actual sizing')
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
  const {mMenuContent, noHeader, noFooter} = settings ?? {};
  const {btnProps, icon} = mMenuContent ?? {}

  const cachedChildren = useMemo(() => children, [router.asPath])
  const cachedSettings = useMemo(() => settings, [router.asPath])

  console.log("loading layout");

  return (
    <>
      <main /* className={`${inter.className}`} */ onLoad={() => sizing(width, setWidth)}>
        <div id="preloader">
          <div className="spinner-border color-highlight" role="status"></div>
        </div>
        <div id="page" onLoad={() => pinHeader()}>
          {/* {!noHeader && <Header headerTitle={headerTitle}/>} */}
          {noFooter ? <></> : <BottomMenu btnProps={btnProps} icon={icon}/>}
          {/* <!--start of page content, add your stuff here--> */}
          {/* <!--Page modals, sheets, offcanvas*/}
          <div id='header_intersector' className="w-100 position-absolute" style={{height: '1px', top: '30px'}}/>
          <Scaffold path={router.asPath} settings={cachedSettings} uiSize={uiSize}>{cachedChildren}</Scaffold>
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
            <div className="content">
              <div className="list-group list-custom-small">
                <div
                  //data-trigger-switch="switch-dark-mode"
                  className="pb-2 ms-n1 _link"
                >
                  <i className="fa font-12 fa-moon rounded-s bg-highlight color-white me-3"></i>
                  <span>Dark Mode</span>
                  <div className="custom-control scale-switch ios-switch">
                    <input
                      data-toggle-theme onClick={() => toggleTheme()} 
                      type="checkbox"
                      className="ios-input"
                      id="switch-dark-mode"
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="switch-dark-mode"
                    ></label>
                  </div>
                  <i className="fa fa-angle-right"></i> 
                </div>
              </div>
              <div className="list-group list-custom-large">
                <span className="link" data-menu="menu-highlights" href="#" onClick={(e) => openOffCanvas(e)}>
                  <i className="fa font-14 fa-tint bg-green-dark rounded-s"></i>
                  <span>Theme Color</span>
                  <strong>16 Options Included</strong>
                  <span className="badge bg-highlight color-white">HOT</span>
                  <i className="fa fa-angle-right"></i>
                </span>
                {/* <a data-menu="menu-backgrounds" href="#" className="border-0" onClick={(e) => openOffCanvas(e)}>
                  <i className="fa font-14 fa-cog bg-blue-dark rounded-s"></i>
                  <span>Background Color</span>
                  <strong>10 Page Gradients Included</strong>
                  <span className="badge bg-highlight color-white">NEW</span>
                  <i className="fa fa-angle-right"></i>
                </a> */}
              </div>
            </div>
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
                <a href="#" data-change-highlight="blue">
                  <i className="fa fa-circle color-blue-dark"></i>
                  <span className="color-blue-light">Default</span>
                </a>
                <a href="#" data-change-highlight="red">
                  <i className="fa fa-circle color-red-dark"></i>
                  <span className="color-red-light">Red</span>
                </a>
                <a href="#" data-change-highlight="orange">
                  <i className="fa fa-circle color-orange-dark"></i>
                  <span className="color-orange-light">Orange</span>
                </a>
                <a href="#" data-change-highlight="pink2">
                  <i className="fa fa-circle color-pink2-dark"></i>
                  <span className="color-pink-dark">Pink</span>
                </a>
                <a href="#" data-change-highlight="magenta">
                  <i className="fa fa-circle color-magenta-dark"></i>
                  <span className="color-magenta-light">Purple</span>
                </a>
                <a href="#" data-change-highlight="aqua">
                  <i className="fa fa-circle color-aqua-dark"></i>
                  <span className="color-aqua-light">Aqua</span>
                </a>
                <a href="#" data-change-highlight="teal">
                  <i className="fa fa-circle color-teal-dark"></i>
                  <span className="color-teal-light">Teal</span>
                </a>
                <a href="#" data-change-highlight="mint">
                  <i className="fa fa-circle color-mint-dark"></i>
                  <span className="color-mint-light">Mint</span>
                </a>
                <a href="#" data-change-highlight="green">
                  <i className="fa fa-circle color-green-light"></i>
                  <span className="color-green-light">Lemon</span>
                </a>
                <a href="#" data-change-highlight="grass">
                  <i className="fa fa-circle color-green-dark"></i>
                  <span className="color-green-dark">Grass</span>
                </a>
                <a href="#" data-change-highlight="sunny">
                  <i className="fa fa-circle color-yellow-light"></i>
                  <span className="color-yellow-light">Sunny</span>
                </a>
                <a href="#" data-change-highlight="yellow">
                  <i className="fa fa-circle color-yellow-dark"></i>
                  <span className="color-yellow-light">Goldish</span>
                </a>
                <a href="#" data-change-highlight="brown">
                  <i className="fa fa-circle color-brown-dark"></i>
                  <span className="color-brown-light">Coffee</span>
                </a>
                <a href="#" data-change-highlight="night">
                  <i className="fa fa-circle color-dark-dark"></i>
                  <span className="color-dark-light">Night</span>
                </a>
                <a href="#" data-change-highlight="dark">
                  <i className="fa fa-circle color-dark-light"></i>
                  <span className="color-dark-light">Dark</span>
                </a>
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
            id="menu-backgrounds"
            className="menu menu-box-bottom menu-box-detached"
          >
            <div className="menu-title">
              <h1>Backgrounds</h1>
              <p className="color-highlight">
                Change Page Color Behind Content Boxes
              </p>
              <a href="#" className="close-menu" onClick={() => closeMenus()}>
                <i className="fa fa-times"></i>
              </a>
            </div>
            <div className="divider divider-margins mb-n2"></div>
            <div className="content">
              <div className="background-changer">
                <a href="#" data-change-background="default">
                  <i className="bg-theme"></i>
                  <span className="color-dark-dark">Default</span>
                </a>
                <a href="#" data-change-background="plum">
                  <i className="body-plum"></i>
                  <span className="color-plum-dark">Plum</span>
                </a>
                <a href="#" data-change-background="magenta">
                  <i className="body-magenta"></i>
                  <span className="color-dark-dark">Magenta</span>
                </a>
                <a href="#" data-change-background="dark">
                  <i className="body-dark"></i>
                  <span className="color-dark-dark">Dark</span>
                </a>
                <a href="#" data-change-background="violet">
                  <i className="body-violet"></i>
                  <span className="color-violet-dark">Violet</span>
                </a>
                <a href="#" data-change-background="red">
                  <i className="body-red"></i>
                  <span className="color-red-dark">Red</span>
                </a>
                <a href="#" data-change-background="green">
                  <i className="body-green"></i>
                  <span className="color-green-dark">Green</span>
                </a>
                <a href="#" data-change-background="sky">
                  <i className="body-sky"></i>
                  <span className="color-sky-dark">Sky</span>
                </a>
                <a href="#" data-change-background="orange">
                  <i className="body-orange"></i>
                  <span className="color-orange-dark">Orange</span>
                </a>
                <a href="#" data-change-background="yellow">
                  <i className="body-yellow"></i>
                  <span className="color-yellow-dark">Yellow</span>
                </a>
                <div className="clearfix"></div>
              </div>
              <a
                href="#"
                data-menu="menu-settings"
                className="mb-3 btn btn-full btn-m rounded-sm bg-highlight shadow-xl text-uppercase font-900 mt-4"
              >
                Back to Settings
              </a>
            </div>
          </div>
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
        </div>
        {/* <Script strategy={'afterInteractive'} onReady={() => console.log('Main loaded')} src="/scripts/bootstrap.min.js"/> */}
        {/* <Script defer='true'  strategy={"afterInteractive"} onReady={() => console.log('Custom loaded')} src="/scripts/custom.js"/> */}
        {run_template()}
        <Script>{onAppLoad()}</Script>
        <RouteLoader />
      </main>
      <Splash/>
    </>
  )
}

const Layout = memo(LayoutConst);
export default Layout;
