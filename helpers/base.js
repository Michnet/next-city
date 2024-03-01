import ky from "ky";
//import { homeurl } from '~/server/Base';
//import { siteSettings } from '~/server/Base';

export const WPDomain = 'https://lyvecityclub.com';
export const homeurl = 'https://lyvecity.com';
export const siteSettings = {
  logo_link : '/app/logos/Lyvecity.png',
  light_logo_link: '/app/logos/Lyvecity_light.png',
  wpDomain : 'https://lyvecityclub.com'
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
             console.log('request', request);
           //request.headers.set("Authorization", "Bearer token")
         },
       ],
     },
});


export const serializeQuery = query => {
    return Object.keys(query)
        .map(
            key =>
                `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`
        )
        .join('&');
};

 