import { memo, useEffect, useMemo } from "react";
import "@/public/scss/bootstrap.scss";
import "@/styles/globals.css";
import "@/public/scss/style.min.css";
import "@/public/styles/custom.min.css";
import { RecoilRoot } from "recoil";
import { Client, HydrationProvider } from "react-hydration-provider";
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
import { run_template } from "@/helpers/js";
import SeoHead from "@/components/UI/SeoHead";
import Aos from "aos";
import "aos/dist/aos.css";
import '@splidejs/react-splide/css';
import { Analytics} from '@vercel/analytics/react';
import { SpeedInsights } from "@vercel/speed-insights/next"
import { SiteLinksSearchBoxJsonLd } from "next-seo";
//import {populateDb} from "@/helpers/dexie";


function MyAppConst({ Component, pageProps, platform }) {
  const {headerTitle, settings, seoMeta} = pageProps;
  
  const Session = getSession();
  run_template();
  const cachedRunTemplate = useMemo(() => run_template(), [Session])
  const cachedOnAppLoad = useMemo(() => onAppLoad(), [Session])

  useEffect(() => {
    cachedOnAppLoad;
    cachedRunTemplate;
  
  }, [])

  useEffect(() => {
    //require("@/helpers/boojs.js");
   // onAppLoad();
   // require("bootstrap/dist/js/bootstrap.bundle.min.js");
    Aos.init({
      duration: 600,
      offset: 0,
      once: true,
    });

   // populateDb({querySize:3});
}, []);


  return <>
    <SiteLinksSearchBoxJsonLd
      url="https://lyvecity.com"
      potentialActions={[
        {
          target: 'https://lyvecity.com/explore?search_keywords',
          queryInput: 'best restaurant',
        }
      ]}
    />
      <RecoilRoot>
      <SeoHead seoMeta={seoMeta}/>
        <SessionProvider>
            <HydrationProvider>
              <div className="menu-hider" onClick={() => closeMenus()}></div>
              <Layout platform={platform} settings={settings} headerTitle={headerTitle}>
                <Component {...pageProps}/>
              </Layout>
              <Client>
                <AuthProvider/>
                <UIProvider platform={platform}/>
                {/* <SWMessaging/> */}
                <SiteProvider/>
                <MessagesStater/>
                {/* <ActivityProvider/> */}
              </Client>
              </HydrationProvider>
              <Analytics/>
              <SpeedInsights/>
        </SessionProvider>
      </RecoilRoot>
      
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