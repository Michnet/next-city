import ky from "ky";

export const WPDomain = 'https://lyvecityclub.com';

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

 