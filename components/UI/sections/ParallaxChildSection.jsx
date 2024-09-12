import { srcWithFallback } from "@/helpers/universal"
import { ParallaxBanner } from "react-scroll-parallax"

const ParallaxChildSection = ({bg,  speed= -10, expanded=false, translateY= [0, 50], translateX= [0, 0], children, dark=false, exClass='', faintBg=false, styleObj = {}, childExClass='', underLay=false}) => {
    let locStyle = {height: 'fit-content', ...styleObj}
  
    const childComponent = {
      translateY: translateY,
      translateX: translateX,
      //opacity: faintBg ? [0.3, 0.4] : [1, 0.8],
      //scale: [1.35, 1.2, "easeOutCubic"],
      speed:  speed,
      shouldAlwaysCompleteAnimation: true,
      expanded: expanded,
      children: (
        <div className={`position-relative child_content inset-0 h-100 w-100 d-flex items-center justify-center ${childExClass}`}>
          {children}
        </div>
      )
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
      layersArray = [gradientOverlay, childComponent];
    }else{
      layersArray = [childComponent, gradientOverlay];
    }

  
    return (
      <ParallaxBanner className={`aspect-[2/1] bg-gray-900 parx_section ${exClass} ${faintBg ? 'faintBg' : ''} ${dark ? 'dark' : ''}`} style={{...locStyle}}
        layers={[...layersArray]}
      />
    )
  }

  export default ParallaxChildSection;
  