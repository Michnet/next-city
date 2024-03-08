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
  

