import { cleanHtml, ProductPrice } from "@/helpers/universal";
import { Client } from "react-hydration-provider";

const SliderWidgetRowItem = ({data}) => {
  const {name, short_description, categories, id, price, featured, images} = data;
  const priceView = ProductPrice(data);

  return (

    <>

<div className="row" style={{alignItems: 'end'}}>
                        <div className="col-12 col-sm-6  mb-20 mb-sm-0">
                          <div ><img style={{objectFit: 'cover', height: 250}}
                            className={'fadein gx-img-fluid'} src={images[0]?.src}
                            alt="..."/></div>
                        </div>
                        <div className="col-12 col-sm-6">
                          <h2 className="text-18 mb-2">{cleanHtml(name)}</h2>
                          {priceView}
                          <Client><p  className="gx-text-grey _excerpt truncate-4" dangerouslySetInnerHTML={{__html: short_description}}/></Client>
                        </div>
                      </div>
      
    </>
  );
};

export default SliderWidgetRowItem;
