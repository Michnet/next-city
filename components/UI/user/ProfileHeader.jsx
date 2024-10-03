import { openOffCanvas } from "@/helpers/appjs"
import dayjs from "dayjs";
import Link from "next/link";

function ProfileHeader({user}) {

    const {name, avatar_urls, registered_date, user_meta, email} = user ?? {}
	const {likes, reviewed} = user_meta ?? {};

  return (
    <div>
        {user && <>
		<div className='bg-highlight pt-60 mb-2 pb-15'>
			<span  style={{zIndex:1}} className="position-relative ms-3 mb-n5">
			{avatar_urls && <img onClick={(e) => openOffCanvas(e)} data-menu="menu-story" src={avatar_urls[96]} width="50" className="border-m rounded-circle"/>}
		</span></div>
		{/* <div className="float-end mt-4 pt-2">
			<a href="#" data-menu="menu-controls" onClick={(e) => openOffCanvas(e)} className="icon icon-xxs border border-theme color-theme rounded-l me-2"><i className="fa fa-ellipsis-h"></i></a>
			<a href="#" data-menu="menu-settings" onClick={(e) => openOffCanvas(e)} className="btn btn-xs border border-theme color-theme rounded-l me-3 font-600">Following</a>
		</div> */}
		{name && <h1 className="ps-3 mb-n1 font-19 mb-0 text-capitalise truncate w-100"><span className='color-highlight'>Hi</span> {name}</h1>}
{/* 		<p className="ps-3 mb-2">@JoeHandsome</p>
		<p className="px-3 mb-3 line-height-sm color-theme">
			Front-end developer. Mobile App Enthusiast, likes to take silly photos of cats.</p> */}
		<div className="d-flex px-3 flex-column">
			<div className="pe-3">
				<i className="far fa-envelope pe-2"></i><span className="font-12 color-blue-dark">{email}</span>
			</div>
			<div>
				<i className="far fa-calendar pe-2"></i><span className="font-12 opacity-50">Joined {dayjs(registered_date).format('DD MMM YYYY')}</span>
			</div>
		</div>
		<div className="d-flex px-3 py-2">
			{reviewed?.length > 0 && <Link className="pe-2 btn me-2" href={`/explore?include_ids=${reviewed.join(',')}`}>
				<strong className="color-blue-dark pe-2">{reviewed?.length}</strong><span className="font-12">{`Review${reviewed?.length > 1 ?  's' : ''}`}</span>
			</Link>}
			{likes?.length > 0 && <Link className="pe-2 btn" href={`/explore?include_ids=${likes.join(',')}`}>
				<strong className="color-blue-dark pe-2">{likes?.length}</strong><span className="font-12">{`Favorite${likes?.length > 1 ?  's' : ''}`}</span>
			</Link>}
		</div>
		{/* <div className="d-flex mx-3">
			<a href="#"><img src="/images/pictures/faces/1s.png" width="33" className="rounded-xl me-n2 border border-theme"/></a>
			<a href="#"><img src="/images/pictures/faces/2s.png" width="33" className="rounded-xl mx-n2 border border-theme"/></a>
			<a href="#"><img src="/images/pictures/faces/4s.png" width="33" className="rounded-xl mx-n2 border border-theme"/></a>
			<span className="font-11 ps-3 pt-1">Followed by Joe, Alex and 6 others you follow</span>
		</div> */}
        </>}
    </div>
  )
}
export default ProfileHeader