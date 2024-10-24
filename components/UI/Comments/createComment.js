import { LoaderEllipsis } from "@/components/skeletons/Loaders";
import { createComment } from "@/helpers/universal";
import  { useEffect, useState } from "react"
import GuestPrompt from "../GuestPrompt";

//import SubmitButton from "./submitButton"
//import apiSubmitHandler from "./utils/apiSubmitHandler"

function CreateComment({postID, parentId, setParentId, allowComments, user, reload}) {
  const [submitting, setSubmitting] = useState(false)
  const [loading, setLoading] = useState(true);
  const [response, setResponse] = useState("")
  const [text, setText] = useState('');

  // This function gets executed only if native HTML form validation is passed
  async function submitComment(event) {
  
    event.preventDefault()
    setSubmitting(true)

    let payload = {
      author_name: event.target.author_name.value,
      author_email: event.target.author_email.value,
      content: event.target.comment_content.value,
      post: postID,
      parent: parentId,
    }
  
    const addComment = await createComment(payload);
    if(addComment){
        setSubmitting(false)
        setResponse("Your comment was successfully added");
        setText('');
        reload()
      }
  }

  function cancelResponse(e) {
    e.preventDefault()
    // set parent to 0
    setParentId(0)
  }

  useEffect(() => {
    setLoading(false)
  }, [user])
  

  if (allowComments) {
    return (
      <div className="comment-respond">
        <h3 className="reply-title">
          {parentId ? (
            // if comment was selected as a response, add close button
            <small>
              <a onClick={cancelResponse} href={`#comment-${parentId}`}>
                Cancel X
              </a>
            </small>
          ) : null}
        </h3>
        {submitting ?  <LoaderEllipsis/> : <form onSubmit={(e) => submitComment(e)}>
          <div className="mb-10">
          {user ? 
            // if there's a user authorized, hide inputs and inform the user
            <>
              <div className="mb-2 d-grid" style={{gridTemplateColumns: '50px auto'}}>
                <img
                  className="comment-avatar"
                  src={user?.avatar_urls[48]}
                  width="48"
                  height="48"
                  alt={`${user.name}`}
                />
                <div className="comment-meta">
                <b>{user.name}</b>
                <p className="text-black-50 text-12">
                  Right Now ....
                </p>
              </div>
                
              </div>
              <input type="hidden" name="author_name" value={user.name} />
              <input type="hidden" name="author_email" value={user.email} />
            </>
           : 
            <>
            <div className="message_write">
              <div className="mb-3">
                <label for="name" className="form-label">Name</label>
                <input type="name" className="form-control form-control-sm" id="name" placeholder="Your Name" name="author_name"/>
              </div>
              <div className="mb-3">
                <label for="email" className="form-label">Email address</label>
                <input type="email"  className="form-control form-control-sm" id="email" placeholder="email@example.com" name="author_email"/>
              </div>
            </div>
            </>
          }
          </div>

          <div className="comment-input-content">
            <textarea className="form-control form-control-sm mb-3" placeholder="Your comment here..." maxLength="2000" rows={5} name="comment_content" value={text} required onChange={(e) => setText(e.target.value)}/>
              <div className="clearfix"></div>
              <div className="chat_bottom d-flex flex-row justify-between">

                {/* <a href="#" className="pull-left upload_btn"><i className="las la-cloud-upload-alt" aria-hidden="true"></i>Add Files</a> */}
                <button type="submit"  className=" btn btn-sm radius-30 px-15 btn-success">Send</button>
              </div>
          </div>

          {/* <SubmitButton submitting={submitting} /> */}
          <p>{response}</p>
        </form>}
      </div>
    )
  } else {
    return (
      <GuestPrompt title={'Login/Register to join the conversation'} />
    )
  }
}

export default CreateComment
