import RelatedByTaxSplide from "@/components/listing/RelatedByTaxSplide";
//import VisitRecord from "@/components/UI/VisitRecord";
import ListingStater from "@/contexts/contextStaters/ListingStater";
import { fetchIdsUrl, fetchSingleListingUrl } from "@/helpers/rest";
import { cleanHtml, shadeRGBColor } from "@/helpers/universal";
import dynamic from "next/dynamic";
import { memo, useEffect, useState, useMemo } from "react";
import SiteHead from "@/components/UI/SiteHead";
import { useRouter } from "next/router";
import ListingSideMenu from "@/components/listing/ListingSideMenu";
import { Client } from "react-hydration-provider";
import RightMenu from "@/components/listing/RightMenu";
import Content from "@/components/listing/Content";
//import { useRecoilValue } from "recoil";
import { authState, listingViewState } from "@/contexts/atoms";
import { useRecoilState, useRecoilValue } from "recoil";
import VisitorActions from "@/components/listing/partials/VisitorActions";
import CallToActions from "@/components/UI/CallToActions";
import Link from "next/link";
import HeaderWrapper from "@/components/layouts/partials/HeaderWrapper";
import ListingTopMenu from "@/components/listing/partials/ListingTopMenu";
import { closeMenus, openOffCanvas } from "@/helpers/appjs";
import BottomMenu from "@/components/layouts/BottomMenu";
import Hero2 from "@/components/listing/landingPages/hero/Hero2";
import ListingFooter from "@/components/listing/landingPages/footer/ListingFooter";
import listingMenu from "@/components/listing/ListingMenu";
import PageScroller from "@/components/UI/partials/PageScroller";
//import Hero from "@/components/listing/landingPages/hero/Hero";
const VisitRecord = dynamic(() => import('@/components/UI/VisitRecord'), { ssr: false });

const ColorThief = require('colorthief');


import { siteColorObjs, siteColors } from "@/helpers/base";
import { randomEither } from "@/helpers/universal";

const randColor = randomEither(siteColors);

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
       return <button onClick={() => setActiveKey('tickets')} className={`booking_view btn shadow-bg shadow-bg-sm  mr-0 ${!simple ? 'ui-2' : 'bg-theme hover-bg-theme border-light hover-color-white'} animated ${exClass ?? ''}`}>{text?.length > 0 ? text : 'Booking Options'}</button>;
     }
  }

  const ListingConst = ({listing, themeColor, color=randColor}) => {
    //const {listing} = serverObj;
    const {short_desc, meta, cover, categories, about_us, logo,rating, thumbnail, dir_categories, tagline, whatsapp, title, latitude, longitude, phone, address, id, slug, modified} = listing ?? {};
    const {_links} = meta ?? {};
    const router = useRouter();
    const {query} = router;
    const [view, setView] = useRecoilState(listingViewState);
    const {user} = useRecoilValue(authState);
    //const activeView = useRecoilValue(listingViewState);
    const [activeKey, setActiveKey] = useState(query?.page ?? view);

console.log('liss', listing);  
let colorTheme = themeColor ? shadeRGBColor(`rgb(${themeColor.join(',')})`, 0.0) : '#000';

useEffect(() => {
  setActiveKey(query?.page ?? view);
}, [listing.id])

const viewModes = [ { id: 1, title: 'Wall', mode : 'home' }, /* { id: 2, title: 'Profile', mode : 'profile' }, */ { id: 3, title: 'Shop', mode : 'merchandise' }, { id: 4, title: 'Cover Only', mode : 'cover' } ];
let VisitorActionsView;
let localMenu = listingMenu({listing:listing, userId: user?.id});
const cachedListing = useMemo( () => listing, [listing.id] );
//const localMenu = useMemo(() => listingMenu({listing:cachedListing, userId: user?.id}), [listing.id, user?.id] );


if(listing){
    VisitorActionsView = <div>
        <VisitorActions setActiveKey={setActiveKey} listing={cachedListing} extraItem = {<div className="action_box" data-menu='activeViewModal'> <i className="las la-bullseye"/> <label>View Mode</label> </div>}/>
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

                {<button onClick={() => setActiveKey('tickets')} className="btn btn-m shadow-bg shadow-bg-m rounded-l text-uppercase text-nowrap font-900 shadow-s gradient-highlight btn-icon text-start">
                  <i class="far fa-calendar-check font-15 text-center bg-transparent"></i>
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
                <ListingTopMenu listing={cachedListing} activeKey={activeKey} setActiveKey={setActiveKey}/>
            </HeaderWrapper>

    <BottomMenu content={bottomContent}/>
    <div className="page-content single_listing ">

        <PageScroller activeKey={activeKey} resetKey={'home'}/>
        <Hero2 /* palette={palette}  */ color={color} listing={cachedListing} activeKey={activeKey} setActiveKey={setActiveKey}  />
        <Content activeKey={activeKey} setActiveKey={setActiveKey} listing={cachedListing} color={color}/>
        <Client>
            <div className="pt-4"><RelatedByTaxSplide nextUpdater random taxonomy={`category`} ids={dir_categories} exclude={id}/></div>
        </Client>
        <ListingFooter thumbnail={thumbnail} activeKey={activeKey} links={_links} setActiveKey={setActiveKey} short_desc={short_desc} title={title?.rendered} tagline={tagline}  tabList={localMenu}    rootClassName="root-class-name"/>
    </div>

    <style>
        {`:root{
          --listingTheme : ${siteColorObjs?.filter((col) => col.name === color)[0]?.hex}
        }
        `}
    </style>

    <ListingSideMenu listing={cachedListing} activeKey={activeKey} setActiveKey={setActiveKey}/>
    <RightMenu listing={cachedListing} activeKey={activeKey} setActiveKey={setActiveKey}/>
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