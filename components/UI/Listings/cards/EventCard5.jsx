import { siteColors } from "@/helpers/base";
import { cleanHtml, randomEither } from "@/helpers/universal";
import Link from "next/link";
import { Avatar } from "../../Partials";
import DateViewString from "../../partials/dateViews/DateViewString";

const EventCard5 = ({listing, width=300, height=170, exClass=''}) => {
    let {id, title, address, short_desc, event_date, page_views, thumbnail, rating, large_thumb, locations, level, ticket_min_price_html, xtra_large_thumb, category, slug} = listing;
    const {color, name:catName} = category ?? {}
    const randColor = color ? null : randomEither(siteColors);
    return (<>
    <div className={`listing_card card card-style round-medium shadow-huge top-30 m-0 event_card_5 ${exClass}`} style={{width: width, height: height}}>
            
            <div className="card-top mt-3 mx-3">
                <div className='row_flex gap-2 mb-2 justify-between'>
                    <h2 className="color-white pt-0 pb-3 truncate-2 smLine">{cleanHtml(title.rendered)}</h2>
                    <Avatar exClass='mt-1' rounded width={35} src={thumbnail}/>
                </div>
                {event_date[0]?.start ? <p className="color-white font-11 opacity-80 mb-n1">
                    <i className="far fa-calendar"></i> <DateViewString date={event_date[0].start} format={'MMMM D'}/> 
                <i className="ms-4 far fa-clock"></i> <DateViewString date={event_date[0].start} format={'hh:mm A'}/>
                </p> : <></>}
                <p className="color-white font-12 opacity-80"><i className="fa fa-map-marker-alt"></i> {address?.length > 0 ? address : locations?.length > 0 ? locations[0].name : ''}</p>
            </div>
            
            {/* <div className="card-bottom pb-3 pe-4">
                <div className="float-end">
                    <h4 className="font-12 color-white font-400 opacity-50">John, and 143 more are attending</h4>
                    <img className="shadow-xl rounded-xl preload-img float-end" width="40" src="images/empty.png" data-src="images/pictures/faces/1s.png"/>
                    <img className="shadow-xl rounded-xl preload-img float-end" width="40" src="images/empty.png" data-src="images/pictures/faces/2s.png"/>
                    <img className="shadow-xl rounded-xl preload-img float-end" width="40" src="images/empty.png" data-src="images/pictures/faces/3s.png"/>
                </div>
            </div> */}
            <div className="card-bottom px-3 pb-2 row_flex gap-3 justify-between align-items-end">
                <div>
                    <h5 className={`font-13 mb-n1 truncate-2 smLine ${color ? '' : `color-${randColor}-light`}`} style={{color: color}}>{catName}</h5>
                    <p className="color-white font-10 opacity-50">Category</p>
                </div>
                <Link href={`/events/${slug}`} className="h-fit border-dark-light color-gray-dark text-nowrap  btn btn-s rounded-xl font-900 mt-2 text-uppercase font-11">Learn More</Link>
            </div>
            <div className={`card-overlay _grayScale opacity-50`} style={{background: `url(${xtra_large_thumb})`, filter: 'blur(1px) grayscale(1)'}}/>
            <div className={`card-overlay opacity-70 ${color ? '' : `bg-${randColor}-dark`}`} style={{background: color}}/>
            <div className="card-overlay bg-gradient opacity-80"/>
        </div>
        </>
    )
}

export default EventCard5;