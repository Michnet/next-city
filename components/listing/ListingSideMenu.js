import { memo } from 'react';
import { useRecoilValue } from 'recoil';
import { Client } from 'react-hydration-provider';
import listingMenu from './ListingMenu';
import { authState } from '@/contexts/atoms';
import { srcWithFallback } from '@/helpers/universal';

//const CallToActions = dynamic(() => import('~/components/common/CallToActions'));
//const Link = dynamic(() => import('next/link'));
//const HeaderAnnex = dynamic(() => import('~/appComponents/core/Topbar/HeaderAnnex'));


const ListingSideMenuConst = ({listing, activeKey, setActiveKey, lMenu}) => {
  const {logo, thumbnail, title, cover} = listing ?? {};
  const {user} = useRecoilValue(authState);


let logoView, listView;
/* 
if(logo){
  logoView = <div className='_logo'>
    <img src={logo}/>
    </div>
}else if(thumbnail){
  logoView = <div className='_logo'>
    <Avatar rounded width={30}  alt="..." src={thumbnail ? `${thumbnail}` : "https://via.placeholder.com/150"}/>
    </div>
}
  */
if(lMenu){
  listView = <>
              {lMenu.map((el) => {
                if(el?.content !== 'empty'){
                const {id, icon, buttony, title, subTitle, badgeNumber, badgeClass} = el;
                return <li className={`${activeKey === id ? 'active' : ''}`} key={id}>
                          <a className={`l_menu _item ${buttony ? 'btn mb-0 btn-loud radius-30 shadow px-20' : ''}`} data-bs-dismiss="offcanvas" data-bs-target="#l_menu" onClick={() => setActiveKey(id)}>
                              <i className="menu_pointer _left las la-caret-left"/>
                              <span className="icon">
                                <i className={`${icon}`}/>
                              </span>
                              <h6 className={`label position-relative ${buttony ? 'text-white' : ''}`}>
                                {buttony ? subTitle : title}
                                {badgeNumber > 0 ? <span className={`position-absolute top-0 start-100 badge rounded-pill ${badgeClass ?? 'bg-info'}`}>
                                   {badgeNumber}
                                </span> : <></>}
                              </h6>
                              <i className="menu_pointer _right las la-caret-right"/>
                          </a>
                        </li>
                }
              })}
              </>
}
 
  return (
    <>
       <Client>
      <div style={{width : 300}} className="l_menu_drawer menu menu-box-right" /* tabIndex="-1" */ id="listing_menu"> 
        <div className="underlay" style={{backgroundSize: 'cover', backgroundPosition: 'center', background: `url(${srcWithFallback(cover)})`}}>
        </div>
        <div className="offcanvas-header">
            <div className="side_menu menu_logo"> 
              {/* <Avatar rounded width={40} height={40} src={thumbnail}/> */}
              {/* <HeaderAnnex/> */}
              {/* <h4 className="_title gx-text-truncate" dangerouslySetInnerHTML={{__html: title?.rendered}}/> */}
            </div>
            <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body px-30">
                <div className="d-flex flex-column justify-between h-100">
                <div className="card card-style">
				          <div className="content my-0">
                    <ul className="listing_menu">
                      {listView}
                    </ul>
                  </div>
                  </div>
                {/* <CallToActions thin noPadLeft light bgClass={'bg-transparent'} actionComponent={
                    <div className="d-flex  gap-3">
                      <Link href={'/add-listing'}><button
                    className="btn btn-theme btn-sm rounded-22 w-auto px-10 h-full text-14 fw-500"
                  >
                    List your event
                  </button></Link>
                  <Link href={'/about/about-us'}><button
                    className="btn btn-outline-theme btn-sm rounded-22 w-auto px-10 h-full text-14 fw-500"
                  >
                    Learn More
                  </button></Link>
                  </div>
                  }
                  descript = {"Create your own event page today. It's FREE"}
                  /> */}
                  </div>
              </div>
        
        </div>
    </Client>
    </>
  );
}

const ListingSideMenu = memo(ListingSideMenuConst);
export default ListingSideMenu;