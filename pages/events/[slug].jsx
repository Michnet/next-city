import RelatedByTaxSplide from "@/components/listing/RelatedByTaxSplide";
//import VisitRecord from "@/components/UI/VisitRecord";
import ListingStater from "@/contexts/contextStaters/ListingStater";
import { fetchIdsUrl, fetchSingleListingUrl } from "@/helpers/rest";
import { cleanHtml } from "@/helpers/universal";
import dynamic from "next/dynamic";
import { memo, useState } from "react";
import SiteHead from "@/components/UI/SiteHead";
import { useRouter } from "next/router";
import ListingSideMenu from "@/components/listing/ListingSideMenu";
import { Client } from "react-hydration-provider";
import RightMenu from "@/components/listing/RightMenu";
import Content from "@/components/listing/Content";
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
    const title = post?.title?.rendered;
    
    return {
      props: {
        ...serverObj,
        headerTitle: title.rendered
      },
      revalidate: 6000, // In seconds
    }
  }

  const ListingConst = ({listing}) => {
    //const {listing} = serverObj;
    const {short_desc, meta, cover, categories, about_us, logo,rating, thumbnail, dir_categories, tagline, title, latitude, longitude, phone, address, id, slug, modified} = listing ?? {};
    const {faqs} = about_us ?? {};
    const {_links} = meta ?? {};
    const router = useRouter();
    const {query} = router;
    const [activeKey, setActiveKey] = useState(query?.page ?? 'home');

console.log('liss', listing);  

    return <> 
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

    <div className="card preload-img" /* data-src={cover} data-card-height="480" */ style={{backgroundImage: `url(${cover})`, height: activeKey == 'home' ? '60vh' : '35vh'}}>
        <div className="card-top m-3">
            <div className="notch-clear">
                <a data-back-button href="#" className="icon icon-xs bg-white color-black rounded-m"><i className="fa fa-angle-left"></i></a>
            </div>
        </div>
        <div className="card-bottom ms-3 mb-3">
            {activeKey == 'home' && <span className="bg-highlight color-white font-700 p-2 rounded-s">
                {categories[0]?.name}
            </span>}
            <h1 className="font-40 font-900 line-height-xl mt-4">
                {cleanHtml(title?.rendered)}
            </h1>
            <p className="mb-3">
                <i className="fa fa-map-marker font-11 me-2"></i>
                {address}
            </p>
            <div className="d-flex pb-4">
                <div className="align-self-center flex-grow-1">
                    <div className="mb-5"><span className="font-11">
                        User Reviews
                    </span></div>
                    <div className="d-flex -flex-row flex-nowrap mb-0">
                        <strong className="color-theme pe-2">{rating}</strong>
                        <div id={`score_stars_${id}`} className='score_stars'
                        style={{
                            width: '100px',
                            height: '18px',
                            backgroundColor: 'var(--bs-gray-200)',
                            backgroundImage: 'linear-gradient(45deg, var(--highlight), #FF9800)',
                            maskImage: `url(/img/general/stars.svg)`,
                            backgroundSize: `${parseFloat(rating)*10}% 100%`,
                            backgroundRepeat: 'no-repeat',
                            maskRepeat: 'no-repeat'
                        }}
                        />                    
                    </div>
                </div>
                <div className="align-self-center flex-shrink-1">
                    <button onClick={() => setActiveKey('tickets')} href="#"  className="btn btn-full btn-s me-3 font-900 text-uppercase rounded-sm shadow-xxl bg-dark-dark">Booking</button>
                </div>
            </div>
        </div>
        <div className="card-overlay bg-gradient-fade-small"></div>
    </div>
    <Content activeKey={activeKey} setActiveKey={setActiveKey} listing={listing}/>
    <Client><RelatedByTaxSplide nextUpdater random taxonomy={`category`} ids={dir_categories} exclude={id}/></Client>
</div>
{/* <!-- End of Page Content--> */}

{/* <!-- All Menus, Action Sheets, Modals, Notifications, Toasts, Snackbars get Placed outside the <div className="page-content"> --> */}
    <ListingSideMenu listing={listing} activeKey={activeKey} setActiveKey={setActiveKey}/>
    <RightMenu listing={listing} activeKey={activeKey} setActiveKey={setActiveKey}/>
    <VisitRecord Id={listing.id}/>
    <ListingStater id={listing.id}/>
    </>
</>

  }


  const Listing = memo(ListingConst);

  /* const CanvasLayout = dynamic(() => import('~/appComponents/core//CanvasLayout'));
  
  Listing.getLayout = function getLayout({children}) {
    return (
        <CanvasLayout>{children}</CanvasLayout>
    )
  } */
  
  export default Listing;