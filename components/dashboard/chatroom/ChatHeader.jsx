function ChatHeader({exClass='', conversation, setConversation, listings, setSubject}) {
    const {id, lastMessageTime, thumb, subject, unreadMessage, name} = conversation ?? {
        name: 'Select a conversation'
    }

  return (
    <div><div className={`header ${exClass}`}>
    <div className="d-flex notch-clear h-100">
        {conversation ? <div className="align-self-center">
            <span className="icon icon-l color-theme" onClick={() => {setSubject(null); setConversation(null);}}>
                <i className="fa fa-arrow-left font-13"></i>
            </span>
        </div> : <></>}
        <div className="align-self-center">
            {thumb ? <a href="#" data-menu="menu-user"><img src={thumb} width="31" className="rounded-l"/></a> : <></>}
        </div>
        <div className="align-self-center ps-2 ms-1"> 
            <a href="#" data-menu="menu-user">
                <span className="color-theme d-block font-13 font-800 truncate">{name}</span>
                {lastMessageTime ? <span className="mt-n3 color-blue-dark d-block font-10 mt-1 pt-2 color-blue-dark">{lastMessageTime}</span> : <></>}
            </a>
        </div>
        {/* <div className="align-self-center ms-auto d-flex">
            <a href="#" data-toggle-theme className="icon ms-n2 icon-l color-theme"><i className="fas fa-lightbulb font-12"></i></a>
            <a href="#" data-menu="menu-user-cog" className="icon ms-n2 icon-l color-theme"><i className="fas fa-cog fa-spin font-13"></i></a>
        </div> */}
    </div>

    <div className="px-10 top-0 py-2" style={{overflow:'hidden', overflowX: 'auto'}}>
            <div className='row_flex gap-2 flex-nowrap'>{listings?.length > 0 && listings.map((li) => {
                const {title, slug, id, xtra_large_thumb} = li;
                return <button onClick={() => setSubject(id)} style={{backgroundImage: `url("${xtra_large_thumb}")`}} className="btn btn-m shadow-bg shadow-bg-m mb-0 rounded-s text-uppercase text-nowrap font-900 shadow-s color-white btn-icon text-start">
                <i class="fas fa-chevron-down font-15 text-center"></i>
                <span dangerouslySetInnerHTML={{__html: title.rendered}}/>
              </button>
            })}
            </div>
          </div>
</div></div>
  )
}
export default ChatHeader