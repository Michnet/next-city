import  {useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil';
import Image from 'next/image';
//import { Splide, SplideSlide } from '@splidejs/react-splide';
import CallToActions from '@/components/UI/CallToActions';
import { authState, activeReviewsState } from '@/contexts/atoms';
import { LoaderDualRingBoxed } from '@/components/skeletons/Loaders';
import { fetchListingReviews } from '@/helpers/rest';
import dynamic from 'next/dynamic';
//import ReviewCard from './ReviewCard';
import Splider from '@/components/UI/partials/Splider';
import { Heading1 } from '@/components/UI/partials/headings/Heading1';


function PostReviews({id, author_id, headerLess=false, light=true, fromActive=false, cardType=1, preview = false, carousel, limit, reload, title, bgImage=false, transparentCards=false, setActiveKey, withButton=false, sliderOptions={}}) {
    const [auth, setAuth] = useRecoilState(authState);
    const {user} = auth ?? {};
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(true);
    const [reviews, setReviews] = useState(null);
    const activeReviews = fromActive ? useRecoilValue(activeReviewsState) : null;

    let localSliderOptions = {gap:15, arrows: false, wheel:false, autoWidth: true, padding: { left: 0, right: 15}, perPage:1, autoplay: false, perMove: 1, interval:6000, type:'loop', ...sliderOptions}
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

    let SingleReview
    switch (cardType) {
        case 1:
            SingleReview = dynamic(() => import('./reviewCards/SingleReview'));
            break;
        case 2:
            SingleReview = dynamic(() => import('./reviewCards/SingleReview2'));
            break;
    
        default:
            SingleReview = dynamic(() => import('./reviewCards/SingleReview'));
            break;
    }

    let reviewsView, totalView; 
    let fallBackView = <div style={{maxWidth: 500, marginLeft: 'auto', marginRight: 'auto'}}>{loading ?  <div><LoaderDualRingBoxed height={300}/></div> : <>{
        userOwned ? 
        <CallToActions bgClass={transparentCards ? 'bg-transparent shadow-0' : 'bg-theme'} title={'No Reviews Yet'} light={light} descript={'No one has submitted a review for your event yet. Share your page and encourage others to share their reviews of your event'}/> 
        : <CallToActions bgClass={transparentCards ? 'bg-transparent shadow-0' : 'bg-theme'} descript={'No one has submitted a review for this page. If you have had a real life experience with this business/event, be the first to add a review'} light={light}  title={'Be the first'} actionComponent={withButton ? <button className={`btn ${light ? '' : 'btn-light'}`} onClick={() => setActiveKey('reviews')}>Add Review</button> : <></>}/>}</>}</div>
    if(loading){
        reviewsView = <div><LoaderDualRingBoxed height={300}/></div>
    }else if(reviews){
        
        const {list, total, rating} = reviews;
        if(list?.length > 0){
    
         if(carousel){
             reviewsView = <Splider options={{...localSliderOptions}}>  
             {list.map((item) => {
                 return <SingleReview preview={preview} transparent={transparentCards} exClass={`mx-0 ${transparentCards ? 'border' : ''}`} width={300} reload={reload} review={item} key={item.id} user={user} listingId={id}/>
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
             const computed = Math.round(rating/10);
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
       {!headerLess && <Heading1 title={'User Reviews'} subtitle={'What Others Are Saying'}/>}
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