import "@/styles/globals.css";
import Head from "next/head";
import { useEffect } from "react";
import "@/public/scss/bootstrap.scss";
import "@/public/scss/style.scss";
import "@/public/styles/custom.min.css";
import { RecoilRoot } from "recoil";
import { HydrationProvider } from "react-hydration-provider";
//import "@/public/scripts/bootstrap.min.js";

export default function App({ Component, pageProps }) {

  /* useEffect(() => {
    require("@/public/scripts/custom.js");
  }); */

  useEffect(() => {
    require("@/helpers/boojs.js");
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
      <RecoilRoot>
        <HydrationProvider>
            <Component {...pageProps} />;
        </HydrationProvider>
      </RecoilRoot>
  </>
}
