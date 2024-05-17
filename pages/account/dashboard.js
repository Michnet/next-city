import { useEffect, useState } from "react";
//import UpdateUser from "~/routes/userAuth/SignUp/update";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { useRecoilValue } from "recoil";
import { fetchListings } from "@/helpers/rest";
//import { UserAvatar } from "@/components/UI/UserAvatar";
import DashboardCard from "@/components/dashboard/DashboardCard";
import Sidebar from "@/components/dashboard/Sidebar";
import { LoaderDualRingBoxed } from "@/components/skeletons/Loaders";
import { authState } from "@/contexts/atoms";
import BottomMenu from "@/components/layouts/BottomMenu";
import GuestPrompt from "@/components/UI/GuestPrompt";
import { closeMenus } from "@/helpers/appjs";


export async function getServerSideProps() {
  return {
    props: {
      headerTitle: 'My Dashboard',
      seoMeta:{title: 'Dashboard', nofollow:true},
      settings : {
        hideNews: true,
        transparentHeader: true,
       mMenu: 'hide',
       noFooter: true
      }
    }
  }
}

const UserDashboard = (props) => {
  const {query} = useRouter();

  const {user} = useRecoilValue(authState);
  const {name, id} = user ?? {};
  const [authored, setAuthored] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(query?.station ?? 'home');

  
  let accountView, PageView;

  const payload = {
    _fields : "id",
    _embed : true,
    per_page : 50,
    author: id
    }

  async function usersListings(payload) {
       
    const fetchedListings = await fetchListings(payload);
    if (fetchedListings) {
        setAuthored(fetchedListings.items);
    } else {
        setAuthored(null);
    }
    setLoading(false);
  }

  useEffect(() => {
    let loaded = true;
    if(loaded){
    usersListings(payload);
    }
    return ()=>{
      loaded = false;
    }
  }, [user, query]);



  switch (page) {
    case 'booking':
      PageView = dynamic(() => import("@/components/dashboard/db-booking/DBBooking"));
      break;
    case 'saved':
      PageView = dynamic(() => import("@/components/dashboard/db-wishlist/DBSaved"));
      break;
    
    case 'posted':
      PageView = dynamic(() => import("@/components/dashboard/db-posted/DBPosted"));
      break;

    case 'settings':
      PageView = dynamic(() => import("@/components/dashboard/db-settings/DBSettings"));
      break;

    case 'chatroom':
      PageView = dynamic(() => import("@/components/dashboard/chatroom/ChatRoom"));
      break;
  
    default:
      PageView = () => (<>
        <DashboardCard loading={loading} user={user} ownPosts={authored?.length} setPage={setPage}/></>)
      break;
  }
  

  if(loading){
    accountView = <div style={{height: '300px'}}><LoaderDualRingBoxed/></div>
  }else if(user){
    const {user_meta} = user;
    const {likes} = user_meta;
    accountView = <div className="dashboard">
                  <div className="dashboard__main p-0">
                    
                    <div className="row position-relative flex-nowrap" style={{rowGap : 15}}>
                          <div className="col-12 col-md-3 pt-3 col-lg-2 md:px-0 d-none d-md-block md_sticky_col" style={{ top: '50px'}}>
                          <Sidebar user={user} page={page} setPage={setPage}/>
                          </div>
                          <div className="col-12 col-md-9 col-lg-10 p-3">
                              <PageView userId={id} user_meta={user_meta}/>
                          </div>
                  </div>
                  </div>
                </div>
  }else{
    accountView= <div className="dashboard__content min-h-250 bg-dark-1 p-3 pt-90 pb-90 h-100">
                    <GuestPrompt title={'Your account'} descript={'Login or sign-up to access your free user dashboard now'}/>
                </div>
  }

  return (<>
     <BottomMenu icon={'fa fa-user'} btnProps={{'data-menu':'user_menu'}}/>
    <div className='page-content overflow-initial'>{accountView}</div>
    <div id='user_menu' className="menu menu-box-left pt-3">
      <div className="menu-title mt-0 pt-0">
        <h1>My Account</h1>
{/*         <p className="color-highlight">Flexible and Easy to Use</p>
 */}        <span className="close-menu" onClick={() => closeMenus()}>
          <i className="fa fa-times"></i>
        </span>
      </div>
      <Sidebar exClass='bg-transparent shadow-0' page={page} setPage={setPage} user={user}/>
    </div>

    </>
  );
};

export default UserDashboard;
