import { cleanHtml } from "@/helpers/universal";
import Link from "next/link";
import PostLike from "../../partials/social/PostLike";
//import DateViewString from "../../partials/dateViews/DateViewString";
import { PriceView } from "../../PriceView";
import TermTag from "../../partials/TermTag";
import { ListingMeta, ListingMetaMini } from "../../Partials";

const SalesCard = ({listing, width=320, dataAos, height=260, exClass='', truncate=3, contentExClass='', titleSize=18}) => {
    let {id, title, address, short_desc, event_date, page_views, rating, acf, locations, level, ticket_min_price_html, xtra_large_thumb, gallery, slug, type, category} = listing ?? {};
    const {likes} = acf?.community ?? {};
    return (<>
                    <div data-aos={dataAos} className={`listing_card justify-center card card-style sale_card_3 position-relative ${exClass}`} style={{height: height, width: width}}>
                    <div className={`img_div bg-cover position-absolute top-0 left-0 w-50 h-100`} style={{backgroundImage:`url("${xtra_large_thumb}")`}}>
                    {/* <div className="card-top p-3 flex-column d-flex align-items-end gap-1">
                                <PostLike style={{width: 28, height:28, lineHeight: '28px'}} exClass={'w-fit text-center bg-theme-transparent-0 rounded'} listing={listing?.id}/>
                                <i className={`far fa-${type == 'event' ? 'calendar-alt' : 'map-marked-alt'} rounded text-center bg-theme-light`} style={{width: '28px', height: '28px',  lineHeight: '28px'}}/>
                            </div> */}
                    </div>
                           <div className=''>
                            <div className="sale_content bg-theme position-relative z-2 w-50 ms-auto me-3 shadow">
                                <div className="d-block px-2 rounded-m">
                        <div className={`d-flex flex-column _content ${contentExClass}`}>
                            <div className="pe-3 title_content mb-1">
                            
                            <Link href={`/${type}s/${slug}`}><h1 className={`smLine font-${titleSize} font-800 truncate-${truncate - 1}`}>{cleanHtml(title.rendered)}</h1></Link>
                            <div><p className={`smLine font-13 mb-0 opacity-70 truncate-${truncate}`}>{cleanHtml(short_desc)}</p></div>
                            </div>
                            <div className='align-items-center mb-1'>
                            <TermTag exTagClass={'rounded-3 text-11 fw-600'} exClass={'lgLine w-fit flex-shrink-1 minw-0'} term={category} type={'hash'} linkTax={'category'}/>
                            {ticket_min_price_html && <PriceView preText={''}  exClass={'_inline'} priceHTml={ticket_min_price_html}/> }
                            <div className="row_flex align-items-end gap-1">
                                <PostLike style={{width: 28, height:28, lineHeight: '28px'}} exClass={'w-fit text-center bg-theme-transparent-0 rounded'} listing={listing?.id}/>
                                <i className={`far fa-${type == 'event' ? 'calendar-alt' : 'map-marked-alt'} rounded text-center bg-theme-light`} style={{width: '28px', height: '28px',  lineHeight: '28px'}}/>
                            </div>
                            
                            </div>
                            {/* <div className={`_meta_row d-flex flex-nowrap justify-start align-items-center gap-2 border-top-light border-alt pt-1 smLine`}>
                                {<ListingMetaMini page_likes={likes?.length ?? null}  page_views={page_views} ratings={rating}/>}
                                <ListingMeta location={locations?.length > 0 ? locations[0].name : null} duration={listing.duration}/>
                            </div> */}
                        </div>
                                </div>
                            </div>
                            </div>
                           {/*  <div className="card-overlay bg-gradient opacity-75"></div> */}
                    </div>
        </>
    )
}

export default SalesCard;