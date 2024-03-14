import { useRouter } from "next/router"

export function DualColorHeader({title, subTitle, iconClass, colorClass = '', desc, exClass}) {
  return (
    <div className={`d-flex pb-2 border-bottom mb-3 ${exClass ?? ''}`}>
        <div>
            {subTitle && <h6 className="mb-n1 opacity-80 color-highlight">{subTitle}</h6>}
            <h3>{title}</h3>
        </div>
        <div className="align-self-center ms-auto">
        {iconClass && <i className={`bi bi-${iconClass} font-24 ${colorClass}`}></i>}
        </div>
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


export const ListingMetaMini = ({page_views, ratings, exClass, page_likes, filled}) => {
  return <div className={`listing_meta _mini ${exClass ?? ''}`}>
            <ul className={`mb-0 gx-text-truncate _meta w-auto d-flex align-items-center`}>
                {page_likes ? <li><i className={`bi bi-suit-heart${filled ? '-fill' : ''} mr-4`}></i>{page_likes}</li> : null}
                {ratings ? <li><i className={`bi bi-star${filled ? '-fill' : ''}  mr-4`}/> {ratings} </li> : null}
                {page_views ? <li><i className={`bi bi-eye${filled ? '-fill' : ''} mr-4`}></i>{page_views}</li> : null}
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

  export const Avatar = ({alt, src, width, rounded, height, style, imgClass}) => {
    return <div className="border-wrap _avatar" style={{borderRadius: rounded ? '50%' : 0}}><img className={imgClass ?? ''} src={src} alt={alt} style={{objectFit:'cover', minWidth: width ? width : 20, width: width ?? 35, borderRadius: rounded ? '50%' : '0', height: rounded ? width : height ?? 35, ...style}}/></div>
  }
  

