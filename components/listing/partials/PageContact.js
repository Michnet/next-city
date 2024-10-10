
//import Widget from "../../../components/Widget";

import Widget from "@/components/UI/partials/Widget";

const PageContact = ({contacts, phone, whatsapp,website}) => {
  //const {web_url, phone_number} = contacts;
  return (
    <Widget title="Contact Info" exClass="gx-card-profile-sm m-0">
        {website &&
          <div className="gx-media gx-align-items-center gx-flex-nowrap gx-pro-contact-list mb-3">
            <div className="row_flex gap-2 lh-1 opacity-50 mb-1 text-13">
              <i className={`far fa-globe`}/>
              <span className="gx-mb-0 gx-text-grey gx-fs-sm">Website</span>
            </div>
            <div className="gx-media-body row_flex gap-2 justify-between">
              <a href={`${website}`} target='_blank' className="gx-mb-0 truncate fw-500 lh-1 color-theme">{website}</a>
              <i className='far fa-chevron-right opacity-40'/>
            </div>
          </div>
        }
        {phone && 
          <div className="gx-media gx-align-items-center gx-flex-nowrap gx-pro-contact-list mb-3">
            <div className="row_flex gap-2 lh-1 opacity-50 mb-1 text-13">
              <i className={`far fa-phone`}/>
              <span className="gx-mb-0 gx-text-grey gx-fs-sm">Phone Number</span>
            </div>
            <div className="gx-media-body row_flex gap-2 justify-between">
              <a href={`tel:${phone}`} className="gx-mb-0 fw-500 color-theme">{phone}</a>
              <i className='far fa-chevron-right opacity-40'/>
            </div>
          </div>
        }
        {whatsapp && 
          <div className="gx-media gx-align-items-center gx-flex-nowrap gx-pro-contact-list mb-3">
            <div className="row_flex gap-2 lh-1 opacity-50 mb-1 text-13">
              <i className={`fab fa-whatsapp`}/>
              <span className="gx-mb-0 gx-text-grey gx-fs-sm">WhatsApp</span>
            </div>
            <div className="gx-media-body row_flex gap-2 justify-between">
              <a href={`https://wa.me/${whatsapp}`} className="gx-mb-0 fw-500 color-theme">{whatsapp}</a>
              <i className='far fa-chevron-right opacity-40'/>
            </div>
          </div>
        }
   
    </Widget>
  )
}

export default PageContact;
