import { useRecoilValue } from "recoil";
import { authState } from "@/contexts/atoms";
import {openOffCanvas} from "@/helpers/appjs";
import SiteActivity from "./SiteActivity";

function Activity() {
    const {user, token} = useRecoilValue(authState);
    const {name, avatar_urls} = user ?? {}

  return (
    <div className="recent_activity">
		<img src="/images/pictures/14w.jpg" className={`img-fluid mb-n4`}/>
        {user && <>
		<a href="#" style={{zIndex:1}} className="position-relative ms-3">
			{avatar_urls && <img onClick={(e) => openOffCanvas(e)} data-menu="menu-story" src={avatar_urls[96]} width="80" className="border-m border-blue-dark rounded-circle mt-n3"/>}
		</a>
		<div className="float-end mt-4 pt-2">
			<a href="#" data-menu="menu-controls" onClick={(e) => openOffCanvas(e)} className="icon icon-xxs border border-theme color-theme rounded-l me-2"><i className="fa fa-ellipsis-h"></i></a>
			<a href="#" data-menu="menu-settings" onClick={(e) => openOffCanvas(e)} className="btn btn-xs border border-theme color-theme rounded-l me-3 font-600">Following</a>
		</div>
		{name && <h1 className="ps-3 mb-n1 font-19 mb-0 text-capitalise truncate w-100"><span className='color-highlight'>Hi</span> {name}</h1>}
		<p className="ps-3 mb-2">@JoeHandsome</p>
		<p className="px-3 mb-3 line-height-sm color-theme">Front-end developer. Mobile App Enthusiast, likes to take silly photos of cats.</p>
		<div className="d-flex px-3">
			<div className="pe-3">
				<i className="fa fa-map-marker pe-2"></i><span className="font-12 opacity-50">Europe</span>
			</div>
			<div className="pe-3">
				<i className="fa fa-link pe-2"></i><a href="#"><span className="font-12 color-blue-dark">enableds.com</span></a>
			</div>
			<div>
				<i className="fa fa-calendar pe-2"></i><span className="font-12 opacity-50">Joined Jan 2009</span>
			</div>
		</div>
		<div className="d-flex px-3 py-2">
			<div className="pe-3">
				<strong className="color-theme pe-2">254</strong><span className="font-12">Following</span>
			</div>
			<div>
				<strong className="color-theme pe-2">17.3k</strong><span className="font-12">Followers</span>
			</div>
		</div>
		<div className="d-flex mx-3">
			<a href="#"><img src="/images/pictures/faces/1s.png" width="33" className="rounded-xl me-n2 border border-theme"/></a>
			<a href="#"><img src="/images/pictures/faces/2s.png" width="33" className="rounded-xl mx-n2 border border-theme"/></a>
			<a href="#"><img src="/images/pictures/faces/4s.png" width="33" className="rounded-xl mx-n2 border border-theme"/></a>
			<span className="font-11 ps-3 pt-1">Followed by Joe, Alex and 6 others you follow</span>
		</div>
        </>}

		<div className="mb-4"></div>

        <SiteActivity user={user} token={token}/>
    </div>
    )
}
export default Activity;