import  { useEffect, useState } from "react";
import { googleDirectionsUrl, homeurl, siteKeys } from "@/helpers/base";
import dynamic from "next/dynamic";
// import { isListingAuthor } from "~/server/UniversalFunctions";
import { useRecoilValue } from 'recoil';
import { authState, UISizes } from "@/contexts/atoms";
import { useRouter } from "next/router";
import { isListingAuthor } from "@/helpers/universal";
import Link from "next/link";

const PostLike = dynamic(() => import('@/components/UI/partials/social/PostLike'), { ssr: false });

const VisitorActions = ({listing, mini, setActiveKey, extraItem, exClass}) => {
  const {user, token} = useRecoilValue(authState);
  const [loading, setLoading] = useState(true);
  const {whatsapp} = listing ?? {}
  const router = useRouter();

  useEffect(() => {
    setLoading(false)
  
    return () => {
      setLoading(true)
    }
  }, [listing, user]);
  

  let actionsView;

  if(listing){

    const {id, acf, rating, thumbnail, phone, title, category, schedule, cover, author_id, logo, address} = listing;

          actionsView = <div className={`profile-actions no-scrollbar  ${exClass ?? ''}`}>
                          {extraItem ?? <></>}
                          <div className="action_box">
                          <Link href={`tel:${phone}`} >
                          <i className="las la-phone"/>
                          </Link>
                          <label>Call</label>
                          </div>
                          {whatsapp && <div className="action_box _whatapp">
                          <button>
                            <Link href={`https://wa.me/${whatsapp}`}><i className="lab la-whatsapp" style={{color: '#25D366'}}/></Link>
                          </button>
                          <label>WhatsApp</label>
                          </div>}
                          {isListingAuthor(user, author_id) ? <></> : 
                          <div className="action_box _chat">
                          <i className="las la-sms" onClick={() => setActiveKey('private-chat')}/>
                          <label>Chat</label>
                          </div>}
                          {!mini && <><div className="action_box">
                          <a href={`${googleDirectionsUrl}/${address}`} target="_blank">
                          <i className="las la-map-signs"/>
                          </a>
                          <label>Directions</label>
                          </div>
                          <div className="action_box" onClick = {async () => {if (navigator?.share) { try { await navigator.share({ 
              url: `${homeurl}${router.asPath}` 
          }); } catch (err) { onError?.(err); } } }}>
                          <i className="las la-share-alt"/>
                          <label>Share</label>
                          </div></>}
                          <div className="action_box _like">
                          <PostLike listing={listing.id} user={user}/>
                          <label>Like</label>
                          </div>
                      </div> 
  }

    return (<>
                {actionsView}
              </>
      );
};

export default VisitorActions;
