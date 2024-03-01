export const LoaderDualRing = ({exClass}) => {
    return (
      <div class={`loader-dual-ring ${exClass ?? ''}`}></div>
    )
  }
  
  export const LoaderDualRingBoxed = ({exClass, height}) => {
    return (
      <div className={`${height ? "" : 'h-100'} w-100 d-flex justify-center align-items-center`} style={{height: height ?? 'auto'}}><div class={`loader-dual-ring ${exClass ?? ''}`}/></div>
    )
  }
  
  export const LoaderSiteLogo = ({exClass}) => {
    return (
      <div className="h-100 w-100 d-flex justify-center align-items-center"><img src="/images/Lyvecity.png"/></div>
    )
  }
  
  export const LoaderEllipsis = () => {
    return (
      <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
    )
  }
  
  
  export const LoaderRipple = () => {
    return (
      <div class="lds-ripple"><div></div><div></div></div>
    )
  }