import { cleanHtml } from "@/helpers/universal";
import Link from "next/link";
//import DateViewString from "../../partials/dateViews/DateViewString";
import { PriceView } from "../../PriceView";


const EventCard3 = ({listing, width=320, height=260, exClass=''}) => {
    let {id, title, address, short_desc, event_date, page_views, rating, acf, locations, level, ticket_min_price_html, xtra_large_thumb, gallery, slug} = listing;
    return (<>
                    <div className={`card card-style event_card_3 ${exClass}`} style={{backgroundImage:`url("${xtra_large_thumb}")`, height: height, width: width}}>
                            <div className="card-top p-3">
                                <Link href={`/events/${slug}`} className="btn btn-s bg-theme color-black rounded-s scale-box font-700 text-uppercase float-end">Get Offer</Link>
                            </div>
                            <div className="card-bottom m-2">
                                <div className="d-block px-2 py-2 rounded-m">
                        <div className="d-flex">
                            <div className="pe-3">
                            <Link href={`/events/${slug}`}><h1 className="color-white font-23 font-800">{cleanHtml(title.rendered)}</h1></Link>
                            <div><p className="color-white font-13 mb-0 opacity-70 truncate-4">{cleanHtml(short_desc)}</p></div>
                            </div>
                            <div className="w-50 align-self-center text-end ms-auto">
                            <h1 className="color-white">{ticket_min_price_html && <PriceView preText={''}  exClass={'_inline'} priceHTml={ticket_min_price_html}/> }</h1>
                            {/* <p className="color-white mb-0 mt-n2 font-9 line-height-xs">
                                All Expenses Paid
                            </p> */}
                            </div>
                        </div>
                                </div>
                            </div>
                            <div className="card-overlay bg-gradient"></div>
                    </div>
        </>
    )
}

export default EventCard3;