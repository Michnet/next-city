import { setSeoData } from "@/app/utils/helpers";
//import LandingPage from "@/components/listing/LandingPage";
import ProfileHeaderMini from "@/components/listing/landingPages/hero/profileHeaderMini";
import ProfileContact from "@/components/listing/partials/ProfileContact";
import ListingReviews from "@/components/listing/reviews/Reviews";
import MegaGallery from "@/components/UI/Galleries/MegaGallery";
import ComponentActivity from "@/components/UI/partials/ComponentActivity";
import {listingServerQuery } from "@/helpers/rest";
//import { cleanHtml } from "@/helpers/universal";
//import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  let serverQuery = await listingServerQuery(params);
    let {serverObj} = serverQuery ?? {};
    let {listing} = serverObj ?? {};

    function processTitle(view){
        switch (view) {
            case 'reviews':
                return 'Our user Reviews';
            case 'private-chat':
                return 'Contact Us';
            case 'gallery':
                return 'See Our Gallery';
            case '':
                return 'Home';
            case 'community':
                return 'Our community';
        
            default:
                break;
        }
    }
  
  const metadata = setSeoData(
    { seo: {
        title: processTitle(params.view),
    }
  })

  return {
    ...metadata,
  }
}

export async function generateStaticParams() {
  let list = ['reviews', 'gallery', 'private-chat','community'];
    const paths = list.map((el) => {
      return {view: el}
    })
  return paths;
}

export default async function Page({ params }) {
    const {view} = params;

    let serverQuery = await listingServerQuery(params);
    let {serverObj} = serverQuery ?? {};
    let {listing, author_id, themeColor} = serverObj ?? {};
    
/* 
    if(listing && listing != 'undefined'){
      seoMetaObj= {
        title:`${cleanHtml(listing?.title?.rendered)}`, 
         description:`${listing?.short_desc}`,
         image:listing?.large_thumb,
         type:'event',
         updated_time:modified,
         phone_number:phone,
         street_address:address,
         latitude:latitude,
         longitude:longitude,
         slug:`/events/${slug}`,
         pageColor: serverObj?.themeColorHex ?? null
      }
    }
 */

    function renderView(){
        switch (view) {
            case 'reviews':
                return <ListingReviews postID={listing.id}  author_id={author_id} /* user={user} setActiveKey={setActiveKey} *//>;
            case 'private-chat':
                return <ProfileContact listing={listing} /* count={chatCount} *//>;
            case 'community':
                  return <ComponentActivity
                  setActiveKey={setActiveKey}
                  interactive={true}
                  noLink
                  type={type}
                  scope={'groups'}
                  scope_slug = 'group_id'
                  scope_id={community_id}
                  />
            case 'gallery':
            return <MegaGallery listing={listing} /* color={color} *//>
            default:
                break;
        }
    }
 
      return <div className="page-content single_listing">
        <ProfileHeaderMini /* activeKey={activeKey} setActiveKey={setActiveKey} */   color={themeColor} listing={listing}/>
        <div className="p-3 position-relative z-2">{renderView()}</div>
       {/* <LandingPage listing={listing} colorHex={themeColorHex} color={themeColor} /> */}
       </div>
}
