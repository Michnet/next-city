import {openOffCanvas} from "@/helpers/appjs";

const GuestPrompt = ({title, descript=null}) => {
  let titleView;

  if(title){
      titleView = <h5>{title}</h5>
  }
  
  return (
    <div>
        <div className='guest_prompt d-flex flex-align-center py-4 justify-content-center mx-auto'  style={{maxWidth: '400px'}}>
            {titleView}
            {descript ? <p>{descript}</p> : <></>}
            <div className='_guest_options'>
                <button className="btn btn-theme"  data-menu='login_modal' onClick={(e) => openOffCanvas(e)}>Sign In</button>
                <button className="btn btn-outline-theme"  data-menu='login_modal' onClick={(e) => openOffCanvas(e)}>Create Account</button>
            </div>
        </div>
    </div>

  )
}

export default GuestPrompt;

