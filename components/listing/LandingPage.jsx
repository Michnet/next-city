import { memo } from "react";
import BusinessOne from "./landingPages/Business1";
import styles from './styles/home1.module.css';
//import { useRecoilValue } from "recoil";
//import { activeDateState } from "@/contexts/atoms";

  const LandingConst = ({listing, setActiveKey, color}) => {
    //const {listing} = serverObj;
    const {short_desc, meta, cover, ticket_min_price_html, about_us, logo, thumbnail, dir_categories, tagline, title, latitude, longitude, phone, address, id, slug, locations} = listing ?? {};
    //const activeDate =  useRecoilValue(activeDateState);
    //const {act_id, act_dates} = activeDate ?? {};

    return  <div className="landing_page">
           
            <BusinessOne styles={styles} /* upcoming={upcoming} */ color={color} listing ={listing} cover={cover} setActiveKey={setActiveKey}/>
        </div>
        }


  const LandingPage = memo(LandingConst);
  
  export default LandingPage;