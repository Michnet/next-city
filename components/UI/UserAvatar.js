import { authState } from "@/contexts/atoms";
import { useSession } from "next-auth/react";
import { Client } from "react-hydration-provider";
import { useRecoilValue } from "recoil";
import { LoaderDualRing } from "../skeletons/Loaders";
import { Avatar } from "./Partials";

export function UserAvatar({size}){
    
    const {user, loading} = useRecoilValue(authState);
    //const {isMobile} = useRecoilValue(UISizes);
    const { data: session } = useSession();
    const {user:sessionUser} = session ?? {};
  
    let avatarUrl = user?.avatar_urls ? user?.avatar_urls[96] : '';
    return <span type="button" className="d-flex align-items-center" data-menu='login_modal' /* data-bs-target="#user_menu_drawer" */ /* data-bs-toggle={'modal'} */>
    <Client> {loading ? <LoaderDualRing exClass={'_mini'}/> : <>{user ? <div>{<Avatar width={size ?? 30} rounded src={avatarUrl}  className="gx-size-40 gx-pointer" alt=""/>
  } </div> : <>{sessionUser ? <Avatar width={size ?? 30} rounded src={sessionUser.image}  className="gx-size-40 gx-pointer" alt=""/> : <i className="fa fa-user" data-menu='login_modal'/>}</>}</>}</Client>
     </span>
  }
