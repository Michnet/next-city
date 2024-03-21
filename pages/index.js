//import Head from "next/head";
//import Image from "next/image";
//import styles from "@/styles/Home.module.css";
import useSWR  from "swr";
import { advancedFetchListingsUrl, fetcher, getDirTerms } from "@/helpers/rest";
import Layout from "@/components/layouts/Layout";
import { cleanHtml, shuffleArray } from "@/helpers/universal";
import { PriceView } from "@/components/UI/PriceView";
import { siteSettings } from "@/helpers/base";
import Link from "next/link";
import { Client } from "react-hydration-provider";
import Slider from "react-slick"
import { fadingSlide, responsiveCarousel, largeResp, variableWidth } from "@/helpers/sliders";
import { useEffect } from 'react';
import ListingCard from './../components/UI/Listings/cards/ListingCard';
import ActivityCard1 from "@/components/UI/Listings/cards/ActivityCard1";
import { DualColorHeader, SectionHeader } from "@/components/UI/Partials";
import ListingCard2 from "@/components/UI/Listings/cards/ListingCard2";
import { TermIcon } from "@/components/UI/partials/termLinks";
import ActivityCard2 from "@/components/UI/Listings/cards/ActivityCard2";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import Splider from "@/components/UI/partials/Splider";
import EventCard from "@/components/UI/Listings/cards/EventCard";
import EventCard2 from "@/components/UI/Listings/cards/EventCard2";
import EventCard3 from "@/components/UI/Listings/cards/EventCard3";
import EventCard4 from "@/components/UI/Listings/cards/EventCard4";
import ListingCard3 from "@/components/UI/Listings/cards/ListingCard3";


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
      per_page: 30
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
  
    async function serverQuery(){
      await getEvCats();
      await  getBusyLocs();
      await getTopLocs();
    }
  
    await serverQuery();
  
    return {
      props: {
        serverObj: serverObj,
      }
    }
  }

export default function Home(props) {
    const {serverObj} = props;
   const {eventCategories, topLocations, busyLocations} = serverObj ?? {};

  let load={_fields : `address, id,title,slug,fields,ticket_min_price_html,event_date,featured_media,featured,rating,acf,short_desc,page_views,level,category,_links,type, gallery,locations,xtra_large_thumb`, 
  listing_type:'event', per_page: 10}

  let fetchy = true;
  useEffect(() => {
    return () => {
      fetchy = false;
    }
  },[]);
  

  const { data:listings, error } = useSWR(fetchy ? advancedFetchListingsUrl({...load, _embed : true, 'event-date':'any-day' }) : null, fetcher, { revalidateIfStale: false, revalidateOnFocus: false, revalidateOnReconnect: true });

  console.log('listings', listings)

  const isLoadingInitialData = !listings && !error;
  const isEmpty = listings?.length === 0;

  const splideViews = {
     640: { perPage: 2, }
    }

    var s_settings = {
        dots: false,
        infinite: true,
        speed: 500,
        variableWidth: true,
        slidesToScroll: 1
      };

  return (
    <>
      <Client>

<div className="page-content">

<div className="card card-style mx-0 mb-0 rounded-0" style={{height: '230px', backgroundImage: 'url("/images/listing/5m.jpg")'}}>
			<div className="card-bottom mb-4">
				<h1 className="color-white text-center mb-n1 font-24">Where are you going?</h1>
				<p className="color-white text-center mb-3 ">Have a holiday you'll never forget!</p>
			</div>
			<div className="card-overlay bg-gradient rounded-0"></div>
		</div>

        <div className="content mt-n4">
            <div className="search-box bg-theme color-theme rounded-m shadow-l">
                <i className="fa fa-search"></i>
                <input type="text" className="border-0" placeholder="Search for a place... (try island)" data-search/>
				<a href="#" className="clear-search disabled no-click mt-0"></a>
				<a href="#" data-menu="menu-filter" className="color-theme"><i className="fa fa-sliders me-n3"></i></a>
            </div>
            <div className="search-results disabled-search-list mt-3">
                <div className="card card-style mx-0 px-2 p-0 mb-0">
                    <a href="#" className="d-flex py-2" data-filter-item data-filter-name="all maldives tropical island escape">
                        <div>
                            <img src="/images/travel/6s.jpg" className="rounded-sm me-3" width="50" alt="img"/>
                        </div>
                        <div>
                            <span className="color-highlight font-400 d-block pt-0 text-uppercase font-10">Tropical Island</span>
                            <strong className="color-theme font-16 d-block mt-n2">Maldives</strong>
                        </div>
                        <div className="ms-auto text-end align-self-center pe-2">
                            <h5 className="line-height-xs font-18 pt-3">$1450</h5>
                            <span className="font-10 d-block mt-n2">For 7 Nights</span>
                        </div>
                    </a>
                    <a href="#" className="d-flex py-2" data-filter-item data-filter-name="all weekend iceland escape explore hike">
                        <div>
                            <img src="/images/travel/7s.jpg" className="rounded-sm me-3" width="50" alt="img"/>
                        </div>
                        <div>
                            <span className="color-highlight font-400 d-block pt-0 text-uppercase font-10">Weekend Escape</span>
                            <strong className="color-theme font-16 d-block mt-n2">Iceland</strong>
                        </div>
                        <div className="ms-auto text-end align-self-center pe-2">
                            <h5 className="line-height-xs font-18 pt-3">$675</h5>
                            <span className="font-9 d-block mt-n2">For 3 Days</span>
                        </div>
                    </a>
                    <a href="#" className="d-flex py-2" data-filter-item data-filter-name="all cave swim explore deep dive">
                        <div>
                            <img src="/images/travel/5s.jpg" className="rounded-sm me-3" width="50" alt="img"/>
                        </div>
                        <div>
                            <span className="color-highlight font-400 d-block pt-0 text-uppercase font-10">Cave Exploring</span>
                            <strong className="color-theme font-16 d-block mt-n2">Nicaragua</strong>
                        </div>
                        <div className="ms-auto text-end align-self-center pe-2">
                            <h5 className="line-height-xs font-18 pt-3">$350</h5>
                            <span className="font-9 d-block mt-n2">For 3 Dives</span>
                        </div>
                    </a>
                    <a href="#" className="d-flex py-2" data-filter-item data-filter-name="all mountain cabin tent forest">
                        <div>
                            <img src="/images/travel/1s.jpg" className="rounded-sm me-3" width="50" alt="img"/>
                        </div>
                        <div>
                            <span className="color-highlight font-400 d-block pt-0 text-uppercase font-10">Private Escape</span>
                            <strong className="color-theme font-16 d-block mt-n2">Mount Hellen</strong>
                        </div>
                        <div className="ms-auto text-end align-self-center pe-2">
                            <h5 className="line-height-xs font-18 pt-3">$1250</h5>
                            <span className="font-9 d-block mt-n2">7 Days + Cabin</span>
                        </div>
                    </a>
                    <a href="#" className="d-flex py-2" data-filter-item data-filter-name="all ocean cruise ship yacht swim">
                        <div>
                            <img src="/images/travel/4s.jpg" className="rounded-sm me-3" width="50" alt="img"/>
                        </div>
                        <div>
                            <span className="color-highlight font-400 d-block pt-0 text-uppercase font-10">Ocean Cruise</span>
                            <strong className="color-theme font-16 d-block mt-n2">Dubrovnik</strong>
                        </div>
                        <div className="ms-auto text-end align-self-center pe-2">
                            <h5 className="line-height-xs font-18 pt-3">$2350</h5>
                            <span className="font-9 d-block mt-n2">7 Days + Cruise</span>
                        </div>
                    </a>

                </div>
            </div>
        </div>
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

		
    
    <Splider height={100} options={{pagination: false, arrows: false, height: 100, autoWidth: true, wheel: true, padding: { left: 0, right: 15}, perPage:1, autoplay: true, perMove: 1, interval:4000, type:'loop'}}>
    {
                eventCategories?.map((cat) => {
                    return <TermIcon flipped item={cat}/>
                })
            }
    </Splider>

    <div className="divider mt-4"></div>

   <SectionHeader iconClass={'far fa-clock'} bgClass={'bg-mint-dark'} exClass='px-3 mb-2' link={'See All'} title={'Latest Events'} subTitle={'Your early bird advantage'}/>
   <Splider height={325} options={{arrows: false, wheel:false, height: 250, autoWidth: true, padding: { left: 0, right: 15}, perPage:1, autoplay: false, perMove: 1, interval:6000, type:'loop'} }>
      {listings?.length > 0 ? 
          listings.map((li) => {
           return <EventCard2 width={300} key={li.id} listing = {li}/>
          })
          :
          <></>
        }
    </Splider>


    <div className="d-flex px-3 mb-2">
        <div className="align-self-center">
            <h4 className="mb-0">Last Minute Deal</h4>
        </div>
        <div className="align-self-center ms-auto">
            <a href="#" className="font-12">View All</a>
        </div>
    </div>

    <Slider  {...fadingSlide} responsive = {[...largeResp]}>
      {listings?.length > 0 ? 
          listings.map((li) => {
            let {id, title, short_desc, event_date, page_views, rating, acf, locations, level, ticket_min_price_html, xtra_large_thumb, gallery, slug} = li;

            return <EventCard3 width={'inherit'} listing={li} key={id}/>
          })
          :
          <></>
        }
    </Slider>


    <SectionHeader iconClass={'far fa-heart'} bgClass={'bg-twitter'} exClass='px-3 mb-2' link={'See All'} title={'Most Liked'} subTitle={'Meet the favourites'}/>
   <Splider height={130} options={{arrows: false, navigation: false, wheel:false, height: 'auto', gap: 10, autoWidth: true, padding: { left: 10, right: 15}, perPage:1, autoplay: false, perMove: 1, interval:6000, type:'loop'}}>
      {listings?.length > 0 ? 
          listings.map((li) => {
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
      {listings?.length > 0 ? 
          listings.map((li, ind) => {
            if(ind < 2){
            return <div className="col-12 p-0"><ListingCard2 exClass={'m-3 mt-0'} key={li.id} listing = {li}/></div>
            }
          })
          :
          <></>
        }
      </div>
</div>
  <div className="col-12 col-md-4 px-0">
    <Client><div className="content mt-2 mb-n3">
  <div className="row gap-1">
        {listings?.length > 0 ? 
          shuffleArray(listings).map((li, ind) => {
            let {id} = li;
            if(ind < 2){
               return <ListingCard3 listing={li} key={id}/>
            }
          })
          :
          <></>
        }
  </div>
</div></Client>
</div>
</div>


        <Client><div className="card card-style">
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
					
          {listings?.length > 0 ? 
            listings.map((li) => {
              let {id, title, short_desc, event_date, page_views, rating, acf, locations, level, ticket_min_price_html, xtra_large_thumb, gallery, slug} = li;
              return <Link href="#" className="d-flex mb-3" data-menu="menu-travel-sample">
                      <div>
                        <img src={xtra_large_thumb} className="object-cover rounded-sm me-3" width="70" height="70"/>
                      </div>
                      <div>
                        <span className="color-highlight font-300 d-block text-uppercase font-10">01 - 07 August 2025</span>
                        <strong className="color-theme font-16 d-block mt-n2 mb-n2 truncate">{cleanHtml(title.rendered)}</strong>
                        <span className="font-11 color-theme opacity-30 d-block pb-2 pt-2"><i className="fa fa-map-marker pe-2"></i>Maldives, Ocean</span>
                      </div>
                      <div className="align-self-center ms-auto">
                        <i className="fa fa-arrow-right font-12 color-theme opacity-20"></i>
                      </div>
                    </Link>
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
		</div></Client>


    <div className="footer card card-style">
        <a href="#" className="footer-title"><span className="color-highlight">LyveCity</span></a>
        <p className="footer-text"><span><i className="bi bi-pin-map"/>Closer to the action </span><br></br>{siteSettings.description}</p>
        <div className="text-center mb-3">
            <a href="#" className="icon icon-xs rounded-sm shadow-l me-1 bg-facebook"><i className="fab fa-facebook-f"></i></a>
            <a href="#" className="icon icon-xs rounded-sm shadow-l me-1 bg-twitter"><i className="fab fa-twitter"></i></a>
            <a href="#" className="icon icon-xs rounded-sm shadow-l me-1 bg-phone"><i className="fa fa-phone"></i></a>
            <a href="#" data-menu="menu-share" className="icon icon-xs rounded-sm me-1 shadow-l bg-red-dark"><i className="fa fa-share-alt"></i></a>
            <a href="#" className="back-to-top icon icon-xs rounded-sm shadow-l bg-dark-light"><i className="fa fa-angle-up"></i></a>
        </div>
        <p className="footer-copyright">Copyright &copy; Enabled <span id="copyright-year">2024</span>. All Rights Reserved.</p>
        <p className="footer-links"><a href="#" className="color-highlight">Privacy Policy</a> | <a href="#" className="color-highlight">Terms and Conditions</a> | <a href="#" className="back-to-top color-highlight"> Back to Top</a></p>
        <div className="clear"></div>
    </div>

</div>
</Client>
    </>
  );
}
