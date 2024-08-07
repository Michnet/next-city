import dayjs from "dayjs";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { closeMenus } from "./appjs";
import { kyFetch, serializeQuery, WPDomain } from "./base";
var utc = require('dayjs/plugin/utc')
var timezone = require('dayjs/plugin/timezone') // dependent on utc plugin

dayjs.extend(utc)
dayjs.extend(timezone)

export function cleanHtml(str){
    return str?.replace(/&amp;/g, '&').replace(/&#8217;/g, "'").replace(/&#038;/g, "&").replace(/&#8211;/g, "-");
}

/* 
function reduceTextSize(){
  textSizeChanger[0].querySelectorAll('*').forEach(function(element) {
      const getFontSize = window.getComputedStyle(element).fontSize.split("px",2)[0]
      element.style.fontSize = (+getFontSize -1) +'px';
  });
} */


export function UICleanup(){
  closeMenus()
}
export function messageServiceWorker(message){
  if (navigator.serviceWorker) {
    navigator.serviceWorker.ready.then((registration) => {
      registration.active.postMessage(message);
    });
  }
}

export function shuffleArray(array) { 
  return array ? array.sort( ()=>Math.random()-0.5 ) : [];
}

export function sortArray(arr, key, ascending){
  if(ascending){
    // Low To High
    return [...arr]?.sort((a, b) => (a[key] > b[key] ? 1 : -1))
  }else{
    // High To low
    return [...arr]?.sort((a, b) => (a[key] > b[key] ? -1 : 1))
  }
}

export const useDidMountEffect = (func, deps) => {
  const didMount = useRef(false);

  useEffect(() => {
      if (didMount.current) func();
      else didMount.current = true;
  }, deps);
}

export const createBPActivity = async (payload) =>{ 
  try{
    const data = await kyFetch.post(bPActivitiesUrl(payload)).json();
      if(data){
        return data
      }
  }catch(er){
    return  null
  }
}

export const bPSingleActivityCommentUrl = (act_ID, token, payload = {}) =>{

  let endPoint = `wp-json/buddyboss/v1/activity/${act_ID}/comment?${serializeQuery({
          JWT: token,
          ...payload
      })}`

  return `${WPDomain}/${endPoint}`;
}

export const sendBPActivityComment = async (activityId, token,payload={}) =>{ 
  try{
    const data = await kyFetch.post(bPSingleActivityCommentUrl(activityId, token, payload)).json();
    if(data){
      return {activities: data}
    }
  }catch(e){
    return null;
  }
}

export const bPSingleActivityUrl = (act_ID, token, payload = {}) =>{

  let endPoint = `wp-json/buddyboss/v1/activity/${act_ID}/?${serializeQuery({
          JWT: token,
          ...payload
      })}`

  return `${WPDomain}/${endPoint}`;
}

export const getBPActivityComments = async (activityId, token, payload={}) =>{ 
  try{
  const data = await kyFetch.get(bPSingleActivityCommentUrl(activityId, token, payload)).json();
  if(data){
    if(data){
      return {activities: data}
    }
  }
}catch(e){
    return null;
  }
}

export const updateBPActivity = async (activityId, token, payload) =>{ 
  try{
  const data = await kyFetch.post(bPSingleActivityUrl(activityId, token, payload)).json();
  if(data) {
          return {activities : data}
      } else return null;
    }
  catch(e){
      return null;
  };
}

export const deleteBPActivity = async (activityId, token, payload) =>{ 
  const data = await kyFetch.delete(bPSingleActivityUrl(activityId, token, payload)).json();
  if(data){
    return data;
  }
}

export const likeBPActivity = async (act_ID, token) =>{

  let endPoint = `wp-json/buddyboss/v1/activity/${act_ID}/favorite?${serializeQuery({
          JWT: token,
          id: act_ID
      })}`

      try{
        const data = kyFetch.patch(`${WPDomain}/${endPoint}`).json();
        if(data){
          return data;
        }
      }catch(e){
        return null;
      }

}

export function localiseDate(date, format = null, localize = true) {
  
  if (!localize) {
    return dayjs.utc(date).tz(dayjs.tz.guess()).format(format);
  }
  return dayjs.utc(date).local().tz(dayjs.tz.guess()).format(format);
}

export function shadeRGBColor(color, percent) {
  var f=color.split(","),t=percent<0?0:255,p=percent<0?percent*-1:percent,R=parseInt(f[0].slice(4)),G=parseInt(f[1]),B=parseInt(f[2]);
  return "rgb("+(Math.round((t-R)*p)+R)+","+(Math.round((t-G)*p)+G)+","+(Math.round((t-B)*p)+B)+")";
}

export function textSizeClass({text, small=30, medium=90}){
  const len = text.length;
  if(len < small) {
    return 'sized_text _biggy';
  }else if(len > small && len < medium){
    return 'sized_text _medium';
  }else{
    return 'sized_text _normal'
  }
}

export const decodeJWT = (token) => {
  if(token == null || token == undefined){
    return null;
  }
  const base64String = token.split('.')[1];
  const decodedValue = JSON.parse(Buffer.from(base64String,    
                       'base64').toString('ascii'));
  return decodedValue;
}

// is active parent check
export const isActiveParent = (data = [], path) => {
  if (data?.length !== 0) {
      return data?.some(({ items }) =>
          items?.some(
              (menu) =>
                  menu.routePath.replace(/\/\d+/, "") ===
                  path.replace(/\/\d+/, "")
          )
      );
  }
};

// is active parent childe check
export const isActiveParentChaild = (data = [], path) => {
  if (data?.length !== 0) {
      return data?.some(
          (menu) =>
              menu.routePath.replace(/\/\d+/, "") ===
              path.replace(/\/\d+/, "")
      );
  }
};

export function isListingAuthor(user, author_id){
  return user && user?.id == author_id;
 }

export function ProductPrice(product) {
  let view;
  const { price, regular_price } = product;

  if (price < regular_price) {
    const offer = Math.round(((regular_price - price) / regular_price) * 100);
    view = (
      <div className="ant-row-flex _price">
        <h4 className="sale-price">{price} </h4>
        <h5 className="gx-text-muted gx-px-2 reg_price">
          <del>{regular_price}</del>
        </h5>
        <div className="price-discount">
          <div className="offer-fig">
            {" "}
            <h5>{offer}</h5>
            <h6>% </h6> <span className="offer-unit">Off</span>
          </div>
        </div>
      </div>
    );
  } else {
    view = (
      <div className="ant-row-flex">
        <h4 className="sale-price">{price} </h4>
      </div>
    );
  }
  return view;
}

export function PostThumbnailSrc(post, size) {
  let src;
  if (post._embedded["wp:featuredmedia"]) {
    const thumbnail = post._embedded["wp:featuredmedia"].find(
      (item) => item.id === post.featured_media
    );
    if (size) {
      let srcSize = thumbnail?.media_details?.sizes[`${size}`];
      if (srcSize) {
        src = srcSize?.source_url;
      } else {
        src = thumbnail?.source_url;
      }
    } else {
      src = thumbnail?.source_url;
    }
  } else {
    src = "/static/img/undefined-product-thumbnail.jpg";
  }
  return src;
}


export function PostThumbnail(post, size) {
  let view, srcUrl = null;
  if (post?._embedded["wp:featuredmedia"]) {
    const thumbnail = post._embedded["wp:featuredmedia"][0]

    if (size) {
      let srcSize = thumbnail?.media_details?.sizes[`${size}`];
      if (srcSize) {
        srcUrl = srcSize?.source_url;
      } else {
        srcUrl = thumbnail?.source_url;
      }
    } else {
      srcUrl = thumbnail?.source_url;
    }

    //view = ( <picture> <source srcSet={`${srcUrl}.webp`} /> <LazyLoad  preventLoading placeholder={<SkeletonCube/>} offset={200} once><img src={srcUrl} /></LazyLoad> </picture>);
    if(srcUrl){
      view = <Image
      quality={90} 
      data-aos="fade"
      data-aos-once="true"
      data-aos-delay={30} alt={post?.title.rendered} blurDataURL={`${srcUrl}`} src={`${srcUrl}`} placeholder="blur" fill  className={'pos-relative'}/>
    }
  } else {
    view = (
      <img
        src="/static/img/undefined-product-thumbnail.jpg"
        alt={post.title.rendered}
      />
    );
  }
  return view;
}


// is active link check
export const isActiveLink = (menuPath, routePath) => {
  if (menuPath && routePath) {
      return menuPath.replace(/\/\d+/, "") === routePath.replace(/\/\d+/, "");
  }
};


export const countdown_renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return <></>;
    } else {
      // Render a countdown
      return <div className="cd_block_row">
        {days > 0 && <div className="cd_block _days">
           <span className="cd_num lh-13">{days}</span>
           <span className="cd_label">{`Day${days > 1 ? 's' : ''}`}</span>
        </div>}
        {hours > 0 && <div className="cd_block _hours">
           <span className="cd_num lh-13">{hours}</span>
           <span className="cd_label">{`Hour${hours > 1 ? 's' : ''}`}</span>
        </div>}
        {minutes > 0 && <div className="cd_block _mins">
           <span className="cd_num lh-13">{minutes}</span>
           <span className="cd_label">{`Minute${minutes > 1 ? 's' : ''}`}</span>
        </div>}
        <div className="cd_block _secs">
           <span className="cd_num lh-13">{seconds}</span>
           <span className="cd_label">Seconds</span>
        </div>
      </div>;
    }
  };

  
export const randomBetween = (min, max) => Math.floor(Math.random() * (max - min)) + min;
export const randomEither = (options) => {
  if(options?.length > 0){
  var index = Math.floor(Math.random() * options.length);
  return options[index];
  }
};

export function shortenNum(number, decPlaces) {
  // 2 decimal places => 100, 3 => 1000, etc
  decPlaces = Math.pow(10, decPlaces);

  // Enumerate number abbreviations
  var abbrev = ["k", "m", "b", "t"];

  // Go through the array backwards, so we do the largest first
  for (var i = abbrev.length - 1; i >= 0; i--) {

    // Convert array index to "1000", "1000000", etc
    var size = Math.pow(10, (i + 1) * 3);

    // If the number is bigger or equal do the abbreviation
    if (size <= number) {
      // Here, we multiply by decPlaces, round, and then divide by decPlaces.
      // This gives us nice rounding to a particular decimal place.
      number = Math.round(number * decPlaces / size) / decPlaces;

      // Handle special case where we round up to the next abbreviation
      if ((number == 1000) && (i < abbrev.length - 1)) {
        number = 1;
        i++;
      }

      // Add the letter for the abbreviation
      number += abbrev[i];

      // We are done... stop
      break;
    }
  }

  return number;
}
export const listingUrlBase = (type) => {
  switch (type) {
    case 'event':
      return 'events'
      break;
    case 'place':
      return 'places'
      break;
    default:
      return 'listing'
      break;
  }
}


export function srcWithFallback(src, fb = '/images/bg/fallback.jpg'){
  if(src?.includes('http') || src?.charAt(0) === '/'){
    return src;
  }else{
    return fb;
  }
}


export function createOccurenceClass(targetDate, targetEndDate){
  const now = new Date();

  if(dayjs(targetDate).isAfter(now, 'minute')){
    if(dayjs(targetDate).diff(dayjs(now), 'day') > 1){
      return '_future_dist'
    }else{
      return '_future'
    }
  }else{
    if(targetEndDate){
      if(dayjs(targetEndDate).isAfter(now, 'minute')){
        return '_ongoing'
      }else{
        return '_past'
      }
    }else{
      return '_past'
    }
  }
}

export function createOccurenceState(targetDate, targetEndDate){
  const now = new Date();

  let stateClass, stateText;

  if(dayjs(targetDate).isAfter(now, 'minute')){
    if(dayjs(targetDate).diff(dayjs(now), 'day') > 1){
      stateClass = '_future_dist';
      stateText = 'Coming Soon';
    }else{
      stateClass = '_future';
      stateText = 'Starting Soon';
    }
  }else{
    if(targetEndDate){
      if(dayjs(targetEndDate).isAfter(now, 'minute')){
        stateClass = '_ongoing';
        stateText = 'Happening Now';
      }else{
        stateClass = '_past';
        stateText = 'Ended';
      }
    }else{
      stateClass = '_past';
      stateText = 'Ended';
    }
  }
  return {stateClass:stateClass, stateText: stateText}
}

  
export const generateTempArray = (maxItems) => {
    let result = [];
  
    for (let i = 0; i < maxItems; i++) {
      result.push(i);
    }
    return result;
  };

export function hashtag(text){
    var repl = text.replace(/#(\w+)/g, '<a href="/search?hashtag=#$1"><strong>#$1</strong></a>');
    return `<p>${repl}</p>`;
}


export function clearInputField(id){
  const textInput = document.getElementById(id);
  if(textInput){
    textInput.value = '';
  }
}
export const productsSortList = [
  {id: 1, label: 'Newest', name: 'newest', orderby: 'date', order : 'desc'},
  {id: 2, label: 'Oldest', name: 'oldest', orderby: 'date', order : 'asc'},
  {id: 3, label: 'Cheapest', name: 'price-lowest', orderby: 'price', order : 'asc'},
  {id: 4, label: 'Most expensive', name: 'price-highest', orderby: 'price', order : 'desc'},
  {id: 5, label : 'Most discounted', name : 'most-discounted', orderby: 'discount', order : 'desc'},
  {id: 6, label: 'Most popular',name: 'most-popular',  orderby: 'popularity', order : 'desc'},
  {id: 7, label: 'Top Rated', name: 'top-rated', orderby : 'rating', order: 'desc'}
];
export const truncateString = (string, limit) => {
  if (string.length > limit) {
    return string.substring(0, limit) + "...";
  } else {
    return string;
  }
};

export const basicProductFields = "id,name,featured,short_description,price,regular_price,average_rating,rating_counts,images,attributes";

export const slideActivator = ({carId, paramsObj={}}) =>{
  let params = {
    type:'loop',
    autoplay:true,
    interval:4000,
    perPage: 1,
    ...paramsObj
  }
  var single = new Splide( '#'+carId, {...params}).mount();
  var sliderNext = document.querySelectorAll('.slider-next');
  var sliderPrev = document.querySelectorAll('.slider-prev');
  sliderNext.forEach(el => el.addEventListener('click', el => {single.go('>');}));
  sliderPrev.forEach(el => el.addEventListener('click', el => {single.go('<');}));
}

export const scrollToSpot = (ref, offset) => {
  window.scrollTo({
    top: ref.current.offsetTop - offset,
    behavior: "smooth",
  });
};

export const scrollTop = () => {
  window.scrollTo({top : 0, behavior: 'smooth'});
};

export function resizedImage(imgUrl, desiredSize){
  switch (true) {
    case imgUrl.includes('.jpeg'):
      return imgUrl.replace(".jpeg", `-${desiredSize}.jpeg`);
      break;
    case imgUrl.includes('.webp'):
      return imgUrl.replace(".webp", `-${desiredSize}.webp`);
      break;
    case imgUrl.includes('.jpg'):
      return imgUrl.replace(".jpg", `-${desiredSize}.jpg`);
      break;
    case imgUrl.includes('.png'):
      return imgUrl.replace(".png", `-${desiredSize}.png`);
      break;
    case imgUrl.includes('.gif'):
      return imgUrl.replace(".gif", `-${desiredSize}.gif`);
      break;
  }  
}