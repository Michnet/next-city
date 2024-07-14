import { closeMenus, toggleTheme } from "@/helpers/appjs"
import { isActiveLink } from "@/helpers/universal";
import Link from "next/link"
import { useRouter } from "next/router"
import { UserCard } from "../UI/UserCard"
import {openOffCanvas} from "@/helpers/appjs";
import TermsGrid from './../UI/lists/TermsGrid';
import { quickLinks } from "@/helpers/data";
import Logo from "../UI/Logo";
import AddListingCard from "@/components/UI/partials/AddListingCard";
import UISettings from "./UISettings";
import MainMenuBtn from "./partials/MainMenuBtn";
import { Client } from "react-hydration-provider";


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
        name: "Explore Events",
        routePath: "/explore/events",
        isNew: false
    },
    {id: 3,
        icon: "fas fa-bullhorn",
        color: 'gradient-orange',
        name: "LyveCity Updates",
        routePath: "/news",
        isNew: true
    },
 ]
  return (
  <div id="sidebar_menu" className="list-group border-0 rounded-0 text-sm-start h-100">
                        <div id="menu-sidebar">
                                
                                <div className="position-sticky w-100 top-0 end-0 py-1 z-2">
                                <div className="card card-style mt-2 mb-0 mx-2">
                                    <div className='row_flex justify-between p-2' onClick={() => closeMenus()}>
                                        <Logo simple={false}/>
                                        <span className="icon icon-xxs gradient-red rounded-sm close-menu d-block d-md-none" onClick={() => closeMenus()}><i className="fa fa-times color-white"></i></span>
                                        
                                    </div>
                                </div>
                            </div>
                            <div className="sidebar-content">
                               <Client><div className="d-flex justify-center show_in_collapsed"><MainMenuBtn/></div></Client>
                               <UserCard exClass={'border'}/>
                                <div className="card card-style bg-transparent mb-15 shadow-0 border pb-15">
                                    <div className="content my-0">
                                        <h5 className="font-700 text-uppercase opacity-40 font-12 pt-2">Navigation</h5>
                                        <div className="list-group list-custom-small list-icon-0">
                                            {topLinks.map((el) => {
                                                let {id, icon, color, name, routePath, isNew} = el;
                                                return <Link key={id} href={routePath} className='close-menu' onClick={() => closeMenus()}>
                                                        <i className={`${icon} 
                                                        ${isActiveLink(routePath, router.asPath)? 'gradient-menu color-white' : 'gradient-highlight color-white'} 
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
                                        <UISettings/>
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