//import dynamic from "next/dynamic";
import Link from "next/link";
import Script from "next/script";
//import { useEffect } from "react";
//import { Inter } from "next/font/google";
import { run_template } from "./../../helpers/js";
import { useRecoilValue, useRecoilState } from 'recoil';
import RouteLoader from "./RouteLoader";
import SiteHead from "../UI/SiteHead";
import { Client } from "react-hydration-provider";
import AuthUI from "../auth/AuthUI";
import { onAppLoad, openOffCanvas, toggleTheme } from "@/helpers/appjs";
import { UserAvatar } from "../UI/UserAvatar";
import Scaffold from "./Scaffold";
import {UISizes, UIWidthState} from '@/contexts/atoms';
import Header from "./partials/Header";
import { isActiveLink } from "@/helpers/universal";
import { useRouter } from "next/router"
import { LoaderDualRing } from "../skeletons/Loaders";

//const inter = Inter({ subsets: ["latin"] });

export default function Layout({ children, headerTitle, settings}) {
  const uiSize = useRecoilValue(UISizes);
  const {isMobile, isTab, isLargeTab, isDeskTop} = uiSize
  const [width, setWidth] = useRecoilState(UIWidthState);
  const router = useRouter();
  const {mMenuContent} = settings ?? {};
  const {btnProps, btnFunc} = mMenuContent ?? {}

  function pinHeader(){
    if (typeof window !== 'undefined') {
      const header_el = document.querySelector(".header-auto-show");
      const inters_el = document.getElementById("header_intersector");
      if(header_el){
        console.log('got header')
        const observer = new IntersectionObserver( 
          ([e]) => header_el.classList.toggle("header-active", e.intersectionRatio < 1),
          { threshold: [1] }
        );
        if(inters_el){
          observer.observe(inters_el);
        }
      }else{
        console.log('No header')
      }
    }
  }

  console.log("loading layout");

  function sizing(){
    console.log('running sizing')
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

  const defBottomLinks = [
    {id: 1,
        icon: "fa fa-home",
        color: 'gradient-green',
        name: "Home",
        routePath: "/",
        link: true
    },
    {id: 2,
        icon: "fa fa-search-location",
        color: 'gradient-red',
        name: "Explore",
        routePath: "/explore/events",
        link: true
    },
    {id: 3,
        icon: "fa fa-heart",
        color: 'gradient-red',
        name: "Pages",
        routePath: "/pages",
        link: true
    },
    {id: 4,
        icon: "fa fa-search",
        color: 'gradient-red',
        name: "Search",
        routePath: "/explore",
        link: true
    },
    {id: 5,
        icon: "fa fa-cog",
        color: 'gradient-red',
        name: "Settings",
        routePath: "/explore/events",
        func: openOffCanvas,
        link: false,
        props: {
          'data-menu': 'menu-settings'
        }
    },
 ]
  return (
    <>
      <main /* className={`${inter.className}`} */ onLoad={() => sizing()}>
        <div id="preloader">
          <div className="spinner-border color-highlight" role="status"></div>
        </div>
        <div id="page" onLoad={() => pinHeader()}>
          {isLargeTab && <Header headerTitle={headerTitle}/>}

          <div id="footer-bar" className="footer-bar-1 d-md-none">
            {defBottomLinks.map((el) => {
                let {id, icon, link, name, func, routePath, isNew, props} = el;
                return <>{link ? <Link key={id} href={routePath} className={`${isActiveLink(routePath, router.asPath)? 'active-nav' : ''}`}>
                        <i className={`${icon}`}/>
                        <span>{name}</span>
                        {isNew && <span className="badge bg-highlight">NEW</span>}
                    </Link>
                    :
                    <span className="link" onClick={(e) => func(e)} {...props}>
                      <i className={`${icon}`}/>
                      <span>{name}</span>
                    </span>
                    }
                    </>
            })}
              <button {...btnProps} onClick={(e) => openOffCanvas(e)} class="fab circle d-flex align-items-center justify-center bg-theme position-absolute gradient-menu shadow shadow-bg-m" style={{}}>
              <span  className={`text-center big_act`} /* onClick={(e) => {
                if(data_bs_toggle){
                   return;
                }else if(btnComponent){
                  return;
                }else if(func){
                  func();
                }else{
                  router.push(bigUrl ?? '/add-listing');
                }
                }} */>
                {<i className={`link_i ${'fa fa-plus'}`}/>}
              </span>
              <div className="position-absolute show_in_transit"><LoaderDualRing/></div>
            </button>
          </div>

          {/* <!--start of page content, add your stuff here--> */}
          {/* <!--Page modals, sheets, offcanvas*/}
          <div id='header_intersector' className="w-100 position-absolute" style={{height: '1px', top: '30px'}}/>
          <Scaffold uiSize={uiSize}>{children}</Scaffold>

          {/*Settings*/}

          <Client>
		  <div
            id="menu-settings"
            className="menu menu-box-bottom menu-box-detached"
          >
            <div className="menu-title mt-0 pt-0">
              <h1>Settings</h1>
              <p className="color-highlight">Flexible and Easy to Use</p>
              <a href="#" className="close-menu">
                <i className="fa fa-times"></i>
              </a>
            </div>
            <div className="divider divider-margins mb-n2"></div>
            <div className="content">
              <div className="list-group list-custom-small">
                <a
                  href="#"
                  data-toggle-theme onClick={() => toggleTheme()} 
                  data-trigger-switch="switch-dark-mode"
                  className="pb-2 ms-n1"
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
                </a>
              </div>
              <div className="list-group list-custom-large">
                <span className="link" data-menu="menu-highlights" href="#" onClick={(e) => openOffCanvas(e)}>
                  <i className="fa font-14 fa-tint bg-green-dark rounded-s"></i>
                  <span>Page Highlight</span>
                  <strong>16 Colors Highlights Included</strong>
                  <span className="badge bg-highlight color-white">HOT</span>
                  <i className="fa fa-angle-right"></i>
                </span>
                <a data-menu="menu-backgrounds" href="#" className="border-0" onClick={(e) => openOffCanvas(e)}>
                  <i className="fa font-14 fa-cog bg-blue-dark rounded-s"></i>
                  <span>Background Color</span>
                  <strong>10 Page Gradients Included</strong>
                  <span className="badge bg-highlight color-white">NEW</span>
                  <i className="fa fa-angle-right"></i>
                </a>
              </div>
            </div>
          </div>

		  {/*Login*/}
		  <div
            id="login_modal"
            className="menu menu-box-bottom"
          >
            <div className="menu-title">
              <a href="#" className="close-menu">
                <i className="fa fa-times"></i>
              </a>
            </div>
            <div className="content">
              <div className="account-access">
					<AuthUI/>
              </div>
            </div>
          </div>
          {/* <!-- Menu Settings Highlights--> */}
          <div
            id="menu-highlights"
            className="menu menu-box-bottom menu-box-detached"
          >
            <div className="menu-title">
              <h1>Highlights</h1>
              <p className="color-highlight">
                Any Element can have a Highlight Color
              </p>
              <a href="#" className="close-menu">
                <i className="fa fa-times"></i>
              </a>
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
                  <span className="color-green-light">Green</span>
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
                  <span className="color-brown-light">Wood</span>
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
              <a
                href="#"
                data-menu="menu-settings"
                className="mb-3 btn btn-full btn-m rounded-sm bg-highlight shadow-xl text-uppercase font-900 mt-4"
              >
                Back to Settings
              </a>
            </div>
          </div>
          {/* <!-- Menu Settings Backgrounds--> */}
          <div
            id="menu-backgrounds"
            className="menu menu-box-bottom menu-box-detached"
          >
            <div className="menu-title">
              <h1>Backgrounds</h1>
              <p className="color-highlight">
                Change Page Color Behind Content Boxes
              </p>
              <a href="#" className="close-menu">
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
          {/* <!-- Menu Share --> */}
          <div
            id="menu-share"
            className="menu menu-box-bottom menu-box-detached"
          >
            <div className="menu-title mt-n1">
              <h1>Share the Love</h1>
              <p className="color-highlight">
                Just Tap the Social Icon. We'll add the Link
              </p>
              <a href="#" className="close-menu">
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
    </>
  )
}
