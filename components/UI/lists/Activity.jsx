import { useRecoilValue } from "recoil";
import { authState } from "@/contexts/atoms";
import { activityState } from "@/contexts/ActivityContext";
import { Client } from "react-hydration-provider";

function Activity() {
    const {activities, setSize, size, isLoadingInitialData, isLoadingMore} = useRecoilValue(activityState);
    const {user, token} = useRecoilValue(authState);
    const {name, avatar_urls} = user ?? {}


    console.log('activities', user);

  return (
    <div className="recent_active">
		<img src="images/pictures/14w.jpg" className="img-fluid mb-n4"/>
        {user && <>
		<a href="#" style={{zIndex:1}} className="position-relative ms-3">
			{avatar_urls && <img data-menu="menu-story" src={avatar_urls[96]} width="80" className="border-m border-blue-dark rounded-circle mt-n3"/>}
		</a>
		<div className="float-end mt-4 pt-2">
			<a href="#" data-menu="menu-controls" className="icon icon-xxs border border-theme color-theme rounded-l me-2"><i className="fa fa-ellipsis-h"></i></a>
			<a href="#" data-menu="menu-settings" className="btn btn-xs border border-theme color-theme rounded-l me-3 font-600">Following</a>
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

        <div className="actz_timeline">
            {activities?.length > 0 && <>
                <div className="notice_drawer no-scrollbar">
                    <div>
                    {activities.map((activity) => {
                        const {title, id, feature_media, content, name,  user_id, content_stripped, favorite_count, can_comment, can_delete, favorited, can_edit, can_favorite, user_avatar, activity_meta, comment_count, date, activity_data, type} = activity ?? {};
                        const {category, listing} = activity_meta ?? {};


                        return <div key={id} className="card card-style mb-3">
                        <div className="content mb-0">
                            <div className="d-flex mt-n1">
                                <div>
                                    <a href="#" data-menu="menu-story"><img src={user_avatar?.thumb} width="35" className="rounded-xl mt-1" /* className="rounded-xl mt-1 border border-m border-blue-dark" *//></a>
                                </div>
                                <div className="ps-3 mt-n1 mb-n2">
                                    <div className="d-flex align-items-center">
                                        <div className="pe-3">
                                            <h5 className="mb-0 font-16 font-700">
                                                {type == 'new_job_listing' ? title : name}
                                            </h5>
                                            <div className="title_meta d-flex align-items-center">
                                                <div className="pe-2"><span className="font-11 opacity-60 accordionfont-11">@joesome</span></div>
                                                <div className="pe-2">&middot;</div>
                                                <div><span className="opacity-60 font-11">6h</span></div>
                                            </div>
                                        </div>
                                        <div className="ms-auto"><a href="#" data-menu="menu-controls" className="icon icon-xss d-block color-theme"><i className="fa fa-ellipsis-h"></i></a></div>
                                    </div>
                                    <Client><div dangerouslySetInnerHTML={{__html: content?.rendered}}/></Client>
                                    <div className="border border-theme rounded-m overflow-hidden mb-3">
                                        <img src={type == 'new_job_listing' ? listing?.thumb_url : '/images/bg/fallback.jpg'} className="img-fluid"/>
                                        <div className="content mt-0">
                                            <span className="opacity-50 d-block pt-1 font-11">enableds.com</span>
                                            <p className="mb-0 line-height-sm mb-n2 color-theme">
                                                How to make your site look and feel like a native app using PWA's.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="d-flex pb-3">
                                        <a href="#" data-menu="menu-reply" className="color-theme me-auto opacity-60"><i className="far fa-comment pe-2"></i><span>957</span></a>
                                        <a href="#" className="color-theme m-auto opacity-60"><i className="far fa-sync pe-2"></i><span>31</span></a>
                                        <a href="#" className="color-red-light m-auto"><i className="fa fa-heart pe-2"></i><span>1.5k</span></a>
                                        <a href="#" data-menu="menu-share" className="color-theme ms-auto opacity-60"><i className="far fa-upload pe-2"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    })}
                    {/* {isLoadingMore && <CommentLoader num={4}/>} */}
                    </div>
                        <div className="activity-footer">                        
                        <span className="gx-link gx-btn-link" onClick={() => setSize(size + 1)}>Load More</span>
                        <span className="gx-link gx-btn-link" onClick={() => setSize(1)}> Reset</span>
                        </div>
                    </div>
                </>
            }
        </div>

		<div className="card card-style mb-3">
			<div className="content mb-0">
				<div className="d-flex mt-n1">
					<div>
						<a href="#" data-menu="menu-story"><img src="/images/pictures/faces/4s.png" width="47" className="rounded-xl mt-1 border border-m border-blue-dark"/></a>
					</div>
					<div className="ps-3 mt-n1 mb-n2">
						<div className="d-flex align-items-center">
							<div className="pe-3"><h5 className="mb-0 font-16 font-700">Joe Handsome</h5></div>
							<div className="pe-2"><span className="font-11 opacity-60 accordionfont-11">@joesome</span></div>
							<div className="pe-2">&middot;</div>
							<div><span className="opacity-60 font-11">6h</span></div>
							<div className="ms-auto"><a href="#" data-menu="menu-controls" className="icon icon-xss d-block color-theme"><i className="fa fa-ellipsis-h"></i></a></div>
						</div>
						<p className="line-height-sm mb-2 pb-1">
							Make your website feel like a native app? Sure! Just try the new <a href="#"><strong>#PWA</strong></a> built by our very own
							<a href="#"><strong>@iEnabled</strong></a> It's awesome!
						</p>
						<div className="border border-theme rounded-m overflow-hidden mb-3">
							<img src="images/pictures/17w.jpg" className="img-fluid"/>
							<div className="content mt-0">
								<span className="opacity-50 d-block pt-1 font-11">enableds.com</span>
								<p className="mb-0 line-height-sm mb-n2 color-theme">
									How to make your site look and feel like a native app using PWA's.
								</p>
							</div>
						</div>
						<div className="d-flex pb-3">
							<a href="#" data-menu="menu-reply" className="color-theme me-auto opacity-60"><i className="far fa-comment pe-2"></i><span>957</span></a>
							<a href="#" className="color-theme m-auto opacity-60"><i className="far fa-sync pe-2"></i><span>31</span></a>
							<a href="#" className="color-red-light m-auto"><i className="fa fa-heart pe-2"></i><span>1.5k</span></a>
							<a href="#" data-menu="menu-share" className="color-theme ms-auto opacity-60"><i className="far fa-upload pe-2"></i></a>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div className="card card-style mb-3">
			<div className="content overflow-hidden position-relative mb-0 pb-3">
				<div className="timeline-deco mt-4" style={{marginLeft: '-19px', zIndex: -1}}></div>
				<div className="d-flex mt-n1">
					<div>
						<img src="/images/preload-logo.png" width="47" className="rounded-xl mt-1"/>
					</div>
					<div className="ps-3 mt-n2 mb-n2">
						<div className="d-flex align-items-center">
							<div className="pe-1"><h5 className="mb-0 font-16 font-700">Enabled</h5></div>
							<div className="pe-3"><i className="font-11 line-height-xl fa fa-check-circle color-blue-dark"></i></div>
							<div className="pe-2"><span className="font-11 opacity-60 accordionfont-11">@iEnabled</span></div>
							<div className="pe-2">&middot;</div>
							<div><span className="opacity-60 font-11">6h</span></div>
							<div className="ms-auto"><a href="#" data-menu="menu-controls" className="icon icon-xss d-block color-theme"><i className="fa fa-ellipsis-h"></i></a></div>
						</div>
						<p className="line-height-sm mt-n1 mb-2 pb-1">
							One of our best sellers <a href="#"><strong>#AppKit</strong></a> has been given the <a href="#"><strong>#Mobile</strong></a> Award of the Year on <a href="#"><strong>@Envato</strong></a>. Thank you! 😍
						</p>
						<div className="d-flex pb-3">
							<a href="#" data-menu="menu-reply" className="color-theme me-auto opacity-60"><i className="far fa-comment pe-2"></i><span>957</span></a>
							<a href="#" className="color-theme m-auto opacity-60"><i className="far fa-sync pe-2"></i><span>31</span></a>
							<a href="#" className="color-theme m-auto opacity-60"><i className="far fa-heart pe-2"></i><span>1.5k</span></a>
							<a href="#" data-menu="menu-share" className="color-theme ms-auto opacity-60"><i className="far fa-upload pe-2"></i></a>
						</div>
					</div>
				</div>
			</div>
			<div className="content position-relative overflow-hidden mb-0 pb-3 mt-0">
				<div className="timeline-deco" style={{marginLeft:'-19px', zIndex: -1}}></div>
				<div className="d-flex mt-n1">
					<div>
						<img src="/images/preload-logo.png" width="47" className="rounded-xl mt-1"/>
					</div>
					<div className="ps-3 mt-n2 mb-n2">
						<div className="d-flex align-items-center">
							<div className="pe-1"><h5 className="mb-0 font-16 font-700">Enabled</h5></div>
							<div className="pe-3"><i className="font-11 line-height-xl fa fa-check-circle color-blue-dark"></i></div>
							<div className="pe-2"><span className="font-11 opacity-60 accordionfont-11">@iEnabled</span></div>
							<div className="pe-2">&middot;</div>
							<div><span className="opacity-60 font-11">6h</span></div>
							<div className="ms-auto"><a href="#" data-menu="menu-controls" className="icon icon-xss d-block color-theme"><i className="fa fa-ellipsis-h"></i></a></div>
						</div>
						<p className="line-height-sm mt-n1 mb-2 pb-1">
							You can get <a href="#"><strong>#AppKit</strong></a> from <a href="#"><strong>@Envato</strong></a> following the link below. 👇🏻
						</p>
						<div className="border border-theme rounded-m overflow-hidden mb-3">
							<img src="/images/pictures/14w.jpg" className="img-fluid"/>
							<div className="content mt-0">
								<span className="opacity-50 d-block pt-1 font-11">themeforest.net</span>
								<p className="mb-0 line-height-sm mb-n2 color-theme">
									Appkit Mobile PWA Site Template - Bootstrap 5 - Vanilla JS | Enabled
								</p>
							</div>
						</div>
						<div className="d-flex pb-3">
							<a href="#" data-menu="menu-reply" className="color-theme me-auto opacity-60"><i className="far fa-comment pe-2"></i><span>957</span></a>
							<a href="#" className="color-theme m-auto opacity-60"><i className="far fa-sync pe-2"></i><span>31</span></a>
							<a href="#" className="color-theme m-auto opacity-60"><i className="far fa-heart pe-2"></i><span>1.5k</span></a>
							<a href="#" data-menu="menu-share" className="color-theme ms-auto opacity-60"><i className="far fa-upload pe-2"></i></a>
						</div>
						<a href="#" className="pb-3 d-block">Show this thread</a>
					</div>
				</div>
			</div>
			<div className="content mt-0 mb-0">
				<div className="d-flex mt-n1">
					<div>
						<img src="/images/preload-logo.png" width="47" className="rounded-xl mt-1"/>
					</div>
					<div className="ps-3 mt-n2 mb-n2">
						<div className="d-flex align-items-center">
							<div className="pe-1"><h5 className="mb-0 font-16 font-700">Enabled</h5></div>
							<div className="pe-3"><i className="font-11 line-height-xl fa fa-check-circle color-blue-dark"></i></div>
							<div className="pe-2"><span className="font-11 opacity-60 accordionfont-11">@iEnabled</span></div>
							<div className="pe-2">&middot;</div>
							<div><span className="opacity-60 font-11">6h</span></div>
							<div className="ms-auto"><a href="#" data-menu="menu-controls" className="icon icon-xss d-block color-theme"><i className="fa fa-ellipsis-h"></i></a></div>
						</div>
						<p className="line-height-sm mt-n1 mb-2 pb-1">
							It's trending! <a href="#"><strong>#AppKit</strong></a><a href="#"> <strong>#Mobile</strong></a><a href="#"> <strong>#PWA</strong></a>
						</p>
						<div className="d-flex pb-3">
							<a href="#" data-menu="menu-reply" className="color-theme me-auto opacity-60"><i className="far fa-comment pe-2"></i><span>957</span></a>
							<a href="#" className="color-theme m-auto opacity-60"><i className="far fa-sync pe-2"></i><span>31</span></a>
							<a href="#" className="color-theme m-auto opacity-60"><i className="far fa-heart pe-2"></i><span>1.5k</span></a>
							<a href="#" data-menu="menu-share" className="color-theme ms-auto opacity-60"><i className="far fa-upload pe-2"></i></a>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div className="card card-style">
			<div className="content mb-0">
				<div className="d-flex mt-n1">
					<div>
						<img src="/images/pictures/faces/2s.png" width="47" className="rounded-xl mt-1"/>
					</div>
					<div className="ps-3 mt-n1 mb-n2">
						<div className="d-flex align-items-center">
							<div className="pe-3"><h5 className="mb-0 font-16 font-700">Jack Son</h5></div>
							<div className="pe-2"><span className="font-11 opacity-60 accordionfont-11">@jack891</span></div>
							<div className="pe-2">&middot;</div>
							<div><span className="opacity-60 font-11">6h</span></div>
							<div className="ms-auto"><a href="#" data-menu="menu-controls" className="icon icon-xss d-block color-theme"><i className="fa fa-ellipsis-h"></i></a></div>
						</div>
						<p className="line-height-sm mb-2 pb-1">
							PWA's are the absolute future of the Mobile Web. Every website should have a Mobile PWA to make it feel like an app.
						</p>
						<div className="d-flex pb-3">
							<a href="#" data-menu="menu-reply" className="color-theme me-auto opacity-60"><i className="far fa-comment pe-2"></i><span>957</span></a>
							<a href="#" className="color-theme m-auto opacity-60"><i className="far fa-sync pe-2"></i><span>31</span></a>
							<a href="#" className="color-red-light m-auto"><i className="fa fa-heart pe-2"></i><span>1.5k</span></a>
							<a href="#" data-menu="menu-share" className="color-theme ms-auto opacity-60"><i className="far fa-upload pe-2"></i></a>
						</div>
					</div>
				</div>
			</div>
		</div>
    </div>
    )
}
export default Activity;