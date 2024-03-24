import { openOffCanvas, toggleTheme } from "@/helpers/appjs";
import Link from "next/link";
import { Client } from "react-hydration-provider";
import { UserAvatar } from "@/components/UI/UserAvatar";
import MainMenuBtn from "./MainMenuBtn";
import { useRouter } from "next/router";

const Header = ({headerTitle, headerClass}) => {
  const router = useRouter();

return <Client>
    <div id='header_bar' className={`header header-bar header-sticky header-logo-center ${headerClass ?? 'header-auto-show'} header-search`}>
    <div className="_left">
      <Client>
        <MainMenuBtn/>
      </Client>
      <button className='back_link d-none' onClick={() => router.back()}
      >
        <i className="fas fa-chevron-left" />
      </button>
      <div className="title_box">
        <Link href="/" className="header-title truncate mh-100">
        {headerTitle ?? "LyveCity"}
        </Link>
      </div>
    </div>
      
      <div className="_right">
        <span data-toggle-theme onClick={() => toggleTheme()}  className="header-menu-icon header-icon-4" >
          <i className="far fa-lightbulb"></i>
        </span>
        <span onClick={(e) => openOffCanvas(e)}  data-menu='mobile_news' className="header-menu-icon header-icon-4" >
          <i className="far fa-bell"></i>
        </span>
        <span data-toggle-search onClick={(e) => openOffCanvas(e)} data-menu='search_form_1'>
          <i className="fas fa-search-location"></i>
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
export default Header;