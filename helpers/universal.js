export function cleanHtml(str){
    return str?.replace(/&amp;/g, '&').replace(/&#8217;/g, "'").replace(/&#038;/g, "&").replace(/&#8211;/g, "-");
  }

  
export const countdown_renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return <></>;
    } else {
      // Render a countdown
      return <div className="cd_block_row">
        {days > 0 && <div className="cd_block _days">
           <span className="cd_num">{days}</span>
           <span className="cd_label">{`Day${days > 1 ? 's' : ''}`}</span>
        </div>}
        {hours > 0 && <div className="cd_block _hours">
           <span className="cd_num">{hours}</span>
           <span className="cd_label">{`Hour${hours > 1 ? 's' : ''}`}</span>
        </div>}
        {minutes > 0 && <div className="cd_block _mins">
           <span className="cd_num">{minutes}</span>
           <span className="cd_label">{`Minute${minutes > 1 ? 's' : ''}`}</span>
        </div>}
        <div className="cd_block _secs">
           <span className="cd_num">{seconds}</span>
           <span className="cd_label">Seconds</span>
        </div>
      </div>;
    }
  };

  
export function shuffleArray(array) { 
    return array ? array.sort( ()=>Math.random()-0.5 ) : [];
  } 
  
export const generateTempArray = (maxItems) => {
    let result = [];
  
    for (let i = 0; i < maxItems; i++) {
      result.push(i);
    }
    return result;
  };
  