//import { nextPostState } from "@/contexts/atoms"
import { openOffCanvas } from "@/helpers/appjs"
import { memo } from "react"
//import { useRecoilValue } from "recoil"
import BottomMenu from "../layouts/BottomMenu"
import { NextPostLink, PreviousPostLink } from "./partials/ListingLinks"

const ListingBottomMenuConst = ({listing, setActiveKey, color}) =>{
    const {phone, whatsapp} = listing ?? {}

    let bottomContent = <div id="footer-bar" className="footer-bar-1 d-md-none">
                <div className='gap-2 footer_content ps-2 py-2'>
                    {<button onClick={() => setActiveKey('tickets')} className={`btn btn-m shadow-bg shadow-bg-m rounded-l text-uppercase text-nowrap font-900 shadow-s gradient-${color} btn-icon btn-icon-2 text-start`}>
                        <i class="far fa-calendar-check font-15 text-center bg-transparent"></i>
                        Booking
                    </button>}
                    {whatsapp && <a style={{maxWidth: '50px'}} className={''} href={`https://wa.me/${whatsapp}`} >
                        <i class="fab fa-whatsapp color-whatsapp text-center text-24"></i>
                    </a>}
                    {phone && <a style={{maxWidth: '50px'}} className={''} href={`tel:${phone}`}><i class="fas fa-phone text-center text-24"></i></a>}
                    {/* <PreviousPostLink/> */}
                    <NextPostLink current={listing.slug} styleObj={{maxWidth: '50px'}}/>
                    </div>
                    <div className='_fab'>
                    <button data-menu='listingActions' onClick={(e) => openOffCanvas(e)} /* style={{width: '50px', height: '50px', right: '10px'}}  */className={'d-flex align-items-center justify-center  px-2 bg-theme'}>
                    <i class="fas fa-ellipsis-h text-center text-24 color-theme"/>
                    </button>
                    </div>
                </div>    
    return <BottomMenu content={bottomContent}/>
}
const ListingBottomMenu = memo(ListingBottomMenuConst)
export default ListingBottomMenu;