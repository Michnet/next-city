import { getEventDates } from "@/helpers/rest";
import { memo, useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
//import { getBPRecipientThread, getEventDates } from "~/server/WpRest";
import { activeDateState, authState } from "../atoms";

function ListingStaterConst({id, author}) {

  const setActiveDates = useSetRecoilState(activeDateState);
  const {user} = useRecoilValue(authState);
 
  const getDates = async(payload) => {
    const fetchdDates = await getEventDates(payload);
    if(fetchdDates){
     setActiveDates({act_dates: fetchdDates, act_id:id});
    }
  }
  /* 
  
  function processListingThread(usersThread){
    if(usersThread){
      const {messages:listingMessages, id:thread_id} = usersThread;
      const filteredThread = listingMessages?.filter((item) => {
       return parseInt(item.subject.rendered) == id || item.subject.rendered == `Re: ${id}`;
     }); 
         if(filteredThread){
           setConversation(filteredThread);
         }
     }
  }

  const getUserAuthorThreads = async() => {
    const usersThread = await getBPRecipientThread({
      recipient_id: author,
      user_id: user.id,
      _fields:'subject,id,messages,avatar',
      per_page: 100
    }, jwt);
    if(usersThread){
      processListingThread(usersThread)
    }
  } */

useEffect(() => {
 //const {act_id} = activeDates ?? {};
 if(id != 'undefined'){
    setActiveDates({loading: true})
    getDates({event_id: id, f_key : 'event-date', upcoming_instances : 5});
  }
}, [id]);

  return <div className="listingStater"/>
}
const ListingStater = memo(ListingStaterConst)
export default ListingStater