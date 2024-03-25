import { listingUrlBase } from '@/helpers/universal';
import Link from 'next/link';
import  {useState, useEffect} from 'react';
// import { listingUrlBase } from '~/server/UniversalFunctions';
//import ProductVendorCard from './header-partials/ProductVendorCard';

const ProductHeaderTicket = ({product}) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if(product){
          setLoading(false);
        }
    }, []);

    
    let headerView, vendorView;
    
    if(product){
        const {listing} = product;
        if(listing){
        const {id, title, phone, whatsapp, cover, logo, slug, type} = listing;
        console.log('listing', listing)
        
        vendorView = <>
        <div className="coverImg_box position-relative" style={{ background: "var(--bg-gray)" }}> 
            <div className='cover_content'>
                Ticket Item for: 
                <h4 dangerouslySetInnerHTML={{__html: title}}/>
            </div>
            
        </div>
        <div className='content_box'>
            {whatsapp && <Link href={`https://wa.me/${whatsapp}`} className='contact_link _whats bg-transparent'>
                <i className="bi bi-whatsapp"/> WhatsApp
            </Link>}
            
            {phone && <button className='btn btn-theme w-fit'><Link href={`tel:${phone}`} className='bg-transparent contact_link _call'>
                <i className="bi bi-telephone"/> Call Now
            </Link></button>}

            <div className='card_footer'>            
                <button className='btn btn-outline-secondary listing_link'>
                    <Link href={`/${listingUrlBase(type)}/${slug}`}>
                        Business Page
                    </Link>
                </button>
            </div>

        </div>
        
        
        </>
        }
    }
    
    if(product){
        headerView = <>
        <div className='product_header _ticket bg-white p-3'>
                <div className='ps-data d-flex flex-column'>
                    {/* <ProductVendorCard product={product} noBg/>   */}
                    {vendorView}
                </div>
        </div>
        </>
    } else{
        headerView = <div>Loading Header ..</div>
    }
    return (
        <div>
           {headerView}
        </div>
    )
}

export default ProductHeaderTicket
