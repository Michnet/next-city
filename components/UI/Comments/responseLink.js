
export default function ResponseLink(props) {
  return (
    <div className="comment-reply-link">
      <a onClick={props.onClick} href={`#${props.commentId}`} rel="nofollow">
        <i className="bi bi-chat-right-dots"/> Reply
      </a>
    </div>
  )
}
