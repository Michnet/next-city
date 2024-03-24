import { openOffCanvas } from "@/helpers/appjs"

function MainMenuBtn() {
  return (
     <>
        <button onClick={(e) => openOffCanvas(e)} className="left_menu_btn text-20 d-block d-md-none" data-menu='mobile_sidebar'>
          <i className="fas fa-bars"></i>
        </button>
        <button className="left_menu_btn text-20 d-none d-md-block" aria-expanded='false' data-bs-target={"#sidebar"} data-bs-toggle={'collapse'}>
          <i className="fas fa-bars"></i>
        </button>
     </>
  )
}
export default MainMenuBtn