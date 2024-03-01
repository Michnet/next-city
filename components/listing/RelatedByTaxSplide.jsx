import { nextPostState } from "@/contexts/atoms";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { cleanHtml } from '@/helpers/universal';
import { advancedFetchListingsUrl, fetcher } from "@/helpers/rest";
import useSWR from 'swr';

function RelatedByTaxSplide({ids, listy, ids2, taxonomy_2, taxonomy, exclude, random, nextUpdater=false}) {

    const [loading, setLoading] = useState(true);
    const [horizontal, setHorizontal] = useState(listy ?? false);
    const [page, setPage] = useState(1);
    const setNextPost = useSetRecoilState(nextPostState);

    
    let payload = {
        _fields : 'id,title,thumbnail,fields,ticket_min_price_html, event_date,slug,_links,page_views,featured_media,acf,rating,category,schedule,longitude,latitude,level,short_desc,type,dir_categories,thumbnail, gallery,locations', 
        exclude : exclude,
        per_page : 5,
        page: page,
        _embed: true, 
        };
    if(random){
        payload['random'] = true;
    }else{
      if(taxonomy){
        payload[`${taxonomy}`] = ids.toString();
      }
       if(taxonomy_2){
        payload[`${taxonomy_2}`] = ids2.toString();
      } 
    }

    const { data:listings, error } = useSWR(advancedFetchListingsUrl({...payload}), fetcher, {revalidateIfStale: false, revalidateOnFocus: false, revalidateOnReconnect: false });

    const isLoadingInitialData = !listings && !error;
    const isEmpty = !isLoadingInitialData && listings?.length == 0;
  

  return (
    <>
    <div className="d-flex px-3 mb-n3">
        <div className="align-self-center">
            <h4 className="mb-0">Related Listings</h4>
        </div>
        <div className="align-self-center ms-auto">
            <a href="#" className="font-12">View All</a>
        </div>
    </div>

    <div className="splide double-slider slider-no-dots text-center visible-slider" id="double-slider-1a">
        <div className="splide__track">
            <div className="splide__list">
                {listings?.length > 0 ?
                   listings.map((item) => {
                    let {title, thumbnail, slug} = item;
                    return (
                    <div className="splide__slide">
                        <a href={`/events/${slug}`} className="mx-3">
                            <div className="card card-style me-0 mb-0" style={{backgroundImage: `url(${thumbnail})`}} data-card-height="150">
                                <div className="card-bottom p-2 px-3">
                                    <h4 className="color-white truncate-3">{cleanHtml(title?.rendered)}</h4>
                                </div>
                                <div className="card-overlay bg-gradient opacity-80"></div>
                            </div>
                        </a>
                    </div>)
                   }) 
                :
                <></>
                }
            </div>
        </div>
    </div>
    </>
  )
}
export default RelatedByTaxSplide