import { cleanHtml, hashtag, localiseDate, resizedImage, shuffleArray, srcWithFallback } from "@/helpers/universal";
import Link from "next/link";
import DateView from "../../partials/dateViews/DateView";
import Image from 'next/image';
import { ListingMetaMini, ListingMeta, SlickArrow } from "../../Partials";
import { PriceView } from "../../PriceView";
import TermTag from "../../partials/TermTag";
//import Slider from "react-slick";
//import { LoaderSiteLogo } from "@/components/skeletons/Loaders";
import { fallbackImgSrcSet } from '@/helpers/base';
//import DateViewDescriptive from './../../partials/dateViews/DateViewDescriptive';
import { openOffCanvas } from "@/helpers/appjs";

import dayjs from "dayjs";
var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)

const EventCard6 = ({listing, width=220, contentClass='px-1', minHeight=180, height='auto', exClass='', noButton=true, truncate=true, transparent=false, mini}) => {
    let {id, title, address, short_desc, category, event_date, page_views, rating, large_thumb, locations, level, ticket_min_price_html, xtra_large_thumb, gallery, slug, acf, _embedded,modified,tagline, type} = listing;
    const {likes} = acf?.community ?? {};

    const slicedGal = shuffleArray(gallery).slice(0, 5);
    //const imgArr = [xtra_large_thumb ?? large_thumb, ...slicedGal];
    const imgArr2 = shuffleArray([_embedded['wp:featuredmedia'][0].source_url, ...gallery]);

    return (<>
    <div data-aos='zoom-in' className={`card card-style m-0 event_card_2 ${exClass} ${transparent ? 'bgClear' : ''}`} style={{width: width}}>

    <div className="d-flex gap-2 activity_header mb-1">
              <div>
                  {/* <img src={user_avatar?.thumb} width={avatarSize} className="rounded-xl mt-1"/> */}
                  {event_date && event_date[0] ? <DateView customDate={event_date[0].start} customEndDate={event_date[0].end} exClass='position-relative card_date outliney darky mb-2 me-2'/> : <></>}
              </div>
                <div className="pe-3 minw-0 flex-shrink-1">
                    {/* <h5 className="_title mb-0 font-16 font-700">{cleanHtml(title.rendered)}</h5> */}
                    <Link href={`/events/${slug}`}><h3 className={`text-16 smLine text-capitalize ${truncate ? 'truncate' : 'truncate-2'}`}>{cleanHtml(title.rendered).toLowerCase()}</h3></Link>
                    <div className="title_meta d-flex  flex-column lh-11">
                        <div className="pe-2"><span className="font-12 opacity-60 accordionfont-11 text-truncate">{tagline}</span></div>
                        {/* <div className="pe-2"><span className="font-11 opacity-60 accordionfont-11 text-truncate">@{slug}</span></div> */}
                        <div><span className="opacity-40 font-11">{dayjs(localiseDate(modified)).fromNow()}</span></div>
                        
                    </div>
                </div>
                {/* <div className="ms-auto"><a href="#" data-menu="menu-controls" onClick={(e) => openOffCanvas(e)}className="icon icon-xss d-block color-theme"><i className="fa fa-ellipsis-v"></i></a>
                </div> */}
            </div>


            <div className="card position-relative shadow-l mb-0 card-img" style={{width: 'inherit', maxHeight: '300px', height:height, minHeight:minHeight}}>
                <img onErrorCapture = {(e) => {console.log('old src', e.target.src); e.target.src = '/images/bg/fallback-sm.jpg', e.target.srcset= {fallbackImgSrcSet}}} src={resizedImage(srcWithFallback(imgArr2[0]), 'medium_large')} fill={true} className={'pos-relative object-cover'} style={{minHeight:minHeight}}/>
                
                {/* <div className="card-bottom px-3 d-flex justify-between align-items-center gap-2 flex-wrap-reverse img_content py-2" style={{gridTemplateColumns: 'auto 50px'}}>
                    <div className='_left'>
                    <div className={`d-flex flex-row justify-between align-items-center`}>

                    </div>
                    </div>
                    <div className='_right'>
                    </div>
                </div>
                <div className="card-overlay bg-gradient opacity-90 rounded-0"></div> */}
            </div>
            <div className={`pt-2 ${contentClass}`}>
            <div className="content mt-0 mb-1 mx-0">
            {/* {locations?.length > 0 ?  <span className="opacity-50 d-block pt-1 font-11">{locations[0].name}</span> : null} */}
                                            
                                            <div className="_content gx-mb-0">
                                            <div className="row_flex justify-between mb-2 gap-3">
                                              <TermTag exTagClass={'rounded-3 px-2 text-13 fw-600'} exClass={'lgLine w-fit flex-shrink-1 minw-0'} term={category} type={'tag'} linkTax={'category'}/>
                                              <div className="row_flex justify-end" style={{flex: '1 1'}}>
                                                  <TermTag targetStyleObj={{width: '28px', height: '28px', borderRadius: '50%', lineHeight: '28px'}} exTagClass={'rounded-3 px-2 text-20 fw-600'} exClass={'lgLine w-fit'} term={category} type={'icon'} linkTax={'category'}/>
                                                  {type == 'event' ?  <i className="far fa-calendar text-center bg-theme-light" style={{width: '28px', height: '28px', borderRadius: '50%', lineHeight: '28px'}}/> : null}
                                              </div>
                                            </div>
                                            {ticket_min_price_html && <PriceView /* currencyClass='color-white' */ preText={'From'}  exClass={'_inline'} priceHTml={ticket_min_price_html}/> }
                                            <div className="mb-2 line-height-sm color-theme text-">
                                            <p className="gx-text-grey _excerpt truncate-2 text-13" dangerouslySetInnerHTML={{__html: hashtag(short_desc)}}/>
                                              </div>
                                              <div className={`d-flex flex-wrap justify-start align-items-center gap-2 border-top-light pt-1 smLine`}>
                        {<ListingMetaMini filled page_likes={likes?.length ?? null}  page_views={page_views} ratings={rating}/>}
                        <ListingMeta filled location={locations?.length > 0 ? locations[0].name : null} duration={listing.duration}/>
                        </div>
                                        </div>
                                        </div>
                  </div> 
        </div>
        </>
    )
}

export default EventCard6;