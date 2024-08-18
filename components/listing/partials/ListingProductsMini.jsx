import  {useState, useEffect} from 'react';
import { getProducts } from '@/helpers/rest';
import SliderWidgetRowItem from '@/components/UI/widgets/SliderWidgetRowItem';
import Splider from '@/components/UI/partials/Splider';
import ProductCard from '@/components/UI/market/productCards/ProductCard';

function ListingProductsMini({ids}) {

    const [products, setProducts] = useState(null);
    const [filterArr, setFilterArr] = useState({
        _fields: "id,name,featured,short_description,price,regular_price,average_rating,rating_counts,images,attributes,listing",
        type: 'simple',
        _embed : true
        });

  const [loading, setLoading] = useState(true);

  const settings = {
    arrows: false,
    dots: true,
    infinite: true,
    speed: 1000,
    marginLeft: 10,
    marginRight: 10,
    //slidesToShow: 3,
    cssEase: 'ease-out',
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        },
      },

      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 520,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

    let idString;
    if(ids){
        idString = ids.join(',');
    } 

    async function productsQuery(payload) {
        const pdts = await getProducts(payload);
        if (pdts) {
            setProducts(pdts.items);
            setLoading(false);
            return pdts;
        } else {;
            return null;
        }
    }

    useEffect(() => {
        let payload = {};
        if (idString) {
            payload = {
                include: idString,
            }
          }
        productsQuery(payload);
        
    }, [ids]);

  

    let shopView;

    if(products?.length > 0){
            shopView = <>
               {<div  className= "pdt_slider_big">
                          <Splider>
                            {products.map((data, index) =>
                              <ProductCard key={index} product={data}/>)
                            }
                          </Splider>
               </div>}
                </>
    }

    return (
        <>{}</>
    )
}

export default ListingProductsMini
