import ExplorerFilter from "@/components/UI/search/ExplorerFilter";
import SearchFilter3 from "@/components/UI/search/SearchFilter3";
import TermsCarousel from "@/components/UI/Listings/TermsCarousel";
//import SiteHead from "@/components/UI/SiteHead";
import { useRouter } from "next/router";
import { Suspense, useState, useMemo, useEffect, memo } from "react";
import { Client } from "react-hydration-provider";
import Search from "@/components/UI/search/Search";
import { useRecoilValue } from "recoil";
import { UISizes } from "@/contexts/atoms";
import useSWR from 'swr';
import ActivityCarousel from "@/components/UI/Listings/ActivityCarousel";
import EventCard3 from "@/components/UI/Listings/cards/EventCard3";
import {advancedFetchListingsUrl, fetcherWithSignal } from "@/helpers/rest";
import Slider from "react-slick";
import { fadingSlide, largeResp } from "@/helpers/sliders";
import { Skeleton } from "@/components/skeletons/Skeletons";
//import SeoHead from "@/components/UI/SeoHead";

function translateDate(string){
  return string.replaceAll("-", " ");
}

let topListKey = 'tops'

const ExploreConst = ({topList, type=null}) => {
 const router = useRouter();
 const {query} = router;
 const {sort, category, tags, region} = query;
 const eventDate = query['event-date'] ?? null;
 const [showHint, setShowHint] = useState(true);
 const {isTab} = useRecoilValue(UISizes);
 const [fetchy, setFetchy] = useState(false);
 const [loading, setLoading] = useState(true);

 const cachedTopList = useMemo(() => topList, [topListKey])

 function translateTags(string){
   let arr = string.split(',');
   let newArr = arr.map((it) => {
      return <span className="pointer me-1">#{it.replace("-", " ")}</span>
   });
   return newArr;
 }

 let controller = new AbortController();
    let {signal} = controller;

    

    const params = query ?? {};

    let load={_fields : `id,title,slug,fields,ticket_min_price_html,event_date,featured_media,featured,rating,acf,short_desc,page_views,level,category,_links,type, gallery,locations,xtra_large_thumb`, 
    listing_type: type ?? 'all', per_page: 5, ...params, 'event-date':'any-day'};

 const { data:fetchedTopList, error } = useSWR(fetchy ? advancedFetchListingsUrl({...load, _embed : true }) : null, (url) => fetcherWithSignal(signal, url), { revalidateIfStale: false, revalidateOnFocus: true, revalidateOnReconnect: true });

  const isLoadingInitialData = fetchy && !fetchedTopList && !error;
  const isEmpty = fetchy && fetchedTopList?.length === 0;

 let activeTopList = fetchy ? fetchedTopList : cachedTopList;

 useEffect(() => {
  if(query){
     setFetchy(true)
  }
  if(activeTopList && activeTopList?.length > 0){
    setLoading(false);
  }
  if(fetchy){
    if(isEmpty){
      setLoading(false);
    }
  }
  return () => {
    setLoading(true);
    controller.abort();
  }
}, [query, activeTopList]);

  return (
    <>
      <section className="p-0">
          <div className="container-fluid mw-100 p-0">
            
            <div className="row flex-column flex-md-row flex-md-nowrap m-0">
            
            <Client>{!isTab &&  <div id={"explore_nav"}  className="col-12 col-md-auto search_filter bg-theme no-scrollbar sticky_col shadow-1" style={{zIndex: 5, maxWidth: isTab ?  '100%' : '230px'}}>
               <ExplorerFilter/>
               <div className="sidebar md:d-none mt-20">
                  <SearchFilter3/>
               </div>
            </div>}</Client>
            <div className="explore_content col minw-0 p-md-2 p-0">
              <div className="inner_section mb-3 top_list">
                {loading ? <Skeleton  height={300}/> : <Slider  {...fadingSlide} autoplaySpeed={5000} speed={2000} responsive = {[...largeResp]} >
                {fetchy ? fetchedTopList && fetchedTopList?.length > 0 ? 
                    fetchedTopList.map((li) => {
                      let {id} = li;
                      return <EventCard3 height={310} titleSize={24} contentExClass={'px-4 pb-4'} truncate={3} width={'inherit'} listing={li} key={id} exClass='_hero m-0 radius-0'/>
                    })
                    :
                    <></>
                    :
                    cachedTopList && cachedTopList?.length > 0 ? 
                      cachedTopList.map((li) => {
                        let {id} = li;
                        return <EventCard3 width={'inherit'} listing={li} key={id} exClass='m-0 radius-0'/>
                      })
                      :
                      <></>
                  }
              </Slider>}
              </div>
              <div className="inner_section mb-4">
                 <Suspense fallback={'Loading'}><TermsCarousel listingType={type} queryKey={'category'} queryLink={`/explore/${type}s?category=`} exClass={'pt-10'} slug={type ? `${type}s` : null}  type={'dir_cats'} infinity/></Suspense>
              </div>
              <>{query && Object.keys(query).length > 0 ? 
              <><div className="query_hint mx-2 p-2">
              {showHint ? <div className="query_content">
                  <p className="mb-2"><span>Exploring {category ? <span><span className="text-info pointer">{translateDate(category)} </span></span> : ''}
                    listings </span>
                    {eventDate ? <span>scheduled for <span className="text-warning pointer">{translateDate(eventDate)}</span></span> : ''}
                    {region ? <span> in <span className="text-info pointer capitalize">{region}</span></span> : ''}
                    {sort ? <span>, starting with the <span className="text-info pointer">{sort}</span></span> : ''}
                    {tags ? <span>, and tagged in <span className="text-success _tags">{translateTags(tags)}</span></span> : ''}
                  </p> 
                  <div><button className="btn btn-xs mb-0 btn-outline-secondary px-3" onClick={() => setShowHint(false)}>Hide</button></div>
              </div> 
              : 
              <button className="btn btn-xs mb-0 btn-secondary px-3" onClick={() => setShowHint(true)}>Show Hints</button> 
              }</div></> : <></>}</>
              <div className="inner_section mt-20">
                    <ActivityCarousel listingType={type} ignorePriority={true} skeletonHeight={100} skeletonWidth={300} thumbsize={'thumbnail'} height={120} exCardClass={'me-2'} title={`Latest ${type ? type+'s' : ''}`} subtitle={`Fresh and New ${type ? type+'s' : ''}`} limit={4} cardType={4} exClass={'px-0'} cardWidth={300} shadowHeight={144}/>
              </div>

              {!query || sort !== 'top-rated' && <div className="inner_section px-2">
                    <ActivityCarousel listingType={type} skeletonHeight={200} skeletonWidth={200} height={220} mini noFallback cardWidth={200} exCardClass={'_mini ms-0 me-2'} sort={'top-rated'} subtitle={'By User Rating'} title={'Top rated'}   limit={10} cardType={22} exClass={'px-0'}  shadowHeight={144}/>
              </div>}

              {type == 'event' && <>{ !query || eventDate !== 'this-week' && <div className="inner_section">
                    <ActivityCarousel listingType={type} skeletonHeight={200} skeletonWidth={270} thumbsize={'xtra_large_thumb,thumbnail'} cardWidth={270} gap={15} exCardClass={'_mini'} eventDate={'this-week'} title={'Happening this week'}  iconClass={'fas fa-calendar-week'} limit={10} cardType={5} exClass={'px-0'} height={210} />
              </div>}</>}


              <div className="inner_section">
                  <Search cardExClass={'mx-0'} listingType={type}/>
              </div>

            </div>
          </div>
          </div>
      </section>
    </>
  );
};
const ExploreListings = memo(ExploreConst);
export default ExploreListings;
