import dynamic from "next/dynamic";
import useSWR from 'swr';
import { advancedFetchListingsUrl, fetcher } from "@/helpers/rest";
import { useEffect } from "react";
import { useRouter } from "next/router";
import {  SectionHeader } from "../Partials";
import Splider from "../partials/Splider";

function EventsCarousel({defListings = null, spliderOptions, height, queryObj={}, cardType, exCardClass, title, mini = false, subtitle, iconClass, color, catSlug, orderMeta, exClass, sort, eventDate, orderby, order, cardWidth, thumbnailSize='large_thumb'}) {

    let theView, fetchy = true;

    const {query} = useRouter();
    const params = query ?? {};

    let options = spliderOptions ? {...spliderOptions} : {gap: 15, arrows: false, wheel:false,  autoWidth: true, padding: { left: 10, right: 15}, perPage:1, autoplay: false, perMove: 1, interval:6000, type:'loop'}

    let Card;
    let load={_fields : `id,title,slug,fields,ticket_min_price_html,event_date,featured_media,featured,rating,acf,short_desc,page_views,level,category,_links,type, gallery,locations,large_thumb,thumbnail,xtra_large_thumb`, 
    listing_type:'event', per_page: 5, ...queryObj, ...params};

    switch (cardType) {
      case 1:
        Card = dynamic(() => import("./cards/EventCard"));
        break;
      case 2:
         Card = dynamic(() => import("./cards/EventCard2"));
        break;
      case 3:
         Card = dynamic(() => import("./cards/EventCard3"));
        break;
      case 4:
         Card = dynamic(() => import("./cards/EventCard4"));
         break;
      case 5:
         Card = dynamic(() => import("./cards/EventCard5"));
        break;
      default:
        Card = dynamic(() => import("./cards/EventCard"));
        break;
  
    }

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
         <div key={i}><Card mini={mini} exClass={exCardClass}  width={cardWidth} key={i} item = {item}/></div>
       ));
     
        theView =  <>
                    <SectionHeader linkPath={'/search'} linkQuery={{load}} inverted iconClass={iconClass} color={color} exClass='px-3 mb-2' link={'See All'} title={title} subTitle={subtitle}/>

                    <Splider height={height} options={{...options}}>
                      {listings?.length > 0 ? 
                          listings.map((li) => {
                          return <Card width={270} key={li.id} listing = {li}/>
                          })
                          :
                          <></>
                        }
                    </Splider>
                    </>
       }

  return (
    <div> 
        <>
       {theView}
       </>
    </div>
  )
}
export default EventsCarousel