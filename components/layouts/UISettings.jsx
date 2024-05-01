import {memo } from "react";
import { closeMenus, openOffCanvas, toggleTheme } from "@/helpers/appjs";

function UISettingsConst({exClass=''}) {

  return (
            <div className={`content m-0 ${exClass}`}>
              <div className="list-group list-custom-small">
                <div
                  //data-trigger-switch="switch-dark-mode"
                  className="pb-2 _link"
                >
                  <i className="fa font-12 fa-moon rounded-s bg-highlight color-white me-3"></i>
                  <span className='hide_in_collapsed'>Dark Mode</span>
                  <div className="custom-control scale-switch ios-switch hide_in_collapsed">
                    <input
                      data-toggle-theme onClick={() => toggleTheme()} 
                      type="checkbox"
                      className="ios-input"
                      id="switch-dark-mode"
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="switch-dark-mode"
                    ></label>
                  </div>
                  <i className="fa fa-angle-right hide_in_collapsed"></i> 
                </div>
              </div>
              <div className="list-group list-custom-large">
                <span className="link" data-menu="menu-highlights"  onClick={(e) => openOffCanvas(e)}>
                  <i className="fa font-14 fa-tint bg-green-dark rounded-s"></i>
                  <span className='hide_in_collapsed'>Theme Color</span>
                  <strong className='hide_in_collapsed'>16 Options Included</strong>
                  <span className="badge bg-highlight color-white hide_in_collapsed">HOT</span>
                  <i className="fa fa-angle-right hide_in_collapsed"></i>
                </span>
                {/* <a data-menu="menu-backgrounds" href="#" className="border-0" onClick={(e) => openOffCanvas(e)}>
                  <i className="fa font-14 fa-cog bg-blue-dark rounded-s"></i>
                  <span>Background Color</span>
                  <strong>10 Page Gradients Included</strong>
                  <span className="badge bg-highlight color-white">NEW</span>
                  <i className="fa fa-angle-right"></i>
                </a> */}
              </div>
            </div>
  )
}

const UISettings = memo(UISettingsConst);
export default UISettings;
