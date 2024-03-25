import CountDownUI from "@/components/UI/CountDownUI";
import { memo } from "react";
import FAQs from "@/components/UI/FAQs";
import MegaGallery from "@/components/UI/Galleries/MegaGallery";
import { Client } from "react-hydration-provider";
import BusinessOne from "./landingPages/Business1";
import styles from './styles/home1.module.css';
import DateViewString from "../UI/partials/dateViews/DateViewString";
import { PriceView } from "../UI/PriceView";

  const LandingConst = ({listing, setActiveKey}) => {
    //const {listing} = serverObj;
    const {short_desc, meta, cover, ticket_min_price_html, about_us, logo, thumbnail, dir_categories, tagline, title, latitude, longitude, phone, address, id, slug, locations} = listing ?? {};
    const {faqs} = about_us ?? {};
    let trimFaqs = faqs?.slice(0,3);

    return  <div className="landing_page">
            <div className="card card-style">
                <div className="content">          
                    <Client>{short_desc && <p className="mb-3 text-14 pb-2">
                        <span  dangerouslySetInnerHTML={{__html: short_desc}}/>
                    </p>}</Client>
                    <CountDownUI fromActive eventId={listing?.id} /* eventId={id} */ />
                    <div className="row mb-3 mt-4 meta_card">
                        <div className="col-6">
                            <div className="d-flex">
                                <div className="align-self-center">
                                    <i style={{width:"20px"}} className="far fa-calendar-check color-teal-dark font-23 me-3 text-center"></i>
                                </div>
                                <div className="align-self-center">
                                    <span className="d-block font-11 mb-n1 pb-1 color-theme opacity-50 lh-1">Date</span>
                                    <strong className="d-block truncate-2 meta_info font-13 pb-1 color-theme"><DateViewString eventId={listing?.id} fromActive /* date={event_date[0].start} */ format={'ddd, DD MMMM'}/></strong>
                                </div>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="d-flex">
                                <div className="align-self-center">
                                    <i style={{width:"20px"}} className="bi bi-clock color-red-dark font-23 me-3 text-center"></i>
                                </div>
                                <div className="align-self-center">
                                    <span className="d-block font-11 mb-n1 pb-1 color-theme opacity-50 lh-1">Time</span>
                                    <strong className="d-block truncate-2 meta_info font-13 pb-1 color-theme"><DateViewString eventId={listing?.id} fromActive format={'hh:mm A'}/></strong>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 mb-2"></div>
                        <div className="col-6">
                            <div className="d-flex">
                                <div className="align-self-center">
                                    <i style={{width:"20px"}} className="bi bi-geo-alt color-yellow-dark font-23 me-3 text-center"></i>
                                </div>
                                <div className="align-self-center">
                                    <span className="d-block font-11 mb-n1 pb-1 color-theme opacity-50 lh-1">Where</span>
                                    <strong className="d-block truncate-2 meta_info font-13 pb-1 color-theme">{address?.length > 0 ? address : locations?.length > 0 ? locations[0].name : ''}</strong>
                                </div>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="d-flex">
                                <div className="align-self-center">
                                    <i style={{width:"20px"}} className="bi bi-wallet color-green-dark font-23 me-3 text-center"></i>
                                </div>
                                <div className="align-self-center">
                                    <span className="d-block font-11 mb-n1 pb-1 color-theme opacity-50 lh-1">From</span>
                                    <strong className="d-block truncate-2 meta_info font-13 pb-1 color-theme">{ticket_min_price_html && <PriceView preText={''}  exClass={'_inline'} priceHTml={ticket_min_price_html}/> }</strong>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="divider mb-1"></div>

                </div>
            </div>

            <div className="mb-5 px-50">
                <button onClick={() => setActiveKey('tickets')} className="w-1/1 shadow-bg btn btn-full btn-m rounded-lg shadow-bg-m bg-highlight font-700 text-uppercase">Booking</button>
            </div>

            <div className="card card-style shadow-0 radius-0 bg-transparent">
            <MegaGallery listing={listing} /* color={color} *//>
            </div>

            {faqs?.length > 0 && <div className="card card-style shadow-0 border bg-transparent">
                <div className="content">
                    <div className="d-flex pb-2 border-bottom mb-3 ">
                        <div>
                            <h6 className="mb-n1 opacity-80 color-highlight">FAQs</h6>
                            <h3>Common Questions</h3>
                        </div>
                        <div className="align-self-center ms-auto">
                        <i className="bi bi-question-circle-fill font-24 color-red-dark"></i>
                        </div>
                    </div>
                    {trimFaqs?.length > 0 && <FAQs faqs={trimFaqs} postID={id}/>}
                    <button onClick={() => setActiveKey('faqs')} className="shadow-lg-m rounded-l color-white bg-secondary mb-0 btn btn-xxs mb-3 font-900 shadow-lg">
                        Get More Answers
                    </button>
                </div>
            </div>}
            <BusinessOne styles={styles} /* upcoming={upcoming} */ /* color={color} */ listing ={listing} cover={cover} setActiveKey={setActiveKey}/>
        </div>
        }


  const LandingPage = memo(LandingConst);
  
  export default LandingPage;