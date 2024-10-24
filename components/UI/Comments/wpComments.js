import  { useContext, useEffect, useState } from "react"
import CreateComment from "./createComment"
import CommentTree from "./commentTree"
//import Masonry, {ResponsiveMasonry} from "react-responsive-masonry";
//import { CommentLoader } from "../skeletons/React-content-loader/Skeletons"
//import { fetchComments } from "server/WpRest"
//import { authContext } from "~/util/use-auth"
import { CommentLoader } from "@/components/skeletons/Skeletons"
import { fetchComments } from "@/helpers/universal"
import { authState } from "@/contexts/atoms"
import { useRecoilValue } from "recoil"

function WpComments({ hostUrl, maxDepth, postID, allowComments}) {
  const {user} = useRecoilValue(authState);

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [state, setState] = useState({
    topElements: null,
    commentsNumber: 0,
    isFetching: true,
    parentId: 0,
  })

  //Handler function to be passed down the tree. It updates state with id of a comment user replies to
  function setParentId(id) {
    setState(prevState => ({ ...prevState, parentId: id }))
  }

  function reset(){
     setState(
      {
        topElements: null,
  
        commentsNumber: 0,
        isFetching: true,
        parentId: 0,
      }
     )
  }

  
useEffect(() => {
  setLoading(false);
}, [user]);


  let restUrl = `${hostUrl}/wp-json/wp/v2/comments`
 
  const getComments = async() => {
    const commObj = await fetchComments({ post: postID, per_page: 5, page : page });
    if(commObj){
       const {items : resultData} = commObj;
      const commentsNumber = resultData.length;
      setState({
        topElements : resultData,
        commentsNumber,
        isFetching: false,
        parentId: 0,
      })
   
    }else{
      setState({...state, isFetching: false})
    }
  }
   
  useEffect(() => {
   reset();
   getComments();
  }, [postID, page]);

  let chatView;

  if (state.isFetching) {
    chatView =  <CommentLoader num={5}/>
  } else if(state.topElements?.length > 0){
    chatView =  <div className="comments-area">
        <div className="comments-title">
          <h5 className="mb-20">Community Chat ({state.commentsNumber})</h5>
        </div>
        <div>
          <div className="comment-list row">
            {CommentTree(
              state.topElements,
              maxDepth,
              state.parentId,
              postID,
              restUrl,
              setParentId,
              allowComments,
              user,
              getComments
            )}
          </div>
         
        </div>
      </div>
  }else{
    chatView = <div className="text-center">Be the first to share on this page</div>
  }
  return <> 
   {state.parentId === 0 ? (
            <CreateComment
              reload={getComments}
              allowComments={allowComments}
              postID={postID}
              parentId={0}
              restUrl={`${hostUrl}/wp-json/wp/v2/comments`}
              user={user}
            />
          ) : null}
  {chatView}
  </>
}

export default WpComments
