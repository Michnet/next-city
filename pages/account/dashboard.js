import { useEffect, useState } from "react";
import GuestPrompt from "~/routes/userAuth/GuestPrompt";
import { fetchListings } from "~/server/WpRest";
import { BSModal, UserAvatar } from "~/appComponents/components/UI/components";
import UpdateUser from "~/routes/userAuth/SignUp/update";
//import Sidebar from "./common/Sidebar";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import DashboardCard from "~/components/dashboard/db-dashboard/components/DashboardCard";
import Sidebar from "~/components/dashboard/common/Sidebar";
import { useRecoilValue } from "recoil";
import { authState } from "~/contexts/contexts";
import { LoaderDualRingBoxed } from "~/appComponents/components/skeletons/React-content-loader/Loaders";


export async function getServerSideProps() {
  return {
    props: {
      settings : {
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
    usersListings(payload);
  }, [user]);

  switch (page) {
    case 'booking':
      PageView = dynamic(() => import("~/components/dashboard/db-booking/DBBooking"));
      break;
    case 'saved':
      PageView = dynamic(() => import("~/components/dashboard/db-wishlist/DBSaved"));
      break;
    
    case 'posted':
      PageView = dynamic(() => import("~/components/dashboard/db-posted/DBPosted"));
      break;

    case 'settings':
      PageView = dynamic(() => import("~/components/dashboard/db-settings/DBSettings"));
      break;

    case 'chatroom':
      PageView = dynamic(() => import("~/routes/ChatRoom"));
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
                  <BSModal content={<Sidebar page={page} setPage={setPage}/>} modal_id={'user_menu'}/>
                  <div className="dashboard__main p-0">
                    <div className="dashboard__content bg-dark-1 p-3 pt-90">
                      <div className="row y-gap-20 justify-between items-end">
                        <div className="col-12">
                          <div className="d-flex flex-row flex-nowrap gap-2 align-items-center"><UserAvatar/><h1 className="text-30 lh-14 fw-600 text-white">{name}</h1></div>
                          <div className="text-15 text-light-1">
                            My account information.
                          </div>
                          <div className="action_group mt-20 mb-20">
                            <BSModal modal_id={'edit_user'} btnLabel={'Edit Profile'} btnClass={'btn-sm btn-theme'} content={<UpdateUser id={id}/>}/>
                          </div>
                          <button className="d-flex text-yellow-4 d-none md:d-block" data-bs-toggle="modal" data-bs-target="#user_menu">
                            <i className="icon-menu-2 text-20"></i>
                          </button>
                        </div>
                      </div>

                    </div>
                    <div className="row position-relative" style={{rowGap : 15}}>
                          <div className="col-12 col-md-3 col-lg-2 md:px-0 d-block md:d-none md_sticky_col">
                          <Sidebar page={page} setPage={setPage}/>
                          </div>
                          <div className="col-12 col-md-9 col-lg-10 p-0">
                              <PageView userId={id} user_meta={user_meta}/>
                          </div>
                  </div>
                  </div>
                </div>
  }else{
    accountView= <div className="dashboard__content min-h-250 bg-dark-1 p-3 pt-90 pb-90 h-100">
                    <GuestPrompt/>
                </div>
  }

  return (
    <>{accountView}</>
  );
};

const PageLayout = dynamic(() => import('~/appComponents/core/Layout/PageLayout'));

UserDashboard.getLayout = function getLayout({children}) {
  return (
      <PageLayout>{children}</PageLayout>
  )
}

export default UserDashboard;
