//import { listingUrlBase } from '@/helpers/universal';
import Link from 'next/link';
import  {useState, useEffect} from 'react';
import ActivityCarousel from '../../Listings/ActivityCarousel';
//import ProductVendorCard from './header-partials/ProductVendorCard';

const ProductHeader = ({product}) => {
    const [loading, setLoading] = useState(true);
    const {listing, selling_listings} = product ?? {};
    const {id, title, phone, whatsapp, cover, logo, slug, type} = listing ?? {};

    useEffect(() => {
        if(product){
          setLoading(false);
        }
    }, []);

    
    let headerView, vendorView, sellers = selling_listings?.length ?? 0;
    
    if(product){
        
        if(sellers > 0){
        
        vendorView = <>
        <div className="position-relative mb-3"> 
            <div className='px-2'>
                <p className='fw-600'>{`Available in ${sellers} store${sellers > 1 ? 's' : ''}`}</p>
                {/* <h4 dangerouslySetInnerHTML={{__html: title}}/> */}
            </div>
        </div>
        <div className='content_box'>
            <div className='row_flex gap-2'>
                {/* <button className='btn btn-outline-secondary listing_link border mb-3'>
                    <Link href={`/${type}/${slug}`}>
                        Go to Business Page 
                    </Link>
                </button> */}
                {/* {whatsapp && <a href={`https://wa.me/${whatsapp}`} class="btn btn-m shadow-bg shadow-bg-m mb-3 rounded-s text-uppercase text-nowrap font-900 shadow-s bg-whatsapp btn-icon text-start">
					<i class="fab fa-whatsapp font-15 text-center"></i>
					WhatsApp
				</a>} */}
            
            {/* {phone && <a href={`tel:${phone}`} class="btn btn-m shadow-bg shadow-bg-m mb-3 rounded-s text-uppercase text-nowrap color font-900 shadow-s bg-dark-dark btn-icon text-start">
					<i class="fas fa-phone font-15 text-center"></i>
					Call Now
				</a>} */}
                <ActivityCarousel autoHeight={true} optionsObj={{padding: {left:0, right:20}}} /* listingType={type} */ ignorePriority={true} skeletonHeight={200} skeletonWidth={300} thumbsize={'thumbnail'} /* height={'auto'} */ exCardClass={'me-2'} /* title={`Latest ${type}s`} subtitle={`Fresh and New ${type}s`} */ limit={4} cardType={5} exClass={'px-0'} cardWidth={300} shadowHeight={144} include={selling_listings.join(',')}/>
                </div>
        </div>
        </>
        }
    }
    
    if(product){
        headerView = <>
        <div className='product_header _ticket shadow-0 bg-transparent mb-3 m-0'>
                <div className='ps-data d-flex flex-column' style={{borderRadius: 'inherit'}}>
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

export default ProductHeader
