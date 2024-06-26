import {memo, useEffect, useState } from "react";
//import WidgetHeader from "../../../components/WidgetHeader/index";
// import ActivityItem from "./ActivityItem";
import useSWRInfinite from "swr/infinite";
//import dynamic from "next/dynamic";
import {addGroupMember, bpPublicActivitiesUrl, createBPActivity, fetcher } from "@/helpers/rest";
import { clearInputField} from "@/helpers/universal";
import { useRecoilValue, useRecoilState } from "recoil";
import { authState, userMetaState } from "@/contexts/atoms";
// import { LoaderEllipsis } from "../../skeletons/React-content-loader/Loaders";
// import { CommentLoader } from "../../skeletons/React-content-loader/Skeletons";
// import GuestPrompt from "~/routes/userAuth/GuestPrompt";
// import CallToActions from "~/components/common/CallToActions";
import ActivityItem from "../lists/partials/ActivityItem";
import { LoaderEllipsis } from "@/components/skeletons/Loaders";
import { CommentLoader } from "@/components/skeletons/Skeletons";
import GuestPrompt from "../GuestPrompt";
import CallToActions from "../CallToActions";

const ComponentActivityConst =({scope, scope_slug, scope_id, noLink, setActiveKey})=> {
  const {user, token} = useRecoilValue(authState);
  const [sending, setSending] = useState(false);
  const [newItem, setNewItem] = useState(false);
  //const [loading, setLoading] = useState(true);
  const [user_meta, setUser_meta] = useRecoilState(userMetaState);
  const {groups} = user_meta?.communities ?? {};
  const groupMem = user && groups?.includes(scope_id);
 
  const payload = {
    scope: scope,
  }

  if(scope_slug){
  payload[`${scope_slug}`] = parseInt(scope_id);
  }

  if(token){
    payload.JWT = token;
  }

  async function createPost(e){
    setSending(true)
    e.preventDefault(); const data = new FormData(e.target);
    let htmlCont = data.get('content');
    const sendingload = {
      primary_item_id : scope_id,
      user_id: user?.id,
      component: scope,
      type: 'activity_update',
      content: htmlCont,
      JWT: token,
      hidden: false
    }
    const sentPost = await createBPActivity(sendingload);
    if(sentPost){
      setNewItem(sentPost);
      clearInputField('content');
    }
    setSending(false);
  }

  const PAGE_SIZE = 5;

    const { data, error, mutate, size, setSize, isValidating } = useSWRInfinite (
        (index) =>`${ bpPublicActivitiesUrl(payload)}&per_page=${PAGE_SIZE}&page=${
            index + 1
          }`,
        fetcher,
        {refreshInterval : 60000}
      );
        const activities = data ? [].concat(...data) : [];
        const isLoadingInitialData = !data && !error;
        const isLoadingMore = isLoadingInitialData || (size > 0 && data && typeof data[size - 1] === "undefined");
        const isEmpty = data?.[0]?.length === 0;
        const isReachingEnd =
            isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE);
        const isRefreshing = isValidating && data && data.length === size;

async function addMember(){
   const res = await addGroupMember(scope_id, {user_id: user?.id, JWT: token});
   if(res?.role == 'Member'){
      let newGrp = [...groups, scope_id];
      let newCommunities = {...user_meta?.communities, groups: newGrp}
      setUser_meta({...user_meta, communities: newCommunities})
   }
}

useEffect(() => {
  if(activities){
    
  }
  return () => {
    setNewItem(false);
  }
}, [scope_id, scope, token, user]);

  let timelineView;

  if(isLoadingInitialData){
    timelineView = <CommentLoader num={5}/>
  }else{
    if(activities?.length > 0){
    timelineView = <>
                  <div className="activity">
                      <div>
                        {sending ? 
                          <></> : 
                            <>{newItem ? 
                              <ActivityItem noLink={noLink} avatarSize={30} activity={newItem} user={user} token={token}/> : 
                                <></>}</>}
                        {activities.map((activity) => {
                          return <ActivityItem noLink={noLink} key={activity?.id} avatarSize={30} activity={activity} user={user} token={token}/>
                        })}
                        {isLoadingMore && <CommentLoader num={4}/>}
                      </div>
                          <div className="activity-footer">                        
                            {isReachingEnd ? <></> : <span className="btn btn-sm" onClick={() => setSize(size + 1)}>Load More</span>}
                            <span className="btn btn-sm" onClick={() => setSize(1)}> Reset</span>
                          </div>
                        </div>
                    </>
    }else{
       timelineView = <></>
    }
  }

    return (
      <>
      <div className="activity_wall gx-entrysec- mt-0">
        {user ? 
        <>
          {groupMem ? <div className="new_post mb-20 card card-style mx-0 p-3 rounded-0">
              <form className='d-flex flex-column' onSubmit={(e) => {createPost(e)}}>{sending ? <LoaderEllipsis/> : <> 
              <textarea style={{height: 100, border: 'none', borderBottom: '1px solid var(--borderTheme)'}} name="content" className="p-3 d-block mb-10 text-13 outline-none w-full resize-none placeholder:text-sm" placeholder="What's on your mind for this community"/></>}  
            {/*  <input type="file" name='media_file' /> */}
            
            <div className="d-flex justify-between flex-row flex-nowrap"> 
            {/* <div className="mar-top clearfix">
              <span className="round share_link share_img"><i className="bi bi-file-image"></i></span>
            </div> */}
            <button type="submit" className="btn btn-theme btn-sm mb-0 text-sm rounded-lg transition-all cursor-pointer hover:bg-blue-600">
              Post <i className="bi bi-send"></i>
              </button>
              </div>  
            </form>
              {/*  <p className="text-sm text-blue-900 ">Enter atleast 15 characters</p> */}
              </div>
              :
              <CallToActions exClass='mb-24' thin descript={"Only followers of this community can see and participate in it's public chat"} light bgClass={'bg-theme'} title={'Not a follower'} 
              actionComponent={
                <>
                  <button className="btn btn-sm" variant="primary" onClick={() => addMember()}>Follow Community</button>
                  <button className="btn btn-sm" variant="secondary" onClick={() => setActiveKey('private-chat')}>Private Chat Instead</button>   
                </>}/> 
              }
            </> : 
            <GuestPrompt title={'Login to participate in this community'}/>
            }
        
           {timelineView}
      </div> </>
    );
};

const ComponentActivity = memo(ComponentActivityConst);
export default ComponentActivity;
