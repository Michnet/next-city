import  {useEffect, useState } from "react";
import {openOffCanvas, showToast} from "@/helpers/appjs";
import { useRecoilState, useRecoilValue } from "recoil";
import { authState } from "@/contexts/atoms";
import { likePost } from "@/helpers/rest";


const PostLike = ({listing, likedEl=null, unlikedEl=null}) => {
  const [authObj, setAuthObj] = useRecoilState(authState);
  const {user, token} = authObj ?? {};
  const {user_meta} = user ?? {}
  const likes = user?.user_meta?.likes;
  
  const [liked, setLiked] = useState(false);
  const [loginModal, setLoginModal] = useState(false);

function showLike(){

  if(user && listing){
    if(user.user_meta){
        const likes = user?.user_meta?.likes;
        if(likes?.length > 0){
        const likeStatus = likes.find(el => el == listing);
        if(likeStatus){
          setLiked(true);
        }
      } 
    }
  }
}

useEffect(() => {
  showLike()
}, [listing]);

function shortened(arr, value) {
  var index = arr.indexOf(value);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
}

  async function likeItem(e, payload){
    console.log('e func', e);
    setLiked(true);
    const postLike = await likePost(payload);
    if (postLike) {
        let newMeta = {...user_meta, likes:[...likes, listing]}
       setAuthObj({...authObj, user:{...user, user_meta: newMeta}})
       //showToast(e)
    }
  }

  async function unlikeItem(e, payload){
    setLiked(false);
    const postdislike = await likePost(payload);
    if (postdislike) {
      let newMeta = {...user_meta, likes:shortened([...likes], listing)}
       setAuthObj({...authObj, user:{...user, user_meta: newMeta}})
      //showToast(e)
    }
  }

  let likeView;
  if(user){
      likeView = <div className="likes_box _likes"> 
              {liked ? <span>{likedEl ?? <i className="fa fa-heart" data-toast="snackbar-unliked" onClick={(e) => {console.log('e', e); unlikeItem(e, {JWT: token, unliked_id: listing, user_id : parseInt(user.id)})}}/>}</span>
                     : <span>{unlikedEl ?? <i className="far fa-heart" data-toast="snackbar-liked" onClick={(e) => {console.log('e', e); likeItem(e, {JWT: token, liked_id: listing, user_id : parseInt(user.id)})}}/>}</span>
                 }
                </div>
  }else{
      likeView = <div className="likes_box _likes">  
                   <span data-menu='login_modal' onClick={(e) => openOffCanvas(e)}>{unlikedEl ?? <i className="far fa-heart"/>}</span>
                </div>
  }
  
  return (<>
    {likeView}
  </>);
}

export default PostLike;
