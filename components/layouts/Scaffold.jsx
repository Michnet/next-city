import MainMenu from "./MainMenu"
import { Client } from "react-hydration-provider";
import Activity from "../UI/lists/Activity";
import Header from "./partials/Header";

function Scaffold({children, uiSize}) {
    const {isDeskTop} = uiSize;
  return (<>
    <div className="container-fluid p-0">
        <div className="row flex-nowrap _scaffold">
            <div className="col-auto d-none d-md-block p-0 p-md-2" style={{height: '100vh', position: 'sticky', top: '0', maxWidth: '250px'}}>
                <div id="sidebar" className="_main collapse collapse-horizontal d-none d-md-block rounded-m bg-theme">
                    <MainMenu/>
                </div>
            </div>
            <div className="col px-0 main_content" style={{minWidth: '0'}}>
                {isDeskTop && <Header headerClass={'header-always-show position-sticky'}/>}
                {children}
            </div>
            <div className="lg-sticky col p-2 flex-grow-0 d-none d-lg-block right_view" style={{width: '295px', minWidth: '295px', top: '0px'}}>
                <Activity/>
            </div>
        </div>
    </div>
    <Client>
        <div id="mobile_sidebar" className="_main menu menu-box-left d-block d-md-none rounded-16 bg-theme">
            <MainMenu/>
        </div>
        <div style={{width: '300px'}} id="mobile_news" className="menu menu-box-right d-block d-lg-none rounded-16 bg-theme">
            <Activity/>
        </div>
    </Client>
    </>
  )
}
export default Scaffold