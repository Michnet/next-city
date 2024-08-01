import { openOffCanvas, toggleTheme } from "@/helpers/appjs";
import { Client } from "react-hydration-provider";
import { UserAvatar } from "@/components/UI/UserAvatar";
//import { useRouter } from "next/router";
import {memo } from "react";

const HeaderAnnexConst = ({exClass=''}) => {
  //const router = useRouter();

return <Client> 
      <div className={`h_annex row_flex justify-end gap-2 align-items-center ${exClass}`}>
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
  </Client>
}

const HeaderAnnex = memo(HeaderAnnexConst)
export default HeaderAnnex;