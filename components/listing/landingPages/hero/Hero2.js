import dynamic from 'next/dynamic';
import { cleanHtml, srcWithFallback, randomEither } from '@/helpers/universal';
import { useRecoilValue } from 'recoil';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { Client } from 'react-hydration-provider';
import {fallbackImgSrcSet } from "@/helpers/base";
import { BookingView } from '@/pages/events/[slug]';
import { Suspense } from 'react';
import DateViewDescriptive from '@/components/UI/partials/dateViews/DateViewDescriptive';
import DateViewString from '@/components/UI/partials/dateViews/DateViewString';
import Mirrored from '@/components/UI/partials/Mirrored';
import { PriceView } from '@/components/UI/PriceView';
import { UISizes } from '@/contexts/atoms';
import { HorizontalGrid } from '@/components/UI/Galleries/MegaGallery';
import CountDownUI from '@/components/UI/CountDownUI';
import styles from '@/components/listing/styles/home1.module.css';
import { ListingMetaMini } from '@/components/UI/Partials';
import { fadingSlide, largeResp } from '@/helpers/sliders';
import Slider from 'react-slick';
import Image from 'next/image';
//import AliceCarousel from 'react-alice-carousel';

const Hero2 = ({listing, palette, activeKey, color, setActiveKey}) => {
  const {cover, page_views, title, rating, acf, category, venue,tagline, short_desc, gallery, id, type, locations, ticket_min_price_html, xtra_large_thumb, whatsapp} = listing ?? {};
  const {greeting} = listing.landing;
  const {likes} = acf?.community ?? {};
  const {rl_awesome, color:catColor, name:catName} = category;
  const {isMobile, isLargeTab} = useRecoilValue(UISizes);

  //const [coverBlur] = coverBlur ? useNextBlurhash(`${coverBlur}`, 800, 600) : "La7Cy]enMJay*0e.R5aetmjZWBax";

  let galArr = [], greetingView;
  const settings = { arrows: true, dots: true, infinite: true, speed: 1000, marginLeft: 10, marginRight: 10, slidesToShow: 1, cssEase: 'ease-out', slidesToScroll: 1, };

  if(gallery?.length > 0){
    galArr = gallery.slice(0,4);
  }
  if(greeting){
      greetingView = <p className="greeting_msg">{greeting}</p>
  }else{
      greetingView = <p className="greeting_msg">Welcome to <span className="_title text-outlined"   dangerouslySetInnerHTML={{   __html: listing?.title?.rendered}}/></p>
  }

  let randomColor = () => {
    if(palette?.length > 0){
      let colArr = randomEither(palette);
      if(colArr){
      return `${colArr}`;
      }
    }else{
      return '#000';
     }
  }
  let nowColor = randomColor();

  if(activeKey !== 'home' && activeKey !=='cover'){
    const ProfileHeaderMini = dynamic(() => import('./profileHeaderMini'));
    return <ProfileHeaderMini activeKey={activeKey}   color={color} setActiveKey={setActiveKey} listing={listing}/>
  }

  return (<>
    <Suspense>
        <div className={`hero2 listing_hero ${styles['location']} d-block`}>
            <div className='hero_images d-block d-md-none md-hero'>
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
              {/* <Mirrored coverTop topPadding={'50px'} skewDegrees={5}  skewDir={'-'} YDistance={150}>
                <div className='hero_cover position-relative w-100'>
                  <Image                   
                  //placeholder="blur"
                   //changerKey={listing.id}
                   //blurDataURL={coverBlur}
                   fill
                   priority
                   alt="image"
                   src={srcWithFallback(cover)}
                   className={`object-cover ${styles['image6']}`}
                   //onError={(e) => {e.target.src = '/images/bg/fallback.jpg'}}
                   onErrorCapture = {(e) => {e.target.src = '/images/bg/fallback.jpg', e.target.srcset= {fallbackImgSrcSet}}}
                   //sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className='card-bottom'>
                  
                  </div>
                </div>
                </Mirrored> */}
                <Slider arrows={false}  {...fadingSlide} responsive = {[...largeResp]} autoPlaySpeed={5000} speed={2000}>
                    {[cover ?? '', ...galArr].map((item, index) =>
                      <>
                    <Mirrored gap={15} objClass='card card-style bg-cover shadow-bg shadow-bg-xl' objBg={item} topPadding={'0px'} skewDegrees={0} key={index}  skewDir={'-'} YDistance={200}>
                    <div className='hero_cover position-relative w-100'>
                    <Image                   
                          //placeholder="blur"
                          //changerKey={listing.id}
                          //blurDataURL={coverBlur}
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
                  </Slider>
            </div>
          <div className='hero_images d-md-grid d-none mt-2'>
            <div className='hero_cover position-relative'>
              <Image              
             // placeholder="blur"
              //blurDataURL={coverBlur}
              priority
              fill
              alt="image"
              src={srcWithFallback(cover)}
              className={styles['image6']}
              //onError={(e) => {e.target.src = '/images/bg/fallback.jpg'}}
              onErrorCapture = {(e) => {e.target.src = '/images/bg/fallback.jpg', e.target.srcset= {fallbackImgSrcSet}}}
            />
          </div>
            {!isLargeTab && <>
            <div className='d-block lg:d-none mid_img'>
              <img 
                className='h-full object-center object-cover' 
                src={srcWithFallback(galArr[0])}
                onError = {(e) => {e.target.src = '/images/bg/fallback.jpg', e.target.srcset= {fallbackImgSrcSet}}}
                />
            </div>
            <div className='d-block lg:d-none grid_img'>
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
            </div>
            </>}

            {isLargeTab && <>
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
          


            <div className='hero_title p-3 md:px-35 md:py-45 d-grid gap-4 align-items-center'>
             <div className='profile_name'>
             <ListingMetaMini filled colors={true} exClass={'pos-relative z-2 justify-end'} page_likes={likes?.length ?? null}  page_views={page_views} ratings={rating}/>
                <h1 className='mb-20'><span className={`heady`}>{cleanHtml(title?.rendered)}</span></h1>
                <div className='title_meta d-flex justify-end'>
                  <Client>
                <p style={{lineHeight: '1.6em'}}>
                  <span className={`target mr-4 mb-4 color-${color}-dark`}> {cleanHtml(catName)} </span>
                  <span className="target mr-4 mb-4"> {type} </span>
                  {locations ? <><span className='gray_text'> In</span> <span className="target mr-4"> {locations[0]?.name} </span></> : <></>}
                </p>
                </Client>
                </div>
             </div>
            <div> 
              <Client>
              <p className = 'mb-10'>
                    {greetingView}
              </p>
              <p className = 'mb-20 text-15 opacity-60'>
                  <span  dangerouslySetInnerHTML={{__html: short_desc}}/>
              </p></Client>
              {ticket_min_price_html ? <PriceView priceHTml={ticket_min_price_html} exClass={'_hero mb-10 d-block'}/> : <></>}
                <div className={`gap-2 flex-nowrap d-flex`}>
                  {whatsapp && <a href={`https://wa.me/${whatsapp}`} className="btn btn-m shadow-bg shadow-bg-m  rounded-s text-uppercase text-nowrap font-900 shadow-s bg-whatsapp btn-icon text-start">
                    <i className="fab fa-whatsapp font-15 text-center color-white"></i>
                    WhatsApp
                  </a>}
                  {/* { <BookingView setActiveKey={setActiveKey}children={
                  <button
                    className={`rounded mr-0  ${styles['button-secondary']} ${styles['button']} ${styles['button-md']} `}
                  >
                    Booking
                  </button>} />
                  } */}
                  <button onClick={() => setActiveKey('private-chat')} /* data-bs-toggle={isMobile ? 'offcanvas' : 'modal'} data-bs-target='#listing_contact' */
                    className={`btn text-truncate color-theme rounded ${styles['learn-more']} ${styles['button']} ${styles['button-outline']} ${styles['button-md-border']} `}
                  >
                    learn more
                  </button>
                </div>
              </div>
            </div>

          <div className={`card card-style`}>
          <div
            className={`z-1 p-5 pb-3 position-relative bg-black theme-dark ${styles['section-container']} card card-style w-auto m-0`}
          >
            {/* <div className='overlay position-absolute w-100 h-full top-0 bg-cover' style={{background: `url(/images/bg/connect.png)`}}/> */}
            <div className={`row gap-5 md:flex-row flex-md-nowrap flex-col position-relative`}>
              <div className={`col-12 col-md-6 text-right items-end px-0 ${styles['container4']}`}>
              <span className={styles['text19']}><DateViewString eventId={listing?.id}  format={'MMMM D'}/></span>
              {tagline && <span className={`${styles['text26']}`}>
                  {tagline}
                </span>}
                {venue && <span className={styles['text20']}>
                  <span className='fw-300'>@</span>
                  {venue}
                </span>}
              </div>
              <Client><div className="flex-grow-1 gap-2 d-flex md:items-end items-start flex-column col-12 col-md-6 px-0">
                {id ? <><CountDownUI light fromActive eventId={id} />
              {<DateViewDescriptive fromActive eventId={id} exClass={'_hero mb-10'} light/>}</> : <></>}
               
                
              </div>
            </Client>
            </div>
            </div>
          </div>
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
