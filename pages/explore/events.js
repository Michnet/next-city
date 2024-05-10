import ExplorerFilter from "@/components/UI/search/ExplorerFilter";
import SearchFilter3 from "@/components/UI/search/SearchFilter3";
import TermsCarousel from "@/components/UI/Listings/TermsCarousel";
import SiteHead from "@/components/UI/SiteHead";
import { useRouter } from "next/router";
import { Suspense, useState, useMemo, useEffect } from "react";
import { Client } from "react-hydration-provider";
import Search from "@/components/UI/search/Search";
import { useRecoilValue } from "recoil";
import { UISizes } from "@/contexts/atoms";
import useSWR from 'swr';
import ActivityCarousel from "@/components/UI/Listings/ActivityCarousel";
import EventCard3 from "@/components/UI/Listings/cards/EventCard3";
import HeaderWrapper from "@/components/layouts/partials/HeaderWrapper";
import Header from "@/components/layouts/partials/Header";
import { advancedFetchListings, advancedFetchListingsUrl, fetcherWithSignal } from "@/helpers/rest";
import Slider from "react-slick";
import { fadingSlide, largeResp } from "@/helpers/sliders";
import MainMenuBtn from "@/components/layouts/partials/MainMenuBtn";
import { closeMenus } from "@/helpers/appjs";
import { Skeleton } from "@/components/skeletons/Skeletons";

export async function getStaticProps() {

  let serverObj = {};

  async function topListings(){
    let thumbsize = 'xtra_large_thumb'
    let load={_fields : `id,title,slug,fields,ticket_min_price_html,event_date,featured_media,featured,rating,acf,short_desc,page_views,level,category,_links,type, gallery,locations,${thumbsize}`, 
    listing_type:'event', per_page: 5, 'event-day':'any-day'};

    const list = await advancedFetchListings(load);
    if(list){
      serverObj.topList = list;
    }
  }

  await topListings();

  return {
    props: {
       ...serverObj,
       headerTitle: 'Explore LyveCity',
      settings : {
        noHeader: true,
        mMenu: 'show',
        mMenuContent:{
          icon : 'las la-filter', 
          btnProps:{
          'data-menu' : "exploreOffCanvas"}
          
      },
      noHeader: true
    },
    revalidate: 6000, // In seconds
  }
}
}

let topListKey = 'tops'

const ExploreEvents = ({topList}) => {
 const router = useRouter();
 const {query} = router;
 const {sort, category, tags, region} = query;
 const eventDate = query['event-date'] ?? null;
 const [showHint, setShowHint] = useState(true);
 const {isTab} = useRecoilValue(UISizes);
 const [fetchy, setFetchy] = useState(false);
 const [loading, setLoading] = useState(true)

 function translateDate(string){
 return string.replaceAll("-", " ");
 }

 const cachedTopList = useMemo(() => topList, [topListKey])

 function translateTags(string){
   let arr = string.split(',');
   let newArr = arr.map((it) => {
      return <span className="pointer">{it.replace("-", " ")}</span>
   });
   return newArr;
 }

 let controller = new AbortController();
    let {signal} = controller;

    useEffect(() => {
      if(query){
        console.log('Query found')
         setFetchy(true)
      }
      setLoading(false);
      return () => {
        setLoading(true);
        controller.abort();
      }
    }, [query]);

    const params = query ?? {};

    let load={_fields : `id,title,slug,fields,ticket_min_price_html,event_date,featured_media,featured,rating,acf,short_desc,page_views,level,category,_links,type, gallery,locations,xtra_large_thumb`, 
    listing_type:'event', per_page: 5, ...params};

 const { data:fetchedTopList, error } = useSWR(fetchy ? advancedFetchListingsUrl({...load, _embed : true }) : null, (url) => fetcherWithSignal(signal, url), { revalidateIfStale: false, revalidateOnFocus: true, revalidateOnReconnect: true });


  return (
    <>
      <SiteHead title={'Explore Events'}/>
     <div className="page-content" style={{overflow: 'initial'}}>
     {isTab ? <HeaderWrapper header_id={'explore_nav'} innerClass={'flex_row justify-between'}>
        <MainMenuBtn/>
        <ExplorerFilter/>
     </HeaderWrapper> : <Header headerTitle='Explore' headerClass={'header-always-show'}/>}
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
              <div className="inner_section mb-4">
                {loading ? <Skeleton  height={300}/> : <Slider  {...fadingSlide} responsive = {[...largeResp]} >
                {fetchy ? fetchedTopList?.length > 0 ? 
                    fetchedTopList.map((li) => {
                      let {id} = li;
                      return <EventCard3 width={'inherit'} listing={li} key={id} exClass='m-0 radius-0'/>
                    })
                    :
                    <></>
                    :
                    cachedTopList?.length > 0 ? 
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
                 <Suspense fallback={'Loading'}><TermsCarousel queryKey={'category'} queryLink={'/explore/events?category='} exClass={'pt-10'} slug={'events'}  type={'dir_cats'} infinity/></Suspense>
              </div>
              <>{query && Object.keys(query).length > 0 ? 
              <><div className="query_hint mx-2 p-2">
              {showHint ? <div className="query_content text-white">
                  <p className="mb-2"><span>Exploring {category ? <span><span className="text-info pointer">{translateDate(category)} </span></span> : ''}
                    listings </span>
                    {eventDate ? <span>scheduled for <span className="text-warning pointer">{translateDate(eventDate)}</span></span> : ''}
                    {region ? <span> in <span className="text-info pointer capitalize">{region}</span></span> : ''}
                    {sort ? <span>, starting with the <span className="text-info pointer">{sort}</span></span> : ''}
                    {tags ? <span>, and tagged in <span className="text-success">{translateTags(tags)}</span></span> : ''}
                  </p> 
                  <div><button className="btn btn-xs mb-0 btn-outline-secondary px-3" onClick={() => setShowHint(false)}>Hide</button></div>
              </div> 
              : 
              <button className="btn btn-xs mb-0 btn-secondary px-3" onClick={() => setShowHint(true)}>Show Hints</button> 
              }</div></> : <></>}</>
              <div className="inner_section mt-20">
                    <ActivityCarousel skeletonHeight={100} skeletonWidth={300} thumbsize={'thumbnail'} height={120} exCardClass={'me-2'} title={'Latest Events'} subtitle={'Fresh and New Events'} limit={4} cardType={4} exClass={'px-0'} cardWidth={300} shadowHeight={144}/>
              </div>

              {!query || sort !== 'top-rated' && <div className="inner_section px-2 mt-20">
                    <ActivityCarousel skeletonHeight={200} skeletonWidth={200} height={220} mini noFallback cardWidth={200} exCardClass={'_mini ms-0 me-2'} sort={'top-rated'} subtitle={'By User Rating'} title={'Top rated'}   limit={10} cardType={22} exClass={'px-0'}  shadowHeight={144}/>
              </div>}

              {!query || eventDate !== 'this-week' && <div className="inner_section mt-20">
                    <ActivityCarousel skeletonHeight={200} skeletonWidth={270} thumbsize={'thumbnail'} cardWidth={270} gap={15} exCardClass={'_mini'} eventDate={'this-week'} title={'Happening this week'}  iconClass={'fas fa-calendar-week'} limit={10} cardType={5} exClass={'px-0'} height={210} />
              </div>}


              <div className="inner_section">
                  <Search cardExClass={'mx-0'}/>
              </div>

            </div>
          </div>
          </div>
      </section>
      </div>
      <div className="menu menu-box-left search_filter bg-theme" tabIndex="-1" id="exploreOffCanvas" >
                <div className="menu-title"><h1>Filter Results</h1>
                    <p className="color-highlight">Filter your Search Results</p>
                      <i className="fas fa-times close-menu" onClick={() => closeMenus()}/>
                  </div>
                <div className="offcanvas-body pb-0">
                  <aside className="sidebar  xl:d-block">
                    <SearchFilter3/>
                  </aside>
                </div>
            </div>
    </>
  );
};

export default ExploreEvents;
