import { cleanHtml } from "@/helpers/universal"
import RatingView from "../../reviews/RatingView"
import CountDownUI from "@/components/UI/CountDownUI";
import { Client } from "react-hydration-provider";
import DateViewString from "../UI/partials/dateViews/DateViewString";
import { PriceView } from "../UI/PriceView";

function Hero({listing, setActiveKey, activeKey}) {
    const {title, rating, address, categories} = listing ?? {}
  return (
    <>
    <div className={`card preload-img listing_hero`} style={{backgroundImage: `url(${cover})`, height: activeKey == 'home' ? '65vh' : '40vh'}}>
        <div className="card-top m-3">
            <div className="notch-clear">
                <a data-back-button href="#" className="icon icon-xs bg-theme color-theme rounded-m"><i className="fa fa-angle-left"></i></a>
            </div>
        </div>
        <div className="card-bottom bg-gradient-fade p-3 pt-5">
            {activeKey == 'home' && <span className="bg-night-light color-white font-700 p-1">
                {categories[0]?.name}
            </span>}
            <h1 className={`font-900 line-height-xl mt-1 ${activeKey == 'home' ? 'font-40' : 'truncate-2 font-30'}`}>
                {cleanHtml(title?.rendered)}
            </h1>
            <p className="mb-3">
                <i className="fa fa-map-marker font-11 me-2"></i>
                {address}
            </p>
            <div className="d-flex align-items-center">
                {rating && rating > 0 && <div className="align-self-center flex-grow-1">
                    <div className="mb-1"><span className="font-11">
                        User Reviews
                    </span></div>
                    <RatingView rating={rating} id={id}/>
                </div>}
                <div className="align-self-center flex-shrink-1 d-none d-md-block">
                    <button onClick={() => setActiveKey('tickets')} className="btn btn-full btn-s me-3 font-900 text-uppercase rounded-sm shadow-xxl bg-dark-dark">Booking</button>
                </div>
            </div>
        </div>
    </div>
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
    </>
  )
}
export default Hero