// import { cleanHtml} from '~/server/UniversalFunctions';
import { memo } from 'react';
// import { Avatar, UserAvatar } from '~/appComponents/components/UI/components';
import { useRecoilValue } from 'recoil';
import { authState, UISizes } from '@/contexts/atoms';
import { Client } from 'react-hydration-provider';
// import listingMenu  from '~/appComponents/components/profile/ProfileContent/listing/ListingMenu';
import { BookingView } from '@/pages/events/[slug]';
import { cleanHtml } from '@/helpers/universal';
import { Avatar } from '@/components/UI/Partials';
import { UserAvatar } from '@/components/UI/UserAvatar';
import listingMenu from '../ListingMenu';
import { openOffCanvas } from '@/helpers/appjs';
import MainMenuBtn from '@/components/layouts/partials/MainMenuBtn';

const ListingTopMenuConst = ({listing, activeKey, setActiveKey}) => {
  const {logo, thumbnail, title} = listing ?? {};
  const {user} = useRecoilValue(authState);

    let localMenu = listingMenu({listing:listing, userId: user?.id});
    
  const {isTab, isMobile} = useRecoilValue(UISizes);


let logoView, headerMenuView;
let mobileHideList = ['home', 'articles', 'private-chat','faqs', 'gallery', 'merchandise','reviews'];

if(logo){
  logoView = <div className='_logo'>
    <img src={logo}/>
    </div>
}else if(thumbnail){
  logoView = <div className='_logo'>
    <Avatar rounded width={30}  alt="..." src={thumbnail ? `${thumbnail}` : "https://via.placeholder.com/150"}/>
    </div>
}

 
if(localMenu){
  headerMenuView = <>
  {localMenu.map((el) => {
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
        <div className="menu_content">
            <div className="d-flex flex-row flex-nowrap gap-3">
                <MainMenuBtn/>
                <div className="menu_logo" onClick={() => setActiveKey('home')}> 
                  {logoView} 
                  {isMobile ? <></> : <div className='show_in_pinned' style={{width: 'calc(100% - 40px)'}}><h4 className="_title truncate-2 text-14">{cleanHtml(title?.rendered)}</h4></div>
                    }
                </div> 
           </div>
           <div className="listing_menu_toggler d-flex flex-row flex-nowrap align-items-center gap-2">
              {/* isMobile ? <></> : */ headerMenuView}
              {/* isMobile ? <></> :  */<>
              <div onClick={(e) => openOffCanvas(e)} data-menu="listingMenuRight" className={`tab_link`}>
              <div className={`menu_icon d-flex flex-column px-2`}>
                    <span className='position-relative'>
                      <i className={`las la-caret-square-left`}/> 
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