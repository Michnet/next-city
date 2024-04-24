import { authState } from "@/contexts/atoms";
import { useSignal } from "@preact/signals-react";
import dynamic from "next/dynamic";
import {memo} from 'react';
import { useRecoilValue } from "recoil";
import { DualColorHeader } from "../UI/Partials";
const ComponentActivity = dynamic(() => import("../UI/partials/ComponentActivity"));
import { EventDatesActive } from "../UI/partials/dateViews/EventDates";
//import PageScroller from "../UI/partials/PageScroller";
const FAQs = dynamic(() => import("../UI/FAQs"));
const MegaGallery = dynamic(() => import("../UI/Galleries/MegaGallery"));
import LandingPage from "./LandingPage"
import listingMenu from "./ListingMenu";
import { ListingContact } from "./partials/ListingContact";
const ProfileContact = dynamic(() => import("./partials/ProfileContact"));
const ListingProductsSimple = dynamic(() => import("./shop/ListingProductsSimple"));
//const ListingStore = dynamic(() => import("./shop/ListingStore"));
const ListingReviews = dynamic(() => import("./reviews/Reviews"));

function ContentConst({listing, activeView,  activeKey, color, setActiveKey}) {
    const {id,about_us, listing_store, community_id, type} = listing;
    const {tickets} = listing_store;
    const {faqs} = about_us;
    let isSample = true;
    let chatCount = useSignal(0)

    const {user} = useRecoilValue(authState);
    let localMenu = listingMenu({listing:listing, userId: user?.id}); 

    function itContent(id){
        switch (id) {
            case 'gallery':
            return <MegaGallery listing={listing} /* color={color} *//>;
            case 'reviews':
            return <ListingReviews postID={listing.id} user={user}/>
            case 'home':
            return <LandingPage activeKey={activeKey} listing={listing} setActiveKey={setActiveKey} color={color}/>
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
            return <div className="card card-style shadow-0 border bg-transparent">
            <div className="content"><FAQs  faqs={faqs} postID={id}/> </div></div>
            case 'occurrences':
              return <EventDatesActive Id = {listing.id} dualColumn upcoming = {5} 
              fallBack={
                <ListingContact light listing={listing} title={'No future occurrences'} descript={'The listing owner has not added any future occurences for it. This may mean that the event has ended. Contact them to inquire further'}/>
              }/>;
            case 'tickets':
              return tickets?.length > 0 ? <div>
              <DualColorHeader exClass={'mb-20'} title={'Online booking available'} desc={'Book your slot at this event by selecting a ticket option. Click to see all the details before booking'}/>
              <ListingProductsSimple isSample ={isSample} listy ids={tickets} productType="booking" listingId = {id} relatedIds={tickets}/></div>
              :
              <ListingContact light listing={listing} title={'No online booking options'} descript={'The listing manager for this event has not added any online booking options. Contact them to inquire further'}/>
        }
    }

    function showContent(key){
        let tagGroup = localMenu.filter((el) => el.id == key)[0];
          if(tagGroup){
          const {id, icon, title, subTitle, innerClass, widgetClass, badge} = tagGroup;
          let content = itContent(id);
          
          if(content !== 'empty'){
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