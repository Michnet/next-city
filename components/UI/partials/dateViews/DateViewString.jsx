import { getEventDates } from "@/helpers/rest";
import dayjs from "dayjs"
import { useEffect, useState } from "react";

const DateViewString = ({date, format, eventId}) => {
    const [theDate, setTheDate] = useState(null);
    const [loading, setLoading] = useState(true);
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
        getDates({event_id:eventId, f_key : 'event-date', upcoming_instances : 1}, signal)
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