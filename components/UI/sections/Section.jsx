import { srcUrlWithFallback} from "@/helpers/universal";
import { ParallaxBanner, ParallaxBannerLayer } from "react-scroll-parallax";


function Section({overlay=true, sideImg, fullWidth=false, children, dark=false, id='', exClass='', bgUrl, title, exContainerClass='', containerStyle={}}) {
    let locStyle = {}
    /* if(bgUrl){
        locStyle.background = `url(${bgUrl})`
    } */

  return (
    <section id={id} className={`section_container position-relative bg-cover bg-center ${!dark ? '_light' : ''} ${sideImg ? 'sec_sideImg' : ''} ${exClass}`} style={{...locStyle}}>
        {/* {bgUrl && <div className="bg-cover bg-fixed bg-center position-absolute h-100 w-100 z-0" style={{background: srcUrlWithFallback(bgUrl)}}/>} */}
        {bgUrl && <ParallaxBanner className="z-0 position-absolute h-100 w-100" style={{ aspectRatio: '2 / 1' }}>
            <ParallaxBannerLayer translateY = {[0,50]}
      translateX = {[0, 10]}
      //opacity: faintBg ? [0.3, 0.4] : [1, 0.8],
      scale = {[1.0, 1.9, "easeOutCubic"]} shouldAlwaysCompleteAnimation ={true} expanded={true} speed={-20} opacity={[1, 1]} className="h-100 w-100" /* speed={-20} */>
                {/* <img className="h-100 w-100" src={bgUrl} onError={(e) => {e.target.src = '/images/bg/fallback2-md.jpg'}}/> */}
                <div className="bg-cover bg-center h-100 w-100 z-0" style={{background: srcUrlWithFallback(bgUrl)}}/>
            </ParallaxBannerLayer>
            </ParallaxBanner>}
        {overlay && <div className={`position-absolute w-100 h-100 left-0 top-0 z-0 ${dark ? 'bgDarkTransparent2' : 'bg-theme-transparent-0'}`}/>}
        
        <div className={`sect_content position-relative z-1 mx-auto ${exContainerClass}`} style={{maxWidth: fullWidth ? '100%' : '800px'}}>
            {sideImg && <div className="sideImg bg-cover bg-center" style={{minWidth: '30%', background: `${srcUrlWithFallback(bgUrl)}`, ...locStyle}}/>}
            <div>
            {title && <div className="row">
            <div className="col-md-6 offset-md-3 text-center" data-aos='fade-up'>
                <h2 className='text-30 mb-0'>{title}</h2>
                <div className="separator"><span><i className="fa fa-circle"></i></span></div>
            </div>
        </div>}
                {children}
            </div>
        </div>
    </section>
  )
}
export default Section