//import { listingUrlBase } from '@/helpers/universal';
import Link from 'next/link';
import  {useState, useEffect} from 'react';
//import ProductVendorCard from './header-partials/ProductVendorCard';

const ProductHeader = ({product}) => {
    const [loading, setLoading] = useState(true);
    const {listing} = product ?? {};
    const {id, title, phone, whatsapp, cover, logo, slug, type} = listing ?? {};

    useEffect(() => {
        if(product){
          setLoading(false);
        }
    }, []);

    
    let headerView, vendorView;
    
    if(product){
        
        if(listing){
        
        vendorView = <>
        <div className="coverImg_box position-relative mb-4" style={{ background: "var(--bg-gray)" }}> 
            <div className='cover_content'>
                Sold By: 
                <h4 dangerouslySetInnerHTML={{__html: title}}/>
            </div>
            
        </div>
        <div className='content_box'>
            <div className='row_flex gap-2'>{whatsapp && <a href={`https://wa.me/${whatsapp}`} class="btn btn-m shadow-bg shadow-bg-m mb-3 rounded-s text-uppercase text-nowrap font-900 shadow-s bg-whatsapp btn-icon text-start">
					<i class="fab fa-whatsapp font-15 text-center"></i>
					WhatsApp
				</a>}
            
            {phone && <a href={`tel:${phone}`} class="btn btn-m shadow-bg shadow-bg-m mb-3 rounded-s text-uppercase text-nowrap color font-900 shadow-s bg-dark-dark btn-icon text-start">
					<i class="fas fa-phone font-15 text-center"></i>
					Call Now
				</a>}</div>


            <div className='card_footer'>            
            </div>

        </div>
        </>
        }
    }
    
    if(product){
        headerView = <>
        <div className='product_header _ticket bg-theme p-0 bg-cover card card-style mb-3 m-0' style={{backgroundImage: `url("${cover}")`}}>
                <div className='ps-data d-flex flex-column p-3 bg-gradient-fade backdropGray'>
                    {/* <ProductVendorCard product={product} noBg/>   */}
                    {vendorView}
                    
                </div>
        </div>
        <button className='btn btn-outline-secondary listing_link border mb-3'>
                    <Link href={`/events/${slug}`}>
                        Go to Business Page 
                    </Link>
                </button>
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

export default ProductHeader
