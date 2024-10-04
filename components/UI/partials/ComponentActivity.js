import {memo, useEffect, useState } from "react";
import useSWRInfinite from "swr/infinite";
import {addGroupMember, removeGroupMember, bpPublicActivitiesUrl, createBPActivity, fetcher } from "@/helpers/rest";
import { clearInputField, typeName} from "@/helpers/universal";
import { useRecoilValue, useRecoilState } from "recoil";
import { authState, userMetaState } from "@/contexts/atoms";
import ActivityItem from "../lists/partials/ActivityItem";
import { LoaderEllipsis } from "@/components/skeletons/Loaders";
import { CommentLoader } from "@/components/skeletons/Skeletons";
import GuestPrompt from "../GuestPrompt";
import CallToActions from "../CallToActions";

const ComponentActivityConst =({scope, scope_slug, scope_id, noLink, setActiveKey, type, interactive=false})=> {
  const [auth, setAuth] = useRecoilState(authState);
  let {user, token} = auth;
  const [sending, setSending] = useState(false);
  const [newItem, setNewItem] = useState(false);
  const [msg, setMsg] = useState(null);
  const [changingMembership, setChangingMembership] = useState(false);
  //const [loading, setLoading] = useState(true);
  //const [user_meta, setUser_meta] = useRecoilState(userMetaState);
  let {user_meta} = user ?? {};
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
  setChangingMembership(true);
   const res = await addGroupMember(scope_id, {user_id: user?.id, JWT: token});
  
   if(res?.role == 'Member'){
      let newGrp = [...groups, scope_id];
      let oldCommunities = user_meta?.communities;
      let newCommunities = {...oldCommunities, groups: newGrp}
      setAuth({...auth, user : {...user, user_meta : { ...user_meta, communities: newCommunities}}})
   }else{
    if(res?.message){
      setMsg(res.message);
    }
   }
   setChangingMembership(false);
}

console.log('scope_id', scope_id)
async function removeMember(){
  setChangingMembership(true);
   const res = await removeGroupMember(scope_id, {user_id: user?.id, JWT: token});
   if(res){
    if(res.removed){
      let newGrp = [...groups];
      const index = newGrp.indexOf(scope_id);
      if (index > -1) {
        newGrp.splice(index, 1); // 2nd parameter means remove one item only
      }else{
      }
      let newCommunities = {...user_meta?.communities, groups: newGrp}
      setAuth({...auth, user : {...user, user_meta : { ...user_meta, communities: newCommunities}}})
    }else{
      if(res?.code == 'bp_rest_group_member_failed_to_remove'){
        setMsg("Action not completed succesfully. It's likely that you had already un-followed this community.");
      }
   }
   }
   setChangingMembership(false);
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
                              <ActivityItem interactive={interactive} noLink={noLink} avatarSize={30} activity={newItem} user={user} token={token}/> : 
                                <></>}</>}
                        {activities.map((activity) => {
                          return <ActivityItem interactive={interactive} noLink={noLink} key={activity?.id} avatarSize={30} activity={activity} user={user} token={token}/>
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
          {groupMem ? <><div className="new_post mb-20 card card-style mx-0 p-3 rounded-0">
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
              </div>
              <div className="d-flex gap-2 mb-20">
              <button disabled={changingMembership} className="btn" variant="primary" onClick={() => removeMember()}>{changingMembership ? 'Requesting ...' : `Un-Follow this ${typeName(type)}`}</button>
              </div>
              </>
              :
              <CallToActions exClass='mb-24' thin descript={`Only followers of this ${typeName(type)} can participate in it's community chat`} light bgClass={'bg-theme'} title={'Not a follower'} 
              actionComponent={
                <div className="d-flex gap-2">
                  <button disabled={changingMembership} className="btn btn-sm" variant="primary" onClick={() => addMember()}>{changingMembership ? 'Requesting ...' : `Follow this ${typeName(type)}`}</button>
                  <button className="btn btn-sm" variant="secondary" onClick={() => setActiveKey('private-chat')}>Private Chat Instead</button>   
                </div>}/> 
              }
            </> : 
            <GuestPrompt title={'Login to participate in this community'}/>
            }
            <div className={`mb-10 bg-highlight bg-listing toast border-0 ${msg ? 'show' : ''}`} role="alert" aria-live="assertive" aria-atomic="true">
              <div className="toast-header justify-between">
                <strong className="mr-auto">Just Now</strong>
                <button type="button" className="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close" onClick={() => setMsg(false)}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="toast-body">
                {msg}
              </div>
            </div>
           {timelineView}
      </div> </>
    );
};

const ComponentActivity = memo(ComponentActivityConst);
export default ComponentActivity;
