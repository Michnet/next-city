import { getEventDates } from "@/helpers/rest";
import dayjs from "dayjs"
import { useEffect, useState } from "react";
import { activeDateState } from "@/contexts/atoms";
import { useRecoilValue } from "recoil";
import SkeletonCube from "@/components/skeletons/SkeletonCube";
import { createOccurenceClass } from "@/helpers/universal";

const DateViewDescriptive = ({eventId, hideIfEnded=false, fromActive, customDate=null, customEndDate, exClass, icon}) => {
    var isBetween = require('dayjs/plugin/isBetween');
    dayjs.extend(isBetween);
    var relativeTime = require('dayjs/plugin/relativeTime')
    dayjs.extend(relativeTime);
  
    const [dates, setDates] = useState(null);
    const [loading, setLoading] = useState(true);
    const activeDate = fromActive ? useRecoilValue(activeDateState) : null;
  
    const now = new Date();
    let date, endDate;
    
    const getDates = async(payload) => {
      const fetchdDates = await getEventDates(payload);
      if(fetchdDates){
          setDates(fetchdDates.data)
      }
  }
  
  if(dates && dates?.length > 0){
    date = dates[0]?.start;
    endDate = dates[0]?.end
  }else{
    if(customDate){
    date = customDate;
    endDate = customEndDate;
    }
  }
  
  useEffect(() => {
      setLoading(true);
      if(!customDate){
        if(fromActive){
          const {act_id, act_dates} = activeDate;
          if(act_id == eventId && act_dates?.length > 0){
            setDates(act_dates);
          }
        }else{
          getDates({event_id:eventId, f_key : 'event-date', upcoming_instances : 1});
        }
      }else{{
          setDates([{start: customDate, end: customEndDate}])
        }
      }
    setLoading(false);
    return () => {
      setDates(null);
      setLoading(true);
    }
  }, [customDate, eventId, activeDate]);
  
  
    const targetDate = new Date(date);
    const targetEndDate = new Date(endDate);
  
    let unit = 'month', final, label, color = '#3554d1', prefix = '', iClass ="las la-stopwatch";
    let localClass = createOccurenceClass(targetDate, targetEndDate);
  
    if(loading){
      return <div className="loader_skeleton"><SkeletonCube width={200} exClass={'mb-10'} height={25}/></div> 
    }else{
      if(dates?.length > 0){
        if(dayjs(new Date()).isBetween(dayjs(targetDate), dayjs(targetEndDate), 'minute')){
          return <div className="event_date">
                    <p className="text-13 lh-14  text-truncate" style={{color: color}}>
                      <span className="mr-5 lh-1"><i className="las la-stopwatch"></i></span>
                        Started {dayjs(targetEndDate).toNow()}
                    </p>
                  </div>;
      }else{
        if(dayjs(targetDate).isAfter(now, 'minute')){
          if(dayjs(targetDate).diff(dayjs(now), 'month') <= 0){
            color = '#137333';
            if(dayjs(targetDate).diff(dayjs(now), 'week') <= 0){
               prefix = 'this';
               label = dayjs(date).format('DD');
        
              if(dayjs(targetDate).diff(dayjs(now), 'day') <= 0){
                color = '#fd7e14'
                label = 'today';
                prefix = 'Starting in';
        
                if(dayjs(targetDate).diff(dayjs(now), 'hour') <= 0){
                  prefix = 'Starting in'
                  final = dayjs(targetDate).diff(dayjs(now), 'minute');
                  label = label = final > 1 ? 'minutes' : 'minute';
        
                }else{
                  prefix = 'Starting in'
                  final = dayjs(targetDate).diff(dayjs(now), 'hour');
                  label = final > 1 ? 'hours' : 'hour';
                }
                 
              }else{
                prefix = 'This';
                final = dayjs(date).format('dddd');
                label = '';
              }
        
            }else{
              final = dayjs(targetDate).diff(dayjs(now), 'week');
              label = final > 1 ? 'Weeks' : 'Week';
              prefix='In about'
            }
        
          }else{
            prefix = 'In about'
            final = dayjs(targetDate).diff(dayjs(now), 'month');
            label = final > 1 ? 'months' : 'month'
          }
        }else{
          if(hideIfEnded){
            return <></>
          }else{
            color = '#a50e0e';
            prefix = 'Ended';
            final = dayjs(targetEndDate).fromNow();
            label = null
          }
         /*  return <div className="event_date">
                    {dates?.length > 0 && <p className="text-truncate">
                      <span className="mr-5 lh-1"><i className="las la-stopwatch"></i></span>
                        Ended {dayjs(targetEndDate).fromNow()}
                    </p>}
                  </div>; */
        }
      }
    
      return <><div className={`event_date descript ${exClass ?? ''}`}>
                <div className="event_date">
                    <p className="text-13 lh-14  text-truncate" style={{color: color}}>
                      <span className="mr-5 lh-1"><i className={iClass}/></span>
                       {prefix} {final} {label}
                    </p>
                  </div>
             </div></>
    }else{
      return <></>
    }
    }
  }

export default DateViewDescriptive;