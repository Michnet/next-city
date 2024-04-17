const Widget = ({title, subtitle, children, exClass='', cover, coverClass='', extra, actions, icon, headless, width}) => {
    let widgetView;
    let styleObj = {}
    if(cover){
      styleObj.backgroundImage = `url('${cover}')`
    }
      widgetView = <div class={`card card-style m-0 ${exClass} ${title || subtitle ? 'headed' : ''}`} style={{...styleObj}}>
                    <div className={`content m-0 p-0 ${cover ? 'bg-theme-transparent' : ''} ${coverClass}`}>
                      {title || subtitle  ? <div class="card-header py-2">
                      <div className="d-flex pb-2">
                          <div>
                              {subtitle && <h6 className="mb-n1 opacity-80 color-highlight">{subtitle}</h6>}
                              <h3>{title}</h3>
                          </div>
                          <div className="align-self-center ms-auto">
                          {icon && <i className={`${icon} font-24 color-red-dark`}/>}
                          </div>
                      </div>
                      </div> : <></>}
                      <div class="card-body">
                        {children}
                      </div>
                    </div>
                  </div>
  
    return (
      <>
      {widgetView}
      </>
    )
  };
  
  export default Widget;