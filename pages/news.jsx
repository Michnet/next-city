import { useRecoilValue } from "recoil";
import { authState } from "@/contexts/atoms";
import SiteActivity from "@/components/UI/lists/SiteActivity";


export async function getStaticProps() {
  return {
    props: {
      settings : {
        //mMenu: 'hide',
        noFooter : true
      }
    }
  }
}

const SiteNews = () => {
  const {user, token} = useRecoilValue(authState);
  
  return (
    <div className="page-content">
      <div className="container p-sm-3 p-2"><SiteActivity user={user} token={token}/></div>
    </div>
  )
}

/* import dynamic from "next/dynamic";
const PageLayout = dynamic(() => import('~/appComponents/core/Layout/PageLayout'));

SiteNews.getLayout = function getLayout({children}) {
  return (
      <PageLayout>{children}</PageLayout>
  )
} */

export default SiteNews