import { cleanHtml } from "@/helpers/universal";
import Link from "next/link";

const EventCard = ({listing, width=200}) => {
    let {id, title, short_desc, event_date, page_views, rating, acf, locations, level, ticket_min_price_html, xtra_large_thumb, gallery, slug} = listing;
    return (
        <div className="content">
            <div className="bg-theme rounded-sm mb-n5 ms-3 overflow-hidden under-slider-btn d-inline-block shadow-l text-center">
                <span className="bg-red-dark font-10 d-block mb-2 px-3 line-height-xs py-1">AUG</span>
                <span className="font-20 font-800 d-block mb-n3 line-height-s">28</span><br/>
            </div>
            <a href="#" className="card card-style mx-0 bg-3 mb-0" style={{width: width, height: 250, backgroundImage: `url('${xtra_large_thumb}')`}}>
                <div className="card-top m-3">
                    <span className="btn btn-sm bg-theme text-uppercase float-end rounded-sm font-800">Join</span>
                </div>
                <div className="card-bottom p-3">
                    <span className="badge mb-2 mt-n2 font-11 color-white bg-red-dark text-uppercase font-600">10:30 AM at Jake's Place - Open</span>
                    <Link href={`/events/${slug}`}><h1 className="color-white font-30">{cleanHtml(title.rendered)}</h1></Link>
                    <p className="pe-5 me-5 color-white opacity-60">
                        Come and taste the awesome pies we've made and give your vote on who should be crowned king!
                    </p>
                </div>
                <div className="card-bottom p-3 mb-1">
                    <div className="float-end">
                        <img src="/images/avatars/1s.png" className="border border-white bg-yellow-light rounded-circle me-n3" width="25"/>
                        <img src="/images/avatars/5s.png" className="border border-white bg-highlight rounded-circle me-n3" width="25"/>
                        <img src="/images/avatars/6s.png" className="border border-white bg-pink-dark rounded-circle me-n3" width="25"/>
                        <img src="/images/avatars/5s.png" className="border border-white bg-highlight rounded-circle" width="25"/>
                    </div>
                </div>
                <div className="card-overlay bg-gradient"></div>
            </a>
        </div>
    )
}

export default EventCard;