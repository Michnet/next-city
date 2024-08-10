//import { nextPostState } from "@/contexts/atoms"
import { openOffCanvas } from "@/helpers/appjs"
import { BookingView } from "@/pages/events/[slug]"
import { memo, useState, useEffect} from "react"
//import { useRecoilValue } from "recoil"
import BottomMenu from "../layouts/BottomMenu"
import { LoaderRingBoxed } from "../skeletons/Loaders"
//import Navigator from "./Navigator"
import { NextPostLink, PreviousPostLink } from "./partials/ListingLinks"

const ListingBottomMenuConst = ({lMenu, listing, setActiveKey, color, activeKey}) =>{
    const {phone, whatsapp, acf} = listing ?? {}
    const {general_merchandise} = acf ?? {}

    const [loading, setLoading] = useState(true);

    useEffect(() => {
      setLoading(false);
    
      return () => {
        setLoading(true)
      }
    }, [listing])
    

    let bottomContent = <div id="footer-bar" className="footer-bar-1 d-md-none">
                <div className='gap-2 footer_content ps-2 py-2 justify-between'>
                    {/* {<button onClick={() => setActiveKey('tickets')} className={`btn btn-m shadow-bg shadow-bg-m rounded-l text-uppercase text-nowrap font-900 shadow-s gradient-${color} btn-icon btn-icon-2 text-start`}>
                        <i className="far fa-calendar-check font-15 text-center bg-transparent"></i>
                        Booking
                    </button>} */}
                    <div className="row_flex align-items-center">
                <BookingView  simple={false} setActiveKey={setActiveKey} activeKey={general_merchandise?.length > 0 ? 'merchandise' : 'private-chat'} text={general_merchandise?.length > 0 ?'Event Store':'Contact Us'} exClass='fw-600 text-truncate me-2'/>

                    {/* <Navigator lMenu={lMenu} setActiveKey={setActiveKey} listing={listing} activeKey={activeKey}/> */}
                    {whatsapp && <a style={{width: '50px'}} className={''} href={`https://wa.me/${whatsapp}`} >
                        <i className="fab fa-whatsapp color-whatsapp text-center text-24"></i><span>WhatsApp</span>
                    </a>}
                    {phone && <a style={{width: '50px'}} className={''} href={`tel:${phone}`}><i className="fal fa-phone text-center text-24"></i><span>Call</span></a>}
                    <button onClick={(e) => setActiveKey('private-chat')} style={{width: '50px'}} className={`link`}><i className={`${activeKey == 'private-chat' ? '_active fas' : 'fal'} fa-comment-dots text-center text-24`}></i><span>Chat</span></button>
                    {/* <button onClick={(e) => setActiveKey('reviews')} style={{width: '50px'}} className={`link`}><i className={`${activeKey == 'reviews' ? '_active fas' : 'fal'} fa-star text-center text-24`}></i><span>Reviews</span></button> */}
                    </div>
                    {/* <PreviousPostLink/> */}
                    <div className="row_flex flex-shrink-1 justify-end">
                    <button data-menu='listingActions' onClick={(e) => openOffCanvas(e)} style={{width: '50px'}} className={'link'}><i className="fas fa-ellipsis-h text-center text-24"></i></button>
                    <NextPostLink current={listing.slug} styleObj={{width: '50px', maxWidth: '50px'}}/>
                    </div>
                    </div>
                    {/* <div className='_fab'>
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