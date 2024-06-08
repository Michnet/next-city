import { randomBetween, randomEither } from "@/helpers/universal";

const Mirrored = ({children, objClass='', objBg=null, side, coverTop=false, YDistance='100%', XDistance = '100%', gap = 0, skewDir=null, skewDegrees=null, topPadding, shade='#fff'})=> {
    function processLayout(){
      switch (side) {
        case 'below':
          return 'Y';
        case 'right':
          return 'X';
        default:
          return  'Y';
      }
    }
  
    let skewDeg = skewDegrees ?? randomBetween(6, 10), dir = skewDir ?? randomEither(['-', '+']), oppDir = dir == '-' ? '+' : '-';
    let objStyle = {marginBottom: gap, transform: `skewY(${dir}${skewDeg}deg)`}
    if(objBg){
        objStyle.background = `url(${objBg})`;
    }
  
    return <div  className={`mirror_box side_${processLayout()}`} style={{marginTop:coverTop ? `-${topPadding}` : 0, paddingTop: topPadding && !coverTop ? topPadding : '0'}}>
            {coverTop && <div className="obj_cover position-absolute top-0 z-1 w-100" style={{background: shade, height : topPadding ?? 0}}/>}
  
      <div className={`obj ${objClass}`} style={{...objStyle}}>
        {children}
      </div>
      <div className="mirror" style={{width:XDistance, maxHeight:YDistance, maxWidth: XDistance, transform: `scale${processLayout()}(-1) skewY(${oppDir}${skewDeg}deg)`}}>{children}</div>
      </div>
  }

  export default Mirrored;