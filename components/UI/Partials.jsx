import { siteColors } from "@/helpers/base"
import { randomEither } from "@/helpers/universal"
import { Client } from "react-hydration-provider";
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
            {desc && <p className="opacity-70">{desc}</p>}
        </div>
    </div>
  )
}
export function SlickArrow(props) {
  let className =
    props.type === "next"
      ? "slick_arrow-between slick_arrow -next arrow-md flex-center button -blue-1 bg-white shadow-1 size-30 rounded-full sm:d-none js-next"
      : "slick_arrow-between slick_arrow -prev arrow-md flex-center button -blue-1 bg-white shadow-1 size-30 rounded-full sm:d-none js-prev";
  className += " arrow";
  const char =
    props.type === "next" ? (
      <>
        <i className="icon icon-chevron-right text-12"></i>
      </>
    ) : (
      <>
        <span className="icon icon-chevron-left text-12"></span>
      </>
    );
  return (
    <button className={className} onClick={props.onClick}>
      {char}
    </button>
  );
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
export const SocialLinks = ({links, iconsOnly=true, exClass=''}) => {
  
  return <div className={`links_container links_box gap-3 d-flex ${exClass}`}>
        {links.map((el) => {
          const {network, url} = el;
          return <>{/* <a target={'_blank'} href={url} className={`link_link bg-${network.toLowerCase()}`}>
            <i className={`fab fa-${network.toLowerCase()} color-${network.toLowerCase()}`}/>
            {!iconsOnly && <span className={`ms-1 color-white}`}>{network}</span>}
          </a> */}

          <a target={'_blank'} href={url} className={`shadow-bg shadow-bg-s mb-3 text-start btn btn-m btn-full  btn-icon rounded-s text-uppercase font-700 bg-${network.toLowerCase()}`}><i className={`fab fa-${network.toLowerCase()} text-center`}></i> {network}</a>
          </>
        })}
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
           <h3 className="font-700 mb-0 _title">{title}</h3>
          <p className="mb-n1 font-700 font-11 _subtitle">{subTitle}</p>
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

export const ListingMetaMini = ({page_views, ratings, exClass, page_likes, filled, colors, listExClass='align-items-center'}) => {
  return <div className={`listing_meta _mini ${exClass ?? ''}`}>
            <Client><ul className={`mb-0 gx-text-truncate _meta w-auto d-flex  ${listExClass}`}>
                {page_likes ? <li><i className={`bi bi-suit-heart${filled ? '-fill' : ''} mr-4 ${colors ? `color-${randomEither(siteColors)}-dark` : ''}`}></i>{page_likes}</li> : null}
                {ratings ? <li><i className={`bi bi-star${filled ? '-fill' : ''}  mr-4 ${colors ? `color-${randomEither(siteColors)}-dark` : ''}`}/> {ratings} </li> : null}
                {page_views ? <li><i className={`bi bi-eye${filled ? '-fill' : ''} mr-4 ${colors ? `color-${randomEither(siteColors)}-dark` : ''}`}></i>{page_views}</li> : null}
            </ul>
            </Client>
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
  

