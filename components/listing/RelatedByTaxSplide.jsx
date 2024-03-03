import { nextPostState } from "@/contexts/atoms";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { cleanHtml } from '@/helpers/universal';
import { advancedFetchListingsUrl, fetcher } from "@/helpers/rest";
import useSWR from 'swr';
import { Splide, SplideSlide } from "@splidejs/react-splide";
import Link from "next/link";

function RelatedByTaxSplide({ids, listy, ids2, taxonomy_2, taxonomy, exclude, random, nextUpdater=false}) {

    const [loading, setLoading] = useState(true);
    const [horizontal, setHorizontal] = useState(listy ?? false);
    const [page, setPage] = useState(1);
    const setNextPost = useSetRecoilState(nextPostState);

    
    let payload = {
        _fields : 'id,title,thumbnail,fields,ticket_min_price_html, event_date,slug,_links,page_views,featured_media,acf,rating,category,schedule,longitude,latitude,level,short_desc,type,dir_categories,large_thumb, gallery,locations', 
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
    const splideViews = {
        768: { perPage: 3},
        575: { perPage: 2}
       }

  return (
    <>
    <div className="d-flex px-3 mb-2">
        <div className="align-self-center">
            <h4 className="mb-0">Related Listings</h4>
        </div>
        <div className="align-self-center ms-auto">
            <a href="#" className="font-12">View All</a>
        </div>
    </div>

    <Splide options={{height: 200, wheel: true, padding: { left: 0, right: 15}, autoplay: true, perMove: 2, interval:4000, type:'loop', perPage: 4, breakpoints: {...splideViews}} }>
                {listings?.length > 0 ?
                   listings.map((item) => {
                    let {title, large_thumb, slug, id} = item;
                    return (
                    <SplideSlide key={id}>
                        <Link href={`/events/${slug}`} className="mx-3">
                            <div className="card card-style me-0 mb-0" style={{backgroundImage: `url(${large_thumb})`, height: '150px'}} >
                                <div className="card-bottom p-2 px-3">
                                    <h4 className="color-white truncate-2">{cleanHtml(title?.rendered)}</h4>
                                </div>
                                <div className="card-overlay bg-gradient opacity-80"></div>
                            </div>
                        </Link>
                    </SplideSlide>)
                   }) 
                :
                <></>
                }
    </Splide>
    </>
  )
}
export default RelatedByTaxSplide