import Masonry, {ResponsiveMasonry} from "react-responsive-masonry";
import {useRef} from "react";
import useSWRInfinite from "swr/infinite";
// import { fetcher } from "server/WpBase";
import { DualColorHeader } from "@/components/UI/Partials";
import { fetcher, getBookableProductsUrl, getProductsUrl } from "@/helpers/rest";
import { generateTempArray, productsSortList, scrollToSpot } from "@/helpers/universal";
import { useSignal } from "@preact/signals-react";
import {useRecoilState, useRecoilValue} from "recoil";
import {authState, storeOrderState} from '@/contexts/atoms'
import { Skeleton } from "@/components/skeletons/Skeletons";
import dynamic from "next/dynamic";

function ListingProductsSimple({ids, isSample, exClass, title, listy, productType, listingId, relatedIds}) {
  const {user} = useRecoilValue(authState);
  const [sorting, setSorting] = useRecoilState(storeOrderState);

    const horizontal = useSignal(listy ?? false);
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

        if(sorting ===  'price-lowest'){
          filterArr.orderby = 'price';
          filterArr.order = 'asc'
        }

        if(sorting ===  'price-highest'){
          filterArr.orderby = 'price';
          filterArr.order = 'desc'
        }

        if(sorting ===  'rating'){
          filterArr.orderby = 'rating';
          filterArr.order = 'desc'
        }

        if(sorting ===  'name'){
          filterArr.orderby = 'title';
          filterArr.order = 'asc'
        }


    const { data, error, mutate, size, setSize, isValidating, isLoading} = useSWRInfinite((index) => `${restUrl(filterArr)}&per_page=${PAGE_SIZE}&page=${ index + 1 }`, fetcher,
        {revalidateIfStale: true, revalidateOnFocus: false, revalidateOnReconnect: false }
      );

      
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
            itemsView = <>
            {horizontal ?  
            <ResponsiveMasonry columnsCountBreakPoints={productType == 'simple' ? {300:2,575:3,768:4} : {300:1,600:2}} className='masonry_grid  _products'>
                  <Masonry gutter="10px">
                      {items.map((product) => (
                          <Card user={user} isSample={isSample} key={product.id} product={product} listingId={listingId} relatedIds={relatedIds}/>
                      ))}

                  </Masonry>
              </ResponsiveMasonry> 
            :
            <div gutter={10} className='masonry_grid _products'>
                      {items.map((product) => (
                        <div className="col-xxs-12" xs={8} sm={6} md={4} lg={4}>
                          <Card user={user} isSample={isSample} key={product.id} product={product} listingId={listingId} relatedIds={relatedIds}/>
                          </div>
                      ))}

              </div>

            }
            </>
  } 

  if(error){
      itemsView = <div>No products</div>
  }

  if(isEmpty){
    itemsView = <p>Yay, no items found.</p>
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
                        <select value={sorting}  onChange={(e) => runSetSorting(e.target.value)} className="list-sort">
                          {productsSortList.map((el) => {
                            const {name, id, label} = el;
                            return <option key={id} value={name}>{label}</option>
                          })}
                        </select>
                        </>}</div>
                        <div className='view_type'>
                          <button disabled={!horizontal} onClick={() => {horizontal.value = false; scroller()}}><i className="bi bi-grid"/></button>
                          <button disabled={horizontal}  onClick={() => {horizontal.value = true; scroller();}}><i className="bi bi-hdd-stack"/></button>
                        </div>
                      </div>
                  </div>
       </div>

       <div className="market_content ">
                    <div className="items">
                      {itemsView}
                    </div>
                    {isValidating && loaderSkeleton}
                    {isReachingEnd && <div></div>}
                    {!isReachingEnd && <button
                    className="gx-mb-3"
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
