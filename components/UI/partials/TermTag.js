
import div from "next/link";
import { Client } from "react-hydration-provider";



const TermTag = ({term, outliney=false, targetStyleObj={}, preText = null, exploreLink, type, collection, colorText, exClass='lh-12', exTagClass, linkTax}) => {

  let termView;
  const {name, taxonomy, slug } = term ?? {};


  if(term){
  
  let  rl_awesome, color = null, term_id;

  if(collection){
    const {term_meta} = term;
    term_id = term.id; 
    rl_awesome = term_meta.rl_awesome;
    color = term_meta.color; 
  }else{
    rl_awesome = term.rl_awesome;
    color = term.color;
    term_id = term.term_id;  
  }
  
  if(taxonomy === 'case27_job_listing_tags'){
    linkTax = 'tag'
  }else  if(taxonomy === 'job_listing_category'){
    linkTax = 'category'
  }else  if(taxonomy === 'payment-method'){
    linkTax = 'payment_methods'
  }

  function colorise(){
    return color ?? 'var(--secTheme)';
  }


  switch (type) {
    case 'tag':
      termView =  <div
        /* href={`/explore?${linkTax}=${slug}`} */ className={`d-block bg-white ${taxonomy} ${exClass ?? ''} term-link _tag rounded-4 pos-relative`}>
        <span className="d-block position-absolute h-100 w-100 opacity-20" style={{borderRadius:'inherit', background: color?.length > 0 ? color : 'var(--highlight)'}}/>
        <span className={`gx-rounded-lg d-block  truncate  fw-600 ${exTagClass ?? ''}`} style={{color: color?.length > 0 ? color : 'var(--highlight)'}} dangerouslySetInnerHTML={{__html:  name}}/>
      </div>;
      break;

    case 'hash':
      termView =  <div
        /* href={`/explore?${linkTax}=${slug}`} */
        className={`d-block lh-1 ${taxonomy} ${exTagClass ?? ''} term-link _hash`}>
          <Client><span className="truncate" /* style={{color : 'var(--grayText)'}} */>{preText ? <span>{preText}</span> :  <></>}<span className="gx-mb-0" dangerouslySetInnerHTML={{__html:  name}}/></span></Client>
      </div>;
      break;

      case 'icon':
        termView =  <div
        /* href={`/explore?${linkTax}=${slug}`} */
        className={`${taxonomy} ${exClass ?? ''} term-link _icon`}>
        <div  className="icon_box">
          <span className={`icon_icon`}> <i style={{backgroundColor : outliney ? 'transparent' : color, color : outliney ? color : '#fff', ...targetStyleObj}} className={`${rl_awesome} ${exTagClass}`}/> </span> 
        </div>
  
        </div>
      break;

      case 'icon-box':
        termView =  <div
          /* href={`/explore?${linkTax}=${slug}`} */
          className={`${taxonomy} ${exClass ?? ''} term-link _icon-box`}>
          <div  className="icon_box">
                        <span className="icon_icon"> <i style={{backgroundColor : color}} className={rl_awesome}/> </span> 
                        <span style={{color : colorText ? colorise() : 'var(--colorTheme)' }} className="gx-text-truncate icon_text" dangerouslySetInnerHTML={{__html: name}}/>
                      </div>

        </div>;
      break;
  
    default:
      termView =  <div
          /* href={`/explore?${linkTax}=${slug}`} */
          className={`${taxonomy} ${exClass ?? ''} term-link _icon-box`}>
          <div  className="icon_box">
                        <span style={{color : colorText ? color : 'initial'}} className="gx-text-truncate icon_text" dangerouslySetInnerHTML={{__html: name}}/>
                      </div>

        </div>
      break;
  }
  }


  return (
            <>
             {termView}
             {exploreLink ? 
             <div
             /* href={`/explore?${linkTax}=${slug}`} */
             className={`explore_link d-block shadow-0 border w-fit btn btn-link`}>
              {`Explore ${linkTax}`}   
              </div>
              :
              <></>
             }
            </>

  );
}

export default TermTag;
