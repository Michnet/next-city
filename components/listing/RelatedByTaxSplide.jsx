import { nextPostState } from "@/contexts/atoms";
import { useEffect, useState, useMemo } from "react";
import { useSetRecoilState } from "recoil";
import { advancedFetchListingsUrl, fetcher } from "@/helpers/rest";
import useSWR from 'swr';
import Splider from "../UI/partials/Splider";
import ActivityCard2 from "../UI/Listings/cards/ActivityCard2";
import { SectionHeader } from "@/components/UI/Partials";
import { CardsRowLoader } from "../skeletons/Skeletons";


function RelatedByTaxSplide({ids, listy, taxName, ids2, taxonomy_2, taxonomy, slug, exclude, random, nextUpdater=false, title}) {

    const [loading, setLoading] = useState(true);
    const [horizontal, setHorizontal] = useState(listy ?? false);
    const [page, setPage] = useState(1);
    const setNextPost = useSetRecoilState(nextPostState);

    function titleFunc(){
      let titleObj = {subTitle: taxName}

      if(taxonomy == 'category'){
        titleObj.title = 'More in Category';
      }else{
        titleObj.title = 'In this neighborhood';
      }

      return titleObj;
    }

    const cachedTitle = useMemo(() => titleFunc(), [taxonomy] );
    
    let listView, payload = {
        _fields : 'id,title,thumbnail,fields,ticket_min_price_html, event_date,slug,_links,page_views,featured_media,acf,rating,category,schedule,longitude,latitude,level,short_desc,type,dir_categories,large_thumb, gallery,locations,xtra_large_thumb', 
        exclude : exclude,
        per_page : 5,
        page: page,
        _embed: true, 
        };
    if(random){
        payload['random'] = true;
    }
    
    if(slug){
      payload[`${taxonomy}`] = slug;
    }
      if(taxonomy_2){
      payload[`${taxonomy_2}`] = ids2.toString();
    } 


    const { data:listings, error } = useSWR(advancedFetchListingsUrl({...payload}), fetcher, {revalidateIfStale: false, revalidateOnFocus: false, revalidateOnReconnect: false });

    const isLoadingInitialData = !listings && !error;
    const isEmpty = !isLoadingInitialData && listings?.length == 0;

          
  useEffect(() => {
    if(!isLoadingInitialData || isEmpty){
        setLoading(false);
    }
    return () => {
      setLoading(true)
    }
  }, [exclude, slug]);
/* 
  if(loading){
    listView = <CardsRowLoader/>
  }else{ */
  if(listings?.length > 0){
    if(nextUpdater){
      setNextPost(listings[0]?.slug);
    }
    listView = <>
         <SectionHeader exClass='px-3 mb-2'  title={`${cachedTitle.title}`} subTitle={`${cachedTitle.subTitle}`}/>

          <Splider height={210} options={{gap:15, arrows: false, wheel:false, autoWidth: true, padding: { left: 10, right: 15}, perPage:1, autoplay: true, perMove: 1, interval:6000, type:'carousel'}}>
            {listings?.length > 0 ? 
                listings.map((li) => {
                return <ActivityCard2 exClass={'ms-0 me-2 mb-0'} mini width={200} key={li.id} listing = {li}/>
                })
                :
                <></>
              }
          </Splider></>
      }
  

  return (
    <>
    {listView}
    </>
  )
}
export default RelatedByTaxSplide