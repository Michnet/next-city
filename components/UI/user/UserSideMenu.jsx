import Link from "next/link";
import {closeMenus} from "@/helpers/appjs";


const { authState } = require("@/contexts/atoms")
const { useRecoilValue } = require("recoil")
const { default: ProfileHeader } = require("./ProfileHeader")

const UserSideMenu = () => {
    const {user} = useRecoilValue(authState)
    return (
        <div id='user_side_menu' className="menu menu menu-box-right">
            <ProfileHeader user={user}/>
            <div class="card card-style">
				<div class="content my-0">
					<h5 class="font-700 text-uppercase opacity-40 font-12 pt-2 mb-0">Navigation</h5>
					<div class="list-group list-custom-small list-icon-0">
						<Link href="/account/dashboard" onClick={() => closeMenus}>
							<i class="fa font-12 fa-home gradient-green rounded-sm color-white"></i>
							<span>Home</span>
							<i class="fa fa-angle-right"></i>
						</Link>
						<Link href="/account/chatroom" onClick={() => closeMenus()}>
							<i class="fa font-12 fa-comment gradient-red rounded-sm color-white"></i>
							<span>Chat room</span>
							<span class="badge bg-highlight">NEW</span>
							<i class="fa fa-angle-right"></i>
						</Link>
						<Link href="/account/dashboard?station=booking" onClick={() => closeMenus()}>
							<i class="fa font-12 fa-file gradient-blue rounded-sm color-white"></i>
							<span>Booking</span>
							<i class="fa fa-angle-right"></i>
						</Link>
						<Link href="/account/dashboard?station=posted" onClick={() => closeMenus()}>
							<i class="fa font-12 fa-camera gradient-yellow rounded-sm color-white"></i>
							<span>My Pages</span>
							<i class="fa fa-angle-right"></i>
						</Link>
						<Link href="/account/dashboard?station=settings">
							<i class="fa font-12 fa-image gradient-teal rounded-sm color-white"></i>
							<span>Settings</span>
							<i class="fa fa-angle-right"></i>
						</Link>
					</div>
				</div>
			</div>
        </div>
    )
}

export default UserSideMenu;