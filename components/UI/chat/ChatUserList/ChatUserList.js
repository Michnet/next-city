import { localiseDate } from "@/helpers/universal";
import UserCell from "./UserCell";
import dayjs from "dayjs";
var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)

const ChatUserList = ({chatUsers, selectedSectionId, onSelectUser}) => {

  let usersView;
  
  if(chatUsers){
    usersView = <div className="gx-chat-user">
    <div class="card card-style mb-0">
            <div class="content mb-0">
              {chatUsers.map((chat) =>{
                  const {id,thumb,name, lastMessage,lastMessageTime,unreadMessage} = chat;

               return <> <div  onClick={() => { onSelectUser(chat)}} key={id} href="page-chat-bubbles-2.html" class="d-flex pb-3 justify-between">
                <div className='row_flex'><div class="align-self-center">
                    <i class="fa fa-circle color-green-dark position-absolute ms-4 ps-2 pt-4 mt-2"></i>
                    <img src={thumb} width="45" class="rounded-xl me-3" alt="img"/>
                </div>
                <div class="align-self-center">
                    <p class="font-14 font-600 color-theme mb-0 line-height-s">{name}</p>
                    <p class="font-11 mb-0 line-height-s" dangerouslySetInnerHTML={{   __html: lastMessage.rendered }}/>
                </div></div>
                <div class="end-0 px-3">
                    <span class="font-9 opacity-40 color-theme text-right lh-12">{dayjs(localiseDate(lastMessageTime)).fromNow()}</span><br/>
                    {unreadMessage && <span class="float-end mt-n1 pt-1 badge rounded-pill bg-blue-dark font-9 font-400 scale-switch">{unreadMessage}</span>}
                </div>
            </div>
            <div class="divider mb-3"></div></>}
              )}
            </div>
        </div>
  </div>
  }
  return (
    <>
    
    {usersView}</>
  )
};

export default ChatUserList;
