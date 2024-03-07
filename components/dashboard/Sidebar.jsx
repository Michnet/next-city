//import Image from "next/image";
import { isActiveLink } from "@/helpers/universal";
import { useAuthState } from "@/helpers/use-auth";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";

const Sidebar = ({page, setPage}) => {
  const router = useRouter();
  //const {userSignOut} = useAuth;
  const {userSignOut} = useRecoilValue(useAuthState);

  const sidebarContent = [
    {
      id: 1,
      icon: "bi-house",
      name: "Dashboard",
      routePath: "/dashboard/db-dashboard",
      page: 'home'
    },
    {
      id: 2,
      icon: "bi-card-checklist",
      name: "My pages",
      routePath: "/dashboard/db-wishlist",
      page: 'posted'
    },
    {
      id: 3,
      icon: "bi-card-checklist",
      name: "Chat Room",
      routePath: "/dashboard/chatroom",
      page: 'chatroom'
    },
    {
      id: 4,
      icon: "bi-calendar-check",
      name: " Booking History",
      routePath: "/dashboard/db-booking",
      page: 'booking'
    },
    
    {
      id: 5,
      icon: "bi-bookmark-check",
      name: "My Favourites",
      routePath: "/dashboard/db-wishlist",
      page: 'saved'
    },
    {
      id: 6,
      icon: "bi-person-gear",
      name: " Settings",
      routePath: "/dashboard/db-settings",
      page : 'settings'
    },
    {
      id: 7,
      icon: "bi-person-dash",
      name: " Logout",
      routePath: "/others-pages/login",
      func: () => userSignOut(router.push('/'))
    },
  ];
  return (
    <div className="sidebar -dashboard">
      {sidebarContent.map((item) => {
        const {func} = item;
      return  <div className="sidebar__item dash_menu_item" key={item.id}>
          <div
            className={`${
              isActiveLink(item.routePath, router.asPath) ? "-is-active" : ""
            } sidebar__button `}
          >
            <span
              className="d-flex items-center text-15 lh-1 fw-500"
              data-bs-dismiss="modal" data-bs-target="#user_menu"
              onClick={() => {
                if(func){
                  func();
                }else{
                  setPage(item.page)
                }
                }}
            >
              <i className={`bi ${item.icon}`}/>
              {item.name}
            </span>
          </div>
        </div>}
      )}
    </div>
  );
};

export default Sidebar;
