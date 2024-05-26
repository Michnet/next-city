import { cleanHtml } from "@/helpers/universal";
import Link from "next/link";
import { Client } from "react-hydration-provider";
import { PriceView } from "../../PriceView";
import ProductActions from "../partials/ProductActions";

const ProductCard = ({product, user}) => {

    const {id, listing, name, price, rating, short_description,price_html, occurrence_slots, images} = product ?? {};
    const {phone, whatsapp, cover, logo, title, id:listing_id, type, slug} = listing ?? {};

    let imgUrl = images?.length > 0 ? images[0].medium : cover;
  
    return <>{/* <div className="card card-style ticket_card m-0">
    <section className="date bg-cover" style={{backgroundImage: `url("${imgUrl}")`}}>
    </section>
    <section className="card-cont sm:pl-20">
      <small className="text-uppercase smLine truncate-2 mb-2 opacity-70">{cleanHtml(title)}</small>
      <h3 className="text-uppercase lh-1 mb-15">{cleanHtml(name)}</h3>

      <Client><p className="p-desc font-13 opacity-80" dangerouslySetInnerHTML={{  __html: short_description}} /></Client>
      {price_html && <PriceView preText={''}  exClass={'_inline'} priceHTml={price_html}/> }
      <div className='divider d-block mt-10 mb-2'/>
      <div className="card_footer flex_row justify-between">
        <ProductActions smallIcons whatsApp={whatsapp} phone={phone} user={user}/>
        <Link href={`/market/event-tickets/${id}`}>Details</Link>
      </div>
    </section>
    <section className="ticket_annex">
    <Client><h3 className="text-uppercase">{cleanHtml(title)}</h3></Client>
    </section>
  </div> */}


  <div className="card card-style m-0 bg-theme pdt-card">
							<img src={imgUrl} className="pdt-img"/>
							<div className="content">
              <Link href={`/market/event-tickets/${id}`}><h3 className="mb-0 truncate-2 smLine font-16">{cleanHtml(name)}</h3></Link>
								{/* <a href="#">
									<i className="fa fa-star color-yellow-dark font-10"></i>
									<i className="fa fa-star color-yellow-dark font-10"></i>
									<i className="fa fa-star color-yellow-dark font-10"></i>
									<i className="fa fa-star color-yellow-dark font-10"></i>
									<i className="fa fa-star color-yellow-dark font-10"></i>
									<span className="font-11 ps-2 color-theme opacity-30">Based on 331 Reviews</span>
								</a> */}{/* 
								<h5 className="font-13 font-600 opacity-50 pt-1 pb-2">256GB DDR, 15TB SSD, 10 Expansion Ports, free Apple Music Subscription included.</h5> */}
                <Client><h5 className="p-desc font-13 font-600 opacity-50 pt-1 pb-2 truncate-3 smLine" dangerouslySetInnerHTML={{  __html: short_description}} /></Client>
								<div className="divider mb-2 mt-10"></div>
								<div className="d-flex flex-wrap gap-2 justify-between">
									<div className="align-self-center">
                    {price_html && <PriceView preText={''}  exClass={''} priceHTml={price_html}/> }
									</div>
									<div className="align-self-center">
                  <ProductActions id={id} exClass={'buttony'} whatsApp={whatsapp} phone={phone} user={user}/>
										{/* <a href="#" data-toast="snackbar-favorites" className="icon icon-s bg-theme rounded-l shadow-xl rounded-m ms-2 color-theme"><i className="fa fa-heart color-red-dark font-14"></i></a>
										<a href="#" data-toast="snackbar-cart" className="icon icon-s bg-theme rounded-l shadow-xl rounded-m ms-2 color-theme"><i className="fa fa-shopping-bag font-14"></i></a> */}
									</div>
								</div>
							</div>
						</div>
  </>
  }

  export default ProductCard;