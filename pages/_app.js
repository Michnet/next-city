//import Head from "next/head";
import { memo, useEffect, useMemo } from "react";
import "@/public/scss/bootstrap.scss";
import "@/styles/globals.css";
import "@/public/scss/style.scss";
import "@/public/styles/custom.min.css";
import { RecoilRoot } from "recoil";
import { Client, HydrationProvider } from "react-hydration-provider";
import App from "next/app";
import { getSession, SessionProvider } from "next-auth/react";
import { AuthProvider } from "@/helpers/use-auth";
import { closeMenus } from "@/helpers/appjs";
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
//import SiteHead from "@/components/UI/SiteHead";
//import "@/public/scripts/bootstrap.min.js";
//import { DefaultSeo } from 'next-seo';
import SeoHead from "@/components/UI/SeoHead";

function MyAppConst({ Component, pageProps, platform }) {
  const {headerTitle, settings, seoMeta} = pageProps;
 /*  const cachedSettings = useMemo(() => settings, [headerTitle]);
  const cachedSeoMeta = useMemo(() => seoMeta, [headerTitle]); */
  
  const Session = getSession();

  const cachedRunTemplate = useMemo(() => run_template(), [Session])
  //const cachedOnAppLoad = useMemo(() => onAppLoad(), [Session])

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
      {/* <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, viewport-fit=cover" />
        <title>LyveCity</title>
      </Head> */}
      <RecoilRoot>
      {/* <SiteHead title={'Home'} description='home desc' seoMeta={cachedSeoMeta}/> */}
      <SeoHead title={'Home'} description='home desc' seoMeta={seoMeta}/>
      
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
                  <ActivityProvider/>
                </Client>
                </HydrationProvider>
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