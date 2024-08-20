// import { cleanHtml} from '~/server/UniversalFunctions';
import { memo } from 'react';
// import { Avatar, UserAvatar } from '~/appComponents/components/UI/components';
import { useRecoilValue } from 'recoil';
import { authState, UISizes } from '@/contexts/atoms';
import { Client } from 'react-hydration-provider';
import { BookingView } from '@/pages/events/[slug]';
import { cleanHtml, srcWithFallback } from '@/helpers/universal';
import { Avatar } from '@/components/UI/Partials';
import { UserAvatar } from '@/components/UI/UserAvatar';
import { openOffCanvas } from '@/helpers/appjs';
//import MainMenuBtn from '@/components/layouts/partials/MainMenuBtn';
import { useRouter } from 'next/router';

const ListingTopMenuConst = ({listing, activeKey, setActiveKey, lMenu}) => {
  const {logo, thumbnail, title, xtra_large_thumb, cover} = listing ?? {};
  const {user} = useRecoilValue(authState);
  const router = useRouter()

    
  const {isMobile} = useRecoilValue(UISizes);


let logoView, headerMenuView;
let mobileHideList = ['home', 'articles', 'private-chat', 'faqs','reviews', 'gallery', 'tickets'];

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
            <i className={`far ${icon}`}/> 
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

let menuContent = <div className="menu_content">
<div className="d-flex flex-row flex-nowrap gap-3 align-items-center flex-shrink-1 minw-0">
    <i className="fas fa-chevron-left d-none d-md-block" onClick={() => router.back()}/>
    {/* <MainMenuBtn/>  */}
    <div className="menu_logo  flex-shrink-1" onClick={() => setActiveKey('home')}> 
      {logoView} 
      {<div className='flex-shrink-1' style={{width: 'calc(100% - 40px)'}}>
        <h4 className="smLine _title truncate text-16">{cleanHtml(title?.rendered)}</h4>
        <span className="smLine _title truncate text-14 fw-400 opacity-50">{lMenu.filter((el) => el.id == activeKey)[0]?.title}</span>
        </div> 
        }
    </div> 
</div>
<div className="listing_menu_toggler d-flex flex-row flex-nowrap align-items-center gap-2 pe-2">
  {headerMenuView}
  {<>
  <div onClick={(e) => openOffCanvas(e)} data-menu="listingMenuRight" className={`tab_link _all`}>
  <div className={`menu_icon d-flex flex-column px-2`}>
        <span className='position-relative'>
          <i className={`fas fa-ellipsis-v`}/> 
      </span>
      <h5 className="profile_title">More</h5>
  </div>
      </div></>
  }
  
  <div className='tab_link _all px-1 d-sm-block d-none'><UserAvatar size={30}/></div>
  {isMobile ? <></> : <div className="d-inline-block">
    { <BookingView simple={false} setActiveKey={setActiveKey}text='Booking' exClass='text-12 py-1 fw-600'/>}
    </div>}
</div>
</div>;


const TopMenuView = ({exClass}) => <div className={`profile-top-menu ${exClass ?? ''}`}>
              <div style={{backgroundImage: `url(${srcWithFallback(cover)})`}}  className="bg-header bg-center bg-cover border-0 d-block d-md-none mx-auto p-0 s mb-0 font-900 shadow-bg shadow-bg-l btn-icon text-start">
          <i className="fas fa-bars left_menu_btn text-20 d-block d-md-none text-center" onClick={(e) => openOffCanvas(e)}  data-menu='mobile_sidebar'></i>
                {menuContent}
              </div>

              <div className='d-none d-md-block'>
                {menuContent}
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