import { openOffCanvas } from "@/helpers/appjs";
import { advancedFetchListings } from "@/helpers/rest";
import { cleanHtml } from "@/helpers/universal";
import { useComputed, useSignal, useSignalEffect } from "@preact/signals-react";
import { useSignals } from "@preact/signals-react/runtime";
import Link from "next/link";
import EventCard4 from "../Listings/cards/EventCard4";

function SearchField({exClass, styleObj={}}) {
  let keyWord = useSignal('');
  let listings = useSignal([]);

  useSignals();

   
    let payload = {
        _fields : 'id,title,thumbnail,fields,ticket_min_price_html, event_date,slug,_links,page_views,featured_media,acf,rating,category,schedule,longitude,latitude,level,short_desc,type,dir_categories,large_thumb,xtra_large_thumb, gallery,locations', 
        per_page : 5,
        //page: page,
        _embed: true,
        listing_type: 'event', 
        search_keywords: keyWord.value,
        'event-date': 'any-day'
        };

    const controller = new AbortController();
    const {signal} = controller;

  useSignalEffect(async() => {
    if(keyWord.value?.length > 2){
        const res = await advancedFetchListings({...payload}, signal);
        if(res){
            listings.value = res;
        }
    }
  });

  function runSearch(e){
    //controller.abort();
    keyWord.value = e.target.value;
  }
 
  return (
   <>
   <div className={`content pos-relative ${exClass}`} style={{...styleObj}}>
            <div className="search-box bg-theme color-theme rounded-5 shadow-l">
                <i className="fa fa-search"></i>
                <input type="text" className="border-0" placeholder="Search for events... " data-search onChange={(e) => runSearch(e)}/>
				<a href="#" className="clear-search disabled no-click mt-0"></a>
				<span data-menu="search_form_1" onClick={(e) => openOffCanvas(e)} className="_link color-theme"><i className="fa fa-sliders me-n3"></i></span>
            </div>
            <div className="search-results mt-3 left-0 right-0 z-2">
                <div class="card card-style mx-0 px-2 p-0 mb-0 bg-transparent shadow-0">
                    {listings.value?.length > 0 ? 
                    <>
                    {listings.value.map((el) => {
                    const {title, id, xtra_large_thumb} = el;
                        return <EventCard4 exClass='mb-2' listing={el} key={id}/>
                    })}
                    </> : <div/>}
                </div>
            </div>
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