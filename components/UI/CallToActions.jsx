const CallToActions = ({actionComponent, exClass, centered, title, descript, icon, light, bgClass, border, thin, noPadLeft}) => {
    return (
      <>
      <section className={`cta ${exClass ?? ''} ${border ? 'border' : ''} ${thin ? '' : 'layout-pt-md layout-pb-md'} position-relative ${bgClass ?? 'bg-secondary'}`}>
        <div className={`container mw-100 ${noPadLeft ? 'pl-0' : ''}`}>
          <div className={`row y-gap-30 ${centered ? 'text-center justify-center' : 'justify-between'} items-center`}>
            <div className="col-auto px-0">
              <div className="row y-gap-20  flex-wrap items-center">
                {icon && <div className="col-auto cta_icon_col">
                  <i className={`bi ${icon ?? 'bi-megaphone'} text-sec-theme cta_icon`}/>
                </div>}
                <div className={`col-auto ${noPadLeft ? 'pl-0' : ''}`}>
                  {title && <h4 className={`cta-title fw-bold ${light ? '' : 'text-white'}`}>
                    {title ?? <></>}
                  </h4>}
                  <div className={`cta-descript ${light ? '' : 'text-white'}`}>
                    {descript ?? <></>}
                  </div>
                </div>
              </div>
            </div>
  
            <div className={`col-auto ${noPadLeft ? 'pl-0' : ''}`}>
            {actionComponent}
            </div>
          </div>
        </div>
      </section>
      </>
    );
  };
  
  export default CallToActions;
  