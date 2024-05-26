import { cleanHtml } from "@/helpers/universal";
import Link from "next/link";
import { Client } from "react-hydration-provider";
import { PriceView } from "../../PriceView";
import ProductActions from "../partials/ProductActions";

const Ticket = ({product, user}) => {

    const {id, listing, name, price, rating, short_description,price_html, occurrence_slots, images} = product ?? {};
    const {phone, whatsapp, cover, logo, title, id:listing_id, type, slug} = listing ?? {};

    let imgUrl = images?.length > 0 ? images[0].medium : cover;
  
    return <div className="card card-style ticket_card m-0">
    <section className="date bg-cover" style={{backgroundImage: `url("${imgUrl}")`}}>
      {/* <time datetime="23th feb">
      <span>23</span><span>feb</span>
      </time> */}
    </section>
    <section className="card-cont sm:pl-20">
      <small className="text-uppercase smLine truncate-2 mb-2 opacity-70">{cleanHtml(title)}</small>
      <h3 className="text-uppercase lh-1 mb-15">{cleanHtml(name)}</h3>

      <Client><p className="p-desc font-13 opacity-80" dangerouslySetInnerHTML={{  __html: short_description}} /></Client>
      {/* <div className="even-date lh-15">
      <i className="fa fa-calendar"></i>
      <time>
      <span>wednesday 28 december 2014</span>
      <span>08:55pm to 12:00 am</span>
      </time>
      </div> */}
      {price_html && <PriceView preText={''}  exClass={'_inline'} priceHTml={price_html}/> }
      {/* <div className="even-info lh-15">
        <i className="fa fa-map-marker"></i>
        <p>
            nexen square for people australia, sydney
        </p>
      </div> */}
      <div className='divider d-block mt-10 mb-2'/>
      <div className="card_footer flex_row justify-between">
        <ProductActions id={id} smallIcons whatsApp={whatsapp} phone={phone} user={user}/>
        <Link href={`/market/event-tickets/${id}`}>Details</Link>
      </div>
    </section>
    <section className="ticket_annex">
    <Client><h3 className="text-uppercase">{cleanHtml(title)}</h3></Client>
    </section>
  </div>
  }

  export default Ticket;