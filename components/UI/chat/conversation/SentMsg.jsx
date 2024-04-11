import { localiseDate } from "@/helpers/universal";
import dayjs from "dayjs";
// import { Avatar } from "~/appComponents/components/UI/components";
// import { localiseDate } from "~/server/UniversalFunctions";
import { Avatar } from "../../Partials";
var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime);


const SentMessageCell = ({conversation, user}) => {
  const {message, date_sent,name, sender_data, subject} = conversation ?? {};
  const {user_avatars} = sender_data ?? {}


  return (
    <div className="gx-chat-item gx-flex-row-reverse">
       
          <div className='row_flex justify-end gap-2 pe-2'>
          <div className="d-flex align-items-end flex-column">
            <div className="speech-bubble speech-left bg-green-dark mb-0" dangerouslySetInnerHTML={{   __html: message.rendered }}/>
            <span className='msg_meta opacity-40 text-11'>{dayjs(localiseDate(date_sent, null)).fromNow()}</span>

            </div>
          {user_avatars?.thumb ? <Avatar rounded width={35} className="gx-align-self-end" src={`${user_avatars.thumb}`}
              alt={name}/> : <></>}
          </div>
          <div className="clearfix"></div> 

    </div>
  )
};

export default SentMessageCell;
