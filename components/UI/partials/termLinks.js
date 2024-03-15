import { cleanHtml } from "@/helpers/universal";
import Link from "next/link";

export const TermIcon = ({item, flipped=false}) => {
    let {name, slug, term_meta, id} = item;
    let {color, rl_awesome} = term_meta;
    return <div key={id} className="term_box text-center me-n2 px-5" style={{width: '75px',}}>
                    <a href={`/explore/events?category=${slug}`}  className="icon icon-xxl rounded-xl d-block mb-1 shadow-bg shadow-bg-sm" style={{width: 60, height: 60,  background: `${color}`}}>
                    <i className={`text-30 ${rl_awesome} ${flipped ? '_flipped bg-theme' : ''}`} style={{color: flipped ? color : '#fff'}}></i>
                </a>
                    <div className='_title'><span className="font-500 color-theme truncate-2 text-10 opacity-70">{cleanHtml(name)}</span></div>
                </div>
}

export function TermImage({item}){
    let {name, slug, term_meta, id} = item;
    let {color, image_url, rl_awesome} = term_meta;
    return <Link href={`/explore/events?category=${slug}`} class="mx-3">
            <div class="card card-style me-0 mb-0" style={{height: '150px', backgroundImage: `url('${image_url}')`}}>
                <div class="card-bottom p-2 px-3">
                    <h4 class="color-white">{cleanHtml(name)}</h4>
                </div>
                <div class="card-overlay bg-gradient opacity-80"></div>
            </div>
        </Link>
}