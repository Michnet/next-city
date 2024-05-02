//import dynamic from "next/dynamic";
import SiteHead from '@/components/UI/SiteHead';
import NotFound from "@/components/UI/site/NotFound";
// import NotFound from "../components/common/NotFound";


export async function getStaticProps(context) {
  return {
    props: {
      headerTitle: 'Not Found',/* 
      settings : {
        mMenu: 'show',
        mMenuContent:{
          icon : 'las la-filter', 
          data_bs_toggle : "offcanvas",
          'data_bs_target' : "#mobileFilters"}
      } */
    } 
  }
}

const Index = () => {
  return (
    <>
      <SiteHead robots={"noindex,nofollow"} title={'Not Found'}/>
      <div className='page-content'><NotFound/></div>
    </>
  );
};

/* 
const PageLayout = dynamic(() => import('~/appComponents/core/Layout/PageLayout'));

Index.getLayout = function getLayout({children}) {
  return (
      <PageLayout>{children}</PageLayout>
  )
}
 */
export default Index;
//export default dynamic(() => Promise.resolve(index));
