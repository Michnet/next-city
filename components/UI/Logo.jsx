import { siteSettings } from "@/helpers/base"
import Link from "next/link"

const Logo = ({simple, light, dark, noVersion=false}) => {
  let styling = {objectFit: 'contain', maxHeight: 35}
  return (
    <div className="site-logo" data-aos="zoom-in">
        <div className={`d-flex flex-row flex-nowrap justify_start align-items-center h-100`}>
        <Link href="/" className="logo_main">
          <div className={`d-flex flex-row flex-nowrap justify_start align-items-center`}>
          {light ? <></> : <img className="_logo_img _dark" src={siteSettings.logo_link} alt="LyveCity" style={styling}/>}
          {dark ? <></> : <img className="_logo_img _light" src={siteSettings.light_logo_link} alt="LyveCity" style={styling}/>}
          <span className={`ml-5 _logo_text fw-bold text-20 color-theme ${simple ? 'd-none' : ''}`}>LyveCity</span>
          </div>
          </Link>
          {!noVersion && <Link className="logo_extras color-theme" href={'/about/whats-new'}>
            <span className="app_version ml-5">
              <span className="opacity-50">v</span>
              <span className="text-16 app_version color-highlight">{siteSettings.app_version}</span>
          </span></Link>}
        </div>
    </div>
  )
}
export default Logo