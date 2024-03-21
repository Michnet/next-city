import CallToActions from "@/components/UI/CallToActions";
import Link from "next/link";

export const ListingContact = ({listing, title, thin = false, descript, border=false, light=false, bgClass}) => {
    // const {isMobile} = useRecoilValue(UISizes);
     const {phone, whatsapp} = listing ?? {};
   
     return <CallToActions thin={thin} border={border} light={light} bgClass={bgClass ?? 'bg-white'} title={title ?? null} descript={descript ??  null} actionComponent={
       <div className= 'listing_contact'>
         {/* <button className="link_box btn btn-outline-secondary rounded-3 mb-0 mr-0" data-bs-toggle={isMobile ? 'offcanvas' : 'modal'} data-bs-target="#listing_chat">
         <i className="las la-sms"/><span>Chat</span></button> */}
         <Link href={`tel:${phone}`} ><button className="link_box btn btn-outline-secondary rounded-3 mb-0"><i className="las la-phone"/> <span>Call</span></button> </Link>
         {whatsapp && <a  href={`https://wa.me/${whatsapp}`}><button className="link_box btn btn-outline-secondary rounded-3 mb-0"><i style={{color: '#25D366'}} className="lab la-whatsapp"/><span>WhatsApp</span></button></a>}
       </div>}/>
   }