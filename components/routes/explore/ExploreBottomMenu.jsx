import { openOffCanvas } from "@/helpers/appjs"
import { memo, useState, useEffect} from "react"
import BottomMenu from "../../layouts/BottomMenu"
import { LoaderRingBoxed } from "../../skeletons/Loaders"
//import { getLocalTaxonomy } from "@/helpers/rest"
import Link from "next/link"
import { isActiveLink } from "@/helpers/universal"
import { useRouter } from "next/router"

const ExploreBottomMenuConst = () =>{

    const router = useRouter();

    const locItems = [
       { "id": 106, "name": "Events", "slug": "events", "color": "#fc8428",   "rl_awesome": "far fa-calendar-check"},
       { "id": 1304, "name": "Special Sales", "color": "#cc1e6f", "slug": "special-sales", "rl_awesome": "far fa-tags"}, 
       { "id": 109, "name": "Places", "slug": "places",  "color": "#2892fc",  "rl_awesome": "far fa-map-marked-alt"}, 
       { "id": 1561,"name": "Services", "slug": "services", "color": "#1ca9bf", "rl_awesome": "far fa-wrench"}
      ];

    console.log('locItems', locItems);

    let bottomContent = <div style={{width: '100%'}} id="footer-bar" className="footer-bar-1 d-md-none align-items-center px-0 border-0 font-900">
                    <div className='footer_content py-0 bg-theme minw-0 flex-shrink-1  justify-between'>
                      
                      {locItems?.length > 0 &&
                      locItems?.map((el) => {
                        const {name,slug,color,id, rl_awesome} = el;
                        let active = isActiveLink(`/explore/${slug}`, router.asPath);
                         return <Link className={`${active ? '_active' : ''} d-flex flex-column gap-2`} key={id} href={`/explore/${slug}`}>
                          <i className={`${rl_awesome} text-center link_icon`}/>
                    <span className={`truncate nav_i_title fw-500 text-12 text-capitalize ${active ? 'opacity-100' : 'opacity-40'}`}>{name}</span>
                         </Link>
                      })}
                    </div>
                    <div className='_fab'>
                    <button data-menu='exploreOffCanvas' onClick={(e) => openOffCanvas(e)} className={'d-flex align-items-center justify-center  px-2 bg-theme'}>
                    <i className="las la-filter text-center color-theme"/>
                    <div className="position-absolute show_in_transit"><LoaderRingBoxed size={75}/></div>
                    </button>
                    </div>
                </div>    
    return <><BottomMenu content={bottomContent}/>
    <style>
      {`#footer-bar{will-change:transform}`}
    </style>
    </>
}
const ExploreBottomMenu = memo(ExploreBottomMenuConst)
export default ExploreBottomMenu;