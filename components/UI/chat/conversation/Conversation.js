
//import InfiniteScroll from "react-infinite-scroll-component";
import ReceivedMessageCell from "./ReceivedMsg";
import SentMessageCell from "./SentMsg";

const Conversation = ({conversationData, selectedUser, current_user, getUserThreads, setSubject}) => {
  return (
    <div id='scroll_box' className="gx-chat-main-content">
      {conversationData?.map((conversation, index) => conversation.sender_id === current_user ?
        <SentMessageCell key={index} conversation={conversation}/> :
        <ReceivedMessageCell setSubject={setSubject} key={index} conversation={conversation} user={selectedUser}/>
        
      )}
{/*       </InfiniteScroll> */}
    </div>
  )
};

export default Conversation;
