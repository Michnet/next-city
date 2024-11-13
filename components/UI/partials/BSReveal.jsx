import { UISizes } from "@/contexts/atoms";
import { closeMenus } from "@/helpers/appjs";
import { useRecoilValue } from "recoil";

export const BSReveal = ({title, detatched=true, onClose=()=>null, subtitle, description, children, id, modalWidth=330}) => {

    const {isMobile} = useRecoilValue(UISizes);
  
    return (
        <div id={id} className={`menu rounded-m ${detatched ? 'menu-box-detached' : ''} ${isMobile ? 'menu-box-bottom' : 'menu-box-modal'}`} style={{width: isMobile ? 'auto' : modalWidth}}>
            
            <div class="menu-title">
                <div>
                {title ? <h1>{title}</h1> : <></>}
                {subtitle ? <p class="color-highlight">{subtitle}</p> : <></>}
                </div>
                <i className="fas fa-times close-menu" onClick={() => {closeMenus(); onClose()}}/>
            </div>
            {description ? <p class="mb-3 mx-3 mt-n1">
                {description}
            </p> : <></>}
            {children}
        </div>
    )
  }
  