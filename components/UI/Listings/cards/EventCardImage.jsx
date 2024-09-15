import { cleanHtml, shuffleArray, srcWithFallback } from "@/helpers/universal";
import Link from "next/link";
import DateView from "../../partials/dateViews/DateView";
import Image from 'next/image';
import { ListingMetaMini, ListingMeta, SlickArrow } from "../../Partials";
import { PriceView } from "../../PriceView";
import TermTag from "../../partials/TermTag";
//import Slider from "react-slick";
//import { LoaderSiteLogo } from "@/components/skeletons/Loaders";
import { fallbackImgSrcSet } from '@/helpers/base';
import DateViewDescriptive from './../../partials/dateViews/DateViewDescriptive';

const EventCardImage = ({listing, width= 'fit-content', contentClass='px-2', minHeight=130,maxHeight= '300px', height='auto', exClass='', noButton=true, truncate=true, transparent=false, mini, styleObj={}}) => {
    let {id, title, address, short_desc, category, event_date, page_views, rating, large_thumb, locations, level, ticket_min_price_html, xtra_large_thumb, gallery, slug, acf, type} = listing;
    const {likes} = acf?.community ?? {};

    const slicedGal = shuffleArray(gallery).slice(0, 5);
    //const imgArr = [xtra_large_thumb ?? large_thumb, ...slicedGal];
    const imgArr2 = shuffleArray([xtra_large_thumb ?? large_thumb, ...gallery]);
    return (<>
    <div data-aos='zoom-in' className={`listing_card hover_reveal card card-style m-0 event_card_2 ${exClass} ${transparent ? 'bgClear' : ''}`} style={{width: width, ...styleObj}}>
            <div className="w-100 card position-relative shadow-l mb-0 card-img" style={{width: 'inherit', maxHeight: '300px', height:height, minHeight:minHeight}}>
                <Image unoptimized onErrorCapture = {(e) => {e.target.src = '/images/bg/fallback-sm.jpg', e.target.srcset= {fallbackImgSrcSet}}} src={srcWithFallback(imgArr2[0])} fill={true} className={'pos-relative object-cover'} style={{maxHeight: maxHeight,minHeight:minHeight}}/>
                {/* <Slider
                  focusOnSelect
                  autoplay
                  swipe={false}
                  touchMove={true}
                  autoplaySpeed={6000}
                  fade
                  pauseOnHover
                    {...itemSettings}
                    arrows={true}
                    nextArrow={<SlickArrow type="next" />}
                    prevArrow={<SlickArrow type="prev" />}
                  >
                    {imgArr?.map((slide, i) => (
                      <div className="cardImage ratio ratio-4:3" key={i}>
                        <div className="cardImage__content ">
                          <img
                          quality={90}
                            width={width}
                            height={height}
                            //className="col-12 js-lazy"
                            placeholder={<LoaderSiteLogo/>}
                            src={slide}
                            onError={(e) => {e.target.src = '/images/bg/fallback-sm.jpg'}}
                            alt="image"
                          />
                        </div>
                      </div>
                    ))}
                  </Slider> */}
                {/* <div className="show_on_hover card-bottom px-3 d-flex justify-between align-items-center gap-2 flex-wrap-reverse img_content py-2" style={{gridTemplateColumns: 'auto 50px'}}>
                    <div className='_left'>
                    <div className={`d-flex flex-row justify-between align-items-center`}>

                    </div>
                    {ticket_min_price_html && <PriceView currencyClass='color-white' preText={''}  exClass={'_inline white-currency'} priceHTml={ticket_min_price_html}/> }
                    {<TermTag exTagClass={'rounded-3 px-2 text-12'} exClass={'lgLine'} term={category} type={'tag'} linkTax={'category'}/>}
                    </div>
                    <div className='_right'>
                    </div>
                </div> */}
                <div className="show_on_reveal align-items-end card-overlay bg-gradient opacity-90 rounded-0 p-2 p-sm-3 color-white">
                <div style={{minWidth:0, flexShrink: 1, flexGrow: 1}}>
                        <Link href={`/${type}s/${slug}`}><h3 className={`text-16 color-white mb-1 smLine ${truncate ? 'truncate' : 'truncate-2'}`}>{cleanHtml(title.rendered)}</h3></Link>
                        {event_date && event_date[0] ? <DateViewDescriptive customDate={event_date[0].start} customEndDate={event_date[0].end} exClass='position-relative text-truncate d-block'/> : <></>}
                        {mini ? <></> : <p className="card_desc truncate-2 mb-1 text-14 opacity-80">{short_desc}</p>}
                        {/* <div className={`d-flex flex-wrap justify-start align-items-center gap-2 border-top-light pt-1 smLine`}>
                        {<ListingMetaMini filled page_likes={likes?.length ?? null}  page_views={page_views} ratings={rating}/>}
                        <ListingMeta filled location={locations?.length > 0 ? locations[0].name : null} duration={listing.duration}/>
                        </div> */}
                        </div>
                </div>
            </div>
            <div className={`d-none py-2 row_flex ${contentClass}`}>
                    <div style={{minWidth:0, flexShrink: 1, flexGrow: 1}}>
                        <Link href={`/${type}s/${slug}`}><h3 className={`text-16 mb-1 smLine ${truncate ? 'truncate' : 'truncate-2'}`}>{cleanHtml(title.rendered)}</h3></Link>
                        {event_date && event_date[0] ? <DateViewDescriptive customDate={event_date[0].start} customEndDate={event_date[0].end} exClass='position-relative'/> : <></>}
                        {mini ? <></> : <p className="card_desc truncate-2 mb-1 text-14 opacity-80">{short_desc}</p>}
                        <div className={`d-flex flex-wrap justify-start align-items-center gap-2 border-top-light pt-1 smLine`}>
                        {<ListingMetaMini filled page_likes={likes?.length ?? null}  page_views={page_views} ratings={rating}/>}
                        <ListingMeta filled location={locations?.length > 0 ? locations[0].name : null} duration={listing.duration}/>
                        </div>
                        </div>
                  </div>  
        </div>
        </>
    )
}

export default EventCardImage;