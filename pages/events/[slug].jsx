import RelatedByTaxSplide from "@/components/listing/RelatedByTaxSplide";
//import VisitRecord from "@/components/UI/VisitRecord";
import ListingStater from "@/contexts/contextStaters/ListingStater";
import { fetchIdsUrl, fetchSingleListingUrl } from "@/helpers/rest";
import { cleanHtml, shadeRGBColor, srcWithFallback } from "@/helpers/universal";
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
import { closeMenus, openOffCanvas } from "@/helpers/appjs";
import BottomMenu from "@/components/layouts/BottomMenu";
import { LoaderDualRing } from "@/components/skeletons/Loaders";
const VisitRecord = dynamic(() => import('@/components/UI/VisitRecord'), { ssr: false });

const ColorThief = require('colorthief');

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
    const listing = postArr[0];
    serverObj.listing = listing && listing != 'undefined' ? listing :  null;
    const title = listing?.title?.rendered;

    async function getThemeColor(){
        if(listing?.cover?.length > 0 && listing?.cover?.startsWith('http')){
          let gota = await ColorThief.getColor(listing?.cover)
          .then(color => {return color})
          .catch(err => { console.log(err) });
          if(gota){
            serverObj.themeColor = gota;
          }
        }
    }

    if(listing){
        await getThemeColor();
    }
    
    
    return {
      props: {
        ...serverObj,
        headerTitle: title,
        settings : {
            noFooter: true,
            mMenu: 'show',
            mMenuContent:{
              icon : 'fas fa-ellipsis-h', 
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
       return <button onClick={() => setActiveKey('tickets')} className={`booking_view btn shadow-bg shadow-bg-sm  mr-0 mb-0 ${!simple ? 'ui-2' : 'bg-theme hover-bg-theme border-light hover-color-white'} animated ${exClass ?? ''}`}>{text?.length > 0 ? text : 'Booking Options'}</button>;
     }
  }

  const ListingConst = ({listing, themeColor}) => {
    //const {listing} = serverObj;
    const {short_desc, meta, cover, categories, about_us, logo,rating, thumbnail, dir_categories, tagline, whatsapp, title, latitude, longitude, phone, address, id, slug, modified} = listing ?? {};
    const router = useRouter();
    const {query} = router;
    const [view, setView] = useRecoilState(listingViewState);
    //const activeView = useRecoilValue(listingViewState);
    const [activeKey, setActiveKey] = useState(query?.page ?? view);

console.log('liss', listing);  
let colorTheme = themeColor ? shadeRGBColor(`rgb(${themeColor.join(',')})`, 0.0) : '#000';

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
   let bottomContent = <>
   <div id="footer-bar" className="footer-bar-1 d-md-none ps-2 py-2">

            <div className='row_flex gap-2'>
                {/* <button onClick={() => setActiveKey('tickets')} className="shadow-bg btn btn-full btn-m rounded-l shadow-bg-m bg-highlight font-700 text-uppercase">Booking</button> */}

                {<button onClick={() => setActiveKey('tickets')} className="btn btn-m shadow-bg shadow-bg-m rounded-s text-uppercase text-nowrap font-900 shadow-s bg-highlight btn-icon text-start">
                  <i class="far fa-calendar-check font-15 text-center"></i>
                  Booking
				          </button>}

                {whatsapp && <a style={{maxWidth: '50px'}} className={''} href={`https://wa.me/${whatsapp}`} >
                    <i class="fab fa-whatsapp color-whatsapp text-center text-24"></i>
                </a>}
                {phone && <a style={{maxWidth: '50px'}} className={''} href={`tel:${phone}`}><i class="fas fa-phone text-center text-24"></i></a>}
              </div>
              <button data-menu='listingActions' onClick={(e) => openOffCanvas(e)} style={{width: '50px', height: '50px', right: '10px'}} className={'d-flex align-items-center justify-center rounded px-2 border position-absolute'}>
                <i class="fas fa-ellipsis-h text-center text-24"/>
              </button>
          </div>
   
   
 </>

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

    <BottomMenu content={bottomContent}/>
    <div className="page-content single_listing ">

    <div className={`card preload-img listing_hero`} style={{backgroundImage: `url(${cover})`, height: activeKey == 'home' ? '65vh' : '40vh'}}>
            {/* <Mirrored coverTop topPadding={'50px'} skewDegrees={5}  skewDir={'-'} YDistance={150}>
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
            </Mirrored> */}
        <div className="card-top m-3">
            <div className="notch-clear">
                <a data-back-button href="#" className="icon icon-xs bg-theme color-theme rounded-m"><i className="fa fa-angle-left"></i></a>
            </div>
        </div>
        <div className="card-bottom bg-gradient-fade p-3 pt-5">
            {activeKey == 'home' && <span className="bg-night-light color-white font-700 p-1">
                {categories[0]?.name}
            </span>}
            <h1 className={`font-900 line-height-xl mt-1 ${activeKey == 'home' ? 'font-40' : 'truncate-2 font-30'}`}>
                {cleanHtml(title?.rendered)}
            </h1>
            <p className="mb-3">
                <i className="fa fa-map-marker font-11 me-2"></i>
                {address}
            </p>
            <div className="d-flex align-items-center">
                {rating && rating > 0 && <div className="align-self-center flex-grow-1">
                    <div className="mb-1"><span className="font-11">
                        User Reviews
                    </span></div>
                    <RatingView rating={rating} id={id}/>
                </div>}
                <div className="align-self-center flex-shrink-1 d-none d-md-block">
                    <button onClick={() => setActiveKey('tickets')} className="btn btn-full btn-s me-3 font-900 text-uppercase rounded-sm shadow-xxl bg-dark-dark">Booking</button>
                </div>
            </div>
        </div>
        {/* <div className="card-overlay bg-gradient-fade-small"></div> */}
    </div>
    <Content activeKey={activeKey} setActiveKey={setActiveKey} listing={listing}/>
    <Client>
        <div className="pt-4"><RelatedByTaxSplide nextUpdater random taxonomy={`category`} ids={dir_categories} exclude={id}/></div>
    </Client>
</div>

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
  
  export default Listing;