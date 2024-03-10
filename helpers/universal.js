import dayjs from "dayjs";
import { kyFetch } from "./base";
var utc = require('dayjs/plugin/utc')
var timezone = require('dayjs/plugin/timezone') // dependent on utc plugin

dayjs.extend(utc)
dayjs.extend(timezone)

export function cleanHtml(str){
    return str?.replace(/&amp;/g, '&').replace(/&#8217;/g, "'").replace(/&#038;/g, "&").replace(/&#8211;/g, "-");
  }

export function shuffleArray(array) { 
  return array ? array.sort( ()=>Math.random()-0.5 ) : [];
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

export const sendBPActivityComment = async (activityId, token,payload) =>{ 
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

export const getBPActivityComments = async (activityId, token, payload) =>{ 
  try{
  const data = await kyFetch.get(bPSingleActivityCommentUrl(activityId, token, payload)).json();
  if(data){
    if(data){
      return {activities: data}
    }
  }}catch(e){
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