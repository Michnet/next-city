//import dynamic from "next/dynamic";
import SiteHead from '@/components/UI/SiteHead';
import NotFound from "@/components/UI/site/NotFound";
// import NotFound from "../components/common/NotFound";

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
