//import SkeletonProductDetail from 'appComponents/components/skeletons/SkeletonProductDetail';
//import MobileMenu from '~/appComponents/core/Layout/BottomMobileMenu';
//import { useRouter } from 'next/router';
import  {useEffect} from 'react';
import { ProductPrice } from '@/helpers/universal';
//import { ActionsContext } from '../../../appComponents/contexts/ActionsContext';
//import { ProductContext } from '../../../appComponents/contexts/productContext';
//import ProductBody from './partials/single/ProductBody';
//import ProductSide from './partials/single/side/ProductSide';
// import EventDates from '~/server/frontendRequests/EventDates';
//import { useAuth } from '~/util/use-auth';
// import DualColorHeader from '~/appComponents/components/partials/DualColorHeader';
//import HeaderImages from './partials/single/header-partials/HeaderImages';
import { useRecoilValue } from 'recoil';
import { authState } from '@/contexts/atoms';
import ProductSide from '../partials/ProductSide';
import { DualColorHeader } from '../../Partials';
import ProductHeader from '../partials/ProductHeader';
import HeaderInfo from '../partials/HeaderInfo';

const SimpleProduct = ({product}) => {
    //const {dispatchActions} = useContext(ActionsContext);
    const {id, occurrence_slots, price, listing} = product;
    let listingId = listing.id;    
    const {user} = useRecoilValue(authState);

    const priceView = ProductPrice(product);
   

    useEffect(() => {
        if(product){
          //  dispatchActions({type: 'addProductView', payload: {product: product}});
        }
    }, [product]);
    
    let productView, extraView, menuView;

    if(product){
        extraView = 
        <div>
            <button type="primary" >Call Vendor</button>
            <button >Save</button>
        </div>

        menuView = <>{priceView}</>
        
    }

   if(product){
        productView = <div className='ps-box _ticket p-3'>
                            <div className='ps-main row'>
                                <div className='col-12 col-sm-4 col-lg-3 pl-0 sm:pr-0 position-sm-sticky' style={{top: 0}}>
                                    <ProductHeader product={product} user={user}/>
                                </div>
                                <div className='product_body col-12 col-sm-8 col-lg-9 p-0'>
                                    {/* <ProductBody product={product}/> */}
                                    {/* <HeaderImages product={product}/> */}
                                    <HeaderInfo product={product}/>
                                    <DualColorHeader desc={'Occurences you can book tickets for'} exClass={'mb-20'} title={'Event Occurences'}/>
                                </div>
                            </div>
                            <div className='ps-side scroll_sticky'>
                                <ProductSide product={product} listingId={listingId ??  null}/>
                            </div> 
                            {/* <MobileMenu extra={extraView} children={menuView}/>   */}        
                        </div>
    } else {
        productView = <div>There's a problem...</div>
    }
    
    return (
        <div>
           {productView}
        </div>
    )
}

export default SimpleProduct
