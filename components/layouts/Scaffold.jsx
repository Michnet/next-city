import MainMenu from "./MainMenu"
import { Client } from "react-hydration-provider";
import Activity from "../UI/lists/Activity";


function Scaffold({children}) {
  return (<>
    <div className="container-fluid p-0">
        <div className="row flex-nowrap">
            <div className="col-auto d-none d-md-block p-0 p-md-2" style={{height: '100vh', position: 'sticky', top: '0', maxWidth: '250px'}}>
                <div id="sidebar" className="_main collapse collapse-horizontal d-none d-md-block rounded-16 bg-white">
                    <MainMenu/>
                </div>
            </div>
            <div className="col px-0 main_content" style={{minWidth: '0'}}>
                {children}
            </div>
            <div className="md-sticky col p-2 flex-grow-0 d-none d-md-block right_view" style={{width: '295px', top: '0px'}}>
                <Activity/>
            </div>
        </div>
    </div>
    <Client>
        <div id="mobile_sidebar" className="_main menu menu-box-left d-block d-md-none rounded-16 bg-white">
            <MainMenu/>
        </div>
        <div style={{width: '300px'}} id="mobile_news" className="menu menu-box-right d-block d-md-none rounded-16 bg-white">
            <Activity/>
        </div>
    </Client>
    </>
  )
}
export default Scaffold