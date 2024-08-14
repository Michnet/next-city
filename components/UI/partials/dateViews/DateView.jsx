import { getEventDates } from "@/helpers/rest";
import { createOccurenceClass } from "@/helpers/universal";
import dayjs from "dayjs"
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { activeDateState } from "@/contexts/atoms";

const DateView = ({eventId, fromActive=false, format, stringy, exClass='', customDate=null, customEndDate=null, styleObj={}}) => {
    let date = null, endDate = null;
     ;
    const [dates, setDates] = useState([]);
    const activeDate = fromActive ? useRecoilValue(activeDateState) : null;
   // const [update, setUpdate] = useState(0);
   
    if(dates?.length > 0){
      date = dates[0].start;
      endDate = dates[0].end;
    }else{
      date = customDate;
      endDate = customEndDate ?? null;
    }
  
    let targetDate = new Date(date);
    let targetEndDate = date ? new Date(endDate) : null;
  
    const getDates = async(payload, signal) => {
      const fetchdDates = await getEventDates(payload, signal);
      if(fetchdDates){
          setDates(fetchdDates.data)
          //return fetchdDates.data;
      }
  }
  //let fetchingDates = useMemo(async() => await getDates({event_id:eventId, f_key : 'event-date', upcoming_instances : 1}), [update]);
  

  useEffect(() => {
    const controller = new AbortController();
    const {signal} = controller;
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
    return () => controller.abort();
  }, [customDate, eventId, activeDate]);
  
  let localClass = createOccurenceClass(targetDate, targetEndDate);
  
    
   return <>
          {date !== null ? <>{stringy ? <span style={{...styleObj}} className={`${localClass} ${exClass ?? ''}`}>{dayjs(date).format(format ?? 'DD MMM YYYY')}</span> : <div className={`event_date h-100 ${localClass} ${exClass ?? ''}`}>
            <h5 className='d-flex justify-content-center h-100 flex-column text-center lh-1' style={{fontSize: '30px', ...styleObj}}>
              {dayjs(date).format(format ?? 'DD')}
              <span className='_month fw-300 text-uppercase' style={{fontSize: '15px', letterSpacing: '0.1em', ...styleObj}}>{dayjs(date).format('MMM')}</span>
            </h5>
          </div>}</> :
          <></>
          }
          </>
  }

export default DateView;