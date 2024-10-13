
"use client";

import { memo, useEffect, useMemo } from "react";
import { RecoilRoot } from "recoil";
import {HydrationProvider } from "react-hydration-provider";
import { SessionProvider, getSession } from "next-auth/react";
import { AuthProvider } from "@/helpers/use-auth";
import { run_template } from "@/helpers/js";
import { closeMenus, onAppLoad } from "@/helpers/appjs";
import ActivityProvider from "@/contexts/ActivityContext";
import UIProvider from "@/contexts/UIContext";
import SiteProvider from "@/contexts/siteContext";
import MessagesStater from "@/contexts/contextStaters/MessagesStater";
import Aos from "aos";
import { ParallaxScrollProvider } from '@/contexts/ParallaxContext';


function ProvidersConst({children}) {
  
  const Session = getSession();

  const cachedRunTemplate = useMemo(() => run_template(), [Session])
  const cachedOnAppLoad = useMemo(() => onAppLoad(), [Session])

  useEffect(() => {
    cachedOnAppLoad;
    cachedRunTemplate;
  
  }, [])

  useEffect(() => {
    Aos.init({
      duration: 600,
      offset: 0,
      once: true,
    });
}, []);

  return <>
      <RecoilRoot>
        <SessionProvider>
            <HydrationProvider>
              <div className="menu-hider" onClick={() => closeMenus()}></div>
              <ParallaxScrollProvider>{children}</ParallaxScrollProvider>
                <AuthProvider/>
                <UIProvider/>
                {/* <SWMessaging/> */}
                <SiteProvider/>
                <MessagesStater/>
                <ActivityProvider/>
              </HydrationProvider>
        </SessionProvider>
      </RecoilRoot>
      
  </>
}

const Providers = memo(ProvidersConst);
export default Providers;