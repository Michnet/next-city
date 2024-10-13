"use client";

import { closeMenus } from "@/helpers/appjs";
import { Client } from "react-hydration-provider";
//import listingMenu from "../../../../components/listing/ListingMenu";
import {useEffect } from "react";
//import NavItem from "./partials/NavItem";
import NavItemCard from "../../../../components/listing/navigation/partials/NavItemCard";
import { useRouter } from "next/navigation";

function Navigator({items = null, faClass, base, slug, activeKey, lMenu, exClass='', itemClass='', randomColor=false}) {
	const router = useRouter();
    const setActiveKey = (newKey) => router.push(`/${base}/${slug}/${newKey}`);
    let listView;

	useEffect(() => {
		var activeItem = document.querySelector('.listing_navigator .active');
		if(activeItem){
		  var parent = activeItem.parentNode;
		  var prev = activeItem.previousElementSibling;
		  var next = activeItem.nextElementSibling;
	  
		  if(parent){
			var siblings = parent.children;
			
		  for (let i = 0; i < siblings.length; i++) {
			siblings[i].classList.remove('visible', 'prev', 'next');
		  }
		  if(prev){ prev.classList.add('visible', 'prev');}
		  if(next){next.classList.add('visible', 'next');}
		  }
		}
	  }, [activeKey]);

    if(lMenu){
        listView = <>
                    {lMenu.map((el, ind) => {
						let itemsIndex = items ?? lMenu?.length;
						if(ind < itemsIndex){
							if(el?.content !== 'empty'){
								const {id, icon, buttony, title, subTitle, badgeNumber, badgeClass} = el;
							  
								return <li onClick={() => {closeMenus(); setActiveKey(id)}} className={`close-menu overflow-visible position-relative ${activeKey === id ? 'active' : ''} ${itemClass}`}  key={id}>
									  <NavItemCard randomColor={randomColor} faClass={faClass ?? 'fal'} icon={icon} buttony={buttony} title={title} subTitle={subTitle} badgeNumber={badgeNumber} badgeClass={badgeClass}/>
								  </li>
								}
						}
                    })}
                    </>
      }
  return (
    <Client>
		<ul className={`listing_navigator ${exClass}`}>
			{listView}
		</ul>
    </Client>
  )
}
export default Navigator