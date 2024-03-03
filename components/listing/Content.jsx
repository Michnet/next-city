import { authState } from "@/contexts/atoms";
import dynamic from "next/dynamic";
import { useRecoilValue } from "recoil";
import { DualColorHeader } from "../UI/Partials";
const FAQs = dynamic(() => import("../UI/FAQs"));
const MegaGallery = dynamic(() => import("../UI/Galleries/MegaGallery"));
import LandingPage from "./LandingPage"
import listingMenu from "./ListingMenu";
import ListingStore from "./shop/ListingStore";
const ListingReviews = dynamic(() => import("./reviews/Reviews"));

function Content({listing, activeView,  activeKey, color, setActiveKey}) {
    const {id,about_us, listing_store} = listing;
    const {tickets} = listing_store;
    const {faqs} = about_us;

    console.log('tickssss', tickets)

    const {user} = useRecoilValue(authState);
    let localMenu = listingMenu({listing:listing, userId: user?.id}); 

    function itContent(id){
        switch (id) {
            case 'gallery':
            return <MegaGallery listing={listing} /* color={color} *//>;
            case 'reviews':
            return <ListingReviews postID={listing.id} user={user}/>
            case 'home':
            return <LandingPage activeKey={activeKey} listing={listing} setActiveKey={setActiveKey}/>
            case 'faqs':
            return <div className="card card-style shadow-0 border bg-transparent">
            <div className="content"><FAQs  faqs={faqs} postID={id}/> </div></div>
            case 'tickets':
            return tickets?.length > 0 ? <div className="card card-style shadow-0 border bg-transparent">
            <div className="content">
            <DualColorHeader exClass={'mb-20'} title={'Online booking available'} desc={'Book your slot at this event by selecting a ticket option. Click to see all the details before booking'}/>
            <ListingStore listy ids={tickets} productType="booking" listingId = {listing.id} relatedIds={tickets}/></div></div>
            :
            <>
            <></>
            {/* <ListingContact light listing={listing} title={'No online booking options'} descript={'The listing manager for this event has not added any online booking options. Contact them to inquire further'}/> */}
            </>
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
export default Content