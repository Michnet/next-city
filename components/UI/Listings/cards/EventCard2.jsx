import { cleanHtml } from "@/helpers/universal";
import Link from "next/link";
import DateView from "../../partials/dateViews/DateView";
import DateViewString from "../../partials/dateViews/DateViewString";
import Image from 'next/image';
import { ListingMetaMini, ListingMeta } from "../../Partials";
import { PriceView } from "../../PriceView";
import TermTag from "../../partials/TermTag";

const EventCard2 = ({listing, width=220, minHeight=180, height='auto', exClass='', noButton=true, truncate=true, transparent=false}) => {
    let {id, title, address, short_desc, category, event_date, page_views, rating, large_thumb, locations, level, ticket_min_price_html, xtra_large_thumb, gallery, slug, acf} = listing;
    const {likes} = acf?.community ?? {};
    console.log('card2', listing);
    return (<>
    <div className={`card card-style m-0 event_card_2 ${exClass} ${transparent ? 'bgClear' : ''}`} style={{width: width}}>
            <div className="card position-relative shadow-l mb-0 card-img" style={{width: 'inherit', height:height, minHeight:minHeight}}>
                <Image src={xtra_large_thumb ?? large_thumb} fill={true} className={'pos-relative object-cover'} style={{minHeight:minHeight}}/>
                <div className="card-bottom px-3 d-flex justify-between align-items-end gap-2 img_content" style={{gridTemplateColumns: 'auto 50px'}}>
                    <div className='_left pb-10'>
                    {/* {event_date[0]?.start ? <p className="color-white font-12 opacity-80 truncate mb-2"><i className="color-highlight far fa-calendar"></i> <DateViewString date={event_date[0].start} format={'MMMM D'}/> <i className="color-highlight ms-3 far fa-clock"></i> <DateViewString date={event_date[0].start} format={'hh:mm A'}/> </p> : <></>} */}
                    {/* {locations?.length > 0 ? <p className="color-white font-12 opacity-80 mb-2"><i className="color-highlight fa fa-map-marker-alt"></i> {locations[0].name}</p> : <></>} */}
                    <div className={`d-flex flex-row justify-between align-items-center`}>{ticket_min_price_html && <PriceView currencyClass='color-white' preText={''}  exClass={'_inline white-currency'} priceHTml={ticket_min_price_html}/> }</div>
                    {<TermTag exTagClass={'rounded-3 px-2'} term={category} type={'tag'} linkTax={'category'}/>}
                    </div>
                    <div className='_right'>
                    {event_date && event_date[0] ? <DateView customDate={event_date[0].start} customEndDate={event_date[0].end} exClass='position-relative card_date outliney  mb-2'/> : <></>}
                    </div>
                </div>
                <div className="card-overlay bg-gradient opacity-90 rounded-0"></div>
            </div>
            <div className="flex-grow-1 py-2 px-3">
                    <Link href={`/events/${slug}`}><h3 className={`text-18 mb-1 ${truncate ? 'truncate' : 'truncate-2'}`}>{cleanHtml(title.rendered)}</h3></Link>
                    
                    {/* <p className="card_desc truncate-2 mb-1">{short_desc}</p> */}
                    <div className={`d-flex flex-wrap justify-start align-items-center gap-2 border-top-light pt-1`}>
                      {<ListingMetaMini filled page_likes={likes?.length ?? null}  page_views={page_views} ratings={rating}/>}
                      <ListingMeta filled location={locations?.length > 0 ? locations[0].name : null} duration={listing.duration}/>
                    </div>
                    {/* <div className={`d-flex flex-row justify-between align-items-center`}>{ticket_min_price_html && <PriceView preText={''}  exClass={'_inline'} priceHTml={ticket_min_price_html}/> }</div> */}
                  </div>  
            {/* <div className="d-flex flex-row flex-nowrap m-2 ms-3 mb-1 align-items-center gap-2 justify-between">
                <div className="">
                <Link href={`/events/${slug}`}><h3 className={`text-15 ${truncate ? 'truncate' : 'truncate-2'}`}>{cleanHtml(title.rendered)}</h3></Link>
                    <p className="truncate font-11 mb-2 pb-1"><i className="fa fa-map-marker-alt me-2"></i>{address?.length > 0 ? address : locations?.length > 0 ? locations[0].name : ''}</p>
                </div>
                {noButton ? <></> : <Link className='text-nowrap h-fit btn bg-highlight rounded-xl shadow-xl text-uppercase p-2 font-900 font-10' href={`/events/${slug}`}>Learn More</Link>}
            </div> */}
        </div>
        </>
    )
}

export default EventCard2;