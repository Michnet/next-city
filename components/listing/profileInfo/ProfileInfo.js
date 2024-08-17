import  {useState, useEffect, memo, useMemo} from "react";
import { Client } from "react-hydration-provider";
// import ListingLoader from "~/appComponents/components/skeletons/React-content-loader/FullPage/ListingPage";
//import StatCard from "../../LandingPages/teleportHq/conference1/components/StatCard";
// import PayMeans from './../../partials/PayMeans';
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import PageContact from "../partials/PageContact";
import Photos from "./partials/Photos";
import Widget from "@/components/UI/partials/Widget";
import { DualColorHeader, Floater } from "@/components/UI/Partials";
//import ListingStats from "./partials/ListingStats";
import TeamMini from "../team/TeamMini";
import About from "./partials/About";
import PostTerms from "./partials/PostTerms";
import AuthorCard from "./partials/AuthorCard";
import ListingSkeleton from "@/components/skeletons/fullPage/ListingSkeleton";
import PayMeans from "./partials/PayMeans";
import { Heading1 } from "@/components/UI/partials/headings/Heading1";
import RelatedByTaxSplide from "../RelatedByTaxSplide";
//import {srcWithFallback } from '@/helpers/universal';



const ProfileInfoConst = ({listing, setActiveKey, community, exClass=''}) => {
  //const [tags, setTags] = useState(null);
  const {members_count} = community ?? {}
  const [loading, setLoading] = useState(true)

  const cachedListing = useMemo(() => listing, [listing.id] );


  useEffect(() => {
    setLoading(true);
    setLoading(false);
    
  }, [listing?.id]);

    let historyView, teamView, performersView, statsView, guestsView, contactsView, contentView, groupView, tagsView, visionView, missionView, galleryView, paymentsView;
    
    if(listing){
      const {acf, content, cover, dir_tags, about_us, team, gallery, meta} = listing;
      const {"_special-guests": special_guests, _performers:performers} = meta ?? {}

      if(acf){
        const {contactDetails} = acf;
          if(contactDetails){
                contactsView= <PageContact contacts={contactDetails}/>

          } else{
            contactsView = <div></div>
          }
    
            if(gallery?.length > 0){
            galleryView = <Widget 
            noPadding
            styleName={'absolute_header handy_header shadow-none bg-transparent'}
                            title="Gallery"
                            icon = {'fas fa-images'}
                            >
                              <div className="listing_gallery">
                                <Photos photoList={gallery}/>
                                </div>
                                <div className="content_footer px-2 pb-2 bottom-0 position-absolute">
                                <button  className="btn btn-sm btn-secondary" onClick={() => {setActiveKey("gallery")}}> Go to Gallery <i className="bi bi-arrow-right-circle" /></button>
                                </div>
                            </Widget>
              }
     }

    /*  if(_stats?.length > 0){
      statsView = <Widget 
      title= 'Event stats'
      subtitle={'Key stats about event'}
      coverClass={'backdropGray'}
      cover= {srcWithFallback(processImg(gallery, cover))}
      icon = {'fas fa-stopwatch-20'}
      >
              <ListingStats stats={_stats}/>
      </Widget>
      
     } */

     if(dir_tags){
      groupView = <PostTerms linkTax={'category'} post={listing} termKey='dir_categories' taxonomy={'categories'} title={'Category'}/>
    }

      paymentsView = <PayMeans listingId={listing.id}/>

     /* if(content){
       contentView = <Widget freeHeader subtitle={'More About Listing'} title= 'Event Detail' > <div className="position-relative">
                          <Client><div className={`listing_content ${fullContent ? '' : 'truncate-5'}`} dangerouslySetInnerHTML={{ __html: content }}/>
                          </Client>
                          {fullContent ? <></> : <div className="_hidden_hint"></div>}
                        </div>
                        <div className="content_footer">
                          <button className="btn btn-sm mb-0 btn-outline-secondary" onClick={() => setFullContent(!fullContent)}>{fullContent ? 'Show Less' : 'Show More'}</button>
                        </div>
                      </Widget>
     } */
    /*  if(tags){
            tagsView = <Widget title= {<DualColorHeader exClass={'mb-0 sm-font'} title={'Tagged In'}/>}
            styleName={'no-pad'}
            headless
            ><div className='tags_row light'>
                <div className='row_content'>
                    <TagsCloud ids={dir_tags} dark/>
                    <DualColorHeader exClass='vertical_text lg_text' title={'# Tagged In'} />
                 </div>
                 </div>
                 </Widget>
        } */
        

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
  
    return (<>{loading ? <ListingSkeleton/> :
          <div className={`gx-profile-info ${exClass}`}>
              {/* <div className="row px-15">
                <div className="col-12 p-0 col-sm-6 col-md-4 col-xl-12">
                  {contentView}
                  <About communitySize={members_count ?? null} listing={listing} /> 
                  {performersView}
                  {statsView}
                  {guestsView}
                  {visionView}
                  {missionView}
                  {historyView}
                </div>

                <div className="col-12 p-0 col-sm-6 col-md-4 col-xl-12">
                      <AuthorCard exClass='mb-15' author={listing?.author} setActiveKey={setActiveKey} cover={listing?.cover}/>
                      {contactsView}
                      {groupView}
                      {paymentsView}
                      {teamView}
                </div>
              </div> */}

              <ResponsiveMasonry className="masonry_grid sticky_items hide_empty padded_items" columnsCountBreakPoints={{0: 1, 575: 2, 768: 3, 1199 : 1}}>
                <Masonry>
                  {contentView}
                  {/* <About communitySize={members_count ?? null} listing={cachedListing} /> */} 
                  {/* {performersView} */}
                  {statsView}
                  {tagsView}
                  {visionView}
                  {missionView}
                  {historyView}
                  <div><Heading1 exClass='mb-2 mx-3' title={'Author'} subtitle={'Listing Owner'}/>
                  <AuthorCard listingId={listing?.id} exClass='mb-20' author={listing?.author} setActiveKey={setActiveKey} cover={listing?.cover}/>
                  <Heading1 small exClass='mb-2 mx-3' title={'Related By Author'} subtitle={'Other listings by this Author'}/>
                  <RelatedByTaxSplide splideObj={{padding:0}} author={listing?.author} exclude={listing?.id}/>
                  </div>
                  {contactsView}
                  {groupView}
                  {paymentsView}
                  {teamView}
                </Masonry>
                </ResponsiveMasonry>
          </div>}
          </>                
    );
  
}

const ProfileInfo = memo(ProfileInfoConst)
export default ProfileInfo;


