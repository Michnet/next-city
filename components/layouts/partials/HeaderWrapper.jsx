import { Client } from "react-hydration-provider";

const HeaderWrapper = ({children, header_id='header_wrap', headerClass='header-auto-show'}) => {
 
    return <Client>
    <div id={header_id} className={`header header-bar header-sticky header-logo-center ${headerClass} header-search`}>
      <div className="header_inner">{children}</div>
    </div>
  </Client>
}
export default HeaderWrapper;