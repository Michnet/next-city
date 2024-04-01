import {useState, useEffect } from "react";
import {useRouter } from "next/router";
import dynamic from "next/dynamic";
import { useRecoilValue } from "recoil";
import Sidebar from "@/components/dashboard/Sidebar";
import { LoaderDualRingBoxed } from "@/components/skeletons/Loaders";
import { authState } from "@/contexts/atoms";
import BottomMenu from "@/components/layouts/BottomMenu";
import GuestPrompt from "@/components/UI/GuestPrompt";
import { openOffCanvas } from "@/helpers/appjs";


export async function getServerSideProps() {
  return {
    props: {
      settings : {
        hideNews: true,
        transparentHeader: true,
       mMenu: 'hide',
       hideFooter: true
      }
    }
  }
}

const UserDashboard = () => {
  const {query} = useRouter();

  const {user} = useRecoilValue(authState);
  const {id} = user ?? {};
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(query?.station ?? 'home');

  useEffect(() => {
    setLoading(false);
    return ()=>{
      setLoading(true);
    }
  }, [user]);

  
  let accountView;
  let PageView = dynamic(() => import("@/components/dashboard/chatroom/ChatRoom"));
  
  if(loading){
    accountView = <div style={{height: '300px'}}><LoaderDualRingBoxed/></div>
  }else if(user){
    const {user_meta} = user;
    accountView = <div className="dashboard bg-theme">
                  <div className="dashboard__main p-0">
                    
                    <div className="row position-relative" style={{rowGap : 15}}>
                          <div className="col-12 col-md-4 col-lg-3 md:px-0 d-none d-md-block md_sticky_col" style={{ top: '20px'}}>
                            <Sidebar user={user} page={page} setPage={setPage}/>
                          </div>
                          <div className="col-12 col-md-8 col-lg-9 p-0 p-md-3 ps-lg-0 ">
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

  const bottMenu =  <div id="footer-bar" class="d-flex d-md-none">
                    <div class="me-2 ms-1 speach-icon">
                        <a href="#" data-menu="menu-upload" class="bg-gray-dark ms-2"><i class="fa fa-plus font-12 pt-2"></i></a>
                    </div>
                    <div class="flex-fill speach-input">
                        <input type="text" class="form-control" placeholder="Enter your Message here"/>
                    </div>
                    <div class="ms-2 ms-1 speach-icon">
                        <a href="#" class="bg-blue-dark me-2"><i class="fa fa-arrow-up font-12 pt-2"></i></a>
                    </div>
                    <button data-menu={'user_menu'} onClick={(e) => openOffCanvas(e)} className="_fab circle d-flex align-items-center justify-center bg-theme position-absolute gradient-menu shadow shadow-bg-m">
              <span  className={`text-center big_act`}>
                {<i className={`link_i fa fa-user`}/>}
              </span>
            </button>
                  </div>

  return (<>
   
    <div className='page-content overflow-hidden pb-0'>{accountView}</div>
    <div id='user_menu' className="menu menu-box-left"><Sidebar page={page} setPage={setPage}/></div>
    </>
  );
};

export default UserDashboard;
