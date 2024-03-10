import { responsiveCarousel } from "@/helpers/sliders"
import Slider from "react-slick"
import ListingCard from "./cards/ListingCard"
import useSWR from 'swr';
import { advancedFetchListingsUrl, fetcher } from "@/helpers/rest";
import { useEffect } from "react";
import { useRouter } from "next/router";

function ActivityCarousel({defListings = null, queryObj={}, cardType, noFallback, exCardClass, title, mini, subtitle, icon, catSlug, orderMeta, exClass, sort, eventDate, orderby, order, cardWidth, shadowHeight}) {

    let theView, fetchy = true;

    const {query} = useRouter();
    const params = query ?? {};

    let thumbsize = 'xtra_large_thumb'
    let load={_fields : `id,title,slug,fields,ticket_min_price_html,event_date,featured_media,featured,rating,acf,short_desc,page_views,level,category,_links,type, gallery,locations,${thumbsize}`, 
    listing_type:'event', per_page: 5, ...queryObj, ...params};


    useEffect(() => {
    
      return () => {
        fetchy = false;
      }
    }, []);

    
    if(orderMeta){
        load.order_by=orderby;
        load.order=order;
        load.meta_key=orderMeta;
    }else if(orderby){
        load.order_by=orderby;
        load.order=order;
    }
    if(sort){
      load.sort = sort
    }

    if(eventDate){
      load['event-date'] = eventDate
    }

    if(query.category){
      load.category = query.category
    }else if(catSlug){
      load.category = catSlug
    }

    

    const { data:listings, error } = useSWR(fetchy && !defListings ? advancedFetchListingsUrl({...load, _embed : true }) : null, fetcher, { revalidateIfStale: false, revalidateOnFocus: true, revalidateOnReconnect: true });

    const isLoadingInitialData = !listings && !error;
    const isEmpty = listings?.length === 0;

    if(listings?.length > 0){

        const itemArray =   listings.slice(0, 5).map((item, i) => (
         <div style={{width: cardWidth ?? 'auto'}} key={i}><ListingCard key={i} listing = {item}/></div>
       ));
     
        theView =  <Slider  {...responsiveCarousel}>
                        {
                            itemArray
                        }
                    </Slider>
       }

  return (
    <div> 
        <div className="d-flex px-3 mb-3">
        <div className="align-self-center">
            <h4 className="mb-0">Recommended</h4>
        </div>
        <div className="align-self-center ms-auto">
            <a href="#" className="font-12">View All</a>
        </div>
        </div>
        <>
       {theView}
       </>
    </div>
  )
}
export default ActivityCarousel