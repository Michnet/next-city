import { openOffCanvas, toggleTheme } from "@/helpers/appjs";
//import Link from "next/link";
import { Client } from "react-hydration-provider";
import { UserAvatar } from "@/components/UI/UserAvatar";
import MainMenuBtn from "./MainMenuBtn";
import { useRouter } from "next/router";
import {memo } from "react";
import Logo from "@/components/UI/Logo";
import HeaderAnnex from "./HeaderAnnex";

const HeaderConst = ({headerTitle, headerClass}) => {
  const router = useRouter();

return <Client>
    <div id='header_bar' className={`header header-bar header-sticky header-logo-center ${headerClass ?? 'header-auto-show'} header-search`}>
    <div className="_left">
      <Client>
        <MainMenuBtn exClass='d-md-none'/>
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
        <HeaderAnnex exClass='w-100'/>
      </div>
    </div>
  </Client>
}

const Header = memo(HeaderConst)
export default Header;