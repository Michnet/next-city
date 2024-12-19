import dynamic from "next/dynamic";
const ListingStater = dynamic(() => import("@/contexts/contextStaters/ListingStater"));
import { fetchIdsUrl, listingServerQuery } from "@/helpers/rest";
import { cleanHtml, closestColor,  } from "@/helpers/universal";
import { memo, useMemo } from "react";
import { useRouter } from "next/router";
const VisitRecord = dynamic(() => import('@/components/UI/VisitRecord'), { ssr: false });
import { EventJsonLd } from 'next-seo';

const ColorThief = require('colorthief');
import ListingPage from "@/components/routes/listingSingle/ListingPage";
import LazyLoad from "react-lazyload";
import { Skeleton } from "@/components/skeletons/Skeletons";
const RelatedListings = dynamic(() => import("@/components/listing/partials/RelatedListings"));

const apiType = 'event';

export async function getStaticPaths() {
    const res = await fetch(fetchIdsUrl({type: 'job_listing', per_page: 10, page: 1, listing_type:apiType, slugs: true}));
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
  
  export async function getStaticProps({ params, preview}) {

  
    let serverQuery = await listingServerQuery(params);
    let serverObj = serverQuery?.serverObj ?? {};
    let {listing} = serverObj ?? {};

    let seoMetaObj = {}
    const { latitude, longitude, phone, address, slug, modified} = listing ?? {};

    async function getThemeColor(){
      if(listing?.cover?.length > 0 && listing?.cover?.startsWith('http')){
        let gota = await ColorThief.getColor(listing?.cover)
        .then(color => {return color})
        .catch(err => { console.log('color error', err) });
        if(gota){
          //console.log('coverColor xxxxxxxxxxxxxx', gota);
          //serverObj.coverColor = closestColor(gota, siteColorsArray);
        }
      }
    }

    if(listing && listing != 'undefined'){
      seoMetaObj= {
        title:`${cleanHtml(listing?.title?.rendered)}`, 
         description:`${listing?.short_desc}`,
         image:listing?.large_thumb,
         type:'business',
         updated_time:modified,
         phone_number:phone,
         street_address:address,
         latitude:latitude,
         longitude:longitude,
         slug:`/${apiType}s/${slug}`,
         pageColor: serverObj?.themeColorHex ?? null
      }
      await getThemeColor();
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
            pageClass: '_listing _event',
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

  const ListingConst = ({listing, themeColor, themeColorHex, coverColor}) => {
    
    const {latitude, type, longitude, address, gallery, xtra_large_thumb, locations, venue, rating, event_date,category, dir_categories, id:listingId} = listing ?? {};
    const router = useRouter();
    const {query} = router;

   const cachedListing = useMemo( () => listing, [listing?.id] );   

   if(listing && listing != 'undefined' ){
    return <><div className={`listing_page _${apiType} ${query?.view &&  query?.view !== 'home' ? '_section' : ''}`}>
    
    <EventJsonLd
      name={`${cleanHtml(listing?.title?.rendered)}`}
     // startDate={event_date[0]?.start}
      //endDate={event_date[0]?.end}
      location={{
        name: venue,
        //sameAs: 'https://example.com/my-place',
        address: {
          streetAddress: {address},
          addressLocality: locations[0]?.name,
          //addressRegion: 'CA',
          //postalCode: '95129',
          //addressCountry: 'US',
        },
      }}
      geo={{
        latitude: latitude,
        longitude: longitude,
      }}
      rating={{
        ratingValue: (rating/10) * 5,
        ratingCount: '18',
      }}
      images={[xtra_large_thumb, ...gallery]}
      description={`${listing?.short_desc}`}
    />

    <ListingPage listing={cachedListing} themeColor={themeColor} themeColorHex={themeColorHex}/>
    <RelatedListings type={type} category={category} locations={locations} dir_categories={dir_categories} listingId={listingId}/>
    <VisitRecord Id={listing?.id}/>
    <ListingStater id={listing?.id}/></div>
              </> 
   }else{
    const NotFound = dynamic(() => import("@/components/UI/site/NotFound"));
    const ActivityCarousel = dynamic(() => import("@/components/UI/Listings/ActivityCarousel"));
      return <div>
      <NotFound title='Page not available' description='The Page you are trying to view is not available at the moment. This can be caused by an error in the page address you entered. It could also mean that the page is under review and not yet published'/>
      <ActivityCarousel optionsObj={{arrows: true}} skeletonHeight={200} skeletonWidth={270} thumbsize={'xtra_large_thumb,thumbnail'} cardWidth={270} gap={15} exCardClass={'_mini'} title={'Check out the latest'}  iconClass={'fas fa-calendar-week'} limit={10} cardType={5} exClass={'px-0'} height={210} />
      </div>
   }
    

  }


  const Listing = memo(ListingConst);
  
  export default Listing;