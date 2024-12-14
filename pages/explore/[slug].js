import ExplorerFilter from "@/components/UI/search/ExplorerFilter";
import SearchFilter3 from "@/components/UI/search/SearchFilter3";
//import SiteHead from "@/components/UI/SiteHead";
import { useRecoilValue } from "recoil";
import { UISizes } from "@/contexts/atoms";
import HeaderWrapper from "@/components/layouts/partials/HeaderWrapper";
import Header from "@/components/layouts/partials/Header";
import {  explorerServerQuery } from "@/helpers/rest";
import MainMenuBtn from "@/components/layouts/partials/MainMenuBtn";
import { closeMenus } from "@/helpers/appjs";
import ExploreListings from "@/components/routes/explore/ExploreListings";
import { removeLastCharacter } from "@/helpers/universal";
import ExploreBottomMenu from "@/components/routes/explore/ExploreBottomMenu";

//const listingType = null;


export async function getStaticPaths() {
  const data = ['places', 'special-sales','services','events']
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

export async function getStaticProps({params}) {

  /* res.setHeader(
    'Cache-Control',
    'public, s-maxage=60, stale-while-revalidate=120'
  ) */
  
  let serverObj = await explorerServerQuery({query: params.query, listing_type: removeLastCharacter(params.slug)});
  let {seoDescript} = serverObj;

  return {
    props: {
       ...serverObj,
       listingType: removeLastCharacter(params.slug),
       headerTitle: `Explore ${params.slug}`,
       seoMeta:{
          title: `Explore ${params.slug}`,
          description: seoDescript
       },
        settings : {
        noHeader: true,
        noFooter: true,
        mMenu: 'show',
        mMenuContent:{
          icon : 'las la-filter', 
          btnProps:{
          'data-menu' : "exploreOffCanvas"}
          
      },
      noHeader: true
    },
    revalidate: 6000, // In seconds
  }
}
}

const ExploreDirectory = (props) => {
  const {topList,listingType} = props;
 const {isTab} = useRecoilValue(UISizes);

  return (
    <>
     <div className="page-content" style={{overflow: 'initial'}}>
     {isTab ? <HeaderWrapper header_id={'explore_nav'} innerClass={'flex_row justify-between'}>
        <MainMenuBtn/>
        <ExplorerFilter/>
     </HeaderWrapper> : <Header headerTitle={`Explore LyveCity`} headerClass={'header-always-show'}/>}
      <ExploreBottomMenu/>
      <ExploreListings topList={topList} type={listingType}/>
      </div>
      <div className="menu menu-box-left search_filter bg-theme" tabIndex="-1" id="exploreOffCanvas" >
                <div className="menu-title">
                    <div>
                      <h1>Filter Results</h1>
                      <p className="color-highlight">Filter your Search Results</p>
                    </div>
                    <i className="fas fa-times close-menu" onClick={() => closeMenus()}/>
                </div>
                <div className="offcanvas-body pb-0">
                  <aside className="sidebar  xl:d-block">
                    <SearchFilter3/>
                  </aside>
                </div>
            </div>
    </>
  );
};

export default ExploreDirectory;
