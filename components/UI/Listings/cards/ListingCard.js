import { cleanHtml } from "@/helpers/universal";
import Link from "next/link";

function ListingCard({listing}) {
    let {id, title, short_desc, event_date, page_views, rating, acf, locations, level, ticket_min_price_html, xtra_large_thumb, gallery, slug} = listing;

    return <Link href={`/events/${slug}`} className="mx-3" /* data-menu="menu-reserve" */>
        <div className="listing_card card card-style me-0 mb-0" style={{backgroundImage:`url('${xtra_large_thumb}')`, height: '180px'}}>
        <div className="card-top p-2">
        <span className="color-black bg-theme px-2 py-1 rounded-xs font-11"><i className="fa fa-star color-yellow-dark pe-2"></i>{rating}</span>
        </div>
                        <div className="card-bottom p-2 px-2">
                            <h4 className="color-white line-height-s truncate-2">{cleanHtml(title?.rendered)}<br/> Islands</h4>
        <span className="color-white font-10 opacity-60"><i className="fa fa-map-marker pe-2"></i>{locations[0]?.name}</span>
            </div>
            <div className="card-overlay bg-gradient"></div>
        </div>
    </Link>
}
export default ListingCard