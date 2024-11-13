import ExplorerFilter from "@/components/UI/search/ExplorerFilter";
import SearchFilter3 from "@/components/UI/search/SearchFilter3";
//import SiteHead from "@/components/UI/SiteHead";
import { useRouter } from "next/router";
import {useState, useMemo, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { UISizes } from "@/contexts/atoms";
import useSWR from 'swr';
import HeaderWrapper from "@/components/layouts/partials/HeaderWrapper";
import Header from "@/components/layouts/partials/Header";
import {  advancedFetchListingsUrl, explorerServerQuery, fetcherWithSignal } from "@/helpers/rest";
import MainMenuBtn from "@/components/layouts/partials/MainMenuBtn";
import { closeMenus } from "@/helpers/appjs";
import ExploreListings from "@/components/routes/explore/ExploreListings";
//import { removeLastCharacter } from "@/helpers/universal";

//const listingType = null;


export async function getServerSideProps({res, req, query}) {

  res.setHeader(
    'Cache-Control',
    'public, s-maxage=60, stale-while-revalidate=120'
  )
  
  let serverObj = await explorerServerQuery({query: query, listing_type: 'all'});
  let {seoDescript} = serverObj;

  return {
    props: {
       ...serverObj,
       listingType: 'all',
       headerTitle: `Explore all`,
       seoMeta:{
          title: `Explore all`,
          description: seoDescript
       },
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


const ExploreDirectory = (props) => {
  const {topList,listingType} = props;
 const router = useRouter();
 const {query} = router;
 const {isTab} = useRecoilValue(UISizes);
 const [fetchy, setFetchy] = useState(false);
 const [loading, setLoading] = useState(true);

 //const cachedTopList = useMemo(() => topList, [topListKey])
 const cachedTopList = topList ?? []

 let controller = new AbortController();
    let {signal} = controller;

    const params = query ?? {};

    let load={_fields : `id,title,slug,fields,ticket_min_price_html,event_date,featured_media,featured,rating,acf,short_desc,page_views,level,category,_links,type, gallery,locations,xtra_large_thumb`, per_page: 5, ...params, 'event-date':'any-day', sort: 'latest'};

 const { data:fetchedTopList, error } = useSWR(fetchy ? advancedFetchListingsUrl({...load, _embed : true }) : null, (url) => fetcherWithSignal(signal, url), { revalidateIfStale: false, revalidateOnFocus: true, revalidateOnReconnect: true });

 let activeTopList = fetchy ? fetchedTopList : cachedTopList;

 useEffect(() => {
  if(query){
     if(!fetchy){setFetchy(true)}
  }
  if(activeTopList?.length > 0){
    setLoading(false);
  }
  return () => {
    setLoading(true);
    controller.abort();
  }
}, [query, activeTopList]);

  return (
    <>
     <div className="page-content" style={{overflow: 'initial'}}>
     {isTab ? <HeaderWrapper header_id={'explore_nav'} innerClass={'flex_row justify-between'}>
        <MainMenuBtn/>
        <ExplorerFilter/>
     </HeaderWrapper> : <Header headerTitle={`Explore LyveCity`} headerClass={'header-always-show'}/>}
      <ExploreListings topList={topList} type={listingType}/>
      </div>
      <div className="menu menu-box-left search_filter bg-theme" tabIndex="-1" id="exploreOffCanvas" >
                <div className="menu-title">
                  <div><h1>Filter Results</h1>
                    <p className="color-highlight">Filter your Search Results</p></div>
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

export default ExploreDirectory;
