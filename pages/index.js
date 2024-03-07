//import Head from "next/head";
//import Image from "next/image";
//import styles from "@/styles/Home.module.css";
import useSWR  from "swr";
import { advancedFetchListingsUrl, fetcher, getDirTerms } from "@/helpers/rest";
import Layout from "@/components/layouts/Layout";
import { cleanHtml, shuffleArray } from "@/helpers/universal";
import { PriceView } from "@/components/UI/PriceView";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { siteSettings } from "@/helpers/base";
import Link from "next/link";
import { Client } from "react-hydration-provider";


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
    console.log('home props', props);
   const {eventCategories, topLocations, busyLocations} = serverObj ?? {};

  let load={_fields : `id,title,slug,fields,ticket_min_price_html,event_date,featured_media,featured,rating,acf,short_desc,page_views,level,category,_links,type, gallery,locations,xtra_large_thumb`, 
  listing_type:'event', per_page: 5}

  const { data:listings, error } = useSWR(advancedFetchListingsUrl({...load, _embed : true }), fetcher, { revalidateIfStale: false, revalidateOnFocus: true, revalidateOnReconnect: true });

  const isLoadingInitialData = !listings && !error;
  const isEmpty = listings?.length === 0;

  const splideViews = {
     640: { perPage: 2, }
    }

  return (
    <Layout>

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

		<Splide options={{pagination: false, autoWidth: true, padding: { left: 0, right: 15}, autoplay: false, perMove: 2, interval:4000, type:'loop'}}>
            {
                eventCategories?.map((cat) => {
                    let {name, slug, term_meta, id} = cat;
                    let {color, image_url} = term_meta;
                    return <SplideSlide key={id} className="splide__slide text-center me-n2 px-5">
                                <div className="term_box" style={{maxWidth: '75px',}}>
                                    <a href="#"  className="icon icon-xxl rounded-xl bg-cover" style={{width: 60, height: 60, border: `2px solid ${color ?? 'var(--highlight)'}`,  backgroundImage: `url('${image_url}')`}}>
                                    {/* <i className="fa fa-coffee color-brown-dark"></i> */}
                                </a>
                                    <div><span className="d-block  font-500 color-theme truncate-2 lh-1 text-11">{cleanHtml(name)}</span></div>
                                </div>
                            </SplideSlide>
                })
            }
					
					
		</Splide>

		<div className="divider mt-4"></div>

    <div className="d-flex px-3 mb-n3">
        <div className="align-self-center">
            <h4 className="mb-0">Recommended</h4>
        </div>
        <div className="align-self-center ms-auto">
            <a href="#" className="font-12">View All</a>
        </div>
    </div>

    <Splide  options={{height: 300, padding: { left: 0, right: 15}, autoplay: true, perMove: 2, interval:4000, type:'loop', perPage: 4, breakpoints: {...splideViews}} }>
      {listings?.length > 0 ? 
          listings.map((li) => {
            let {id, title, short_desc, event_date, page_views, rating, acf, locations, level, ticket_min_price_html, xtra_large_thumb, gallery, slug} = li;

            return <SplideSlide key={id}>
            <Link href={`/events/${slug}`} className="mx-3" /* data-menu="menu-reserve" */>
                <div className="card card-style me-0 mb-0" style={{backgroundImage:`url('${xtra_large_thumb}')`, height: '250px'}}>
                <div className="card-top p-2">
                  <span className="color-black bg-white px-2 py-1 rounded-xs font-11"><i className="fa fa-star color-yellow-dark pe-2"></i>{rating}</span>
                </div>
                                <div className="card-bottom p-2 px-2">
                                    <h4 className="color-white line-height-s truncate-2">{cleanHtml(title?.rendered)}<br/> Islands</h4>
                  <span className="color-white font-10 opacity-60"><i className="fa fa-map-marker pe-2"></i>{locations[0]?.name}</span>
                    </div>
                    <div className="card-overlay bg-gradient"></div>
                </div>
            </Link>
        </SplideSlide>
          })
          :
          <></>
        }
    </Splide>

    <div className="d-flex px-3 mb-2">
        <div className="align-self-center">
            <h4 className="mb-0">Last Minute Deal</h4>
        </div>
        <div className="align-self-center ms-auto">
            <a href="#" className="font-12">View All</a>
        </div>
    </div>

    <Splide  options={{height: 300, autoplay: true, perMove: 2, interval:4000, type:'fade', perPage: 1 }}>
      {listings?.length > 0 ? 
          listings.map((li) => {
            let {id, title, short_desc, event_date, page_views, rating, acf, locations, level, ticket_min_price_html, xtra_large_thumb, gallery, slug} = li;

            return <SplideSlide key={id}>
            <Link href={`/events/${slug}`} className="mx-3" /* data-menu="menu-reserve" */>
                <div className="card card-style" style={{backgroundImage:`url("${xtra_large_thumb}")`, height: '260px'}}>
                        <div className="card-top p-3">
                            <a href="#" data-menu="menu-reserve" className="btn btn-s bg-white color-black rounded-s scale-box font-700 text-uppercase float-end">Get Offer</a>
                        </div>
                        <div className="card-bottom m-2">
                            <div className="d-block px-2 py-2 rounded-m">
                    <div className="d-flex">
                        <div className="pe-3">
                        <h1 className="color-white font-23 font-800">{cleanHtml(title.rendered)}</h1>
                        <p className="color-white font-12 mb-0 line-height-s opacity-70">{cleanHtml(short_desc)}</p>
                        </div>
                        <div className="w-50 align-self-center text-end ms-auto">
                        <h1 className="color-white">$1.450</h1>
                        <p className="color-white mb-0 mt-n2 font-9 line-height-xs">
                            All Expenses Paid
                        </p>
                        </div>
                    </div>
                            </div>
                        </div>
                        <div className="card-overlay bg-gradient"></div>
                </div>
            </Link>
        </SplideSlide>
          })
          :
          <></>
        }
    </Splide>

<div className="d-flex px-3">
  <div className="align-self-center">
    <h4 className="mb-0">Great Deals</h4>
  </div>
  <div className="align-self-center ms-auto">
    <a href="#" className="font-12">View All</a>
  </div>
</div>

<Client><div className="content mt-2 mb-n3">
  <div className="row">
        {listings?.length > 0 ? 
          shuffleArray(listings).map((li, ind) => {
            let {id, title, short_desc, event_date, page_views, rating, acf, locations, level, ticket_min_price_html, xtra_large_thumb, gallery, slug} = li;
            if(ind < 4){
               return <div className="col-6 ps-2" key={id}>
                    <Link href={`/events/${slug}`} data-menu="menu-reserve" className="card card-style mx-0 mb-3">
                      <div className="card-top m-2">
                        <span className="bg-white color-black font-11 px-2 py-1 font-700 rounded-xs shadow-xxl">25% OFF</span>
                      </div>
                      <img src={xtra_large_thumb} alt="img" width="100" className="img-fluid" style={{height: '180px', objectFit: 'cover'}}/>
                      <div className="p-2">
                        <h4 className="mb-0 truncate-2 text-14">{cleanHtml(title?.rendered)}</h4>
                        <p className="mb-0 font-11 mt-n1 opacity-70"><i className="fa fa-map-marker pe-2"></i>{locations[0]?.name}</p>
                      </div>
                      <div className="divider mb-0"></div>
                      <div className="d-flex flex-row flex-nowrap justify-between p-2 font-12">{ticket_min_price_html && <PriceView preText={''}  exClass={'_inline'} priceHTml={ticket_min_price_html}/> }
                      <span className="float-end font-400 font-11 color-yellow-dark">5 Left</span>
                      </div>
                    </Link>
                  </div>
            }
          })
          :
          <></>
        }
  </div>
</div></Client>


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
					<a href="#" className="d-flex mb-3" data-menu="menu-travel-sample">
						<div>
							<img src="/images/travel/8s.jpg" className="rounded-sm me-3" width="70"/>
						</div>
						<div>
							<span className="color-highlight font-300 d-block text-uppercase font-10">01 - 07 August 2025</span>
							<strong className="color-theme font-16 d-block mt-n2 mb-n2">Island Explorer</strong>
							<span className="font-11 color-theme opacity-30 d-block pb-2 pt-2"><i className="fa fa-map-marker pe-2"></i>Maldives, Ocean</span>
						</div>
						<div className="align-self-center ms-auto">
							<i className="fa fa-arrow-right font-12 color-theme opacity-20"></i>
						</div>
					</a>
					<a href="#" className="d-flex mb-3" data-menu="menu-travel-sample">
						<div>
							<img src="/images/travel/1s.jpg" className="rounded-sm me-3" width="70"/>
						</div>
						<div>
							<span className="color-highlight font-300 d-block text-uppercase font-10">07 - 14 August 2025</span>
							<strong className="color-theme font-16 d-block mt-n2 mb-n2">Woodland Cabin</strong>
							<span className="font-11 color-theme opacity-30 d-block pb-2 pt-2"><i className="fa fa-map-marker pe-2"></i>Mount Rushmore, USA</span>
						</div>
						<div className="align-self-center ms-auto">
							<i className="fa fa-arrow-right font-12 color-theme opacity-20"></i>
						</div>
					</a>
					<a href="#" className="d-flex mb-3" data-menu="menu-travel-sample">
						<div>
							<img src="images/travel/6s.jpg" className="rounded-sm me-3" width="70"/>
						</div>
						<div>
							<span className="color-highlight font-300 d-block text-uppercase font-10">14 - 21 August 2025</span>
							<strong className="color-theme font-16 d-block mt-n2 mb-n2">Island Paradise</strong>
							<span className="font-11 color-theme opacity-30 d-block pb-2 pt-2"><i className="fa fa-map-marker pe-2"></i>Caraibe, Ocean</span>
						</div>
						<div className="align-self-center ms-auto">
							<i className="fa fa-arrow-right font-12 color-theme opacity-20"></i>
						</div>
					</a>
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
{/* <!-- End of Page Content--> */}
    </Layout>
  );
}
