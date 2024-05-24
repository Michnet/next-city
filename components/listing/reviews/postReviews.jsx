import  {useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil';
import Image from 'next/image';
//import { Splide, SplideSlide } from '@splidejs/react-splide';
import CallToActions from '@/components/UI/CallToActions';
import { authState, activeReviewsState } from '@/contexts/atoms';
import { LoaderDualRingBoxed } from '@/components/skeletons/Loaders';
import { fetchListingReviews } from '@/helpers/rest';
//import ReviewCard from './ReviewCard';
import SingleReview from './SingleReview';
import Splider from '@/components/UI/partials/Splider';


function PostReviews({id, author_id, fromActive=false, carousel, limit, reload, title, bgImage=false, transparentCards=false, setActiveKey, withButton=false}) {
    const [auth, setAuth] = useRecoilState(authState);
    const {user} = auth ?? {};
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(true);
    const [reviews, setReviews] = useState(null);
    const activeReviews = fromActive ? useRecoilValue(activeReviewsState) : null;

    let userOwned = user?.id == author_id;
 
    async function getReviews(payload, signal){
        const reviewsData = await fetchListingReviews(payload, signal);
           if(reviewsData){
            setReviews(reviewsData.data); 
            setLoading(false); 
            }
    }

    useEffect(() => {
        const controller = new AbortController();
        const {signal} = controller;

        const payload = {
            source_id : id,
            page : page
        }

        if(limit){
            payload.per_page = limit
        }
        setLoading(true)
        if(fromActive){
            const {act_id, act_reviews} = activeReviews;
            if(act_id == id){
                setReviews(act_reviews); 
            }
            setLoading(false); 
        }else{
            getReviews(payload, signal)
        }

        /* const interval = setInterval(() => {
            getReviews(payload)

        }, 60000);*/
        return () => {setReviews(null); controller.abort();
        }; 
      
    }, [id, activeReviews]);

    let reviewsView, totalView; 
    let fallBackView = <>{loading ?  <div><LoaderDualRingBoxed height={300}/></div> : <>{
        userOwned ? 
        <CallToActions title={'No Reviews Yet'} light descript={'No one has submitted a review for your event yet. Share your page and encourage others to share their reviews of your event'}/> 
        : <CallToActions bgClass={'bg-theme'} descript={'No one has submitted a review for this page. If you have had a real life experience with this business/event, be the first to add a review'} light  title={'Be the first'} actionComponent={withButton ? <button className='btn' onClick={() => setActiveKey('reviews')}>Add Review</button> : <></>}/>}</>}</>
    if(loading){
        reviewsView = <div><LoaderDualRingBoxed height={300}/></div>
    }else if(reviews){
        
        const {list, total, rating} = reviews;
        if(list?.length > 0){
    
         if(carousel){
             reviewsView = <Splider height={200} options={{gap:15, arrows: false, wheel:false, autoWidth: true, padding: { left: 10, right: 15}, perPage:1, autoplay: true, perMove: 1, interval:6000, type:'carousel'}}>  
             {list.map((item) => {
                 return <SingleReview transparent={transparentCards} exClass={`mx-0 ${transparentCards ? 'border' : ''}`} width={300} reload={reload} review={item} key={item.id} user={user} listingId={id}/>
             })} 
             </Splider> 
         }else{
             reviewsView = list.map((item) => {
                 return <SingleReview exClass={'mx-0 mb-15'} reload={reload} review={item} key={item.id} user={user} listingId={id}/>
             })
         }
    
         }else{
            reviewsView = <>{fallBackView}</>
         }
         if(rating){
             const computed = rating/10;
             totalView = <>
                 <span className=' rating_score'>
                     {computed}
                 </span>
                 <p className='raters'>{`${total} Review${total > 1 ? 's' : ''}`}</p>
                 
                 </>
         }
    }else{
        reviewsView = <>{fallBackView}</>
    }
   
  return (
   <>
   <div className='mb-20 mx-4 mt-10 sc_heading_3 pos-relative'>
            <h5>What others are saying</h5>
            <h4>User Reviews</h4>
        </div>
        {reviews?.list?.length > 0 ? 
    <div className={`listing_reviews pos-relative _wall ${carousel ? '_slider' : ''}`}>
        
       {!carousel && <div className='overall_score d-flex flex-column align-items-end px-3'>
           {totalView}
       </div>}
       {bgImage ? 
       <>
            <Image fill style={{objectFit:"cover"}} src= {bgImage}/>
            <div className='cover_overlay full_ht whitey _blur'></div>
       </> 
       : <></>}
       
       <div className="reviews">
            {reviewsView}
        </div>
   </div> : fallBackView}
   </>
  )
}

export default PostReviews