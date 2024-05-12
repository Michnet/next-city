
import dayjs from "dayjs";
import Widget from "@/components/UI/partials/Widget";
import CommunityStats from "./CommunityStats";
var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime);

const AboutItem = ({data}) => {
  const {title, icon, desc,  subDesc, userList} = data;
  return (
    <>
      <div className="about_item d-flex gx-media gx-flex-nowrap  mb-2">
        <div className="gx-mr-3 mr-10">
          {icon}
        </div>
        <div className="gx-media-body">
          <h6 className="abt_title">{title}</h6>
          {userList === '' ? null : userList}
          {desc === '' ? null : <p className="gx-mb-0 abt_content">{desc}</p>}
          {subDesc ? <p className="abt_sub">{subDesc}</p> : null}
        </div>
      </div>
    </>
  );
};

const About = ({listing, communitySize, exClass='m-0', bodyClass='m-3'}) => {

  
  let startYearView, locationView, addressView, phoneView;
  
  if(listing){
  const {about_us, locations, address, phone} = listing;
  if(about_us){
    const {opening_date} = about_us;
    if(opening_date){
      startYearView = <AboutItem 
      data={{
        title: 'Started',
        icon: <i className="las la-birthday-cake"></i>,
        userList: '',
        desc: `${dayjs(opening_date)}`,
        subDesc : `${dayjs(opening_date).fromNow()}`
      }}/>
    }
  }
  if(locations?.length > 0){
      const loc = locations[0];
      if(loc){
        locationView = <AboutItem 
        data={{
          title: 'Location',
          icon: <i className="las la-map-marker-alt"></i>,
          userList: '',
          desc: `${loc.name}`
        }}/>
      }
  }
  if(address){
    addressView = <AboutItem 
        data={{
          title: 'Street Address',
          icon: <i className="las la-directions"></i>,
          userList: '',
          desc: `${address}`
        }}/>
  }
  if(phone){
    phoneView = <AboutItem 
        data={{
          title: 'Phone Number',
          icon: <i className="las la-phone"></i>,
          userList: '',
          desc: `${phone}`
        }}/>
  }
  }



    return (
      <Widget exClass={exClass} noPadding headless styleName="gx-card-tabs gx-card-profile _about">
        <CommunityStats listing={listing} likes comments views communitySize={communitySize ?? null}/>
        
        <div className={`about_body ${bodyClass}`}>   
                {startYearView}
                {locationView}
                {addressView}
                {phoneView}
        </div>

        <div className="about_footer">
        </div>
          
      </Widget>
    );
}


export default About;
