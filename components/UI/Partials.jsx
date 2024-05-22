import { siteColors } from "@/helpers/base"
import { randomEither } from "@/helpers/universal"
import { useRouter } from "next/router"

export function DualColorHeader({title, subTitle, iconClass, colorClass, desc, exClass}) {
  return (
    <div className={`d-flex pb-2 align-items-center gap-2  ${exClass ?? ''}`}>
        {iconClass ? <div className="align-self-center ms-auto">
          {iconClass && <i className={`opacity-40 ${iconClass} font-24 ${colorClass}`}></i>}
        </div> : <></>}
        <div>
            {<h6 className="mb-n1 opacity-80 color-highlight">{subTitle}</h6>}
            <h3>{title}</h3>
            {desc && <p>{desc}</p>}
        </div>
    </div>
  )
}
export const ActiveQueryOption = ({query, queryKey, label}) => {
  return <>
  <div className="active_slection mb-2">
      <span className="text-12 text-light-1 d-block">{label ?? 'Current Selection'}</span> 
      <span className="text-success text-capitalize">{query[`${queryKey}`].replaceAll("-", " ")}</span>
      </div>
  </>
}
export const Floater = ({primText, secText, exClass}) =>{
  return (
    <div className={`floater ${exClass}`}>
      <h4 className="prim_text">{primText}</h4>
      {secText && <h5>{secText}</h5>}
    </div>
  )
}
export const SocialLinks = ({links, iconsOnly=true}) => {
  
  return <div className="links_container">
      <div className="links_box">
        {links.map((el) => {
          const {network, url} = el;
          return <a target={'_blank'} href={url} className="link_link">
            <i className={`fab fa-${network.toLowerCase()} color-${network.toLowerCase()}`}/>
          </a>
        })}
      </div>
  </div>
}

export function SectionHeader({linkPath, linkQuery, inverted = false, bigIcon = true, title, subTitle, link, linkUrl='#', iconClass, color, desc, exClass=''}){
  const router = useRouter();
  return (
    <div className={`section_header d-flex pb-2 ${exClass}`}>
        {iconClass && <div className={`align-self-center ${bigIcon ? 'pe-1' : 'pe-3'}`}>
          {bigIcon ? 
            <span className={`icon icon-xs bg-transparent _big`}>
              <i className={`${iconClass} color-${color ?? 'theme'}`}/>
              </span> 
            : 
            <span className={`icon icon-xs rounded-m bg-${color ? inverted ? color : 'white' : 'transparent'}`}><i className={`${iconClass} color-${color ? inverted ? 'white' : color : 'theme'}`}></i>
          </span>}
        </div>}
        <div className="align-self-center">
          <p className="mb-n2 mt-n1 font-700 font-11 color-highlight">{subTitle}</p>
          <h3 className="font-700 mb-0">{title}</h3>
        </div>
        {linkPath ? <div className="align-self-center ms-auto me-2">
           <button onClick={() => router.push({ pathname: linkPath, query: linkQuery })}>{link}</button>
        </div> : <></>}
    </div>
  )
}


export const ListingMeta = ({location, duration, filled}) => {
  return <div className="listing_meta">
            {duration ? <p className="lh-13 text-truncate">
              <span className="lh-1"><i className={`bi bi-clock${filled ? '-fill' : ''} mr-5 sec-color`}></i></span>
              {duration}+ hours
            </p> : null}
            {location ? <p className="lh-13  text-truncate">
              <span className="lh-1"><i className={`bi bi-geo-alt${filled ? '-fill' : ''} mr-4`}></i></span>{location}
            </p> : null}
          </div>
}

export  const CustomRow = ({exClass, headContent, bodyContent, sideContent}) => {
  return (
      <section className={`custom_section ${exClass} ${sideContent ? 'with_side' : ''}`}>
        {sideContent && <>{sideContent}</>}
          
          <div className="row_content">
              
              {headContent && <div className="head_content">
                  {headContent}
              </div>}
              <div className="body_content">
                  {bodyContent}
              </div>
          </div>

      </section>
  )
}

export const ListingMetaMini = ({page_views, ratings, exClass, page_likes, filled, colors}) => {
  return <div className={`listing_meta _mini ${exClass ?? ''}`}>
            <ul className={`mb-0 gx-text-truncate _meta w-auto d-flex align-items-center`}>
                {page_likes ? <li><i className={`bi bi-suit-heart${filled ? '-fill' : ''} mr-4`} style={{color: colors ? `color-${randomEither(siteColors)}-dark` : 'initial'}}></i>{page_likes}</li> : null}
                {ratings ? <li><i className={`bi bi-star${filled ? '-fill' : ''}  mr-4`} style={{color: colors ? `color-${randomEither(siteColors)}-dark` : 'initial'}}/> {ratings} </li> : null}
                {page_views ? <li><i className={`bi bi-eye${filled ? '-fill' : ''} mr-4`} style={{color: colors ? `color-${randomEither(siteColors)}-dark` : 'initial'}}></i>{page_views}</li> : null}
            </ul>
          </div>
}

export function PreviousRouteLink() {
    const router = useRouter()
   
    return (
      <button className="nav_switch" type="button" onClick={() => router.back()}>
        <i className="bi bi-chevron-left"/>
      </button>
    )
  }

  export const Avatar = ({alt, src, width, rounded, height, style, imgClass, hideOnEmpty=true, exClass=''}) => {
    return <div className={`border-wrap _avatar ${exClass}`} style={{borderRadius: rounded ? '50%' : 0}}><img onError={(e) => {hideOnEmpty ? e.target.style.display = "none" : e.target.src = '/images/bg/fallback.jpg'}} className={imgClass ?? ''} src={src} alt={alt} style={{objectFit:'cover', minWidth: width ? width : 20, width: width ?? 35, borderRadius: rounded ? '50%' : '0', height: rounded ? width : height ?? 35, ...style}}/></div>
  }
  

