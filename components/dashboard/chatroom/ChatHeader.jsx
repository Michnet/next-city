function ChatHeader({exClass='', conversation, setConversation}) {
    const {id, lastMessageTime, thumb, subject, unreadMessage, name} = conversation ?? {
        name: 'Select a conversation'
    }

    console.log('conversation', conversation);
  return (
    <div><div className={`header ${exClass}`}>
    <div className="d-flex notch-clear">
        {conversation ? <div className="align-self-center">
            <span className="icon icon-l color-theme" onClick={() => setConversation(null)}><i className="fa fa-arrow-left font-13"></i></span>
        </div> : <></>}
        <div className="align-self-center">
            {thumb ? <a href="#" data-menu="menu-user"><img src={thumb} width="31" className="rounded-l"/></a> : <></>}
        </div>
        <div className="align-self-center ps-2 ms-1"> 
            <a href="#" data-menu="menu-user">
                <span className="color-theme d-block font-13 font-800 truncate">{name}</span>
                {lastMessageTime ? <span className="mt-n3 color-blue-dark d-block font-10 mt-1 pt-2 color-blue-dark">Active: 15 Minutes Ago</span> : <></>}
            </a>
        </div>
        <div className="align-self-center ms-auto d-flex">
            <a href="#" data-toggle-theme className="icon ms-n2 icon-l color-theme"><i className="fas fa-lightbulb font-12"></i></a>
            <a href="#" data-menu="menu-user-cog" className="icon ms-n2 icon-l color-theme"><i className="fas fa-cog fa-spin font-13"></i></a>
        </div>
    </div>
</div></div>
  )
}
export default ChatHeader