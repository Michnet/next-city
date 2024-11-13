import { closeMenus } from "@/helpers/appjs"
import { isActiveLink } from "@/helpers/universal";
import Link from "next/link"
//import { useRouter } from "next/router"
import { UserCard } from "../UI/UserCard"
//import {openOffCanvas} from "@/helpers/appjs";
import TermsGrid from './../UI/lists/TermsGrid';
import { quickLinks, exploreLinks } from "@/helpers/data";
import Logo from "../UI/Logo";
import AddListingCard from "@/components/UI/partials/AddListingCard";
import UISettings from "./UISettings";
import MainMenuBtn from "./partials/MainMenuBtn";
import { Client } from "react-hydration-provider";
import { usePathname } from 'next/navigation'


function MainMenu() {
 //const router = useRouter();
 const pathname = usePathname();

 const topLinks = [
    {id: 1,
        icon: "far fa-home",
        color: 'gradient-green',
        name: "Home",
        routePath: "/",
    },
    {id: 2,
        icon: "far fa-bullhorn",
        color: 'gradient-orange',
        name: "LyveCity Updates",
        routePath: "/news",
        isNew: true
    },
 ]
 const typeLinks = [
    {id: 1,
        icon: "far fa-calendar-check",
        color: 'gradient-red',
        name: "Events",
        routePath: "/explore/events",
        isNew: false
    },
    {id: 2,
        icon: "far fa-map-marked-alt",
        color: 'gradient-brown',
        name: "Places",
        routePath: "/explore/places",
        isNew: false
    },
    {id: 3,
        icon: "far fa-tags",
        color: 'gradient-brown',
        name: "Special Sales",
        routePath: "/explore/special-sales",
        isNew: false
    },
    {id: 4,
        icon: "far fa-wrench",
        color: 'gradient-brown',
        name: "Services",
        routePath: "/explore/services",
        isNew: false
    }
 ]
  return (
  <div id="sidebar_menu" className="list-group border-0 rounded-0 text-sm-start h-100">
                        <div id="menu-sidebar">
                                
                                <div className="position-sticky w-100 top-0 end-0 py-1 z-2">
                                <div className="card card-style mt-2 mb-0 mx-2">
                                    <div className='row_flex justify-between p-2' onClick={() => closeMenus()}>
                                        <Logo simple={false}/>
                                        <span data-bs-target='#sidebar' data-bs-toggle='collapse' className="icon icon-xxs gradient-red rounded-sm close-menu hide_in_collapsed" onClick={() => closeMenus()}><i className="fa fa-chevron-left color-white"></i></span>
                                        
                                    </div>
                                </div>
                            </div>
                            <div className="sidebar-content">
                               <Client><div className="justify-center show_in_collapsed d-none d-md-flex"><MainMenuBtn/></div></Client>
                               <UserCard exClass={'border'}/>
                                <div className="card card-style top_links bg-transparent mb-15 shadow-0 rounded-0 pb-15">
                                    <div className="content my-0">
                                        <h5 className="font-700 text-uppercase opacity-40 font-12 pt-2">Navigation</h5>
                                        <div className="list-group list-custom-small list-icon-0">
                                            {topLinks.map((el) => {
                                                let {id, icon, color, name, routePath, isNew} = el;
                                                return <Link key={id} href={routePath} className='close-menu' onClick={() => closeMenus()}>
                                                        <i className={`${icon} 
                                                        ${isActiveLink(routePath, pathname) ? 'gradient-menu color-white' : 'gradient-highlight color-white'} 
                                                        rounded-sm`}></i>
                                                        <span className="truncate">{name}</span>
                                                        {isNew && <span className="badge bg-highlight">NEW</span>}
                                                        <i className="fa fa-angle-right"></i>
                                                    </Link>
                                            })}
                                        </div>
                                    </div>
                                </div>

                                <div className="card card-style free_icons type_links bg-transparent mb-15 shadow-0 rounded-0 pb-15">
                                    <div className="content my-0">
                                        <h5 className="font-700 text-uppercase opacity-40 font-12 pt-2">Explore</h5>
                                        <div className="list-group list-custom-small list-icon-0">
                                                    <Link href={'/explore'} className='close-menu' onClick={() => closeMenus()}>
                                                        <i className={`fas fa-search-location color-theme 
                                                        rounded-sm`}></i>
                                                        <span className="truncate">All Listings</span>
                                                        <i className="fa fa-angle-right"></i>
                                                    </Link>
                                            {typeLinks.map((el) => {
                                                let {id, icon, color, name, routePath, isNew} = el;
                                                return <Link key={id} href={routePath} className='close-menu' onClick={() => closeMenus()}>
                                                        <i className={`${icon} 
                                                        ${isActiveLink(routePath, pathname) ? 'color-highlight' : 'color-theme'} 
                                                        rounded-sm`}></i>
                                                        <span className="truncate">{name}</span>
                                                        {isNew && <span className="badge bg-highlight">NEW</span>}
                                                        <i className="fa fa-angle-right"></i>
                                                    </Link>
                                            })}
                                        </div>
                                    </div>
                                </div>

                                <div className="card card-style free_icons bg-transparent mb-15 shadow-0 rounded-0 pb-15">
                                    <div className="content my-0">
                                        <h5 className="font-700 text-uppercase opacity-40 font-12 pt-2">Top Categories</h5>
                                        <TermsGrid flipped shadowy={false} id={0} listy/>
                                    </div>
                                </div>

                                <AddListingCard exClass='hide_in_collapsed'/>


                                <div className="card card-style bg-transparent mb-15 shadow-0 rounded-0 pb-15">
                                    <div className="content my-0">
                                        <h5 className="font-700 text-uppercase opacity-40 font-12 pt-2">Settings</h5>
                                        <UISettings/>
                                    </div>
                                </div>

                                <div className="card card-style bg-transparent mb-15 shadow-0 rounded-0 pb-15 hide_in_collapse">
                                    <div className="content my-0">
                                        <h5 className="font-700 text-uppercase opacity-40 font-12 pt-2">Quick Links</h5>
                                        <div className="quick_links">
                                        {exploreLinks?.map((item) => (
                                        <div className="mb-10" key={item.id}>
                                        <h5 className="text-15 fw-bold mb-10 border-bottom pb-10 "><span className="color-highlight-gradient fw-300">{item.title}</span></h5>
                                        <div className="d-flex flex-column y-gap-10">
                                            {item.menuList.map((menu, i) => {
                                                const {routerPath} = menu;
                                                return (
                                            <Link className='close-menu' onClick={() => closeMenus()} href={menu.routerPath} as={menu.routerPath} key={routerPath}>
                                                {menu.name}
                                            </Link>
                                            )})}
                                        </div>
                                        </div>
                                    ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="card card-style bg-transparent mb-15 shadow-0 rounded-0 pb-15 hide_in_collapse">
                                    <div className="content my-0">
                                        <h5 className="font-700 text-uppercase opacity-40 font-12 pt-2">Help Links</h5>
                                        <div className="quick_links">
                                        {quickLinks?.map((item) => (
                                        <div className="mb-10" key={item.id}>
                                        <h5 className="text-15 fw-bold mb-10 border-bottom pb-10 "><span className="color-highlight-gradient fw-300">{item.title}</span></h5>
                                        <div className="d-flex flex-column y-gap-10">
                                            {item.menuList.map((menu, i) => {
                                                const {routerPath} = menu;
                                                return(
                                            <Link className='close-menu' onClick={() => closeMenus()} href={menu.routerPath} as={menu.routerPath} key={routerPath}>
                                                {menu.name}
                                            </Link>
                                            )})}
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