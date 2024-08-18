function NavItemCard({buttony=false, subTitle, title, badgeClass, badgeNumber, icon, exClass=''}) {
  return (
    <>
        {/* <i className="fa fa-angle-right "/>
        <i className="fa fa-angle-left "/> */}



        <div className={`card card-style text-left px-2 ps-3 py-1 pb-2 m-0 w-fit overflow-visible ${exClass}`}>
            <div className="d-flex align-items-center">
                <div className="it_icon">
                    {/* <img src={thumbnail} className="object-cover rounded-sm me-3" width="70" height="70"/> */}
                    <i className={`fal ${icon ?? 'far fa-square'} bg-transparent rounded opacity-50 link_icon me-2`}/>
                </div>
                <div className="it_text flex-shrink-1 minw-0">
                {<span className="d-block pt-0 text-uppercase font-12 text-nowrap truncate nav_i_title">
                  {title}{badgeNumber > 0 ? <span style={{marginTop: '0 !important'}} className={`position-absolute top-0 end-0 badge rounded-pill ${badgeClass ?? 'bg-info'}`}>
                        {badgeNumber}
                    </span> : <></>}
                  </span>}
                    <span className="font-11 fw-400 d-block color-theme opacity-50 lh-1 text-nowrap truncate nav_i_subtitle">{subTitle}</span>
                </div>
            </div>
        </div>
    </>
  )
}
export default NavItemCard 