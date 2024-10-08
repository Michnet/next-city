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

const listingType = 'event';

export async function getServerSideProps({ req, res, query }) {
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=60, stale-while-revalidate=120'
  )
  
  let serverObj = await explorerServerQuery({query: query, listing_type: listingType});
  const {propsOBj, seoDescript} = serverObj;

  return {
    props: {
       ...propsOBj,
       headerTitle: `Explore LyveCity ${listingType}s`,
       seoMeta:{
          title: `Explore ${listingType}s`,
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

let topListKey = 'tops'

const ExploreEvents = ({topList}) => {
 const router = useRouter();
 const {query} = router;
 const {isTab} = useRecoilValue(UISizes);
 const [fetchy, setFetchy] = useState(false);
 const [loading, setLoading] = useState(true);

 const cachedTopList = useMemo(() => topList, [topListKey])

 let controller = new AbortController();
    let {signal} = controller;

    const params = query ?? {};

    let load={_fields : `id,title,slug,ticket_min_price_html,featured_media,featured,rating,acf,short_desc,page_views,level,category,_links,type, gallery,locations,xtra_large_thumb`, 
    listing_type: listingType, per_page: 5, sort: 'latest', ...params};

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
        <ExplorerFilter listingType={listingType}/>
     </HeaderWrapper> : <Header headerTitle='Explore' headerClass={'header-always-show'}/>}
      <ExploreListings topList={topList} type={listingType}/>
      </div>
      <div className="menu menu-box-left search_filter bg-theme" tabIndex="-1" id="exploreOffCanvas" >
                <div className="menu-title"><h1>Filter Results</h1>
                    <p className="color-highlight">Filter your Search Results</p>
                      <i className="fas fa-times close-menu" onClick={() => closeMenus()}/>
                  </div>
                <div className="offcanvas-body pb-0">
                  <aside className="sidebar  xl:d-block">
                    <SearchFilter3 listingType={listingType}/>
                  </aside>
                </div>
            </div>
    </>
  );
};

export default ExploreEvents;
