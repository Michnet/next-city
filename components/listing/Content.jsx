import { authState } from "@/contexts/atoms";
import { openOffCanvas } from "@/helpers/appjs";
import { useSignal } from "@preact/signals-react";
import dynamic from "next/dynamic";
import {memo, useMemo} from 'react';
import { TagCloud } from "react-tagcloud";
import { useRecoilValue } from "recoil";
import { DualColorHeader } from "../UI/Partials";
const ComponentActivity = dynamic(() => import("../UI/partials/ComponentActivity"));
import { EventDatesActive } from "../UI/partials/dateViews/EventDates";
//import PageScroller from "../UI/partials/PageScroller";
const FAQs = dynamic(() => import("../UI/FAQs"));
const MegaGallery = dynamic(() => import("../UI/Galleries/MegaGallery"));
import LandingPage from "./LandingPage"
//import listingMenu from "./ListingMenu";
import { ListingContact } from "./partials/ListingContact";
const ProfileContact = dynamic(() => import("./partials/ProfileContact"));
const ListingProductsSimple = dynamic(() => import("./shop/ListingProductsSimple"));
//const ListingStore = dynamic(() => import("./shop/ListingStore"));
const ListingReviews = dynamic(() => import("./reviews/Reviews"));

function ContentConst({listing, colorHex, activeView, lMenu, activeKey, color, setActiveKey}) {
    const {id,about_us, listing_store, community_id, type, author_id, gallery} = listing;
    const {tickets, general_merchandise} = listing_store;
    const {faqs} = about_us;
    let isSample = true;
    let chatCount = useSignal(0)

    const {user} = useRecoilValue(authState);

    function itContent(tabId){
        switch (tabId) {
            case 'gallery':
            return gallery?.length > 0 ? <MegaGallery listing={listing} /* color={color} *//> : 'empty';
            case 'reviews':
            return <ListingReviews postID={listing.id} user={user} setActiveKey={setActiveKey} author_id={author_id}/>
            case 'home':
            return <LandingPage colorHex={colorHex} activeKey={activeKey} listing={listing} setActiveKey={setActiveKey} color={color}/>
            case 'community':
            return <ComponentActivity
            setActiveKey={setActiveKey}
            noLink
            scope={'groups'}
            scope_slug = 'group_id'
            scope_id={community_id}
            />
            case 'private-chat':
            return <ProfileContact listing={listing} count={chatCount}/>
            case 'faqs':
            return <div className="card card-style m-0 shadow-0 border bg-transparent">
            <div className="content"><FAQs  faqs={faqs} postID={id}/> </div></div>
            case 'occurrences':
              return <><DualColorHeader exClass={'mb-20 text-center justify-center'} title={'Event Ocurrences'} subTitle={'Dates and time'}/>
              <EventDatesActive Id = {listing.id} dualColumn upcoming = {5} 
              fallBack={
                <ListingContact light listing={listing} title={'No future occurrences'} descript={'The listing owner has not added any future occurences for it. This may mean that the event has ended. Contact them to inquire further'}/>
              }/></>;
            case 'merchandise':
              return general_merchandise?.length > 0 ? <div className='px-3'>
              <DualColorHeader exClass={'mb-20 mt-20'} title={'Event Store'} desc={"Items available for this event. You can pre-order or contact the listing's manager"}/>
              <ListingProductsSimple isSample ={isSample} listy ids={general_merchandise} productType="simple" listingId = {listing?.id} relatedIds={general_merchandise}/></div> : 'empty';
            case 'tickets':
              return tickets?.length > 0 ? <div>
              <DualColorHeader exClass={'mb-20'} title={'Online booking available'} desc={'Book your slot at this event by selecting a ticket option. Click to see all the details before booking'}/>
              <ListingProductsSimple isSample ={isSample} listy ids={tickets} productType="booking" listingId = {id} relatedIds={tickets}/></div>
              :
              <ListingContact light listing={listing} title={'No online booking options'} descript={'The listing manager for this event has not added any online booking options. Contact them to inquire further'}/>
        }
    }

   // const cachedContent = useMemo(() => itContent(id), [id] );

    function showContent(key){
        let tagGroup = lMenu.filter((el) => el.id == key)[0];
          if(tagGroup){
          const {id, icon, title, subTitle, innerClass, widgetClass, badge} = tagGroup;
          let content = itContent(id);
          
          if(content == 'empty'){
            
            
            const customRenderer = (tag, size, color) => {
              return (
                <span  key={tag.id} style={{ color }} className={`fb_tag pointer tag-${size}`}>
                  {tag.value}
                </span>
              )
            }

            const color_options = {
              luminosity: 'dark',
              //hue: color,
            }

            function availableViews(){
              let tagsArr = [];
              lMenu.map((el) => {
              const {id, icon, content, title, subTitle} = el;
              if(content != 'empty'){
                tagsArr.push({value: title, id : id, count: 30})
              }
              });
              return tagsArr;                                
            }
          return <div  id={`${listing.id}_${id}`} key={id} title={title} className={`empty_tab tabpane`}>
                  {activeKey === 'cover' ? <></> : <div className={`tab_inner`}>
                      <div className="l_view_fallback py-5">
                      <div className="mb-20 _heading">
                        <p className="h_1">{title}</p>
                      <p className="h_2">This view is empty for this listing, under the current view mode. <span data-menu='activeViewModal' onClick={(e) => openOffCanvas(e)} className="text-blue-1 pointer _link">Change the view mode</span>. Alternatively, choose from the available views below</p></div>
                      <TagCloud
                          minSize={12}
                          maxSize={35}
                          tags={availableViews()}
                          colorOptions={color_options}
                          onClick={(tag) => setActiveKey(tag.id)}
                          renderer={customRenderer}
                        />
                    </div>
                  </div>}
                </div>

          }else{

            if(id === 'occurrences'){
              if(type !== 'event'){
                  return;
              }
            }
           /*  if(mobileHideList.includes(id)){

            } */
            return <div  id={`${listing.id}_${id}`} key={id} title={title} className={`tabpane ${widgetClass}`}>
                       {activeKey === 'cover' ? <></> :  <div className={`tab_inner ${innerClass ?? ''}`}>
                          {content}
                        </div>}
                    </div>
          }
        }
    }

  return (
    <>
     {showContent(activeKey)}
    </>
  )
}

const Content = memo(ContentConst);
export default Content