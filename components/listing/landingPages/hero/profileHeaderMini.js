import  { useEffect, useState } from "react";
import { PriceView } from '@/components/UI/PriceView';
//const Image = dynamic(() => import("next/image"));
import { Client } from "react-hydration-provider";
import { useRecoilValue } from "recoil";
import { authState, UISizes } from "@/contexts/atoms";
import {fallbackImgSrcSet } from "@/helpers/base";
import { srcWithFallback } from "@/helpers/universal";
import VisitorActions from "../../partials/VisitorActions";
import Image from "next/image";


const ProfileHeaderMini = ({listing, setActiveKey, activeKey=null}) => {
  const {user} = useRecoilValue(authState);
  const [loading, setLoading] = useState(true);
  const {ticket_min_price_html} = listing ?? {}
  const {isMobile, isTab} = useRecoilValue(UISizes);

  useEffect(() => {
    setLoading(false)
  
    return () => {
      setLoading(true)
    }
  }, [listing, user]);
  

  let coverPhoto,  firstWord, lastWords,  callView;

  if(listing){

    const {title, cover, author_id} = listing;


    const wordArr = title?.rendered.split(' ');
    if(wordArr){
      firstWord = wordArr[0];
      wordArr.shift();
      lastWords = wordArr.join(' ');
    }
    coverPhoto = cover;
    
    if(!user || author_id !== user.id){
        callView = <div className="_phone">
                    <button data-bs-toggle={isMobile ? 'offcanvas' : 'modal'} data-bs-target='#listing_contact' className="btn btn-outline-theme">
                      Contact
                    </button>
                    </div>
    }

  }

    return ( <div className="gx-profile-banner _mini" style={{paddingTop: '0'}}>
         <Image className="object-cover" fill quality={95} /* placeholder={<LoaderDualRingBoxed/>} fill style={{objectFit:"cover"}} */ src= {srcWithFallback(coverPhoto)} priority  onErrorCapture = {(e) => {e.target.src = '/images/bg/fallback.jpg', e.target.srcset= {fallbackImgSrcSet}}}
/> 
        <div className="gx-profile-container">
          <div className="mini_head_content  row flex-nowrap md:flex-column overflow-hidden">
              <div className="desc _left col-12 col-md-8 px-0">
              <div className="_title">
                <Client><div className="title_name">
                {/* tagline && <h2 className="text-16 fw-normal" dangerouslySetInnerHTML={{__html: tagline}}/> */} 
                   <h1 className="styled_title"><span className="list_title _first" dangerouslySetInnerHTML={{__html: firstWord}}/> 
                    <span className="list_title _last" dangerouslySetInnerHTML={{__html: lastWords}}/> 
                    </h1>
                  </div>
                  </Client>
                </div>
              </div>
              <div className="desc _right col-12 col-md-4 px-0 d-flex flex-column align-items-end md:items-start">
              {!isTab && ticket_min_price_html ? <PriceView priceHTml={ticket_min_price_html} exClass={'_hero mb-10'}/> : <></>}
                {/* <div className="_contact">
                    {activeKey != 'private-chat' && <>{callView}</>}
                </div> */}
                {!isTab && <VisitorActions mini setActiveKey={setActiveKey} exClass={'justify-start'} listing={listing}/>}
              </div>
          </div>
        </div>
      </div>);
  
};

export default ProfileHeaderMini;
