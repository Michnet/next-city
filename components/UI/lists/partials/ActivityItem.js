import dayjs from "dayjs";
import Link from "next/link";
//import LazyLoad from "react-lazyload";
import { memo, Suspense, useEffect, useState } from "react";
import {openOffCanvas} from "@/helpers/appjs";
import { Avatar } from "../../Partials";
import { clearInputField, deleteBPActivity, localiseDate, getBPActivityComments, likeBPActivity, sendBPActivityComment, updateBPActivity } from "@/helpers/universal";
import GuestPrompt from "../../GuestPrompt";
import { LoaderDualRingBoxed, LoaderEllipsis } from "@/components/skeletons/Loaders";
import { Client } from "react-hydration-provider";
import { hashtag } from './../../../../helpers/universal';
var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)


    const ActivityItemConst = ({activity, user, token, avatarSize, noLink, exClass=""}) => {
      

      const [compActivity, setCompActivity] = useState(activity ?? null);
      const [loaded, setLoaded] = useState(false);
      const [commenting, setCommenting] = useState(false);
      const [sending, setSending] = useState(false);
      const [editing, setEditing] = useState(false);
      const [comments, setComments] = useState(null);
      const [showPrompt, setShowPrompt] = useState(false);
      const {id, type, activity_meta} = compActivity ?? {};
      const {category, listing} = activity_meta ?? {};

      const {title, feature_media, content, name,  user_id, content_stripped, favorite_count, can_comment, can_delete, favorited, can_edit, can_favorite, user_avatar, comment_count, date, activity_data} = compActivity ?? {};

      const [liked, setLiked] = useState(favorited ?? false);


      let itemView, imagesView, activity_content, post_image, head_extras;

      async function sendReply(e){
        e.preventDefault(); const data = new FormData(e.target);
        setSending(true);
        let htmlCont = data.get('com_content');
        const sendingload = {
          id : id,
          content: htmlCont,
        }
        const sentPost = await sendBPActivityComment(id, token, sendingload);
        if(sentPost){
          clearInputField('com_content');
          setComments(sentPost?.comments);
        }
        setSending(false)
      }

      async function sendUpdate(e){
        setSending(true);
        e.preventDefault(); const data = new FormData(e.target);
        let htmlCont = data.get('act_content');
        const sendingload = {
          id : id,
          content: htmlCont,
        }
        const sentPost = await updateBPActivity(id, token, sendingload);
        if(sentPost){
          clearInputField('act_content')
          setEditing(false);
          setCompActivity(sentPost.activities);
        }
        setSending(false)
      }

      async function fetchComments(){
        setSending(true);
        const commList = await getBPActivityComments(id, token);
        if(commList){
          setComments(commList.activities.comments);
          setSending(false);
        }
      }

      async function deleteActivity(){
          const deleted = await deleteBPActivity(id, token);
          if(deleted){
            setCompActivity(null);
          }
      }

      async function toggleLike(){
        setLiked(!liked);
       const likeToggled = await likeBPActivity(id, token);
       if(likeToggled){
        setCompActivity(likeToggled);
        setLiked(likeToggled.favorited);
       } 
      }
  
      function resetForm(){
        setCommenting(false);
        clearInputField('com_content');
      }


      useEffect(() => {
        setLoaded(true)
        return () => {
          setLoaded(false);
          resetForm()
        }
      }, [user, compActivity]);

      if(compActivity){
        const {group_name} = activity_data ?? {};

        function getHeading(){
          if(type === 'new_job_listing'){
            return title;
          }else{
            return name;
          }
        }

        if(content_stripped?.length > 0){
          activity_content = <div dangerouslySetInnerHTML={{__html: hashtag(content_stripped)}}/>
        }
        
        
        if(activity_meta){
          
          if(type === 'new_job_listing'){
            activity_content = <>
            <Link  href={`/events/${listing?.slug}`}><h5 className="_listing_title" dangerouslySetInnerHTML={{__html: listing?.title}}/></Link>
              <p className="gx-text-grey _excerpt truncate-2" dangerouslySetInnerHTML={{__html: hashtag(listing.excerpt)}}/>
            </>
          }

          head_extras= <>{category?.icon && <span className="activity_badge" style={{backgroundColor : `${category?.color}`}}><i className={category?.icon}></i></span>}</>
        }
        if(compActivity.imageList){
          imagesView =  <ul className="gx-list-inline gx-mb-3 gx-mt-2">
                            {compActivity.imageList.map((image, index) => {
                                if (index === 2) {
                                  return (
                                    <li className="gx-mb-1" key={index}>
                                      <span className="gx-link gx-img-more"> +{compActivity.imageList.length - 2} More</span>
                                    </li>
                                  );
                                } else if (index > 2) {
                                  return null;
                                } else {
                                  return (
                                    <li className="gx-mb-1" key={index}>
                                      <Avatar shape="square" className="gx-size-40" src={image}/>
                                    </li>
                                  )
                                }
                              }
                            )}
                          </ul>
        }
        itemView = <>
                    <div key={id} className={`${type} activity_card card card-style mb-2 ${exClass}`}>
                        <div className="content mb-0">
                            <div className="mt-n1">
                                
                                <div className="mt-n1 mb-2">
                                  
                                    <div className="d-flex align-items-center gap-2">
                                      <div>
                                          <a onClick={(e) => openOffCanvas(e)} href="#" data-menu="menu-story"><img src={user_avatar?.thumb} width="35" className="rounded-xl mt-1" /* className="rounded-xl mt-1 border border-m border-blue-dark" *//></a>
                                      </div>
                                        <div className="pe-3">
                                            <Client><h5 className="_title mb-0 font-16 font-700" dangerouslySetInnerHTML={{__html: getHeading()}}/></Client>
                                            {noLink ? <></> : <>{group_name ? <>{listing?.type ? <Link className="pointer" href={`/${listing.type == 'event' ? 'events' : 'places'}/${listing?.slug}`}><h6 className="_sub_title truncate-2 lh-12 opacity-60 text-13">{group_name}</h6></Link> : <h6 className="lh-12 _sub_title truncate-2 opacity-60 text-13">{group_name}</h6>}</> : <></>}</>}
                                            <div className="title_meta d-flex align-items-center">
                                                {/* <div className="pe-2"><span className="font-11 opacity-60 accordionfont-11">@joesome</span></div>
                                                <div className="pe-2">&middot;</div> */}
                                                <div><span className="opacity-60 font-11">{dayjs(localiseDate(date)).fromNow()}</span></div>
                                            </div>
                                        </div>
                                        <div className="ms-auto"><a href="#" data-menu="menu-controls" onClick={(e) => openOffCanvas(e)}className="icon icon-xss d-block color-theme"><i className="fa fa-ellipsis-v"></i></a>
                                        </div>
                                    </div>
                                    {head_extras}
                                    <div className="border border-theme rounded-m overflow-hidden mb-3 activity_body">
                                        {/* <img src={type == 'new_job_listing' ? listing?.thumb_url : '/images/bg/fallback.jpg'} className="img-fluid"/> */}
                                        {type === 'new_job_listing' && <Suspense offset={150} once><img className="img-fluid feat_img mb-10 w-100 object-cover" src={listing?.thumb_url}/></Suspense>}
                                        <div className="content mt-0 mb-1">
                                            <span className="opacity-50 d-block pt-1 font-11">enableds.com</span>
                                            
                                            <div className="_content gx-mb-0">
                                            {editing ? 
                                            <form onSubmit={(e) => sendUpdate(e)}>
                                            {sending ? <LoaderEllipsis/> : <textarea defaultValue={content_stripped} id='act_content' name='act_content' className="act_content border rounded p-2 text-13 mb-10" style={{height: 80}}/>}
                                            <button type="submit" className="btn btn-xs btn-outline-theme mb-0">Post Update</button>
                                          </form>
                                            : 
                                            <>
                                            
                                            <div className="mb-0 line-height-sm color-theme">{activity_content}</div>
                                            </>
                                            
                                            }
                                        </div>
                                        </div>
                                    </div>
                                    {user ? 
                                      <div className="reactions_i_group d-flex pb-1">
                                        {can_comment && <span /* data-menu="menu-reply" */  className="color-theme me-2 opacity-60 
                                        reaction_i pointer" onClick={() => {fetchComments(); setCommenting(!commenting)}}><i className="bi bi-chat-left pe-1"/>  {comment_count > 0 && <span class="badge rounded-pill bg-warning">{comment_count}</span>}</span>}

                                        {can_favorite && <span onClick={() => toggleLike()} className={`me-2 opacity-60`}><i className={`pe-1 bi ${liked ? 'bi-heart-fill color-highlight' : 'bi-heart'}`}/>{favorite_count > 0 && <span className="badge rounded-pill bg-info">{favorite_count}</span>}</span>}

                                        
                                        {can_delete && user?.id == user_id && <span className="reaction_i pointer color-theme me-0 ms-auto opacity-60" onClick={() => deleteActivity()}><i className="bi bi-trash"/></span>}
                                      </div>
                                    :
                                    <>
                                    {showPrompt && <GuestPrompt title={'Sign in to respond to this post'}/>}<span className="reaction_i pointer" onClick={() => setShowPrompt(!showPrompt)}><i className="bi bi-three-dots"/></span></>
                                    }
                                    {imagesView}
                                    {commenting &&  <div className="comment_box mt-15">
                                        <form onSubmit={(e) => sendReply(e)} className="w-100">
                                          {/* sending ? <div className='d-flex justify-center align-items-center border rounded' style={{height: '80px'}}><LoaderEllipsis/></div> : */ <textarea rows={4} id='com_content' name='com_content' className="d-block w-100 com_content border rounded p-2 text-13" />}
                                          <button type="submit" className="btn btn-xs btn-outline-theme mb-0 mt-10">Post Reply</button>
                                        </form>
                                        {sending ? <LoaderDualRingBoxed/> : <>{comments?.length > 0 && 
                                        <div className='act_comments mt-15'>
                                        {comments.map((comItem) => {
                                            return <ActivityItem avatarSize={avatarSize} key={comItem.id} activity={comItem} user={user} token={token}/>
                                          })}
                                        </div>}</>
                                      }
                                    </div>}
                                </div>
                            </div>
                        </div>
                    </div>
                    </>
        
      }else{
        itemView = <></>
      }

      return (
        <>
          {itemView}
        </>
      );
    };

const ActivityItem = memo(ActivityItemConst);
export default ActivityItem;
