//import Head from "next/head";
//import Image from "next/image";
//import styles from "@/styles/Home.module.css";
import useSWR  from "swr";
import { advancedFetchListingsUrl, fetcher } from "@/helpers/rest";
import Layout from "@/components/layouts/Layout";
import { cleanHtml, shuffleArray } from "@/helpers/universal";
import { PriceView } from "@/components/UI/PriceView";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { siteSettings } from "@/helpers/base";
import Link from "next/link";


export default function Home() {

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

    <div className="content notch-clear">
        <div className="d-flex pt-2">
            <div className="align-self-center me-auto">
                <strong className="text-uppercase opacity-60 font-12">Welcome</strong>
                <h1 className="mt-n2 font-30">Explore</h1>
            </div>
            <div className="align-self-center ms-auto mt-1">
                <a href="#" className="d-block"><img src="images/pictures/6s.jpg" className="img-fluid shadow-xl rounded-circle" width="52" alt="img"/></a>
            </div>
        </div>
    </div>

    <div className="content mt-n1">
        <div className="search-box bg-theme color-theme rounded-m shadow-l">
            <i className="fa fa-search"></i>
            <input type="text" className="border-0" placeholder="Search for a place... (try island)" data-search/>
    <a href="#" className="clear-search disabled mt-0"><i className="fa fa-times color-red-dark"></i></a>
        </div>
        <div className="search-results disabled-search-list mt-3">
            <div className="card card-style mx-0 px-2 p-0 mb-0">
                <a href="#" className="d-flex py-2" data-filter-item data-filter-name="all maldives tropical island escape">
                    <div>
                        <img src="images/travel/6s.jpg" className="rounded-sm me-3" width="50" alt="img"/>
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
                        <img src="images/travel/7s.jpg" className="rounded-sm me-3" width="50" alt="img"/>
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
                        <img src="images/travel/5s.jpg" className="rounded-sm me-3" width="50" alt="img"/>
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
                        <img src="images/travel/1s.jpg" className="rounded-sm me-3" width="50" alt="img"/>
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
                        <img src="images/travel/4s.jpg" className="rounded-sm me-3" width="50" alt="img"/>
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

    <div className="d-flex px-3 mb-n3">
        <div className="align-self-center">
            <h4 className="mb-0">Recommended</h4>
        </div>
        <div className="align-self-center ms-auto">
            <a href="#" className="font-12">View All</a>
        </div>
    </div>

    <Splide  options={{height: 300, wheel: true, padding: { left: 0, right: 15}, autoplay: true, perMove: 2, interval:4000, type:'loop', perPage: 4, breakpoints: {...splideViews}} }>
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

    <div className="card card-style" style={{backgroundImage:'url("images/travel/6m.jpg")', height: '260px'}}>
        <div className="card-top p-3">
            <a href="#" data-menu="menu-reserve" className="btn btn-s bg-white color-black rounded-s scale-box font-700 text-uppercase float-end">Get Offer</a>
        </div>
        <div className="card-bottom m-2">
            <div className="d-block px-2 py-2 rounded-m">
      <div className="d-flex">
        <div className="pe-3">
          <h1 className="color-white font-23 font-800">Maldive Islands</h1>
          <p className="color-white font-12 mb-0 line-height-s opacity-70">Enjoy an amazing week on the most beautiful islands on earth.</p>
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


<div className="d-flex px-3">
  <div className="align-self-center">
    <h4 className="mb-0">Great Deals</h4>
  </div>
  <div className="align-self-center ms-auto">
    <a href="#" className="font-12">View All</a>
  </div>
</div>

<div className="content mt-2 mb-n3">
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
</div>


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
