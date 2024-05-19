import { memo, useEffect } from "react";
import {useSetRecoilState } from "recoil";
//import { getBPRecipientThread, getEventDates } from "~/server/WpRest";
import { activeDateState } from "../atoms";



function SWMessagingConst({id}) {

  function setUpMessaging(){
    if (navigator.serviceWorker) {    
      navigator.serviceWorker.addEventListener("message", (event) => {
        let incoming = event.data; 
        const {type, swResponse} = incoming;
        if(type == 'auth'){
          const {authResponse} = swResponse;
        }
      });
    }
  }

  /* function toServiceWorker(){
    if (navigator.serviceWorker) {
      navigator.serviceWorker.ready.then((registration) => {
        registration.active.postMessage({type:'listingState', listingId:id, subTypes:['dates','reviews']});
      });
    }
  } */

  useEffect(() => {
     setUpMessaging();
    return () => {
      navigator.serviceWorker.removeEventListener("message", (event) => {
      });
    }
  }, [])
  

useEffect(() => {

 if(id != 'undefined'){
    //toServiceWorker();
  }
}, [id]);

  return <div className="swMessenger"/>
}

const SWMessaging = memo(SWMessagingConst)
export default SWMessaging