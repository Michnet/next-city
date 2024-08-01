import { activeDateState } from "@/contexts/atoms";
import { getEventDates } from "@/helpers/rest";
import { createOccurenceState } from "@/helpers/universal";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

const DateViewState = ({eventId, exClass, fromActive, customDate=null, customEndDate=null}) => {
    let date = null, endDate = null;
     ;
    const [dates, setDates] = useState([]);
    const activeDate = fromActive ? useRecoilValue(activeDateState) : null;
   
    if(dates && dates?.length > 0){
      date = dates[0]?.start;
      endDate = dates[0]?.end
    }else{
      if(customDate){
      date = customDate;
      endDate = customEndDate;
      }
    }
    
    let targetDate = new Date(date);
    let targetEndDate = date ? new Date(endDate) : null;
  
    const getDates = async(payload, signal) => {
      const fetchdDates = await getEventDates(payload, signal);
      if(fetchdDates){
          setDates(fetchdDates.data)
      }
  }
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


    /* if(!customDate){
      getDates({event_id:eventId, f_key : 'event-date', upcoming_instances : 1}, signal);
    }else{
      setDates([{start:customDate, end:customEndDate}])
    } */
   /*  const interval = setInterval(() => {
      setUpdate(update + 1);
    }, 60000);*/
    return () => controller.abort();
  }, [customDate, eventId, activeDate]);
  
  let localState = createOccurenceState(targetDate, targetEndDate);
 
    
   return <>
          {date !== null ? <>{
            <span className={`event_state state_class ${localState.stateClass} ${exClass ?? ''}`}>
              <span className='state_text'>{localState.stateText}</span>
            </span>}</> :
          <></>
          }
          </>
  }

  export default DateViewState;