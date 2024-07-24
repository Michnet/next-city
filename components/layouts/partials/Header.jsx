import { openOffCanvas, toggleTheme } from "@/helpers/appjs";
import Link from "next/link";
import { Client } from "react-hydration-provider";
import { UserAvatar } from "@/components/UI/UserAvatar";
import MainMenuBtn from "./MainMenuBtn";
import { useRouter } from "next/router";
import {memo } from "react";
import Logo from "@/components/UI/Logo";

const HeaderConst = ({headerTitle, headerClass}) => {
  const router = useRouter();

return <Client>
    <div id='header_bar' className={`header header-bar header-sticky header-logo-center ${headerClass ?? 'header-auto-show'} header-search`}>
    <div className="_left">
      <Client>
        <MainMenuBtn exClass='d-block d-md-none'/>
      </Client>
      <button className='back_link d-none' onClick={() => router.back()}
      >
        <i className="fas fa-chevron-left" />
      </button>
      <div className="title_box row_flex align-items-center gap-1">
          <Logo noVersion simple = {true}/>
        <h2 className="smLine header-title truncate-2">{headerTitle ?? "LyveCity"}</h2>
      </div>
    </div>
      
      <div className="_right">
        <span data-toggle-theme onClick={() => toggleTheme()}  className="header-menu-icon header-icon-4" >
          <i className="far fa-adjust color-theme"></i>
        </span>
        <span onClick={(e) => openOffCanvas(e)}  data-menu='mobile_news' className="header-menu-icon header-icon-4" >
          <i className="far fa-bell color-theme"></i>
        </span>
        <span data-toggle-search onClick={(e) => openOffCanvas(e)} data-menu='search_form_1'>
          <i className="fas fa-search color-theme"></i>
        </span>
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

const Header = memo(HeaderConst)
export default Header;