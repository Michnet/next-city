import Link from "next/link";
import { isActiveLink } from "@/helpers/universal";
import { useAuthState } from "@/helpers/use-auth";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import { BSModal } from "../UI/Offcanvas/BSModal";
import { UserAvatar } from "../UI/UserAvatar";
import { closeMenus } from "@/helpers/appjs";
import GuestPrompt from "@/components/UI/GuestPrompt";


const Sidebar = ({page, setPage, user, exClass=''}) => {
  const router = useRouter();
  const {name, id} = user ?? {};
  const {userSignOut} = useRecoilValue(useAuthState);
  console.log('user in side', user)

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
      routePath: "/account/chatroom",
      page: 'chatroom',
      link: true
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
    <>{user ? <div className={`sidebar -dashboard card card-style p-3 m-md-0 ${exClass}`}>
      <div className="dashboard__content bg-dark-1 card card-style shadow-0 border mx-0 bg-transparent">
          <div className="row justify-between items-end">
            <div className="col-12 pt-3 pb-2">
              <div className="d-flex flex-row flex-nowrap gap-2 align-items-center"><UserAvatar/><h1 className="text-30 lh-14 fw-600">{name}</h1></div>
              <div className="text-15 text-light-1">
                My account information.
              </div>
              {<div className="action_group mt-20 mb-20">
                <button className='btn'>Edit Profile</button>
              </div>}
            </div>
          </div>

        </div>
      {sidebarContent.map((item) => {
        const {func, link, routePath} = item;
      return  <div className="sidebar__item dash_menu_item mb-2" key={item.id}>
          <div onClick={() => closeMenus()}
            className={`${
              isActiveLink(item.routePath, router.asPath) ? "-is-active" : ""
            } sidebar__button`}
          >
            <>{link ? <Link href={`${routePath}`} className='d-flex items-center text-15 lh-1 fw-500'><i className={`bi ${item.icon}`}/>
              {item.name}</Link>
            :
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
            </span>}
            </>
          </div>
        </div>}
      )}
    </div> : <GuestPrompt/>}</>
  );
};

export default Sidebar;
