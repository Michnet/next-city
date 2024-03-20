import { activeDateState } from "@/contexts/atoms";
import { getEventDates } from "@/helpers/rest";
import dayjs from "dayjs"
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

const DateViewString = ({date, fromActive = false, format, eventId}) => {
    const [theDate, setTheDate] = useState(null);
    const [loading, setLoading] = useState(true);
    const activeDate = fromActive ? useRecoilValue(activeDateState) : null;
     ;
    const getDates = async(payload, signal) => {
      const fetchdDates = await getEventDates(payload, signal);
      if(fetchdDates?.data?.status == 200){
          setTheDate(fetchdDates.data[0].start);
      }
    }
    useEffect(() => {
        const controller = new AbortController();
        const {signal} = controller;
      setLoading(true);
      if(!date){
        if(fromActive){
          
          const {act_id, act_dates} = activeDate;
          console.log('activeDate', act_dates)
          if(act_dates && act_id == eventId){
            setTheDate(act_dates[0]?.start);
          }
        }else{
          getDates({event_id:eventId, f_key : 'event-date', upcoming_instances : 1}, signal);
        }
      }else{
        setTheDate(date)
      }
      setLoading(false);
      return () => controller.abort();
    }, [eventId]);
  
    // if(loading){return <LoaderEllipsis/>}
    if(dayjs(theDate).isValid()){
      return <span>{dayjs(theDate).format(format ?? 'DD')}</span>
    }
  }

  export default DateViewString;