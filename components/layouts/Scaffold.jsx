"use client";
import MainMenu from "./MainMenu"
import { Client } from "react-hydration-provider";
import Activity from "../UI/lists/Activity";
import Header from "./partials/Header";
import {useMemo, memo, useEffect, useState, Suspense } from "react";
//import Image from "next/image";
import { useRouter } from "next/router"
//import PageLoader from "../skeletons/fullPage/PageLoader";
//import { srcWithFallback } from "@/helpers/universal";
import Script from "next/script";
import BottomMenu from "./BottomMenu";
import PageContent from "./PageContent";


function ScaffoldConst({children, uiSize, settings, headerTitle}) {
    const {isTab, isLargeTab} = uiSize;
    const {noHeader, autoShowHeader,mMenuContent, hideNews, noFooter, uiBackground, pageClass} = settings ?? {};
    const {btnProps, icon} = mMenuContent ?? {}
    const router = useRouter();


    const cachedChildren = useMemo(() => children, [router.asPath])
    //const cachedChildren = () => children;
    /* const [loading, setLoading] = useState(true);
    const [loaderRoute, setLoaderRoute] = useState('') */

/* 

  const handleStarting = (url) => {
    setLoaderRoute(url)
    setLoading(true);
  }

const handleStoping = () => {
  setLoading(false)
}

useEffect(() => {
      setLoading(false)
        router?.events.on('routeChangeStart', handleStarting)
        router?.events.on('routeChangeComplete', handleStoping)
        router?.events.on('routeChangeError', handleStoping)
        return () => {
          router?.events.off('routeChangeStart', handleStarting)
          router?.events.off('routeChangeComplete', handleStoping)
          router?.events.off('routeChangeError', handleStoping)
        }
  }, []);

useEffect(() => {
      setLoading(false);
        return () => {setLoading(true)
        }
  }, [headerTitle, settings]); */

 
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
    <div id='page_box' className={`container-fluid p-0 ${pageClass ?? ""}`}>
        <div className={`row flex-nowrap _scaffold`} /* style={{zIndex: 0, position: 'relative'}} */>
            <div className="col-auto d-none d-md-block p-0 p-md-2" style={{height: '100vh', position: 'sticky', top: '0', maxWidth: '250px', zIndex: '1'}}>
                <div id="sidebar" className="_main collapse collapse-horizontal d-none d-md-block rounded-m bg-theme-transparent" style={{backdropFilter: 'blur(2px)'}}>
                    <MainMenu/>
                </div>
            </div>
            <div className="col px-0 main_content position-relative" style={{minWidth: '0', minHeight: '100vh'}}>
                {noHeader ? <></> : <>
                    {<Header headerTitle={headerTitle} headerClass={isTab ? autoShowHeader ? 'header-auto-show' : 'header-always-show' : 'header-always-show'}/>}
                </>}
                {/* {cachedChildren} */}
                {/* {loading ? <PageLoader route={loaderRoute}/> : cachedChildren} */}
                <PageContent>
                  {cachedChildren}
                </PageContent>
            </div>
            <Client>{!hideNews && <div className="lg-sticky col p-2 flex-grow-0 d-none d-lg-block right_view" style={{width: '295px', minWidth: '295px', top: '0px'}}>
                <Activity/>
            </div>}</Client>
        </div>
    </div>
    <Client>
        <div id="mobile_sidebar" className="_main menu menu-box-left d-block d-md-none rounded-16 bg-theme-transparent" style={{backdropFilter: 'blur(2px)'}}>
            <MainMenu/>
        </div>
        <div style={{width: '300px'}} id="mobile_news" className="menu menu-box-right d-block d-lg-none rounded-16 bg-theme">
            <Activity/>
        </div>
    </Client>
      <Script strategy={'afterInteractive'} type={'module'} onReady={() => console.log('Main loaded')} src="/scripts/bootstrap.min.js"/>
      {noFooter ? <></> : <BottomMenu btnProps={btnProps} icon={icon}/>}
    </>
  )
}

const Scaffold = memo(ScaffoldConst);
export default Scaffold