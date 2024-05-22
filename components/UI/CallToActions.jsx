const CallToActions = ({actionComponent, exClass='m-0', centered, title, descript, icon, light, bgClass='bg-theme', border, thin, noPadLeft}) => {
    return (
      <>
      <section className={`cta card card-style ${exClass} ${border ? 'border' : ''} ${thin ? '' : 'layout-pt-md layout-pb-md'} position-relative ${bgClass}`}>
        <div className={`container py-24 mw-100 ${noPadLeft ? 'pl-0' : ''}`}>
          <div className={`row ${centered ? 'text-center justify-center' : 'justify-between'} items-center`}>
            <div className="col-auto px-0 mb-3">
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
  