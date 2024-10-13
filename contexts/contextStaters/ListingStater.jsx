"use client";

import { getEventDates } from "@/helpers/rest";
import { memo, useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
//import { getBPRecipientThread, getEventDates } from "~/server/WpRest";
import { activeDateState, authState, activeReviewsState } from "../atoms";



function ListingStaterConst({id, author, type}) {

  const setActiveDates = useSetRecoilState(activeDateState);
  const setActiveReviews = useSetRecoilState(activeReviewsState);
  const {user} = useRecoilValue(authState);

 
  const getDates = async(payload, signal, controller) => {
    const fetchdDates = await getEventDates(payload, signal);
    if(fetchdDates){
     setActiveDates({act_dates: fetchdDates, act_id:id});
     controller.abort();
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

  function setUpMessaging(){
    if (navigator.serviceWorker) {    
      navigator.serviceWorker.addEventListener("message", (event) => {
        // event is a MessageEvent object
        const {type, listingId, swResponse} = event.data;
        const {eventDates, reviews} = swResponse ?? {}
        if(eventDates){
          setActiveDates({act_dates: eventDates, act_id:id});
        }
        if(reviews){
          const {success, data} = reviews
          if(success){
            setActiveReviews({act_reviews: data, act_id:id})
          }
        }else{
        }
      });
    }
  }

  function toServiceWorker(){
    if (navigator.serviceWorker) {
      navigator.serviceWorker.ready.then((registration) => {
        let subTypesArr = ['reviews'];
        if(type == 'event' || type == 'special-sale'){
          subTypesArr.push('dates');
        }
        registration.active.postMessage({type:'listingState', listingId:id, subTypes:[...subTypesArr]});
      });
    }
  }

  useEffect(() => {
     setUpMessaging();
  
    return () => {
      navigator.serviceWorker.removeEventListener("message", (event) => {
      });
    }
  }, [])
  

useEffect(() => {
 //const controller = new AbortController();
 //const {signal} = controller;

 if(id != 'undefined'){
    setActiveDates({loading: true});
    toServiceWorker();
    //getDates({event_id: id, f_key : 'event-date', upcoming_instances : 5}, signal, controller);
  }
  return () => setActiveDates({});
}, [id]);

  return <div className="listingStater"/>
}

const ListingStater = memo(ListingStaterConst)
export default ListingStater