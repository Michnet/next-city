import  {memo, useEffect, useRef, useState} from 'react';
import dynamic from 'next/dynamic';
import {Col, Row} from "react-bootstrap";
import { advancedFetchListingsUrl } from '../../server/WpRest';
import ListingCardHorizontal from '../../appComponents/components/dashboard/Listing/ListingCard-Horizontal';
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry";
//import { MOBILE_SIZE } from '../../constants/ThemeSetting';
import useSWRInfinite from "swr/infinite";
//import JavascriptMap from './JavascriptMap';
//import ListingCard from 'appComponents/components/dashboard/Listing/ListingCard';
import { fetcher } from 'server/WpBase';
import { generateTempArray } from 'server/UniversalFunctions';
import SkeletonProductHorizontal from 'appComponents/components/skeletons/SkeletonProductHorizontal';
import SkeletonProduct from '~/appComponents/components/skeletons/SkeletonProduct';
//import { useMediaQuery } from 'react-responsive';
const ActivityCard2 = dynamic(() => import('~/components/activity/ActivityCard2'));
//import { isTab } from '~/appComponents/core/Layout/Layout';
import { useRecoilValue } from 'recoil';
import { authState, UISizes} from '~/contexts/contexts';
const SearchFilter = dynamic(() => import('./SearchFilter'));
import { BSDrawer} from '~/appComponents/components/UI/components';
import ListingTimeline from '~/components/activity/partials/ListingTimeline';
const DualColorHeader = dynamic(() => import('~/appComponents/components/partials/DualColorHeader'));
import { useRouter } from 'next/router';

const PAGE_SIZE = 20;


const SearchConst = ({withSideFilter, columnObj, listingType, xlRow=6}) => {

    const {query} = useRouter();
    const {user} = useRecoilValue(authState);
    const [showThumb, setShowThumb] = useState(true);
    const [timelineView, setTimelineView] = useState(false);
   // const [filter, setFilter] = useState(null);
    //const [loading, setLoading] = useState(true);
    const [viewType, setViewType] = useState('Grid');
    const [page, setPage] = useState(1);
    //const width = useRecoilValue(UIWidthState);


    let {isTab, isMobile} = useRecoilValue(UISizes);
    let fieldList = "id,title,slug,event_date,featured_media,ticket_min_price_html,featured,rating,acf,short_desc,page_views,level,category,_links,type,xtra_large_thumb, gallery,locations,large_thumb,thumbnail,longitude,latitude,level,";

    function setUpFilters(){

        let filterArr = {
            'event-date': 'any-day',
            ...query,
            _fields : fieldList,
            _embed: true, 
            listing_type: listingType ?? 'event'
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
        fetcher
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
        (index) =>`${advancedFetchListingsUrl({ _fields : fieldList, listing_type:'event', _embed : true })}&per_page=${PAGE_SIZE}&page=${
            index + 1
          }` : null,
        fetcher
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

let defCols = {0: 1, 420: 2, 600: 2, 768:2, 992:3,  1200: 4}
let gridDisplay = (listings) => {
    return <>{timelineView ?  <ListingTimeline items={listings} dualColumn/> : <> 
                    {viewType === 'Grid' && <ResponsiveMasonry columnsCountBreakPoints={columnObj ?? defCols}>
                            <Masonry gutter={isMobile ? "10px" : "15px"}> 
                            {listings.map(listing => {
                               // return <ListingCard listing={listing} key ={listing.id} user={user}/>
                               return <ActivityCard2 exClass={'bg-transparent'} item={listing}/>
                            })
                            }
                            </Masonry>
                        </ResponsiveMasonry> 
                        }{viewType === 'Row' &&
                        <Row className='gx-mx-0'>{listings.map(listing => {
                            return <Col span={12} sm={6} md={12} xl={xlRow} className='sm:pl-0 sm:pr-0'><ListingCardHorizontal data={listing} key ={listing.id} user={user}/></Col>
                        })}</Row>
                        }
                        {isLoadingMore && skeletonView}
                        <div ref={loaderRef}></div>
                    </>}</>
}

let itemsView, total, errorView, sidefilterView, MobDrawer;
if(withSideFilter){
    sidefilterView = <SearchFilter/>
    MobDrawer = () => <BSDrawer/>
}
let skeletonView = <> 
                {viewType === 'Grid' && <ResponsiveMasonry columnsCountBreakPoints={columnObj ?? defCols}>
                    <Masonry gutter={isMobile ? "10px" : "20px"}> 
                        {generateTempArray(8).map((item, i) => (
                            <SkeletonProduct height={280} key={i}/>
                        ))}
                    </Masonry>
                </ResponsiveMasonry> 
                }

                {viewType === 'Row' &&
                <Row className='gx-mx-0'>
                    {generateTempArray(8).map((item, i) => (
                        <Col key={i} span={24} md={8} sm={12}  className='gx-px-2'>
                            <SkeletonProductHorizontal/>
                        </Col>
                    ))}
                </Row>

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
        itemsView = <><DualColorHeader exClass={'mb-30'} title={'No Listings matching your search'} desc={'Here are the latest listings on LyveCity'}/>{gridDisplay(fbListings)}</>
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
    filterView = <BSDrawer layout={'start'} content={sidefilterView} id={'mobileFilters'}  className='mobile_view filters'/>
    }else{
        filterView = <div  className='col-3 bg-white filters sticky_col'>
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
                                    {/* <SearchFilter/> */}
                                    {itemsView}
                                    {errorView}                                
                                </div>
                            }                  
            </div>
        </div>
        </>
    )
}
SearchConst.getServerSideProps = async (props) => {
    return props;
};
 
const Search = memo(SearchConst);
export default Search;
