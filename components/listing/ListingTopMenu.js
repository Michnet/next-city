// import { cleanHtml} from '~/server/UniversalFunctions';
import { memo } from 'react';
// import { Avatar, UserAvatar } from '~/appComponents/components/UI/components';
import { useRecoilValue } from 'recoil';
import { authState, UISizes } from '@/contexts/atoms';
import { Client } from 'react-hydration-provider';
import { BookingView } from '@/pages/events/[slug]';
import { cleanHtml } from '@/helpers/universal';
import { Avatar } from '@/components/UI/Partials';
import { UserAvatar } from '@/components/UI/UserAvatar';
import { openOffCanvas } from '@/helpers/appjs';
import MainMenuBtn from '@/components/layouts/partials/MainMenuBtn';
import { useRouter } from 'next/router';

const ListingTopMenuConst = ({listing, activeKey, setActiveKey, lMenu}) => {
  const {logo, thumbnail, title, xtra_large_thumb} = listing ?? {};
  const {user} = useRecoilValue(authState);
  const router = useRouter()

    
  const {isMobile} = useRecoilValue(UISizes);


let logoView, headerMenuView;
let mobileHideList = ['home', 'articles', 'private-chat','faqs', 'gallery', 'merchandise','reviews'];

if(logo){
  logoView = <div className='_logo'>
    <img src={logo} onError={(e) => {e.target.style.display = "none"}}/>
    </div>
}else if(thumbnail){
  logoView = <div className='_logo'>
    <Avatar hideOnError rounded width={30}  alt="..." src={thumbnail ? `${thumbnail}` : "https://via.placeholder.com/150"}/>
    </div>
}

 
if(lMenu){
  headerMenuView = <>
  {lMenu.map((el) => {
    if(el?.content !== 'empty' && !mobileHideList.includes(el.id)){
      const {id, icon, title, badgeNumber, badge, badgeClass} = el;
    return <div onClick={() => setActiveKey(id)} className={`tab_link`}>{badge ? <span className="badge"> {badgeNumber}</span> : null}
    <div className={`menu_icon d-flex flex-column px-2 ${activeKey == id ? 'active' : ''}`} key={id}>
          <span className='position-relative'>
            <i className={`${icon}`}/> 
            {badgeNumber > 0 && <span className={`position-absolute top-0 start-100 translate-middle-x badge rounded-pill ${badgeClass ?? 'bg-info'}`}>
              {badgeNumber}
            </span>}
        </span>
        <h5 className="profile_title">{title}</h5>
    </div>
        </div>
    }
  })}
  </>
}
const TopMenuView = ({exClass}) => <div className={`profile-top-menu ${exClass ?? ''}`}>
  {/* <button  style={{backgroundImage: `url("${xtra_large_thumb}")`}} className="btn btn-m shadow-bg shadow-bg-m mb-0 rounded-s text-uppercase text-nowrap font-900 shadow-s color-white btn-icon text-start">
                <i class="fas fa-chevron-down font-15 text-center"></i>
                <span dangerouslySetInnerHTML={{__html: title.rendered}}/>
              </button> */}
        <div className="menu_content">
            <div className="d-flex flex-row flex-nowrap gap-3 align-items-center">
                <i className="fas fa-chevron-left" onClick={() => router.back()}/>
                <MainMenuBtn/> 
                <div className="menu_logo show_in_pinned" onClick={() => setActiveKey('home')}> 
                  {logoView} 
                  {<div className='' style={{width: 'calc(100% - 40px)'}}><h4 className="smLine _title truncate-2 text-14">{cleanHtml(title?.rendered)}</h4></div>
                    }
                </div> 
           </div>
           <div className="listing_menu_toggler d-flex flex-row flex-nowrap align-items-center gap-2">
              {headerMenuView}
              {<>
              <div onClick={(e) => openOffCanvas(e)} data-menu="listingMenuRight" className={`tab_link`}>
              <div className={`menu_icon d-flex flex-column px-2`}>
                    <span className='position-relative'>
                      <i className={`fas fa-ellipsis-h`}/> 
                  </span>
                  <h5 className="profile_title">More</h5>
              </div>
                  </div></>
              }
              {isMobile ? <></> : <div className="d-inline-block">
                { <BookingView simple={false} setActiveKey={setActiveKey}text='Booking' exClass='text-12 py-1 fw-600'/>}
                </div>}
              <div className='tab_link px-2'><UserAvatar size={30}/></div>
            </div>
        </div>
        </div>
 
  return (
    <>
    <Client><TopMenuView/></Client> 
    </>
  );
}

const ListingTopMenu = memo(ListingTopMenuConst);
export default ListingTopMenu;