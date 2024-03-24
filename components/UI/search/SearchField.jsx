import { openOffCanvas } from "@/helpers/appjs";
import { advancedFetchListings } from "@/helpers/rest";
import { cleanHtml } from "@/helpers/universal";
import { useComputed, useSignal, useSignalEffect } from "@preact/signals-react";
import { useSignals } from "@preact/signals-react/runtime";
import Link from "next/link";
import EventCard4 from "../Listings/cards/EventCard4";

function SearchField() {
  let keyWord = useSignal('');
  let listings = useSignal([]);

  useSignals();

   
    let payload = {
        _fields : 'id,title,thumbnail,fields,ticket_min_price_html, event_date,slug,_links,page_views,featured_media,acf,rating,category,schedule,longitude,latitude,level,short_desc,type,dir_categories,large_thumb,xtra_large_thumb, gallery,locations', 
        per_page : 5,
        //page: page,
        _embed: true,
        listing_type: 'event', 
        keyword: keyWord.value,
        'event-day': 'any-day'
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
    controller.abort();
    keyWord.value = e.target.value;
  }
 
  return (
   <>
   <div className="content mt-n4 pos-relative">
            <div className="search-box bg-theme color-theme rounded-m shadow-l">
                <i className="fa fa-search"></i>
                <input type="text" className="border-0" placeholder="Search for a place... (try island)" data-search onChange={(e) => runSearch(e)}/>
				<a href="#" className="clear-search disabled no-click mt-0"></a>
				<span data-menu="search_form_1" onClick={(e) => openOffCanvas(e)} className="_link color-theme"><i className="fa fa-sliders me-n3"></i></span>
            </div>
            <div className="search-results mt-3 position-absolute left-0 right-0 z-2">
                <div class="card card-style mx-0 px-2 p-0 mb-0 ">
                    {listings.value?.length > 0 ? 
                    <>
                    {listings.value.map((el) => {
                    const {title, id, xtra_large_thumb} = el;
                        return <Link key={id} href="#" class="d-flex py-2" data-filter-item data-filter-name="all maldives tropical island escape">
                        <div>
                            <img src={xtra_large_thumb} class="rounded-sm me-3 object-cover" width="50" height='50' alt="img"/>
                        </div>
                        <div>
                            <span class="color-highlight font-400 d-block pt-0 text-uppercase font-10">Tropical Island</span>
                            <strong class="color-theme font-16 d-block mt-n2">{cleanHtml(title.rendered)}</strong>
                        </div>
                        <div class="ms-auto text-end align-self-center pe-2">
                            <h5 class="line-height-xs font-18 pt-3">$1450</h5>
                            <span class="font-10 d-block mt-n2">For 7 Nights</span>
                        </div>
                    </Link>
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