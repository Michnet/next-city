import { activeDateState } from "@/contexts/atoms";
import { countdown_renderer , generateTempArray} from "@/helpers/universal";
import { useEffect, useState } from "react";
import Countdown from "react-countdown"
import { useRecoilValue } from "recoil";
import { getEventDates } from "@/helpers/rest";
import SkeletonCube from "../skeletons/SkeletonCube";
import dayjs from "dayjs"

const CountDownUI = ({fromActive, date = null, eventId, light, exClass=''}) => {
    const [loading, setLoading] = useState(true);
    const [theDate, setTheDate] = useState(null);
    const [theEndDate, setTheEndDate] = useState(null);
    const activeDate = fromActive ? useRecoilValue(activeDateState) : null;


  const getDates = async(payload, signal) => {
    const fetchdDates = await getEventDates(payload, signal);
    if(fetchdDates?.length > 0){
        setTheDate(fetchdDates[0]?.start);
    }
  }

  
useEffect(() => {
  setLoading(true);
  const controller = new AbortController();
  const {signal} = controller;

  if(!date){
    if(fromActive){
      const {act_id, act_dates} = activeDate;
      if(act_dates && act_id == eventId){
        setTheDate(act_dates[0]?.start);
        setTheEndDate(act_dates[0]?.end);
      }
    }else{
      getDates({event_id:eventId, f_key : 'event-date', upcoming_instances : 1}, signal);
    }
  }else{
      setTheDate(date)
  }
setLoading(false);
return () => {
  setTheDate(null);
  setLoading(true);
  controller.abort();
}
}, [date, eventId, activeDate]);
let now = new Date();

  if(theDate){
    if(dayjs(theEndDate).isBefore(now, 'minute')){
      return <div className={`event_date ${exClass}`}>
      <p className="text-13">
        <span className="mr-5 lh-1"><i className="las la-stopwatch"></i></span>
          Ended {dayjs(theEndDate).fromNow()}
      </p>
    </div>;
    }else{
      return <div className={`${exClass}`}><Countdown renderer={countdown_renderer} autoStart date={theDate}/></div>
    }
  }else{
    if(loading){
      return <div className={`flex_horizontal loader_skeleton gap-2 w-fit ${exClass}`}>{generateTempArray(4).map((item, i) => (
        <SkeletonCube width={50} height={50} key={i}/>
    ))}</div>
    }else{
      return <></>
    }
  }
}
export default CountDownUI