import { useRecoilValue } from "recoil";
import { activityState } from "@/contexts/ActivityContext";
import ActivityItem from "./partials/ActivityItem";
import { CommentLoader } from "@/components/skeletons/Skeletons";

function SiteActivity({user, token}) {
    const {activities, setSize, size, isLoadingInitialData, isLoadingMore} = useRecoilValue(activityState);
    

  return (
    <div className="recent_activity">

        <div className="actz_timeline">
            {activities?.length > 0 && <>
                <div className="notice_drawer no-scrollbar">
                    <div classname='mb-15'>
                    {activities.map((activity) => {
                        return <ActivityItem exClass={'shadow-0'} avatarSize={30} key={activity.id} activity={activity} user={user} token={token}/>
                    })}
                    {isLoadingMore && <CommentLoader num={4}/>}
                    </div>
                        <div className="activity-footer flex_row gap-2">                        
                        <span className="btn" onClick={() => setSize(size + 1)}>Load More</span>
                        <span className="btn" onClick={() => setSize(1)}> Reset</span>
                        </div>
                    </div>
                </>
            }
        </div>
    </div>
    )
}
export default SiteActivity;