import {openOffCanvas} from "@/helpers/appjs";

const GuestPrompt = ({title}) => {
  let titleView;

  if(title){
      titleView = <h5>{title}</h5>
  }
  
  return (
    <>
        <div className='guest_prompt d-flex flex-align-center py-4 justify-content-center'>
            {titleView}
            <div className='_guest_options'>
                <button className="btn btn-theme"  data-menu='login_modal' onClick={(e) => openOffCanvas(e)}>Sign In</button>
                <button className="btn btn-outline-theme"  data-menu='login_modal' onClick={(e) => openOffCanvas(e)}>Create Account</button>
            </div>
        </div>
    </>

  )
}

export default GuestPrompt;

