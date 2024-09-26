import { siteColors } from "@/helpers/base"
import { randomEither } from "@/helpers/universal"

function NavItemCard({buttony=false, randomColor=false, faClass='fal', subTitle, title, badgeClass, badgeNumber, icon, exClass=''}) {


  return (
    <>
        {/* <i className="fa fa-angle-right "/>
        <i className="fa fa-angle-left "/> */}
        <div className={`card card-style text-left m-0 w-fit overflow-visible ${exClass}`}>
            <div className="d-flex align-items-center it_box">
                <div className="it_icon">
                    {/* <img src={thumbnail} className="object-cover rounded-sm me-3" width="70" height="70"/> */}
                    <i className={`${faClass} ${icon ?? 'far fa-square'} bg-transparent rounded link_icon me-2 ${randomColor ? 'color-'+randomEither(siteColors)+'-dark' : ''}`}/>
                </div>
                <div className="it_text flex-shrink-1 minw-0">
                {<span className="pt-0 text-uppercase  text-nowrap truncate nav_i_title">
                  {title}{badgeNumber > 0 ? <span style={{marginTop: '0 !important'}} className={`position-absolute top-0 end-0 badge rounded-pill ${badgeClass ?? 'bg-info'}`}>
                        {badgeNumber}
                    </span> : <></>}
                  </span>}
                    <span className="fw-400 color-theme opacity-50 lh-1 text-nowrap truncate nav_i_subtitle">{subTitle}</span>
                </div>
            </div>
        </div>
    </>
  )
}
export default NavItemCard 