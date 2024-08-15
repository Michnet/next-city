function NavItem({buttony=false, subTitle, title, badgeClass, badgeNumber, icon}) {
  return (
    <>
        <i className={`${icon ?? 'far fa-square'} bg-transparent rounded opacity-50 link_icon`}></i>
        <span className="truncate">{buttony ? subTitle : title}
                    {badgeNumber > 0 ? <span style={{marginTop: '0 !important'}} className={`position-absolute top-0 end-0 badge rounded-pill ${badgeClass ?? 'bg-info'}`}>
                        {badgeNumber}
                    </span> : <></>}</span>
        <i className="fa fa-angle-right "/>
        <i className="fa fa-angle-left "/>
    </>
  )
}
export default NavItem 