export const BSModal = ({centered, noPadding, content, noOverlay, modal_id, title, btnLabel, btnClass, modalClass, footerFunc, footerLabel, trigger, transparent, children}) => {

    return <>
              <div data-bs-backdrop={noOverlay ? "false" : "true"} style={{display: 'none'}} className={`modal fade ${modalClass ?? ''}`} id={modal_id} tabindex="-1" aria-labelledby="modalLabel" aria-hidden="true">
                <div className={`modal-dialog modal-dialog-scrollable modal-fullscreen-sm-down ${centered ? 'modal-dialog-centered' : ''}`}>
                  <div className={`modal-content ${transparent ? 'bg-transparent' : ''}`}>
                    <div className="modal-header">
                      {title && <h5 className="modal-title" id="modalLabel">{title}</h5>}
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className={`modal-body ${noPadding ? 'p-0' : ''}`}>
                      {children ?? content}
                    </div>
                    {footerFunc ? <div className="modal-footer">
                       <button type="button" className="btn btn-theme" onClick={() => footerFunc()}>{footerLabel}</button> 
                    </div>
                    : <></>}
                  </div>
                </div>
              </div>
              {trigger ? <button data-bs-toggle="modal"  data-bs-target={`#${modal_id}`}>{trigger}</button> : <>{btnLabel && <button type="button" className={`btn ${btnClass ?? 'btn-theme'}`} data-bs-toggle="modal"  data-bs-target={`#${modal_id}`}>
                {btnLabel}
              </button>}
              </>}
            </>
    }