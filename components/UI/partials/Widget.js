const Widget = ({title, freeHeader=false, styleObj={}, bodyClass='', dataAos = null, subtitle, children, exClass='m-0', cover, coverClass='', extra, actions, icon, headless, width}) => {
    let widgetView;
    if(cover){
      styleObj.backgroundImage = `url('${cover}')`
    }
      widgetView = <div data-aos={dataAos}>{freeHeader && <>
                  {title || subtitle  ? <div className="py-2 px-3">
                      <div className="d-flex pb-2">
                          <div>
                              {subtitle && <h6 className="mb-n1 opacity-80 color-highlight">{subtitle}</h6>}
                              <h3>{title}</h3>
                          </div>
                          <div className="align-self-center ms-auto">
                          {icon && <i className={`${icon} font-24 color-red-dark`}/>}
                          </div>
                      </div>
                      </div> : <></>}</>}
        <div className={`card card-style ${exClass} ${title || subtitle ? 'headed' : ''}`} style={{...styleObj}}>
                    <div className={`content m-0 p-0 ${cover ? 'bg-theme-transparent' : ''} ${coverClass}`}>
                      {!freeHeader && <>{title || subtitle  ? <div className="card-header py-2">
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
                      </>}
                      <div className={`card-body ${bodyClass}`}>
                        {children}
                      </div>
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