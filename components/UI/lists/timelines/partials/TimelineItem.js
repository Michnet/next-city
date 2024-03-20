import { AddToCalendarButton} from "add-to-calendar-button-react";
import { useRecoilValue } from "recoil";
import { UISizes } from "@/contexts/atoms";
import DateView from "@/components/UI/partials/dateViews/DateView";
import DateViewRelative from "@/components/UI/partials/dateViews/DateViewRelative";
import DateViewString from "@/components/UI/partials/dateViews/DateViewString";

const TimeLineItem = ({slotObj, setSlotObj, styleName, productId, timeLine, children, flipped}) => {
  const {start, gcal_link, end, is_over, time_zone, url, title, location, desc} = timeLine;
  const {isMobile} = useRecoilValue(UISizes);
  return (
    <>
    <div
      className={`timeline_card _horizontal ${flipped ? '_flipped' : ''}`}
      data-aos="fade"
      data-aos-delay={60}
    >
    <div className={`gx-timeline-item gx-timeline-time-item ${styleName ?? ''}`}>
      <div className={`gx-timeline-badge gray_bg`}>{children}</div>
      <div className="gx-timeline-panel">
        <div className= 'box_content d-grid' style={{gridTemplateColumns : '70px auto'}}>
          <div className="item_left"><DateView customDate={start}/></div>
          <div className="item_right p-2">
            <div className="mb-10"><h4 className={`gx-timeline-tile text-15`}> <DateViewString date={start} format={'hh:mm A'}/></h4>
            <DateViewRelative customDate={start} customEndDate={end}/></div>
            <div className="d-flex gap-1">
            <AddToCalendarButton
                  styleLight="--btn-background: #2f4377; --btn-text: #fff; --font: Georgia, 'Times New Roman', Times, serif;"
                  name={title}
                  startDate={start}
                  location = {location}
                  description={`${desc} ${url}`}
                  options= {['Apple','Google','Yahoo','iCal']}
                  //options="Google"
                  timeZone={time_zone}
                  buttonStyle={'3d'}
                  listStyle="modal"
                  label = 'Add to Calendar'
                  lightMode="bodyScheme"
                ></AddToCalendarButton>
              {/* <div><Link href={gcal_link}><button  className="btn btn-sm mb-0 py-1 lh-1 gx-rounded-xxl btn-outline-secondary  text-10 fw-600">
                <i className="text-14 lar la-calendar-plus"/>To Calendar</button></Link>
              </div> */}
              {productId ? 
              <div>
                <button onClick={() => setSlotObj({...slotObj, endDate:end, startDate:start})} className="btn btn-sm btn-secondary mb-0"  data-menu="avail_modal">Check Availability</button>
              </div> : <></>}
              </div>
          </div>
        </div>

      </div>
    </div>
    </div>
    
    </>
  )
};
export default TimeLineItem;
