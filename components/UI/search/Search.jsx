"use client";

import  {memo, useEffect, useRef, useState} from 'react';
import dynamic from 'next/dynamic';
// import { advancedFetchListingsUrl } from '../../server/WpRest';
// import ListingCardHorizontal from '../../appComponents/components/dashboard/Listing/ListingCard-Horizontal';
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry";
//import { MOBILE_SIZE } from '../../constants/ThemeSetting';
import useSWRInfinite from "swr/infinite";
//import JavascriptMap from './JavascriptMap';
import { useRecoilValue } from 'recoil';
import { authState, UISizes} from '@/contexts/atoms';
// import { BSDrawer} from '~/appComponents/components/UI/components';
// import ListingTimeline from '~/components/activity/partials/ListingTimeline';
// const DualColorHeader = dynamic(() => import('~/appComponents/components/partials/DualColorHeader'));
import { useRouter } from 'next/router';
import EventCard6 from '../Listings/cards/EventCard6';
import { advancedFetchListingsUrl, fetcher } from '@/helpers/rest';
import { generateTempArray } from '@/helpers/universal';
//import SkeletonProduct from '@/components/skeletons/SkeletonProduct';
import ListingTimeline from '../lists/timelines/ListingTimeline';
import ActivityCard1 from '../Listings/cards/ActivityCard1';
import { DualColorHeader } from '../Partials';
import { Skeleton } from '@/components/skeletons/Skeletons';
const SearchFilter = dynamic(() => import('./SearchFilter'));
import EventCard3 from '@/components/UI/Listings/cards/EventCard3';
import SalesCard from '../Listings/cards/SalesCard';
import { closeMenus } from "@/helpers/appjs";

const PAGE_SIZE = 22;

const SearchConst = ({withSideFilter, propQuery = null, columnObj, hideHeading=false, listingType='all', xlRow=6, cardExClass}) => {

    const router = useRouter();
    const query = propQuery ?? router.query;
    const {user} = useRecoilValue(authState);
    const [showThumb, setShowThumb] = useState(true);
    const [timelineView, setTimelineView] = useState(false);
   // const [filter, setFilter] = useState(null);
    //const [loading, setLoading] = useState(true);
    const [viewType, setViewType] = useState('Grid');
    const [page, setPage] = useState(1);
    //const width = useRecoilValue(UIWidthState);
    const params = query ?? {};


    let {isTab, isMobile} = useRecoilValue(UISizes);
    let fieldList = "id,title,slug,event_date,featured_media,ticket_min_price_html,featured,rating,acf,short_desc,page_views,level,category,_links,type,xtra_large_thumb, gallery,locations,max_discount,large_thumb,thumbnail,longitude,latitude,level,tagline,modified";

    function setUpFilters(){

        let filterArr = {
            'event-date': 'any-day',
            ...params,
            sort:'latest',
            _fields : fieldList,
            _embed: true, 
            listing_type: listingType
        }
        
        /* if (query.category) {
            filterArr.category= query.category;
        }
        if (query.location) {
            filterArr.location= query.location;
        }
        if (query.tags) {
            filterArr.tags= query.tags;
        }
        if(query.keyword){
            filterArr.keyword= query.keyword;
        }
        if(query.orderby){
            filterArr.orderby= query.orderby;
            filterArr.order= query.order;
        } */

    return filterArr;
    }

    const { data, error, mutate, size, setSize, isValidating } = useSWRInfinite(
        (index) =>`${advancedFetchListingsUrl(setUpFilters())}&per_page=${PAGE_SIZE}&page=${
            index + 1
          }`,
        fetcher, {revalidateIfStale: false, revalidateOnFocus: false, revalidateOnReconnect: false }
      );
        
        const listings = data ? [].concat(...data) : [];
        //const listings = data ? processData(data) : [];
        const isLoadingInitialData = !data && !error;
        const isLoadingMore =
          isLoadingInitialData ||
          (size > 0 && data && typeof data[size - 1] === "undefined");
        const isEmpty = data?.[0]?.length === 0;
        const isReachingEnd =
          isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE);
        const isRefreshing = isValidating && data && data.length === size;

    const {data:fbData, error:fbError} = useSWRInfinite(!isLoadingInitialData && isEmpty ? 
        (index) =>`${advancedFetchListingsUrl({ _fields : fieldList, listing_type: listingType, _embed : true, 'event-date': 'any-day', exclude: query?.exclude ?? 0})}&per_page=${PAGE_SIZE}&page=${
            index + 1
          }` : null,
        fetcher, {revalidateIfStale: false, revalidateOnFocus: false, revalidateOnReconnect: false }
      );

      const fbListings = fbData ? [].concat(...fbData) : [];

    const loaderRef = useRef(null)
    
    const callbackFunction = (entries) => {
        const [ entry ] = entries;
      if(entry.isIntersecting){
          if(listings && listings.length > 0){ 
            if(page >= size){
                if(!isReachingEnd)
              setSize(size + 1);
            }
          }
        }
    }
    
    const options = {
      root: null,
      rootMargin: "500px",
      threshold:1.0
    }
  
useEffect(() => {
    
    const observer = new IntersectionObserver(callbackFunction, options)
    if (loaderRef.current) observer.observe(loaderRef.current)
    
    return () => {
    if(loaderRef.current) observer.unobserve(loaderRef.current)
    }
}, [loaderRef, options]);

 
useEffect(() => {
    if(data){
        setPage(page + 1);
    }
}, [data]);
    
useEffect(() => {
    setPage(1);
    //setFilter(setUpFilters);
}, [query]); 

let defCols = {0: 1, 480: 2, 600: 3, 768:2, 1200: 3}
let gridDisplay = (listings) => {
    return <>{timelineView ?  <ListingTimeline items={listings} dualColumn/> : <> 
                    {viewType === 'Grid' && <ResponsiveMasonry columnsCountBreakPoints={columnObj ?? defCols}>
                            <Masonry gutter={"20px"}> 
                            {listings.map(listing => {
                                const {type} = listing;
                               // return <ListingCard listing={listing} key ={listing.id} user={user}/>
                               if(type == 'place'){
                                return <EventCard3 dataAos={'zoom-in'} exImgClass='rounded-4' key={listing.id} noButton={false} width={'auto'} exClass={'m-0 rounded-4'} listing={listing}/>
                               }else if(type == 'special-sale'){
                                return <SalesCard dataAos={'zoom-in'} exImgClass='rounded-4' key={listing.id} noButton={false} width={'auto'} exClass={'m-0 rounded-4 py-2 px-3'} listing={listing}/>
                               }
                               return <EventCard6 dataAos={'zoom-in'} contentClass='px-2'  key={listing.id} truncate={false} noButton={false} width={'auto'} exClass={'bg-transparent shadow-0 radius-0'} listing={listing}/>
                            })
                            }
                            </Masonry>
                        </ResponsiveMasonry> 
                        }{viewType === 'Row' &&
                        <div className='gx-mx-0'>{listings.map(listing => {
                            return <div span={12} sm={6} md={12} xl={xlRow} className='sm:pl-0 sm:pr-0'><ActivityCard1 listing={listing} key ={listing.id} user={user}/></div>
                        })}</div>
                        }
                        {isLoadingMore && skeletonView}
                        <div ref={loaderRef}></div>
                    </>}</>
}

let itemsView, total, errorView, sidefilterView, MobDrawer;
if(withSideFilter){
    sidefilterView = <SearchFilter/>
}
let skeletonView = <> 
                {viewType === 'Grid' && <ResponsiveMasonry columnsCountBreakPoints={columnObj ?? defCols}>
                    <Masonry gutter={"20px"}> 
                        {generateTempArray(8).map((item, i) => (
                            <Skeleton roundy height={180} key={i}/>
                        ))}
                    </Masonry>
                </ResponsiveMasonry> 
                }

                {viewType === 'Row' &&
                <div  className='row gx-mx-0'>
                    {generateTempArray(8).map((item, i) => (
                        <div key={i} span={24} md={8} sm={12}  className='gx-px-2'>
                            {/* <SkeletonProductHorizontal/> */}
                        </div>
                    ))}
                </div>

                }
                </>

    if(listings.length > 0){
        total = listings.length;
        itemsView = <>{gridDisplay(listings)}</>
    }

if(isLoadingInitialData){
    itemsView = skeletonView
}

if(isEmpty){
    if(fbListings?.length > 0){
        itemsView = <>{!hideHeading && <DualColorHeader exClass={'my-4'} title={'No Listings matching your search'} desc={'Here are the latest listings on LyveCity'}/>}{gridDisplay(fbListings)}</>
    }else{
        itemsView = (
            <div>No Listings matching your options. Try a new search</div>
        );
        total = 0;
    }
}


 let filterView;

 if(withSideFilter){
    if(isTab) {
    //filterView = <BSDrawer layout={'start'} content={sidefilterView} id={'mobileFilters'}  className='mobile_view filters'/>
    filterView = <div className="menu menu-box-left search_filter bg-theme" tabIndex="-1" id="mobileFilters" >
         <div className="menu-title">
            <div><h1>Filter Results</h1>
                    <p className="color-highlight">Filter your Search Results</p>
                    </div>
                      <i className="fas fa-times close-menu" onClick={() => closeMenus()}/>
                  </div>
                <div className="offcanvas-body pb-0">
                  <aside className="sidebar  xl:d-block">{sidefilterView}
                  </aside>
                  </div>
    </div>
    }else{
        filterView = <div  className='col-3 filters sticky_col'>
                        {sidefilterView}
                    </div>
    }
 } 
    return (
        <>
        <div className='row py-2'>
            {filterView}
            <div className={`results ${isTab ? 'col-12' : withSideFilter ? 'col-9' : 'col-12'}`}>
                
                    <>{/* <div className='search_header view_control'>
                        <div >
                            <h3>Search Page</h3>
                            <p className='gray_text'>Showing {total} listings</p>
                        </div>
                        <div>
                            <Button onClick={() => setShowThumb(!showThumb)} className='toggle_view'>{showThumb? 'Show Map' : 'Show List'}</Button>
                        </div>
                    </div>
                            {!showThumb &&
                                <div className='map_view gx-mb-4'>
                                    <JavascriptMap listings={listings}/>
                                </div>
                            } */}</>
                          {showThumb && 
                                <div className='thumb_view'>
                                    <div className='view_control'>
                                        <div className='view_type'>
                                            <button onClick={() => setViewType('Grid')}><i className="las la-table"></i></button>
                                            <button onClick={() => setViewType('Row')}><i className="las la-exchange-alt"></i></button>
                                        </div>
                                        <div className='layout_type'>
                                            <div className="form-check form-switch">
                                            <input onChange={(e) => setTimelineView(e.target.checked)} className="form-check-input" on type="checkbox" role="switch" id="flexSwitchCheckChecked" />
                                            <label className="form-check-label" for="flexSwitchCheckChecked">Timeline View</label>
                                            </div>
                                        </div>
                                    </div>
                                    {itemsView}
                                    {errorView}                                
                                </div>
                            }                  
            </div>
        </div>
        </>
    )
}
/* SearchConst.getServerSideProps = async (props) => {
    return props;
}; */
 
const Search = memo(SearchConst);
export default Search;
