import { authState } from "@/contexts/atoms";
import { closeMenus } from "@/helpers/appjs";
import { Client } from "react-hydration-provider";
import { useRecoilValue } from "recoil";
import listingMenu from "./ListingMenu";
import { memo, useEffect } from "react";

function Navigator({listing, activeKey, setActiveKey, lMenu, exClass=''}) {
    const {user} = useRecoilValue(authState);
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
                    {lMenu.map((el) => {
                      if(el?.content !== 'empty'){
                      const {id, icon, buttony, title, subTitle, badgeNumber, badgeClass} = el;
					
                      return <li onClick={() => {closeMenus(); setActiveKey(id)}} className={`close-menu overflow-visible position-relative ${activeKey === id ? 'active' : ''}`}  key={id}>
							<i className={`${icon ?? 'far fa-square'} bg-transparent rounded opacity-50 link_icon`}></i>
							<span className="truncate">{buttony ? subTitle : title}
                                      {badgeNumber > 0 ? <span style={{marginTop: '0 !important'}} className={`position-absolute top-0 end-0 badge rounded-pill ${badgeClass ?? 'bg-info'}`}>
                                         {badgeNumber}
                                      </span> : <></>}</span>
							<i className="fa fa-angle-right "/>
							<i className="fa fa-angle-left "/>
						</li>
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