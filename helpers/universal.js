export function cleanHtml(str){
    return str?.replace(/&amp;/g, '&').replace(/&#8217;/g, "'").replace(/&#038;/g, "&").replace(/&#8211;/g, "-");
  }

export function shuffleArray(array) { 
  return array ? array.sort( ()=>Math.random()-0.5 ) : [];
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
  
export const generateTempArray = (maxItems) => {
    let result = [];
  
    for (let i = 0; i < maxItems; i++) {
      result.push(i);
    }
    return result;
  };
  

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