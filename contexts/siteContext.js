import {  useEffect } from "react";
//import {getDirTerms } from "../../server/WpRest";
import { Dir_categories, Dir_locations, Dir_tags, Shop_categories } from "@/public/data/localCache";
import { atom } from 'recoil';
import { useSetRecoilState } from 'recoil';
import { Client } from "react-hydration-provider";
import db from "@/helpers/dexie";

//export const SiteContext = ({children}) => <>{children}</>;


export const siteState = atom({
    key: 'siteState', 
    default: {}, 
});


export default function SiteProvider(){

    function toServiceWorker(){
        if (navigator.serviceWorker) {
          navigator.serviceWorker.ready.then((registration) => {
            registration.active.postMessage({type:'db'});
          });
        }
      }
    
/*       useEffect(() => {
         setUpMessaging();
      
        return () => {
          navigator.serviceWorker.removeEventListener("message", (event) => {
          });
        }
      }, []) */
      
    
    useEffect(() => {
    
        toServiceWorker();
    }, []);
   
    return (<Client><div id="siteState"/></Client>);
} 