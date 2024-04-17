import Router from "next/router";
import { useState } from "react";
// import CategorySearch from "./CategorySearch";
//import DateSearchEvents from "./DateSearchEvents";
//import LocationSearch from "./LocationQuery";
import CategorySearch from "./specialSearch/CategorySearch";
import DateSearchEvents from "./specialSearch/DateSearchEvents";
import LocationSearch from "./specialSearch/LocationSearch";


const MainFilterSearchBox = ({category, setCategory, dates, setDates, categories, locations}) => {
  const [params, setParams] = useState({});

  return (
    <>
      <div data-aos="fade-up" className="mainSearch -w-900 bottom-0  z-2  px-20 py-10 lg:px-20 lg:pt-5 lg:pb-20 rounded-4 shadow-1  position-relative" style={{background: '#5454545c'}}>
        <div className="button-grid row d-flex pt-28">
        <div className="px-2 col-12 col-sm-6 col-lg-4 col-xl-3 sm:px-0">
          <div className="search_query_box">
            <h4 className="search_label  ls-2 lh-16">
            Category 
          </h4>
          <CategorySearch categories={categories}  params={params} setParams={setParams} category={category} setCategory={setCategory}/></div>
        </div>
        <div className="px-2 col-12 col-sm-6 col-lg-4 col-xl-3 sm:px-0">
         <div className="search_query_box"> <h4 className="search_label  ls-2 lh-16">
            Location 
          </h4>
          <LocationSearch  params={params} locations={locations} setParams={setParams}/></div></div>

          <div className="px-2 col-12 col-lg-4 col-xl-3 sm:px-0 searchMenu-date js-form-dd js-calendar">
            <div className="search_query_box">
              <h4 className="search_label  ls-2 lh-16">
                Date range 
              </h4>
              <DateSearchEvents dates={dates} setDates={setDates} params={params} setParams={setParams}/>
            </div>
          </div>

          <div className="button-item col-12 col-xl-3 px-0">
            <button style={{maxWidth: 200}}
              className="btn mainSearch__submit py-2 px-0 col-12 radius-30"
              onClick={() => Router.push({pathname: '/explore/events', query: {...params}})}
            >
              <i className="icon-search text-20 mr-10" />
              Search
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainFilterSearchBox;
