//import dynamic from "next/dynamic";
import { spliderVariableWidth} from "@/helpers/sliders"
//import Slider from "react-slick"
//import ListingCard from "./cards/ListingCard"
import useSWR from 'swr';
import { advancedFetchListingsUrl, fetcherWithSignal } from "@/helpers/rest";
import { useEffect, memo } from "react";
import { useRouter } from "next/router";
//import { DualColorHeader } from "../Partials";
//import Link from "next/link";
import { generateTempArray, randomBetween, shuffleArray, typeName } from '@/helpers/universal';
//import { Skeleton } from "@/components/skeletons/Skeletons";
import EventCardImage from "./cards/EventCardImage";

function ListingsMasonryConst({listingType, defListings = null, thumbsize = 'xtra_large_thumb', queryObj={},  catSlug, orderMeta, exClass, gap =null, sort='random', ignorePriority = false, eventDate, orderby, order, include}) {

    let fetchy = true, linkQuery = '';

    const {query} = useRouter();
    const params = query ?? {};

    let load={_fields : `id,title,slug,fields,ticket_min_price_html,event_date,featured_media,featured,rating,acf,short_desc,page_views,level,category,_links,type, gallery,locations,max_discount,${thumbsize}`, 
    listing_type:listingType ?? 'all', per_page: 10, ...queryObj, sort: sort, ...params};

    let controller = new AbortController();
    let {signal} = controller;

    useEffect(() => {
      return () => {
        fetchy = false;
        linkQuery = ''
      }
    }, []);

    if(orderMeta){
        load.orderby=orderby;
        load.order=order;
        load.meta_key=orderMeta;
        linkQuery.concat(`order=${order}&orderby=${orderby}&meta_key=${orderMeta}`);
    }else if(orderby){
        load.orderby=orderby;
        if(order){
          load.order=order ;
          linkQuery.concat(`order=${order}&orderby=${orderby}`);
        }else{
          linkQuery.concat(`orderby=${orderby}`);
        }
    }
    if(sort){
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

    const { data:listings, error } = useSWR(advancedFetchListingsUrl({...load, _embed : true }), (url) => fetcherWithSignal(signal, url), { revalidateIfStale: false, revalidateOnFocus: false, revalidateOnReconnect: false });

    const isLoadingInitialData = !listings && !error;
    const isEmpty = listings?.length === 0;
    
  return (
    <div> 
        {isLoadingInitialData ? <></> :
        <div className='p-3 h_masonry gap-2'>
            {listings?.length > 0 ? 
                shuffleArray(listings).map((li) => {
                return <EventCardImage width={'auto'} styleObj={{flexBasis: `${randomBetween(20,40)}%`}} /* width={randomBetween(130,320)} */ maxWidth={'50%'} mini contentClass={'px-3'} height={120} maxHeight={'180px'} key={li.id} listing = {li}/>
                })
                :
                <></>
              }
          </div>}
    </div>
  )
}

const ListingsMasonry = memo(ListingsMasonryConst);
export default ListingsMasonry