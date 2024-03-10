import { cleanHtml } from "@/helpers/universal";
import Link from "next/link";

function ListingCard2({listing}) {
    let {id, title, short_desc, event_date, page_views, rating, acf, locations, level, ticket_min_price_html, xtra_large_thumb, gallery, slug} = listing;

    return <div class="card card-style mx-3">
                {/* <img src="/images/grocery/isolated/3.png" class="img-fluid my-3"/> */}
                <div class="content">
                    <h3 class="mb-0">{cleanHtml(title.rendered)}</h3>
                    <a href="#">
                        <i class="fa fa-star color-yellow-dark font-10"></i>
                        <i class="fa fa-star color-yellow-dark font-10"></i>
                        <i class="fa fa-star color-yellow-dark font-10"></i>
                        <i class="fa fa-star color-yellow-dark font-10"></i>
                        <i class="fa fa-star color-yellow-dark font-10"></i>
                        <span class="font-11 ps-2 color-theme opacity-30">Based on 331 Reviews</span>
                    </a>
                    {short_desc ? <h5 class="font-13 font-600 opacity-50 pt-1 pb-2 truncate-5">
                        {short_desc}
                    </h5> : <></>}
                    <div class="divider mb-2"></div>
                    <div class="d-flex">
                        <div class="align-self-center">
                            <h1 class="mt-1 mb-n2 font-800">$5<sup class="font-400 font-14">.99</sup></h1>
                            <span class="opacity-60 font-11"><del>$9<sup>.99</sup></del> (- 40%)</span>
                        </div>
                        <div class="align-self-center ms-auto">
                            <a href="#" data-toast="snackbar-favorites" class="icon icon-s bg-theme rounded-l shadow-xl rounded-m ms-2 color-theme"><i class="fa fa-heart color-red-dark font-14"></i></a>
                            <a href="#" data-toast="snackbar-cart" class="icon icon-s bg-theme rounded-l shadow-xl rounded-m ms-2 color-theme"><i class="fa fa-shopping-bag font-14"></i></a>
                        </div>
                    </div>
                </div>
            </div>
}
export default ListingCard2