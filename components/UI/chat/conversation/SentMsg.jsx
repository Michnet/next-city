import { localiseDate } from "@/helpers/universal";
import dayjs from "dayjs";
// import { Avatar } from "~/appComponents/components/UI/components";
// import { localiseDate } from "~/server/UniversalFunctions";
import { Avatar } from "../../Partials";
var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime);


const SentMessageCell = ({conversation, user}) => {
  const {message, date_sent,name} = conversation ?? {};
  let avatarUrl = null;
  if(user){
    const {avatar_urls} = user;
    avatarUrl = avatar_urls['48'];
  }

  return (
    <div className="gx-chat-item gx-flex-row-reverse">

      {avatarUrl && <Avatar rounded width={35} className="gx-align-self-end" src={`${avatarUrl}`}
              alt={conversation.name}/>}

      <div className="gx-bubble-block">
        <div className="gx-bubble">
{/*           <div className="gx-message">{conversation.message}</div> */}
          <div className="gx-message"   dangerouslySetInnerHTML={{   __html: conversation.message.rendered }} />
          <div className="gx-time gx-text-muted gx-text-right gx-mt-2">{dayjs(localiseDate(conversation.date_sent, null)).fromNow()}</div>
        </div>
      </div>

    </div>
  )
};

export default SentMessageCell;
