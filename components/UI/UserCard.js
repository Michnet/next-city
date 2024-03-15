import { authState } from "@/contexts/atoms";
import { useAuthState } from "@/helpers/use-auth";
import { useSession } from "next-auth/react";
import { Client } from "react-hydration-provider";
import { useRecoilValue } from "recoil";
import { LoaderDualRing } from "../skeletons/Loaders";
import { Avatar } from "./Partials";
import {openOffCanvas} from "@/helpers/appjs";

export function UserCard({size}){
   const {userSignOut} = useRecoilValue(useAuthState);
    const {user, loading} = useRecoilValue(authState);
    const { data: session } = useSession();
    const {user:sessionUser} = session ?? {};

    const {name} = sessionUser ?? {};
  
    let avatarUrl = user?.avatar_urls ? user?.avatar_urls[96] : '';
    return <><Client><div className="bg-theme mx-3 rounded-m shadow-m my-3 user_card">
               <div className="d-flex px-2 pb-2 pt-2">
                     <div className="align-self-center">
                     <span type="button" className="d-flex" data-menu='login_modal' onClick={(e) => openOffCanvas(e)}>
                           <Client> {loading ? <LoaderDualRing exClass={'_mini'}/> : <>{user ? <div>{<Avatar width={size ?? 30} rounded src={avatarUrl}  className="gx-size-40 gx-pointer" alt=""/>
                        } </div> : <>{sessionUser ? <Avatar width={size ?? 30} rounded src={sessionUser.image}  className="gx-size-40 gx-pointer" alt=""/> : <i className="bi bi-person user_i" data-menu='login_modal' onClick={(e) => openOffCanvas(e)}/>}</>}</>}</Client>
                           </span>
                     </div>
                     <div className="ps-2 align-self-center user_info">
                        {user || sessionUser ? <h5 className="ps-1 mb-1 pt-1 line-height-xs font-17 text-capitalize">Hello {name}</h5> : <></>}
                        {/* <h6 className="ps-1 mb-0 font-400 opacity-40 font-12 lh-1">Freelance Photographer</h6> */}
                     </div>
                     {<div className="ms-auto">
                        {user ? <a href="#" data-bs-toggle="dropdown" className="icon icon-m ps-1"><i className="fa fa-ellipsis-v font-18 color-theme"></i></a> : <></>}
                        <div className="dropdown-menu bg-transparent border-0 mb-n5">
                           <div className="card card-style rounded-m shadow-xl me-1">
                                 <div className="list-group list-custom-small list-icon-0 px-3 mt-n1">
                                    <a href="#" className="mb-n2 mt-n1">
                                       <span>Your Profile</span>
                                       <i className="fa fa-angle-right"></i>
                                    </a>
                                    <a href="#" className="mb-n2">
                                       <span>Messages</span>
                                       <i className="fa fa-angle-right"></i>
                                    </a>
                                    <a href="#" className="mb-n2">
                                       <span>Settings</span>
                                       <i className="fa fa-angle-right"></i>
                                    </a>
                                    <span onClick={() => {userSignOut()}} href="#" className="mb-n1">
                                       <span>Sign Out</span>
                                       <i className="fa fa-angle-right"></i>
                                    </span>
                                 </div>
                           </div>
                        </div>
                     </div>}
               </div>
            </div></Client>
     </>
  }
