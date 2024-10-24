"use client";

import  {useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil';
import Image from 'next/image';
import CallToActions from '@/components/UI/CallToActions';
import { authState } from '@/contexts/atoms';
import { LoaderDualRingBoxed } from '@/components/skeletons/Loaders';
import dynamic from 'next/dynamic';
import Splider from '@/components/UI/partials/Splider';
import { Heading1 } from '@/components/UI/partials/headings/Heading1';
import { typeName } from '@/helpers/universal';


function GoogleReviews({id, type=null, listing, headerLess=false, light=true,  cardType=1, preview = false, carousel,  reload, bgImage=false, transparentCards=false, setActiveKey, withButton=false, sliderOptions={}}) {
    const [auth, setAuth] = useRecoilState(authState);
    const {user} = auth ?? {};
    const [loading, setLoading] = useState(true);
    const [reviews, setReviews] = useState(null);
    const {meta} = listing ?? {}
    let {google_reviews, google_rating, google_rating_total} = meta ?? {};
    

    let localSliderOptions = {gap:15, arrows: false, wheel:false, autoWidth: true, padding: { left: 0, right: 15}, perPage:1, autoplay: false, perMove: 1, interval:6000, type:'loop', ...sliderOptions}

    useEffect(() => {
        setLoading(true);
        let g_revs = JSON.parse(google_reviews);
        if(g_revs?.length > 0){
            setReviews(g_revs)
        }
        setLoading(false);
        return () => {setReviews(null);
        }; 
      
    }, [id]);

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
    let fallBackView = <div style={{maxWidth: 500, marginLeft: 'auto', marginRight: 'auto'}}>{loading ?  <div><LoaderDualRingBoxed height={300}/></div> : <>{<CallToActions bgClass={transparentCards ? 'bg-transparent shadow-0' : 'bg-theme'} descript={`No one has submitted a review for this page. If you have had a real life experience with this ${typeName(type)}, be the first to add a review`} light={light}  title={'Be the first'} actionComponent={withButton ? <button className={`btn ${light ? '' : 'btn-light'}`} onClick={() => setActiveKey('reviews')}>Add Review</button> : <></>}/>}</>}</div>
    if(loading){
        reviewsView = <div><LoaderDualRingBoxed height={300}/></div>
    }else if(reviews){        
        if(reviews?.length > 0){
    
         if(carousel){
             reviewsView = <Splider options={{...localSliderOptions}}>  
             {reviews.map((item) => {
                 return <SingleReview google preview={preview} transparent={transparentCards} exClass={`mx-0 ${transparentCards ? 'border' : ''}`} width={300} reload={reload} review={item} key={item.id} user={user} listingId={id}/>
             })} 
             </Splider> 
         }else{
             reviewsView = reviews.map((item) => {
                 return <SingleReview google exClass={'mx-0 mb-15'} reload={reload} review={item} key={item.id} user={user} listingId={id}/>
             })
         }
    
         }else{
            reviewsView = <>{fallBackView}</>
         }
         if(google_rating){
             totalView = <>
                 <span className=' rating_score mb-2'>
                     {google_rating}
                 </span>
                 <p className='raters truncate'><span className='raters_fig fw-bold'>{`${google_rating_total}`} </span>{`Review${google_rating_total > 1 ? 's' : ''}`}</p>
                 
                 </>
         }
    }else{
        reviewsView = <>{fallBackView}</>
    }
   
  return (
   <>
       {!headerLess && <Heading1 title={'User Reviews'} subtitle={'What Others Are Saying'}/>}
        {reviews?.length > 0 ? 
    <div className={`listing_reviews pos-relative _wall ${carousel ? '_slider' : ''}`}>
        <div className='d-grid align-items-center' style={{gridTemplateColumns: 'calc(100% - 100px) 100px'}}>
            <div className=''><img className='mw-100' src='/images/logos/google-reviews.png'/></div>
       <div className='overall_score d-flex flex-column align-items-end px-3'>
           {totalView}
       </div></div>
       
       <div className="reviews">
            {reviewsView}
            {/* {preview && <button className=' btn-link btn w-fit' onClick={() => {setActiveKey("reviews")}}>Go to Reviews</button>} */}
        </div>
   </div> : fallBackView}
   </>
  )
}

export default GoogleReviews