//"use client";

import  {useState, useEffect, memo} from "react";
import { Client } from "react-hydration-provider";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import PageContact from "../partials/PageContact";
import Widget from "@/components/UI/partials/Widget";
import { DualColorHeader, Floater } from "@/components/UI/Partials";
//import ListingStats from "./partials/ListingStats";
import TeamMini from "../team/TeamMini";
//import About from "./partials/About";
import PostTerms from "./partials/PostTerms";
import AuthorCard from "./partials/AuthorCard";
import {ListingSkeleton} from "@/components/skeletons/fullPage/PageSkeletons";
import PayMeans from "./partials/PayMeans";



const ProfileInfoConst = ({listing, setActiveKey, community, exClass=''}) => {
  //const {members_count} = community ?? {}
  const [loading, setLoading] = useState(true)

  //const cachedListing = useMemo(() => listing, [listing.id] );

  useEffect(() => {
    setLoading(true);
    setLoading(false);
    
  }, [listing?.id]);

    let historyView, teamView, performersView, statsView, guestsView, contactsView, groupView, tagsView, visionView, missionView, galleryView, paymentsView;

    
    if(listing){
      const {acf, content, cover, dir_tags, dir_categories, about_us, team, gallery, meta,phone,website,whatsapp, type} = listing;
      const {"_special-guests": special_guests, _performers:performers} = meta ?? {}

     contactsView= <PageContact phone = {phone} website={website}whatsapp={whatsapp} /* contacts={contactDetails} *//>

     if(dir_categories?.length > 0){
      groupView = <PostTerms linkTax={'category'} post={listing} termKey='dir_categories' taxonomy={'categories'} title={'Category'}/>
    }

      paymentsView = <PayMeans listingId={listing.id} type={type}/>

        if(about_us){
          const {our_vision, our_mission, our_history, opening_date} = about_us;
          if(our_vision){
            visionView = <Widget styleName={'left_bar'} title={'Our Vision'}>
              <div className="listing_vision" dangerouslySetInnerHTML={{ __html: our_vision }}/>

            </Widget>
          }
          if(our_mission){
            missionView = <Widget styleName={'left_title'} title={'Our Mission'}>
              <div className="listing_mission" dangerouslySetInnerHTML={{ __html: our_mission }}/>
              <Floater primText={'Our Mission'} exClass={'lower_right'}/>

            </Widget>
          }

          if(our_history){
            historyView = <Widget 
                           title= 'Our History'
                           icon = {<i className="bi bi-flag" />}
                           >
                             <Client><div className="listing_content" dangerouslySetInnerHTML={{ __html: our_history }}/></Client>
                           </Widget>
          }
        }
        if(team?.length > 0){
          teamView = <TeamMini list={team} title="Our Team" description={`We are simply excited`}/>;
        }   
        
        if(performers?.length > 0){
          performersView = <><DualColorHeader extras={<span class="badge rounded-pill bg-info">{`${performers?.length}`}
          </span>} exClass='mt-2 mb-3 ml-15 _font-size' title={'Keynote Person(s)'}/><TeamMini list={performers} rounded title="Keynote Artists" description={`Meet Uganda's top talent`}/></>;
        } 
        if(special_guests?.length > 0){
          guestsView = <><DualColorHeader extras={<span class="badge rounded-pill bg-info">{`${special_guests?.length}`}
          </span>} exClass='mt-2 mb-3 ml-15 _font-size' title={'Other Guest(s)'}/><TeamMini list={special_guests} rounded title="Keynote Artists" description={`Meet Uganda's top talent`}/></>;
        } 
     }
   
     if(loading){
        return <ListingSkeleton/>;
     }else{
      return <div className={`gx-profile-info ${exClass}`}>
          <ResponsiveMasonry className="masonry_grid sticky_items hide_empty padded_items mb-3" columnsCountBreakPoints={{0: 1, 575: 2, 768: 3}}>
            <Masonry>
              <AuthorCard listingId={listing?.id} exClass='mb-20' author={listing?.author} setActiveKey={setActiveKey} cover={listing?.cover}/>
              {contactsView}
              {groupView}
              {paymentsView}
              {teamView}
            </Masonry>
            </ResponsiveMasonry>
        </div>
     }
}

const ProfileInfo = memo(ProfileInfoConst)
export default ProfileInfo;


