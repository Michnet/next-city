import dynamic from "next/dynamic";
const ListingStater = dynamic(() => import("@/contexts/contextStaters/ListingStater"));
import { fetchIdsUrl, listingServerQuery } from "@/helpers/rest";
import { cleanHtml,  } from "@/helpers/universal";
import { memo, useMemo } from "react";
import { useRouter } from "next/router";
const VisitRecord = dynamic(() => import('@/components/UI/VisitRecord'), { ssr: false });

//const ColorThief = require('colorthief');

import NotFound from "@/components/UI/site/NotFound";
import ActivityCarousel from "@/components/UI/Listings/ActivityCarousel";
import ListingPage from "@/components/routes/listingSingle/ListingPage";
import RelatedListings from "@/components/listing/partials/RelatedListings";


export async function getStaticPaths() {
    const res = await fetch(fetchIdsUrl({type: 'job_listing', per_page: 10, page: 1, listing_type:'service', slugs: true}));
    const data = await res.json();
    const paths = data?.map(item => {
        return {
            params: {slug : `${item}`}
        }
    });
  
    return {
        paths,
        fallback: 'blocking'
    } 
  }
  
  export async function getStaticProps({ params }) {
    let serverQuery = await listingServerQuery(params);
    let {serverObj} = serverQuery ?? {};
    let {listing} = serverObj ?? {};

    let seoMetaObj = {}
    const { latitude, longitude, phone, address, slug, modified, type} = listing ?? {};

    if(listing && listing != 'undefined'){
      seoMetaObj= {
        title:`${cleanHtml(listing?.title?.rendered)}`, 
         description:`${listing?.short_desc}`,
         image:listing?.large_thumb,
         type:'service',
         updated_time:modified,
         phone_number:phone,
         street_address:address,
         latitude:latitude,
         longitude:longitude,
         slug:`/services/${slug}`,
         pageColor: serverObj?.themeColorHex ?? null
      }
    }

    return {
      props: {
        seoMeta:{...seoMetaObj
        },
        ...serverObj,
        headerTitle: listing?.title?.rendered ?? 'Listing',
        settings : {
            uiBackground:listing && listing != 'undefined' ? listing?.cover : null,
            noFooter: true,
            pageClass: '_listing _service',
            mMenu: 'show',
            mMenuContent:{
              icon : 'fas fa-ellipsis-h', 
              btnProps:{
              'data-menu' : "listingActions"}
              
          },
          noHeader: listing && listing != 'undefined' ? true : false
        },
      },
      revalidate: 300, // In seconds
    }
  }

  const ListingConst = ({listing, themeColor, themeColorHex}) => {
    
    const {type, locations, category, dir_categories, id:listingId} = listing ?? {};
    const router = useRouter();
    const {query} = router;


   const cachedListing = useMemo( () => listing, [listing?.id] );   

    return <>{listing && listing != 'undefined' ? <><div className={`listing_page ${query?.view &&  query?.view !== 'home' ? '_section' : ''}`}>


    <ListingPage listing={cachedListing} themeColor={themeColor} themeColorHex={themeColorHex} listingType={'service'}/>
    <RelatedListings type={type} category={category} locations={locations} dir_categories={dir_categories} listingId={listingId}/>
    <VisitRecord Id={listing?.id}/>
    <ListingStater type={listing?.type} id={listing?.id}/></div>
              </> :
    <div>
      <NotFound title='Page not available' description='The Page you are trying to view is not available at the moment. This can be caused by an error in the page address you entered. It could also mean that the page is under review and not yet published'/>
      <ActivityCarousel optionsObj={{arrows: true}} skeletonHeight={200} skeletonWidth={270} thumbsize={'xtra_large_thumb,thumbnail'} cardWidth={270} gap={15} exCardClass={'_mini'} title={'Check out the latest'}  iconClass={'fas fa-calendar-week'} limit={10} cardType={5} exClass={'px-0'} height={210} />
      </div>}</>

  }


  const Listing = memo(ListingConst);
  
  export default Listing;