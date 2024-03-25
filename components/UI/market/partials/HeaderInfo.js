import { Client } from 'react-hydration-provider';
// import StarRatingComponent from 'react-star-rating-component';
import { cleanHtml, ProductPrice } from '@/helpers/universal';
import RatingView from '@/components/listing/reviews/RatingView';

const HeaderInfo = ({product}) => {

    let infoView;
    if(product){

        const {id, thumb, name, price, variant, rating, short_description, regular_price} = product;
        const priceView = ProductPrice(product);

        infoView =  <div className="gx-product-body">
                            <h3 className="gx-product-title">{cleanHtml(name)}</h3>
                            {priceView}
                            <div className="ant-row-flex gx-mb-1">
                            {rating && rating > 0 && <RatingView
                                name=""
                                value={rating}
                                starCount={5}
                                editing={false}/>}
                            <strong className="gx-d-inline-block gx-ml-2">{rating}</strong>
                            </div>
                            <Client><p dangerouslySetInnerHTML={{  __html: short_description}} /></Client>
                    </div>
    }else{
        infoView = <div>Loading Info</div>
    }
    return (
        <div className='header_info'>
            {infoView}
        </div>
    )
}

export default HeaderInfo
