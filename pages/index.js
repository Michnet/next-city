//import Head from "next/head";
//import Image from "next/image";
//import styles from "@/styles/Home.module.css";
// import useSWR  from "swr";
import { advancedFetchListings, getDirTerms } from "@/helpers/rest";
// import {shuffleArray } from "@/helpers/universal";
import { siteSettings } from "@/helpers/base";
import { Client } from "react-hydration-provider";
//import Slider from "react-slick"
//import { fadingSlide, largeResp } from "@/helpers/sliders";
import {useMemo } from 'react';
// import ActivityCard1 from "@/components/UI/Listings/cards/ActivityCard1";
import {SectionHeader } from "@/components/UI/Partials";
// import ListingCard2 from "@/components/UI/Listings/cards/ListingCard2";
import { TermIconBox } from "@/components/UI/partials/termLinks";
import Splider from "@/components/UI/partials/Splider";
import EventCard2 from "@/components/UI/Listings/cards/EventCard2";
//import EventCard3 from "@/components/UI/Listings/cards/EventCard3";
// import EventCard4 from "@/components/UI/Listings/cards/EventCard4";
//import ListingCard3 from "@/components/UI/Listings/cards/ListingCard3";
import SearchField from "@/components/UI/search/SearchField";
//import EventCard5 from "@/components/UI/Listings/cards/EventCard5";
import { randomEither } from '@/helpers/universal';
import TagsCloud from "@/components/listing/partials/TagsCloud";
//import HeroSearch from "@/components/UI/search/HeroSearch";
import AddListingCard from "@/components/UI/partials/AddListingCard";
import Link from "next/link";
import { useRouter } from "next/router";
import Mirrored from "@/components/UI/partials/Mirrored";


export async function getStaticProps() {

    let taxfields = "id,count,extra_meta,term_meta,description,parent,name,slug",
    serverObj = {};
  
    const catsFilterArr = {
      _fields : taxfields,
      parent_slug: 'events',
      per_page: 20
    }
  
    const busyLocsQuery = {
      _fields : taxfields,
      orderby: 'count',
      order: 'desc',
      hide_empty : true,
      per_page: 10
    }
    const topLocsQuery = {
      _fields : taxfields,
      parent: 0,
      per_page: 100
    }
    //Get event categories
    async function getEvCats(){
      const eCats = await getDirTerms('categories', catsFilterArr);
      if(eCats){
       serverObj.eventCategories = eCats;
      }
    }
  
    //Get busy locations
    async function getBusyLocs(){
      const busyLocs = await getDirTerms('locations', busyLocsQuery);
      if(busyLocs){
       serverObj.busyLocations = busyLocs;
      }
    }
  
    //Get top locations
    async function getTopLocs(){
      const topLocs = await getDirTerms('locations', topLocsQuery);
      if(topLocs){
       serverObj.topLocations = topLocs;
      }
    }

    async function topListings(){
      let thumbsize = 'xtra_large_thumb'
      let load={_fields : `id,title,slug,fields,ticket_min_price_html,event_date,featured_media,featured,rating,acf,short_desc,page_views,level,category,_links,type, gallery,locations,${thumbsize}`, 
      listing_type:'event', per_page: 5, 'event-date':'any-day',sort:'latest', ignorePriority:true};
  
      const list = await advancedFetchListings(load);
      if(list){
        serverObj.latestList = list;
      }
    }
  
  
    async function serverQuery(){
      await topListings();
      await getEvCats();
      await  getBusyLocs();
      await getTopLocs();
    }
  
    await serverQuery();
  
    return {
      props: {
        serverObj: serverObj,
        seoMeta:{title: 'Home'},
        headerTitle: 'LyveCity',
        settings:{
          autoShowHeader: true
        }
      }
    }
  }



export default function Home(props) {
    const {serverObj} = props;
   const {eventCategories, topLocations, busyLocations, latestList} = serverObj ?? {};
   
  let imgArr = eventCategories.map((ct) => {
    let {term_meta, id} = ct;
    let {image_url} = term_meta;
    return image_url;
  });

  const router = useRouter();

  function tagClick(tag){
    router.push(`/explore/events?region=${tag.slug}`);
  }

  const cachedCategories = useMemo(() => eventCategories);
  //const cachedLocations = useMemo(() => eventCategories);

  return (
    <>
      <Client>

<div className="page-content">

      <div className="card card-style overflow-visible mx-0 mb-0 rounded-0 w-100">
        <Mirrored coverTop topPadding={0} skewDegrees={0}  skewDir={'-'} YDistance={250}>
          <div className="w-100 bg-cover" style={{backgroundPosition: 'center', height: '280px', backgroundImage: `url("${randomEither(imgArr)}")`}}/>
        </Mirrored>
        <div className="card-bottom mb-5 px-3 d-flex flex-column align-items-center">
          <h1 className="color-white text-center mb-n1 font-24 w-75">Great events all around you?</h1>
          <p className="color-white text-center mb-3 ">What experiences are you looking for today?</p>
        </div>
        <div className="card-overlay bg-gradient rounded-0"></div>
      </div>


    <SearchField exClass='mt-n4 mx-auto' styleObj={{maxWidth: '85%', width: '600px'}}/>

    {/* <HeroSearch categories={cachedCategories} topLocations={topLocations}/> */}

    <SectionHeader exClass='px-3 mb-4 justify-center text-center'  title={'Event Categories'} subTitle={'Explore By Category'}/>

   {/*  <Splider exClass="mb-4" height={100} options={{pagination: false, arrows: false, height: 100, autoWidth: true, wheel: true, padding: { left: 10, right: 15, top:10}, perPage:1, autoplay: true, perMove: 1, interval:4000, type:'loop'}}>
    {
                eventCategories?.map((cat) => {
                    return <TermIconBox exClass='mx-1 h-100 rounded-4' flipped item={cat}/>
                })
            }
    </Splider> */}
    
    <div className='term_links_grid mb-3 sm:px-28 px-2 mx-auto' style={{maxWidth: '600px'}}>
    {
                eventCategories?.map((cat) => {
                    return <TermIconBox width='80px' height='80px' externalTitle exClass='rounded-4' item={cat}/>
                })
            }
            </div>

    <div className="divider mt-3 mb-4"></div>

   <SectionHeader inverted iconClass={'far fa-clock'} color={'dark-dark'} exClass='px-3 mb-2' link={'See All'} title={'Latest Events'} subTitle={'Your early bird advantage'}/>
   <Splider height={300} options={{gap: 15, arrows: false, wheel:false, height: 250, autoWidth: true, padding: { left: 10, right: 15}, perPage:1, autoplay: false, perMove: 1, interval:6000, type:'loop'}}>
      {latestList?.length > 0 ? 
          latestList.map((li) => {
           return <EventCard2 mini contentClass={'px-3'} height={180} width={270} key={li.id} listing = {li}/>
          })
          :
          <></>
        }
    </Splider>

    <section  className="layout-pt-md layout-pb-md  px-30 mb-5 border mx-3">
    <SectionHeader iconClass={'far fa-map'} bgClass={'bg-twitter'} exClass='px-3 mb-2'  title={'Busy Locations'} subTitle={'Top Destinations'}/>
      <div className='tags_row bg-transparent'>
                <div className='row_content' style={{minHeight : '130px'}}>                  
        <TagsCloud dark itemsList={busyLocations} onClickFunc={tagClick}/>
                  </div>
                  </div>
      </section>

    <AddListingCard/>
{/* 
    <SectionHeader iconClass={'far fa-heart'} bgClass={'bg-twitter'} exClass='px-3 mb-2' link={'See All'} title={'Most Liked'} subTitle={'Meet the favourites'}/>
   <Splider height={130} options={{arrows: false, navigation: false, wheel:false, height: 'auto', gap: 10, autoWidth: true, padding: { left: 10, right: 15}, perPage:1, autoplay: false, perMove: 1, interval:6000, type:'loop'}}>
      {latestList?.length > 0 ? 
          latestList.map((li) => {
           return <EventCard4 width={300} key={li.id} listing = {li}/>
          })
          :
          <></>
        }
    </Splider>


    <SectionHeader exClass='mb-4 px-3' link={'See All'} title={'Just Added'} subTitle={'Be the first to know'}/>


<div className="row mb-3">
<div className="col-12 col-md-8 px-0">
  <div className="row">
      {latestList?.length > 0 ? 
          latestList.map((li, ind) => {
            if(ind < 2){
            return <div className="col-12 p-0"><ListingCard2 exClass={'m-3 mt-0'} key={li.id} listing = {li}/></div>
            }
          })
          :
          <></>
        }
      </div>

      <SectionHeader inverted iconClass={'fas fa-store'} color={'magenta-dark'} exClass='px-3 mb-2' link={'See All'} title={'More Listings'} subTitle={'Your early bird advantage'}/>

   <Splider height={240} options={{gap: 15, arrows: false, wheel:false,  autoWidth: true, padding: { left: 10, right: 15}, perPage:1, autoplay: false, perMove: 1, interval:6000, type:'loop'} }>
      {latestList?.length > 0 ? 
          latestList.map((li) => {
           return <EventCard5 width={270} key={li.id} listing = {li}/>
          })
          :
          <></>
        }
    </Splider>
</div>
  <div className="col-12 col-md-4 px-0">
    <Client><div className="content mt-2 mb-n3">
  <div className="row m-bs">
        {latestList?.length > 0 ? 
          shuffleArray(latestList).map((li, ind) => {
            let {id} = li;
            if(ind < 4){
               return <div className='col-6 p-1'><ListingCard3 listing={li} key={id}/></div>
            }
          })
          :
          <></>
        }
  </div>
</div></Client>
</div>
</div>


        <Client><div className="card card-style shadow-0 bg-transparent">
			<div className="content mb-0" id="tab-group-events">
				<h4>Find Fast Travel Places</h4>
				<p className="mb-3">
					Search based on how much free time you have available. Everyone should get a weekend escape!
				</p>
				<div className="divider mb-0"></div>
				<div className="tab-controls" data-highlight="color-highlight">
					<a href="#" className="no-effect font-15 font-600 py-2 border-0 ms-n4" data-active data-bs-toggle="collapse" data-bs-target="#tab-8">7 Days</a>
					<a href="#" className="no-effect font-15 font-600 py-2 border-0 me-n3" data-bs-toggle="collapse" data-bs-target="#tab-9">Weekend Escape</a>
				</div>
				<div className="divider mb-3"></div>
				<div className="clearfix mb-1"></div>
				<div data-bs-parent="#tab-group-events" className="collapse show" id="tab-8">
					
          {latestList?.length > 0 ? 
            latestList.map((li) => {
              let {id, event_date} = li;
              if(event_date && event_date[0]){
                return <ActivityCard1 key={id} listing={li}/>
              }
            })
            :
            <></>
          }
					
				</div>
				
				<div data-bs-parent="#tab-group-events" className="collapse" id="tab-9">
					<a href="#" className="pb-3 d-block" data-menu="menu-travel-sample">
						<img src="/images/travel/6m.jpg" className="rounded-sm img-fluid"/>
						<div>
							<span className="color-highlight font-300 d-block text-uppercase font-10 pt-3">21 - 28 August 2025 - 09:00 AM</span>
							<strong className="color-theme font-20 d-block mt-n2 mb-n2">Island Paradise Escape</strong>
							<span className="font-11 color-theme opacity-30 d-block pb-2 pt-2"><i className="fa fa-map-marker pe-2"></i>Maldives Islands, Indian Ocean</span>
							<div className="clearfix"></div>
						</div>
						<div className="divider mt-3 mb-2"></div>
					</a>
					<a href="#" className="pb-3 d-block" data-menu="menu-travel-sample">
						<div>
							<img src="/images/travel/7m.jpg" className="rounded-sm img-fluid"/>
						</div>
						<div>
							<span className="color-highlight font-300 d-block text-uppercase font-10 pt-3">21 - 28 August 2025 - 09:00 AM</span>
							<strong className="color-theme font-20 d-block mt-n2 mb-n2">Mountain Wellness</strong>
							<span className="font-11 color-theme opacity-30 d-block pb-2 pt-2"><i className="fa fa-map-marker pe-2"></i>Swiss Alps, Europe</span>
							<div className="clearfix"></div>
						</div>
						<div className="divider mt-3 mb-2"></div>
					</a>
					<a href="#" className="mb-3" data-menu="menu-travel-sample">
						<div>
							<img src="/images/travel/9m.jpg" className="rounded-sm img-fluid"/>
						</div>
						<div>
							<span className="color-highlight font-300 d-block text-uppercase font-10 pt-3">21 - 28 August 2025 - 09:00 AM</span>
							<strong className="color-theme font-20 d-block mt-n2 mb-n2">Glacier Lake Diving</strong>
							<span className="font-11 color-theme opacity-30 d-block pb-2 pt-2"><i className="fa fa-map-marker pe-2"></i>Croatia, Europe</span>
							<div className="clearfix"></div>
						</div>
					</a>
				</div>
			</div>
		</div></Client> */}


    <div className="footer card card-style">
        <a href="#" className="footer-title"><span className="color-highlight">LyveCity</span></a>
        <p className="footer-text"><span><i className="bi bi-pin-map"/>Closer to the action </span><br></br>{siteSettings.description}</p>
        {/* <div className="text-center mb-3">
            <a href="#" className="icon icon-xs rounded-sm shadow-l me-1 bg-facebook"><i className="fab fa-facebook-f"></i></a>
            <a href="#" className="icon icon-xs rounded-sm shadow-l me-1 bg-twitter"><i className="fab fa-twitter"></i></a>
            <a href="#" className="icon icon-xs rounded-sm shadow-l me-1 bg-phone"><i className="fa fa-phone"></i></a>
            <a href="#" data-menu="menu-share" className="icon icon-xs rounded-sm me-1 shadow-l bg-red-dark"><i className="fa fa-share-alt"></i></a>
            <a href="#" className="back-to-top icon icon-xs rounded-sm shadow-l bg-dark-light"><i className="fa fa-angle-up"></i></a>
        </div> */}
        <p className="footer-copyright">Copyright &copy; LyveCity <span id="copyright-year">2024</span>. All Rights Reserved.</p>
        <p className="footer-links"><Link href="/support/privacy" className="color-highlight">Privacy Policy</Link> | <Link href="/support/tos" className="color-highlight">Terms and Conditions</Link> | <a href="#" className="back-to-top color-highlight"> Back to Top</a></p>
        <div className="clear"></div>
    </div>
    <div className="divider bg-transparent"/>

</div>
</Client>
    </>
  );
}
