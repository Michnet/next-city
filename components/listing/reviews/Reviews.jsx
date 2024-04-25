import  {useState, useEffect, memo} from 'react';
import PostReviews from './postReviews';
import ReviewSubmit from './ReviewSubmit';
//import ReviewSubmit from './Submit';


function ListingReviewsConst({postID, user, bgImage, setActiveKey}) {
    const [loading, setLoading] = useState(true);
    const [reloading, setReloading] = useState('forth');

    const {reviewed} = user?.user_meta ?? {};

    let submitView;
    const reload = () =>{
      if(reloading === 'forth'){
          setReloading('back')
      }else(
          setReloading('forth')
      )
  }

    if(reviewed){
      if(reviewed?.length > 0 && reviewed.includes(postID.toString())){
          submitView = <div className="_info card bg-light mb-3 position-relative">
                        <div className="card-header">Already Reviewed</div>
                        <div className="card-body">
                          <h5 className="card-title">Thank You</h5> 
                          <div className='floater_box z-0' ><i className="bi bi-hand-thumbs-up"></i></div>
                          <p className="card-text">You have already submitted a review for this page</p>
                        </div>
                      </div>
      }else{

        submitView = <ReviewSubmit source_id={postID} reloadAll={reload}/>
      }
    }else{
      submitView = <ReviewSubmit source_id={postID} reloadAll={reload}/>
    }


    useEffect(() => {
      setLoading(false);
      return () => {
        setLoading(true);
      }
    }, [postID, reloading, user])
    


  return (
    <div className='listing_reviews' key={reloading}>
        <>{submitView}</>
        {/* <PostReviews id={postID} reload={reload} carousel/> */}
        <PostReviews id={postID} reload={reload} setActiveKey={setActiveKey}/>
    </div>
  )
}

const ListingReviews = memo(ListingReviewsConst);
export default ListingReviews