import { openOffCanvas } from "@/helpers/appjs"

function MainMenuBtn() {
  return (
     <>
        <button onClick={(e) => openOffCanvas(e)} className="left_menu_btn d-flex items-center text-20 d-block d-md-none" data-menu='mobile_sidebar'>
          <i class="bi bi-text-left"></i>
        </button>
        <button className="left_menu_btn d-flex items-center text-20 d-none d-md-block" aria-expanded='false' data-bs-target={"#sidebar"} data-bs-toggle={'collapse'}>
          <i class="bi bi-text-left"></i>
        </button>
     </>
  )
}
export default MainMenuBtn