"use client";

import { useRouter } from "next/navigation";

export function setActiveRoute(base, slug, newKey=''){
    const router = useRouter();
           //let baseString = ''; 
           /* if(newKey){
            baseString = `/${base}/${slug}/${newKey}`
            }else{
                baseString = `/${base}/${slug}/`
            } */
            router.push(`/${base}/${slug}/${newKey}`);
}