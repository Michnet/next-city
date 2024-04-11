import CountDownUI from "@/components/UI/CountDownUI";
import { memo } from "react";
import MegaGallery from "@/components/UI/Galleries/MegaGallery";
import { Client } from "react-hydration-provider";
import BusinessOne from "./landingPages/Business1";
import styles from './styles/home1.module.css';
import DateViewString from "../UI/partials/dateViews/DateViewString";
import { PriceView } from "../UI/PriceView";
import { useRecoilValue } from "recoil";
import { activeDateState } from "@/contexts/atoms";
import MegaGalleryMini from "../UI/Galleries/MegaGalleryMini";

  const LandingConst = ({listing, setActiveKey}) => {
    //const {listing} = serverObj;
    const {short_desc, meta, cover, ticket_min_price_html, about_us, logo, thumbnail, dir_categories, tagline, title, latitude, longitude, phone, address, id, slug, locations} = listing ?? {};
    const activeDate =  useRecoilValue(activeDateState);
    const {act_id, act_dates} = activeDate;

    return  <div className="landing_page">
            <div className="bg-highlight shadow-bg shadow-card mx-3" style={{borderRadius: '15px'}}>
                <div className="card card-style m-0">
                <div className="content bg-theme m-3 p-3 border-type-1" style={{borderRadius: '15px'}}>          
                    <Client>{short_desc && <p className="mb-3 text-14 pb-2">
                        <span  dangerouslySetInnerHTML={{__html: short_desc}}/>
                    </p>}</Client>
                    <CountDownUI fromActive eventId={listing?.id} /* eventId={id} */ />
                    <div className="row mb-3 mt-4 meta_card">
                        {act_dates && act_id == listing?.id ? <div className="col-6 p-0">
                            <div className="d-flex">
                                <div className="align-self-center">
                                    <i style={{width:"20px"}} className="far fa-calendar-check color-teal-dark font-23 me-3 text-center"></i>
                                </div>
                                <div className="align-self-center">
                                    <span className="d-block font-11 mb-n1 pb-1 color-theme opacity-50 lh-1">Date</span>
                                    <strong className="d-block truncate-2 meta_info font-13 pb-1 color-theme"><DateViewString eventId={listing?.id} fromActive /* date={event_date[0].start} */ format={'ddd, DD MMMM'}/></strong>
                                </div>
                            </div>
                        </div> : <></>}
                        {act_dates && act_id == listing?.id ? <div className="col-6 p-0">
                            <div className="d-flex">
                                <div className="align-self-center">
                                    <i style={{width:"20px"}} className="bi bi-clock color-red-dark font-23 me-3 text-center"></i>
                                </div>
                                <div className="align-self-center">
                                    <span className="d-block font-11 mb-n1 pb-1 color-theme opacity-50 lh-1">Time</span>
                                    <strong className="d-block truncate-2 meta_info font-13 pb-1 color-theme"><DateViewString eventId={listing?.id} fromActive format={'hh:mm A'}/></strong>
                                </div>
                            </div>
                        </div> : <></>}
                        <div className="col-12 mb-2"></div>
                        {address?.length > 0 || locations?.length > 0 ? <div className="col-6 p-0">
                            <div className="d-flex">
                                <div className="align-self-center">
                                    <i style={{width:"20px"}} className="bi bi-geo-alt color-yellow-dark font-23 me-3 text-center"></i>
                                </div>
                                <div className="align-self-center">
                                    <span className="d-block font-11 mb-n1 pb-1 color-theme opacity-50 lh-1">Where</span>
                                    <strong className="d-block truncate-2 meta_info font-13 pb-1 color-theme">{address?.length > 0 ? address : locations?.length > 0 ? locations[0].name : ''}</strong>
                                </div>
                            </div>
                        </div> : <></>}
                        {ticket_min_price_html && <div className="col-6 p-0">
                            <div className="d-flex">
                                <div className="align-self-center">
                                    <i style={{width:"20px"}} className="bi bi-wallet color-green-dark font-23 me-3 text-center"></i>
                                </div>
                                <div className="align-self-center">
                                    <span className="d-block font-11 mb-n1 pb-1 color-theme opacity-50 lh-1">From</span>
                                    <strong className="d-block truncate-2 meta_info font-13 pb-1 color-theme">{ticket_min_price_html && <PriceView preText={''}  exClass={'_inline'} priceHTml={ticket_min_price_html}/> }</strong>
                                </div>
                            </div>
                        </div>}
                    </div>

                </div>
            </div>
            </div>

            <div className="mb-5 px-50">
                
            </div>

            <div className="card card-style shadow-0 radius-0 bg-transparent">
            {/* <MegaGalleryMini listing={listing}/> */}
            </div>
            <BusinessOne styles={styles} /* upcoming={upcoming} */ /* color={color} */ listing ={listing} cover={cover} setActiveKey={setActiveKey}/>
        </div>
        }


  const LandingPage = memo(LandingConst);
  
  export default LandingPage;