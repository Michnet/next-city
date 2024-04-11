import { siteSettings } from "@/helpers/base"
import Link from "next/link"

const Logo = ({simple, light, dark}) => {
  let styling = {objectFit: 'contain', maxHeight: 35}
  return (
    <div className="site-logo" data-aos="zoom-in">
        <div className={`d-flex flex-row flex-nowrap justify_start align-items-center`}>
        <Link href="/" className="logo_main">
          <div className={`d-flex flex-row flex-nowrap justify_start align-items-center`}>
          {light ? <></> : <img className="_logo_img _dark" src={siteSettings.logo_link} alt="LyveCity" style={styling}/>}
          {dark ? <></> : <img className="_logo_img _light" src={siteSettings.light_logo_link} alt="LyveCity" style={styling}/>}
          <span className={`ml-10 _logo_text fw-bold text-20 color-theme ${simple ? 'd-none d-sm-block' : ''}`}>LyveCity</span>
          </div>
          </Link>
          <Link className="logo_extras color-theme" href={'/about/whats-new'}>
            <span className="app_version ml-10">
              <span className="opacity-50">v</span>
              <span className="text-16 app_version color-highlight">1.3</span>
          </span></Link>
        </div>
    </div>
  )
}
export default Logo