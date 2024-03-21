import { nextPostState } from "@/contexts/atoms";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { advancedFetchListingsUrl, fetcher } from "@/helpers/rest";
import useSWR from 'swr';
import Splider from "../UI/partials/Splider";
import EventCard2 from "../UI/Listings/cards/EventCard2";

function RelatedByTaxSplide({ids, listy, ids2, taxonomy_2, taxonomy, exclude, random, nextUpdater=false}) {

    const [loading, setLoading] = useState(true);
    const [horizontal, setHorizontal] = useState(listy ?? false);
    const [page, setPage] = useState(1);
    const setNextPost = useSetRecoilState(nextPostState);

    
    let payload = {
        _fields : 'id,title,thumbnail,fields,ticket_min_price_html, event_date,slug,_links,page_views,featured_media,acf,rating,category,schedule,longitude,latitude,level,short_desc,type,dir_categories,large_thumb, gallery,locations', 
        exclude : exclude,
        per_page : 5,
        page: page,
        _embed: true, 
        };
    if(random){
        payload['random'] = true;
    }else{
      if(taxonomy){
        payload[`${taxonomy}`] = ids.toString();
      }
       if(taxonomy_2){
        payload[`${taxonomy_2}`] = ids2.toString();
      } 
    }

    const { data:listings, error } = useSWR(advancedFetchListingsUrl({...payload}), fetcher, {revalidateIfStale: false, revalidateOnFocus: false, revalidateOnReconnect: false });

    const isLoadingInitialData = !listings && !error;
    const isEmpty = !isLoadingInitialData && listings?.length == 0;
    const splideViews = {
        768: { perPage: 3},
        575: { perPage: 2}
       }

  return (
    <>
    <div className="d-flex px-3 mb-2">
        <div className="align-self-center">
            <h4 className="mb-0">Related Listings</h4>
        </div>
        <div className="align-self-center ms-auto">
            <a href="#" className="font-12">View All</a>
        </div>
    </div>

    <Splider height={325} options={{gap:15, arrows: false, wheel:false, height: 250, autoWidth: true, padding: { left: 10, right: 15}, perPage:1, autoplay: true, perMove: 1, interval:6000, type:'loop'} }>
      {listings?.length > 0 ? 
          listings.map((li) => {
           return <EventCard2 width={300} key={li.id} listing = {li}/>
          })
          :
          <></>
        }
    </Splider>
    </>
  )
}
export default RelatedByTaxSplide