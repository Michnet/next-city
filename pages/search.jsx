import SiteHead from "@/components/UI/SiteHead";
import Search from "@/components/UI/search/Search";

const SearchPage = () => {
  return (
    <>
        <SiteHead title={`Search`}>
           {/*  <Script async src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDquFA71wYW2IHiZOADRsHKG2NFs1X6ZG0" /> */}
        </SiteHead>
        <div className="page-content">
          <Search withSideFilter columnObj={{0: 1, 420: 2, 600: 3, 768:2, 992:3,  1200: 4}}/>
        </div>
    </>
  );
}

export async function getStaticProps(context) {
  return {
    props: {
      settings : {
        mMenu: 'show',
        mMenuContent:{
          icon : 'las la-filter', 
          data_bs_toggle : "offcanvas",
          'data_bs_target' : "#mobileFilters"}
      }
    } 
  }
}

/* const PageLayout = dynamic(() => import('~/appComponents/core/Layout/PageLayout'));

SearchPage.getLayout = function getLayout({children}) {
  return (
      <PageLayout>{children}</PageLayout>
  )
} */

export default SearchPage;
