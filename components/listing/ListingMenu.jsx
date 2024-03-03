import { activeDateState } from "@/contexts/atoms";
import { useRecoilValue } from "recoil";
//import { activeDateState, listingNoticesState } from "~/contexts/contexts";

export default function listingMenu({listing, userId}){

  const {type, about_us, author_id, gallery,community_id} = listing ?? {};
  const {faqs} = about_us ?? {};
  const {act_dates} = useRecoilValue(activeDateState);

  const acf = listing?.acf;
  const{listing_articles, general_merchandise, tickets} = acf ?? {};

 let tabList = [
  {
    id : 'home',
    icon : "las la-home",
    title : 'Home', 
    subTitle : "This is home", 
    widgetClass: 'pt-0 no-pad',
  },
  /* {
    id: 'profile',
    icon : 'lar la-id-card',
    title: 'About',
    subTitle: 'Profile Info',
    widgetClass : 'profile widgey',
  }, */
 /*  { 
    id: 'community',
    icon: "lar la-comments",
    title: 'Community', subTitle : "Public Chat", 
    widgetClass: "pad_tab",
    innerClass: 'bg_tab',
    content: <WpComments
          maxDepth={1}
          postID={listing.id}
          hostUrl={WPDomain}
          allowComments={user ? true : false}
          //user = {userObj}
        />
  }, */
  
  {
    id: 'reviews',
    icon:  "lar la-star", title : 'Reviews',
    subTitle :"User Rating",
    widgetClass: 'pad_tab',
    innerClass: 'bg_tab border-0',
    //content : <div className='inner_container'> <ListingReviews postID={id} user={user}/> </div>
  }
];

 if(community_id){
  tabList.push(
    { 
      id: 'community',
      icon: "lar la-comments",
      title: 'Community', subTitle : "Public Chat", 
      widgetClass: "pad_tab bg-white",
      innerClass: 'bg_tab border-0 pb-0 mb-0',
      /* content: <ComponentActivity
            noLink
            scope={'groups'}
            scope_slug = 'group_id'
            scope_id={community_id}
          /> */
    }
  )
}

if(!userId || userId != author_id){
  tabList.push(
    {
      id: 'private-chat',
      icon: "las la-sms", 
      title: 'Contact Us',
      subTitle : "Private Chat", 
      widgetClass : "widgey",
      innerClass: 'bg_tab private_chat',
    }
  )
}

if(type === 'event'){
  tabList.push(
    {
      id: 'occurrences',
      icon: 'lar la-calendar',
      title: 'Dates',
      subTitle : 'Occurences', 
      widgetClass:  'profile widgey',
      badgeNumber: act_dates?.length ?? 0,
      badgeClass: 'bg-success'
    }
  );
}

if(faqs?.length > 0){
  tabList.push({
    id : 'faqs',
    icon: "lar la-question-circle", 
    title: 'FAQs',
    subTitle : "Frequent Questions",
    widgetClass: 'widgey',
  });
}


/* if(schedule){
   tabList.push(
  {
    id: 'schedule',
    icon: 'lar la-calendar-check',
    title: 'Schedule',
    subTitle:  'Business Hours',
    widgetClass: 'pad_tab',
    innerClass : 'bg_tab',
    content: <BusinessHours schedule={schedule}/>
  }
   )
} */

if(gallery?.length > 0){
   tabList.push(
    {
      id: 'gallery',
      icon: 'las la-photo-video',
      title: 'Gallery',
      subTitle : 'Photo Album',
      widgetClass : "_gallery  glass no-pad",
      innerClass: 'inner__class px-10',
     // content: <MegaGallery gallery={listing.gallery}/>
    }
   )
}/* else{
  tabList.push({
    id: 'gallery',
    content: 'empty'
  })
}  */

if(listing_articles){
 tabList.push(
  {
    id : 'articles',
    icon : "las la-book", 
    title: 'Blog',
    subTitle : "Our Articles", 
    widgetClass: "pad_tab",  
    innerClass : 'bg_tab',
  }
 )
}else{
  tabList.push({
    id: 'articles',
    content: 'empty'
  })
}

if(general_merchandise?.length > 0){
    tabList.push({
      id : 'merchandise',
      icon: "las la-store-alt", title: 'Shop',
      subTitle : "Our Products",
      widgetClass: 'shop widgey gx-px-lg-0 bg-transparent',
      badgeNumber: general_merchandise?.length ?? 0,
      badgeClass: 'bg-warning',
    });
}else{
  tabList.push({
    id: 'merchandise',
    content: 'empty'
  })
}


if(type === 'event'){

  tabList.push({
    id : 'tickets',
    icon: "las la-ticket-alt", title: 'Tickets',
    subTitle : "Booking Options",
    widgetClass: 'shop widgey ',
    badgeNumber: tickets?.length ?? 0,
    badgeClass: 'bg-info',
    buttony: true
  });
}

return tabList;
}



