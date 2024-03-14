import { getEventDates } from "@/helpers/rest";
import dayjs from "dayjs"
import { useEffect, useState } from "react";

const DateViewRelative = ({eventId, customDate=null, customEndDate}) => {
    var isBetween = require('dayjs/plugin/isBetween')
    dayjs.extend(isBetween);
    var relativeTime = require('dayjs/plugin/relativeTime')
    dayjs.extend(relativeTime);
     ;
    
    const [dates, setDates] = useState(null);
    //const [update, setUpdate] = useState(0);
  
    let now = new Date();
    let date, endDate;
    
    const getDates = async(payload, signal) => {
      const fetchdDates = await getEventDates(payload, signal);
      if(fetchdDates){
          setDates(fetchdDates.data)
      }
  }
  
  if(dates?.length > 0){
    date = dates[0].start;
    endDate = dates[0].end
  }else{
    date = customDate;
    endDate = customEndDate;
  }
  
  //let fetchingDates = useMemo(async() => await getDates({event_id:eventId, f_key : 'event-date', upcoming_instances : 1}), [update]);
  
  useEffect(() => {
    const controller = new AbortController();
    const {signal} = controller;
    if(!customDate){
      getDates({event_id:eventId, f_key : 'event-date', upcoming_instances : 1}, signal)
    }else{
      setDates([{start: customDate, end: customEndDate}])
    }
    return () => {
      controller.abort()
    }
  }, []);
  
  
    const targetDate = new Date(date);
    const targetEndDate = new Date(endDate);
  
    let unit = 'month', final, label, color = '#3554d1', prefix;
  
    if(dates?.length > 0){
      if(dayjs(targetEndDate).isBefore(now, 'minute')){
        return <div className="event_date">
                    {dates?.length > 0 && <p className="text-13 lh-14  text-truncate">
                      <span className="mr-5 lh-1"><i className="las la-stopwatch"></i></span>
                        Ended {dayjs(targetEndDate).fromNow()}
                    </p>}
                  </div>;
      }else{
        if(dayjs(new Date()).isBetween(dayjs(targetDate), dayjs(targetEndDate), 'minute')){
          return <div className="event_date">
                    <p className="text-13 lh-14  text-truncate" style={{color: color}}>
                      <span className="mr-5 lh-1"><i className="las la-stopwatch"></i></span>
                      Started {dayjs(targetDate).fromNow()}
                    </p>
                  </div>;
      
        }else{
          if(dayjs(targetDate).isAfter(now, 'minute')){
            if(dayjs(targetDate).diff(dayjs(now), 'month') <= 0){
      
              if(dayjs(targetDate).diff(dayjs(now), 'week') <= 0){
          
                if(dayjs(targetDate).diff(dayjs(now), 'day') <= 0){
                  color = '#fd7e14'
          
                  if(dayjs(targetDate).diff(dayjs(now), 'hour') <= 0){
          
                    final = dayjs(targetDate).diff(dayjs(now), 'minute');
                    label =  final > 1 ? 'Minutes' : 'Minute';
          
                  }else{
                    final = dayjs(targetDate).diff(dayjs(now), 'hour');
                    label = final > 1 ? 'Hours' : 'Hour';
                  }
                   
                }else{
                  final = dayjs(targetDate).diff(dayjs(now), 'day');
                  label = final > 1 ? 'Days' : 'Day';
                }
          
              }else{
                final = dayjs(targetDate).diff(dayjs(now), 'week');
                label = final > 1 ? 'Weeks' : 'Week';
              }
          
            }else{
              final = dayjs(targetDate).diff(dayjs(now), 'month');
              label = final > 1 ? 'Months' : 'Month'
            }
          }else{
            return <div className="event_date">
                      {dates?.length > 0 && <p className="text-13 lh-14  text-truncate">
                        <span className="mr-5 lh-1"><i className="las la-stopwatch"></i></span>
                          Ended {dayjs(targetEndDate).toNow()}
                      </p>}
                    </div>;
          }
        }
      }
      
      return <div className="event_date">
               {dates?.length > 0 && <p className="text-13 lh-14  text-truncate">
                  <span className="mr-5 lh-1"><i className="las la-stopwatch"></i></span>
                  {final} {label} left
                </p>}
             </div>
    }else{
      return <></>
    }
   }

export default DateViewRelative;