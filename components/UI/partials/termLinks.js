import { closeMenus } from "@/helpers/appjs";
import { cleanHtml } from "@/helpers/universal";
import Link from "next/link";

export const TermIcon = ({item, flipped=false, shadowy=true}) => {
    let {name, slug, term_meta, id} = item;
    let {color, rl_awesome} = term_meta;
    return <div key={id} className="icon_bound text-center me-n2 px-5" style={{width: '75px',}}>
                    <Link onClick={() => closeMenus()} href={`/explore/events?category=${slug}`}  className={`term_box icon icon-xxl mb-1`} >
                    <span style={{width: 60, height: 60,  background: `${flipped ? 'var(--bgTheme)' : color}`}} className={`term_icon_box ${shadowy ? 'shadow-bg shadow-bg-sm' : ''}`}>
                        <i className={`text-center text-30 ${rl_awesome?.length > 0 ? rl_awesome : 'fas fa-network-wired'} ${flipped ? '_flipped bg-theme' : ''}`} style={{color: flipped ? color : '#fff'}}></i></span>
                    <div className='_title'><span className="font-500 color-theme truncate-2 text-10 opacity-70">{cleanHtml(name)}</span></div>
                </Link>
                    
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