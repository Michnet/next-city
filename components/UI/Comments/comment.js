
import LazyLoad from "react-lazyload"
import CreateComment from "./createComment"
import ResponseLink from "./responseLink"
import dayjs from "dayjs"
import { localiseDate } from "@/helpers/universal"
var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime);

function Comment(props) {
  function responseClick(e) {
    e.preventDefault()
    props.setParentId(props.comment.id)
  }

  const comment = props.comment
  const commentId = `comment-${comment.id}`

  return (
    <li id={commentId} className="comment com_box">
      <div>
        <LazyLoad offset={150} once><img
            className="comment-avatar"
            src={comment.author_avatar_urls[48]}
            srcSet={`${comment.author_avatar_urls[96]} 2x`}
            width="48"
            height="48"
            alt="Comment avatar"
        /></LazyLoad>
      </div>
      <div><article className="comment-body">
        <header className="comment-header">
          <div className="comment-meta ">
            <b className="meta_name">{comment.author_name}</b>
            <p className="meta_meta">
              {dayjs(localiseDate(comment.date_gmt)).fromNow()}
            </p>
          </div>
        </header>
        <div
          className="comment-content"
          dangerouslySetInnerHTML={{ __html: comment.content.rendered }}
        />
        <div className="comment_footer">{props.allowComments ? (
          <ResponseLink onClick={responseClick} commentId={commentId} />
        ) : null}</div>
      </article>
      {props.answeredTo ? (
        <CreateComment
          allowComments={props.allowComments}
          postID={props.postID}
          parentId={comment.id}
          setParentId={props.setParentId}
          restUrl={props.restUrl}
          user={props.user}
          reload={props.reload}
        />
      ) : null}
      </div>
    </li>
  )
}
export default Comment
