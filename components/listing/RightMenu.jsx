import { closeMenus } from "@/helpers/appjs";
import { cleanHtml, srcWithFallback } from "@/helpers/universal";
import { Client } from "react-hydration-provider";
//import { useRecoilValue } from "recoil";
import HeaderAnnex from "../layouts/partials/HeaderAnnex";
import Mirrored from "../UI/partials/Mirrored";
import { fallbackImgSrcSet } from '@/helpers/base';

function RightMenu({listing, activeKey, setActiveKey, lMenu}) {
    const {cover, large_thumb, title, locations} = listing ?? {};
    let listView;

    if(lMenu){
		let buttoned = lMenu.filter((el) => el.buttony);
		if(buttoned?.length > 0){
			lMenu.push(lMenu.splice(lMenu.indexOf(buttoned[0]), 1)[0]);
		}
        listView = <>
                    {lMenu.map((el, ind) => {
                      if(el?.content !== 'empty'){
                      const {id, icon, buttony, title, subTitle, badgeNumber, badgeClass} = el;
					  if(buttony){
						return <button onClick={() => {closeMenus(); setActiveKey(id)}} className="btn btn-m shadow-bg shadow-bg-m mb-3 rounded-l text-uppercase text-nowrap font-900 shadow-s gradient-highlight btn-icon text-start" key={id}>
						<i className={`fal ${icon} fw-600  font-15 text-center`}></i>
						<span className="position-relative color-white">{subTitle}
                                      {badgeNumber > 0 ? <span style={{marginTop: '0 !important'}} className={`position-absolute top-0 start-100 badge rounded-pill ${badgeClass ?? 'bg-info'}`}>
                                         {badgeNumber}
                                      </span> : <></>}</span>
					</button>
					  }
                      return <span onClick={() => {closeMenus(); setActiveKey(id)}} className={`_link close-menu ${activeKey === id ? 'active' : ''}`}  key={id}>
							<i className={`fal ${icon ?? 'far fa-square'} font-20 bg-transparent rounded opacity-70`}></i>
							<span className="position-relative">{buttony ? subTitle : title}
                                      {badgeNumber > 0 ? <span style={{marginTop: '0 !important'}} className={`position-absolute top-0 start-100 badge rounded-pill ${badgeClass ?? 'bg-info'}`}>
                                         {badgeNumber}
                                      </span> : <></>}</span>
							<i className="fa fa-angle-right"></i>
						</span>
                      }
                    })}
                    </>
      }
  return (
    <Client>
    <div id="listingMenuRight" className="menu menu-box-right menu-sidebar bg-cover bg-center" style={{width: '310px', backgroundSize: 'cover', backgroundPosition: 'center', backgroundImage: `url(${srcWithFallback(cover)})`}}
	>
		<div className="sidebar-content h-auto">
			<Mirrored coverTop gap={1} objClass=''  topPadding={'50px'} skewDegrees={4} skewDir={'-'} YDistance={200}>
				<div className='hero_cover  position-relative w-100'>
					<img    
					quality={100}
					fill
					priority
					alt="image"
					src={srcWithFallback(large_thumb)}
					className={`object-cover`}
					onError={(e) => {e.target.src = '/images/bg/fallback.jpg'; e.target.srcset= {fallbackImgSrcSet}}}
					//onErrorCapture = {(e) => {e.target.src = '/images/bg/fallback.jpg', e.target.srcset= {fallbackImgSrcSet}}}
					/>
					{/* <div className='bg-overlay' style={{height: '200px'}}/> */}
				</div>
			</Mirrored>
			<div className="card-top m-2">
				<div className="d-flex flex-column p-3 pt-0 align-items-end">
					<div className="row_flex justify-between">
						<HeaderAnnex exClass="bg-transparent color-white py-3 w-fit pe-5"/>
						<span className="w-fit icon icon-xxs gradient-red rounded-sm float-end close-menu position-absolute right-0" onClick={() => closeMenus()}><i className="fa fa-times color-white"></i></span>
					</div>
				<h1 className="color-white truncate-2 text-right">{cleanHtml(title?.rendered)}</h1>
				</div>
			</div>
            <div className="card card-style bg-transparent shadow-0">
				<div className="content my-0 pt-5">
					<h5 className="font-700 text-uppercase opacity-40 font-12 pt-2 mb-0">Navigation</h5>
					<div className="list-group list-custom-small list-icon-0">
						{listView}
					</div>
				</div>
			</div>

			{/* <div className="card card-style">
				<div className="content my-0">
					<h5 className="font-700 text-uppercase opacity-40 font-12 pt-2 mb-0">Settings</h5>
					<div className="list-group list-custom-small list-icon-0">
						<a href="#" data-toggle-theme onClick={() => toggleTheme()}  data-trigger-switch="switch-dark2-mode" className="border-0">
							<i className="fa font-12 fa-moon gradient-mint color-white rounded-sm"></i>
							<span>Dark Mode</span>
							<div className="custom-control ios-switch">
								<input data-toggle-theme onClick={() => toggleTheme()}  type="checkbox" className="ios-input" id="switch-dark2-mode"/>
								<label className="custom-control-label" htmlFor="switch-dark2-mode"></label>
							</div>
							<i className="fa fa-angle-right"></i>
						</a>
						<a href="#" data-menu="menu-highlights" onClick={(e) => openOffCanvas(e)}>
							<i className="fa font-12 fa-droplet gradient-blue rounded-sm color-white"></i>
							<span>Highlights</span>
							<i className="fa fa-angle-right"></i>
						</a>
						<a href="#" data-menu="menu-backgrounds" onClick={(e) => openOffCanvas(e)}>
							<i className="fa font-12 fa-paint-brush gradient-orange rounded-sm color-white"></i>
							<span>Backgrounds</span>
							<i className="fa fa-angle-right"></i>
						</a>
					</div>
				</div>
			</div> */}
		</div>
		{/* <div className="position-sticky w-100 bottom-0 end-0 pb-1">
			<div className="bg-theme mx-3 rounded-m shadow-m">
				<div className="d-flex px-2 pb-2 pt-2">
					<div className="align-self-center">
						<a href="#"><img src="images/pictures/7s.jpg" width="40" className="rounded-sm" alt="img"/></a>
					</div>
					<div className="ps-2 align-self-center">
						<h5 className="ps-1 mb-1 pt-1 line-height-xs font-17">Alex Doeson</h5>
						<h6 className="ps-1 mb-0 font-400 opacity-40 font-12">Freelance Photographer</h6>
					</div>
					<div className="ms-auto">
						<a href="#" data-bs-toggle="dropdown" className="icon icon-m ps-3"><i className="fa fa-ellipsis-v font-18 color-theme"></i></a>
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
									<a href="#" className="mb-n1">
										<span>Sign Out</span>
										<i className="fa fa-angle-right"></i>
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div> */}
	</div>
    </Client>
  )
}
export default RightMenu