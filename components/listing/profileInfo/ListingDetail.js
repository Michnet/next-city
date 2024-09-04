import  {useState, useEffect, memo} from "react";
import { Client } from "react-hydration-provider";
import Widget from "@/components/UI/partials/Widget";
import { LoaderDualRingBoxed } from '@/components/skeletons/Loaders';
import { cleanHtml, hashtag } from "@/helpers/universal";

const ListingDetailConst = ({id, detail, exClass=''}) => {
  //const [tags, setTags] = useState(null);
  const [fullContent, setFullContent] = useState(false);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true);
    setLoading(false);
    setFullContent(false);
    
  }, [id]);

    let contentView;
    

     if(detail){
       contentView = <Widget bodyClass={'p-3'} headingExClass={'mx-0 mb-2'} exClass={'bg-transparent mx-0 shadow-0 top_border partial_border'} styleObj={{backgroundColor : 'transparent !important'}} freeHeader subtitle={'More About Listing'} title= 'Event Detail'> <div className="position-relative">
                          <Client><div data-aos='fade' className={`listing_content opacity-60 ${fullContent ? '' : 'truncate-5'}`} dangerouslySetInnerHTML={{ __html: hashtag(cleanHtml(detail))}}/>
                          </Client>
                          {/* {fullContent ? <></> : <div className="_hidden_hint"></div>} */}
                        </div>
                        <div className="content_footer">
                          <button className="btn btn-sm mb-0 btn-outline-secondary" onClick={() => setFullContent(!fullContent)}>{fullContent ? 'Show Less' : 'Show More'}</button>
                        </div>
                      </Widget>
     }
    
  
    return (<>{loading ? <LoaderDualRingBoxed/> :
          <div className={`detail-desc card card-style rounded-0 shadow-0 border-0 bg-transparent ${exClass}`}>
                  {contentView}
          </div>}
          </>                
    );
  
}

const ListingDetail = memo(ListingDetailConst)
export default ListingDetail;


