import { Client } from 'react-hydration-provider';
// import StarRatingComponent from 'react-star-rating-component';
import { cleanHtml, ProductPrice } from '@/helpers/universal';
import RatingView from '@/components/listing/reviews/RatingView';
import { PriceView } from '../../PriceView';
import { DualColorHeader } from '../../Partials';

const ProductBody = ({product}) => {


    let infoView;
    if(product){
        const {id, thumb, name, price_html, price, average_rating, rating, description, regular_price} = product;
        const priceView = ProductPrice(product);

        infoView =  <>
                    <div className="gx-product-body">
                            <DualColorHeader exClass={'mb-20'} title={'Item Detail'}/>
                            <div className="ant-row-flex gx-mb-1">
                            </div>
                            <Client><p className='text-13 opacity-70' dangerouslySetInnerHTML={{  __html: description}} /></Client>
                    </div>
                    </>
    }else{
        infoView = <div>Loading Info</div>
    }
    return (
        <div className='header_info card card-style p-4 mx-auto'>
            {infoView}
        </div>
    )
}

export default ProductBody
