import RatingView from "@/components/listing/reviews/RatingView";
import { cleanHtml } from "@/helpers/universal";
import Link from "next/link";
import { PriceView } from "../../PriceView";

function ListingCard3({listing, exClass}) {
    let {id, title, short_desc, event_date, page_views, rating, acf, locations, level, ticket_min_price_html, xtra_large_thumb, gallery, slug} = listing;
    return <div className="md-sticky col-12 p-0 col-sm-6 col-md-12" key={id}>
                    <Link href={`/events/${slug}`}  className="card card-style mx-0 mb-3">
                      <div className="card-top m-2">
                        <span className="bg-white color-black font-11 px-2 py-1 font-700 rounded-xs shadow-xxl">25% OFF</span>
                      </div>
                      <img src={xtra_large_thumb} alt="img" width="100" className="img-fluid" style={{height: '160px', objectFit: 'cover'}}/>
                      <div className="p-2">
                        <h4 className="mb-0 truncate text-14">{cleanHtml(title?.rendered)}</h4>
                        <p className="mb-0 font-11 mt-n1 mb-n1 opacity-70"><i className="fa fa-map-marker pe-2"></i>{locations[0]?.name}</p>
                        <div className="d-flex flex-row flex-nowrap justify-between font-12">{ticket_min_price_html && <PriceView preText={''}  exClass={'_inline color-highlight'} priceHTml={ticket_min_price_html}/> }
                        <span className="float-end font-400 font-11 color-yellow-dark">5 Left</span>
                        </div>
                      </div>
                    </Link>
                  </div>
}
export default ListingCard3