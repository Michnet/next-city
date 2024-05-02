export const LoaderDualRing = ({exClass, size}) => {
    return (
      <div style={{width : size ?? 50, height : size ?? 50}} className={`loader-dual-ring ${exClass ?? ''}`}></div>
    )
  }
  
  export const LoaderDualRingBoxed = ({exClass, height}) => {
    return (
      <div className={`${height ? "" : 'h-100'} w-100 d-flex justify-center align-items-center`} style={{height: height ?? 'auto'}}><div className={`loader-dual-ring ${exClass ?? ''}`}/></div>
    )
  }
  export const LoaderRingBoxed = ({exClass, height}) => {
    return (
      <div className={`${height ? "" : 'h-100'} w-100 d-flex justify-center align-items-center`} style={{height: height ?? 'auto'}}>
        <div className="spinner-border color-highlight" role="status"></div>
      </div>
    )
  }
  
  export const LoaderSiteLogo = ({exClass}) => {
    return (
      <div className="h-100 w-100 d-flex justify-center align-items-center"><img src="/images/Lyvecity.png"/></div>
    )
  }
  
  export const LoaderEllipsis = () => {
    return (
      <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
    )
  }
  
  
  export const LoaderRipple = () => {
    return (
      <div className="lds-ripple"><div></div><div></div></div>
    )
  }

  export const CircularProgress = ({className}) => <div className={`loader ${className}`}>
  {/* <img src="/images/loader.svg" alt="loader" style={{height: 60}}/> */}
  <div class={`loader-dual-ring`}></div>
</div>;