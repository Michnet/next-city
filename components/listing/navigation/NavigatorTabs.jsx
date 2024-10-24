//import { authState } from "@/contexts/atoms";
import { closeMenus } from "@/helpers/appjs";
import { Client } from "react-hydration-provider";
//import { useRecoilValue } from "recoil";
//import listingMenu from "../ListingMenu";
import { memo, useEffect } from "react";
//import NavItem from "./partials/NavItem";
import NavItemCard from "./partials/NavItemCard";

function NavigatorTabs({items = null, faClass, activeKey, setActiveKey, lMenu, exClass='', itemClass='', randomColor=false}) {
    //const {user} = useRecoilValue(authState);
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
							  
								return <li id={`nav-${id}-tab`} onClick={() => {closeMenus(); setActiveKey(id)}} data-bs-toggle="tab" data-bs-target={`#nav-${id}`} type="button" role="tab" aria-controls={`nav-${id}`} aria-selected={activeKey == id} className={`nav-link close-menu overflow-visible position-relative ${activeKey === id ? 'active' : ''} ${itemClass}`}  key={id}>
									  <NavItemCard randomColor={randomColor} faClass={faClass ?? 'fal'} icon={icon} buttony={buttony} title={title} subTitle={subTitle} badgeNumber={badgeNumber} badgeClass={badgeClass}/>
								  </li>
								}
						}
                    })}
                    </>
      }
  return (
    <Client>
		<nav><div className={`nav nav-tabs listing_navigator ${exClass}`} id="nav-tab" role="tablist">
			{listView}
		</div></nav>
    </Client>
  )
}
export default NavigatorTabs