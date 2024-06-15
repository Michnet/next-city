import ky from "ky";
//import { homeurl } from '~/server/Base';
//import { siteSettings } from '~/server/Base';
export const authKey = 'Q+#s)pEs;`Bhf+@J+I6Wf<Wx8;8?J6?.fcpEWAS0-nV6-FQW[x@L2IeJ$e}Mf9-n';
export const WPDomain = 'https://lyvecityclub.com';
export const homeurl = 'https://lyvecity.com';
export const userReviews = 'jet-reviews-api/v1';
export const userActions = 'user-actions/v1';
export const googleDirectionsUrl = 'https://www.google.com/maps/dir/';

export const siteSettings = {
  app_version: '1.3.2',
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

import Link from "next/link";

const SiteMapContent = ({links}) => {
  return (
    <div className="d-none">
      {links.map((menu, i) => (
              <Link target={'_blank'} href={`${menu.routerPath}`} as={menu.routerPath} key={i}>
                {menu.name}
              </Link>
            ))
      }
    </div>
    );
};

export default SiteMapContent;

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
     },
     // use a hook to add the authorization header before each request
     hooks: { 
        beforeError: [
          error => {
            const {response} = error;
            if (response && response.body) {
              error.name = 'GitHubError';
              if(response.status == 400){
                error.message = `${response.body.message}`;
                error.status = `${response.status}`;
              }
              
            }
            return error;
          }
        ],
      afterResponse: [
        async(request, options, response) => {
          // You could do something with the response, for example, logging.
          //console.log('afterResponse request', _request);
          if(response.ok){
            //console.log('res in ky', response);
            
            return response
          }else{
            //console.log('corrected error in ky', error);
            let obj = {message:'An error has occured',responseStatus:response.status,success:false};
            let badResp = await response.json();
            if(badResp?.data){
              const {data} = badResp;
              obj = {...obj, ...data, ...badResp}
            }
            const blob = new Blob([JSON.stringify(obj, null, 2)], {
              type: "application/json",
            });
            //let badResp = await response.json();
            if(badResp?.data){
              const {errorCode} = badResp.data;
            }
            let newRsp = new Response(blob, {status: 200})
            return newRsp;
            //new Response(array|string $body = '', ?string $type = null, ?int $code = null, ?array $headers = null, ?string $charset = null)
          }
  
          // Or return a `Response` instance to overwrite the response.
         // return new Response('A different response', {status: 200});
        },
  
        // Or retry with a fresh token on a 403 error
        /* async (request, options, response) => {
          if (response.status === 403) {
            // Get a fresh token
            const token = await ky('https://example.com/token').text();
  
            // Retry with the token
            request.headers.set('Authorization', `token ${token}`);
  
            return ky(request);
          }
        } */
      ],
       beforeRequest: [
         (request) => {
            // console.log('request in ky', request);
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

export const siteColors = [
  "highlight", 
  "green", 
  "grass", 
  "red", 
  "orange", 
  //"yellow", 
  "sunny", 
  "blue", 
  "teal", 
  "mint", 
  "pink" , 
  "pink2" , 
  "magenta" , 
  "brown" ,
  //"gray" ,
  "aqua",
  //"night",
  //"dark"
]

export const siteColorObjs = [
    {name: "green", hex: "#8CC152"}, 
    {name: "grass", hex: "#2ABA66"}, 
    {name: "red", hex: "#DA4453"}, 
    {name: "orange", hex: "#E9573F"}, 
    {name: "yellow", hex: "#F6BB42"}, 
    {name: "sunny", hex: "#d99914"}, 
    {name: "blue", hex: "#4A89DC"}, 
    {name: "teal", hex: "#7DB1B1"}, 
    {name: "mint", hex: "#37BC9B"}, 
    {name: "pink", hex: "#D770AD"} , 
    {name: "pink2", hex: "#fb3365"} , 
    {name: "magenta", hex: "#967ADC"}, 
    {name: "brown", hex: "#AA8E69"},
    {name: "gray", hex: "#AAB2BD"},
    {name: "aqua", hex: "#3BAFDA"},
    {name: "night", hex: "#16181c"},
    {name: "dark", hex: "#434A54"} 
]

 