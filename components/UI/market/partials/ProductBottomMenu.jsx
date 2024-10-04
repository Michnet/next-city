//import { nextPostState } from "@/contexts/atoms"
import { openOffCanvas } from "@/helpers/appjs"
//import { BookingView } from "@/pages/events/[slug]"
import { memo, useState, useEffect} from "react"
//import { useRecoilValue } from "recoil"
import BottomMenu from "../../../layouts/BottomMenu"
import { LoaderRingBoxed } from "../../../skeletons/Loaders"
//import Navigator from "./Navigator"
import { NextPostLink, PreviousPostLink } from "../../../listing/partials/ListingLinks"
import { homeurl } from "@/helpers/base"
import PostLike from "../../partials/social/PostLike"

const ProductBottomMenuConst = ({product, router}) =>{
    //const {general_merchandise} = acf ?? {}
    const {listing, id} = product ?? {};
    const {title, phone, whatsapp, cover, logo, slug, type} = listing ?? {};


    const [loading, setLoading] = useState(true);

    useEffect(() => {
      setLoading(false);
    
      return () => {
        setLoading(true)
      }
    }, [listing])
    

    let bottomContent = <div id="footer-bar" className="footer-bar-1 d-md-none">
                <div className='gap-2 footer_content ps-2 py-2'>
                    
                    {whatsapp && <a href={`https://wa.me/${whatsapp}?text=I'm%20inquiring%20about%20the%20this%20item%20${homeurl}${router.asPath}`} className="flex-grow-0 btn btn-m shadow-bg shadow-bg-m  rounded-s text-uppercase text-nowrap font-900 shadow-s bg-whatsapp btn-icon text-start color-white">
                        <i className="fab fa-whatsapp font-15 text-center color-white position-absolute"></i>
                        WhatsApp
                    </a>}
                    {<span style={{maxWidth: '50px'}} className={'_link'} onClick = {async () => {if (navigator?.share) { try { await navigator.share({ 
              url: `${homeurl}${router.asPath}` 
          }); } catch (err) { onError?.(err); } } }}>
                        <i class="fal fa-share-square text-center text-24"></i>
                    </span>}
                    {phone && <a style={{maxWidth: '50px'}} className={''} href={`tel:${phone}`}><i class="fal fa-phone text-center text-24"></i></a>}
                    <PostLike listing={id} exClass='_link' style={{maxWidth: '50px'}}
                        likedEl={<i class="fas fa-heart text-center text-24" />}
                        unlikedEl={<i class="fal fa-heart text-center text-24" />}
                    />

                    {/* <NextPostLink current={listing.slug} styleObj={{maxWidth: '50px'}}/> */}
                    </div>
                    {/* <div className='_fab'>
                    <button data-menu='listingActions' onClick={(e) => openOffCanvas(e)} className={'d-flex align-items-center justify-center  px-2 bg-theme'}>
                    <i class="fas fa-ellipsis-h text-center text-24 color-theme"/>
                    <div className="position-absolute show_in_transit"><LoaderRingBoxed size={75}/></div>
                    </button>
                    </div> */}
                </div>    
    return <BottomMenu content={bottomContent}/>
}
const ProductBottomMenu = memo(ProductBottomMenuConst)
export default ProductBottomMenu;