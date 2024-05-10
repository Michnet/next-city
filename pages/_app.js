import Head from "next/head";
import { memo, useEffect, useMemo } from "react";
import "@/public/scss/bootstrap.scss";
import "@/styles/globals.css";
import "@/public/scss/style.scss";
import "@/public/styles/custom.min.css";
import { RecoilRoot } from "recoil";
import { HydrationProvider } from "react-hydration-provider";
import App from "next/app";
import { getSession, SessionProvider } from "next-auth/react";
import { AuthProvider } from "@/helpers/use-auth";
import { closeMenus, onAppLoad } from "@/helpers/appjs";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "yet-another-react-lightbox/styles.css";
import ActivityProvider from "@/contexts/ActivityContext";
import Layout from "@/components/layouts/Layout";
import UIProvider from "@/contexts/UIContext";
import SiteProvider from "@/contexts/siteContext";
import MessagesStater from "@/contexts/contextStaters/MessagesStater";
//import { useRouter } from "next/router";
//import SWMessaging from "@/contexts/contextStaters/SWMessaging";
import { run_template } from "@/helpers/js";
//import "@/public/scripts/bootstrap.min.js";

function MyAppConst({ Component, pageProps, platform }) {
  const {headerTitle, settings} = pageProps;

  //const router = useRouter();

  const cachedSettings = useMemo(() => settings, [headerTitle]);
  
  const Session = getSession();

  const cachedRunTemplate = useMemo(() => run_template(), [Session])
  //const cachedOnAppLoad = useMemo(() => onAppLoad(), [Session])

  console.log("loading layout");

  useEffect(() => {
    //cachedOnAppLoad;
    cachedRunTemplate;
  
  }, [])

  useEffect(() => {
    //require("@/helpers/boojs.js");
   // onAppLoad();
   // require("bootstrap/dist/js/bootstrap.bundle.min.js");
   /*  Aos.init({
      duration: 1200,
      once: true,
    }); */
}, []);

  return <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, viewport-fit=cover" />
        <title>LyveCity</title>
      </Head>
      <SessionProvider>
        <RecoilRoot>
          <HydrationProvider>
            <div className="menu-hider" onClick={() => closeMenus()}/>
            <Layout platform={platform} settings={cachedSettings} headerTitle={headerTitle}>
              <Component {...pageProps}/>
            </Layout>
          </HydrationProvider>
          <AuthProvider/>
          <UIProvider platform={platform}/>
          {/* <SWMessaging/> */}
          <SiteProvider/>
          <MessagesStater/>
          <ActivityProvider/>
        </RecoilRoot>
      </SessionProvider>
      <style>
        {`:root{
           --miniFontSize: 13px;
           --fontSize: var(--font-size);
           --mdFontSise: 15px;--smFontSize: 14px;
           --xsFontSize: 12px;
           --bgFontSize: 19px;
           --exBigFontSize: 22px;
           
          --headingFont: "Jost", sans-serif !important;
          --handFont: 'Dr Sugiyama', cursive;
          --fontFamily: "Roboto", sans-serif !important;
        }
        h1, h2, h3, h4, h5, h6{
          font-family: var(--headingFont);
        }

        @scope (.theme-light) {
          :scope {
              --colorTheme: #0f1117;
              --bgTheme: #FFFFFF;
              --bgThemeLight: #c7c7c7;
              --bgThemeTransparent: #ffffffe6;
              --bgThemeTransparent2: #f0f0f0d0;
              --bgThemeTransparent3: #f0f0f05c;
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
              --bgThemeTransparent: rgba(0, 0, 0, 0.902);
              --bgDarkTransparent: rgba(0, 0, 0, 0.902);
              --bgThemeTransparent2: rgba(15, 17, 23, 0.76);
              --bgThemeTransparent3: #0f11178c;
              --bgDarkTransparent2: rgba(15, 17, 23, 0.76);
              --borderTheme: rgba(255, 255, 255, 0.12);
              --bgBrightness:0.8;
            }
      }
      
        `}
        
    </style>
     
  </>
}

MyAppConst.getInitialProps = async (cont) => {
  /* if (ctx && ctx.req && ctx.req.headers) {
    return {
      userAgent: ctx.req.headers['user-agent']
    }
  }
  return {}; */

  const initialProps = await App.getInitialProps(cont)
  //const userAgent = typeof window === "undefined" ? ctx.req.headers["user-agent"] : window.navigator.userAgent
   const reqPlat = cont?.ctx?.req?.headers['sec-ch-ua-platform'];
  //console.log('contxx', cont?.ctx?.req?.headers['sec-ch-ua-mobile']);
  return {  ...initialProps , platform: reqPlat }
}

const MyApp = memo(MyAppConst);
export default MyApp;