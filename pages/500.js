//import dynamic from "next/dynamic";
import SiteHead from '@/components/UI/SiteHead';
import NotServed from "@/components/UI/site/NotServed";
// import NotServed from "~/components/common/NotServed";

export async function getStaticProps(context) {
  return {
    props: {
      headerTitle: 'Not Served'
    } 
  }
}


const Index = () => {
  return (
    <>
      <SiteHead robots={"noindex,nofollow"} title={'Not Served'}/>
      <div className='page-content'><NotServed/></div>
    </>
  );
};
/* 

const PageLayout = dynamic(() => import('~/appComponents/core/Layout/PageLayout'));

Index.getLayout = function getLayout({children}) {
  return (
      <PageLayout>{children}</PageLayout>
  )
} */

export default Index;
//export default dynamic(() => Promise.resolve(index));
