import { cleanHtml } from "@/helpers/universal";
import Link from "next/link";
import DateViewString from "../../partials/dateViews/DateViewString";

const EventCard2 = ({listing, width=260, height=200, exClass=''}) => {
    let {id, title, address, short_desc, event_date, page_views, rating, large_thumb, locations, level, ticket_min_price_html, xtra_large_thumb, gallery, slug} = listing;
    return (<>
    <div className={`card card-style m-0 ${exClass}`} style={{width: width}}>
            <div className="card shadow-l mb-0 bg-18" style={{width: 'inherit', height:height, backgroundImage: `url('${xtra_large_thumb ?? large_thumb}')`}}>
                <div className="card-bottom ms-3">
                    {event_date[0]?.start ? <p className="color-white font-10 opacity-80 mb-n1"><i className="color-highlight far fa-calendar"></i> <DateViewString date={event_date[0].start} format={'MMMM D'}/> <i className="color-highlight ms-3 far fa-clock"></i> <DateViewString date={event_date[0].start} format={'hh:mm A'}/> </p> : <></>}
                    {locations?.length > 0 ? <p className="color-white font-10 opacity-80 mb-2"><i className="color-highlight fa fa-map-marker-alt"></i> {locations[0].name}</p> : <></>}
                </div>
                <div className="card-overlay bg-gradient opacity-90 rounded-0"></div>
            </div>  
            <div className="d-flex flex-row flex-nowrap m-3 align-items-center gap-2">
                <div className="">
                <Link href={`/events/${slug}`}><h3 className="truncate-2 text-15">{cleanHtml(title.rendered)}</h3></Link>
                    <p className="truncate font-11 mb-2 pb-1"><i className="fa fa-map-marker-alt me-2"></i>{address?.length > 0 ? address : locations?.length > 0 ? locations[0].name : ''}</p>
                </div>
                <Link className='text-nowrap h-fit btn btn-s bg-highlight rounded-xl shadow-xl text-uppercase font-900 font-10' href={`/events/${slug}`}>Learn More</Link>
            </div>
        </div>
        </>
    )
}

export default EventCard2;