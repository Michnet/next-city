import  {useState, useEffect, memo} from "react";
import { Client } from "react-hydration-provider";
import Widget from "@/components/UI/partials/Widget";
import { LoaderDualRingBoxed } from '@/components/skeletons/Loaders';

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
       contentView = <Widget bodyClass={'px-0'} exClass={'bg-transparent px-0 shadow-0'} styleObj={{backgroundColor : 'transparent !important'}} freeHeader subtitle={'More About Listing'} title= 'Event Detail' > <div className="position-relative">
                          <Client><div className={`listing_content ${fullContent ? '' : 'truncate-5'}`} dangerouslySetInnerHTML={{ __html: detail }}/>
                          </Client>
                          {/* {fullContent ? <></> : <div className="_hidden_hint"></div>} */}
                        </div>
                        <div className="content_footer">
                          <button className="btn btn-sm mb-0 btn-outline-secondary" onClick={() => setFullContent(!fullContent)}>{fullContent ? 'Show Less' : 'Show More'}</button>
                        </div>
                      </Widget>
     }
    
  
    return (<>{loading ? <LoaderDualRingBoxed/> :
          <div className={`detail-desc card card-style shadow-0 border-0 bg-transparent ${exClass}`}>
                  {contentView}
          </div>}
          </>                
    );
  
}

const ListingDetail = memo(ListingDetailConst)
export default ListingDetail;


