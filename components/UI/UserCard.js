import { authState } from "@/contexts/atoms";
import { useAuthState } from "@/helpers/use-auth";
import { useSession } from "next-auth/react";
import { Client } from "react-hydration-provider";
import { useRecoilValue } from "recoil";
import { LoaderDualRing } from "../skeletons/Loaders";
import { Avatar } from "./Partials";
import {closeMenus, openOffCanvas} from "@/helpers/appjs";
import Link from "next/link";

export function UserCard({size, exClass=''}){
   const {userSignOut} = useRecoilValue(useAuthState);
    const {user, loading} = useRecoilValue(authState);
    const { data: session } = useSession();
    const {user:sessionUser} = session ?? {};

    const {name} = sessionUser ?? {};
  
    let avatarUrl = user?.avatar_urls ? user?.avatar_urls[96] : '';
    return <><Client><div className={`mx-3 my-3 user_card ${exClass}`}>
               <div className="d-flex px-2 py-1">
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
                     {<div className="ms-auto hide_in_collapsed">
                        <span data-bs-toggle="dropdown" className="icon icon-m ps-1"><i className="fa fa-ellipsis-v font-18 color-theme"></i></span>
                        <div className="dropdown-menu bg-transparent border-0 mb-n5">
                           <div className="card card-style rounded-m shadow-xl me-1">
                                 <div className="list-group list-custom-small list-icon-0 px-3 mt-n1">
                                    {user ? <>
                                    <Link href="/account/dashboard" className="mb-n2 mt-n1" onClick={() => closeMenus()}>
                                       <span>Your Profile</span>
                                       <i className="fa fa-angle-right"></i>
                                    </Link>
                                    <Link href="/account/chatroom" className="mb-n2 mt-n1" onClick={() => closeMenus()}>
                                       <span>Messages</span>
                                       <i className="fa fa-angle-right"></i>
                                    </Link>
                                    <Link href="/account/dashboard?station=settings" className="mb-n2 mt-n1" onClick={() => closeMenus()}>
                                       <span>Settings</span>
                                       <i className="fa fa-angle-right"></i>
                                    </Link>
                                    <span onClick={() => {userSignOut()}} href="#" className="mb-n1 _link">
                                       <span>Sign Out</span>
                                       <i className="fa fa-angle-right"></i>
                                    </span>
                                    </> : 
                                    <span data-menu='login_modal' onClick={(e) => {openOffCanvas(e)}} href="#" className="mb-n1 _link">
                                       <span>Sign In</span>
                                       <i className="fa fa-angle-right"></i>
                                    </span>
                                    }
                                 </div>
                           </div>
                        </div>
                     </div>}
               </div>
            </div></Client>
     </>
  }
