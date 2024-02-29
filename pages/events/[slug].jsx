import Layout from "@/components/layouts/Layout";
import { fetchIdsUrl, fetchSingleListingUrl } from "@/helpers/rest";
import { cleanHtml } from "@/helpers/universal";
import { memo } from "react";

export async function getStaticPaths() {
    const res = await fetch(fetchIdsUrl({type: 'job_listing', listing_type:'event', slugs: true}));
    const data = await res.json();
    const paths = data?.map(item => {
        return {
            params: {slug : `${item}`}
        }
    });
  
    return {
        paths,
        fallback: 'blocking'
    } 
  }
  
  export async function getStaticProps({ params }) {

  
   /*  let serverQuery = await listingServerQuery(params);
    let {serverObj} = serverQuery ?? {};
    let {listing} =serverObj ?? {}; */

    let serverObj = {};

    const singleRes = await fetch(fetchSingleListingUrl(params.slug));
    const postArr = await singleRes.json();
    const post = postArr[0];
    serverObj.listing = post && post != 'undefined' ? post :  null;
    
    return {
      props: {
        ...serverObj,
      },
      revalidate: 6000, // In seconds
    }
  }

  const ListingConst = ({listing}) => {
    //const {listing} = serverObj;
    const {short_desc, meta, cover, logo, thumbnail, tagline, title, latitude, longitude, phone, address, id, slug, modified} = listing ?? {};
    const {_links} = meta ?? {};

    console.log('listing', listing);

    return <Layout> 
    <div className="page-content">

    <div className="card preload-img" data-src={cover} data-card-height="480">
        <div className="card-top m-3">
            <div className="notch-clear">
                <a data-back-button href="#" className="icon icon-xs bg-white color-black rounded-m"><i className="fa fa-angle-left"></i></a>
            </div>
        </div>
        <div className="card-bottom ms-3 mb-3">
            <span className="bg-highlight color-white font-700 p-2 rounded-s">
                $2.50 / bottle
            </span>
            <h1 className="font-40 font-900 line-height-xl mt-4">
                {cleanHtml(title?.rendered)}
            </h1>
            <p className="mb-3">
                <i className="fa fa-map-marker font-11 me-2"></i>
                From Joe's Farm on 8th Street and Main
            </p>
            <div className="d-flex pb-4">
                <div className="align-self-center flex-grow-1">
                    <span className="font-11">
                        Joe's Farm Rating
                    </span>
                    <p className="mt-n2 mb-0">
                        <strong className="color-theme pe-2">4.9</strong>
                        <i className="fa fa-star color-yellow-dark"></i>
                        <i className="fa fa-star color-yellow-dark"></i>
                        <i className="fa fa-star color-yellow-dark"></i>
                        <i className="fa fa-star color-yellow-dark"></i>
                        <i className="fa fa-star color-yellow-dark"></i>
                    </p>
                </div>
                <div className="align-self-center flex-shrink-1">
                    <a href="#" className="btn btn-full btn-s me-3 font-900 text-uppercase rounded-sm shadow-xxl bg-blue-dark">Follow Farm</a>
                </div>
            </div>
        </div>
        <div className="card-overlay bg-gradient-fade-small"></div>
    </div>

    <div className="card card-overflow card-style mt-n5">
        <div className="content">
            <p>
                The best selling Mobile Progressive Web App on the Envato Marketplaces just got even better now, with 3.0 introducing
                Boostrap 4.x compatibility and a tone of new gorgeous features!
            </p>

            <div className="row mb-0">
                <div className="col-4">
                    <span className="font-11">Origin</span>
                    <p className="mt-n2 mb-3">
                        <strong className="color-theme">Local</strong>
                    </p>
                </div>
                <div className="col-4">
                    <span className="font-11">Type</span>
                    <p className="mt-n2 mb-3">
                        <strong className="color-theme">Dairy</strong>
                    </p>
                </div>
                <div className="col-4">
                    <span className="font-11">Produced</span>
                    <p className="mt-n2 mb-3">
                        <strong className="color-theme">Today</strong>
                    </p>
                </div>

            </div>

            <div className="divider mt-3"></div>

            <div className="d-flex">
                <div className="flex-grow-1">
                    <span className="font-11">Share with the World </span>
                    <p className="mt-n2">
                        <strong className="color-theme">Share or Save for Later</strong>
                    </p>
                </div>
                <div className="flex-shrink-1 mt-1">
                    <a href="#" data-menu="menu-share" className="icon icon-xs rounded-xl shadow-m ms-2 bg-blue-dark"><i className="fa fa-share-alt"></i></a>
                    <a href="#" data-menu="menu-share" className="icon icon-xs rounded-xl shadow-m ms-2 bg-red-dark"><i className="fa fa-heart"></i></a>
                </div>
            </div>

            <a href="#" className="btn btn-full btn-m font-900 text-uppercase rounded-sm shadow-l bg-green-dark mt-4">Purchase Today</a>

        </div>
    </div>

    <div className="d-flex px-3 mb-n3">
        <div className="align-self-center">
            <h4 className="mb-0">More Local Produce</h4>
        </div>
        <div className="align-self-center ms-auto">
            <a href="#" className="font-12">View All</a>
        </div>
    </div>

    <div className="splide double-slider slider-no-dots text-center visible-slider" id="double-slider-1a">
        <div className="splide__track">
            <div className="splide__list">
                <div className="splide__slide">
                    <a href="#" className="mx-3">
                        <div className="card card-style me-0 mb-0" style={{backgroundImage: 'url(/images/grocery/10m.jpg)'}} data-card-height="150">
                            <div className="card-bottom p-2 px-3">
                                <h4 className="color-white">Specials</h4>
                            </div>
                            <div className="card-overlay bg-gradient opacity-80"></div>
                        </div>
                    </a>
                </div>
                <div className="splide__slide">
                    <a href="#" className="mx-3">
                        <div className="card card-style me-0 mb-0" style={{backgroundImage: 'url(/images/grocery/7m.jpg)'}} data-card-height="150">
                            <div className="card-bottom p-2 px-3">
                                <h4 className="color-white">Fruit</h4>
                            </div>
                            <div className="card-overlay bg-gradient opacity-80"></div>
                        </div>
                    </a>
                </div>
                <div className="splide__slide">
                    <a href="#" className="mx-3">
                        <div className="card card-style me-0 mb-0" style={{backgroundImage: 'url(/images/grocery/9m.jpg)'}} data-card-height="150">
                            <div className="card-bottom p-2 px-3">
                                <h4 className="color-white">Veggies</h4>
                            </div>
                            <div className="card-overlay bg-gradient opacity-80"></div>
                        </div>
                    </a>
                </div>
                <div className="splide__slide">
                    <a href="#" className="mx-3">
                        <div className="card card-style me-0 mb-0" style={{backgroundImage: 'url(/images/grocery/2m.jpg)'}} data-card-height="150">
                            <div className="card-bottom p-2 px-3">
                                <h4 className="color-white">Grains</h4>
                            </div>
                            <div className="card-overlay bg-gradient opacity-80"></div>
                        </div>
                    </a>
                </div>
                <div className="splide__slide">
                    <a href="#" className="mx-3">
                        <div className="card card-style me-0 mb-0" style={{backgroundImage: 'url(/images/grocery/6m.jpg)'}} data-card-height="150">
                            <div className="card-bottom p-2 px-3">
                                <h4 className="color-white">Dariy</h4>
                            </div>
                            <div className="card-overlay bg-gradient opacity-80"></div>
                        </div>
                    </a>
                </div>
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

{/* <!-- All Menus, Action Sheets, Modals, Notifications, Toasts, Snackbars get Placed outside the <div className="page-content"> --> */}
</Layout>

  }


  const Listing = memo(ListingConst);

  /* const CanvasLayout = dynamic(() => import('~/appComponents/core/Layout/CanvasLayout'));
  
  Listing.getLayout = function getLayout({children}) {
    return (
        <CanvasLayout>{children}</CanvasLayout>
    )
  } */
  
  export default Listing;