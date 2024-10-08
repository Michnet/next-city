import { useRecoilValue } from "recoil";
import { activityState } from "@/contexts/ActivityContext";
import ActivityItem from "./partials/ActivityItem";
import { CommentLoader } from "@/components/skeletons/Skeletons";
import { useEffect } from "react";

function SiteActivity({user, token}) {
    const {activities, setSize, size, isLoadingInitialData, isLoadingMore,isReachingEnd} = useRecoilValue(activityState);

    function runOnIntersect({observedId, func, rootMargin='300px'}){
        console.log('running observer');
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

    useEffect(() => {
        function loaderFunc(){
            console.log('crossing now');
            if(!isReachingEnd){setSize(size + 1)}}
        runOnIntersect({observedId:'activityLoader', func:loaderFunc});
    }, [])
    
    

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
                        <span id='activityLoader' className="btn" /* onClick={() => setSize(size + 1)} */>End of List</span>
                        <span className="btn" onClick={() => setSize(1)}> Refresh</span>
                        </div>
                    </div>
                </>
            }
        </div>
    </div>
    )
}
export default SiteActivity;