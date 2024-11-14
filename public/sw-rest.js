
const WPDomain = 'https://lyvecityclub.com';
const homeurl = 'https://lyvecity.com';
const userReviews = 'jet-reviews-api/v1';
const userActions = 'user-actions/v1';
const authKey = 'Q+#s)pEs;`Bhf+@J+I6Wf<Wx8;8?J6?.fcpEWAS0-nV6-FQW[x@L2IeJ$e}Mf9-n';

const serializeQuery = (query) => {
  query.Auth_Key = authKey;
  return Object.keys(query)
      .map(
          key =>
              `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`
      )
      .join('&');
};

const authenticate = async (payload, signal) => {

  const endPoint = `/wp-json/jwt-auth/v1/auth?${serializeQuery({
      ...payload
  })
}`;

  try {
    const res = await fetch(`${WPDomain}/${endPoint}`, {signal:signal, method: 'POST'});
    if(res){
        return res.json();
    }else{
    }
  } catch (error) {
  }
}

const getDirTermsUrl = (taxonomy, payload) => {
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

async function getDirTerms(taxonomy, payload){
  const query = getDirTermsUrl(taxonomy, payload);
  try {
    const res = await fetch(query);
    if(res){
        return res.json();
      }else{
        return [];
    }
    } catch (error) {
      console.log('terms failed', error)
  } 
}


const getEventDates = async (payload, signal) => {

  const endPoint = `wp-json/m-api/v1/event-dates?${serializeQuery({
      ...payload
  })
}`;
if(!payload?.event_id || payload?.event_id == 'undefined'){
  return;
}else{

  try {
    const res = await fetch(`${WPDomain}/${endPoint}`, {signal});
    if(res){
        return res.json();
    }else{
    }
  } catch (error) {
    console.log('got failed', error)
  }
}
}

const fetchListingReviews = async (payload) => {
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
    const res = await fetch(`${WPDomain}/${endPoint}`, { method: 'POST'}); 
      if(res){
        return res.json();
      }else{
        return null
    }
    } catch (error) {
      console.log('got failed', error)
  }    
}


const bpPublicActivities = async(payload) =>{
  let endPoint;
  if(payload){
      endPoint = `wp-json/m-api/v1/activity?${serializeQuery({
          ...payload
      })}`
  }else{
      endPoint = `wp-json/m-api/v1/activity`
  }
   //return `${WPDomain}/${endPoint}`;

  try {
    const res = await fetch(`${WPDomain}/${endPoint}`); 
      if(res){
        return res.json();
      }else{
        return null
    }
    } catch (error) {
      console.log('got failed', error)
  }
}