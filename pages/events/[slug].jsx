import dynamic from "next/dynamic";
const RelatedByTaxSplide = dynamic(() => import("@/components/listing/RelatedByTaxSplide"));
//import VisitRecord from "@/components/UI/VisitRecord";
const ListingStater = dynamic(() => import("@/contexts/contextStaters/ListingStater"));
import { fetchIdsUrl, fetchSingleListingUrl, getUserRest } from "@/helpers/rest";
import { cleanHtml, scrollTop, shadeRGBColor } from "@/helpers/universal";
import { memo, useEffect, useState, useMemo } from "react";
import { useRouter } from "next/router";
//const ListingSideMenu = dynamic(() => import("@/components/listing/ListingSideMenu"));
import { Client } from "react-hydration-provider";
const RightMenu = dynamic(() => import("@/components/listing/RightMenu"));
import Content from "@/components/listing/Content";
//import { useRecoilValue } from "recoil";
import { authState, listingViewState } from "@/contexts/atoms";
import { useRecoilState, useRecoilValue } from "recoil";
import VisitorActions from "@/components/listing/partials/VisitorActions";
const CallToActions = dynamic(() => import("@/components/UI/CallToActions"));
import HeaderWrapper from "@/components/layouts/partials/HeaderWrapper";
import ListingTopMenu from "@/components/listing/ListingTopMenu";
import { closeMenus, openOffCanvas } from "@/helpers/appjs";
//import BottomMenu from "@/components/layouts/BottomMenu";
import Hero2 from "@/components/listing/landingPages/hero/Hero2";
import listingMenu from "@/components/listing/ListingMenu";
import PageScroller from "@/components/UI/partials/PageScroller";
//import Hero from "@/components/listing/landingPages/hero/Hero";
const VisitRecord = dynamic(() => import('@/components/UI/VisitRecord'), { ssr: false });
const ListingFooter = dynamic(() => import('@/components/listing/landingPages/footer/ListingFooter'), { ssr: false });
const ListingBottomMenu = dynamic(() => import('@/components/listing/ListingBottomMenu'), { ssr: false });
//const SiteHead = dynamic(() => import("@/components/UI/SiteHead"));
import { EventJsonLd } from 'next-seo';


const ColorThief = require('colorthief');


import SiteMapContent, { siteColorObjs, siteColors } from "@/helpers/base";
import { randomEither } from "@/helpers/universal";
import LazyLoad from "react-lazyload";
import { Skeleton } from "@/components/skeletons/Skeletons";
import Link from "next/link";
const Navigator = dynamic(() => import("@/components/listing/Navigator"));


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
        /* if(listing?.cover?.length > 0 && listing?.cover?.startsWith('http')){
          let gota = await ColorThief.getColor(listing?.cover)
          .then(color => {return color})
          .catch(err => { console.log(err) });
          if(gota){
            serverObj.themeColor = gota;
          }
        } */

        const color = randomEither(siteColors);
        serverObj.themeColor = color;
    }


    async function extendListing(listing){
      //const blurUrl = listing?.cover ? await getBase64(listing.cover) : null;
      //const fbBlur = await getBase64Static('./public/images/bg/fallback.jpg');
      //const blurryGal = await galleryWithBlurs(listing.gallery);
      const author = await getUserRest({key:'ID', val: listing.author_id});
  
      serverObj = {...serverObj, listing : {...listing, author: author ? author.user : null }}
      /* serverQuery = {...serverQuery, 
        serverObj : {...serverObj, 
          listing : {...listing, 
          coverBlur : blurUrl && blurUrl != 'undefined' ? blurUrl : fallbackImgBlur,
          galleryWithBlurs : blurryGal,
          author: author ? author.user : null
        }}} */
    }

    if(listing){
        await getThemeColor();
        await extendListing(listing);
    }
    
    const { latitude, longitude, phone, address, slug, modified} = listing ?? {};

    return {
      props: {
        seoMeta:{
          title:`${cleanHtml(listing?.title?.rendered)}`, 
           description:`${listing?.short_desc}`,
           image:listing?.large_thumb,
           type:'event',
           updated_time:modified,
           phone_number:phone,
           street_address:address,
           latitude:latitude,
           longitude:longitude,
           slug:`/events/${slug}`,
        },
        ...serverObj,
        headerTitle: title,
        settings : {
           uiBackground:listing?.cover,
            noFooter: true,
            pageClass: '_listing _event',
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

  export const BookingView = ({text = null, exClass, children, simple=true, setActiveKey, activeKey='private-chat'}) => {
    if(children){
       return <div onClick={() => setActiveKey(activeKey)}> {children} </div>
     }else{
       return <button onClick={() => setActiveKey(activeKey)} className={`booking_view btn shadow-bg shadow-bg-sm  mr-0 ${!simple ? 'ui-2' : 'bg-theme hover-bg-theme border-light hover-color-white'} animated ${exClass ?? ''}`}>{text?.length > 0 ? text : 'Booking Options'}</button>;
     }
  }

  const ListingConst = ({listing, themeColor, seoMeta}) => {
    console.log('themeColor', themeColor)
    
    //const {listing} = serverObj;
    const {short_desc, meta, cover, category, about_us, logo, thumbnail, dir_categories, tagline, whatsapp, title, latitude, longitude, phone, address, id, slug, modified, gallery, xtra_large_thumb, locations, venue, rating, event_date} = listing ?? {};
    const {_links} = meta ?? {};
    const router = useRouter();
    const {query} = router;
    const [view, setView] = useRecoilState(listingViewState);
    const {user} = useRecoilValue(authState);
    //const activeView = useRecoilValue(listingViewState);
    const [activeKey, setActiveKey] = useState(query?.view ?? view);

    function setActiveView(view){
      const url = {
        pathname: router.pathname,
        query: { ...router.query, view: view }
      }
      router.push(url, undefined, { shallow: true })
    }

useEffect(() => {
  setActiveKey(view);
  return () => setActiveKey(view);
}, [listing.id, view]);

useEffect(() => {
  scrollTop();
  setActiveKey(query?.view ?? view);
}, [query?.view]);

const viewModes = [ { id: 1, title: 'Wall', mode : 'home' }, /* { id: 2, title: 'Profile', mode : 'profile' }, */ { id: 3, title: 'Shop', mode : 'merchandise' }, { id: 4, title: 'Cover Only', mode : 'cover' } ];
let VisitorActionsView;
//let lMenu = listingMenu({listing:listing, userId: user?.id});

const cachedListing = useMemo( () => listing, [listing.id] );
//const color = useMemo( () => randomEither(siteColors), [cachedListing.id] );
const color = themeColor;
const lMenu = useMemo(() => listingMenu({listing:cachedListing, userId: user?.id}), [listing.id, user?.id] );


if(listing){
    VisitorActionsView = <div>
        <VisitorActions setActiveKey={setActiveView} listing={cachedListing} extraItem = {<div className="action_box" data-menu='activeViewModal' onClick={(e) => openOffCanvas(e)}> <i className="las la-bullseye"/> <label>View Mode</label> </div>}/>
        <hr/>
        <CallToActions centered thin light bgClass={'bg-transparent'} actionComponent={
            <div className="d-flex  gap-3 flex-center">
                <Link href={'/add-listing'}><button
            className="btn btn-theme rounded-22 w-auto px-10 h-full text-14 fw-500"
            >
            Create event page
            </button></Link>
            <Link href={'/about/about-us'}><button
            className="btn btn-outline-theme rounded-22 w-auto px-10 h-full text-14 fw-500"
            >
            Learn More
            </button></Link>
            </div>
            }
            descript = {"You can also create your own event page today. It's FREE"}
            />
        </div>
}
      

 function siteMapper(){
  let linkzz = [];
  lMenu.map((el) => {
  if(el?.content !== 'empty'){
  const {id, icon, buttony, title, subTitle} = el;
  linkzz.push({ name: title, routerPath: `/events/${slug}?view=${id}` })
  }
});
return linkzz;
}

    return (<div className={`listing_page ${query?.view &&  query?.view !== 'home' ? '_section' : ''}`}>{/* <SiteHead
           title={`${cleanHtml(listing?.title?.rendered)}`} 
           description={`${listing?.short_desc}`}
           image={listing?.large_thumb}
           type='event'
           updated_time={modified}
           phone_number={phone}
           street_address={address}
           latitude={latitude}
           longitude={longitude}
           slug={`/events/${slug}`}/> */}

<EventJsonLd
      name={`${cleanHtml(listing?.title?.rendered)}`}
      startDate={event_date[0]?.start}
      endDate={event_date[0]?.end}
      location={{
        name: venue,
        //sameAs: 'https://example.com/my-place',
        address: {
          streetAddress: {address},
          addressLocality: locations[0]?.name,
          //addressRegion: 'CA',
          //postalCode: '95129',
          //addressCountry: 'US',
        },
      }}
      geo={{
        latitude: latitude,
        longitude: longitude,
      }}
      rating={{
        ratingValue: (rating/10) * 5,
        ratingCount: '18',
      }}
      images={[xtra_large_thumb, ...gallery]}
      description={`${listing?.short_desc}`}
    />
           <HeaderWrapper headerClass={`header-invert header-always-show`} header_id={'listing_header'}>
                <ListingTopMenu lMenu={lMenu} listing={cachedListing} activeKey={activeKey} setActiveKey={setActiveView}/>
            </HeaderWrapper>
            <SiteMapContent links={siteMapper()}/>

    <ListingBottomMenu user={user} lMenu={lMenu} setActiveKey={setActiveView} listing={listing} color={color} activeKey={activeKey}/>
    <div className="page-content single_listing">

        <PageScroller activeKey={activeKey} resetKey={'home'}/>
        <Hero2  color={color} listing={cachedListing} activeKey={activeKey} setActiveKey={setActiveView}  />
        <Content lMenu={lMenu}  activeKey={activeKey} setActiveKey={setActiveView} listing={cachedListing} color={color}/>
        <Client>
            <Navigator exClass='px-3' lMenu={lMenu} setActiveKey={setActiveView} listing={listing} activeKey={activeKey}/>
        </Client>
        
        <Client>
              <div className="pt-3">
                <RelatedByTaxSplide nextUpdater random taxonomy={`category`} taxName={category?.name} slug={category.slug} ids={dir_categories} exclude={id}/></div>
              {locations?.length > 0 && 
                <>
                  <div className="pt-3"><RelatedByTaxSplide taxonomy={`region`} slug={locations[0]?.slug} taxName={locations[0]?.name} exclude={id}/></div>
                </>}
        </Client>
        <LazyLoad placeholder={<Skeleton height={400}/>} offset={200} once>
          <ListingFooter listing={listing} thumbnail={thumbnail} activeKey={activeKey} links={_links} setActiveKey={setActiveView} short_desc={short_desc} title={title?.rendered} tagline={tagline}  tabList={lMenu}    rootClassName="root-class-name"/>
        </LazyLoad>
        <CallToActions exClass={'rounded-0 mx-2 text-white bg-dark-dark'} title='Get listed' centered thin   actionComponent={
            <div className="d-flex  gap-3 flex-center">
                <Link href={'/add-listing'}><button
            className="btn btn-outline-theme rounded-22 w-auto px-10 h-full text-14 fw-500 border-dark-light shadow-0"
            >
            Create event page
            </button></Link>
            <Link href={'/about/about-us'}><button
            className="btn btn-outline-theme rounded-22 w-auto px-10 h-full text-14 fw-500 border-dark-light shadow-0"
            >
            Learn More
            </button></Link>
            </div>
            }
            descript = {"List your event on LyveCity today. It's FREE"}
            />
    </div>

    <Client>
      <style>
          {`:root{
            --listingTheme : ${siteColorObjs?.filter((col) => col.name === color)[0]?.hex ?? '#000'}
          }
          `}
      </style>
    </Client>

    {/* <ListingSideMenu lMenu={lMenu} listing={cachedListing} activeKey={activeKey} setActiveKey={setActiveView}/> */}
    <RightMenu lMenu={lMenu} listing={cachedListing} activeKey={activeKey} setActiveKey={setActiveView}/>
    <div id="activeViewModal" className="menu menu-box-bottom menu-box-detached">
        <div className="menu-title">
            <div className="p-3"><h5 className="font-18">Listing Home page</h5></div>
            <span className="close-menu" onClick={() => closeMenus()}>
              <i className="fa fa-times"></i>
            </span>
        </div>
        <div className="content">
            <p>Choose the first thing you want to see when you open a listing's page</p>
            <div class="btns view_modes py-3">
                {viewModes.map((el) => {
                const {id, mode, title} = el;
                return <button disabled={view == mode} key={id} type="button" class={`btn mr-10  ${view == mode ? 'active radius-30' : 'ui-2 animated'}`} onClick={() => setView(mode)}>{title}</button>

                })}
            </div>
        </div>
    </div>

    <div id="listingActions" className="menu menu-box-bottom menu-box-detached">
        <div className="menu-title mt-0 pt-0">
              <div><h1>{cleanHtml(listing?.title.rendered)}</h1>
              <p className="color-highlight">Options ...</p></div>
              <span className="close-menu" onClick={() => closeMenus()}>
                <i className="fa fa-times"></i>
              </span>
            </div>
            <div className="divider divider-margins mb-n2"></div>
        <div className="content">
            {VisitorActionsView}
        </div>
    </div>
    <VisitRecord Id={listing.id}/>
    <ListingStater id={listing.id}/></div>)

  }


  const Listing = memo(ListingConst);
  
  export default Listing;