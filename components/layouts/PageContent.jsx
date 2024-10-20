"use client";

//import MainMenu from "./MainMenu"
//import { Client } from "react-hydration-provider";
//import Activity from "../UI/lists/Activity";
//import Header from "./partials/Header";
import {useMemo, memo, useEffect, useState, Suspense } from "react";
//import Image from "next/image";
import { useRouter } from "next/router"
import PageLoader from "../skeletons/fullPage/PageLoader";
//import { srcWithFallback } from "@/helpers/universal";
//import Script from "next/script";
//import BottomMenu from "./BottomMenu";
import { closeMenus } from "@/helpers/appjs";


function PageContentConst({children}) {
    const router = useRouter();

    const cachedChildren = useMemo(() => children, [router.asPath])
    //const cachedChildren = () => children;
    //const [loading, setLoading] = useState(true);
    const [loaderRoute, setLoaderRoute] = useState(null)
/* 
  const handleStarting = (url) => {
    setLoaderRoute(url);
    setLoading(true);
  }

const handleStoping = () => {
  setLoading(false)
} */


const handleStart = (url) => {
  setLoaderRoute(url);
  if (typeof window !== 'undefined') {
    if(!document.body.classList.contains('in_transit')){
      document.body.classList.add('in_transit');
    }
    //UICleanup();
    }
  }

const handleStop = () => {
  if (typeof window !== 'undefined') {
    console.log('route stoping');
    document.body.classList.remove('in_transit');
    closeMenus();
  }
}


useEffect(() => {
     // setLoading(false)
        router?.events.on('routeChangeStart', handleStart)
        router?.events.on('routeChangeComplete', handleStop)
        router?.events.on('routeChangeError', handleStop)
        return () => {
          router?.events.off('routeChangeStart', handleStart)
          router?.events.off('routeChangeComplete', handleStop)
          router?.events.off('routeChangeError', handleStop)
        }
  }, []);
/* 
useEffect(() => {
      setLoading(false);
        return () => {setLoading(true)
        }
  }, [headerTitle, settings]);
 */
 
  return (<>
  <style>{`.site_bg_holder:has(.bg-overlay) img.site_bg_img {
    display: block !important;
} 
img.site_bg_img{
    transition: all 5s; 
    opacity: 0
}
._loaded img.site_bg_img{
    opacity: 1;
}`}</style>
            <>
                {/* {cachedChildren} */}
                {/* {loading ? <PageLoader route={loaderRoute}/> : children} */}
                {loaderRoute ? <PageLoader route={loaderRoute}/> : cachedChildren} 
            </>
    </>
  )
}

const PageContent = memo(PageContentConst);
export default PageContent