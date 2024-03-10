import { cleanHtml } from "@/helpers/universal";
import Link from "next/link";

export const TermIcon = ({item}) => {
    let {name, slug, term_meta, id} = item;
    let {color, rl_awesome} = term_meta;
    return <div key={id} className="term_box text-center me-n2 px-5" style={{width: '75px',}}>
                    <a href={`/explore/events?category=${slug}`}  className="icon icon-xxl rounded-xl d-block mb-2 shadow-bg shadow-bg-m" style={{width: 60, height: 60, border: `2px solid ${color ?? 'var(--highlight)'}`,  background: `${color}`}}>
                    <i className={`text-30 text-white ${rl_awesome}`}></i>
                </a>
                    <div><span className="d-block  font-500 color-theme truncate-2 lh-1 text-11">{cleanHtml(name)}</span></div>
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