import Head from "next/head";
import { memo, useEffect, useMemo } from "react";
import "@/public/scss/bootstrap.scss";
import "@/styles/globals.css";
import "@/public/scss/style.scss";
import "@/public/styles/custom.min.css";
import { RecoilRoot } from "recoil";
import { HydrationProvider } from "react-hydration-provider";
import App from "next/app";
import { SessionProvider } from "next-auth/react";
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
import { useRouter } from "next/router";
//import "@/public/scripts/bootstrap.min.js";

function MyAppConst({ Component, pageProps, platform }) {
  const {headerTitle, settings} = pageProps;

  const router = useRouter();

  const cachedSettings = useMemo(() => settings, [router.asPath, headerTitle, platform]);

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
        <title>Next City</title>
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