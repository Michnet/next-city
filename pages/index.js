//import Head from "next/head";
//import Image from "next/image";
//import styles from "@/styles/Home.module.css";
import useSWR  from "swr";
import { advancedFetchListingsUrl, fetcher } from "@/helpers/rest";
import Layout from "@/components/layouts/Layout";
import { cleanHtml } from "@/helpers/universal";


export default function Home() {

  let load={_fields : `id,title,slug,fields,ticket_min_price_html,event_date,featured_media,featured,rating,acf,short_desc,page_views,level,category,_links,type, gallery,locations,xtra_large_thumb`, 
  listing_type:'event', per_page: 5}

  const { data:listings, error } = useSWR(advancedFetchListingsUrl({...load, _embed : true }), fetcher, { revalidateIfStale: false, revalidateOnFocus: true, revalidateOnReconnect: true });

  const isLoadingInitialData = !listings && !error;
  const isEmpty = listings?.length === 0;

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

    <div className="splide double-slider slider-no-dots visible-slider" id="double-slider-1a">
        <div className="splide__track">
            <div className="splide__list">
                {listings?.length > 0 ? 
                  listings.map((li) => {

                    let {id, title, short_desc, event_date, page_views, rating, acf, locations, level, ticket_min_price_html, xtra_large_thumb, gallery, slug} = li;

                    return <div key={id} className="splide__slide">
                    <a href={`/events/${slug}`} className="mx-3" /* data-menu="menu-reserve" */>
                        <div className="card card-style me-0 mb-0" style={{backgroundImage:`url('${xtra_large_thumb}')`}}data-card-height="250">
                        <div className="card-top p-2">
                          <span className="color-black bg-white px-2 py-1 rounded-xs font-11"><i className="fa fa-star color-yellow-dark pe-2"></i>{rating}</span>
                        </div>
                                        <div className="card-bottom p-2 px-2">
                                            <h4 className="color-white line-height-s">{cleanHtml(title?.rendered)}<br/> Islands</h4>
                          <span className="color-white font-10 opacity-60"><i className="fa fa-map-marker pe-2"></i>{locations[0]?.name}</span>
                            </div>
                            <div className="card-overlay bg-gradient"></div>
                        </div>
                    </a>
                </div>
                  })
                  :
                  <></>
                }
            </div>
        </div>
    </div>

    <div className="d-flex px-3 mb-2">
        <div className="align-self-center">
            <h4 className="mb-0">Last Minute Deal</h4>
        </div>
        <div className="align-self-center ms-auto">
            <a href="#" className="font-12">View All</a>
        </div>
    </div>

    <div className="card card-style" style={{backgroundImage:'url("images/travel/6m.jpg")'} } data-card-height="260">
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
    <div className="col-6 pe-2">
      <a href="#" data-menu="menu-reserve" className="card card-style mx-0 mb-3">
        <div className="card-top m-2">
          <span className="bg-white color-black font-11 px-2 py-1 font-700 rounded-xs shadow-xxl">15% OFF</span>
        </div>
        <img src="images/travel/4m.jpg" alt="img" className="img-fluid"/>
        <div className="p-2">
          <h4 className="mb-0">Island Exploring</h4>
          <p className="mb-0 font-11 mt-n1 opacity-70"><i className="fa fa-map-marker pe-2"></i>Europe, Iceland</p>
        </div>
        <div className="divider mb-0"></div>
        <h5 className="p-2 font-12">$1550 / 7 Days <span className="float-end font-400 font-11 color-green-dark">30 Left</span></h5>
      </a>
    </div>
    <div className="col-6 ps-2">
      <a href="#" data-menu="menu-reserve" className="card card-style mx-0 mb-3">
        <div className="card-top m-2">
          <span className="bg-white color-black font-11 px-2 py-1 font-700 rounded-xs shadow-xxl">25% OFF</span>
        </div>
        <img src="images/travel/7m.jpg" alt="img" width="100" className="img-fluid"/>
        <div className="p-2">
          <h4 className="mb-0">Mountain Hikes</h4>
          <p className="mb-0 font-11 mt-n1 opacity-70"><i className="fa fa-map-marker pe-2"></i>Europe, France</p>
        </div>
        <div className="divider mb-0"></div>
        <h5 className="p-2 font-12">$1320 / 5 Days <span className="float-end font-400 font-11 color-yellow-dark">5 Left</span></h5>
      </a>
    </div>
    <div className="col-6 pe-2">
      <a href="#" data-menu="menu-reserve" className="card card-style mx-0 mb-3">
        <div className="card-top m-2">
          <span className="bg-white color-black font-11 px-2 py-1 font-700 rounded-xs shadow-xxl">15% OFF</span>
        </div>
        <img src="images/travel/3m.jpg" alt="img" className="img-fluid"/>
        <div className="p-2">
          <h4 className="mb-0">Forest Walks</h4>
          <p className="mb-0 font-11 mt-n1 opacity-70"><i className="fa fa-map-marker pe-2"></i>United States</p>
        </div>
        <div className="divider mb-0"></div>
        <h5 className="p-2 font-12">$150 / 1 Day <span className="float-end font-400 font-11 color-red-dark">0 Left</span></h5>
      </a>
    </div>
    <div className="col-6 ps-2">
      <a href="#" data-menu="menu-reserve" className="card card-style mx-0 mb-3">
        <div className="card-top m-2">
          <span className="bg-white color-black font-11 px-2 py-1 font-700 rounded-xs shadow-xxl">25% OFF</span>
        </div>
        <img src="images/travel/5m.jpg" alt="img" width="100" className="img-fluid"/>
        <div className="p-2">
          <h4 className="mb-0">Ocean Dives</h4>
          <p className="mb-0 font-11 mt-n1 opacity-70"><i className="fa fa-map-marker pe-2"></i>Europe, France</p>
        </div>
        <div className="divider mb-0"></div>
        <h5 className="p-2 font-12">$530 / 2 Dives <span className="float-end font-400 font-11 color-blue-dark">10 Left</span></h5>
      </a>
    </div>
  </div>
</div>


    <div className="footer card card-style">
        <a href="#" className="footer-title"><span className="color-highlight">StickyMobile</span></a>
        <p className="footer-text"><span>Made with <i className="fa fa-heart color-highlight font-16 ps-2 pe-2"></i> by Enabled</span><br></br>Powered by the best Mobile Website Developer on Envato Market. Elite Quality. Elite Products.</p>
        <div className="text-center mb-3">
            <a href="#" className="icon icon-xs rounded-sm shadow-l me-1 bg-facebook"><i className="fab fa-facebook-f"></i></a>
            <a href="#" className="icon icon-xs rounded-sm shadow-l me-1 bg-twitter"><i className="fab fa-twitter"></i></a>
            <a href="#" className="icon icon-xs rounded-sm shadow-l me-1 bg-phone"><i className="fa fa-phone"></i></a>
            <a href="#" data-menu="menu-share" className="icon icon-xs rounded-sm me-1 shadow-l bg-red-dark"><i className="fa fa-share-alt"></i></a>
            <a href="#" className="back-to-top icon icon-xs rounded-sm shadow-l bg-dark-light"><i className="fa fa-angle-up"></i></a>
        </div>
        <p className="footer-copyright">Copyright &copy; Enabled <span id="copyright-year">2017</span>. All Rights Reserved.</p>
        <p className="footer-links"><a href="#" className="color-highlight">Privacy Policy</a> | <a href="#" className="color-highlight">Terms and Conditions</a> | <a href="#" className="back-to-top color-highlight"> Back to Top</a></p>
        <div className="clear"></div>
    </div>

</div>
{/* <!-- End of Page Content--> */}

<div id="menu-reserve" className="menu menu-box-bottom" data-menu-height="cover" data-menu-width="cover">
<div className="card card-style mx-0 rounded-0 mb-3" data-card-height="260" style={{backgroundImage:"url('images/travel/6m.jpg')"}}>
  <div className="card-top mt-3 mx-2">
    <a href="#" className="close-menu icon icon-xs rounded-sm bg-white color-black"><i className="fa fa-arrow-left"></i></a>
  </div>
  <div className="card-top m-3 no-click text-end">
    <h1 className="color-white font-30 mb-n1 mt-n1">$3.315</h1>
    <p className="color-white mb-0 font-11">All Expenses Paid</p>
  </div>
  <div className="card-bottom pb-1 px-3">
    <span className="color-white"><i className="fa fa-star color-yellow-dark"></i> 4.95 <span className="opacity-30 ps-2 font-10">(431 reviews)</span></span>
    <h1 className="color-white font-28 pb-1">Maldives Escape</h1>
    <p className="color-white opacity-70 mb-3">
      A unique experience and blue oceans under an umbrella in an
      experience that will make you forget the world.
    </p>
  </div>
  <div className="card-overlay bg-black opacity-40 rounded-0"></div>
  <div className="card-overlay bg-gradient rounded-0"></div>
</div>
<div className="content mt-0">
  <p>
    Fill the form below and we'll call you in the shortest possible time to confirm your booking.
  </p>
  <div className="input-style has-borders no-icon input-style-always-active validate-field mb-4">
    <input type="name" className="form-control validate-name" id="form1" placeholder="John Doe"/>
    <label htmlFor="form1" className="color-highlight">Name</label>
    <i className="fa fa-times disabled invalid color-red-dark"></i>
    <i className="fa fa-check disabled valid color-green-dark"></i>
    <em>(required)</em>
  </div>

  <div className="pt-1"></div>

  <div className="input-style has-borders no-icon validate-field input-style-always-active mb-4">
    <input type="tel" className="form-control validate-tel" id="form3" placeholder="+1 234 567 5426"/>
    <label htmlFor="form3" className="color-highlight">Phone Number</label>
    <i className="fa fa-times disabled invalid color-red-dark"></i>
    <i className="fa fa-check disabled valid color-green-dark"></i>
    <em>(required)</em>
  </div>
  <div className="row mb-0 pt-1">
    <div className="col-6">
      <div className="input-style has-borders no-icon input-style-always-active mb-4">
        <input type="date" defaultValue="2021-08-01" max="2030-01-01" min="2021-01-01" className="form-control validate-text w-100" id="form6" placeholder="Phone"/>
        <label htmlFor="form6" className="color-highlight">Start Date</label>
        <i className="fa fa-check disabled valid me-4 pe-3 font-12 color-green-dark"></i>
        <i className="fa fa-check disabled invalid me-4 pe-3 font-12 color-red-dark"></i>
      </div>
    </div>
    <div className="col-6">
      <div className="input-style has-borders no-icon input-style-always-active mb-4">
        <input type="date" defaultValue="2021-08-07" max="2030-01-01" min="2021-01-01" className="form-control validate-text w-100" id="form6" placeholder="Phone"/>
        <label htmlFor="form6" className="color-highlight">End Date</label>
        <i className="fa fa-check disabled valid me-4 pe-3 font-12 color-green-dark"></i>
        <i className="fa fa-check disabled invalid me-4 pe-3 font-12 color-red-dark"></i>
      </div>
    </div>
  </div>
  <div className="divider mb-4 mt-2"></div>
  <a href="#" className="close-menu mb-4 btn btn-m rounded-sm font-700 text-uppercase bg-highlight btn-full">Book my Tour</a>
</div>
</div>

{/* <!-- All Menus, Action Sheets, Modals, Notifications, Toasts, Snackbars get Placed outside the <div className="page-content"> --> */}
<div id="menu-settings" className="menu menu-box-bottom menu-box-detached">
    <div className="menu-title mt-0 pt-0"><h1>Settings</h1><p className="color-highlight">Flexible and Easy to Use</p><a href="#" className="close-menu"><i className="fa fa-times"></i></a></div>
    <div className="divider divider-margins mb-n2"></div>
    <div className="content">
        <div className="list-group list-custom-small">
            <a href="#" data-toggle-theme data-trigger-switch="switch-dark-mode" className="pb-2 ms-n1">
                <i className="fa font-12 fa-moon rounded-s bg-highlight color-white me-3"></i>
                <span>Dark Mode</span>
                <div className="custom-control scale-switch ios-switch">
                    <input data-toggle-theme type="checkbox" className="ios-input" id="switch-dark-mode"/>
                    <label className="custom-control-label" htmlFor="switch-dark-mode"></label>
                </div>
                <i className="fa fa-angle-right"></i>
            </a>
        </div>
        <div className="list-group list-custom-large">
            <a data-menu="menu-highlights" href="#">
                <i className="fa font-14 fa-tint bg-green-dark rounded-s"></i>
                <span>Page Highlight</span>
                <strong>16 Colors Highlights Included</strong>
                <span className="badge bg-highlight color-white">HOT</span>
                <i className="fa fa-angle-right"></i>
            </a>
            <a data-menu="menu-backgrounds" href="#" className="border-0">
                <i className="fa font-14 fa-cog bg-blue-dark rounded-s"></i>
                <span>Background Color</span>
                <strong>10 Page Gradients Included</strong>
                <span className="badge bg-highlight color-white">NEW</span>
                <i className="fa fa-angle-right"></i>
            </a>
        </div>
    </div>
</div>
{/* <!-- Menu Settings Highlights--> */}
<div id="menu-highlights" className="menu menu-box-bottom menu-box-detached">
    <div className="menu-title"><h1>Highlights</h1><p className="color-highlight">Any Element can have a Highlight Color</p><a href="#" className="close-menu"><i className="fa fa-times"></i></a></div>
    <div className="divider divider-margins mb-n2"></div>
    <div className="content">
        <div className="highlight-changer">
            <a href="#" data-change-highlight="blue"><i className="fa fa-circle color-blue-dark"></i><span className="color-blue-light">Default</span></a>
            <a href="#" data-change-highlight="red"><i className="fa fa-circle color-red-dark"></i><span className="color-red-light">Red</span></a>
            <a href="#" data-change-highlight="orange"><i className="fa fa-circle color-orange-dark"></i><span className="color-orange-light">Orange</span></a>
            <a href="#" data-change-highlight="pink2"><i className="fa fa-circle color-pink2-dark"></i><span className="color-pink-dark">Pink</span></a>
            <a href="#" data-change-highlight="magenta"><i className="fa fa-circle color-magenta-dark"></i><span className="color-magenta-light">Purple</span></a>
            <a href="#" data-change-highlight="aqua"><i className="fa fa-circle color-aqua-dark"></i><span className="color-aqua-light">Aqua</span></a>
            <a href="#" data-change-highlight="teal"><i className="fa fa-circle color-teal-dark"></i><span className="color-teal-light">Teal</span></a>
            <a href="#" data-change-highlight="mint"><i className="fa fa-circle color-mint-dark"></i><span className="color-mint-light">Mint</span></a>
            <a href="#" data-change-highlight="green"><i className="fa fa-circle color-green-light"></i><span className="color-green-light">Green</span></a>
            <a href="#" data-change-highlight="grass"><i className="fa fa-circle color-green-dark"></i><span className="color-green-dark">Grass</span></a>
            <a href="#" data-change-highlight="sunny"><i className="fa fa-circle color-yellow-light"></i><span className="color-yellow-light">Sunny</span></a>
            <a href="#" data-change-highlight="yellow"><i className="fa fa-circle color-yellow-dark"></i><span className="color-yellow-light">Goldish</span></a>
            <a href="#" data-change-highlight="brown"><i className="fa fa-circle color-brown-dark"></i><span className="color-brown-light">Wood</span></a>
            <a href="#" data-change-highlight="night"><i className="fa fa-circle color-dark-dark"></i><span className="color-dark-light">Night</span></a>
            <a href="#" data-change-highlight="dark"><i className="fa fa-circle color-dark-light"></i><span className="color-dark-light">Dark</span></a>
            <div className="clearfix"></div>
        </div>
        <a href="#" data-menu="menu-settings" className="mb-3 btn btn-full btn-m rounded-sm bg-highlight shadow-xl text-uppercase font-900 mt-4">Back to Settings</a>
    </div>
</div>
{/* <!-- Menu Settings Backgrounds--> */}
<div id="menu-backgrounds" className="menu menu-box-bottom menu-box-detached">
    <div className="menu-title"><h1>Backgrounds</h1><p className="color-highlight">Change Page Color Behind Content Boxes</p><a href="#" className="close-menu"><i className="fa fa-times"></i></a></div>
    <div className="divider divider-margins mb-n2"></div>
    <div className="content">
        <div className="background-changer">
            <a href="#" data-change-background="default"><i className="bg-theme"></i><span className="color-dark-dark">Default</span></a>
            <a href="#" data-change-background="plum"><i className="body-plum"></i><span className="color-plum-dark">Plum</span></a>
            <a href="#" data-change-background="magenta"><i className="body-magenta"></i><span className="color-dark-dark">Magenta</span></a>
            <a href="#" data-change-background="dark"><i className="body-dark"></i><span className="color-dark-dark">Dark</span></a>
            <a href="#" data-change-background="violet"><i className="body-violet"></i><span className="color-violet-dark">Violet</span></a>
            <a href="#" data-change-background="red"><i className="body-red"></i><span className="color-red-dark">Red</span></a>
            <a href="#" data-change-background="green"><i className="body-green"></i><span className="color-green-dark">Green</span></a>
            <a href="#" data-change-background="sky"><i className="body-sky"></i><span className="color-sky-dark">Sky</span></a>
            <a href="#" data-change-background="orange"><i className="body-orange"></i><span className="color-orange-dark">Orange</span></a>
            <a href="#" data-change-background="yellow"><i className="body-yellow"></i><span className="color-yellow-dark">Yellow</span></a>
            <div className="clearfix"></div>
        </div>
        <a href="#" data-menu="menu-settings" className="mb-3 btn btn-full btn-m rounded-sm bg-highlight shadow-xl text-uppercase font-900 mt-4">Back to Settings</a>
    </div>
</div>
{/* <!-- Menu Share --> */}
<div id="menu-share" className="menu menu-box-bottom menu-box-detached">
    <div className="menu-title mt-n1"><h1>Share the Love</h1><p className="color-highlight">Just Tap the Social Icon. We'll add the Link</p><a href="#" className="close-menu"><i className="fa fa-times"></i></a></div>
    <div className="content mb-0">
        <div className="divider mb-0"></div>
        <div className="list-group list-custom-small list-icon-0">
            <a href="auto_generated" className="shareToFacebook external-link">
                <i className="font-18 fab fa-facebook-square color-facebook"></i>
                <span className="font-13">Facebook</span>
                <i className="fa fa-angle-right"></i>
            </a>
            <a href="auto_generated" className="shareToTwitter external-link">
                <i className="font-18 fab fa-twitter-square color-twitter"></i>
                <span className="font-13">Twitter</span>
                <i className="fa fa-angle-right"></i>
            </a>
            <a href="auto_generated" className="shareToLinkedIn external-link">
                <i className="font-18 fab fa-linkedin color-linkedin"></i>
                <span className="font-13">LinkedIn</span>
                <i className="fa fa-angle-right"></i>
            </a>
            <a href="auto_generated" className="shareToWhatsApp external-link">
                <i className="font-18 fab fa-whatsapp-square color-whatsapp"></i>
                <span className="font-13">WhatsApp</span>
                <i className="fa fa-angle-right"></i>
            </a>
            <a href="auto_generated" className="shareToMail external-link border-0">
                <i className="font-18 fa fa-envelope-square color-mail"></i>
                <span className="font-13">Email</span>
                <i className="fa fa-angle-right"></i>
            </a>
        </div>
    </div>
</div>
    </Layout>
  );
}
