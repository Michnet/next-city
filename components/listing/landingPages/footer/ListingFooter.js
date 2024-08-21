import Link from 'next/link';
//import { useRecoilValue } from 'recoil';
//import { UISizes } from '@/contexts/atoms';
import { cleanHtml } from '@/helpers/universal';
import { BookingView } from '@/components/listing/partials/ActionButtons';
import { Avatar, SocialLinks } from '@/components/UI/Partials';
import { quickLinks } from '@/helpers/data';
import { Client } from 'react-hydration-provider';
import Navigator from '../../navigation/Navigator';

const ListingFooter = (props) => {
  const{thumbnail, tabList, activeKey, setActiveKey, links, short_desc, title, tagline, listing} = props;
  //const {isMobile} = useRecoilValue(UISizes);
  let logoView = <></>;


  if(thumbnail){
    logoView = <div className="l_logo d-flex flex-row flex-nowrap gap-2 align-items-center mb-20">
      <Avatar rounded width={40} height={40} src={thumbnail}/>
      <h4 className="_title truncate-2 handy show_in_pinned text-20 lh-13" dangerouslySetInnerHTML={{__html: title}}/>
      </div>
  }

  return (
    <footer className={`listing_footer rounded-0 px-0 footer-footer section-container bg-transparent shadow-0 card card-style mb-2 mx-2 lg:mb-0  md:py-0 ${props.rootClassName}`}>
      
      <div
        className={`footer-max-width max-content-container`}
      >
        <div className={'footer-banner overflow-hidden mb-0'}>
          
          <div className='footer_banner_content h-100'>
             <h1 className={`footer-text heading2`}>
            <span>BOOK YOUR SLOT</span>
          </h1>
          <span className={'footer-text03'}>
            <span></span>
            <span>For your opportunity with {cleanHtml(title)}, ...</span>
          </span>
          <div className={'footer-btns-container gap-2 align-items-center justify-center lgLine flex-wrap'}>
             <BookingView children={<button
              className={`footer-register-now w-100 button-primary button-lg button color-white truncate`}
            >See Options</button>} setActiveKey={setActiveKey} text='See Options'/>
            <button onClick={() => setActiveKey('private-chat')}
              className={`footer-contact-us button button-outline button-lg-border color-white truncate`}
            >
              Contact Listing
            </button>
          </div>
          </div>
        </div>

        <div className={'footer-bottom-container p-5 sm:px-20 sm:py-20 bg-theme'}>
          <div className={'footer-left-side'}>
            {logoView}
            {short_desc && <span className={'truncate-5 opacity-70'}>
              {short_desc}
            </span>}
            {links?.length > 0 && <div className={'footer-social-media'}>
              <span>Follow {cleanHtml(title)}</span>
              <div className={`social_links footer-container`}>
                <SocialLinks links={links}/>
              </div>
            </div>}
          </div>
          <div className={'footer-links'}>
            <div className={'footer-container1'}>
              <span className={'footer-text15 opacity-80'}>Explore Page</span>
              {tabList?.map((el) => {
                  if(el?.content !== 'empty'){
                  const {id, icon, buttony, title, subTitle} = el;
                  return <li className={`${activeKey === id ? 'active' : ''}`} key={id}>
                            <a className={`l_menu _item footer-link opacity-60`} /* data-bs-dismiss="offcanvas" data-bs-target="#l_menu" */ onClick={() => setActiveKey(id)}>
                                <i className="menu_pointer _left las la-caret-left"/>
                                <span className="icon"><i className={`${icon}`}></i></span>
                                <h6 className="label">{buttony ? subTitle : title}</h6>
                                <i className="menu_pointer _right las la-caret-right"/>
                            </a>
                          </li>
                  }
                })}
            </div>
            <div className={'footer-container2'}>
              <span className={'footer-text15'}>
                <span>More Listings</span>
                <br></br>
                <span></span>
              </span>
              <div className="quick_links opacity-80">
                {quickLinks?.map((item) => {
                  if(item.id == 3){
                    return(
                    <div key={item.id}>
                      <div className="d-flex flex-column">
                        {item.menuList.map((menu, i) => (
                          <Link className='footer-link py-1 opacity-60'  href={menu.routerPath} as={menu.routerPath} key={i}>
                            {menu.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}})}
                </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default ListingFooter
