//import { nextPostState } from "@/contexts/atoms"
import { openOffCanvas } from "@/helpers/appjs"
import { BookingView } from "@/pages/events/[slug]"
import { memo, useState, useEffect} from "react"
//import { useRecoilValue } from "recoil"
import BottomMenu from "../layouts/BottomMenu"
import { LoaderRingBoxed } from "../skeletons/Loaders"
import PostLike from "../UI/partials/social/PostLike"
import Navigator from "./navigation/Navigator"
//import Navigator from "./Navigator"
import { NextPostLink, PreviousPostLink } from "./partials/ListingLinks"

const ListingBottomMenuConst = ({lMenu, listing, setActiveKey, user, activeKey}) =>{
    const {phone, whatsapp, acf, id} = listing ?? {}
    const {general_merchandise} = acf ?? {}

    const [loading, setLoading] = useState(true);

    useEffect(() => {
      setLoading(false);
    
      return () => {
        setLoading(true)
      }
    }, [listing])
    

    let bottomContent = <div id="footer-bar" className="footer-bar-1 d-md-none align-items-center gap-3 px-2">
                <div className='footer_content py-0 bg-transparent minw-0 flex-shrink-1 shadow-0 justify-between'>
                    {/* <div className="row_flex align-items-center">
                <BookingView  simple={false} setActiveKey={setActiveKey} activeKey={general_merchandise?.length > 0 ? 'merchandise' : 'private-chat'} text={general_merchandise?.length > 0 ?'Event Store':'Contact Us'} exClass='fw-600 text-truncate me-2'/>
                    {phone && <a style={{width: '50px', maxWidth: '50px'}} className={''} href={`tel:${phone}`}><i className="fal fa-phone text-center text-24"></i><span>Call</span></a>}
                    <button onClick={(e) => setActiveKey('private-chat')} style={{width: '50px'}} className={`link`}><i className={`${activeKey == 'private-chat' ? '_active fas' : 'fal'} fa-comment-dots text-center text-24`}/><span>Chat</span></button>
                    <PostLike likedEl={<div style={{width: '50px'}} className="link"><i className={`fas fa-heart text-center text-24`}/><span>Save</span></div>} 
                        unlikedEl={<div style={{width: '50px'}} className="link"><i className={`fal fa-heart text-center text-24`}/><span>Save</span></div>} listing={id} user={user}/>
                    </div>
                    <div className="row_flex flex-shrink-1 justify-end">
                    <button data-menu='listingActions' onClick={(e) => openOffCanvas(e)} style={{width: '50px'}} className={'link'}><i className="fas fa-ellipsis-h text-center text-24"></i></button>
                    <NextPostLink current={listing.slug} styleObj={{width: '50px', maxWidth: '50px'}}/>
                    </div> */}
                    <Navigator exClass='px-3 view_all' lMenu={lMenu} setActiveKey={setActiveKey} listing={listing} activeKey={activeKey}/>
                    </div>
                    <button style={{height: '45px', borderRadius: '10px'}} data-menu='listingActions' onClick={(e) => openOffCanvas(e)} className={'d-flex align-items-center justify-center  px-2 border'}>
                    <i className="fas fa-ellipsis-h text-center text-24 color-theme"/>
                    <div className="position-absolute show_in_transit"><LoaderRingBoxed size={75}/></div>
                    </button>
                   {/*  <div className='_fab'>
                    <button data-menu='listingActions' onClick={(e) => openOffCanvas(e)} className={'d-flex align-items-center justify-center  px-2 bg-theme'}>
                    <i className="fas fa-ellipsis-h text-center text-24 color-theme"/>
                    <div className="position-absolute show_in_transit"><LoaderRingBoxed size={75}/></div>
                    </button>
                    </div> */}
                </div>    
    return <BottomMenu content={bottomContent}/>
}
const ListingBottomMenu = memo(ListingBottomMenuConst)
export default ListingBottomMenu;