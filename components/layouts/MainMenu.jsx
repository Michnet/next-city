import { toggleTheme } from "@/helpers/appjs"
import { isActiveLink } from "@/helpers/universal";
import Link from "next/link"
import { useRouter } from "next/router"
import { UserCard } from "../UI/UserCard"
import {openOffCanvas} from "@/helpers/appjs";
import TermsGrid from './../UI/lists/TermsGrid';
import { DualColorHeader } from "../UI/Partials";
import { quickLinks } from "@/helpers/data";

function MainMenu() {
 const router = useRouter();

 const topLinks = [
    {id: 1,
        icon: "fa fa-home",
        color: 'gradient-green',
        name: "Home",
        routePath: "/",
    },
    {id: 2,
        icon: "fa fa-calendar-check",
        color: 'gradient-red',
        name: "Explore",
        routePath: "/explore/events",
        isNew: true
    },
 ]
  return (
  <div id="sidebar_menu" className="list-group border-0 rounded-0 text-sm-start h-100">
                        <div id="menu-sidebar"  /* data-menu-width="320" data-menu-effect="menu-push" */>
                            <div className="sidebar-content">
                               <UserCard/>
                                <div className="card card-style shadow-0 border">
                                    <div className="content my-0">
                                        <h5 className="font-700 text-uppercase opacity-40 font-12 pt-2 mb-0">Navigation</h5>
                                        <div className="list-group list-custom-small list-icon-0">
                                            {topLinks.map((el) => {
                                                let {id, icon, color, name, routePath, isNew} = el;
                                                return <Link key={id} href={routePath}>
                                                        <i className={`${icon} 
                                                        ${isActiveLink(routePath, router.asPath)? 'gradient-menu color-white' : 'gradient-gray color-dark'} 
                                                        rounded-sm`}></i>
                                                        <span>{name}</span>
                                                        {isNew && <span className="badge bg-highlight">NEW</span>}
                                                        <i className="fa fa-angle-right"></i>
                                                    </Link>
                                            })}
                                        </div>
                                    </div>
                                </div>

                                <div className="card card-style shadow-0 border">
                                    <div className="content my-0">
                                        <DualColorHeader exClass={'sm-font px-15 mb-2 hide_in_collapsed'} title={'Browse categories'}/>
                                        <TermsGrid id={106} listy/>
                                    </div>
                                </div>
                                <div className="card card-style shadow-0 border hide_in_collapse">
                                    <div className="content my-0">
                                        <h5 className="font-700 text-uppercase opacity-40 font-12 pt-2 mb-0">Quick Links</h5>
                                        <div className="quick_links">
                                        {quickLinks?.map((item) => (
                                        <div className="mb-28" key={item.id}>
                                        <h5 className="text-15 fw-300 mb-10 border-bottom pb-10 uppercase">{item.title}</h5>
                                        <div className="d-flex flex-column y-gap-10">
                                            {item.menuList.map((menu, i) => (
                                            <Link  href={menu.routerPath} as={menu.routerPath} key={i}>
                                                {menu.name}
                                            </Link>
                                            ))}
                                        </div>
                                        </div>
                                    ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="card card-style shadow-0 border">
                                    <div className="content my-0">
                                        <h5 className="font-700 text-uppercase opacity-40 font-12 pt-2 mb-0">Settings</h5>
                                        <div className="list-group list-custom-small list-icon-0">
                                            <a href="#" data-menu="menu-highlights" onClick={(e) => openOffCanvas(e)}>
                                                <i className="fa font-12 fa-droplet gradient-blue rounded-sm color-theme"></i>
                                                <span>Highlights</span>
                                                <i className="fa fa-angle-right"></i>
                                            </a>
                                            <a href="#" data-menu="menu-backgrounds" onClick={(e) => openOffCanvas(e)}>
                                                <i className="fa font-12 fa-paint-brush gradient-orange rounded-sm color-theme"></i>
                                                <span>Backgrounds</span>
                                                <i className="fa fa-angle-right"></i>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="position-sticky w-100 bottom-0 end-0 pb-1">
                                <div className="card card-style mb-3">
                                    <div className="content my-0 py-">
                                        <div className="list-group list-custom-small list-icon-0">
                                            <a href="#" data-toggle-theme onClick={() => toggleTheme()}  data-trigger-switch="switch-dark2-mode" className="border-0">
                                                <i className="fa font-12 fa-moon gradient-yellow color-theme rounded-sm"></i>
                                                <span>Dark Mode</span>
                                                <div className="custom-control ios-switch">
                                                    <input data-toggle-theme onClick={() => toggleTheme()}  type="checkbox" className="ios-input" id="switch-dark2-mode"/>
                                                    <label className="custom-control-label" htmlFor="switch-dark2-mode"></label>
                                                </div>
                                                <i className="fa fa-angle-right"></i>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                
  )
}
export default MainMenu