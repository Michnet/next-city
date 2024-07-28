import MainMenu from "./MainMenu"
import { Client } from "react-hydration-provider";
import Activity from "../UI/lists/Activity";
import Header from "./partials/Header";
import {useMemo, memo, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router"
import PageLoader from "../skeletons/fullPage/PageLoader";


function ScaffoldConst({children, uiSize, settings, headerTitle}) {
    const {isTab} = uiSize;
    const {noHeader, autoShowHeader, hideNews, uiBackground, pageClass} = settings ?? {};

    //const cachedChildren = useMemo(() => children, [headerTitle])
    //const cachedChildren = () => children;
    const [loading, setLoading] = useState(true);
    const [loaderRoute, setLoaderRoute] = useState('')

    const router = useRouter();


  const handleStarting = (url) => {
    setLoading(true);
    setLoaderRoute(url)
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
      setLoading(false)
        return () => {setLoading(true)
        }
  }, [headerTitle, settings]);
    
  return (<>
    <div className={`container-fluid p-0 ${pageClass ?? ""}`}>
        {<div style={{height: '120vh', position:'fixed', top:'0', left:'0', width: '100vw'}} className='position-fixed top-0'>
          <Image  src={uiBackground ?? '/images/bg/pageBg.jpg'} fill className='object-cover top-0'/>
          <div  className="bg-overlay h-100 bg-theme-transparent-0 position-relative" style={{backdropFilter:'saturate(180%) blur(20px) brightness(var(--bgBrightness))'}}/>
        </div>}
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
                {/* <PageLoader route={loaderRoute}/> */}
                {loading ? <PageLoader route={loaderRoute}/> : children}
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
    </>
  )
}

const Scaffold = memo(ScaffoldConst);
export default Scaffold