import  {useEffect, useState } from 'react'
import { useRecoilState } from 'recoil';
import Image from 'next/image';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import CallToActions from '@/components/UI/CallToActions';
import { authState } from '@/contexts/atoms';
import { LoaderDualRingBoxed } from '@/components/skeletons/Loaders';
import { fetchListingReviews } from '@/helpers/rest';
import ReviewCard from './ReviewCard';
import SingleReview from './SingleReview';


function PostReviews({id, carousel, limit, reload, bgImage}) {
    const [auth, setAuth] = useRecoilState(authState);
    const {user} = auth ?? {};
    const user_meta = user?.user_meta;
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(true);
    const [reviews, setReviews] = useState([]);
 
    async function getReviews(payload){
        const reviewsData = await fetchListingReviews(payload);
           if(reviewsData){
            setReviews(reviewsData.data); 
            setLoading(false); 
            }
    }

    const settings = {
        className: "center",
        centerMode: false,
        infinite: true,
        autoplay: true,
        speed: 1000,
        autoplaySpeed: 6000,
        cssEase: "linear",
        slidesPerRow: 1,
        slidesToScroll: 1,
        pauseOnHover: true,
        dots : true,
        fade : true
        
      };

    useEffect(() => {
        const payload = {
            source_id : id,
            page : page
        }

        if(limit){
            payload.per_page = limit
        }
        setLoading(true)
        getReviews(payload)

        /* const interval = setInterval(() => {
            getReviews(payload)

        }, 60000);*/
        return () => {console.log('out')}; 
      
    }, [id])

    let reviewsView, totalView;
    if(loading){
        reviewsView = <div><LoaderDualRingBoxed height={300}/></div>
    }else if(reviews){
        
        const {list, total, rating} = reviews;
        if(list?.length > 0){
    
         if(carousel){
             reviewsView = <Splide>  {list.map((item) => {
                 return <SplideSlide><ReviewText review={item} key={item.id} user={user} listingId={id}/></SplideSlide>
             })} </Splide> 
         }else{
             reviewsView = list.map((item) => {
                 return <SingleReview reload={reload} review={item} key={item.id} user={user} listingId={id}/>
             })
         }
    
         }else{
            reviewsView = <CallToActions bgClass={'bg-white'} descript={'No one has submitted a review for this page. If you have had a real life experience with this business/event, be the first to add a review'} light  title={'Be the first'}/>
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
        reviewsView = <></>
    }
   
  return (
   <>{reviews?.list?.length > 0 ? 
    <div className={`listing_reviews pos-relative _wall ${carousel ? '_slider' : ''}`}>
       {!carousel && <div className='overall_score'>
           {totalView}
       </div>}
       {bgImage ? 
       <>
            <Image fill style={{objectFit:"cover"}} src= {bgImage}/>
            <div className='cover_overlay full_ht whitey _blur'></div>
       </> 
       : <></>}
   </div> : <></>}
   <div className="reviews">
            {reviewsView}
    </div>
   </>
  )
}

export default PostReviews