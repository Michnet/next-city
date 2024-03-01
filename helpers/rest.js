import { kyFetch, serializeQuery, WPDomain } from "./base";

export const fetcher = (...args) => fetch(...args).then((res) => res.json());

export const advancedFetchListingsUrl = (payload) => {
    let endpoint;
    if (payload) {
        endpoint = `wp-json/m-api/v1/listings?${serializeQuery({
                ...payload
            }) }`;
    } else {
        endpoint = 'wp-json/m-api/v1/listings';
    }
    return `${WPDomain}/${endpoint}`
}

export async function advancedFetchListings(payload){
    try {
        const res = await kyFetch.post(advancedFetchListingsUrl(payload)).json();
        if(res){
            console.log('got them', res)
            return res;
          }else{
          console.log('failed', res)
        }
      } catch (error) {
        console.log('got failed', error)
        /* if (error.name === 'HTTPError') {
          const errorJson = await error.response.json();
        } */
      }
}

export const getEventDates = async (payload) => {

  const endPoint = `wp-json/m-api/v1/event-dates?${serializeQuery({
      ...payload
  })
}`;
if(!payload?.event_id || payload?.event_id == 'undefined'){
  return;
}else{

  try {
    const res = await kyFetch.get(`${WPDomain}/${endPoint}`).json();
    if(res){
        return res;
      }else{
    }
  } catch (error) {
    console.log('got failed', error)
  }
}
}

export const recordVisit = async (payload) => {

  const endPoint = `wp-json/m-api/v1/visit?${serializeQuery({
      ...payload
  })
}`;

try {
  const res = await kyFetch.post(`${WPDomain}/${endPoint}`).json();
  if(res){
      return res;
    }else{
      return null
  }
  } catch (error) {
    console.log('got failed', error)
  }  
}    


export const fetchIdsUrl = (payload) => {
  let endpoint;
  if (payload) {
      endpoint = `wp-json/m-api/v1/ids?${serializeQuery({
          ...payload
      })}`;
  } else {
      endpoint = `wp-json/m-api/v1/ids`;
  }
  return `${WPDomain}/${endpoint}`;
}

export const fetchSingleListingUrl = (id, payload) => {
  let endpoint;
  if(payload){
   endpoint = `wp-json/wp/v2/listings?slug=${id}&${serializeQuery({
      ...payload,
  })}&_embed`;
  }else{
      endpoint = `wp-json/wp/v2/listings?slug=${id}&_embed`;
  }
  return`${WPDomain}/${endpoint}`;
}