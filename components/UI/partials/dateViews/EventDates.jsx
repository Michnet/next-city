import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { activeDateState } from '@/contexts/atoms';
import { getEventDates } from '@/helpers/rest';
import EventTimeline from '../../lists/timelines/EventTimeline';
import { DualColorHeader } from '../../Partials';
import { LoaderDualRingBoxed } from '@/components/skeletons/Loaders';

function EventDates({Id, dualColumn, upcoming, customDates=null, user, productId, slots, cost, exClass, title, fallBack}) {
  const [dates, setDates] = useState(customDates ? [customDates] : []);
  const [loading, setLoading] = useState(true);



  const getDates = async(payload) => {
        const fetchdDates = await getEventDates(payload);
        if(fetchdDates){
          console.log('dates', fetchdDates);
            setDates(fetchdDates);
            setLoading(false)
        }
  }

 

  useEffect(() => {
    if(!customDates){
      if(Id && Id != 'undefined'){
        const queryObj = {event_id:Id, f_key : 'event-date', upcoming_instances : upcoming ?? 1 }
      getDates({...queryObj});
      }else{
        setLoading(false);
      }
    }else{
      setLoading(false);
    }
  }, [Id]);
  
  return (
  <>{loading ? 
  <div style={{height: upcoming == 1 ? '80px' : '300px'}}><LoaderDualRingBoxed/></div> : 
  <div>
    {dates?.length > 0 ?
    <div className={`gx-timeline-section gx-timeline-center ${exClass ?? ''}`}> 
    <>
    {title ? <DualColorHeader exClass={'sm-font mb-10'} title={title}/> :  <></>}
    <EventTimeline cost={cost ?? null} user={user} slots={slots ?? null} productId={productId} dates={dates} dualColumn={dualColumn}/>
    </> 
    </div> : <>{fallBack ?? <></>}</>}
    </div>
    }
    </>
  )
}

export default EventDates


export function EventDatesActive({Id, dualColumn, upcoming, customDates=null, user, productId, slots, cost, exClass, title, fallBack}) {
  const [dates, setDates] = useState(null);
  const [loading, setLoading] = useState(true);
  const activeDate = useRecoilValue(activeDateState);
  
useEffect(() => {
  setLoading(true);

  if(activeDate){
    const {act_id, act_dates} = activeDate;
    if(act_id == Id && act_dates?.length > 0){
      setDates(act_dates);
    }
  }

setLoading(false);
return () => {
  setDates(null);
  setLoading(true);
}
}, [Id, activeDate]);

  return (
  <>{loading ? 
  <div style={{height: upcoming == 1 ? '80px' : '300px'}}><LoaderDualRingBoxed/></div> : 
  <div>
    {dates?.length > 0 ?
    <div className={`gx-timeline-section gx-timeline-center ${exClass ?? ''}`}> 
    <>
    {title ? <DualColorHeader exClass={'sm-font mb-10'} title={title}/> :  <></>}
    <EventTimeline cost={cost ?? null} user={user} slots={slots ?? null} productId={productId} dates={upcoming == 1 ? [dates[0]] : dates} dualColumn={dualColumn}/>
    </> 
    </div> : <>{fallBack ?? <></>}</>}
    </div>
    }
    </>
  )
}
