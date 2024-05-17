import { homeurl, siteSettings } from "@/helpers/base";
import { NextSeo } from "next-seo";
//import { NextSeo } from "next/document";
//import NextSeo from "next/head";
import { usePathname} from "next/navigation";
//import { useRecoilValue } from "recoil";
//import { UIState } from "/contexts/contexts";
//import { homeurl, siteSettings } from "~/server/Base";

export default function SeoHead({seoMeta }) {
 // console.log('seoMeta in head', seoMeta)
  const {title, description, pageColor, street_address, children, latitude, longitude, updated_time, image, slug, type, phone_number, robots} = seoMeta ?? {};
  const pathname = usePathname()
  //const {colorTheme} = useRecoilValue(UIState);
  //const {colors} = colorTheme;
  //const  color = colors[0] ?? '#0F2844';
  const  color = pageColor ?? '#fefefe';
  const originalTitle = "LyveCity";
  const originalDescription = "Your new portal to places you love and events you can't miss. Explore and connect with places and events that resonate with your passions and interests";
  const twitter = "LyveCity";
  const siteName = "LyveCity";
  const originalImage =  `${homeurl}${siteSettings.logo_link}`;
  const currentURL = "lyvecity.com";

  let pageTitle = title ?? originalTitle,
  pageDescription = description ?? originalDescription,
  pageUrl = `${homeurl}${slug}`,
  pageType = type ?? 'website';

  return (
    <NextSeo
      type={pageType}
      title={pageTitle}
      titleTemplate = '%s | LyveCity'
      description={pageDescription}
      canonical= {pageUrl}
      openGraph={{
        url: `${pageUrl}`,
        title: `${pageTitle}`,
        description: `${pageDescription}`,
        images: [
          /* {
            url: `${image ?? originalImage}`,
            width: 800,
            height: 600,
            alt: 'Og Image Alt',
            type: 'image/jpeg',
          }, */
          { url: `${image ?? originalImage}` },
        ],
        siteName: 'LyveCity',
      }}
      /* twitter={{
        handle: '@handle',
        site: '@site',
        cardType: 'summary_large_image',
      }} */
    >
      <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, viewport-fit=cover" />
      <meta charSet="utf-8" />
      <title>{`${title} | ${originalTitle}`}</title>
      <meta name="robots" content={`${robots ?? 'all'}`}/>
      <meta property="description" content={`${description ?? originalDescription}`} key="ogDescription"/>
      <meta name="theme-color" content={`${color}`}/>
      <meta name="msapplication-navbutton-color" content={`${color}`}/>
      <meta name="apple-mobile-web-app-status-bar-style" content={`${color}`}/>
      {type ? (
        <meta property="og:type" content={type} key="ogtype" />
      ) : (
        <meta property="og:type" content="website" key="ogtype" />
      )}
      {updated_time && <meta property="og:updated_time" content={`${updated_time}`} key="ogupdated_time" />}
      {phone_number && <meta property="og:phone_number" content={`${phone_number}`} key="ogphone_number" />}
      {street_address && <meta property="og:street_address" content={`${street_address}`} key="ogstreet_address" />}
      {longitude && <meta
        property="og:longitude"
        content={`${longitude}`}
        key="oglongitude"
      />}
      {latitude && <meta
        property="og:latitude"
        content={`${latitude}`}
        key="oglatitude"
      />}
      <meta
        property="og:title"
        content={`${title ? title : originalTitle}`}
        key="ogtitle"
      />
      <meta
        property="og:description"
        content={`${description ? description : originalDescription}`}
        key="ogdesc"
      />
      <meta
        property="twitter:card"
        content="summary_large_image"
        key="twcard"
      />
      <meta name="twitter:creator" content={twitter} key="twhandle" />
      <meta
        name="twitter:title"
        content={`${title ? title : originalTitle}`}
        key="twtitle"
      />
      <meta
        name="twitter:description"
        content={`${description ? description : originalDescription}`}
        key="twdescription"
      />
      <meta
        name="twitter:image"
        content={`${image ? image : originalImage}`}
        key="twimage"
      />
      {/* <meta property="og:url" content={`${homeurl}${slug}`} key="ogurl" /> */}
      <meta
        property="og:image"
        content={`${image ? image : originalImage}`}
        key="ogimage"
      />
      <meta property="og:site_name" content={siteName} key="ogsitename" />
      {children}
    </NextSeo>
  );
}
