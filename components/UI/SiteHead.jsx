import { homeurl, siteSettings } from "@/helpers/base";
import Head from "next/head";
//import { useRecoilValue } from "recoil";
//import { UIState } from "/contexts/contexts";
//import { homeurl, siteSettings } from "~/server/Base";

export default function SiteHead({pageColor, street_address, children, latitude, longitude,description, title, updated_time, image, slug, type, phone_number, robots }) {

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

  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
      <title>{`${title} | ${originalTitle}`}</title>
      <meta name="robots" content={`${robots ?? 'all'}`}/>
      <meta
        name="description"
        content={`${description ?? originalDescription}`}
      />

      <meta name="theme-color" content={`${color}`}/>

      <meta name="msapplication-navbutton-color" content={`${color}`}/>

      <meta name="apple-mobile-web-app-status-bar-style" content={`${color}`}/>

      <meta
        name="image"
        content={`${image ? image : originalImage}`}
        key="ogtitle"
      />
      {type ? (
        <meta property="og:type" content={type} key="ogtype" />
      ) : (
        <meta property="og:type" content="website" key="ogtype" />
      )}
      {updated_time && <meta
        property="og:updated_time"
        content={`${updated_time}`}
        key="ogupdated_time"
      />}
      {phone_number && <meta
        property="og:phone_number"
        content={`${phone_number}`}
        key="ogphone_number"
      />}
      {street_address && <meta
        property="og:street_address"
        content={`${street_address}`}
        key="ogstreet_address"
      />}
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
      <meta property="og:url" content={`${currentURL}${slug}`} key="ogurl" />
      <meta
        property="og:image"
        content={`${image ? image : originalImage}`}
        key="ogimage"
      />
      <meta property="og:site_name" content={siteName} key="ogsitename" />
      {children}
    </Head>
  );
}
