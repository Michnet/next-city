import { UISizes } from "@/contexts/atoms";
import { useRecoilValue } from "recoil";

export const BSReveal = ({title, detatched=true, description, children, id, modalWidth=330}) => {

    const {isMobile} = useRecoilValue(UISizes);

    const heading = <div className="header_content">
    {title && <h5 className="modal-title" id="modalLabel">{title}</h5>}
    {description ? <p>{description}</p> : <></>}
    </div>
  
    return (
        <div id={id} className={`menu rounded-m ${detatched ? 'menu-box-detached' : ''} ${isMobile ? 'menu-box-bottom' : 'menu-box-modal'}`} style={{width: isMobile ? 'auto' : modalWidth}}>
            {children}
        </div>
    )
  }
  