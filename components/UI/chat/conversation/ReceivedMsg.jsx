import dayjs from "dayjs";
import { Avatar } from "../../Partials";
import { localiseDate } from "@/helpers/universal";
var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)

const ReceivedMessageCell = ({conversation, setSubject}) => {
  const {message, date_sent,name, sender_data, subject} = conversation ?? {};
  const {user_avatars} = sender_data ?? {}

  console.log('coond', conversation)


  return (

        <div className="gx-chat-item">
              
        <div className='row_flex gap-2 ps-2'>
        {user_avatars?.thumb ? <Avatar rounded width={35} className="gx-align-self-end" src={`${user_avatars.thumb}`}
            alt={name}/> : <></>}
        <div className="d-flex align-items-end flex-column">
          <div className="speech-bubble speech-right color-black mb-0 _link" dangerouslySetInnerHTML={{   __html: message.rendered }} onClick={() => setSubject(subject.rendered)}/>
          <span className='msg_meta opacity-40 text-11'>{dayjs(localiseDate(date_sent, null)).fromNow()}</span>

          </div>
        </div>
        <div className="clearfix"></div> 

</div>
  )
};

export default ReceivedMessageCell;
