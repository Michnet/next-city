import {useState, useEffect } from "react";
import {useRouter } from "next/router";
import dynamic from "next/dynamic";
import { useRecoilValue } from "recoil";
import { LoaderDualRingBoxed } from "@/components/skeletons/Loaders";
import { authState } from "@/contexts/atoms";
import GuestPrompt from "@/components/UI/GuestPrompt";


export async function getServerSideProps() {
  return {
    props: {
      headerTitle: 'Chatroom',
      seoMeta:{title: 'Chatroom', nofollow:true},
      settings : {
        hideNews: true,
        transparentHeader: true,
       mMenu: 'hide',
       noFooter: true
      }
    }
  }
}

const UserDashboard = () => {
  const {query} = useRouter();

  const {user} = useRecoilValue(authState);
  const {id} = user ?? {};
  const [loading, setLoading] = useState(true);

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
                          <div className="col-12 p-0 p-md-3 ps-lg-0 ">
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
   
    <div className='page-content overflow-hidden pb-0'>{accountView}</div>
    </>
  );
};

export default UserDashboard;
