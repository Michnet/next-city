import {useEffect} from "react";
import { useRouter } from "next/router";
//import { UICleanup } from "~/server/UniversalFunctions";

function RouteLoader() {

    const router = useRouter();

  const handleStart = (url) => {
    if (typeof window !== 'undefined') {
      if(!document.body.classList.contains('in_transit')){
        document.body.classList.add('in_transit');
      }
      //UICleanup();
      }
    }
  
  const handleStop = () => {
    if (typeof window !== 'undefined') {
      document.body.classList.remove('in_transit');
    }
  }

  useEffect(() => {
      if (typeof window !== 'undefined') { 
        document.body.classList.remove('in_transit');

          router?.events.on('routeChangeStart', handleStart)
          router?.events.on('routeChangeComplete', handleStop)
          router?.events.on('routeChangeError', handleStop)
          return () => {
            router?.events.off('routeChangeStart', handleStart)
            router?.events.off('routeChangeComplete', handleStop)
            router?.events.off('routeChangeError', handleStop)
          }
      }
    }, []);


  return (<></>
  )
}
export default RouteLoader