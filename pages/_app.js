import "@/styles/globals.css";
import Head from "next/head";
import { useEffect } from "react";
//import "@/public/scripts/bootstrap.min.js";

export default function App({ Component, pageProps }) {

  /* useEffect(() => {
    require("@/public/scripts/custom.js");
  }); */

  useEffect(() => {
    /* if (typeof window !== "undefined") {
      require("@/public/scripts/bootstrap.min.js");
    } */
  });

  return <>
  <Head>
    <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, viewport-fit=cover" />
    <title>Next City</title>
  </Head>
  <Component {...pageProps} /></>;
}
