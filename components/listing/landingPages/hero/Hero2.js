"use client"

import dynamic from 'next/dynamic';
import { cleanHtml, srcWithFallback, randomEither, fetchRephrase, resizedImage } from '@/helpers/universal';
import { useRecoilValue } from 'recoil';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
//import { Client } from 'react-hydration-provider';
import {fallbackImgSrcSet, homeurl, WPDomain } from "@/helpers/base";
//import { BookingView } from '@/components/listing/partials/ActionButtons';
import { Suspense} from 'react';
import Mirrored from '@/components/UI/partials/Mirrored';
import { UISizes } from '@/contexts/atoms';
import { HorizontalGrid } from '@/components/UI/Galleries/MegaGallery';
import styles from '@/components/listing/styles/home1.module.css';
import { ListingMetaMini } from '@/components/UI/Partials';
//import { fadingSlide, largeResp } from '@/helpers/sliders';
//import Slider from 'react-slick';
import Image from 'next/image';
//import VisitorActions from '../../partials/VisitorActions';
import DateViewState from '@/components/UI/partials/dateViews/DateViewState';
import Link from 'next/link';
import HeroDetail from './partials/HeroDetail';
import ProfileHeaderMini from './profileHeaderMini';
//import { LoaderDualRingBoxed } from '@/components/skeletons/Loaders';
//import AliceCarousel from 'react-alice-carousel';

const Hero2 = ({listing, main=false, lMenu, activeKey, params={view :''}, color, setActiveKey, user, token, exClass=''}) => {
  const {cover, page_views, title, rating, acf, meta, category, author_id, gallery, id} = listing ?? {};
  const {greeting} = listing.landing;
  const {general_merchandise} = acf ?? {}
  const {likes, gen} = acf?.community ?? {};
  const {rl_awesome, color:catColor, name:catName} = category ?? {};
  const {isMobile, isLargeTab} = useRecoilValue(UISizes);
  const {google_cover} = meta ?? {}


  //const [coverBlur] = coverBlur ? useNextBlurhash(`${coverBlur}`, 800, 600) : "La7Cy]enMJay*0e.R5aetmjZWBax";

  let galArr = [], greetingView, firstWord='', lastWords='', actionTwoLink, actionLink, freshDesc;
  /* const settings = { arrows: true, dots: true, infinite: true, speed: 1000, marginLeft: 10, marginRight: 10, slidesToShow: 1, cssEase: 'ease-out', slidesToScroll: 1, }; */
  

  if(title){
  const wordArr = title?.rendered.split(' ');
    if(wordArr){
      firstWord = wordArr[0];
      wordArr.shift();
      lastWords = wordArr.join(' ');
    }
  }

  if(gallery?.length > 0){
    galArr = gallery.slice(0,4);
  }
  if(greeting){
      greetingView = <p className="greeting_msg">{greeting}</p>
  }else{
      greetingView = <p className="greeting_msg">Welcome to <span className="_title text-outlined"   dangerouslySetInnerHTML={{   __html: listing?.title?.rendered}}/></p>
  }

  if(user){
    if(author_id == user.id){
      actionLink = <Link
        href={`${WPDomain}/my-account/my-listings/?action=edit&job_id=${listing.id}&lc_tok=${token}`}
        className="listing_edit rounded-5 btn btn-sm m-0 btn-outline-secondary"
        target='_blank'>Edit Listing</Link>
    }else{
      actionLink = <button onClick={() => {setActiveKey(general_merchandise?.length > 0 ? 'merchandise' : 'private-chat')}} className='btn ui-2 animated'>{general_merchandise?.length > 0 ?'Our Store':'Contact Us'}</button>
    }

    if(user?.id === 1){
     actionTwoLink = <Link
       href={`${homeurl}/api/revalidate?path=/events/${listing.slug}`}
       className="btn btn-sm m-0 btn-outline-secondary listing_edit rounded-5"
       target='_blank'>Rebuild Listing</Link>
   }
 }else{
  actionLink = <button onClick={() => {setActiveKey(general_merchandise?.length > 0 ? 'merchandise' : 'private-chat')}} className='btn ui-2 animated'>{general_merchandise?.length > 0 ?'Our Store':'Contact Us'}</button>
}

  /* let randomColor = () => {
    if(palette?.length > 0){
      let colArr = randomEither(palette);
      if(colArr){
      return `${colArr}`;
      }
    }else{
      return '#000';
     }
  } */
  //let nowColor = randomColor();
    if(activeKey !== 'home' && activeKey !=='cover'){
     // const ProfileHeaderMini = dynamic(() => import('./profileHeaderMini'));
      return <ProfileHeaderMini activeKey={activeKey} lMenu={lMenu}  color={color} setActiveKey={setActiveKey} listing={listing}/>
    }

  return (<>
    <Suspense>
        <div className={`hero hero2 listing_hero ${styles['location']} d-block ${exClass}`}>
            <div className='hero_images d-block d-md-none md-hero pos-relative'>
              {/* <div className={`${styles['slider_col']}`} >

             <AliceCarousel autoPlay={false} animationDuration={1000} disableButtonsControls slidesToShow={1} animationType='fadeout' autoPlayInterval={5000}  {...settings}
                                items={[cover, ...galArr].map((item, index) =>
              <>
            <Mirrored coverTop topPadding={'50px'} skewDegrees={5}  skewDir={'-'} YDistance={150}>
            <div className='hero_cover position-relative w-100'>
            <Image                   
                  placeholder="blur"
                   changerKey={listing.id}
                   blurDataURL={coverBlur}
                   fill
                   priority
                   alt="image"
                   src={item}
                   className={`object-cover ${styles['image6']}`}
                   //onError={(e) => {e.target.src = '/images/bg/fallback.jpg'}}
                   onErrorCapture = {(e) => {e.target.src = '/images/bg/fallback.jpg', e.target.srcset= {fallbackImgSrcSet}}}
                   //sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  </div>
            </Mirrored>
               </>
                )
              } 
                />
            </div> */}
              <Mirrored coverTop gap={2} objClass=''  topPadding={'50px'} skewDegrees={4} skewDir={'-'} YDistance={200}>
                <div className='hero_cover position-relative w-100'>
                  <img                   
                  //placeholder="blur"
                   //changerKey={listing.id}
                   //blurDataURL={coverBlur}
                   //fetchpriority="high"
                   fetchPriority='high'
                   quality={100}
                   fill
                   priority
                   alt="image"
                   src={srcWithFallback(resizedImage(cover ?? google_cover, 'large'))}
                   className={`object-cover ${styles['image6']}`}
                   //onError={(e) => {e.target.src = '/images/bg/fallback.jpg'}}
                   onErrorCapture = {(e) => {e.target.src = '/images/bg/fallback.jpg', e.target.srcset= {fallbackImgSrcSet}}}
                   //sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className='card-bottom'>
                  
                  </div>
                </div>
                </Mirrored>
                {/* <div className='row_flex justify-items-start position-absolute pt-120  top-0 justify-end text-right right-0 pe-4 ps-5 color-white text-shadow-l' style={{zIndex: '10'}}>
                  <div className="d-flex flex-column align-items-center text-center gap-2 hero_meta" data-aos='fade-up'>
                  <DateViewState fromActive exClass={'bg-theme dotty ripple'} eventId={id}/>
                    </div>
                  </div> */}
                <div className='flex-column row_flex justify-items-end gap-3 hero_title position-absolute  bottom-0 justify-end text-right right-0 px-30 ps-5 color-white text-shadow-l' style={{zIndex: '10'}}>
                  <div className='profile_name h-fit minw-0 flex-shrink-1'>
                        <h1 className='truncate-3 text-capitalize' data-aos='zoom-in'>{cleanHtml(title?.rendered).toLowerCase()}</h1>
                        {/* <h1 className="styled_title lh-1 truncate-4 text-50 mb-0 color-white">
                          <span className="list_title _first" dangerouslySetInnerHTML={{__html: firstWord}}/><span> </span><span className="list_title _last" dangerouslySetInnerHTML={{__html: lastWords}}/> 
                        </h1> */}
                  </div>
                  <div className="d-flex flex-row align-items-center text-center gap-2 hero_meta" data-aos='fade-up'>
                  <DateViewState fromActive exClass={'bg-theme dotty ripple'} eventId={id}/>
                  <ListingMetaMini  exClass={'pos-relative z-2 justify-end'} page_likes={likes?.length ?? null}  page_views={page_views} ratings={rating}/>
                    </div>
                  </div>
                
            </div>
          <div className='hero_images d-md-grid d-none'>
            <div className='hero_cover position-relative'>
              <Image              
             // placeholder="blur"
              //blurDataURL={coverBlur}
              priority
              fill
              alt="image"
              src={srcWithFallback(cover  ?? google_cover)}
              className={styles['image6']}
              //onError={(e) => {e.target.src = '/images/bg/fallback.jpg'}}
              onErrorCapture = {(e) => {e.target.src = '/images/bg/fallback.jpg', e.target.srcset= {fallbackImgSrcSet}}}
            />
          </div>
            <>
            {galArr[0]  ? <div className='d-block lg:d-none mid_img'>
              <img 
                className='h-full object-center object-cover w-100' 
                src={srcWithFallback(galArr[0])}
                onError = {(e) => {e.target.src = '/images/bg/fallback.jpg', e.target.srcset= {fallbackImgSrcSet}}}
                />
            </div> : <></>}
            {!isLargeTab && <div className='d-block lg:d-none grid_img'>
              {galArr[1] ? <ResponsiveMasonry className='hero_grid' columnsCountBreakPoints={{0: 4, 900: 1}}>
            <Masonry className='grid_box' gutter='10px'>
              {galArr.slice(1,3).map((im, i) => {
                return <img 
                src={srcWithFallback(im)} 
                onError = {(e) => {e.target.src = '/images/bg/fallback.jpg', e.target.srcset= {fallbackImgSrcSet}}}
                key={i}/>
              })}
            </Masonry>
            </ResponsiveMasonry> : <></>}
            </div>}
            </>

            {!isLargeTab && <>
              {galArr[0] ?
              <div className='d-none lg:d-block overflow-hidden'>
                <HorizontalGrid height={'100%'}>
                {galArr.slice(0,3).map((im, i) => {
                  return <img 
                    onError = {(e) => {e.target.src = '/images/bg/fallback.jpg', e.target.srcset= {fallbackImgSrcSet}}}
                    src={im} key={i}/>
                })}
                </HorizontalGrid>;
              </div> : <></>}
            </>}
          </div>
        <HeroDetail listing={listing} activeKey={activeKey} color={color} setActiveKey={setActiveKey} user={user} token={token} exClass=''/>
    </div></Suspense>
    <style jsx global>{`
    :root {
      --dl-size-size-large: 144px;
      --dl-size-size-small: 48px;
      --dl-size-size-medium: 96px;
      --dl-size-size-xlarge: 192px;
      --dl-size-size-xsmall: 16px;
      --dl-space-space-unit: 16px;
      --dl-color-scheme-pink: #fb275a;
      --dl-size-size-xxlarge: 288px;
      --dl-color-scheme-black: #0f1722ff;
      --dl-color-scheme-white: #FFFFFF;
      --dl-size-size-maxwidth: 1158px;
      --dl-radius-radius-round: 50%;
      --dl-color-scheme-white80: #ffffff;
      --dl-space-space-halfunit: 8px;
      --dl-space-space-sixunits: 96px;
      --dl-space-space-twounits: 32px;
      --dl-color-scheme-darkblue: #0d1f3a;
      --dl-color-scheme-darkgray: #9095a7;
      --dl-radius-radius-radius2: 2px;
      --dl-radius-radius-radius4: 4px;
      --dl-radius-radius-radius8: 8px;
      --dl-space-space-fiveunits: 80px;
      --dl-space-space-fourunits: 64px;
      --dl-color-scheme-lightblue: #0975f1;
      --dl-color-scheme-lightgrey: #f2f4fa;
      --dl-space-space-threeunits: 48px;
      --dl-space-space-oneandhalfunits: 24px;
    }`}</style>
    </>
  )
}

export default Hero2
