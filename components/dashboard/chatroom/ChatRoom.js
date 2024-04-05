import  {useState, useEffect} from "react";
import InfiniteScroll from 'react-infinite-scroll-component';
import {getBPThread, sendBPMessage } from "@/helpers/rest";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import { authState, messagesState } from "@/contexts/atoms";
import SentMessageCell from "@/components/UI/chat/conversation/SentMsg";
import GuestPrompt from "@/components/UI/GuestPrompt";
import { Avatar } from "@/components/UI/Partials";
import { LoaderDualRingBoxed, LoaderEllipsis } from "@/components/skeletons/Loaders";
import ChatUserList from "@/components/UI/chat/ChatUserList/ChatUserList";
import ReceivedMessageCell from "@/components/UI/chat/conversation/ReceivedMsg";
import ChatHeader from "./ChatHeader";
import BottomMenu from "@/components/layouts/BottomMenu";
import { openOffCanvas } from "@/helpers/appjs";

const Chat = () => {
  const {user} = useRecoilValue(authState);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [drawerState, setDrawerState] = useState(false);
  const [selectedSectionId, setSelectedSectionId] = useState('');
  const [userState, setUserState] = useState(1);
  const [searchChatUser, setSearchChatUser] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [message, setMessage] = useState('');
  const [chatUsers, setChatUsers] = useState([]);
  const [conversation, setConversation] = useState(null);
  //const [messages, setMessages] = useState([]);
  const [nextStamp, setNextStamp] = useState(null);
  const [subject, setSubject] = useState(null);
  const [activeThreadId, setActiveThreadId] = useState(null);
  const [showChats, setShowChats] = useState(true)


  const {name, avatar_urls} = user ?? {}
  const auth = useRecoilValue(authState);
  const stateMessages = useRecoilValue(messagesState);
  const {token} = auth;


  const users = [];
  const router = useRouter();


  function processThread(thread){
        const {recipients, avatar, subject, excerpt, unread_count, date, id, next_messages_timestamp, messages} = thread;
        const recArray = Object.values(recipients);
        const targetObj = recArray.filter((el) => el.user_id !== user.id)[0];
       // let usersArr = recArray.map((el) => el.user_id);
        const {name} = targetObj ?? {};

       const messagesArr = messages.map((item) => {
          const {sender_id, message, subject, date_sent } = item;
              return {
                sender_id, message, subject, date_sent
              }
        }); 

        setSubject(subject);

         return { id : id, name : name, thumb : avatar[0].thumb, lastMessage : excerpt, unreadMessage : unread_count, subject : subject, lastMessageTime : date, next_messages_timestamp, messages : messagesArr.reverse() }
  }

  async function fetchChat(){
    if(conversation){
      let load = {}
      if(nextStamp){
        load.before = nextStamp;
        const theChat = await getBPThread(conversation.id, load, token);
        if(theChat){
          const cleanedUpThread = processThread(theChat);
          const newMsgs = conversation.messages.concat(cleanedUpThread.messages);
            setConversation({...conversation, messages:newMsgs});
            setNextStamp(theChat.next_messages_timestamp);
        }
      }
    
  }
  }

  async function fetchThread(id){
    if(id){

    const initialThread = await getBPThread(id, null, token);
    if(initialThread){
      const cleanedUpThread = processThread(initialThread);
      //const {messages :newMsgs} = cleanedUpThread;
      setConversation(cleanedUpThread);
        //setMessages(messages.concat(newMsgs.reverse()));
        setNextStamp(cleanedUpThread.next_messages_timestamp);
        //onSelectUser(cleanedUpThread)
    }
  }
  }

  async function refreshThread(id){
    if(id){
    const initialThread = await getBPThread(id, null, token);
    if(initialThread){
      const cleanedUpThread = processThread(initialThread);
      setActiveThreadId(initialThread.id);

        setConversation(cleanedUpThread);
        setNextStamp(cleanedUpThread.next_messages_timestamp);
    }
  }
  }
  
  async function setChat(){
    if(conversation){
      const {messages :preloadMsgs, next_messages_timestamp : preloadNext} = conversation;
        //setMessages(preloadMsgs.reverse());
        setNextStamp(preloadNext);
  }
  }

  useEffect(() => {
    if(router.query){
      const {threadID} = router.query;
      if(threadID){
      fetchThread(threadID);
      }
      }
  }, [router]);
  

  useEffect(() => {
    setChat()
  }, [conversation]);
  
  
  useEffect(() => {
    if(stateMessages && stateMessages.length > 0){
      let usersArr = [];
      stateMessages.map((thread) => {
        usersArr.push(processThread(thread));
      });
    setChatUsers(usersArr);
    setLoading(false);
    }
  }, [stateMessages]);

  const filterUsers = (userName) => {
    if (userName === '') {
      return users.filter(user => user.recent);
    }
    return users.filter((user) =>
      user.recent && user.name.toLowerCase().indexOf(userName.toLowerCase()) > -1
    );
  };

  let messagesView, chatArea;
  const {messages} =  conversation ?? {};
 

  if(conversation){
    if(messages?.length > 0){
      messagesView = <div id="scroll_box" className="h-100 no-scrollbar" style={{ overflow: 'auto', display : 'flex', flexDirection : 'column-reverse' }} >
                      <InfiniteScroll dataLength={messages.length} next={fetchChat} hasMore={nextStamp === ""? false : true} 
                       loader={<LoaderEllipsis/>} endMessage={ <p style={{ textAlign: 'center' }}> <b>No more Messages</b> </p> } inverse={true} scrollableTarget='scroll_box' initialScrollY = {800} style={{ display: 'flex', flexDirection: 'column-reverse' }} scrollThreshold="200px"                       
                       //height= {500}
                       >
                            {messages.map((item, index) => {
                               const {message, date_sent,name, sender_id} = item;
                                   return item.sender_id === user.id ?
                                        <div> <div className="speech-bubble speech-left bg-green-dark" dangerouslySetInnerHTML={{   __html: message.rendered }}/>
                                    <div className="clearfix"></div> </div>:
                                        <div> 
                                          <div className="speech-bubble speech-right color-black" dangerouslySetInnerHTML={{   __html: message.rendered }}/>
                                          <div className="clearfix"></div>
                                        </div>
                                        })}  
                            {/* {messages.map((item, index) => item.sender_id === user.id ?
                                        <div><SentMessageCell key={index} conversation={item} user={user}/> </div>:
                                        <div> <ReceivedMessageCell key={index} conversation={item} user={conversation}/> </div>)} */}  
                        
                      </InfiniteScroll>
                     
                      </div>
                          
    }else{
      messagesView = <div className="d-flex justify-center align-items-center" style={{minHeight: '50vh'}}><LoaderEllipsis/></div>
    }

  chatArea = <>
     
         {messagesView}

      {/* <div className="gx-chat-main-footer">
      <form onSubmit={(e) => {e.preventDefault(); submitText(e.target.elements)}}>

        <div className="gx-flex-row gx-align-items-center" style={{maxHeight: 51}}>
          <div className="gx-col">
          
            <div className="gx-form-group">
                             <> <textarea
                                  required
                                  id="text_field"
                                  className="gx-border-0 ant-input gx-chat-textarea"
                                  name='text_message'
                                  placeholder="Type your message"
                                />
                            </>
            </div>
          </div>
          <button type="submit"><i className="bi bi-send"/></button>
        </div>
        </form>
      </div> */}
    </>
  }

  const AppUsersInfo = () => {
    return <div className="gx-chat-sidenav-main">
      <p>Loading ... </p>
    </div>
  };

  const ChatUsers = () => {
    return <><div className="gx-chat-sidenav-main headed-height">

      <div className="gx-chat-sidenav-content">
      
            <div className="gx-chat-sidenav-scroll-tab-1">
              {loading ? <div style={{height:300}}><LoaderDualRingBoxed/></div> : <>{chatUsers && chatUsers.length === 0 ?
                <div className="gx-p-5">
                  <p>No conversation found. To start a new conversation, visit any listing page to start a private chat with the event or business owner. All your conversation will appear here.</p>
                </div>
                :
                <ChatUserList chatUsers={chatUsers}
                              selectedSectionId={selectedSectionId}
                              onSelectUser={onSelectUser}/>
              }</>}
            </div>
      </div>
    </div>


    
    </>
  };

  const onSelectUser = (user) => {
      const newChat = chatUsers.find((data) => data.id === user.id)
    
      setLoading(true),
      setActiveThreadId(newChat.id);
      setSubject(newChat.subject);
      setNextStamp(null);
      setSelectedSectionId(user.id),
      setDrawerState(false),
      setSelectedUser(user),
      setConversation(newChat);
      setTimeout(() => {
        setLoading(false);
      }, 1500);
  };

  const showCommunication = () => {
    return (
      <div className="gx-chat-box h-100">
        {conversation ? <>{chatArea}</>
        : <div className="py-15 mx-n3">
                          {userState === 1 ? ChatUsers() : AppUsersInfo()}
                        </div> 
          }
      </div>)
  };

  async function submitText(elements) {

     const text = elements['text_message'].value;

    setSending(true)
    if (text !== '') {

      const textInput = document.getElementById('text_field');
      textInput.value = '';

      const payload = {
        id : conversation.id,
        message : text,
        sender_id : user.id,
        //recipients: conversation.recipients
      }
      let oldChat = conversation.messages;
      oldChat.unshift({
        sender_id : user.id, message : {rendered : text}, subject:subject, date_sent: new Date()
      });
      setConversation({
        ...conversation, messages: oldChat
      });

      const sentMsg = await sendBPMessage(payload, token);
      if(sentMsg){
        const processed = processThread(sentMsg);
        setNextStamp(processed.date);
        const {message_id, messages} = processed;

        const newMsg = messages.filter((msg) => {
          return msg.id == message_id})[0];

        if(newMsg){
          setConversation({
            ...conversation, messages: messages
          });

          setMessage('');
          setSending(false);

          setChatUsers(chatUsers.map(item => {
            if (item.id === conversation.id) {
              return {...conversation, messages: messages };
            } else {
              return item;
            }
          })) 
        }
   
      }else{
        setSending(false);
      } 
  }
}

  

  function updateMessageValue(evt) {
    setMessage(evt.target.value)
  }

  function updateSearchChatUser(evt) {

      setSearchChatUser(evt.target.value);
      setFilterContact(evt.target.value);
      setChatUsers(filterUsers(evt.target.value));
  }

  function onToggleDrawer() {
      setDrawerState(!drawerState)
  }

  let chatAreaView;

  const bottMenu =  <div id="footer-bar" className="h-auto py-10 d-flex position-sticky pe-0" style={{minHeight: 'auto'}}>
  {/* <div className="me-2 ms-1 speach-icon">
      <a href="#" data-menu="menu-upload" className="bg-gray-dark ms-2"><i className="fa fa-plus font-12 pt-2"></i></a>
  </div> */}
  <form className={'row_flex h-fit ps-2'} onSubmit={(e) => {e.preventDefault(); submitText(e.target.elements)}}>
          <textarea required
                                  id="text_field"
                                  className="gx-border-0 ant-input gx-chat-textarea w-100"
                                  name='text_message'
                                  placeholder="Type your message"/>
      <div className="ms-2 ms-1 speach-icon">
          <button type={'submit'} className="_link bg-blue-dark me-2"><span className=""><i className="fa fa-arrow-up font-12 pt-2"></i></span></button>
      </div>
  </form>
  {/* <button data-menu={'user_menu'} onClick={(e) => openOffCanvas(e)} className="_fab circle d-flex align-items-center justify-center bg-theme position-absolute gradient-menu shadow shadow-bg-m">
<span  className={`text-center big_act`}>
{<i className={`link_i fa fa-user`}/>}
</span>
</button> */}
</div>

  if(user){
    chatAreaView =  <div className="gx-chat-module-box h-100 h-full">
                     {/*  <div className="d-block d-lg-none">
                        <div className="">
                          {userState === 1 ? ChatUsers() : AppUsersInfo()}
                        </div>
                      </div> */}
                      <div className='row_flex gap-3 h-100'>
                        <div className="gx-chat-sidenav d-none d-flex d-lg-block" style={{width: '300px'}}>
                          {userState === 1 ? ChatUsers() : AppUsersInfo()}
                        </div>
                        <div className={'bg-theme justify-between d-flex flex-column'} style={{flex: 'auto'}}>
                        <ChatHeader setConversation={setConversation} conversation={conversation} exClass='header-sticky header-always-show'/>
                        <div className='px-3 flex-grow-1 flex-shrink-1' style={{minHeight: '100px'}}>{showCommunication()}</div>
                        {conversation ? <BottomMenu icon={'fa fa-user'} btnProps={{'data-menu':'user_menu'}} content={bottMenu}/> : <></>}
                        </div>
                      </div>
                    </div>
  }else{
    chatAreaView = <GuestPrompt/>
  }

  return (
    <div className="gx-main-content headed-height">
      
      <div className="h-full">
         {chatAreaView}
      </div>
      
    </div>
  );

}

export default Chat;
