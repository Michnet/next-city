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
//import "@/public/scripts/bootstrap.min.js";

function MyApp({ Component, pageProps }) {

  /* useEffect(() => {
    require("@/public/scripts/custom.js");
  }); */

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
              <Component {...pageProps} />;
          </HydrationProvider>
          <AuthProvider/>
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

  console.log('contxx', cont?.ctx?.headers);
  return {  ...initialProps }
}

export default MyApp;