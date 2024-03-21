
//import InfiniteScroll from "react-infinite-scroll-component";
import ReceivedMessageCell from "./ReceivedMsg";
import SentMessageCell from "./SentMsg";

const Conversation = ({conversationData, selectedUser, current_user, getUserThreads}) => {
 //console.log('conversationData', conversationData)
  return (
    <div id='scroll_box' className="gx-chat-main-content">
   {/*    
      <InfiniteScroll
            dataLength={6} //This is important field to render the next data
            next={getUserThreads}
            hasMore={true}
            height={450}
            loader={<h4>Loading...</h4>}
            endMessage={
                <p style={{ textAlign: 'center' }}>
                <b>No more Messages</b>
                </p>
            }
            inverse = {true}
            initialScrollY = {300}
            refreshFunction={getUserThreads}
            pullDownToRefresh
            pullDownToRefreshThreshold={50}
            > */}
      {conversationData?.map((conversation, index) => conversation.sender_id === current_user ?
        <SentMessageCell key={index} conversation={conversation}/> :
        <ReceivedMessageCell key={index} conversation={conversation} user={selectedUser}/>
        
      )}
{/*       </InfiniteScroll> */}
    </div>
  )
};

export default Conversation;
