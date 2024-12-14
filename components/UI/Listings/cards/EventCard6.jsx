import { cleanHtml, hashtag, localiseDate, resizedImage, shuffleArray, srcUrlWithFallback, srcWithFallback } from "@/helpers/universal";
import Link from "next/link";
import DateView from "../../partials/dateViews/DateView";
//import Image from 'next/image';
import { ListingMetaMini, ListingMeta, SlickArrow } from "../../Partials";
import { PriceView } from "../../PriceView";
import TermTag from "../../partials/TermTag";
//import Slider from "react-slick";
//import { LoaderSiteLogo } from "@/components/skeletons/Loaders";
import { fallbackImgSrcSet } from '@/helpers/base';
//import DateViewDescriptive from './../../partials/dateViews/DateViewDescriptive';
//import { openOffCanvas } from "@/helpers/appjs";

import dayjs from "dayjs";
var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)

const EventCard6 = ({listing, width=220, exImgClass='', imageRadius=0, contentClass='px-3', minHeight=180, height='auto', exClass='', noButton=true, truncate=true, transparent=false, mini}) => {
    let {id, title, category, event_date, page_views, rating,  locations, ticket_min_price_html,  gallery, slug, acf, _embedded, type} = listing;
    const {likes} = acf?.community ?? {};

    //const slicedGal = shuffleArray(gallery).slice(0, 5);
    //const imgArr = [xtra_large_thumb ?? large_thumb, ...slicedGal];
    let tempArr = [...gallery];
    if(_embedded['wp:featuredmedia']){
        tempArr.push(_embedded['wp:featuredmedia'][0].source_url)
    }
    const imgArr2 = shuffleArray([...tempArr]);

    return (<>
    <div data-aos='zoom-in' className={`listing_card card card-style m-0 event_card_6 event_card_2 m-0 ${exClass} ${transparent ? 'bg-transparent' : ''}`} style={{width: width}}>

            <div className="gap-2 activity_header  d-flex align-items-center">
                {/* <div className='hide_if_empty'>
                    {event_date && event_date[0] ? <DateView customDate={event_date[0].start} customEndDate={event_date[0].end} exClass='position-relative card_date darky mb-2 me-2'/> : <></>}
                </div> */}
                <div className="minw-0 flex-shrink-1 flex-grow-1">
                    {/* <h5 className="_title mb-0 font-16 font-700">{cleanHtml(title.rendered)}</h5> */}
                    {/* <TermTag exTagClass={'rounded-3 text-13 fw-500 color-theme'} exClass={'lgLine w-fit flex-shrink-1 minw-0'} term={category} type={'hash'} linkTax={'category'}/>
                    <Link href={`/${type}s/${slug}`}><h5 className={`smLine text-capitalize _title ${truncate ? 'truncate' : 'truncate-2'}`}>{cleanHtml(title.rendered).toLowerCase()}</h5></Link> */}
                    <div className="title_meta d-flex  flex-column lh-11">
                        {/* <div className="pe-2"><span className="font-11 opacity-60 accordionfont-11 text-truncate">@{slug}</span></div> */}
                        {/* <div><span className="opacity-40 font-11">{dayjs(localiseDate(modified)).fromNow()}</span></div> */}
                        {/* {event_date && event_date[0] ? <DateViewDescriptive customEndDate={event_date[0].end} customDate={event_date[0].start}/> : <></>} */}
                        {/* <div className="pe-2"><span className="font-13 opacity-40 fw-400 accordionfont-11 text-truncate d-block">{tagline}</span></div> */}
                        
                    </div>
                </div>
                {/* <div className="ms-auto"><a href="#" data-menu="menu-controls" onClick={(e) => openOffCanvas(e)}className="icon icon-xss d-block color-theme"><i className="fa fa-ellipsis-v"></i></a>
                </div> */}
            </div>


            <div className={`overflow-hidden card position-relative shadow-0 mb-0 card-img rounded-${imageRadius}`} style={{width: 'inherit', maxHeight: '300px', height:height, minHeight:minHeight}}>
                <img onErrorCapture = {(e) => {e.target.src = imgArr2[0]/* '/images/bg/fallback-sm.jpg' */, e.target.srcset= {fallbackImgSrcSet}, console.log('error src', e.target.src)}} src={resizedImage(srcWithFallback(imgArr2[0], '/images/bg/fallback-sm.jpg'), 'medium_large')} className={`h-100 w-100 bg-cover pos-relative object-cover ${exImgClass} rounded-${imageRadius}`} style={{minHeight:minHeight, /* background: srcUrlWithFallback(resizedImage(imgArr2[0], 'medium_large'), '/images/bg/fallback-sm.jpg') */}}/>
                
                <div className="card-bottom px-2 d-flex justify-between align-items-center gap-2 flex-wrap-reverse img_content py-2" style={{gridTemplateColumns: 'auto 50px'}}>
                    <div className='_left'>
                    {/* <div className={`d-flex flex-row justify-between align-items-center`}>
                    <TermTag exTagClass={'rounded-3 px-2 text-13 fw-600'} exClass={'lgLine w-fit flex-shrink-1 minw-0'} term={category} type={'tag'} linkTax={'category'}/>
                    </div> */}
                    </div>
                    <div className='_right'>
                    <div className="row_flex justify-end" style={{flex: '1 1'}}>
                            <TermTag targetStyleObj={{width: '28px', height: '28px', borderRadius: '50%', lineHeight: '28px'}} exTagClass={'text-18 fw-600'} exClass={'lgLine w-fit'} term={category} type={'icon'} linkTax={'category'}/>
                            <i className={`far fa-${type == 'event' ? 'calendar-alt' : 'map-marked-alt'} text-center bg-theme-light`} style={{width: '28px', height: '28px', borderRadius: '50%', lineHeight: '28px'}}/>
                        </div>
                    </div>
                </div>
                {/* <div className="card-overlay bg-gradient opacity-90 rounded-0"/> */}
            </div>
            <div className={`pt-2 ${contentClass}`}>
                <div className="content mt-0 mb-1 mx-0">
                    <div className="_content gx-mb-0">
                    <Link href={`/${type}s/${slug}`} className="d-flex gap-2 mb-1">
                <div className="hide_if_empty">
                    {event_date && event_date[0] ? <DateView customDate={event_date[0].start} customEndDate={event_date[0].end} exClass='position-relative card_date outliney darky mb-2 me-2'/> : <></>}
                </div>
                <div className="minw-0 flex-shrink-1">
                    <h5 className="_title mb-0 font-16 text-capitalize font-700 truncate-2 lh-12">{cleanHtml(title.rendered).toLowerCase()}</h5>
                    <TermTag exTagClass={'rounded-3 text-14 opacity-50'} exClass={'lgLine w-fit flex-shrink-1 minw-0'} term={category} type={'hash'} linkTax={'category'}/>
                    {/* <Link href={`/${type}s/${slug}`}><h3 className={`smLine text-capitalize truncate fw-600 _title`}>{cleanHtml(title.rendered).toLowerCase()}</h3></Link> */}
                    {/* <div className="line-height-sm color-theme short_desc">
                        <p className="gx-text-grey _excerpt truncate-2" dangerouslySetInnerHTML={{__html: hashtag(short_desc)}}/>
                    </div> */}
                    <div className="title_meta d-flex  flex-column lh-11">
                        {/* <div className="pe-2"><span className="font-11 opacity-60 accordionfont-11 text-truncate">@{slug}</span></div> */}
                        {/* <div><span className="opacity-40 font-11">{dayjs(localiseDate(modified)).fromNow()}</span></div> */}
                        {/* {event_date && event_date[0] ? <DateViewDescriptive customEndDate={event_date[0].end} customDate={event_date[0].start}/> : <></>} */}
                        {/* <div className="pe-2"><span className="font-13 opacity-40 fw-400 accordionfont-11 text-truncate d-block">{tagline}</span></div> */}
                        {ticket_min_price_html && <PriceView  preText={'From'}  exClass={'_inline py-1'} priceHTml={ticket_min_price_html}/> }
                        
                    </div>
                </div>
                {/* <div className="ms-auto"><a href="#" data-menu="menu-controls" className="icon icon-xss d-block color-theme"><i className="fa fa-ellipsis-v"></i></a>
                </div> */}
            </Link>
                            {/* {ticket_min_price_html && <PriceView  preText={'From'}  exClass={'_inline'} priceHTml={ticket_min_price_html}/> } */}
                            {/* <div className="mb-2 line-height-sm color-theme opacity-80">
                                <p className="gx-text-grey _excerpt truncate-2 text-14" dangerouslySetInnerHTML={{__html: hashtag(short_desc)}}/>
                            </div> */}
                            <div className={`d-flex flex-wrap justify-start align-items-center gap-2 border-top-light pt-1 smLine`}>
                            {<ListingMetaMini page_likes={likes?.length ?? null}  page_views={page_views} ratings={rating}/>}
                            <ListingMeta location={locations?.length > 0 ? locations[0].name : null} duration={listing.duration}/>
                            </div>
                    </div>
                </div>
            </div> 
        </div>
        </>
    )
}

export default EventCard6;