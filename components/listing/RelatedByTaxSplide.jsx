import { nextPostState } from "@/contexts/atoms";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { advancedFetchListingsUrl, fetcher } from "@/helpers/rest";
import useSWR from 'swr';
import Splider from "../UI/partials/Splider";
import ActivityCard2 from "../UI/Listings/cards/ActivityCard2";
import { DualColorHeader, SectionHeader } from "@/components/UI/Partials";


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
    <SectionHeader inverted iconClass={'fas fa-th-large'}  exClass='px-3 mb-2' link={'See All'} title={'Related Pages'} subTitle={'Need More Options?'}/>

    <Splider height={250} options={{gap:15, arrows: false, wheel:false, autoWidth: true, padding: { left: 10, right: 15}, perPage:1, autoplay: true, perMove: 1, interval:6000, type:'loop'}}>
      {listings?.length > 0 ? 
          listings.map((li) => {
           return <ActivityCard2 exClass={'ms-0 me-2'} mini width={200} key={li.id} listing = {li}/>
          })
          :
          <></>
        }
    </Splider>
    </>
  )
}
export default RelatedByTaxSplide