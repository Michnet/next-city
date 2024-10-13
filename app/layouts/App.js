import { memo, useEffect, useMemo } from "react";
import "@/public/scss/bootstrap.scss";
import "@/styles/globals.css";
import "@/public/scss/style.min.css";
import "@/public/styles/custom.min.css";
import { getSession, SessionProvider } from "next-auth/react";
import { closeMenus, onAppLoad } from "@/helpers/appjs";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "yet-another-react-lightbox/styles.css";
import { run_template } from "@/helpers/js";
import Aos from "aos";
import "aos/dist/aos.css";
import '@splidejs/react-splide/css';
import { Analytics} from '@vercel/analytics/react';
import { SpeedInsights } from "@vercel/speed-insights/next"

function MyAppConst({children}) {
  
  const Session = getSession();

  const cachedRunTemplate = useMemo(() => run_template(), [Session])
  const cachedOnAppLoad = useMemo(() => onAppLoad(), [Session])

  useEffect(() => {
    cachedOnAppLoad;
    cachedRunTemplate;
  
  }, [])

  useEffect(() => {
    //require("@/helpers/boojs.js");
   // onAppLoad();
   // require("bootstrap/dist/js/bootstrap.bundle.min.js");
    Aos.init({
      duration: 600,
      offset: 0,
      once: true,
    });
}, []);

  return <>
              <div className="menu-hider" onClick={() => closeMenus()}></div>
              {children}
              <Analytics/>
              <SpeedInsights/>
      
        </>
}

const MyApp = memo(MyAppConst);
export default MyApp;