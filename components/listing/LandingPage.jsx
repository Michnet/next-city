"use client";

import dynamic from "next/dynamic";
import { memo } from "react";
import Archi from "./landingPages/archi/Archi";
//import { Client } from "react-hydration-provider";
//import BusinessOne from "./landingPages/Business1";
//import Rockfest from "./landingPages/rockfest/Rockfest";
//import ProfileInfo from "./profileInfo/ProfileInfo";
//import styles from './styles/home1.module.css';
//import { useRecoilValue } from "recoil";
//import { activeDateState } from "@/contexts/atoms";

  const LandingConst = ({listing, setActiveKey, color, colorHex}) => {
    //const {listing} = serverObj;
    /* const {short_desc, meta, cover, ticket_min_price_html, about_us, logo, thumbnail, dir_categories, tagline, title, latitude, longitude, phone, address, id, slug, locations} = listing ?? {}; */
    //const activeDate =  useRecoilValue(activeDateState);
    //const {act_id, act_dates} = activeDate ?? {};
    const {type} = listing;

    function landingView(){
      //const Archi = dynamic(() => import("./landingPages/archi/Archi"), {ssr: false});
    return <Archi listing={listing} setActiveKey={setActiveKey} color={color} colorHex={colorHex}/>
      
     /*  switch (type) {
      
      case 'event':
        const Rockfest = dynamic(() => import("./landingPages/rockfest/Rockfest"), {ssr: false});
        return <Rockfest listing={listing} setActiveKey={setActiveKey} color={color} colorHex={colorHex}/> 
    
      default:
        const Archi = dynamic(() => import("./landingPages/archi/Archi"), {ssr: false});
        return <Archi listing={listing} setActiveKey={setActiveKey} color={color} colorHex={colorHex}/>
    } */
  }

    return  <div className="landing_page">
                {landingView()}
        </div>
        }


  const LandingPage = memo(LandingConst);
  
  export default LandingPage;