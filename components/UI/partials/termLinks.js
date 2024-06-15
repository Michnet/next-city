import { closeMenus } from "@/helpers/appjs";
import { cleanHtml } from "@/helpers/universal";
import Link from "next/link";

export const TermIcon = ({item, flipped=false, shadowy=true}) => {
    let {name, slug, term_meta, id} = item;
    let {color, rl_awesome} = term_meta;
    return <div key={id} className="icon_bound text-center me-n2 px-5" style={{width: '75px',}}>
                    <Link onClick={() => closeMenus()} href={`/explore/events?category=${slug}`}  className={`term_box icon icon-xxl mb-1`} >
                    <span style={{width: 60, height: 60,  background: `${flipped ? 'var(--bgTheme)' : color}`}} className={`term_icon_box ${shadowy ? flipped ? 'shadow':'shadow-bg shadow-bg-sm' : ''}`}>
                        <i className={`text-center text-40 ${rl_awesome?.length > 0 ? rl_awesome : 'fas fa-feather'} ${flipped ? '_flipped bg-theme' : ''}`} style={{color: flipped ? color : '#fff'}}></i></span>
                    <div className='_title'><span className="font-500 color-theme truncate-2 text-10 opacity-70 ">{cleanHtml(name)}</span></div>
                </Link>
                    
                </div>
}

export const TermIconBox = ({item, flipped=false, shadowy=true, exClass='', width=100, height=100}) => {
    let {name, slug, term_meta, id} = item;
    let {color, rl_awesome} = term_meta;
    return <div key={id} className={`icon_bound box_icon  text-center overflow-hidden position-relative ${flipped ? '_flipped' : '_def'} ${exClass} ${shadowy ? 'shadow' : ''}`} style={{background: `${flipped ? color?.length > 0 ? color : 'var(--highlight)' : 'var(--bgTheme)'}`}}>
                    <div className={`term_box icon`} >
                        <span className={`term_icon_box bg-transparent`}>
                            <i className={`text-center text-${flipped ? '80' : '40'} opacity-30 ${rl_awesome?.length > 0 ? rl_awesome : 'fas fa-feather'}`} style={{color: flipped ? '#fff' : color}}></i>
                        </span>
                    </div>
                    {flipped ? <div className={`icon_overlay ${flipped ? 'bg-gradient-45' : ''} h-100 w-100 position-absolute top-0 left-0 opacity-50`}/> : <></>}
                    <div className={`_title text-right ${flipped ? 'p-3' : 'px-3 pb-2'} d-flex align-items-end position-relative`} style={{height: height, width: width}}><Link onClick={() => closeMenus()} href={`/explore/events?category=${slug}`}  className={`${flipped ? 'color-white text-13 opacity-50' : 'color-theme text-10 opacity-80'} smLine fw-600 truncate-3  lh-12 heady`}>{cleanHtml(name)}</Link></div>
                </div>
}

export function TermImage({item}){
    let {name, slug, term_meta, id} = item;
    let {color, image_url, rl_awesome} = term_meta;
    return <Link onClick={() => closeMenus()} href={`/explore/events?category=${slug}`} class="mx-3">
            <div class="card card-style me-0 mb-0" style={{height: '150px', backgroundImage: `url('${image_url}')`}}>
                <div class="card-bottom p-2 px-3">
                    <h4 class="color-white">{cleanHtml(name)}</h4>
                </div>
                <div class="card-overlay bg-gradient opacity-80"></div>
            </div>
        </Link>
}