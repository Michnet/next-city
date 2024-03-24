import { UISizes } from "@/contexts/atoms";
import { closeMenus } from "@/helpers/appjs";
import { useRecoilValue } from "recoil";

export const BSReveal = ({title, detatched=true, subtitle, description, children, id, modalWidth=330}) => {

    const {isMobile} = useRecoilValue(UISizes);

    const heading = <div className="header_content">
    {title && <h5 className="modal-title" id="modalLabel">{title}</h5>}
    {description ? <p>{description}</p> : <></>}
    </div>
  
    return (
        <div id={id} className={`menu rounded-m ${detatched ? 'menu-box-detached' : ''} ${isMobile ? 'menu-box-bottom' : 'menu-box-modal'}`} style={{width: isMobile ? 'auto' : modalWidth}}>
            
            <div class="menu-title ms-n1">
                {title ? <h1>Filter Results</h1> : <></>}
                {subtitle ? <p class="color-highlight">Filter your Search Results</p> : <></>}
                <i className="fas fa-times close-menu" onClick={() => closeMenus()}/>
            </div>
            {description ? <p class="mb-3 mx-3 mt-n1">
                Filters can be expanded by default or collapsed.
            </p> : <></>}
            {children}
        </div>
    )
  }
  