import { setSeoData } from "@/app/utils/helpers";
import LandingPage from "@/components/listing/LandingPage";
import Hero2 from "@/components/listing/landingPages/hero/Hero2";
import { fetchIdsUrl, listingServerQuery } from "@/helpers/rest";
import { cleanHtml } from "@/helpers/universal";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  let serverQuery = await listingServerQuery(params);
    let {serverObj} = serverQuery ?? {};
    let {listing} = serverObj ?? {};

    //let seoMetaObj = {}
    const {title} = listing ?? {};
  
  const metadata = setSeoData(
    { seo: {
      title: cleanHtml(title?.rendered)
    }
  })

  return {
    ...metadata,
  }
}

export async function generateStaticParams() {
  const res = await fetch(fetchIdsUrl({type: 'job_listing', per_page: 10, page: 1, listing_type:'event', slugs: true}));
    const data = await res.json();
    const paths = data?.map(item => {
        return {
            params: {slug : `${item}`, exClass: '_listing'}
        }
    });
  return paths;
}

export default async function Page({ params }) {
    
    let serverQuery = await listingServerQuery(params);
    let {serverObj} = serverQuery ?? {};
    let {listing, themeColorHex, themeColor} = serverObj ?? {};
    
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
    if (listing) {
      return (<>
        <Hero2 main={true} listing={listing} params={params} /*user={user} token={token} color={color} activeKey={activeKey} setActiveKey={setActiveView} *//>
       <LandingPage listing={listing} colorHex={themeColorHex} color={themeColor} /* activeKey={activeKey}  setActiveKey={setActiveKey} */ />
       </>
       );
    }else{
      return notFound();
    }

  //if (!contentNode) return notFound()

  /* switch (contentNode.contentTypeName) {
    case "page":
      return <PageTemplate node={contentNode} />
    case "post":
      return <PostTemplate node={contentNode} />
    default:
      return <p>{contentNode.contentTypeName} not implemented</p>
  } */
}
