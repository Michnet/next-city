import Link from "next/link";
import { openOffCanvas} from "@/helpers/appjs";
import { isActiveLink } from "@/helpers/universal";
import { useRouter } from "next/router"
import { LoaderDualRing } from "../skeletons/Loaders";

export default function BottomMenu({settings, btnProps, exClass='', icon, content=null}) {
  const router = useRouter();
  const {mMenuContent} = settings ?? {};
  //const {btnProps, btnFunc, icon} = mMenuContent ?? {}
  

  const defBottomLinks = [
    {id: 1,
        icon: "fad fa-home-lg-alt",
        color: 'gradient-green',
        name: "Home",
        routePath: "/",
        link: true
    },
    {id: 2,
        icon: "fad fa-search",
        color: 'gradient-red',
        name: "Explore",
        routePath: "/explore/events",
        link: true
    },
    {id: 3,
        icon: "fad fa-user",
        color: 'gradient-red',
        name: "Account",
        routePath: "/account/dashboard",
        link: true
    },
    {id: 4,
        icon: "fad fa-cog",
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
    <>{ content ??
          <div id="footer-bar" className="footer-bar-1 d-md-none">
            <div className="footer_content">{defBottomLinks.map((el, ind) => {
                let {id, icon, link, name, func, routePath, isNew, props} = el;
                return <>{link ? <Link key={ind} href={routePath} className={`${isActiveLink(routePath, router.asPath)? 'active-nav' : ''}`}>
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
            })}</div>
            <div className="_fab">
              <button  onClick={(e) => {btnProps ? openOffCanvas(e) : router.push('/add-listing')}} {...btnProps}  className="circle d-flex align-items-center justify-center color-white  gradient-highlight shadow shadow-bg-m" style={{}}>
              <span  className={`text-center big_act`}>
                {<i className={`link_i ${icon ?? 'fa fa-plus'}`}/>}
              </span>
              <div className="position-absolute show_in_transit"><LoaderDualRing size={75}/></div>
            </button>
            </div>
          </div>
   } </>
  )
}
