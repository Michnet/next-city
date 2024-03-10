// import ActivityCarousel from "~/components/activity/ActivityCarousel";
//import ExplorerFilter from "~/components/explorer/ExplorerFilter";
//import SearchFilter from "~/components/explorer/SearchFilter";

import dynamic from "next/dynamic";
import TermsCarousel from "@/components/UI/Listings/TermsCarousel";
import SiteHead from "@/components/UI/SiteHead";
import { useRouter } from "next/router";
import { Suspense, useState } from "react";
import { Client } from "react-hydration-provider";
//import Search from "~/routes/search";
import { useRecoilValue } from "recoil";
import { UISizes } from "@/contexts/atoms";
import ActivityCarousel from "@/components/UI/Listings/ActivityCarousel";
//import { AvatarsRow } from "~/appComponents/components/skeletons/React-content-loader/Skeletons";
//import SiteHead from "~/appComponents/components/SiteHead";

export async function getStaticProps() {

  return {
    props: {
      //serverObj: serverObj,
      settings : {
        mMenu: 'show',
        mMenuContent:{
          icon : 'las la-filter', 
          data_bs_toggle : "offcanvas",
          'data_bs_target' : "#listingSidebar"}
      }
    },
    revalidate: 6000, // In seconds
  }
}


const ExploreEvents = () => {
 const {query} = useRouter();
 const {sort, category, tags, region} = query;
 const eventDate = query['event-date'] ?? null;
 const [showHint, setShowHint] = useState(true);
 const {isTab} = useRecoilValue(UISizes);


 function translateDate(string){
 return string.replaceAll("-", " ");
 }

 function translateTags(string){
   let arr = string.split(',');
   let newArr = arr.map((it) => {
      return <span className="pointer">{it.replace("-", " ")}</span>
   });
   return newArr;
 }


  return (
    <>
      <SiteHead title={'Explore Events'}/>
      {/* <section className="layout-pb-sm">
          <div className="row">
            // <ActivityCarousel cardType={4}/>
          </div>
      </section> */}

      <section className="p-0">
          <div className="container-fluid mw-100 p-0">
            <div
                className="offcanvas offcanvas-start search_filter"
                tabIndex="-1"
                id="listingSidebar"
              >
                <div className="offcanvas-header">
                  <h5 className="offcanvas-title" id="offcanvasLabel">
                    Filter Events
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                  ></button>
                </div>

                <div className="offcanvas-body pb-0">
                  <aside className="sidebar  xl:d-block">
                    {/* <SearchFilter/> */}
                  </aside>
                </div>
            </div>
            <div className="row flex-column flex-md-row flex-md-nowrap m-0">
            <Client><div id={"explore_nav"}  className="col-12 col-md-auto search_filter bg-white no-scrollbar sticky_col shadow-1" style={{zIndex: 5, maxWidth: isTab ?  '100%' : '230px'}}>
               {/* <ExplorerFilter/> */}
               {isTab ? <></> : <div className="sidebar md:d-none mt-20">
                  {/* <SearchFilter/> */}
                </div>
                }
            </div></Client>
            <div className="explore_content col minw-0 p-0">
              <div className="inner_section">
                 <Suspense fallback={'Loading'}><TermsCarousel /* items={categories} */ queryKey={'category'} queryLink={'/explore/events?category='} exClass={'mb-30 pt-10'} slug={'events'}  type={'dir_cats'} infinity/></Suspense>
              </div>
              <>{query && Object.keys(query).length > 0 ? 
              <><div className="p-2">
              {showHint ? <div className="query_hint bg-dark-4 text-white p-3 rounded">
                  <p className="mb-2"><span>Exploring {category ? <span><span className="text-info pointer">{translateDate(category)} </span></span> : ''}
                    listings </span>
                    {eventDate ? <span>scheduled for <span className="text-warning pointer">{translateDate(eventDate)}</span></span> : ''}
                    {region ? <span> in <span className="text-info pointer capitalize">{region}</span></span> : ''}
                    {sort ? <span>, starting with the <span className="text-info pointer">{sort}</span></span> : ''}
                    {tags ? <span>, and tagged in <span className="text-success">{translateTags(tags)}</span></span> : ''}
                  </p> 
                  <div><button className="btn btn-xs mb-0 btn-outline-secondary px-3" onClick={() => setShowHint(false)}>Hide</button></div>
              </div> 
              : 
              <button className="btn btn-xs mb-0 btn-secondary px-3" onClick={() => setShowHint(true)}>Show Hints</button> 
              }</div></> : <></>}</>
              <div className="inner_section px-2 mt-20">
                    <ActivityCarousel title={'Latest Events'} subtitle={'Fresh and New Events you may like'} icon={<i className="bi bi-calendar-plus"/>} limit={4} cardType={1} exClass={'px-0'} cardWidth={300} shadowHeight={144}/>
              </div>

              {!query || sort !== 'top-rated' && <div className="inner_section px-2 mt-20">
                    {/* <ActivityCarousel mini noFallback cardWidth={140} exCardClass={'bg-transparent _mini'} sort={'top-rated'} title={'Top rated'}  icon={<i className="bi bi-stars"/>} limit={10} cardType={2} exClass={'px-0'}  shadowHeight={144}/> */}
              </div>}

              {!query || eventDate !== 'this-week' && <div className="inner_section px-2 mt-20">
                    {/* <ActivityCarousel mini noFallback cardWidth={350} exCardClass={'_mini'} eventDate={'this-week'} title={'Happening this week'}  icon={<i className="bi bi-calendar4-week"/>} limit={10} cardType={3} exClass={'px-0'}  shadowHeight={144}/> */}
              </div>}


              <div className="inner_section bg-white">
                  {/* <Search/> */}
                  {/* <ActivityMasonry  limit={3} cardType={2} columns={3} itemWidth={'auto'} exClass={'px-10'}/> */}
              </div>

              {/* <div className="inner_section mb-40">
                  <ActivityGrid title={'This Month'} subtitle={'Update your calendar'} icon={<FieldTimeOutlined/>} exClass={'px-10'} queryObj={eventsThisMonth} limit={3} noButton cardType={2} columns={3} columnClass={'col-12 col-sm-6 col-md-4 mb-10'}/>
              </div> */}
            </div>
          </div>
          </div>
      </section>

     {/*  <section>
          <div className="container">
            <div className="row justify-center text-center m-0">
            <div className="col-auto">
              <div className="sectionTitle -md">
                <h2 className="sectionTitle__title">Special Offers</h2>
                <p className=" sectionTitle__text mt-5 sm:mt-0">
                  These popular destinations have a lot to offer
                </p>
              </div>
            </div>
          </div>
          <div className="row y-gap-20 pt-40 m-0">
            <AddBanner />
          </div>
          </div>
      </section> */}
      {/* End Footer Section */}
    </>
  );
};


/* const PageLayout = dynamic(() => import('~/appComponents/core/Layout/PageLayout'));

ExploreEvents.getLayout = function getLayout({children}) {
  return (
      <PageLayout pageSettings={{
        mMenu: 'show',
        mMenuContent:{
          icon : 'las la-filter', 
          data_bs_toggle : "offcanvas",
          'data_bs_target' : "#listingSidebar"}
      }}>{children}</PageLayout>
  )
}
 */
export default ExploreEvents;
