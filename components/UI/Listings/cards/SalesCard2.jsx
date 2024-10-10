import { cleanHtml, randomEither } from "@/helpers/universal";
import Link from "next/link";
//import PostLike from "../../partials/social/PostLike";
//import DateViewString from "../../partials/dateViews/DateViewString";
//import { PriceView } from "../../PriceView";
import TermTag from "../../partials/TermTag";
import { siteMasks } from '@/helpers/base';
//import { ListingMeta, ListingMetaMini } from "../../Partials";

const SalesCard2 = ({listing, width=320, dataAos, height='auto', exClass='', truncate=2, contentExClass='', titleSize=20}) => {
    let {id, title, address, max_discount, short_desc, event_date, page_views, rating, acf, locations, level, ticket_min_price_html, xtra_large_thumb, gallery, slug, type, category} = listing ?? {};
    const {likes} = acf?.community ?? {};
    return (<>
                    <div data-aos={dataAos} className={`listing_card bg-theme justify-center card card-style sale_card card_2 position-relative rounded-0 ${exClass}`}>
                            <div className="sale_content bg-theme-transparent position-relative z-2 shadow" style={{height: height, width: width}}>
                                <div className="d-grid overflow-hidden px-0 content_box h-100">
                                    <img className={`h-100 masked mask-${randomEither(siteMasks)}`} src={xtra_large_thumb}/>
                        <div className={`d-flex flex-column p-2 ps-4 pe-2 _content bg-cover ${contentExClass}`}>

                            <div className="title_content mb-2">
                            <Link href={`/${type}s/${slug}`}className={`color-theme smLine mb-2 font-${titleSize} font-800 truncate`}>{cleanHtml(title.rendered)}</Link>
                            <div><p className={`smLine font-15 mb-0 opacity-70 truncate-${truncate}`}>{cleanHtml(short_desc)}</p></div>
                            </div>
                            <div className='align-items-center mb-1'>
                            <TermTag exTagClass={'rounded-3 text-11 fw-600 color-highlight'} exClass={'lgLine w-fit flex-shrink-1 minw-0'} term={category} type={'hash'} linkTax={'category'}/>
                            {/* {ticket_min_price_html && <PriceView preText={''}  exClass={'_inline'} priceHTml={ticket_min_price_html}/> } */}
                            {/* <div className="row_flex align-items-end gap-1">
                                <PostLike style={{width: 28, height:28, lineHeight: '28px'}} exClass={'w-fit text-center bg-theme-transparent-0 rounded'} listing={listing?.id}/>
                                <i className={`far fa-tags rounded text-center bg-theme-light`} style={{width: '28px', height: '28px',  lineHeight: '28px'}}/>
                            </div> */}
                            
                            </div>
                            {/* <div className={`_meta_row d-flex flex-nowrap justify-start align-items-center gap-2 border-top-light border-alt pt-1 smLine`}>
                                {<ListingMetaMini page_likes={likes?.length ?? null}  page_views={page_views} ratings={rating}/>}
                                <ListingMeta location={locations?.length > 0 ? locations[0].name : null} duration={listing.duration}/>
                            </div> */}
                            {max_discount && <div className='discount_label' data-aos='fade-right'>
                            <div className="label_content">
                            {/* <span className='pre_num'>Up to </span> */}
                            <span className="discount_num">{max_discount}<span className="label opacity-50">%</span></span>
                            <span className='post_num'>Off</span>
                            </div>
                            </div>
                            }
                            
                        </div>
                        
                                </div>
                            </div>
                    </div>
        </>
    )
}

export default SalesCard2;