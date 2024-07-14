//import DealsFilter from "../hotel-list/sidebar/DealsFilter";
//import Map from "../hotel-list/sidebar/Map";
//import SearchBox from "../hotel-list/sidebar/SearchBox";
//import PopularFilters from "../hotel-list/sidebar/PopularFilters";
//import AminitesFilter from "../hotel-list/sidebar/AminitesFilter";
//import RatingsFilter from "../hotel-list/sidebar/RatingsFilter";
//import GuestRatingFilters from "../hotel-list/sidebar/GuestRatingFilters";
//import StyleFilter from "../hotel-list/sidebar/StyleFilter";
//import NeighborhoddFilter from "../hotel-list/sidebar/NeighborhoddFilter";
//import PirceSlider from "../hotel-list/sidebar/PirceSlider";
//import MainFilterSearchBox from "../hotel-list/hotel-list-v2/MainFilterSearchBox";
// import DateSearchEvents from "../hero/hero-events/DateSearchEvents";
import { memo, useState } from "react";
import { useRouter } from "next/router";
import { UICleanup } from "@/helpers/universal";
import DateSearchEvents from "./specialSearch/DateSearchEvents";
import TagsFilter from "./specialSearch/TagsFilter";
import LocationSearch from "./specialSearch/LocationSearch";
import CategorySearch from "./specialSearch/CategorySearch";

const SearchFilter3Const = () => {

  const [params, setParams] = useState({})
  
  const router = useRouter();
  const {query} = router;
  const queryDate = query['event-date'] ?? null;


  const [dates, setDates] = useState(process_qdates());
  const [tags, setTags] = useState([]);


 function process_qdates(){
  let dateArr = null;
  if(queryDate?.length > 0){
    if(queryDate.includes("..")){
      dateArr = queryDate.split("..")
    }else{
      dateArr = [queryDate]
    }
  }
  return dateArr
}
  if(tags?.length > 0){
    params['tags'] = tags.join(',')
  }  
  const push_url = {
    pathname: '/explore/events',
    query: {...params},
  } 
  return (
    <div className='px-3'>
      <div className="sidebar__item">
              <h5 className="text-13 fw-600 mb-10 gray_text text-uppercase">Category </h5>
              <CategorySearch  params={params} setParams={setParams} query={query}/>
      </div>

      <div className="sidebar__item">
              <h5 className="text-13 fw-600 mb-10 gray_text text-uppercase">Region </h5>
              <LocationSearch  params={params} setParams={setParams} query={query}/>
      </div>

      <div className="sidebar__item z-2">
              <h5 className="text-13 fw-600 mb-10 gray_text text-uppercase">Event Date</h5>
              <DateSearchEvents dates={dates} setDates={setDates} params={params} setParams={setParams} query={query}/>
      </div>

      <div className="sidebar__item">
        <h5 className="text-13 fw-600 mb-10 gray_text text-uppercase">Search by key word(s)</h5>
        <div className="single-field relative d-flex items-center py-10">
          <input
            onChange={(e) => {setParams({...params, search_keywords : e.target.value})}}
            className="border-light text-dark-1 rounded-4 px-2 w-100"
            type={'text'}
            placeholder="e.g. Mchomo Party"
          />{/* 
          <button type="submit" className="absolute d-flex items-center h-full">
            <i className="icon-search text-20 px-15 text-dark-1" />
          </button> */}
        </div>
      </div>
      {/* End search box */}

      <div className="sidebar__item">
        <h5 className="text-13 fw-600 mb-10 gray_text text-uppercase">
          <span className='group_icon'> <i className="las la-tags"></i></span>
          Popular Tags
        </h5>
        <div className="sidebar-checkbox">
          <TagsFilter query={query} tags={tags} setTags={setTags}/>
        </div>
      </div>

      
     {/*  <div className="sidebar__item">
        <h5 className="text-13 fw-600 mb-10 gray_text text-uppercase">Deals</h5>
        <div className="sidebar-checkbox">
          <div className="row y-gap-5 items-center">
            <DealsFilter />
          </div>
        </div>
      </div>

      <div className="sidebar__item pb-30">
        <h5 className="text-13 fw-600 mb-10 gray_text text-uppercase">Nightly Price</h5>
        <div className="row x-gap-10 y-gap-30">
          <div className="col-12">
            <PirceSlider />
          </div>
        </div>
      </div>

      <div className="sidebar__item">
        <h5 className="text-13 fw-600 mb-10 gray_text text-uppercase">Aminities</h5>
        <div className="sidebar-checkbox">
          <AminitesFilter />
        </div>
      </div>

      <div className="sidebar__item">
        <h5 className="text-13 fw-600 mb-10 gray_text text-uppercase">Star Rating</h5>
        <div className="row x-gap-10 y-gap-10 pt-10">
          <RatingsFilter />
        </div>
      </div>

      <div className="sidebar__item">
        <h5 className="text-13 fw-600 mb-10 gray_text text-uppercase">Guest Rating</h5>
        <div className="sidebar-checkbox">
          <GuestRatingFilters />
        </div>
      </div>

      <div className="sidebar__item">
        <h5 className="text-13 fw-600 mb-10 gray_text text-uppercase">Style</h5>
        <div className="sidebar-checkbox">
          <StyleFilter />
        </div>
      </div>

      <div className="sidebar__item">
        <h5 className="text-13 fw-600 mb-10 gray_text text-uppercase">Neighborhood</h5>
        <div className="sidebar-checkbox">
          <NeighborhoddFilter />
        </div>
      </div>

      <div className="sidebar__item -no-border position-relative">
        <Map />
      </div> */}
      <div className="filter_actions p-2 px-3">
          <button
            className="btn btn-theme radius-30"
            onClick={() => {
              router.push(push_url,push_url, {shallow: true});
              UICleanup();
            }}
          >
            <i className="las la-search-location mr-10"></i>
            Search
          </button>
      </div>
    </div>
  );
};

const SearchFilter3 = memo(SearchFilter3Const);
export default SearchFilter3;
