import { kyFetch, oathInfo, serializeQuery, userReviews, WPDomain, userActions, siteColorObjs, siteColors } from "./base";
import { fetchRephrase, randomEither, translateDate } from "./universal";
import { getProductCategories } from "./WooRest";

export const fetcher = (...args) => fetch(...args).then((res) => res.json());
export const fetcherWithSignal = (signal, ...args) => fetch(...args, {signal:signal}).then((res) => res.json());

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




export const sendBPMessage = async (payload, jwt) =>{
  const endPoint = `wp-json/buddyboss/v1/messages?${serializeQuery({
    ...payload,
   JWT : jwt
})}`;
   const data = await kyFetch.post(`${WPDomain}/${endPoint}`)
   .then(async(response) => {
       if (response) {
           return await response.json()
       } 
   })
   .catch((e) => {
       return e.message;
   });
   return data;
}


export const editUser = async (payload) => {

  const endPoint = `wp-json/${userActions}/edit-user?${serializeQuery({
      ...payload,
     // JWT : getToken()
  }) 
  }`;
  try{
    const response = await kyFetch.post(`${WPDomain}/${endPoint}`).json();
          if(response){
           return response;
          } else return null;
          
      }catch(e){
          console.log(e)
      };    
}

export const fetchListing = async (id, payload) => {
  let endPoint;

  if(payload){
      endPoint = `wp-json/wp/v2/listings/${id}?${serializeQuery({
          ...oathInfo,
          ...payload
      })}&_embed`;
  }else{

  endPoint = `wp-json/wp/v2/listings/${id}?_embed`;
}
  try{ let response = await kyFetch.get(`${WPDomain}/${endPoint}`).json();
      if(response){
          const data = {
              listing: response,
          };
          return data;
      }
    }catch(e){
          console.log(e)
      };

      
}

export const fetchPageUrl = (id, fields) => {

  const endPoint = `/wp-json/wp/v2/pages/${id}?${serializeQuery({
      ...oathInfo,
      _fields: fields
  })}`;

  return `${WPDomain}${endPoint}`;
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
    const res = await kyFetch.get(`${WPDomain}/${endpoint}`); 
    if (res) {
      const data = {
          items: await res.json(),
          totalItems: res.headers.get('x-wp-total'),
          totalPages: res.headers.get('x-wp-totalpages')
      };
      console.log('feti', data);
      return data;
  } else return null;
 }catch (error) {
   /* if (error.name === 'HTTPError') {
     const errorJson = await error.response.json();
   } */
 }

}
export const getBPThreadsUrl = (payload, jwt) =>{

  const endPoint = `wp-json/buddyboss/v1/messages?${serializeQuery({
      ...payload,
      //...oathInfo,
      JWT : jwt,
      //username : 'bb-arianna',
      //password : '123@abc'
  })}`

return `${WPDomain}/${endPoint}`;
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

export async function advancedFetchListings(payload, signal){

    try {
        const res = await kyFetch.get(advancedFetchListingsUrl(payload), {signal:signal}).json();
        if(res){
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

export const getDirPaymentMethodsUrl = (payload) => {
  let endpoint;
  if (payload) {
      endpoint = `wp-json/wp/v2/payment_methods?${serializeQuery({
          ...payload
      })}`;
  } else {
      endpoint = 'wp-json/wp/v2/payment_methods';
  }

  return `${WPDomain}/${endpoint}`;
}


export const getDirPaymentMethods = async (payload) => {
  try{
  const response = await kyFetch.get(`${getDirPaymentMethodsUrl(payload)}`).json()
          if (response) {
              const data = {
                  items: response,
                 /*  totalItems: response.headers['x-wp-total'],
                  totalPages: response.headers['x-wp-totalpages'], */
              };
              return data;
          } else return null;
    }
    catch(e){
          return null;
      };
}

export async function getLocalTaxonomy(payload){
  const {taxonomy, parent_slug, setter, include_ids, signal} = payload;
  try{
  await fetch(`/data/${taxonomy ?? 'categories'}.JSON`, {headers:{'Content-Type': 'application/json',
  'Accept': 'application/json'}, signal:signal}).then((dat) => dat.json()).then(
      (items) => {
          let currentArr;
          if(include_ids){
            currentArr = [];
            include_ids.map((inc_id) =>{
              let currentItem = items.find((it) => it.id === inc_id)
              if(currentItem){
                currentArr.push(currentItem);
              }
            })
          }else{
              if(parent_slug){

                let  parentArr = items.filter((it) => it.slug == parent_slug);
                if(parentArr?.length > 0){
                    let parentId= parentArr[0].id;
                    currentArr = items.filter((it) => it.parent == parentId)
                }else{
                    currentArr = items.filter((it) => it.parent == 0)
                }
              }else{
                  currentArr = items.filter((it) => it.parent == 0)
              }
          }
          if(setter){
            setter(currentArr);
          }
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

export const recordVisit = async (payload, signal) => {

  const endPoint = `wp-json/m-api/v1/visit?${serializeQuery({
      ...payload
  })
}`;

try {
  const res = await kyFetch.post(`${WPDomain}/${endPoint}`, {signal:signal}).json();
  if(res){
      return res;
    }else{
      return null
  }
  } catch (error) {
    console.log('got failed', error)
  }  
}   


    //Submit reviews
    export const submitReview = async (payload) => {

      const endPoint = `wp-json/m-api/v1/submit-review?${serializeQuery({
          ...payload
      }) 
      }`;
      return await kyFetch.post(`${WPDomain}/${endPoint}`)
          .then(async(response) => {
              if(response){
               return await response.json();
              } else return null;
              
          })
          .catch((e) => {
              console.log(e)
          });    
  }

  export const updateReview = async (payload) => {

      const endPoint = `wp-json/${userReviews}/update-review?${serializeQuery({
          ...payload
      }) 
      }`;
      return await kyFetch.post(`${WPDomain}/${endPoint}`)
          .then(async(response) => {
              if(response){
              return await response.json();
              } else return null;
              
          })
          .catch((e) => {
              console.log(e)
          });    
  }

 /*  export const deleteReview = async (id) => {

      const endPoint = `wp-json/${userReviews}/delete-review?${serializeQuery({
          ...id
      }) 
      }`;
      return await WPRepository.post(`${WPDomain}/${endPoint}`)
          .then((response) => {
              if(response){
               return response;
              } else return null;
              
          })
          .catch((e) => {
              console.log(e)
          });    
  } */

     //Get reviews
     export const fetchReviews = async (payload) => {
      let endPoint;
      if(payload){
         endPoint = `wp-json/${userReviews}/get-admin-reviews-list?${serializeQuery({
              ...payload
          }) 
          }`;
      }else{
          endPoint = `wp-json/${userReviews}/get-admin-reviews-list`;
      }

     
      return await kyFetch.post(`${WPDomain}/${endPoint}`)
            .then(async(response) => {
              if(response){
              return await response.json();
              } else return null;
              
          })
          .catch((e) => {
              console.log(e)
          });    
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

export const getBPThread = async (id, payload, jwt) =>{

  let endPoint;

  if(payload){
      endPoint = `wp-json/buddyboss/v1/messages/${id}?${serializeQuery({
          ...payload,
          JWT : jwt
      })}`;

  }else{
      endPoint = `wp-json/buddyboss/v1/messages/${id}?${serializeQuery({
          JWT : jwt
      })}`;
  }

   const data = await kyFetch.get(`${WPDomain}/${endPoint}`)
   .then(async (response) => {
       if (response) {
           return await response.json()
       } else return null;
   })
   .catch(() => {
       return null;
   });
   return data;
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
export async function removeGroupMember(group_id, payload){
  try {
      const res = await kyFetch.delete(bpGroupUrl(group_id, payload, `members/${payload.user_id}`)).json();
      if(res){
          console.log('delete succeeded', res)
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
  const data = await kyFetch.post(bPActivitiesUrl(payload))
  .then(async (response) => {
      if (response) {
          return await response.json()
      } else return null;
  })
  .catch(() => {
      return null;
  });
return data;
}


export const getBPRecipientThread = async (payload, jwt) =>{

  let endPoint;

  if(payload){
      endPoint = `wp-json/buddyboss/v1/messages/search-thread?${serializeQuery({
          ...payload,
          JWT : jwt
      })}`;

  }else{
      endPoint = `wp-json/buddyboss/v1/messages/search-thread?${serializeQuery({
          JWT : jwt
      })}`;
  }

   const data = await kyFetch.get(`${WPDomain}/${endPoint}`)
   .then(async(response) => {
       if (response) {
           return await response.json();
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

export async function getDirTerms(taxonomy, payload, signal, setter){
  const query = getDirTermsUrl(taxonomy, payload);
  try {
    const res = await kyFetch.get(query).json();
    if(res){
      if(setter){setter(res)}
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
  console.log('fetched', `${WPDomain}/${endpoint}`);
  return `${WPDomain}/${endpoint}`;
}



export const listingServerQuery = async(params) => {

  /* 
    async function productsQuery(payload) {
      const pdts = await getProducts(payload);
      if (pdts) {
          serverObj.products = pdts.items;
      } 
    }
  
  async function catsQuery(shopCatsLoad) {
      const shopCatsResult = await getProductCategories(shopCatsLoad);
      if (shopCatsResult) {
          serverObj.storeCategories = shopCatsResult.items ?? null;
      }
  }
  
    async function vendorQuery(id){
      const seller = await getVendorInfo({id:id});
      if(seller){
        const {store_categories} = seller;
        if(store_categories?.length > 0){
          let queryLoad = {
            include : store_categories.join(',')
          }
          await catsQuery(queryLoad);
        }
      }
  }
  
    const singleRes = await fetch(fetchSingleListingUrl(params.slug));
    const postArr = await singleRes.json();
    const post = postArr[0];
    serverObj.listing = post && post != 'undefined' ? post :  null;
  
    const shopItemIds = post?.acf?.general_merchandise;
    const authorId = post?.author_id;
  
    await vendorQuery(authorId);
  
    if(shopItemIds?.length > 0){
      let fields = "id,name,featured,short_description,price,regular_price,average_rating,categories,images,attributes";
      let payload = { 
        include: shopItemIds.join(','), 
        _fields : fields
      }
      await productsQuery(payload);
    } */ 
    
    
    let serverObj = {}, colorHex, freshDesc;

    const singleRes = await fetch(fetchSingleListingUrl(params.slug));
    const postArr = await singleRes.json();
    const listing = postArr[0];
    serverObj.listing = listing && listing != 'undefined' ? listing :  null;
   
   /*  async function getFreshDesc(){ 
      const newDesc = await fetchRephrase(listing?.short_desc, 'Paraphrase in English with humor and a marketing tone');
      if(newDesc){
        freshDesc = newDesc;
        return newDesc;
      }
      } */

    async function extendListing(listing){
      //const blurUrl = listing?.cover ? await getBase64(listing.cover) : null;
      //const fbBlur = await getBase64Static('./public/images/bg/fallback.jpg');
      //const blurryGal = await galleryWithBlurs(listing.gallery);
      const author = await getUserRest({key:'ID', val: listing.author_id});
  
      serverObj = {...serverObj, listing : {...listing, /* freshDesc:freshDesc,  */author: author ? author.user : null }}
      /* serverQuery = {...serverQuery, 
        serverObj : {...serverObj, 
          listing : {...listing, 
          coverBlur : blurUrl && blurUrl != 'undefined' ? blurUrl : fallbackImgBlur,
          galleryWithBlurs : blurryGal,
          author: author ? author.user : null
        }}} */
    }

    async function getThemeColor(){
      const color = randomEither(siteColors);
      serverObj.themeColor = color
      colorHex = siteColorObjs?.filter((col) => col.name === color)[0]?.hex;
      serverObj.themeColorHex = colorHex ?? null;
    }

    if(listing){
        //await getFreshDesc();
        await extendListing(listing);
        await getThemeColor();
    }
    

    return {
      serverObj : serverObj
    }
  }

export async function explorerServerQuery({query, listing_type}){
  
  let serverObj = {};
  const {sort, category, tags, region} = query ?? {};
  const eventDate = query ? query['event-date']  ?? null : null;
  let thumbsize = 'xtra_large_thumb'


  let seoDescript = `Explore ${category ? translateDate(category) : ''} ${listing_type}s ${region ? '' : 'all around you'} ${eventDate ? ', scheduled for ' + translateDate(eventDate) : ''}${region ? ' in ' + region : ''}${sort ? ', starting with the ' + sort : ''}`;

  let load={_fields : `id,title,slug,fields,ticket_min_price_html,event_date,featured_media,featured,rating,acf,short_desc,page_views,level,category,_links,type, gallery,locations,max_discount,${thumbsize}`, 
    listing_type: listing_type ?? 'all', per_page: 5, sort:'latest', 'event-date':'any-day'};

    if(query){
      load = {...load, ...query};
    }

   /*  if(category){
      load.category = category;
    }
    if(region){
      load.region = region;
    }
    if(query['event-date']){
      load['event-date']
    } */

  async function topListings(){
    

    const list = await advancedFetchListings(load);
    if(list){
      serverObj.topList = list;
    }
  }

  await topListings();
  
  return {...serverObj, seoDescript: seoDescript}
}