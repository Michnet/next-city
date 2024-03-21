import dayjs from "dayjs";
import { Avatar } from "../../Partials";
import { localiseDate } from "@/helpers/universal";
var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)

const ReceivedMessageCell = ({conversation, user}) => {
  return (
    <div className="gx-chat-item">

      {user?.thumb ? <Avatar className="gx-align-self-end" src={user.thumb}
              alt=""/> : <></>}

      <div className="gx-bubble-block">
        <div className="gx-bubble">
          <div className="gx-message"   dangerouslySetInnerHTML={{   __html: conversation.message.rendered }} />
          <div className="gx-time gx-text-muted gx-text-right gx-mt-2">{dayjs(localiseDate(conversation.date_sent, null)).fromNow()}</div>
        </div>
      </div>

    </div>
  )
};

export default ReceivedMessageCell;
