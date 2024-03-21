import { kyFetch, oathInfo, serializeQuery, userReviews, WPDomain } from "./base";

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

export const fetchListings = async (payload) => {
  let endpoint;
  if (payload) {
      if(payload.random){
          endpoint = `wp-json/wp/v2/random_listings?${
              serializeQuery({
                  ...payload
              }) 
          }`;
      }else{
          endpoint = `wp-json/wp/v2/listings?${
              serializeQuery({
                  ...payload
              }) 
          }`;
      }
     
  } else {
      endpoint = 'wp-json/wp/v2/listings';
  }


  try{
    const res = await kyFetch.get(`${WPDomain}/${endpoint}`).json(); 
    if (res) {
      console.log('listings res', res)
      const data = {
          items: res,
          totalItems: res.headers['x-wp-total'],
          totalPages: res.headers['x-wp-totalpages']
      };
      return data;
  } else return null;
 }catch (error) {
   console.log('got failed', error)
   /* if (error.name === 'HTTPError') {
     const errorJson = await error.response.json();
   } */
 }

}


export const bPActivitiesUrl = (payload) =>{
  let endPoint;
  if(payload){
      endPoint = `wp-json/buddyboss/v1/activity?${serializeQuery({
          ...payload
      })}`
  }else{
      endPoint = `wp-json/buddyboss/v1/activity`
  }

  return `${WPDomain}/${endPoint}`;
}



export const bpPublicActivitiesUrl = (payload) =>{
  let endPoint;
  if(payload){
      endPoint = `wp-json/m-api/v1/activity?${serializeQuery({
          ...payload
      })}`
  }else{
      endPoint = `wp-json/m-api/v1/activity`
  }

  return `${WPDomain}/${endPoint}`;
}




export const getUserRest = async(reqObj) => {
  const endPoint = `wp-json/m-api/v1/get-user?${serializeQuery({...reqObj})}`;

  try{
     const gotUser = await kyFetch.get(`${WPDomain}/${endPoint}`).json(); 
     if(gotUser){
      return gotUser;
     }
  }catch (error) {
    console.log('got failed', error)
    /* if (error.name === 'HTTPError') {
      const errorJson = await error.response.json();
    } */
  }
}

export async function advancedFetchListings(payload){
    try {
        const res = await kyFetch.get(advancedFetchListingsUrl(payload)).json();
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

export const getEventDates = async (payload, signal) => {

  const endPoint = `wp-json/m-api/v1/event-dates?${serializeQuery({
      ...payload
  })
}`;
if(!payload?.event_id || payload?.event_id == 'undefined'){
  return;
}else{

  try {
    const res = await kyFetch.get(`${WPDomain}/${endPoint}`, {signal}).json();
    if(res){
        return res;
      }else{
    }
  } catch (error) {
    console.log('got failed', error)
  }
}
}

export const likePost = async (payload) => {

  const endPoint = `wp-json/${userActions}/user-picks?${serializeQuery({
      ...payload,
     // JWT : getToken()
  }) 
  }`;
  try{
  const response = await kyFetch.post(`${WPDomain}/${endPoint}`).json();
      if(response){
          if(response){
           return response;
          } else return null;
          
      }
    }catch(e){
          console.log(e)
    };    
}

export async function getLocalTaxonomy(payload){
  const {taxonomy, parent_slug, setter} = payload;
  console.log('slug', parent_slug);
  try{
  await fetch(`/data/${taxonomy ?? 'categories'}.JSON`, {headers:{'Content-Type': 'application/json',
  'Accept': 'application/json'}}).then((dat) => dat.json()).then(
      (items) => {
          let currentArr;
          if(parent_slug){
              let  parentArr = items.filter((it) => it.slug === parent_slug);
              if(parentArr?.length > 0){
                  console.log('we have a parent', parentArr)
                  let parentId= parentArr[0].id;
                  currentArr = items.filter((it) => it.parent === parentId)
              }else{
                  console.log('no parent', parentArr)
                  currentArr = items.filter((it) => it.parent === 106)
              }
          }else{
              currentArr = items.filter((it) => it.parent === 106)
          }
          setter(currentArr);
          return currentArr;
      })
  }catch(err){
  return err
  }
}


export const getSocialUser = async(acc_token, platform/* , signal */) => {

  const endPoint = `wp-json/m-api/v1/${platform}/get_social_user?${serializeQuery({
      access_token : acc_token,
  })}`;
  try{ 
    const res = await kyFetch.post(`${WPDomain}/${endPoint}`/* , {signal: signal} */).json()
   if(res){
      
      return res; 
  }
  }catch(e){
      console.log(e)
  }; 
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


//Get listing reviews
export const fetchListingReviews = async (payload) => {
  let endPoint;
  if(payload){
     endPoint = `wp-json/${userReviews}/get-public-reviews-list?${serializeQuery({
          ...payload
      }) 
      }`;
  }else{
      endPoint = `wp-json/${userReviews}/get-public-reviews-list`;
  }

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

 //Delete review
 export const deleteReview = async (payload) => {

  const endPoint = `wp-json/m-api/v1/delete-review?${serializeQuery({
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



export const getDirTermsUrl = (taxonomy, payload) => {
  function processedTax(){
      switch (taxonomy) {
      case 'categories':
          return 'job_listing_category';
          break;
      case 'tags':
          return 'case27_job_listing_tags';
      case 'locations':
          return 'dir_locations';
      case 'product_cat':
          return 'product_cat';
      default:
          return 'job_listing_category';
          break;
  }}
  let endpoint;
  if (payload) {
      endpoint = `wp-json/wp/v2/${processedTax()}?${serializeQuery({
          ...payload
      })}`;
  } else {
      endpoint = `wp-json/wp/v2/${taxonomy}`;
  }
  return `${WPDomain}/${endpoint}`;
}

export const getProducts = async (payload) => {
  const response = await kyFetch.get(getProductsUrl(payload)).json();
    try{if(response){
          if (response.data && response.data.length > 0) {
              const data = {
                  items: response.data,
                 /*  totalItems: response.headers['x-wp-total'],
                  totalPages: response.headers['x-wp-totalpages'], */
              };
              return data;
          } else return null;
      }
    }catch (e){
          console.log(e)
      };
}

export const getProductsUrl = (payload) => {
  let endpoint;
  if (payload) {
      endpoint = `wp-json/wc/v3/products?${serializeQuery({
          ...payload,
          ...oathInfo,
      })}`;
  } else {
      endpoint = `wp-json/wc/v3/products?${serializeQuery({
          ...oathInfo,
      })}`;
  }
  return `${WPDomain}/${endpoint}`
}

export const getBookableProductsUrl = (payload) => {
  let endpoint;
  if (payload) {
      endpoint = `wp-json/wc-bookings/v1/products?${serializeQuery({
          ...payload,
          ...oathInfo,
      })}`;
  } else {
      endpoint = `wp-json/wc-bookings/v1/products?${serializeQuery({
          ...oathInfo,
      })}`;
  }
  return `${WPDomain}/${endpoint}`
}

export const bpGroupUrl = (group_id, payload, base) =>{
  let endPoint;
  if(payload){
      endPoint = `wp-json/buddyboss/v1/groups/${group_id}/${base ? base : ''}?${serializeQuery({
          ...payload
      })}`
  }else{
      endPoint = `wp-json/buddyboss/v1/groups/${group_id}/${base ? base : ''}`
  }

  return `${WPDomain}/${endPoint}`;
}


export async function addGroupMember(group_id, payload){
  try {
      const res = await kyFetch.post(bpGroupUrl(group_id, payload, `members`)).json();
      if(res){
          console.log('geo succeeded', res)
          return res;
        }else{
        console.log('failed', res)
      }
    } catch (error) {
      console.log('geo failed', error)
      /* if (error.name === 'HTTPError') {
        const errorJson = await error.response.json();
      } */
    }
}

export const createBPActivity = async (payload) =>{ 
  const data = await WPRepository.post(bPActivitiesUrl(payload))
  .then((response) => {
      if (response.data) {
          return response.data
      } else return null;
  })
  .catch(() => {
      return null;
  });
return data;
}


export const getBookableProducts = async (payload) => {
  const response = await kyFetch.get(getBookableProductsUrl(payload)).json();
    try{
      if(response){
          if (response.data && response.data.length > 0) {
              const data = {
                  items: response.data,
                 /*  totalItems: response.headers['x-wp-total'],
                  totalPages: response.headers['x-wp-totalpages'], */
              };
              return data;
          } else return null;
      }
    }catch(e){
          console.log('error', e);
      };
}

export const getDirTerms = async (taxonomy, payload) => {
  const query = getDirTermsUrl(taxonomy, payload);
  try {
    const res = await kyFetch.get(query).json();
    if(res){
      //console.log('queryyyyyyyyyyyyyyyyyyyy', res);

        return res;
      }else{
        return null
    }
    } catch (error) {
      console.log('terms failed', error)
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