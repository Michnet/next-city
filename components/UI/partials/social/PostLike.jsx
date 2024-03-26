import  {useEffect, useState } from "react";
import {openOffCanvas, showToast} from "@/helpers/appjs";
import { useRecoilValue } from "recoil";
import { authState } from "@/contexts/atoms";
import { likePost } from "@/helpers/rest";


const PostLike = ({listing, likedEl=null, unlikedEl=null}) => {
  const {user, token} = useRecoilValue(authState);
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
}, [listing])

  async function likeItem(e, payload){
    setLiked(true);
    const postLike = await likePost(payload);
    if (postLike) {
       showToast(e)
    }
  }

  async function unlikeItem(e, payload){
    setLiked(false);
    const postdislike = await likePost(payload);
    if (postdislike) {
      showToast(e)
    }
  }

  let likeView;
  if(user){
      likeView = <div className="likes_box _likes"> 
              {liked ? <span data-toast="snackbar-unliked" onClick={(e) => unlikeItem(e, {JWT: token, unliked_id: listing, user_id : parseInt(user.id)})}>{likedEl ?? <i className="fa fa-heart"/>}</span>
                     : <span data-toast="snackbar-liked" onClick={(e) => likeItem(e, {JWT: token, liked_id: listing, user_id : parseInt(user.id)})}>{unlikedEl ?? <i className="far fa-heart"/>}</span>
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
