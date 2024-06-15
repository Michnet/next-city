import { authState } from "@/contexts/atoms";
import { closeMenus, toggleTheme } from "@/helpers/appjs";
import { cleanHtml, srcWithFallback } from "@/helpers/universal";
import { Client } from "react-hydration-provider";
import { useRecoilValue } from "recoil";

function RightMenu({listing, activeKey, setActiveKey, lMenu}) {
    const {cover, large_thumb, title, locations} = listing ?? {};
    const {user} = useRecoilValue(authState);
    let listView;

    if(lMenu){
        listView = <>
                    {lMenu.map((el, ind) => {
                      if(el?.content !== 'empty'){
                      const {id, icon, buttony, title, subTitle, badgeNumber, badgeClass} = el;
					  if(buttony){
						return <button onClick={() => {closeMenus(); setActiveKey(id)}} className="btn btn-m shadow-bg shadow-bg-m mb-3 rounded-l text-uppercase text-nowrap font-900 shadow-s gradient-highlight btn-icon text-start" key={id}>
						<i className={`${icon}  font-15 text-center`}></i>
						<span className="position-relative">{subTitle}
                                      {badgeNumber > 0 ? <span style={{marginTop: '0 !important'}} className={`position-absolute top-0 start-100 badge rounded-pill ${badgeClass ?? 'bg-info'}`}>
                                         {badgeNumber}
                                      </span> : <></>}</span>
					</button>
					  }
                      return <span onClick={() => {closeMenus(); setActiveKey(id)}} className={`_link close-menu ${activeKey === id ? 'active' : ''}`}  key={id}>
							<i className={`${icon ?? 'far fa-square'} font-20 bg-transparent rounded opacity-70`}></i>
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
			<div className="card card-style my-3" style={{backgroundImage: `url(${large_thumb})`, height: '130px'}} /* data-card-height="130" */>
				<div className="card-bottom m-3">
					<h1 className="mb-n1 color-white truncate">{cleanHtml(title?.rendered)}</h1>
					{locations?.length > 0 && <p className="color-white mb-0 opacity-50">{locations[0]?.name}</p>}
				</div>
				<div className="card-top m-2">
					<span className="icon icon-xxs gradient-red rounded-sm float-end close-menu" onClick={() => closeMenus()}><i className="fa fa-times color-white"></i></span>
				</div>
				<div className="card-overlay bg-gradient"></div>
				<div className="card-overlay bg-black opacity-10"></div>
			</div>
            <div className="card card-style bg-transparent shadow-0 border">
				<div className="content my-0">
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