//import { nextPostState } from "@/contexts/atoms"
import { openOffCanvas } from "@/helpers/appjs"
import { srcWithFallback } from "@/helpers/universal"
import { memo, useState, useEffect} from "react"
//import { useRecoilValue } from "recoil"
import BottomMenu from "../layouts/BottomMenu"
import { LoaderRingBoxed } from "../skeletons/Loaders"
//import PostLike from "../UI/partials/social/PostLike"
import Navigator from "./navigation/Navigator"
//import Navigator from "./Navigator"
//import { NextPostLink, PreviousPostLink } from "./partials/ListingLinks"

const ListingBottomMenuConst = ({lMenu, listing, setActiveKey, user, activeKey}) =>{/* 
    const {phone, whatsapp, acf, id, cover} = listing ?? {}
    const {general_merchandise} = acf ?? {} */

    const [loading, setLoading] = useState(true);

    useEffect(() => {
      setLoading(false);
    
      return () => {
        setLoading(true)
      }
    }, [listing])
    

    let bottomContent = <div style={{width: '100%'}} id="footer-bar" className="footer-bar-1 d-md-none align-items-center gap-1 px-2 border-0 font-900">
                <div className='footer_content py-0 bg-transparent minw-0 flex-shrink-1 shadow-0 justify-between'>
                    <Navigator items={4} faClass='far' exClass='px-3 view_all' lMenu={lMenu} setActiveKey={setActiveKey} listing={listing} activeKey={activeKey}/>
                    </div>
                    <button style={{height: '45px'}} data-menu='listingMenuRight' onClick={(e) => openOffCanvas(e)} className={'d-flex align-items-center flex-column justify-center'}>
                    <i className="fas fa-ellipsis-h text-center link_icon"/>
                    <span className="truncate nav_i_title fw-500 opacity-50 text-10 text-uppercase ">More</span>
                    </button>
                    <button style={{height: '45px', borderRadius: '10px'}} data-menu='listingActions' onClick={(e) => openOffCanvas(e)} className={'d-flex align-items-center justify-center  px-2 border-light'}>
                    <i className="fas fa-location text-center text-24"/>
                    <div className="position-absolute show_in_transit"><LoaderRingBoxed size={75}/></div>
                    </button>
                   {/*  <div className='_fab'>
                    <button data-menu='listingActions' onClick={(e) => openOffCanvas(e)} className={'d-flex align-items-center justify-center  px-2 bg-theme'}>
                    <i className="fas fa-ellipsis-h text-center text-24 color-theme"/>
                    <div className="position-absolute show_in_transit"><LoaderRingBoxed size={75}/></div>
                    </button>
                    </div> */}
                </div>    
    return <><BottomMenu content={bottomContent}/>
    <style>
      {`#footer-bar{will-change:transform}`}
    </style>
    </>
}
const ListingBottomMenu = memo(ListingBottomMenuConst)
export default ListingBottomMenu;