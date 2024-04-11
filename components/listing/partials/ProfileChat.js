import {useState, useEffect} from "react";
// import Conversation from "../../chat/Conversation";
// import CircularProgress from "../../CircularProgress";
import { getBPRecipientThread, getBPThread, sendBPMessage } from "@/helpers/rest";
// import GuestPrompt from "routes/userAuth/GuestPrompt";
import { useRecoilValue } from "recoil";
import { authState } from "@/contexts/atoms";
import Conversation from "@/components/UI/chat/conversation/Conversation";
import { CircularProgress } from "@/components/skeletons/Loaders";
import GuestPrompt from "@/components/UI/GuestPrompt";


const ProfileChat = ({id, author, count, slug, thumbnail}) => {
  const{user, token:jwt} = useRecoilValue(authState);
  const [loader, setLoader] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [message, setMessage] = useState('');
  const [profileThread, setProfileThread] = useState(null);
  const [conversation, setConversation] = useState(null);
  const [threadID, setThreadID] = useState(null);
  const [sending, setSending] = useState(false);

  function processListingThread(usersThread){
    if(usersThread){
      const {messages:listingMessages, id:thread_id} = usersThread;
      const filteredThread = listingMessages?.filter((item) => {
       return parseInt(item.subject.rendered) == id || item.subject.rendered == `Re: ${id}` || item.subject.rendered == `Re: ${slug}` || item.subject.raw == `${slug}` || item.subject.rendered == `${slug}`;
     }); 
         if(filteredThread){
           setThreadID(thread_id);
           setConversation(filteredThread);
         }
     }
  }

  const getUserAuthorThreads = async() => {
    const usersThread = await getBPRecipientThread({
      recipient_id: author,
      user_id: user.id,
      _fields:'subject,id,messages,avatar',
      per_page: 100
    }, jwt);
    if(usersThread){
      processListingThread(usersThread)
    }
  }

  function processSingleMsg(item){
    const {sender_id, message, subject, date_sent } = item;
    return {
      sender_id, message, subject, date_sent
    }
  }

  const updateChat = async(id) => {
    const load = {before : conversation.next_messages_timestamp}
   const theThread = await  getBPThread(id, load, jwt);
   if(theThread){
    const {messages:newMessages, next_messages_timestamp} = theThread;
    if(newMessages){
      const newArr = newMessages.map((item) => processSingleMsg(item));

      const newConversation = conversation.messages.concat(newArr);

      setConversation(newConversation);
    }    
   }
  }

  
  useEffect(() => {
    if(user){
    getUserAuthorThreads();
    }
  }, [id, user]);

  if(profileThread){
    if(conversation){
      count(conversation.unreadMessage);
    }
    //formView = <ChatForm threadID={threadID} sender_id={user?.id} subject={id}/>
  }else{
    //formView = <ChatForm sender_id={user?.id} subject={id} recipients={[author]}/>
  }

  const Communication = () => {

    let threadView;

    if(conversation){
     // const {messages, id} = conversation;
      threadView =    <div  >
                        <div 
                              onEnter={() => {updateChat(threadID)}} 
                             // onLeave={e =>  console.log('we out')}
                              //bottomOffset = '99%'
                              ><div>
                          <Conversation conversationData={conversation} selectedUser={selectedUser} current_user={user?.id}/>
                          </div>
                          </div>
                        </div>
    }
    
    return <div className="gx-chat-main">
      {threadView}

      <div className="gx-chat-main-footer border-0 card card-style p-3 mb-0">
        <div>
            {/* sending ?  <div className="d-flex justify-center align-items-center"><LoaderEllipsis/></div> : */ 
            <div className="gx-form-group">
                            <textarea 
                              required
                              rows="3"
                              id="listing_chat_box" className="p-2 rounded mb-10 w-100 border-none"
                              onKeyUp={(e) => _handleKeyPress(e)}
                              onChange={(e) => updateMessageValue(e)}
                              value={message}
                              placeholder="Type and hit enter to send message"
                            />
            </div>}
         <button className="btn btn-sFm btn-theme" onClick={() => submitMessage()}>Send <i className="bi bi-send"/></button>
        </div>
      </div>
    </div>
  };


  const _handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      submitMessage();
    }
  };

  const showCommunication = () => {
    return (
      <div className="gx-chat-box">
          {/*  {formView} */}
        {Communication()}
      </div>)
  };

  async function submitMessage() {
    setSending(true)
    if (message !== '') {
      const payload = {
        id : threadID,
        message : message,
        sender_id : user.id,
        recipient : [author],
        subject: slug
      }
      

      let pendingMsg = {sender_id: user.id, message:{rendered:message}, date_sent: new Date()};
      let tentativeConversation = conversation?.length > 0 ? conversation.concat(pendingMsg) : [{sender_id: user.id, message:{rendered:message}, date_sent: new Date()}];
      setMessage('');
      setConversation(tentativeConversation);

      const sentMsg = await sendBPMessage(payload, jwt);
      if(sentMsg){

        processListingThread(sentMsg)
        setSending(false);
      }else{
        setSending(false);
      } 
  }
}
  

  function updateMessageValue(evt) {
    setMessage(evt.target.value)
  }

  return (
    <div className="gx-main-content">
      <div className="gx-app-module gx-chat-module">
        {user ? <div className="gx-chat-module-box">
          {loader ?
            <div className="gx-loader-view">
              <CircularProgress/>
            </div> : showCommunication()
          }
        </div> : <GuestPrompt title={'Login to chat with the event listing manager'}/>}
      </div>
    </div>
  );

}

export default ProfileChat;
