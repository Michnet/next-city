import { fetchIdsUrl, listingServerQuery } from "@/helpers/rest";
import { setSeoData } from "@/app/utils/helpers";
import { cleanHtml } from "@/helpers/universal";
import HeaderWrapper from "@/components/layouts/partials/HeaderWrapper";
//import ListingTopMenu from "@/components/listing/ListingTopMenu";
//import { useMemo } from "react";
import listingMenu from "@/components/listing/ListingMenu";
import AppListingBottomMenu from "@/app/components/listing/appListingBottomMenu";
import PageScroller from "@/components/UI/partials/PageScroller";
import ListingTopMenu from "@/app/components/listing/appListingTopMenu";
import Hero2 from "@/components/listing/landingPages/hero/Hero2";
import { Heading1 } from "@/components/UI/partials/headings/Heading1";
import Navigator from "@/app/components/listing/navigation/appNavigator";
import { Client } from "react-hydration-provider";
import { siteColorObjs } from "@/helpers/base";
import ProfileInfo from "@/components/listing/profileInfo/ProfileInfo";
import dynamic from "next/dynamic";
//import { closeMenus } from "@/helpers/appjs";
import ListingActions from "@/app/components/listing/listingActions";
//import RelatedListings from "@/components/listing/partials/RelatedListings";
import VisitRecord from "@/components/UI/VisitRecord";
import ListingStater from "@/contexts/contextStaters/ListingStater";
import RelatedListings from "@/app/components/RelatedListings";
const RightMenu = dynamic(() => import("@/components/listing/RightMenu"));


export async function generateMetadata({ params }) {
    let serverQuery = await listingServerQuery(params);
      let {serverObj} = serverQuery ?? {};
      let {listing} = serverObj ?? {};
  
      //let seoMetaObj = {}
      const {title} = listing ?? {};
    
    const metadata = setSeoData(
      { seo: {
          title: {
              template: `%s | ${cleanHtml(title?.rendered)}`,
              default: 'Home',
            },
      }
    })
  
    return {
      ...metadata,
    }
  }

  
export default async function ListingLayout({ children, params}) {
    const {slug} = params;

    let serverQuery = await listingServerQuery(params);
      let {serverObj} = serverQuery ?? {};
      let {listing, themeColorHex, themeColor} = serverObj ?? {};
      const {dir_categories, type, category, locations} = listing;
  
      //let seoMetaObj = {}
      //const {title} = listing ?? {};

   // const lMenu = useMemo(() => listingMenu({listing:listing/* , userId: user?.id */}), [listing?.id] );
   const lMenu = listingMenu({listing:listing});
   
   console.log('from slug layout', params);
    
    return (<>
            <div className="listing_page _place">
                <HeaderWrapper headerClass={`header-invert header-always-show`} header_id={'listing_header'}>
                    <ListingTopMenu params={params} lMenu={lMenu} listing={listing} base='listing' slug={slug}/* activeKey={activeKey} *//>
                </HeaderWrapper>
                <AppListingBottomMenu params={params} lMenu={lMenu} base='listing' slug={slug} listing={listing} /*setActiveKey={setActiveView}  color={color}  activeKey={activeKey} *//>
                <div className="page-content single_listing">
                    <PageScroller activeKey={slug} resetKey={'home'}/>
                    {children}
                    <>
                    <div className='border mx-2 pb-2 mb-2 mt-3'>
                        <Heading1 exClass="mt-20 mb-20 px-4" title={'Explore Page'} subtitle={`All in ${cleanHtml(listing?.title?.rendered)}`}/>
                        <Navigator params={params}  faClass={'fad'} base='listing' slug={slug}  itemClass='col-sm-4 col-md-3 col-lg-2 col-6 pe-2' exClass='px-3 view_all grid gap-0' lMenu={lMenu} /* setActiveKey={setActiveView} activeKey={activeKey} *//>
                        </div>
                    </>
                    <ProfileInfo exClass={'px-lg-0 px-2 py-2'} listing={listing} /* setActiveKey={setActiveKey} *//>
                </div>
                <Client>
                <style>
                    {`:root{
                        --listingTheme : ${siteColorObjs?.filter((col) => col.name === themeColor)[0]?.hex ?? '#000'}
                    }
                    `}
                </style>
                </Client>


                <RightMenu appRouter base='listing' slug={slug} lMenu={lMenu} listing={listing} /* activeKey={activeKey} setActiveKey={setActiveView} *//>
                {/* <div id="activeViewModal" className="menu menu-box-bottom menu-box-detached">
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
                </div> */}
                <Client>
                <ListingActions listing={listing}/>
                </Client>
                <RelatedListings  type={type} category={category} locations={locations} dir_categories={dir_categories} listingId={listing?.id}/>
        </div>
        <VisitRecord Id={listing?.id}/>
        <ListingStater type={type} id={listing?.id}/>
      </>
    )
  }