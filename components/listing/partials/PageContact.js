
//import Widget from "../../../components/Widget";

import Widget from "@/components/UI/partials/Widget";

const PageContact = ({contacts, phone, whatsapp,website}) => {
  //const {web_url, phone_number} = contacts;
  return (
    <Widget title="Contact Info" styleName="gx-card-profile-sm">
        {website &&
          <div className="gx-media gx-align-items-center gx-flex-nowrap gx-pro-contact-list mb-2">
            <div className="row_flex gap-2 lh-1 opacity-50 mb-1 text-13">
              <i className={`far fa-globe`}/>
              <span className="gx-mb-0 gx-text-grey gx-fs-sm">Website</span>
            </div>
            <div className="gx-media-body">
              <p className="gx-mb-0 fw-500">{website}</p>
            </div>
          </div>
        }

        {phone && 
          <div className="gx-media gx-align-items-center gx-flex-nowrap gx-pro-contact-list">
            <div className="row_flex gap-2 lh-1 opacity-50 mb-1 text-13">
              <i className={`far fa-phone`}/>
              <span className="gx-mb-0 gx-text-grey gx-fs-sm">Phone Number</span>
            </div>
            <div className="gx-media-body">
              <p className="gx-mb-0 fw-500">{phone}</p>
            </div>
          </div>
        }
   
    </Widget>
  )
}

export default PageContact;
