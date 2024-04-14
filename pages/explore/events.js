// import ActivityCarousel from "~/components/activity/ActivityCarousel";
import ExplorerFilter from "@/components/UI/search/ExplorerFilter";
import SearchForm2 from "@/components/UI/search/SearchForm2";
import TermsCarousel from "@/components/UI/Listings/TermsCarousel";
import SiteHead from "@/components/UI/SiteHead";
import { useRouter } from "next/router";
import { Suspense, useState } from "react";
import { Client } from "react-hydration-provider";
import Search from "@/components/UI/search/Search";
import { useRecoilValue } from "recoil";
import { UISizes } from "@/contexts/atoms";
import ActivityCarousel from "@/components/UI/Listings/ActivityCarousel";
import EventCard3 from "@/components/UI/Listings/cards/EventCard3";
import Splider from "@/components/UI/partials/Splider";
import HeaderWrapper from "@/components/layouts/partials/HeaderWrapper";
import Header from "@/components/layouts/partials/Header";
import { advancedFetchListings } from "@/helpers/rest";
import Slider from "react-slick";
import { fadingSlide, largeResp } from "@/helpers/sliders";
import MainMenuBtn from "@/components/layouts/partials/MainMenuBtn";
import EventsCarousel from "@/components/UI/Listings/EventsCarousel";
import { closeMenus } from "@/helpers/appjs";
//import { AvatarsRow } from "~/appComponents/components/skeletons/React-content-loader/Skeletons";
//import SiteHead from "~/appComponents/components/SiteHead";

export async function getStaticProps() {

  let serverObj = {};

  async function topListings(){
    let thumbsize = 'xtra_large_thumb'
    let load={_fields : `id,title,slug,fields,ticket_min_price_html,event_date,featured_media,featured,rating,acf,short_desc,page_views,level,category,_links,type, gallery,locations,${thumbsize}`, 
    listing_type:'event', per_page: 5, 'event-day':'any-day'};

    const list = await advancedFetchListings(load);
    if(list){
      serverObj.topList = list;
    }
  }

  await topListings();

  return {
    props: {
       ...serverObj,
      settings : {
        mMenu: 'show',
        mMenuContent:{
          icon : 'las la-filter', 
          btnProps:{
          'data-menu' : "listingSidebar"}
          
      },
      noHeader: true
    },
    revalidate: 6000, // In seconds
  }
}
}


const ExploreEvents = ({topList}) => {
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
     <div className="page-content" style={{overflow: 'initial'}}>
     {isTab ? <HeaderWrapper header_id={'explore_nav'} innerClass={'flex_row justify-between'}>
        <MainMenuBtn/>
        <ExplorerFilter/>
     </HeaderWrapper> : <Header headerTitle='Explore' headerClass={'header-always-show'}/>}
      <section className="p-0">
          <div className="container-fluid mw-100 p-0">
            
            <div className="row flex-column flex-md-row flex-md-nowrap m-0">
            
            <Client>{!isTab &&  <div id={"explore_nav"}  className="col-12 col-md-auto search_filter bg-theme no-scrollbar sticky_col shadow-1" style={{zIndex: 5, maxWidth: isTab ?  '100%' : '230px'}}>
               <ExplorerFilter/>
               <div className="sidebar md:d-none mt-20">
                  <SearchForm2/>
               </div>
            </div>}</Client>
            <div className="explore_content col minw-0 p-md-2 p-0">
              <div className="inner_section mb-4">
                <Slider  {...fadingSlide} responsive = {[...largeResp]} >
                {topList?.length > 0 ? 
                    topList.map((li) => {
                      let {id} = li;
                      return <EventCard3 width={'inherit'} listing={li} key={id} exClass='m-0 radius-0'/>
                    })
                    :
                    <></>
                  }
              </Slider>
              </div>
              <div className="inner_section mb-4">
                 <Suspense fallback={'Loading'}><TermsCarousel /* items={categories} */ queryKey={'category'} queryLink={'/explore/events?category='} exClass={'pt-10'} slug={'events'}  type={'dir_cats'} infinity/></Suspense>
              </div>
              <>{query && Object.keys(query).length > 0 ? 
              <><div className="p-2">
              {showHint ? <div className="query_hint  text-white ps-3">
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
                    <ActivityCarousel exCardClass={'me-2'} title={'Latest Events'} subtitle={'Fresh and New Events'} icon={<i className="bi bi-calendar-plus"/>} limit={4} cardType={4} exClass={'px-0'} cardWidth={300} shadowHeight={144}/>
              </div>

              {!query || sort !== 'top-rated' && <div className="inner_section px-2 mt-20">
                    <ActivityCarousel mini noFallback cardWidth={200} exCardClass={'_mini ms-0 me-2'} sort={'top-rated'} title={'Top rated'}  icon={<i className="bi bi-stars"/>} limit={10} cardType={2} exClass={'px-0'}  shadowHeight={144}/>
              </div>}

              {!query || eventDate !== 'this-week' && <div className="inner_section px-2 mt-20">
                    <EventsCarousel mini noFallback cardWidth={350} exCardClass={'_mini'} eventDate={'this-week'} title={'Happening this week'}  iconClass={'fas fa-calendar-week'} limit={10} cardType={5} exClass={'px-0'} height={240} spliderOptions={{gap: 15, arrows: false, wheel:false, height: 250, autoWidth: true, padding: { left: 10, right: 15}, perPage:1, autoplay: true, perMove: 1, interval:6000, type:'loop'}}/>
              </div>}


              <div className="inner_section">
                  <Search cardExClass={'mx-0'}/>
                  {/* <ActivityMasonry  limit={3} cardType={2} columns={3} itemWidth={'auto'} exClass={'px-10'}/> */}
              </div>

              {/* <div className="inner_section mb-40">
                  <ActivityGrid title={'This Month'} subtitle={'Update your calendar'} icon={<FieldTimeOutlined/>} exClass={'px-10'} queryObj={eventsThisMonth} limit={3} noButton cardType={2} columns={3} columnClass={'col-12 col-sm-6 col-md-4 mb-10'}/>
              </div> */}
            </div>
          </div>
          </div>
      </section>
      </div>
      <div className="menu menu-box-left search_filter bg-theme" tabIndex="-1" id="listingSidebar" >
                <div class="menu-title"><h1>Filter Results</h1>
                    <p class="color-highlight">Filter your Search Results</p>
                      <i className="fas fa-times close-menu" onClick={() => closeMenus()}/>
                  </div>
                <div className="offcanvas-body pb-0">
                  <aside className="sidebar  xl:d-block">
                    <SearchForm2/>
                  </aside>
                </div>
            </div>
    </>
  );
};


/* const PageLayout = dynamic(() => import('~/appComponents/core//PageLayout'));
import HeaderWrapper from './../../components/layouts/partials/HeaderWrapper';

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
