import React, { useState } from "react";
// import SlotBooking from "~/appComponents/components/timeline/SlotBooking";
//import TimeLineItem from "../../../appComponents/components/timeline/TimeLineItem";
//import ContainerHeader from "../../../appComponents/components/ContainerHeader";
//  import TimeLineItem from "~/appComponents/components/timeline/TimelineItem";
//import { BSReveal } from "~/appComponents/components/UI/components";
import SlotBooking from "./partials/SlotBooking";
import TimeLineItem from "./partials/TimelineItem";

const EventTimeline = ({dates, dualColumn, productId, slots, user, cost}) => {
  const {id:userId} = user ?? {};

  const baseSlotObj = {
    cost : cost, 
    userId:userId,
    slots:slots,
    productId:productId
  }
  const [slotObj, setSlotObj] = useState(baseSlotObj);
  

  return (
    <>
        {dates.map((el, i) => {
          if(i%2 != 0 && dualColumn){
             return <TimeLineItem slotObj={slotObj} setSlotObj={setSlotObj} cost={cost ??  null} user={user} slots={slots} productId={productId} flipped key={i} styleName={`gx-timeline-inverted`} timeLine={el}
                              color="purple"><i className="icon icon-map-google gx-p-2"/>
                  </TimeLineItem>
          }
          return <TimeLineItem slotObj={slotObj} setSlotObj={setSlotObj} cost={cost ??  null} user={user} slots={slots} productId={productId} timeLine={el} key={i} color="pink">
            <i className="icon icon-map-google gx-p-2"/>
                </TimeLineItem>
        })
      }
      {productId ? <><div id="avail_modal" className="menu menu-box-bottom" >
              <div className="menu-title">
                <a href="#" className="close-menu">
                  <i className="fa fa-times"></i>
                </a>
              </div>
              <div className="content">
               <SlotBooking slotObj={slotObj}/>  
              </div>
          </div></> : <></>}
    </>
  )
};

export default EventTimeline;

