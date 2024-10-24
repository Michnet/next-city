
import Comment from "./comment"

export default function CommentTree(
  topElements,
  maxDepth,
  parentId,
  postID,
  restUrl,
  setParentId,
  allowComments,
  user,
  getComments
) {

  //nested recursive function to build the tree
  function buildTree(topElements, depth, allowComments=true) {
    return (
      <>
        {topElements.map(element => {
          let id = element.id
          let hasChildren = element.replies?.length > 0;
          let answeredTo = parentId === id

          // Composing comment component to use within recursive function
          function CurrentComment() {
            return (
              <div className="_par"><Comment
                reload={getComments}
                key={id}
                comment={element}
                answeredTo={answeredTo}
                postID={postID}
                restUrl={restUrl}
                setParentId={setParentId}
                allowComments={allowComments}
                user={user}
              /></div>
            )
          }
          if (hasChildren){
          // if component has children and depth was not met, dig deeper
          if (maxDepth == 0 || maxDepth > depth) {
            return (
              <div className={`community_comment ${element.parent == 0 ? 'col-12 col-sm-6 col-md-4' : ''}`} key={id}>
                {CurrentComment()}
                  <ol className={`pl-0 chi ml-10 nesting-${depth}`}>{buildTree(element.replies, depth + 1)}</ol>
              </div>
            )
            // if still has children, but depth was met, stay on the same level
          } else if (maxDepth <= depth) {
            return (
              <div className={`community_comment ${element.parent == 0 ? 'col-12 col-sm-6 col-md-4' : ''}`} key={id}>
                {CurrentComment()}
                <ol className={`pl-0 _chi ml-10 nesting-${depth}`}>{buildTree(element.replies, depth, allowComments=false)}</ol>
              </div>
            )
          }
        } else {
            // if no children, return current comment
            return <div className={`community_comment ${element.parent == 0 ? 'col-12 col-sm-6 col-md-4 top_par' : ''}`} key={id}>{
              CurrentComment()}
              </div>
          }
        })}
      </>
    )
  }

  // see function body below
  return buildTree(topElements, 0)

}
