import Masonry, {ResponsiveMasonry} from "react-responsive-masonry";
import {useRef, useState, useEffect} from "react";
import useSWRInfinite from "swr/infinite";
// import { fetcher } from "server/WpBase";
import { DualColorHeader } from "@/components/UI/Partials";
import { fetcher, getBookableProductsUrl, getProductsUrl } from "@/helpers/rest";
import { generateTempArray, productsSortList, scrollToSpot } from "@/helpers/universal";
import { useSignal } from "@preact/signals-react";
import {useRecoilState, useRecoilValue} from "recoil";
import {authState, storeOrderState, pdtListyState} from '@/contexts/atoms'
import { Skeleton } from "@/components/skeletons/Skeletons";
import dynamic from "next/dynamic";
import Splider from "@/components/UI/partials/Splider";

function ListingProductsSimple({ids, isSample, exClass, title, listy, productType, listingId, relatedIds, carousel}) {
  const {user} = useRecoilValue(authState);
  const [sorting, setSorting] = useState('newest');
    const [horizontal, setHorizontal] = useRecoilState(pdtListyState);
    
    function runSetSorting(val){
      setSorting(val);
    }

    const simplePdtHeadRef = useRef(null);
    const PAGE_SIZE = 6; let Card;


    const scroller = () => scrollToSpot(simplePdtHeadRef, 0);

    switch (productType) {
      case 'simple':
        Card = dynamic(() => import("@/components/UI/market/productCards/ProductCard"));
        break;

      case 'booking':
        Card = dynamic(() => import("@/components/UI/market/productCards/Ticket"));
        break;
    
      default:
        Card = dynamic(() => import("@/components/UI/market/productCards/ProductCard"));
        break;
    }
    



    let filterArr = {
      //_fields: "id,name,featured,short_description,price,regular_price,average_rating,rating_counts,images,attributes,listing",
      type: productType ?? 'simple',
      _embed : true
      };
    let restUrl = productType == 'booking' ? getBookableProductsUrl : getProductsUrl;

        if(ids){
          filterArr.include = ids.join(',')
        }

        
  const { data, error, mutate, size, setSize, isValidating, isLoading} = useSWRInfinite((index) => `${restUrl(filterArr)}&per_page=${PAGE_SIZE}&page=${ index + 1 }`, fetcher,
    {revalidateIfStale: true, revalidateOnFocus: false, revalidateOnReconnect: true }
  );

    useEffect(() => {
      switch (sorting) {
      case 'price-lowest':
        filterArr.orderby = 'price';
        filterArr.order = 'asc'
        break;

      case 'newest':
        filterArr.orderby = 'date';
        filterArr.order = 'desc'
        break;

      case 'oldest':
        filterArr.orderby = 'date';
        filterArr.order = 'asc'
        break;

      case 'price-highest':
        filterArr.orderby = 'price';
        filterArr.order = 'desc'
        break;

      case 'top-rated':
        filterArr.orderby = 'rating';
        filterArr.order = 'desc'
        break;

      case 'name':
        filterArr.orderby = 'title';
        filterArr.order = 'asc'
        break;

      default:
        filterArr.orderby = 'date';
        filterArr.order = 'desc'
          break;
      }
      setSize(1);
    
      /*  return () => {
        setSorting('newest')
      } */
    }, [sorting]);
        

      
        const items = data ? [].concat(...data) : [];
        const isLoadingInitialData = !data && !error;
        const isLoadingMore =
          isLoadingInitialData ||
          (size > 0 && data && typeof data[size - 1] === "undefined");
        const isEmpty = data?.[0]?.length === 0;
        const isReachingEnd =
          isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE);
        const isRefreshing = isValidating && data && data.length === size;
      
        let itemsView;
      
        const loaderSkeleton = <div className="gx-mx-0">
                              {generateTempArray(3).map((item, i) => (
                                  <div key={i} xl={4} md={6} sm={8} xs={12}
                                      >
                                      <Skeleton height={200}/>
                                  </div> 
                                      ))
                                  }
                                  </div>
      
        if(isLoadingInitialData){
            itemsView = <>{loaderSkeleton}</>
        }else{
          if(items?.length > 0){
            if(carousel){
              itemsView = <> 
              <Splider options={{gap: '10px', type: 'loop', padding: '10px'}}>
                        {items.map((product) => (
                            <Card exClass='my-2 justify-between' boxClass='h-100 py' sized user={user} horizontal={horizontal} isSample={isSample} key={product.id} product={product} listingId={listingId} relatedIds={relatedIds}/>
                        ))}
  
                    </Splider> 
              </>
            }else{
              itemsView = <> 
              <ResponsiveMasonry columnsCountBreakPoints={horizontal ? {300:1,600:2} : productType == 'simple' ? {300:2,575:3,768:4} : {300:1,600:2}} className='masonry_grid  _products'>
                    <Masonry gutter="10px">
                        {items.map((product) => (
                            <Card user={user} horizontal={horizontal} isSample={isSample} key={product.id} product={product} listingId={listingId} relatedIds={relatedIds}/>
                        ))}
  
                    </Masonry>
                </ResponsiveMasonry> 
              </>
            }
          } 

  if(error){
      itemsView = <div>No products</div>
  }

  if(isEmpty){
    itemsView = <p>Nay, no items found.</p>
  }
        } 
       

    return (
     
        <div className={`listing_box ${exClass ?? ''}`}>

        <div className='block_header'>
            <div className="market_head" id='simple_pdts_head' ref={simplePdtHeadRef}>
                     <DualColorHeader title={title ?? null}/>

                      <div className="_left">
 
                      </div>
                      <div className="_right">
                      <div className="inner_left">{<>
                        <span>Start With </span>  
                        <select value={sorting}  onChange={(e) => setSorting(e.target.value)} className="list-sort">
                          {productsSortList.map((el) => {
                            const {name, id, label} = el;
                            return <option key={id} value={name}>{label}</option>
                          })}
                        </select>
                        </>}</div>
                        <div className='view_type'>
                          <button disabled={!horizontal} onClick={() => {setHorizontal(false); scroller()}}><i className="bi bi-grid"/></button>
                          <button disabled={horizontal}  onClick={() => {setHorizontal(true); scroller();}}><i className="bi bi-hdd-stack"/></button>
                        </div>
                      </div>
                  </div>
       </div>

       <div className="market_content ">
                    <div className="items mb-3">
                      {itemsView}
                    </div>
                    {isValidating || isLoadingMore ? loaderSkeleton : <></>}
                    {isReachingEnd && <div></div>}
                    {!isReachingEnd && <button
                    className="mb-2 btn btn-theme"
                      disabled={isLoadingMore || isReachingEnd}
                      onClick={() => setSize(size + 1)}
                    >
                      {isLoadingMore
                        ? "Loading..."
                        : isReachingEnd
                        ? "No more items"
                        : "Show More"}
                    </button>}
                  </div>
</div>
    )
}

export default ListingProductsSimple
