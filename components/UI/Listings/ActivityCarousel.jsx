import dynamic from "next/dynamic";
import { spliderVariableWidth} from "@/helpers/sliders"
//import Slider from "react-slick"
//import ListingCard from "./cards/ListingCard"
import useSWR from 'swr';
import { advancedFetchListingsUrl, fetcherWithSignal } from "@/helpers/rest";
import { useEffect, memo } from "react";
import { useRouter } from "next/router";
import { DualColorHeader } from "../Partials";
import Splider from "@/components/UI/partials/Splider";
import Link from "next/link";
import { generateTempArray, typeName } from '@/helpers/universal';
import { Skeleton } from "@/components/skeletons/Skeletons";

function ActivityCarouselConst({optionsObj = {}, autoHeight=false, listingType, skeletonWidth=150, skeletonHeight=120, defListings = null, thumbsize = 'xtra_large_thumb', height=null, queryObj={}, cardType, noFallback, exCardClass, title, mini = false, subtitle, icon, catSlug, orderMeta, exClass, gap =null, sort='latest', ignorePriority = false, eventDate, orderby, order, cardWidth, shadowHeight, iconClass, include}) {

    let theView, fetchy = true, linkQuery = '';
    let localObj ={gap: 15, arrows: false, wheel:false, height: 250, autoWidth: true, padding: { left: 10, right: 15}, perPage:1, autoplay: false, perMove: 1, interval:6000, type:'loop'}


    let spliderOptions = {...spliderVariableWidth, padding: { left: 8, right: 20}, perMove: 1, type:'loop', autoplay: false, ...optionsObj}
    if(gap){
      spliderOptions.gap = gap;
    }

    const {query} = useRouter();
    const params = query ?? {};

    let Card;
    let load={_fields : `id,title,slug,fields,ticket_min_price_html,event_date,featured_media,featured,rating,acf,short_desc,page_views,level,category,_links,type, gallery,locations,max_discount,${thumbsize}`, 
    listing_type:listingType ?? 'all', per_page: 5, ...queryObj, ...params};

    switch (cardType) {
      case 11:
        Card = dynamic(() => import("./cards/ActivityCard1"));
        break;
      case 22:
         Card = dynamic(() => import("./cards/ActivityCard2"));
        break;
      
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

    let controller = new AbortController();
    let {signal} = controller;

    useEffect(() => {
      return () => {
        fetchy = false;
        linkQuery = ''
      }
    }, []);

    if(orderMeta){
        load.order_by=orderby;
        load.order=order;
        load.meta_key=orderMeta;
        linkQuery.concat(`order=${order}&order_by=${orderby}&meta_key=${orderMeta}`);
    }else if(orderby){
        load.order_by=orderby;
        load.order=order;
        linkQuery.concat(`order=${order}&order_by=${orderby}`);
    }
    if(sort){
      load.sort = sort;
      linkQuery.concat(`sort=${sort}`);
    }
    if(include){
      load.include = include;
    }

    if(eventDate){
      load['event-date'] = eventDate
      linkQuery.concat(`event-date=${eventDate}`);
    }else{
      load['event-date'] = 'any-date'
    }

    if(query?.category){
      load.category = query?.category
      linkQuery.concat(`category=${query?.category}`);
    }else if(catSlug){
      load.category = catSlug
      linkQuery.concat(`category=${catSlug}`);
    }

    if(ignorePriority){
      load.ignore_priority = ignorePriority;
    }

    const { data:listings, error } = useSWR(fetchy && !defListings ? advancedFetchListingsUrl({...load, _embed : true }) : null, (url) => fetcherWithSignal(signal, url), { revalidateIfStale: false, revalidateOnFocus: false, revalidateOnReconnect: false });

    const isLoadingInitialData = !listings && !error;
    const isEmpty = listings?.length === 0;
    if(isLoadingInitialData){
      theView =  <>
            <Skeleton exClass='ms-3 mb-3' width='60%'/>
            <Splider /* height={skeletonHeight + 25} */  options={{...spliderOptions}}>
                {generateTempArray(8).map((item, i) => ( <Skeleton exClass={exCardClass} roundy height={skeletonHeight} width = {skeletonWidth} key={i}/> ))}
            </Splider>
          </>
    }else{
      if(listings?.length > 0){
        controller.abort();
          const itemArray =   listings.slice(0, 5).map((item, i) => (
           <div key={i}><Card mini={mini} exClass={exCardClass}  width={cardWidth} key={i} listing = {item}/></div>
         ));
       
          theView =  <>
                      {title && <div className="d-flex px-3 mb-3">
                      <div className="align-self-center">
                        <DualColorHeader title={title} subTitle={subtitle} iconClass={iconClass}/>
                      </div>
                      <div className="align-self-center ms-auto">
                          <Link href={{
              pathname: `/explore/${typeName(listingType, '')}`,
              query: {...load},
            }}  className="font-12">View All</Link>
                      </div>
                      </div>}
                      <Splider autoHeight={autoHeight} options={{height: height, ...spliderOptions}}>
                          {
                              itemArray
                          }
                      </Splider>
                      </>
         }
    }
    

  return (
    <div> 
        <>
       {theView}
       </>
    </div>
  )
}

const ActivityCarousel = memo(ActivityCarouselConst);
export default ActivityCarousel