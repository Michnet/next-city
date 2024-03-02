import RelatedByTaxSplide from "@/components/listing/RelatedByTaxSplide";
import Layout from "@/components/layouts/Layout";
import CountDownUI from "@/components/UI/CountDownUI";
//import VisitRecord from "@/components/UI/VisitRecord";
import ListingStater from "@/contexts/contextStaters/ListingStater";
import { fetchIdsUrl, fetchSingleListingUrl } from "@/helpers/rest";
import { cleanHtml } from "@/helpers/universal";
import dynamic from "next/dynamic";
import { memo, useState } from "react";
import FAQs from "@/components/UI/FAQs";
import SiteHead from "@/components/UI/SiteHead";
import MegaGallery from "@/components/UI/Galleries/MegaGallery";
import listingMenu from "@/components/listing/ListingMenu";
import { useRouter } from "next/router";
import ListingSideMenu from "@/components/listing/ListingSideMenu";
import { Client } from "react-hydration-provider";
import RightMenu from "@/components/listing/RightMenu";
const VisitRecord = dynamic(() => import('@/components/UI/VisitRecord'), { ssr: false });


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
    const {short_desc, meta, cover, categories, about_us, logo, thumbnail, dir_categories, tagline, title, latitude, longitude, phone, address, id, slug, modified} = listing ?? {};
    const {faqs} = about_us ?? {};
    const {_links} = meta ?? {};
    const router = useRouter();
    const {query} = router;
    const [activeKey, setActiveKey] = useState(query?.page ?? 'home');

    let localMenu = listingMenu({listing:listing/*, userId: user?.id */});
    console.log('menu', localMenu);

    console.log('listing', listing);

    return <Layout title={cleanHtml(title?.rendered)}> 
        <>
        <SiteHead
           title={`${cleanHtml(listing?.title?.rendered)}`} 
           description={`${listing?.short_desc}`}
           image={listing?.large_thumb}
           type='event'
           updated_time={modified}
           phone_number={phone}
           street_address={address}
           latitude={latitude}
           longitude={longitude}
           slug={`/events/${slug}`}
           />
    <div className="page-content">

    <div className="card preload-img" /* data-src={cover} data-card-height="480" */ style={{backgroundImage: `url(${cover})`, height:'60vh'}}>
        <div className="card-top m-3">
            <div className="notch-clear">
                <a data-back-button href="#" className="icon icon-xs bg-white color-black rounded-m"><i className="fa fa-angle-left"></i></a>
            </div>
        </div>
        <div className="card-bottom ms-3 mb-3">
            <span className="bg-highlight color-white font-700 p-2 rounded-s">
                {categories[0]?.name}
            </span>
            <h1 className="font-40 font-900 line-height-xl mt-4">
                {cleanHtml(title?.rendered)}
            </h1>
            <p className="mb-3">
                <i className="fa fa-map-marker font-11 me-2"></i>
                {address}
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
                    <a href="#" className="btn btn-full btn-s me-3 font-900 text-uppercase rounded-sm shadow-xxl bg-dark-dark">Booking</a>
                </div>
            </div>
        </div>
        <div className="card-overlay bg-gradient-fade-small"></div>
    </div>

    <div className="card card-style">
            <div className="content">          
                <Client>{short_desc && <p className="mb-4 text-14 pb-2">
                    <span  dangerouslySetInnerHTML={{__html: short_desc}}/>
                </p>}</Client>
                <CountDownUI /* fromActive */ eventId={id} />
                <div className="row mb-3">
                    <div className="col-6">
                        <div className="d-flex">
                            <div className="align-self-center">
                                <i style={{width:"20px"}} className="fa fa-calendar color-teal-dark font-23 me-3 text-center"></i>
                            </div>
                            <div className="align-self-center">
                                <span className="d-block font-10 mb-n1 pb-1 color-theme opacity-50">Date</span>
                                <strong className="d-block font-12 pb-1 color-theme">Sun, 28 August</strong>
                            </div>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="d-flex">
                            <div className="align-self-center">
                                <i style={{width:"20px"}} className="bi bi-clock color-red-dark font-23 me-3 text-center"></i>
                            </div>
                            <div className="align-self-center">
                                <span className="d-block font-10 mb-n1 pb-1 color-theme opacity-50">Time</span>
                                <strong className="d-block font-12 pb-1 color-theme">06:00 - 12:00 PM</strong>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 mb-2"></div>
                    <div className="col-6">
                        <div className="d-flex">
                            <div className="align-self-center">
                                <i style={{width:"20px"}} className="fa fa-map-marker color-yellow-dark font-23 me-3 text-center"></i>
                            </div>
                            <div className="align-self-center">
                                <span className="d-block font-10 mb-n1 pb-1 color-theme opacity-50">Place</span>
                                <strong className="d-block font-12 pb-1 color-theme">Area 51, Nevada</strong>
                            </div>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="d-flex">
                            <div className="align-self-center">
                                <i style={{width:"20px"}} className="fa fa-dollar-sign color-green-dark font-23 me-3 text-center"></i>
                            </div>
                            <div className="align-self-center">
                                <span className="d-block font-10 mb-n1 pb-1 color-theme opacity-50">Ticket</span>
                                <strong className="d-block font-12 pb-1 color-theme">$10 USD</strong>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="divider"></div>

                <a href="#" className="btn btn-full btn-m rounded-sm shadow-xl bg-highlight font-700 text-uppercase">Join Event</a>
                
            </div>
        </div>

        <div className="card card-style shadow-0 radius-0 bg-transparent">
        <MegaGallery listing={listing} /* color={color} *//>
        </div>

        {faqs?.length > 0 && <div className="card card-style shadow-0 border bg-transparent">
            <div className="content">
                <div class="d-flex pb-2 border-bottom mb-3 ">
                    <div>
                        <h6 class="mb-n1 opacity-80 color-highlight">FAQs</h6>
                        <h3>Common Questions</h3>
                    </div>
                    <div class="align-self-center ms-auto">
                    <i class="bi bi-question-circle-fill font-24 color-red-dark"></i>
                    </div>
                </div>
                <FAQs faqs={faqs} postID={id}/>
            </div>
        </div>}
        <Client><RelatedByTaxSplide nextUpdater random taxonomy={`category`} ids={dir_categories} exclude={id}/></Client>

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
        <p className="footer-copyright">Copyright &copy; Enabled <span id="copyright-year">2024</span>. All Rights Reserved.</p>
        <p className="footer-links"><a href="#" className="color-highlight">Privacy Policy</a> | <a href="#" className="color-highlight">Terms and Conditions</a> | <a href="#" className="back-to-top color-highlight"> Back to Top</a></p>
        <div className="clear"></div>
    </div>

</div>
{/* <!-- End of Page Content--> */}

{/* <!-- All Menus, Action Sheets, Modals, Notifications, Toasts, Snackbars get Placed outside the <div className="page-content"> --> */}
    <ListingSideMenu listing={listing} activeKey={activeKey} setActiveKey={setActiveKey}/>
    <RightMenu/>
    <VisitRecord Id={listing.id}/>
    <ListingStater id={listing.id}/>
    </>
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