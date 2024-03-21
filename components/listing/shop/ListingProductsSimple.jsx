//import ProductCardTicket from '../../../../routes/market/products/cards/ProductCardTicket';
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry";
import {useRef, useState } from "react";
import useSWRInfinite from "swr/infinite";
// import { fetcher } from "server/WpBase";
import { DualColorHeader } from "@/components/UI/Partials";
import { fetcher, getBookableProductsUrl, getProductsUrl } from "@/helpers/rest";
import SkeletonProduct from "@/components/skeletons/SkeletonProduct";
import { generateTempArray, productsSortList, scrollToSpot } from "@/helpers/universal";
import { counterSignal } from "@/contexts/signals";

export const Ticket = () => {
  return <article class="card card-style ticket_card fl-left">
  <section class="date">
    <time datetime="23th feb">
    <span>23</span><span>feb</span>
    </time>
  </section>
  <section class="card-cont">
    <small>dj khaled</small>
    <h3>corner obsest program</h3>
    <div class="even-date">
    <i class="fa fa-calendar"></i>
    <time>
    <span>wednesday 28 december 2014</span>
    <span>08:55pm to 12:00 am</span>
    </time>
    </div>
    <div class="even-info">
    <i class="fa fa-map-marker"></i>
    <p>
      nexen square for people australia, sydney
    </p>
    </div>
    <a href="#">tickets</a>
  </section>
</article>
}


function ListingProductsSimple({ids, isSample, exClass, title, listy, productType, listingId, relatedIds}) {
  console.log('counterSignal', counterSignal.value);
  counterSignal.value = 'To a number';

    const [horizontal, setHorizontal] = useState(listy ?? false);
    const [sorting, setSorting] = useState('newest');

    const simplePdtHeadRef = useRef(null);
    const PAGE_SIZE = 6


    const scroller = () => scrollToSpot(simplePdtHeadRef, 0);


    let filterArr = {
      //_fields: "id,name,featured,short_description,price,regular_price,average_rating,rating_counts,images,attributes,listing",
      type: productType ?? 'simple',
      _embed : true
      };
    let restUrl = productType === 'booking' ? getBookableProductsUrl : getProductsUrl;

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



    const { data, error, mutate, size, setSize, isValidating } = useSWRInfinite((index) => `${restUrl(filterArr)}&per_page=${PAGE_SIZE}&page=${ index + 1 }`, fetcher,
        {revalidateIfStale: false, revalidateOnFocus: false, revalidateOnReconnect: false }
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
                              {generateTempArray(6).map((item, i) => (
                                  <div key={i} xl={4} md={6} sm={8} xs={12}
                                      >
                                      <SkeletonProduct/>
                                  </div> 
                                      ))
                                  }
                                  </div>
        
        if(isLoadingInitialData){
            itemsView = <>{loaderSkeleton}</>
        } 
       if(items){
                  itemsView = <>
                  {horizontal ?  
                  <ResponsiveMasonry columnsCountBreakPoints={{300 : 1, 479: 2, 575: 2, 991: 3, 1199 : 3}} className='masonry_grid  _products'>
                        <Masonry gutter="10px">
                            {items.map((product) => (
                                <Ticket isSample={isSample} key={product.id} product={product} listingId={listingId} relatedIds={relatedIds}/>
                            ))}

                        </Masonry>
                    </ResponsiveMasonry> 
                  :
                  <div gutter={10} className='masonry_grid _products'>
                            {items.map((product) => (
                              <div className="col-xxs-12" xs={8} sm={6} md={4} lg={4}>
                                <Ticket isSample={isSample} key={product.id} product={product} listingId={listingId} relatedIds={relatedIds}/>
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
                        <select value={sorting ?? 'newest'}  onChange={(e) => setSorting(e.target.value)} className="list-sort">
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
                    <div className="items">
                      {itemsView}
                    </div>
                    {isLoadingMore && loaderSkeleton}
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
