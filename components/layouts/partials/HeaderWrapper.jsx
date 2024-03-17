import { Client } from "react-hydration-provider";

const HeaderWrapper = ({children, header_id='header_wrap', headerClass='header-auto-show'}) => {
 
    return <Client>
    <div id={header_id} className={`header header-bar header-fixed header-logo-center ${headerClass} header-search`}>
      {children}
    </div>
  </Client>
}
export default HeaderWrapper;