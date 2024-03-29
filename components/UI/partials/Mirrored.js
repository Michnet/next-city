const Mirrored = ({children, side, coverTop=false, YDistance, XDistance, gap, skewDir=null, skewDegrees=null, topPadding, shade='#fff'})=> {
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
  
  
    return <div  className={`mirror_box side_${processLayout()}`} style={{marginTop:coverTop ? `-${topPadding}` : 0, paddingTop: topPadding && !coverTop ? topPadding : '0'}}>
            {coverTop && <div className="obj_cover position-absolute top-0 z-1 w-100" style={{background: shade, height : topPadding ?? 0}}/>}
  
      <div className={'obj'} style={{margin: gap ?? 0, transform: `skewY(${dir}${skewDeg}deg)`}}>
        {children}
      </div>
      <div className="mirror" style={{maxHeight:YDistance ?? '100%', maxWidth: XDistance ?? '100%', transform: `scale${processLayout()}(-1) skewY(${oppDir}${skewDeg}deg)`}}>{children}</div>
      </div>
  }

  export default Mirrored;