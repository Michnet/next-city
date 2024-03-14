import { openOffCanvas, toggleTheme } from "@/helpers/appjs";
import Link from "next/link";
import { Client } from "react-hydration-provider";
import { UserAvatar } from "@/components/UI/UserAvatar";

const Header = ({headerTitle, headerClass}) => {
 
    return <Client>
    <div className={`header header-bar header-fixed header-logo-center ${headerClass ?? 'header-auto-show'} header-search`}>
    <div className="_left">
      <Client>
        <button onClick={(e) => openOffCanvas(e)} className="left_menu_btn d-flex items-center text-20 d-block d-md-none" data-menu='mobile_sidebar'>
          <i class="bi bi-text-left"></i>
        </button>
        <button className="left_menu_btn d-flex items-center text-20 d-none d-md-block" aria-expanded='false' data-bs-target={"#sidebar"} data-bs-toggle={'collapse'}>
          <i class="bi bi-text-left"></i>
        </button>
      </Client>
      <a
        href="#"
        data-back-button
        className="_left header-icon header-icon-1"
      >
        <i className="fas fa-arrow-left"></i>
      </a>
      <div className="title_box">
        <Link href="/" className="header-title truncate mh-100">
        {headerTitle ?? "LyveCity"}
        </Link>
      </div>
    </div>
      
      <div className="_right">
        <a href="#" data-toggle-theme onClick={() => toggleTheme()}  className="header-menu-icon header-icon-4" >
          <i className="bi bi-lamp-fill"></i>
        </a>
        <span onClick={(e) => openOffCanvas(e)}  data-menu='mobile_news' className="header-menu-icon header-icon-4" >
          <i className="lar la-bell"></i>
        </span>
        <span onClick={(e) => openOffCanvas(e)} data-menu="menu-sidebar-right-2">
          <i className="bi bi-text-indent-left"></i>
        </span>
        <a href="#" data-toggle-search>
          <i className="fa fa-search"></i>
        </a>
        <UserAvatar/>
        {/* <div className="search-box pt-2">
          <input type="text" className="px-3" placeholder="Search here.. - try the word demo " data-search/>
          <a href="#" data-toggle-search="" className="mt-0 me-n3 pt-2">
            <i className="fa fa-angle-up color-highlight"></i>
            <i className="clear-search"></i>
          </a>
        </div> */}
      </div>
    </div>
  </Client>
}
export default Header;