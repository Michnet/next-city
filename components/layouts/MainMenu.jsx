import { closeMenus, toggleTheme } from "@/helpers/appjs"
import { isActiveLink } from "@/helpers/universal";
import Link from "next/link"
import { useRouter } from "next/router"
import { UserCard } from "../UI/UserCard"
import {openOffCanvas} from "@/helpers/appjs";
import TermsGrid from './../UI/lists/TermsGrid';
import { DualColorHeader } from "../UI/Partials";
import { quickLinks } from "@/helpers/data";
import Logo from "../UI/Logo";
import AddListingCard from "@/components/UI/partials/AddListingCard";


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
                        <div id="menu-sidebar">
                                
                                <div className="position-sticky w-100 top-0 end-0 px-1 z-2">
                                <div className="card card-style mt-2 mb-0 mx-2">
                                    <div className='row_flex justify-between p-2' onClick={() => closeMenus()}>
                                        <Logo simple={false}/>
                                        <span className="icon icon-xxs gradient-red rounded-sm close-menu d-block d-md-none" onClick={() => closeMenus()}><i className="fa fa-times color-white"></i></span>
                                    </div>
                                </div>
                            </div>
                            <div className="sidebar-content">
                               <UserCard exClass={'border'}/>
                                <div className="card card-style bg-transparent mb-15 shadow-0 border pb-15">
                                    <div className="content my-0">
                                        <h5 className="font-700 text-uppercase opacity-40 font-12 pt-2">Navigation</h5>
                                        <div className="list-group list-custom-small list-icon-0">
                                            {topLinks.map((el) => {
                                                let {id, icon, color, name, routePath, isNew} = el;
                                                return <Link key={id} href={routePath} className='close-menu' onClick={() => closeMenus()}>
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

                                <div className="card card-style bg-transparent mb-15 shadow-0 border pb-15">
                                    <div className="content my-0">
                                        <h5 className="font-700 text-uppercase opacity-40 font-12 pt-2">Top Categories</h5>
                                        <TermsGrid shadowy={false} id={106} listy/>
                                    </div>
                                </div>

                                <AddListingCard exClass='hide_in_collapsed'/>


                                <div className="card card-style bg-transparent mb-15 shadow-0 border pb-15">
                                    <div className="content my-0">
                                        <h5 className="font-700 text-uppercase opacity-40 font-12 pt-2">Settings</h5>
                                        <div className="list-group list-custom-small list-icon-0">
                                            <span className='_link' data-menu="menu-highlights" onClick={(e) => openOffCanvas(e)}>
                                                <i className="fa font-12 fa-droplet gradient-blue rounded-sm color-theme"></i>
                                                <span className="hide_in_collapsed">Highlights</span>
                                                <i className="hide_in_collapsed fa fa-angle-right"></i>
                                            </span>
                                            <span className='_link'  data-menu="menu-backgrounds" onClick={(e) => openOffCanvas(e)}>
                                                <i className="fa font-12 fa-paint-brush gradient-orange rounded-sm color-theme"></i>
                                                <span className="hide_in_collapsed">Backgrounds</span>
                                                <i className="hide_in_collapsed fa fa-angle-right"></i>
                                            </span>
                                            <span data-toggle-theme onClick={() => toggleTheme()}  data-trigger-switch="switch-dark2-mode" className="_link border-0">
                                                <i className="fa font-12 fa-moon gradient-yellow color-theme rounded-sm"></i>
                                                <span className="hide_in_collapsed">Dark Mode</span>
                                                <div className="custom-control ios-switch hide_in_collapsed">
                                                    <input data-toggle-theme onClick={() => toggleTheme()}  type="checkbox" className="ios-input" id="switch-dark2-mode"/>
                                                    <label className="custom-control-label" htmlFor="switch-dark2-mode"></label>
                                                </div>
                                                <i className="hide_in_collapsed fa fa-angle-right"></i>
                                            </span>
                                            {/* <div class="card card-style">
                                            <div class="content mb-0">
                                                <div class="d-flex mb-3">
                                                    <div class="align-self-center">
                                                        <h5>Text Size</h5>
                                                    </div>
                                                    <div class="align-self-center ms-auto">
                                                        <a href="#" class="text-size-default float-end icon icon-xxs rounded-s color-white bg-highlight"><i class="fa fa-sync-alt"></i></a>
                                                        <a href="#" class="text-size-increase float-end icon icon-xxs rounded-s color-white bg-highlight me-2 ms-2"><i class="fa fa-font font-16"></i></a>
                                                        <a href="#" class="text-size-decrease float-end icon icon-xxs rounded-s color-white bg-highlight"><i class="fa fa-font font-10"></i></a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div> */}
                                        </div>
                                    </div>
                                </div>

                                <div className="card card-style bg-transparent mb-15 shadow-0 border pb-15 hide_in_collapse">
                                    <div className="content my-0">
                                        <h5 className="font-700 text-uppercase opacity-40 font-12 pt-2">Quick Links</h5>
                                        <div className="quick_links">
                                        {quickLinks?.map((item) => (
                                        <div className="mb-10" key={item.id}>
                                        <h5 className="text-15 fw-300 mb-10 border-bottom pb-10 uppercase">{item.title}</h5>
                                        <div className="d-flex flex-column y-gap-10">
                                            {item.menuList.map((menu, i) => (
                                            <Link className='close-menu' onClick={() => closeMenus()} href={menu.routerPath} as={menu.routerPath} key={i}>
                                                {menu.name}
                                            </Link>
                                            ))}
                                        </div>
                                        </div>
                                    ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                           
                        </div>
                    </div>
                
  )
}
export default MainMenu