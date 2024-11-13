import { cleanHtml, hashtag, randomEither } from "@/helpers/universal";
import Link from "next/link";
import PostLike from "../../partials/social/PostLike";
//import DateViewString from "../../partials/dateViews/DateViewString";
import { PriceView } from "../../PriceView";
import TermTag from "../../partials/TermTag";
import { ListingMeta, ListingMetaMini } from "../../Partials";

const EventCard3 = ({listing, width=320, cardBottomExClass='bg-gradient', withDesc= false, dataAos, height='auto', exClass='', truncate=3, contentExClass='', titleSize=20}) => {
    let {id, title, address, short_desc, event_date, page_views, rating, acf, locations, level, ticket_min_price_html, xtra_large_thumb, gallery, slug, type, category} = listing ?? {};
    const {likes} = acf?.community ?? {};
    return (<>
                    <div data-aos={dataAos} className={`listing_card card card-style event_card_3 position-relative ${exClass}`} style={{width: width}}>
                    {/* <div className={`img_div bg-cover position-absolute top-0 left-0 w-100 h-100`} style={{backgroundImage:`url("${xtra_large_thumb}")`}}/> */}
                    <img className={`img_img bg-cover  top-0 left-0`} style={{width: '100%', height: height}} src = {randomEither([xtra_large_thumb, ...gallery])}/>
                            <div className="card-top p-3 flex-column d-flex align-items-end gap-1">
                                {/* <Link href={`/events/${slug}`} className="btn btn-s bg-theme color-theme rounded-s scale-box font-700 text-uppercase float-end">Learn More</Link> */}
                                <PostLike style={{width: 28, height:28, lineHeight: '28px'}} exClass={'w-fit text-center bg-theme-transparent-0 rounded'} listing={listing?.id}/>
                                <i className={`far fa-${type == 'event' ? 'calendar-alt' : 'map-marked-alt'} rounded text-center bg-theme-light`} style={{width: '28px', height: '28px',  lineHeight: '28px'}}/>
                            </div>
                            <div className={`card-bottom p-2 pt-5 ${cardBottomExClass}`}>
                                <div className="d-block px-2 rounded-m">
                        <div className={`d-flex flex-column _content ${contentExClass}`}>
                            <div className="pe-3 title_content mb-1">
                            
                            <Link href={`/${type}s/${slug}`}><h1 className={`lh-1 color-white font-${titleSize} font-800 truncate-${truncate - 1}`}>{cleanHtml(title.rendered)}</h1>
                            {withDesc && <div>
                                <p className={`font-15 fw-500 mb-0 opacity-80 truncate-${truncate}`}  dangerouslySetInnerHTML={{__html: hashtag(cleanHtml(short_desc))}}/></div>}
                            </Link>
                            <div className='mb-1'>
                            <TermTag exTagClass={'rounded-3 text-14 color-white fw-300 mt-1'} exClass={'w-fit flex-shrink-1 minw-0'} term={category} type={'hash'} linkTax={'category'}/>
                            {/* {ticket_min_price_html && <PriceView preText={''}  exClass={'_inline'} priceHTml={ticket_min_price_html}/> } */}
                            </div>
                            </div>
                            
                            <div className={`_meta_row d-flex flex-nowrap justify-start align-items-center gap-2 border-top-light border-alt pt-1 smLine color-white`}>
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

export default EventCard3;