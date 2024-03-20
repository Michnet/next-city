import Link from "next/link";
import { openOffCanvas} from "@/helpers/appjs";
import { isActiveLink } from "@/helpers/universal";
import { useRouter } from "next/router"
import { LoaderDualRing } from "../skeletons/Loaders";

export default function BottomMenu({settings, btnProps, btnFunc, icon}) {
  const router = useRouter();
  const {mMenuContent} = settings ?? {};
  //const {btnProps, btnFunc, icon} = mMenuContent ?? {}

  const defBottomLinks = [
    {id: 1,
        icon: "fa fa-home",
        color: 'gradient-green',
        name: "Home",
        routePath: "/",
        link: true
    },
    {id: 2,
        icon: "fa fa-search-location",
        color: 'gradient-red',
        name: "Explore",
        routePath: "/explore/events",
        link: true
    },
    {id: 3,
        icon: "fa fa-heart",
        color: 'gradient-red',
        name: "Pages",
        routePath: "/pages",
        link: true
    },
    {id: 4,
        icon: "fa fa-cog",
        color: 'gradient-red',
        name: "Settings",
        routePath: "/explore/events",
        func: openOffCanvas,
        link: false,
        props: {
          'data-menu': 'menu-settings'
        }
    },
 ]
  return (
    <>
          <div id="footer-bar" className="footer-bar-1 d-md-none">
            {defBottomLinks.map((el) => {
                let {id, icon, link, name, func, routePath, isNew, props} = el;
                return <>{link ? <Link key={id} href={routePath} className={`${isActiveLink(routePath, router.asPath)? 'active-nav' : ''}`}>
                        <i className={`${icon}`}/>
                        <span>{name}</span>
                        {isNew && <span className="badge bg-highlight">NEW</span>}
                    </Link>
                    :
                    <span className="link" onClick={(e) => func(e)} {...props}>
                      <i className={`${icon}`}/>
                      <span>{name}</span>
                    </span>
                    }
                    </>
            })}
              <button {...btnProps} onClick={(e) => openOffCanvas(e)} className="fab circle d-flex align-items-center justify-center bg-theme position-absolute gradient-menu shadow shadow-bg-m" style={{}}>
              <span  className={`text-center big_act`}>
                {<i className={`link_i ${icon ?? 'fa fa-plus'}`}/>}
              </span>
              <div className="position-absolute show_in_transit"><LoaderDualRing/></div>
            </button>
          </div>
    </>
  )
}
