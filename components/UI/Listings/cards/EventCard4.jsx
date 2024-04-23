import { cleanHtml } from "@/helpers/universal";
import Link from "next/link";
import DateViewString from "../../partials/dateViews/DateViewString";

const EventCard4 = ({listing, width=260, height=200, exClass=''}) => {
    let {id, title, address, short_desc, event_date, page_views, rating, acf, locations, level, ticket_min_price_html, xtra_large_thumb, gallery, slug} = listing;
    return (<>
        <div className={`card card-style event_card_4 p-3 m-0 ${exClass}`} style={{width: width}}>
            <div className="d-flex align-items-center">
                <div>
                    <img src={xtra_large_thumb} className="object-cover rounded-sm me-3" width="70" height="70"/>
                </div>
                <div>
                {event_date && event_date[0] ? <span className="color-highlight font-300 d-block pt-0 text-uppercase font-10"><DateViewString date={event_date[0].start} format={'DD MMMM'}/></span> : <></>}
                    <Link href={`/events/${slug}`}><strong className="color-theme font-16 d-block mt-n2 truncate">{cleanHtml(title.rendered)}</strong></Link>
                    <span className="font-11 d-block mb-n1 color-theme opacity-30 lh-1"><i className="fa fa-map-marker pe-2"></i>{address?.length > 0 ? address : locations?.length > 0 ? locations[0].name : ''}</span>
                </div>
            </div>
        </div>
        </>
    )
}

export default EventCard4;