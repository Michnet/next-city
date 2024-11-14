import ActivityItem from "./partials/ActivityItem";
import { CommentLoader } from "@/components/skeletons/Skeletons";
import { useEffect, useState } from "react";

function SiteActivityWorker({user, token}) {

    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [isReachingEnd, setIsReachingEnd] = useState(false);
    const [page, setPage] = useState(1);
    const [activities, setActivities] = useState([]);

    const PAGE_SIZE = 10;

    const payload = {
        per_page : PAGE_SIZE,
        page: page
    }

    function runOnIntersect({observedId, func, rootMargin='400px'}){
        console.log('running observer nn');
        if (typeof window !== 'undefined') {
          const inters_el = document.getElementById(`${observedId}`);
          if(inters_el){
            const observer = new IntersectionObserver( 
              ([entry]) => {if (entry.intersectionRatio < 1) {
                func();
              }},
              { threshold: 1, rootMargin: rootMargin}
            );
            if(inters_el){
              observer.observe(inters_el);
            }
          }
        }
    }

    function fromServiceWorker(){
      if (navigator.serviceWorker) {    
        navigator.serviceWorker.addEventListener("message", (event) => {
          // event is a MessageEvent object
          const {swResponse} = event.data;
          const {list} = swResponse ?? {}
          if(list){
            if(list?.length > 0){
              if(list.length < PAGE_SIZE){
                setIsReachingEnd(true);
              }
              setActivities([...activities, ...list]);
            }
          }
        });
      }
    }
  
    function toServiceWorker(){
      if (navigator.serviceWorker) {
        navigator.serviceWorker.ready.then((registration) => {
          registration.active.postMessage({type:'getActivity', payload: payload});
        });
      }
    }

    useEffect(() => {
        function loaderFunc(){
            console.log('crossing now');
            if(!isReachingEnd){setPage(page + 1)}
          }
        runOnIntersect({observedId:'activityLoader', func:loaderFunc});
    }, []);

    
  useEffect(() => {
    fromServiceWorker();
   return () => {
     navigator.serviceWorker.removeEventListener("message", (event) => {
     });
   }
 }, []);

  useEffect(() => {
    toServiceWorker();
 }, [page])
    
    

  return (
    <div className="recent_activity" /* onLoad={() => runOnIntersect({observedId:'activityLoader', func:() => setSize(size + 1)})} */>

        <div className="actz_timeline">
            {activities?.length > 0 && <>
                <div className="notice_drawer no-scrollbar">
                    <div className='mb-15'>
                    {activities.map((activity) => {
                        return <ActivityItem exClass={'shadow-0'} avatarSize={30} key={activity.id} activity={activity} user={user} token={token}/>
                    })}
                    {isLoadingMore && <CommentLoader num={4}/>}
                    </div>
                        <div className="activity-footer flex_row gap-2">                        
                        {!isReachingEnd && <span id='activityLoader' className="btn" onClick={() => setPage(page + 1)}>Show More</span>}
                        <span className="btn" onClick={() => setPage(1)}> Refresh</span>
                        </div>
                    </div>
                </>
            }
        </div>
    </div>
    )
}
export default SiteActivityWorker;