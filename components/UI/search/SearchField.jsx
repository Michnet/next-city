import { openOffCanvas } from "@/helpers/appjs";
import { advancedFetchListings } from "@/helpers/rest";
import { cleanHtml } from "@/helpers/universal";
import { useComputed, useSignal, useSignalEffect } from "@preact/signals-react";
import { useSignals } from "@preact/signals-react/runtime";
import Link from "next/link";
import { useState } from "react";
import EventCard4 from "../Listings/cards/EventCard4";
import { LoaderDualRingBoxed } from '@/components/skeletons/Loaders';

function SearchField({exClass, styleObj={}, listingtType='all'}) {
  let keyWord = useSignal('');
  let listings = useSignal([]);
  const [active, setActive] = useState(false);
  const [loading, setLoading] = useState(false);

  useSignals();

   
    let payload = {
        _fields : 'id,title,thumbnail,fields,ticket_min_price_html, event_date,slug,_links,page_views,featured_media,acf,rating,category,schedule,longitude,latitude,level,short_desc,type,dir_categories,large_thumb,xtra_large_thumb, gallery,locations', 
        per_page : 5,
        //page: page,
        _embed: true,
        listing_type: listingtType, 
        search_keywords: keyWord.value,
        sort: 'latest',
        'event-date': 'any-day'
        };

    const controller = new AbortController();
    const {signal} = controller;

  useSignalEffect(async() => {
    if(keyWord.value?.length > 2){
        setLoading(true);
        setActive(true);
        const res = await advancedFetchListings({...payload}, signal);
        if(res){
            listings.value = res;
            setLoading(false);
        }
    }
  });

  function runSearch(e){
    keyWord.value = e.target.value;
  }
  function cancelSearch(){
    setActive(false);
    keyWord.value = '';
    listings.value = []
  }
 
  return (
   <>
   <div className={`content pos-relative ${exClass}`} style={{...styleObj}}>
            <div className="search-box bg-theme color-theme rounded-5 shadow-l row_flex align-items-center pe-3">
                <input type="text" className="border-0 flex-grow-1" placeholder={`Search for ${listingtType}... `} data-search onChange={(e) => runSearch(e)} value={keyWord.value}/>
				<a href="#" className="clear-search disabled no-click mt-0">off</a>
				<span style={{width: '40px', height: '30px', lineHeight: '30px'}} className="search_action shadow-0 btn p-0 text-center color-theme d-block"><i className={`text-18 far fa-${listingtType == 'place' ? 'search-location' : 'radar'}`}/></span>
				<span style={{width: '40px', height: '30px', lineHeight: '30px'}} data-menu="search_form_1" onClick={(e) => openOffCanvas(e)} className="search_action shadow-0 btn p-0 text-center color-theme d-block"><i className="text-18 far fa-sliders-h"></i></span>
				<span onClick={() => cancelSearch()} style={{width: '40px', height: '30px', lineHeight: '30px'}} className="search_action shadow-0 btn p-0 text-center color-theme d-block"><i className="text-18 far fa-times"></i></span>
            </div>
            {active && <div className="search-results mt-3 left-0 right-0 z-2 position-absolute">
                <div class="card card-style mx-0 px-2 p-0 mb-0 bg-theme-transparent shadow-0 align-items-center gap-2 flex-wrap flex-row justify-center py-5">
                    {listings.value?.length > 0 ? 
                    <>
                    {listings.value.map((el) => {
                    const {title, id, xtra_large_thumb} = el;
                        return <EventCard4 exClass='mb-2' listing={el} key={id}/>
                    })}
                    </> : <LoaderDualRingBoxed/>}
                </div>
            </div>}
        </div>
        {/* {listings.value?.length > 0 ? 
                <>
                {listings.value.map((el) => {
                    return <EventCard4 width={'auto'} listing={el} key={el.id}/>
                })}
                </> : <div/>} */}
        <div className="search-no-results disabled mt-4">
            <div className="card card-style">
                <div className="content">
                    <h1>No Results</h1>
                    <p>
                        Your search brought up no results. Try using a different keyword. Or try typying all
                        to see all items in the demo. These can be linked to anything you want.
                    </p>
                </div>
            </div>
        </div>
   </>
  )
}
export default SearchField