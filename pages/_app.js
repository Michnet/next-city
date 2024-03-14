import Head from "next/head";
import { useEffect } from "react";
import "@/public/scss/bootstrap.scss";
import "@/public/scss/style.scss";
import "@/public/styles/custom.min.css";
import { RecoilRoot } from "recoil";
import { HydrationProvider } from "react-hydration-provider";
import App from "next/app";
import Script from "next/script";
import { SessionProvider } from "next-auth/react";
import { AuthProvider } from "@/helpers/use-auth";
import { onAppLoad } from "@/helpers/appjs";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ActivityProvider from "@/contexts/ActivityContext";
import Layout from "@/components/layouts/Layout";
import { UIProvider } from "@/contexts/UIContext";
//import "@/public/scripts/bootstrap.min.js";

function MyApp({ Component, pageProps, platform }) {
  const {headerTitle, settings} = pageProps;

  console.log('platfor', settings)

  useEffect(() => {
    require("@/helpers/boojs.js");
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
            <Layout platform={platform} settings={settings} headerTitle={headerTitle}>
              <Component {...pageProps}/>
            </Layout>
          </HydrationProvider>
          <AuthProvider/>
          <UIProvider platform={platform}/>
          <ActivityProvider/>
        </RecoilRoot>
      </SessionProvider>
      <Script>
        {`  
           console.log('app loaded');
        `}
      </Script>
  </>
}

MyApp.getInitialProps = async (cont) => {
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

export default MyApp;