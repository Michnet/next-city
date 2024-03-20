import ky from "ky";
//import { homeurl } from '~/server/Base';
//import { siteSettings } from '~/server/Base';
export const authKey = 'Q+#s)pEs;`Bhf+@J+I6Wf<Wx8;8?J6?.fcpEWAS0-nV6-FQW[x@L2IeJ$e}Mf9-n';
export const WPDomain = 'https://lyvecityclub.com';
export const homeurl = 'https://lyvecity.com';
export const userReviews = 'jet-reviews-api/v1';
export const googleDirectionsUrl = 'https://www.google.com/maps/dir/';

export const siteSettings = {
  logo_link : '/app/logos/Lyvecity.png',
  light_logo_link: '/app/logos/Lyvecity_light.png',
  wpDomain : 'https://lyvecityclub.com',
  description: "Your portal to the places you love and events you can't miss",
  siteKeys: {g_auth_client_id:"815997455637-qs8kvv9h34ppnrlg73p3o40bntgdbu61.apps.googleusercontent.com",
  g_auth_client_secret :"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",
  rebuild_key :"LJ[Z20|1I9gb<5w",
  wc_username :"ck_b79f7fccc4c7e16d4bebf701044f3be1ab446fb7",
  wc_password :"cs_fdb465d5c840d4f4694167b7fe5ce7a21ba9d7ae","tw_api_key":"TAKAyRQyz8txGTxIXBhlEymhf",
  tw_api_secret :"JWMXPN4zkZqV540JtzbAIy1ekF9o4MoRwnXnTt0J4zOEljScLp",
  "X-RapidAPI-Key":"84b45df611mshe08261c4563536ep135fbcjsn10f20cf7f28c",
  openAIRapidHost :"open-ai21.p.rapidapi.com"
  }
}
 export const WPRepository = () => {

 }

export const oathInfo =  {
  consumer_key: siteSettings.siteKeys.wc_username,
  consumer_secret: siteSettings.siteKeys.wc_password,
  //site : 'lyvecity'
}

export const fallbackImgBlur = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAACCAYAAAB/qH1jAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAJ0lEQVR4nGOwTqj5v+v/fzAO7Fv1n4GBVeq/hl3of5OAzP/MYur/AVn6EhAbYAT8AAAAAElFTkSuQmCC";

export const fallbackImgSrcSet = "/_next/image?url=%2Fimages%2Fbg%2Ffallback.jpg&w=320&q=75 320w, /_next/image?url=%2Fimages%2Fbg%2Ffallback.jpg&w=480&q=75 480w, /_next/image?url=%2Fimages%2Fbg%2Ffallback.jpg&w=575&q=75 575w, /_next/image?url=%2Fimages%2Fbg%2Ffallback.jpg&w=640&q=75 640w, /_next/image?url=%2Fimages%2Fbg%2Ffallback.jpg&w=750&q=75 750w, /_next/image?url=%2Fimages%2Fbg%2Ffallback.jpg&w=828&q=75 828w, /_next/image?url=%2Fimages%2Fbg%2Ffallback.jpg&w=1080&q=75 1080w, /_next/image?url=%2Fimages%2Fbg%2Ffallback.jpg&w=1200&q=75 1200w, /_next/image?url=%2Fimages%2Fbg%2Ffallback.jpg&w=1920&q=75 1920w";


export const kyFetch = ky.create({
    // prefixUrl: "https://example.com/api",
     //searchParams : {Auth_Key : authKey},
     timeout: 150000,
     headers: {
       Accept: "application/json",
       "Content-Type": "application/json",
     },
     // use a hook to add the authorization header before each request
     hooks: {
       beforeRequest: [
         (request) => {
            // console.log('request', request);
           //request.headers.set("Authorization", "Bearer token")
         },
       ],
     },
});


export const serializeQuery = (query) => {
    query.Auth_Key = authKey;
    return Object.keys(query)
        .map(
            key =>
                `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`
        )
        .join('&');
};

 