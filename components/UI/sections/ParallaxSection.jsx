import { ParallaxBanner } from "react-scroll-parallax"

const ParallaxSection = ({bg, children, Dark=false, exClass='', faintBg=false, styleObj = {}, childExClass='', underLay=false, overLay=true}) => {
    let locStyle = {height: 'fit-content', ...styleObj}
    const background = {
      image: bg ?? "https://s3-us-west-2.amazonaws.com/s.cdpn.io/105988/banner-background.jpg",
      translateY: [0, 50],
      opacity: faintBg ? [0.3, 0.4] : [1, 0.6],
      scale: [1.15, 1, "easeOutCubic"],
      shouldAlwaysCompleteAnimation: false
    }
  
    const childComponent = {
      translateY: [0, 10],
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
    }else if(overLay){
      layersArray = [background, childComponent, gradientOverlay];
    }

  
    return (
      <ParallaxBanner className={`aspect-[2/1] bg-gray-900 parx_section ${exClass} ${faintBg ? 'faintBg' : ''} ${Dark ? 'dark' : ''}`} style={{...locStyle}}
        layers={[...layersArray]}
      />
    )
  }

  export default ParallaxSection;
  