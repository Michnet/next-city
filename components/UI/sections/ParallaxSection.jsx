import { srcWithFallback } from "@/helpers/universal"
import { ParallaxBanner } from "react-scroll-parallax"

const ParallaxSection = ({bg, translateY= [0, 50], translateX= [0, 0], children, dark=false, exClass='', faintBg=false, styleObj = {}, childExClass='', underLay=false}) => {
    let locStyle = {height: 'fit-content', ...styleObj}
    const background = {
      image: srcWithFallback(bg),
      translateY: translateY,
      translateX: translateX,
      //opacity: faintBg ? [0.3, 0.4] : [1, 0.8],
      //scale: [1, 1.2, "easeOutCubic"],
      shouldAlwaysCompleteAnimation: true
    }
  
    const childComponent = {
      translateY: [0, 0],
      scale: [1, 1, "easeOutCubic"],
      shouldAlwaysCompleteAnimation: true,
      expanded: false,
      children: (
        <div className={`position-relative child_content inset-0 h-100 w-100 d-flex items-center justify-center ${childExClass}`}>
          {children}
        </div>
      )
    }
  
    const foreground = {
      image:
        "https://s3-us-west-2.amazonaws.com/s.cdpn.io/105988/banner-foreground.png",
      translateY: [0, 15],
      scale: [1, 1.1, "easeOutCubic"],
      shouldAlwaysCompleteAnimation: true
    }
  
    const gradientOverlay = {
      opacity: faintBg ? [0.5, 1] : [0, 0.9],
      shouldAlwaysCompleteAnimation: true,
      expanded: false,
      children: (
        <div className="gradientOverlay absolute inset-0 bg-gradient-to-t from-gray-900 to-blue-900" />
      )
    }

    let layersArray = [];
    if(underLay){
      layersArray = [background, gradientOverlay, childComponent];
    }else{
      layersArray = [background, childComponent, gradientOverlay];
    }

  
    return (
      <ParallaxBanner className={`aspect-[2/1] bg-gray-900 parx_section ${exClass} ${faintBg ? 'faintBg' : ''} ${dark ? 'dark' : ''}`} style={{...locStyle}}
        layers={[...layersArray]}
      />
    )
  }

  export default ParallaxSection;
  