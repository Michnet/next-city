import RelatedByTaxSplide from "@/components/listing/RelatedByTaxSplide";
//import VisitRecord from "@/components/UI/VisitRecord";
import ListingStater from "@/contexts/contextStaters/ListingStater";
import { fetchIdsUrl, fetchSingleListingUrl } from "@/helpers/rest";
import { cleanHtml, srcWithFallback } from "@/helpers/universal";
import dynamic from "next/dynamic";
import { memo, useEffect, useState } from "react";
import SiteHead from "@/components/UI/SiteHead";
import { useRouter } from "next/router";
import ListingSideMenu from "@/components/listing/ListingSideMenu";
import { Client } from "react-hydration-provider";
import RightMenu from "@/components/listing/RightMenu";
import Content from "@/components/listing/Content";
import RatingView from "@/components/listing/reviews/RatingView";
//import { useRecoilValue } from "recoil";
import { listingViewState } from "@/contexts/atoms";
import { useRecoilState } from "recoil";
import VisitorActions from "@/components/listing/partials/VisitorActions";
import CallToActions from "@/components/UI/CallToActions";
import Link from "next/link";
import HeaderWrapper from "@/components/layouts/partials/HeaderWrapper";
import ListingTopMenu from "@/components/listing/partials/ListingTopMenu";
import Mirrored from "@/components/UI/partials/Mirrored";
import Image from "next/image";
import {fallbackImgSrcSet } from "@/helpers/base";
import { closeMenus } from "@/helpers/appjs";
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
        headerTitle: title,
        settings : {
            mMenu: 'show',
            mMenuContent:{
              icon : 'las la-ellipsis-h', 
              btnProps:{
              'data-menu' : "listingActions"}
              
          },
          noHeader: true
        },
      },
      revalidate: 6000, // In seconds
    }
  }


  export const BookingView = ({text = null, exClass, children, simple=true, setActiveKey}) => {
    if(children){
       return <div onClick={() => setActiveKey('tickets')}> {children} </div>
     }else{
       return <button onClick={() => setActiveKey('tickets')} className={`booking_view btn shadow-bg shadow-bg-sm bg-highlight mr-0 mb-0 ${!simple ? 'ui-2' : 'bg-white hover-bg-theme border-light hover-color-white'} animated ${exClass ?? ''}`}>{text?.length > 0 ? text : 'Booking Options'}</button>;
     }
  }

  const ListingConst = ({listing}) => {
    //const {listing} = serverObj;
    const {short_desc, meta, cover, categories, about_us, logo,rating, thumbnail, dir_categories, tagline, title, latitude, longitude, phone, address, id, slug, modified} = listing ?? {};
    const router = useRouter();
    const {query} = router;
    const [view, setView] = useRecoilState(listingViewState);
    //const activeView = useRecoilValue(listingViewState);
    const [activeKey, setActiveKey] = useState(query?.page ?? view);

console.log('liss', listing);  

useEffect(() => {
  setActiveKey(query?.page ?? view);
}, [listing.id])

const viewModes = [ { id: 1, title: 'Wall', mode : 'home' }, /* { id: 2, title: 'Profile', mode : 'profile' }, */ { id: 3, title: 'Shop', mode : 'merchandise' }, { id: 4, title: 'Cover Only', mode : 'cover' } ];
let VisitorActionsView;

if(listing){
    VisitorActionsView = <div>
        <VisitorActions setActiveKey={setActiveKey} listing={listing} extraItem = {<div className="action_box" data-menu='activeViewModal'> <i className="las la-bullseye"/> <label>View Mode</label> </div>}/>
        <hr/>
        <CallToActions centered thin light bgClass={'bg-transparent'} actionComponent={
            <div className="d-flex  gap-3 flex-center">
                <Link href={'/add-listing'}><button
            className="btn btn-theme btn-sm rounded-22 w-auto px-10 h-full text-14 fw-500"
            >
            Create event page
            </button></Link>
            <Link href={'/about/about-us'}><button
            className="btn btn-outline-theme btn-sm rounded-22 w-auto px-10 h-full text-14 fw-500"
            >
            Learn More
            </button></Link>
            </div>
            }
            descript = {"You can also create your own event page today. It's FREE"}
            />
        </div>
}
   

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
           <HeaderWrapper header_id={'listing_header'}>
                <ListingTopMenu listing={listing} activeKey={activeKey} setActiveKey={setActiveKey}/>
            </HeaderWrapper>
    <div className="page-content single_listing ">

    <div className={`card preload-img listing_hero`} /* data-src={cover} data-card-height="480" */ style={{/* backgroundImage: `url(${cover})`, */ height: activeKey == 'home' ? '60vh' : '35vh'}}>
            <Mirrored coverTop topPadding={'50px'} skewDegrees={5}  skewDir={'-'} YDistance={150}>
                <div className='hero_cover position-relative w-100'>
                  <Image                   
                    //placeholder="blur"
                   changerKey={listing.id}
                   //blurDataURL={coverBlur}
                   fill
                   priority
                   alt="image"
                   src={srcWithFallback(cover)}
                   className={`object-cover`}
                   //onError={(e) => {e.target.src = '/images/bg/fallback.jpg'}}
                   onErrorCapture = {(e) => {e.target.src = '/images/bg/fallback.jpg', e.target.srcset= {fallbackImgSrcSet}}}
                   //sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
            </Mirrored>
        <div className="card-top m-3">
            <div className="notch-clear">
                <a data-back-button href="#" className="icon icon-xs bg-white color-black rounded-m"><i className="fa fa-angle-left"></i></a>
            </div>
        </div>
        <div className="card-bottom bg-gradient-fade p-3">
            {activeKey == 'home' && <span className="bg-highlight color-white font-700 p-1">
                {categories[0]?.name}
            </span>}
            <h1 className="font-40 font-900 line-height-xl mt-1">
                {cleanHtml(title?.rendered)}
            </h1>
            <p className="mb-3">
                <i className="fa fa-map-marker font-11 me-2"></i>
                {address}
            </p>
            <div className="d-flex pb-4 align-items-center">
                {rating && rating > 0 && <div className="align-self-center flex-grow-1">
                    <div className="mb-1"><span className="font-11">
                        User Reviews
                    </span></div>
                    <RatingView rating={rating} id={id}/>
                </div>}
                <div className="align-self-center flex-shrink-1">
                    <button onClick={() => setActiveKey('tickets')} href="#"  className="btn btn-full btn-s me-3 font-900 text-uppercase rounded-sm shadow-xxl bg-dark-dark">Booking</button>
                </div>
            </div>
        </div>
        {/* <div className="card-overlay bg-gradient-fade-small"></div> */}
    </div>
    <Content activeKey={activeKey} setActiveKey={setActiveKey} listing={listing}/>
    <Client><RelatedByTaxSplide nextUpdater random taxonomy={`category`} ids={dir_categories} exclude={id}/></Client>
</div>
{/* <!-- End of Page Content--> */}

{/* <!-- All Menus, Action Sheets, Modals, Notifications, Toasts, Snackbars get Placed outside the <div className="page-content"> --> */}
    <ListingSideMenu listing={listing} activeKey={activeKey} setActiveKey={setActiveKey}/>
    <RightMenu listing={listing} activeKey={activeKey} setActiveKey={setActiveKey}/>
    <div id="activeViewModal" className="menu menu-box-bottom menu-box-detached">
        <div className="menu-title">
            <a href="#" className="close-menu" onClick={() => closeMenus()}>
            <i className="fa fa-times"></i>
            </a>
        </div>
        <div className="content">
            <div class="btns view_modes">
                {viewModes.map((el) => {
                const {id, mode, title} = el;
                return <button disabled={view == mode} key={id} type="button" class={`btn mr-10  ${view == mode ? 'active radius-30' : 'ui-2 animated'}`} onClick={() => setView(mode)}>{title}</button>

                })}
            </div>
        </div>
    </div>

    <div id="listingActions" className="menu menu-box-bottom menu-box-detached">
        <div className="menu-title mt-0 pt-0">
              <h1>{cleanHtml(listing?.title.rendered)}</h1>
              <p className="color-highlight">Options ...</p>
              <a href="#" className="close-menu" onClick={() => closeMenus()}>
                <i className="fa fa-times"></i>
              </a>
            </div>
            <div className="divider divider-margins mb-n2"></div>
        <div className="content">
            {VisitorActionsView}
        </div>
    </div>
    <VisitRecord Id={listing.id}/>
    <ListingStater id={listing.id}/>
    </>
</>

  }


  const Listing = memo(ListingConst);

  /* const CanvasLayout = dynamic(() => import('~/appComponents/core//CanvasLayout'));
  import VisitorActions from './../../components/listing/partials/VisitorActions';
import { fallbackImgSrcSet } from '@/helpers/base';
import { fallbackImgSrcSet } from '@/helpers/base';
import { fallbackImgSrcSet } from './../../helpers/base';

  Listing.getLayout = function getLayout({children}) {
    return (
        <CanvasLayout>{children}</CanvasLayout>
    )
  } */
  
  export default Listing;