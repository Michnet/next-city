import { authState } from "@/contexts/atoms";
import { useSession } from "next-auth/react";
import { Client } from "react-hydration-provider";
import { useRecoilValue } from "recoil";
import { LoaderDualRing } from "../skeletons/Loaders";
import { Avatar } from "./Partials";
import {openOffCanvas} from "@/helpers/appjs";


export function UserAvatar({size=32}){
    
    const {user, loading} = useRecoilValue(authState);
    //const {isMobile} = useRecoilValue(UISizes);
    const { data: session } = useSession();
    const {user:sessionUser} = session ?? {};

    console.log('ses', session);
  
    let avatarUrl = user?.avatar_urls ? user?.avatar_urls[96] : '';
    return <span type="button" className="d-flex align-items-center" data-menu={user ? 'user_side_menu':'login_modal'}  onClick={(e) => openOffCanvas(e)}/* data-bs-target="#user_menu_drawer" */ /* data-bs-toggle={'modal'} */>
    <Client> {loading ? <LoaderDualRing exClass={'_mini'}/> : <>{user ? <div>{<Avatar width={size ?? 30} rounded src={avatarUrl}  className="gx-size-40 gx-pointer" alt=""/>
  } </div> : <>{sessionUser ? <Avatar width={size ?? 30} rounded src={sessionUser.image}  className="gx-size-40 gx-pointer" alt=""/> : <i className="fad fa-user" style={{fontSize: size/2}} data-menu='login_modal' onClick={(e) => openOffCanvas(e)}/>}</>}</>}</Client>
     </span>
  }
