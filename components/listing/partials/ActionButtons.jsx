export const BookingView = ({text = null, exClass, children, simple=true, setActiveKey, activeKey='private-chat'}) => {
    if(children){
       return <div onClick={() => setActiveKey(activeKey)}> {children} </div>
     }else{
       return <button onClick={() => setActiveKey(activeKey)} className={`booking_view btn shadow-bg shadow-bg-sm  mr-0 ${!simple ? 'ui-2' : 'bg-theme hover-bg-theme border-light hover-color-white'} animated ${exClass ?? ''}`}>{text?.length > 0 ? text : 'Booking Options'}</button>;
     }
  }