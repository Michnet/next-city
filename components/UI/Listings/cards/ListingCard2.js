import RatingView from "@/components/listing/reviews/RatingView";
import { cleanHtml } from "@/helpers/universal";
import Link from "next/link";
import { PriceView } from "../../PriceView";

function ListingCard2({listing, exClass}) {
    let {id, title, short_desc, event_date, page_views, rating, acf, locations, level, ticket_min_price_html, xtra_large_thumb, gallery, slug} = listing;

    return <div className={`card card-style ${exClass ?? ''}`}>
                {/* <img src="/images/grocery/isolated/3.png" className="img-fluid my-3"/> */}
                <div className="content">
                    <h3 className="mb-0">{cleanHtml(title.rendered)}</h3>
                    <a href="#">
                        <RatingView rating={rating} id={id}/>
                        <span className="font-11 ps-2 color-theme opacity-30">Based on 331 Reviews</span>
                    </a>
                    {short_desc ? <h5 className="font-13 font-600 opacity-75 pt-1 pb-2 truncate-5">
                        {short_desc}
                    </h5> : <></>}
                    <div className="divider mb-2"></div>
                    <div className="d-flex">
                        <div className="align-self-center">
                            {ticket_min_price_html && <PriceView preText={''}  exClass={'_inline'} priceHTml={ticket_min_price_html}/> }
                        </div>
                        <div className="align-self-center ms-auto">
                            <a href="#" data-toast="snackbar-favorites" className="icon icon-s bg-theme rounded-l shadow-xl rounded-m ms-2 color-theme"><i className="fa fa-heart color-red-dark font-14"></i></a>
                            <a href="#" data-toast="snackbar-cart" className="icon icon-s bg-theme rounded-l shadow-xl rounded-m ms-2 color-theme"><i className="fa fa-shopping-bag font-14"></i></a>
                        </div>
                    </div>
                </div>
            </div>
}
export default ListingCard2