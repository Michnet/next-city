import { cleanHtml } from "@/helpers/universal";
import Link from "next/link";
import { ListingMeta } from "../../Partials";
import DateView from "../../partials/dateViews/DateView";
import DateViewRelative from "../../partials/dateViews/DateViewRelative";
//import { useEffect, useState } from "react";
// import TermTag from "~/appComponents/components/partials/TermTag";
//import SkeletonCube from "~/appComponents/components/skeletons/SkeletonCube";
// import { DateView, DateViewRelative, ListingMeta, ListingMetaMini, PriceView } from '~/appComponents/components/UI/components';
// import { cleanHtml } from "~/server/UniversalFunctions";
import TermTag from "../../partials/TermTag";
import { PriceView } from "../../PriceView";
//import { getEventDates } from "~/server/WpRest";

const ActivityCard1 = ({item, noButton, exClass, dateWidth, width}) => {

  const {id, title, event_date, page_views, rating, ticket_min_price_html, category, locations, level, slug} = item;
  
  return (
          <div
            className={`listing_card _horizontal m-0 ${exClass ?? ''}`}
            key={id}
            data-aos="fade"
            data-aos-once="true"
            data-aos-delay={60}
            style={{width: width ?? 'auto'}}
          >
            <div
              className="activityCard1 -type-1  hover-inside-slider h-100"
            >
              <div className="activityCard1__content h-100">
              <div className={`d-grid align-items-stretch h-100`} style={{ gridTemplateColumns: `${event_date && event_date[0] ? dateWidth ? `${dateWidth} calc(100% - ${dateWidth})` : '30% 70%' : '100%'}`}}>
              {event_date && event_date[0] ? <DateView customDate={event_date[0].start} eventId={id}/> : <></>}
                  <div className='px-10 py-10'>
                    <TermTag exTagClass={'mb-0'} term={category} type={'hash'}/>
                    <Link href={`/events/${slug}`}>
                      <h4 className="activityCard1__title lh-13 text-dark-1 text-14 text-truncate">
                        <span>{cleanHtml(title.rendered)}</span>
                      </h4>
                    </Link>
                   

                    {/* {tagline && <p className="text-13 text-truncate">{tagline}</p>} */}
                    <div className="d-flex flex-row flex-nowrap gap-2 align-items-center">
                      <ListingMeta location={locations?.length > 0 ? locations[0].name : null}/>
                      {/* <ListingMetaMini page_views={page_views} ratings={rating}/>
                      <ListingMeta location={locations?.length > 0 ? locations[0].name : null}/>  */}
                    </div>
                    <div className="content_footer pt-0 gx-align-items-center d-flex justify-between">{/* 
                          {noButton ? null : 
                          <Link href={`/events/${id}`}>
                            <button  size="small" className="btn card_btn gx-mb-1 btn-outline-secondary">
                              Take a peak
                            </button>
                          </Link>} */}
                          <div>
                          {event_date && event_date[0] ? <DateViewRelative customDate={event_date[0].start} customEndDate={event_date[0].end} eventId={id}/> : <></>}
                          </div>
                    </div>
                    {ticket_min_price_html && <PriceView preText={'Tickets from '} exClass={'_inline'} priceHTml={ticket_min_price_html}/> }
                  </div>
                </div>
                
              </div>
            </div>
          </div>
  );
};

export default ActivityCard1;
