import { cleanHtml } from "@/helpers/universal";
import Link from "next/link";
import DateView from "../../partials/dateViews/DateView";
import DateViewString from "../../partials/dateViews/DateViewString";

const EventCard2 = ({listing, width=220, height=180, exClass='', noButton}) => {
    let {id, title, address, short_desc, event_date, page_views, rating, large_thumb, locations, level, ticket_min_price_html, xtra_large_thumb, gallery, slug} = listing;
    return (<>
    <div className={`card card-style m-0 event_card_2 ${exClass}`} style={{width: width}}>
            <div className="card shadow-l mb-0 bg-18" style={{width: 'inherit', height:height, backgroundImage: `url('${xtra_large_thumb ?? large_thumb}')`}}>
                <div className="card-bottom px-3 row_flex justify-between align-items-end">
                    <div className='_left'>
                    {event_date[0]?.start ? <p className="color-white font-12 opacity-80 truncate mb-1"><i className="color-highlight far fa-calendar"></i> <DateViewString date={event_date[0].start} format={'MMMM D'}/> <i className="color-highlight ms-3 far fa-clock"></i> <DateViewString date={event_date[0].start} format={'hh:mm A'}/> </p> : <></>}
                    {locations?.length > 0 ? <p className="color-white font-12 opacity-80 mb-2"><i className="color-highlight fa fa-map-marker-alt"></i> {locations[0].name}</p> : <></>}
                    </div>
                    <div className='_right'>
                    {event_date && event_date[0] ? <DateView customDate={event_date[0].start} customEndDate={event_date[0].end} exClass='position-relative card_date outliney border-light mb-2'/> : <></>}
                    </div>
                </div>
                <div className="card-overlay bg-gradient opacity-90 rounded-0"></div>
            </div>  
            <div className="d-flex flex-row flex-nowrap m-3 mb-1 align-items-center gap-2 justify-between">
                <div className="">
                <Link href={`/events/${slug}`}><h3 className="truncate-2 text-15">{cleanHtml(title.rendered)}</h3></Link>
                    <p className="truncate font-11 mb-2 pb-1"><i className="fa fa-map-marker-alt me-2"></i>{address?.length > 0 ? address : locations?.length > 0 ? locations[0].name : ''}</p>
                </div>
                {!noButton ? <></> : <Link className='text-nowrap h-fit btn btn-s bg-highlight rounded-xl shadow-xl text-uppercase font-900 font-10' href={`/events/${slug}`}>Learn More</Link>}
            </div>
        </div>
        </>
    )
}

export default EventCard2;