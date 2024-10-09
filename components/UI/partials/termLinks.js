import { closeMenus } from "@/helpers/appjs";
import { cleanHtml } from "@/helpers/universal";
import Link from "next/link";

export const TermIcon = ({item, flipped=false, shadowy=true, listingType}) => {
    let {name, slug, term_meta, id} = item;
    let {color, rl_awesome} = term_meta;
    let linker = `/explore${listingType ? '/'+listingType+'s' : ''}?category=${slug}`;

    return <div key={id} className="icon_bound text-center me-n2 px-5" style={{width: '75px',}}>
                    <Link onClick={() => closeMenus()} href={linker}  className={`term_box icon icon-xxl mb-1`} >
                    <span style={{width: 60, height: 60,  background: `${flipped ? 'var(--bgTheme)' : color}`}} className={`term_icon_box ${shadowy ? flipped ? 'shadow':'shadow-bg shadow-bg-sm' : ''}`}>
                        <i className={`text-center text-40 ${rl_awesome?.length > 0 ? rl_awesome : 'fas fa-feather'} ${flipped ? '_flipped bg-theme' : ''}`} style={{color: flipped ? color : '#fff'}}></i></span>
                    <div className='_title'><span className="font-500 color-theme truncate-2 text-10 opacity-70 ">{cleanHtml(name).replace(' and ', ' & ')}</span></div>
                </Link>
                    
                </div>
}

export const TermIconBox = ({item, listingType, flipped=false, externalTitle=false, shadowy=true, exClass='', width='100px', height='100px'}) => {
    let {name, slug, term_meta, id} = item;
    let {color, rl_awesome} = term_meta;
    let linker = `/explore${listingType ? '/'+listingType+'s' : ''}?category=${slug}`;

    return <div key={id} className={`term_i_box overflow-hidden ${exClass} ${shadowy ? 'shadow' : ''}`}><div className={`icon_bound box_icon  text-center  position-relative ${flipped ? '_flipped' : '_def'}  `} style={{background: `${flipped ? color?.length > 0 ? color : 'var(--highlight)' : 'var(--bgTheme)'}`}}>
                    <Link onClick={() => closeMenus()} href={linker} className={`term_box icon`} style={{ height: externalTitle ? height : 'auto', lineHeight: externalTitle ? height : 'auto'}}>
                        <span className={`term_icon_box bg-transparent`}>
                            <i className={`text-center text-${flipped ? '80' : '40'} opacity-30 ${rl_awesome?.length > 0 ? rl_awesome : 'fas fa-feather'}`} style={{color: flipped ? '#fff' : color}}></i>
                        </span>
                    </Link>
                    {flipped ? <div className={`icon_overlay ${flipped ? 'bg-gradient-45' : ''} h-100 w-100 position-absolute top-0 left-0 opacity-70`}/> : <></>}
                    {!externalTitle && <div className={`_title text-right ${flipped ? 'p-3' : 'px-3 pb-2'} d-flex align-items-end justify-center position-relative`} style={{height: height, width: width}}><Link onClick={() => closeMenus()} href={linker}  className={`${flipped ? 'color-white text-13 opacity-70' : 'color-theme text-10 opacity-80'} smLine fw-600 truncate-2  lh-12 heady`}>{cleanHtml(name).replace(' and ', ' & ')}</Link></div>}
                </div>
                {externalTitle && <div className={`_title text-center py-2 d-flex align-items-end  justify-centerposition-relative opacity-60`} style={{ width: width}}><Link onClick={() => closeMenus()} href={linker}  className={`${flipped ? 'color-white text-13 opacity-70' : 'color-theme text-12'} smLine fw-600 truncate-2  lh-1 heady`}>{cleanHtml(name).replace(' and ', ' & ')}</Link></div>}
                </div>
}

export function TermImage({item, listingType}){
    let {name, slug, term_meta, id} = item;
    let {color, image_url, rl_awesome} = term_meta;
    let linker = `/explore${listingType ? '/'+listingType+'s' : ''}?category=${slug}`;

    return <Link onClick={() => closeMenus()} href={linker} class="mx-3">
            <div class="card card-style me-0 mb-0" style={{height: '150px', backgroundImage: `url('${image_url}')`}}>
                <div class="card-bottom p-2 px-3">
                    <h4 class="color-white">{cleanHtml(name).replace(' and ', ' & ')}</h4>
                </div>
                <div class="card-overlay bg-gradient opacity-80"></div>
            </div>
        </Link>
}