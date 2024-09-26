import {memo, useEffect, useState } from "react";
import useSWRInfinite from "swr/infinite";
import { useRecoilValue, useRecoilState } from "recoil";
import ActivityItem from "@/components/UI/lists/partials/ActivityItem";
import { bpPublicActivitiesUrl,addGroupMember, createBPActivity, fetcher } from "@/helpers/rest";
import {clearInputField } from "@/helpers/universal";
import { authState, userMetaState } from "@/contexts/atoms";
import { LoaderEllipsis } from "@/components/skeletons/Loaders";
import { CommentLoader } from "@/components/skeletons/Skeletons";
import GuestPrompt from "@/components/UI/GuestPrompt";
import CallToActions from "@/components/UI/CallToActions";

const ListingCommunityConst =({scope, scope_slug, scope_id, noLink, setActiveKey})=> {
  const {user, token} = useRecoilValue(authState);
  const [sending, setSending] = useState(false);
  const [newItem, setNewItem] = useState(false);
  const [user_meta, setUser_meta] = useRecoilState(userMetaState);
  const {groups} = user_meta?.communities ?? {};
  const groupMem = user && groups?.includes(scope_id);
 
  const payload = {
    scope: scope,
  }

  if(scope_slug){
  payload[`${scope_slug}`] = parseInt(scope_id);
  }

  /* if(token){
    payload.JWT = token;
  } */

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
  console.log('payload', payload);

    const { data, error, mutate, size, setSize, isValidating } = useSWRInfinite (
        (index) =>`${ bpPublicActivitiesUrl(payload)}&per_page=${PAGE_SIZE}&page=${
            index + 1
          }`,
        fetcher,
        {refreshInterval : 60000}
      );
        const activities = data ? [].concat(...data) : [];
        const isLoadingInitialData = !data && !error;
        const isLoadingMore =
            isLoadingInitialData ||
            (size > 0 && data && typeof data[size - 1] === "undefined");
        const isEmpty = data?.[0]?.length === 0;
        const isReachingEnd =
            isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE);
        const isRefreshing = isValidating && data && data.length === size;

async function addMember(){
   const res = await addGroupMember(scope_id, {user_id: user.id, JWT: token});
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
                          return <ActivityItem noLink={noLink} key={activity.id} avatarSize={30} activity={activity} user={user} token={token}/>
                        })}
                        {isLoadingMore && <CommentLoader num={4}/>}
                      </div>
                          <div className="activity-footer">                        
                            {isReachingEnd ? <></> : <span className="gx-link gx-btn-link" onClick={() => setSize(size + 1)}>Load More</span>}
                            <span className="gx-link gx-btn-link" onClick={() => setSize(1)}> Reset</span>
                          </div>
                        </div>
                    </>
    }else{

    }
  }

    return (
      <>
      <div className="activity_wall gx-entrysec- mt-0">
        {user ? 
        <>
          {groupMem ? <div className="new_post mb-20">
              <form onSubmit={(e) => {createPost(e)}}>{sending ? <LoaderEllipsis/> : <> <textarea style={{height: 100}} name="content" className="rounded p-3 mb-10 text-13 outline-none w-full resize-none border rounded-lg placeholder:text-sm" placeholder="What's on your mind for this community">
              </textarea></>}  
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
              <CallToActions exClass='mb-24' thin descript={"Only followers of this community can see and participate in it's public chat"} light bgClass={'bg-white'} title={'Not a follower'} 
              actionComponent={
                <div className='d-flex gap-2'>
                  <button className="btn" variant="primary" onClick={() => addMember()}>Follow Community</button>
                  <button className="btn" variant="secondary" onClick={() => setActiveKey('private-chat')}>Private Chat Instead</button>   
                </div>}/> 
              }
            </> : 
            <GuestPrompt title={'Login to participate in this community'}/>
            }
           {timelineView}
      </div> </>
    );
};

const ListingCommunity = memo(ListingCommunityConst);
export default ListingCommunity;
