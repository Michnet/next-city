import  {useState, useEffect, useRef, memo} from "react";
import dynamic from "next/dynamic";
//import {getDirPaymentMethods } from "server/WpRest";
//const ListingProductsSimple = dynamic(() => import("../../ListingProducts/ListingProductsSimple"), { ssr: false });
//import LandingPage from "../../LandingPages/LandingPage";
//import {BSReveal} from "~/appComponents/components/UI/components";
import { TagCloud } from "react-tagcloud";
//const BottomMobileMenu = dynamic(() => import("~/appComponents/core/Layout/BottomMobileMenu"));
//const Link = dynamic(() => import("next/link"));
//const PageScroller = dynamic(() => import("~/appComponents/components/UI/PageScroller"), { ssr: false });
import { Client } from "react-hydration-provider";
//import ListingLoader from "~/appComponents/components/skeletons/React-content-loader/FullPage/ListingPage";
//const CallToActions = dynamic(() => import("~/components/common/CallToActions"));
import { useRecoilValue } from "recoil";
import { authState, UISizes } from "@/contexts/atoms";
//import  listingMenu  from "./ListingMenu";
//import { Tab, Tabs } from "react-bootstrap";
//import VisitorActions from "../../ProfileHeader/listing/VisitorActions";
//import { EventDatesActive } from "~/server/frontendRequests/EventDates";
//import { BookingView } from "~/pages/events/[slug]";
import { PreviousRouteLink } from "../UI/Partials";
import NextPostLink from "../UI/NextPostLink";
import listingMenu from "./ListingMenu";
import LandingPage from "./LandingPage";
//import ComponentActivity from "~/appComponents/components/dashboard/CRM/ComponentActivity";
const MegaGallery = dynamic(() => import("../UI/Galleries/MegaGallery"));
//import { DualColorHeader } from "../UI/Partials";

//const FAQs = dynamic(() => import("../../partials/FAQs"), {ssr: false});
//const ProfileContact = dynamic(() => import('../../Contact/ProfileContact'), { ssr: false });
//const ListingArticles = dynamic(() => import('../../ListingArticles/Index'), { ssr: false });

//const ListingReviews = dynamic(() => import('../../Reviews'), { ssr: false });


const ProfileContentConst = ({listing, activeView,  activeKey, color, setActiveKey, isSample, shopItems, upcoming, landingStyles}) => {

  const {user} = useRecoilValue(authState);
  const [payMeans, setPayMeans] = useState(null);
  const [chatCount, setChatCount] = useState(0);
  //const TabPane = Tabs.TabPane;
  const {acf,  type,listing_store, categories, about_us,ticket_min_price_html, thumbnail, title, author_id, phone, address, id, community_id, whatsapp, slug} = listing ?? {};
  const {/* general_merchandise,  */tickets} = acf ?? {};
  const {faqs} = about_us;
  const {isMobile} = useRecoilValue(UISizes);
  //const [content, setContent] = useState(null);

  let  catList,  gallery, logoView, userObj;
  const listing_articles = listing?.acf?.listing_articles;
  
  const tabRef = useRef(null);

  function itContent(id){
    console.log('running show')
    switch (id) {
        case 'gallery':
        return <MegaGallery listing={listing} /* color={color} *//>;
      case 'home':
        return <LandingPage activeKey={activeKey} listing={listing} setActiveKey={setActiveKey}/>
      //case 'profile':
        //return <ProfileInfo  listing={listing} setActiveKey={setActiveKey}  payMeans={payMeans}/>;
    /*   case 'private-chat':
        return <ProfileContact listing={listing} count={setChatCount}/>
      case 'occurrences':
        return <EventDatesActive Id = {listing.id} dualColumn upcoming = {5} 
        fallBack={
          <ListingContact light listing={listing} title={'No future occurrences'} descript={'The listing owner has not added any future occurences for it. This may mean that the event has ended. Contact them to inquire further'}/>
        }/>;
      case 'reviews':
        return <ListingReviews postID={listing.id} user={user}/>;
      case 'gallery':
        return <MegaGallery listing={listing} color={color}/>;
      case 'faqs':
        //const FAQs = dynamic(() => import("../../partials/FAQs"), { ssr: false });
        return <FAQs faqs={faqs} postimport NextPostLink from './../UI/NextPostLink';
ID={listing.id}/>;
      case 'tickets':
        return tickets?.length > 0 ? <div>
        <DualColorHeader exClass={'mb-20'} title={'Online booking available'} desc={'Book your slot at this event by selecting a ticket option. Click to see all the details before booking'}/>
        <ListingProductsSimple isSample ={isSample} listy ids={tickets} productType="booking" listingId = {id} relatedIds={tickets}/></div>
        :
        <ListingContact light listing={listing} title={'No online booking options'} descript={'The listing manager for this event has not added any online booking options. Contact them to inquire further'}/>
      case 'articles':
        return listing_articles ? <ListingArticles ids={listing_articles}/> : 'empty';
      case 'merchandise':
        return 'empty'; 
      case 'community':
        return <ComponentActivity
        setActiveKey={setActiveKey}
        noLink
        scope={'groups'}
        scope_slug = 'group_id'
        scope_id={community_id}
      />*/
    }
  }
/* 
  useEffect(() => {
    if(activeKey !== 'home'){
      setContent(itContent(activeKey));
    }
    return () => {
      setContent(null)
    }
  }, [activeKey]) */
  
  /* function processMenu(list){
    let itArr = [];
     list.map((it) => {
           it.content = itContent(it.id);
           itArr.push(it);
     });
     return itArr;
  }
*/
  let localMenu = listingMenu({listing:listing, userId: user?.id}); 
/* 
  async function getPayMeans(id){
    const means = await getDirPaymentMethods({post : id});
    if(means){
    setPayMeans(means.items);
    }
  }

 useEffect(() => {
  if(listing){
    getPayMeans(listing.id);
   }
 }, [listing]);
 */
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
 
 function listingMenuClick(key){
  setActiveKey(key); 
 }

  gallery = listing.gallery;
  
  let listingView, VisitorActionsView, siteMapper, mobileMenuView;
  let mobileHideList = ['home', 'articles', 'private-chat','faqs'];

  if(listing){

   /*  VisitorActionsView = <div>
                      <VisitorActions setActiveKey={setActiveKey} listing={listing} extraItem = {<div className="action_box" data-bs-toggle={isMobile ?  'offcanvas' : 'modal'} data-bs-target="#mode_selector"> <i className="las la-bullseye"/> <label>View Mode</label> </div>}/>
                      <hr/>
                      <CallToActions centered thin light bgClass={'bg-transparent'} actionComponent={
                            
                            <div className="d-flex  gap-3 flex-center">
                              <Link href={'/add-listing'}><button
                            className="btn btn-theme btn-sm rounded-22 w-auto px-10 h-full text-14 fw-500"
                          >
                            Create event page
                          </button></Link>
                          <Link href={'/about/about-us'}><button
                            className="btn btn-outline-theme btn-sm rounded-22 w-auto px-10 h-full text-14 fw-500"
                          >
                            Learn More
                          </button></Link>
                          </div>
                          }
                          descript = {"You can also create your own event page today. It's FREE"}
                          />
                      </div> */
 
  if(user){
    const {name:display_name, email:user_email, avatar_urls} = user;
    userObj = {
      name: display_name,
      email: user_email,
      avatarUrl : avatar_urls[48]
    }
  }

  if(categories?.length > 0){
    catList = categories.map((cat) => {
      return cat.slug
    })
  } else catList = null;

  /*  if(thumbnail){
          logoView = <div className="l_logo d-flex flex-row flex-nowrap gap-2 align-items-center">
            <Avatar rounded width={40} height={40} src={thumbnail}/>
            <h4 className="_title gx-text-truncate handy show_in_pinned lh-1" dangerouslySetInnerHTML={{__html: title?.rendered}}/>
            </div>
    } */
    
    mobileMenuView = <>
        {/* { <BookingView setActiveKey={setActiveKey} exClass='text-truncate fw-700 text-14' simple={false}/>} */}
        {activeKey != 'private-chat' && <div className="_phone">
          <button onClick={() => listingMenuClick('private-chat')} className="btn border-light border-listing-theme">
            Contact
          </button>
        </div>}
        <PreviousRouteLink/>
        <NextPostLink current={listing.slug}/>
        </>

    siteMapper = () => {
      let linkzz = [];
      localMenu.map((el) => {
      if(el?.content !== 'empty'){
      const {id, icon, buttony, title, subTitle} = el;
      linkzz.push({ name: title, routerPath: `/events/${slug}?view=${id}` })
      }
    });
    return linkzz;
  }
    
    if(listing){
      function showContent(){
   
        return localMenu.map((el) => {
          const {id, icon, title, subTitle, innerClass, widgetClass, badge} = el;
          let content = itContent(id);
          
          if(content !== 'empty'){
            if(id === 'occurrences'){
              if(type !== 'event'){
                  return;
              }
            }
            if(mobileHideList.includes(id)){

            }
            return <div  id={`${listing.id}_${id}`} key={id} eventKey={id} title={title} className={`tabpane ${widgetClass}`}>
                       {activeKey === 'cover' ? <></> :  <div className={`tab_inner ${innerClass ?? ''}`}>
                          {content}
                        </div>}
                    </div>

          }else{
              const customRenderer = (tag, size, color) => {
                return (
                  <span  key={tag.id} style={{ color }} className={`fb_tag pointer tag-${size}`}>
                    {tag.value}
                  </span>
                )
              }

              const color_options = {
                luminosity: 'dark',
                hue: color,
              }

              function availableViews(){
                let tagsArr = [];
                localMenu.map((el) => {
                const {id, icon, content, title, subTitle} = el;
                if(content != 'empty'){
                  tagsArr.push({value: title, id : id, count: 30})
                }
                });
                return tagsArr;                                
              }
            return <div eventKey={id} title={title} className="empty_tab" 
                key={id} tab={<div className="empty_tab_btn"></div>}>
                {activeKey === 'cover' ? <></> : <div className={`tab_inner`}>
                    <div className="l_view_fallback py-5">
                    <div className="mb-20 _heading">
                      <p className="h_1">Empty View</p>
                    <p className="h_2">This view is empty for this listing, under the current view <span data-bs-toggle={isMobile ? 'offcanvas' : 'modal'} data-bs-target="#mode_selector" className="text-blue-1 pointer _link">Mode</span>. Choose from the available views</p></div>
                    <TagCloud
                        minSize={12}
                        maxSize={35}
                        tags={availableViews()}
                        colorOptions={color_options}
                        onClick={(tag) => listingMenuClick(tag.id)}
                        renderer={customRenderer}
                      />
                  </div>
            
                 </div>}
              </div>
          }
        }
          
        )
      }
    listingView = <>
      <div>

      <div key={listing.id} id={`profile_nav_menu`} transition={true} className='gx-tabs-right profile_nav_menu' defaultActiveKey={activeView} activeKey={activeKey} onSelect={(k) => setActiveKey(k)} >
       
      </div>
        
     <div key={listing.id} id={`profile_nav_menu`} transition={true} className='gx-tabs-right profile_nav_menu' defaultActiveKey={activeView} activeKey={activeKey} onSelect={(k) => setActiveKey(k)} >
      {showContent()}
      </div> 
      <Client>
        </Client>
        {/* <Client><ul className="listing_navigator">
            {listView}
        </ul></Client> */}
      </div>
      </>
    }else{
      listingView = <></>
    }
  }

  const annexContent = <Client>
        {isMobile ? 
          {/* <BottomMobileMenu keyId={id}
            customContent={
              <div>
                <div className='b_menu_content d-flex flex-row flex-nowrap gap-2 align-items-center'>
              {mobileMenuView}
              </div>
              </div>
              } 
            mMenuContent={{btnComponent: <i style={{fontSize : 35}} data-bs-toggle='offcanvas' data-bs-target="#visitor_actions" className='bi bi-three-dots'/>}}/> */}
            :
            <div className="actions_toggle z-2 position-fixed d-flex flex-col gap-2 flex-nowrap align-items-center" style={{right: '35px', bottom: '30px'}}>
              <NextPostLink current={listing.slug}/>
              <PreviousRouteLink/>
              <button className="mb-0 mx-0 btn btn-dark  z-2 rounded-circle" style={{height: '40px', width: '40px'}} data-bs-toggle='modal' data-bs-target="#visitor_actions"><i className="bi bi-three-dots"/></button>
            </div>
          } 
        {/* <BSReveal id={'listing_chat'} children={user ? <ProfileContact listing={listing} count={setChatCount}/> : <AuthPopUp defKey={'login'}/>}  title={`Chat with ${cleanHtml(listing?.title?.rendered)}`}/> */}

       {/*  <BSReveal id={'visitor_actions'} children={VisitorActionsView} title={<div className="d-flex justify-center">{logoView}</div>}/> */}
        </Client>


    return <>
    <div className={`gx-profile-content`} ref={tabRef}>
       {/*  <PageScroller activeKey={activeKey} resetKey={'home'}/> */}
        {listingView}
      </div>
      {annexContent}
    </>
}

const ProfileContent = memo(ProfileContentConst);
export default ProfileContent;


