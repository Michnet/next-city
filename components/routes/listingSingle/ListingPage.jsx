import dynamic from "next/dynamic";
import { cleanHtml, scrollTop } from "@/helpers/universal";
import { memo, useEffect, useState, useMemo } from "react";
import { useRouter } from "next/router";
//const ListingSideMenu = dynamic(() => import("@/components/listing/ListingSideMenu"));
import { Client } from "react-hydration-provider";
const RightMenu = dynamic(() => import("@/components/listing/RightMenu"));
import Content from "@/components/listing/Content";
//import { useRecoilValue } from "recoil";
import { authState, listingViewState } from "@/contexts/atoms";
import { useRecoilState, useRecoilValue } from "recoil";
const VisitorActions = dynamic(() => import("@/components/listing/partials/VisitorActions"));
const CallToActions = dynamic(() => import("@/components/UI/CallToActions"));
import HeaderWrapper from "@/components/layouts/partials/HeaderWrapper";
import ListingTopMenu from "@/components/listing/ListingTopMenu";
import { closeMenus, openOffCanvas } from "@/helpers/appjs";
//import BottomMenu from "@/components/layouts/BottomMenu";
import Hero2 from "@/components/listing/landingPages/hero/Hero2";
import listingMenu from "@/components/listing/ListingMenu";
import PageScroller from "@/components/UI/partials/PageScroller";
//import Hero from "@/components/listing/landingPages/hero/Hero";
//const ListingFooter = dynamic(() => import('@/components/listing/landingPages/footer/ListingFooter'), { ssr: false });
const ListingBottomMenu = dynamic(() => import('@/components/listing/ListingBottomMenu'), { ssr: false });

//const ColorThief = require('colorthief');

import SiteMapContent, { siteColorObjs, siteColors } from "@/helpers/base";
import LazyLoad from "react-lazyload";
import { Skeleton } from "@/components/skeletons/Skeletons";
import Link from "next/link";
import { Heading1 } from "@/components/UI/partials/headings/Heading1";
const ProfileInfo = dynamic(() => import("@/components/listing/profileInfo/ProfileInfo"));
const Navigator = dynamic(() => import("@/components/listing/navigation/Navigator"));

  const ListingPageConst = ({listing, themeColor, themeColorHex, listingType}) => {
    
    const {slug,  type} = listing ?? {};
    const router = useRouter();
    const {query} = router;
    const [view, setView] = useRecoilState(listingViewState);
    const {user, token} = useRecoilValue(authState);
    const [activeKey, setActiveKey] = useState(router.asPath.split('#')[1] ?? view);

    function setActiveView(view){
     /*  const url = {
        pathname: router.as,
        query: { ...router.query, view: view }
      }
      router.push(url, undefined, { shallow: true }) */
      setActiveKey(view)
    }

useEffect(() => {
  scrollTop();
  setActiveKey(router.asPath.split('#')[1] ?? view);
}, [query?.view, view]);

const viewModes = [ { id: 1, title: 'Wall', mode : 'home' }, /* { id: 2, title: 'Profile', mode : 'profile' }, */ { id: 3, title: 'Shop', mode : 'merchandise' }, { id: 4, title: 'Cover Only', mode : 'cover' } ];
let VisitorActionsView;

const cachedListing = useMemo( () => listing, [listing?.id] );
//const color = useMemo( () => randomEither(siteColors), [cachedListing.id] );
const color = themeColor;
//const lMenu = useMemo(() => listingMenu({listing:cachedListing, userId: user?.id}), [listing?.id, user?.id]);
let lMenu = listingMenu({listing:cachedListing});

if(listing){
    VisitorActionsView = <div>
        <VisitorActions setActiveKey={setActiveView} listing={cachedListing} extraItem = {<div className="action_box" data-menu='activeViewModal' onClick={(e) => openOffCanvas(e)}> <i className="las la-bullseye"/> <label>View Mode</label> </div>}/>
        <hr/>
        <CallToActions centered thin light bgClass={'bg-transparent'} actionComponent={
            <div className="d-flex  gap-3 flex-center">
                <Link href={'/add-listing'}><button
            className="btn btn-theme rounded-22 w-auto px-10 h-full text-14 fw-500"
            >
            Create listing page
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
  linkzz.push({ name: title, routerPath: `/${type}s/${slug}/#${id}` })
  }
});
return linkzz;
}

    return <>
           <HeaderWrapper headerClass={`header-invert header-always-show`} header_id={'listing_header'}>
                <ListingTopMenu lMenu={lMenu} listing={cachedListing} activeKey={activeKey} setActiveKey={setActiveView}/>
            </HeaderWrapper>
            <SiteMapContent links={siteMapper()}/>

        <ListingBottomMenu user={user} lMenu={lMenu} setActiveKey={setActiveView} listing={listing} color={color} activeKey={activeKey}/>
        <div className="page-content single_listing">

        <PageScroller activeKey={activeKey} resetKey={'home'}/>
        <Hero2 lMenu={lMenu}  user={user} token={token} color={color} listing={cachedListing} activeKey={activeKey} setActiveKey={setActiveView}/>
        {/* <HeroParallax user={user} token={token} color={color} listing={cachedListing} activeKey={activeKey} setActiveKey={setActiveView}/> */}
        <Content listingType={listingType} lMenu={lMenu}  activeKey={activeKey} setActiveKey={setActiveView} listing={cachedListing} color={color} colorHex={themeColorHex}/>
        <Client>
          <LazyLoad placeholder={<Skeleton height={400}/>} offset={600} once>
          <div className='border mx-2 pb-2 mb-2 mt-3'>
          <Heading1 exClass="mt-20 mb-20 px-4" title={'Explore Page'} subtitle={`All in ${cleanHtml(listing?.title?.rendered)}`}/>
            <Navigator  faClass={'fad'} itemClass='col-sm-4 col-md-3 col-lg-2 col-6 pe-2' exClass='px-3 view_all grid gap-0' lMenu={lMenu} setActiveKey={setActiveView} /* listing={listing} */ activeKey={activeKey}/>
            </div>
            </LazyLoad>
        </Client>
        <LazyLoad placeholder={<Skeleton height={400}/>} offset={600} once>
         <ProfileInfo exClass={'px-lg-0 px-2 py-2'} listing={cachedListing} setActiveKey={setActiveKey}/>
        </LazyLoad>
        
        {/* <LazyLoad placeholder={<Skeleton height={400}/>} offset={200} once>
          <ListingFooter listing={listing} thumbnail={thumbnail} activeKey={activeKey} links={_links} setActiveKey={setActiveView} short_desc={short_desc} title={title?.rendered} tagline={tagline}  tabList={lMenu}    rootClassName="root-class-name"/>
        </LazyLoad> */}
        
    </div>

    <Client>
      <style>
          {`:root{
            --listingTheme : ${siteColorObjs?.filter((col) => col.name === color)[0]?.hex ?? '#000'};
            --listingGradient : var(--gradient-${color});
          }
          `}
      </style>
    </Client>

    <RightMenu lMenu={lMenu} listing={cachedListing} activeKey={activeKey} setActiveKey={setActiveView}/>
    <div id="activeViewModal" className="menu menu-box-bottom menu-box-detached">
        <div className="menu-title">
            <div className="p-3"><h5 className="font-18">ListingPage Home page</h5></div>
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
        <div className="menu-title smLine mt-0">
              <div><h1 className="truncate-2 p-0 px-3">{cleanHtml(listing?.title.rendered)}</h1>
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
              </>

  }


  //const ListingPage = memo(ListingPageConst);
  
  export default ListingPageConst;