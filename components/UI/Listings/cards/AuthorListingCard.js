
import Link from "next/link";
import dynamic from "next/dynamic";
import { memo, useEffect, useState } from "react";
import CommunityStats from "../../partials/social/CommunityStats";
import { listingUrlBase, PostThumbnail } from "@/helpers/universal";
import { WPDomain } from "@/helpers/base";
import TermTag from "../../partials/TermTag";

/* const OpenStatus = dynamic(() => import('appComponents/components/profile/Business-schedule/OpenStatus'), {
  ssr: false
}); */

/* const PostLike = dynamic(() => import('appComponents/components/Social/PostLike'), {
  ssr: false
}); */

/* const CommunityStats = dynamic(() => import('appComponents/components/Social/CommunityStats'), {
}); */


function AuthorListingCardConst({data, user, mini, token}) {
    
  let levelView, cardView, catView;
  const [loading, setLoading] = useState(true)

  if(data){
    const {title, subTitle, short_desc, isFeatured, level, id, schedule, category, type, slug} = data;
    
    const thumbnail = PostThumbnail(data, 'medium');
    
  if(category){
    const {rl_awesome, color, name:catName} = category;
    catView =  <TermTag term={category} type={'hash'}/>
  }

  if(level){
    if(level > 1){
      levelView = <span className="badge gx-rounded-xs gx-bg-orange gx-border-orange gx-text-white">Promoted</span>
    }else if(level === 1){
      levelView =<span className="badge gx-rounded-xs gx-bg-orange gx-border-orange gx-text-white">Featured</span>
    }else{
      levelView = <></>
    }
  }

  useEffect(() => {
    if(data){
      setLoading(false)
    }
  
    return () => {
      setLoading(true);
    }
  }, [token, user])
  
 cardView = <div className={`horizontal_card row_flex gx-media gx-featured-item align-items-start ${mini ? 'mini' : ''}`}>
          {isFeatured === true ? <span className="badge" color="orange"><span className="gx-text-uppercase">featured</span></span> : null}
          <div className="gx-featured-thumb">
          <div className="pos-relative"  style={{ height :'110px', width : '110px'}} >
            {thumbnail}
            {levelView}
            </div>
          </div>
          <div className="gx-media-body gx-featured-content flex-column">
              

              <Link href={`/${listingUrlBase(type)}/${slug}`} as={`/${listingUrlBase(type)}/${slug}`}>
                  <h3 className="_title truncate-2" dangerouslySetInnerHTML={{__html: title?.rendered}}/>
              </Link>
              {catView}


              <p className="gx-text-grey gx-mb-1">{subTitle}</p>

              <div className="ant-row-flex">
                <p className="gx-mb-2 gx-text-grey _excerpt truncate-2" dangerouslySetInnerHTML={{__html: short_desc}}/>
              </div>
              <div className="mb-10"><CommunityStats listing={data} views/></div>

              <div className="d-flex flex-row flex-nowrap justify-betwen">
               {/*  <CommunityStats listing={data} likes views/> */}
                <div className="author_actions">
                  <a target={'_blank'} className="fw-600 btn btn-light shadow-sm btn-sm text-12" href={`${WPDomain}/my-account/my-listings/?action=edit&job_id=${id}&lc_tok=${token}`}>Edit Page</a>
                  <a target={'_blank'} className="fw-600 btn btn-light shadow-sm btn-sm text-12" href={`${WPDomain}/my-account/?listing=${id}&lc_tok=${token}`}>Performance Data</a>
                </div>
                </div>

            {/* <div className="gx-featured-content-right">
              <div className="_top">
                <CommunityStats listing={data} views/>
                </div>
            </div> */}

          </div>
          </div>
  }

  return (<>
          {cardView}
          </>  
          );
}

const AuthorListingCard = memo(AuthorListingCardConst);
export default AuthorListingCard;
