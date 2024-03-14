import  {useEffect, useState } from "react";
import {openOffCanvas} from "@/helpers/appjs";
import { useRecoilValue } from "recoil";
import { authState } from "@/contexts/atoms";
import { likePost } from "@/helpers/rest";


const PostLike = ({listing}) => {
  const {user, token} = useRecoilValue(authState);
  const [liked, setLiked] = useState(false);
  const [loginModal, setLoginModal] = useState(false);


  const handleCancel = () => {
    setLoginModal(false);
  };

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

  async function likeItem(payload){
    setLiked(true);
    const postLike = await likePost(payload);
    if (postLike) {
      
    }
  }

  async function unlikeItem(payload){
    setLiked(false);
    const postdislike = await likePost(payload);
    if (postdislike) {
      
    }
  }

  let likeView;
  if(user){
      likeView = <div className="action_box _likes"> {liked ? 
                    <i className="las la-heart" onClick={() => unlikeItem({JWT: token, unliked_id: listing, user_id : parseInt(user.id)})}></i> : 
                    <i className="lar la-heart" onClick={() => likeItem({JWT: token, liked_id: listing, user_id : parseInt(user.id)})}></i>
                 }
                </div>
  }else{
      likeView = <div className="action_box _likes">  
                    <i className="lar la-heart" data-menu='login_modal' onClick={(e) => openOffCanvas(e)}/>
                </div>
  }
  
  return (<>
    {likeView}
  </>);
}

export default PostLike;
