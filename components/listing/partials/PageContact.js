
//import Widget from "../../../components/Widget";

import Widget from "@/components/UI/partials/Widget";

const PageContact = ({contacts}) => {
  const {web_url, phone_number} = contacts;
  return (
    <Widget title="Contact" styleName="gx-card-profile-sm">
        {web_url &&
          <div className="gx-media gx-align-items-center gx-flex-nowrap gx-pro-contact-list">
            <div className="gx-mr-3">
              <i className={`icon icon-link gx-fs-xxl gx-text-grey`}/>
            </div>
            <div className="gx-media-body">
              <span className="gx-mb-0 gx-text-grey gx-fs-sm">Website</span>
              <p className="gx-mb-0">{web_url}</p>
            </div>
          </div>
        }

        {phone_number && 
          <div className="gx-media gx-align-items-center gx-flex-nowrap gx-pro-contact-list">
            <div className="gx-mr-3">
              <i className={`icon icon-phone gx-fs-xxl gx-text-grey`}/>
            </div>
            <div className="gx-media-body">
              <span className="gx-mb-0 gx-text-grey gx-fs-sm">Phone Number</span>
              <p className="gx-mb-0">{phone_number}</p>
            </div>
          </div>
        }
   
    </Widget>
  )
}

export default PageContact;
