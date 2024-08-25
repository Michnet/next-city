import RatingView from "@/components/listing/reviews/RatingView";
import { cleanHtml } from "@/helpers/universal";
import Link from "next/link";
import DateViewDescriptive from "../../partials/dateViews/DateViewDescriptive";
import { PriceView } from "../../PriceView";

function ListingCard3({listing, exClass, imgHeight=130}) {
    let {id, title, short_desc, type,event_date, page_views, rating, acf, locations, level, ticket_min_price_html, xtra_large_thumb, gallery, slug} = listing;
    return  <Link href={`/${type}s/${slug}`}  className="listing_card card card-style m-0">
                      <div className="card-top m-2">
                      {ticket_min_price_html ?  <span className="bg-theme color-black font-11 px-2 py-1 font-700 rounded-xs shadow-xxl"><PriceView preText={''}  exClass={'_inline color-highlight'} priceHTml={ticket_min_price_html}/></span> : <></>}
                      </div>
                      <img src={xtra_large_thumb} alt="img" width="100" className="img-fluid" style={{height:imgHeight, objectFit: 'cover'}}/>
                      <div className="p-2">
                        <h4 className="mb-0 truncate text-14">{cleanHtml(title?.rendered)}</h4>
                        <p className="mb-0 font-11 mt-n1 mb-n1 opacity-70"><i className="fas fa-map-marker-alt pe-2"></i>{locations[0]?.name}</p>
                        <div className="d-flex flex-row flex-nowrap justify-between font-12">
                        <span className="font-400 font-11 color-yellow-dark">
                          {event_date && event_date[0] ? <DateViewDescriptive customEndDate={event_date[0].end} customDate={event_date[0].start}/> : <></>}
                        </span>
                        </div>
                      </div>
                    </Link>
}
export default ListingCard3