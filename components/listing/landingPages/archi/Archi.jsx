"use client";

//import ArchiHeader from "./parts/ArchiHeader";
//import Head from "next/head"
import { Client } from "react-hydration-provider";
//import {Suspense } from "react";
//import ParallaxSection from "@/components/UI/sections/ParallaxSection";
import { isJsonString, randomEither, resizedImage, /* cleanHtml, */ shuffleArray, srcWithFallback } from '@/helpers/universal';
import ListingInfoCard from "@/components/listing/landingPages/hero/partials/ListingInfoCard";
import ListingDetail from "../../profileInfo/ListingDetail";
import PostReviews from './../../reviews/postReviews';
//import DualColorTitle from "@/components/UI/partials/headings/DualColorTitle";
//import Features from "@/components/UI/features/Features";
import FeaturesTabs from "@/components/UI/features/FeaturesTabs";
import Section from "@/components/UI/sections/Section";
import {DualColorHeader, SocialLinks } from '@/components/UI/Partials';
import TagsCloud from '@/components/listing/partials/TagsCloud';
import FAQs from "@/components/UI/FAQs";
import { GalleryPlate, HorizontalGrid } from "@/components/UI/Galleries/MegaGallery";
import { /* siteColors,  */siteSettings, WPDomain } from "@/helpers/base";
//import { ParallaxBanner } from "react-scroll-parallax";
//import ParallaxChildSection from "@/components/UI/sections/ParallaxChildSection";
import { Heading1, HeadingSeparatorDot } from "@/components/UI/partials/headings/Heading1";
//import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import MegaGalleryMini from "@/components/UI/Galleries/MegaGalleryMini";
import  ListingProductsSimple  from '@/components/listing/shop/ListingProductsSimple';
import { PriceView } from "@/components/UI/PriceView";
import FeaturesCarousel from "@/components/UI/features/FeaturesCarousel";
import { useRouter } from "next/navigation";
import GoogleReviews from "../../reviews/googleReviews";
//import WpComments from "@/components/UI/Comments/wpComments";



function Archi({listing, setActiveKey, colorHex, color}){
    const {meta, title, cover, content, about_us,id, ticket_min_price_html, author_id, type, dir_tags, listing_store, gallery} = listing ?? {};
    const {_wcu, _event_program, _stats, _links, google_reviews, "_event-sponsors": sponsors, "_special-guests": special_guests, _performers, _wwd} = meta ?? {};
    const {tickets, general_merchandise} = listing_store;
    const {faqs} = about_us ?? {};
    let wcu = _wcu ? _wcu[0] : null
    const router = useRouter();


    let detailView, reviewsView, googleReviewsView, shopView,ticketsHint, servicesView, galleryView, servs2, tagsView, faqsView, socialsView, horizontalGallery, horizontalGallery2;
    if(listing){
        if(_links?.length > 0){
            socialsView = <Section fullWidth overlay={false} exClass='shadow-0 border py-1 bg-fixed bg-transparent'>
            <div className='p-4 p-sm-5'>
            {/* <div className='card card-style partial_border double_left bottom_left my-5 p-5'> */}
                <Heading1 exClass='mb-3' title={'Our Social Profiles'} subtitle="Connect & Engage"/>
                <SocialLinks iconsOnly={false} exClass='_large flex-wrap' links={_links}/></div>
            {/* </div> */}
        </Section>
            
           
          }
        if(content){
            detailView = <Section fullWidth exContainerClass={'row_flex'} sideImg dark={false} bgUrl={`${resizedImage(randomEither(gallery), 'medium_large')}`} exClass='p-0 bg-fixed'>
                <div className='p-2 p-sm-5'>
                    <ListingDetail textExClass='' type={type}  detail={content} id={listing.id}/>
                </div>
            </Section>
          }
          if(dir_tags?.length > 0){
            let tagClick = (tag) => {
                router.push({
                    pathname: '/explore',
                    query: { tags: tag.slug },
                  })
            }
            tagsView = <Section  exClass='py-4 pb-0' title='Our Tags' descript={''} id="tags" /* bgUrl={`${srcWithFallback(resizedImage(randomEither(gallery), 'medium_large'))}`} */>
                <div>
                <div className='tags_row card card-style across_border partial_border pb_right mb-50'>
                <div className='row_content'>
                    <TagsCloud live hue={colorHex} dark={true} ids={dir_tags} /* hue={color} */ onClickFunc={tagClick}/>
                    <DualColorHeader titleClass='fw-bold text-30 color-theme' exClass='position-absolute bottom-0 right-0 pe-3 opacity-20 lg_text' title={'# Tagged In'} />
                 </div>
                 </div></div>
                 </Section>
        }
        if(general_merchandise?.length > 0){
            shopView = <Section fullWidth dark={false} overlay={false} exClass='overflow-visible rounded-0 py-3 shadow-0 bg-transparent'>
                <Heading1 title={'Our Store'} subtitle={`Latest items from page store`}/>
                <div className='card card-style px-0 shadow-0 bg-transparent m-0 overflow-visible'>
                <ListingProductsSimple noHeader={true} ids={general_merchandise.slice(0,4)} productType="simple" listingId = {listing?.id}/>
                <button className=' btn-theme btn w-fit' onClick={() => {setActiveKey("merchandise")}}>Go to Page Store</button>
                </div>
                </Section>
        }

        if(tickets?.length > 0){
            ticketsHint = <Section  /* bgUrl={srcWithFallback(randomEither([cover, ...gallery]))} */ exClass="px-4 pb-4 pt-3"><div className='mb-20 sc_heading_3 px-4 mt-4'>
            <h5>Engage Now</h5>
            <h4>Booking Options</h4>
        </div>
        <div className='p-0'>
                                <div className='ps-data d-flex flex-column p-3'>
                                        <div className="coverImg_box position-relative mb-4" style={{ background: "var(--bg-gray)" }}> 
                                            <div className='cover_content'>
                                                <h4>Online Booking Available</h4>
                                                <div className='divider mt-3 w-25'/>
                                                <>{ticket_min_price_html && <PriceView preText={'Starting from'}  exClass={'_inline text-20'} priceHTml={ticket_min_price_html}/> }</> 
                                            </div>
                                            
                                        </div>
                                        <div className='content_box'>
                                            {<button onClick={() => setActiveKey('tickets')} className={`btn btn-m  mb-3 rounded-l text-uppercase text-nowrap font-900 shadow-s btn-icon text-start ${`gradient-${color}`}`}>
                                                    <i className="fas fa-qrcode font-15 text-center bg-transparent"/>
                                                      See Options
                                                </button>}

                                            <div className='card_footer'>            
                                            </div>

                                        </div>
                                </div>
                        </div>
                        </Section>
        }
        if(gallery?.length > 0){
            let megaGall = shuffleArray([...gallery]);
            if(megaGall?.length > 0){
                let grid1Arr = megaGall.slice(0,3);
                let grid2Arr = megaGall.slice(3, 6);

                horizontalGallery = <HorizontalGrid gutter={0}>
                {grid1Arr.map((item, index) => {
                  if (typeof item == 'string') {
                    if(item?.length > 0){
                      if(item?.includes(siteSettings.wpDomain) || item?.includes(siteSettings.cdnDomain) || item?.includes('https')){
                        return  <GalleryPlate imgSize='medium' item={item} key={index}/>;
                      }
                    }
                  }else{
                    if(item?.url?.includes(siteSettings.wpDomain) || item?.url.includes('https')){
                        return  <GalleryPlate imgSize='medium' item={item} key={index}/>;
                      }else{
                        return <>{item}</>
                      }
                  }
                }
                )}
                </HorizontalGrid>; 

                if(grid2Arr?.length > 0){
                    horizontalGallery2 = <HorizontalGrid gutter={0}>
                    {grid2Arr.map((item, index) => {
                      if (typeof item == 'string') {
                        if(item?.length > 0){
                          if(item?.includes(siteSettings.wpDomain) || item?.includes(siteSettings.cdnDomain) || item?.includes('https')){
                            return  <GalleryPlate imgSize='thumbnail' item={item} key={index}/>;
                          }
                        }
                      }else{
                        if(item?.url?.includes(siteSettings.wpDomain) || item?.url.includes('https')){
                            return  <GalleryPlate imgSize='thumbnail' item={item} key={index}/>;
                          }else{
                            return <>{item}</>
                          }
                      }
                    }
                    )}
                    </HorizontalGrid>; 
                }
            }

            galleryView = <><section id="section-gallery" className="no-top no-bottom" aria-label="section-gallery">
                            <Section fullWidth  id="gallery" exClass={'p-0 bg-color'}   className="row g-0">
                                <div className='overlay-bg z-2 opacity-70'>
                                    <button onClick={() => setActiveKey('gallery')} className='btn border-0 btn-dark handy bg-transparent text-30 rounded-0 p-2 px-4'>Our Gallery</button>
                                </div>
                                <div style={{minWidth: '110%'}}>{horizontalGallery}</div>
                                <div style={{minWidth: '110%'}}>{horizontalGallery2}</div>
                            </Section> 
                            {/* <section id="view-all-projects" className="call-to-action bg-color text-center" data-speed="5" data-type="background" aria-label="view-all-projects">
                            <div className="overlay-bg"/>
                            <button onClick={() => setActiveKey('gallery')} className="btn btn-line py-3 btn-big">See Full Gallery</button>
                        </section> */}
                        </section>
                        
                        </>
        }
          if(_wwd?.length > 0){
            if(_wwd[0].list?.length > 0){

                        servicesView = <section id="section-about" className='pt-40'>
                            <FeaturesCarousel features={_wwd} defTitle='What we do'/>
                            </section>

                        servs2 = <Section id="section-steps" exClass="jarallax bg-fixed py-5" bgUrl={resizedImage(randomEither(gallery), 'medium_large')}>
                                    <FeaturesTabs features={_wwd} defTitle='What we do'/>
                                </Section>
            }
           }

           if(faqs?.length > 0){
                    let trimFaqs = faqs?.slice(0,3);
                faqsView = <Section dark={false} exClass='bg-fixed pt-3 pb-0' /* bgUrl={`${resizedImage(randomEither(gallery), 'medium_large')}`} */>
                    {/* <div className='overlay-bg position-relative z-0'/> */}
                        <HeadingSeparatorDot exClass='ms-4' align='left' title={'FAQs'} subtitle={'Frequently asked'}/>
                <div className="card card-style partial_border top_left shadow mt-4 mb- position-relative z-1">
                        <div className="content px-3 py-2">
                            
                            {trimFaqs?.length > 0 && <FAQs exClass='transparent highlighty' faqs={trimFaqs} postID={id}/>}
                            <button onClick={() => setActiveKey('faqs')} className="shadow-lg-m rounded-l color-white bg-secondary mb-0 btn btn-xxs mb-3 font-900 shadow-lg">
                                Get More Answers
                            </button>
                        </div>
                    </div>
                    </Section>
                }

          reviewsView = <>
            <Section dark fullWidth sideImg exClass='py-0 bg-fixed right_img' id='reviews' bgUrl={`${resizedImage(randomEither(gallery), 'medium_large')}`}>
                <div className='pt-0 pt-sm-5'>
              <Client>
                    <HeadingSeparatorDot exClass='me-5 mb-3' light align='right' title={'User Reviews'} subtitle={`Verified reviews about this ${type}`}/>
                    <PostReviews google sliderOptions={{padding: {left: '20px'}}} light={false} headerLess={true} cardType={2} transparentCards={true} preview={true} fromActive author_id={author_id} withButton setActiveKey={setActiveKey}  id={id}  limit={3} carousel /* bgImage={processImg(gallery)} *//></Client>
                    </div>
              </Section>
              </>

              if(google_reviews){
                if(isJsonString(google_reviews)){
                let g_revs = JSON.parse(google_reviews);
                if(g_revs?.length > 0){
                    googleReviewsView = <>
                    <Section fullWidth sideImg exClass='py-0 bg-fixed right_img' id='reviews' bgUrl={`${resizedImage(randomEither(gallery), 'medium_large')}`}>
                        <div className='pt-0 pt-sm-5'>
                    <Client>
                            <HeadingSeparatorDot exClass='me-5 mb-3' align='right' title={'Google Reviews'} /* subtitle={`User reviews from google`} *//>
                            <GoogleReviews reviewsList={g_revs} listing={listing} sliderOptions={{padding: {left: '20px'}}} light={true} headerLess={true} cardType={2} transparentCards={true} preview={true} fromActive author_id={author_id} withButton setActiveKey={setActiveKey}  id={id}  limit={3} carousel /* bgImage={processImg(gallery)} *//></Client>
                            </div>
                    </Section>
                    </>
                }
            }
        }
              
    }

  return (<>
    <>
        {/* <link href="/archi/css/bootstrap.min.css" rel="stylesheet" type="text/css" id="bootstrap" /> */}
        <link href="/archi/css/plugins.css" rel="stylesheet" type="text/css"/>
        <link href="/archi/css/style.css" rel="stylesheet" type="text/css"/>
        <link href="/archi/css/color.css" rel="stylesheet" type="text/css"/>

        <link rel="stylesheet" href="/archi/css/bg.css" type="text/css"/>
        <link rel="stylesheet" href="/archi/css/colors/yellow.css" type="text/css" id="colors"/>
        <link rel="stylesheet" href="/archi/rs-plugin/css/settings.css" type="text/css"/>
        <link rel="stylesheet" href="/archi/css/rev-settings.css" type="text/css"/>
    </>
    <div className="page_wrapper archi">
<main id="homepage">
    <div id="wrapper" className="">
        {/* <ArchiHeader/> */}
        {/*<!-- content begin -->*/}
        <div id="content" className="bg-transparent no-bottom no-top">
           {/*  <ParallaxSection faintBg={true} exClass='themedOverlay' bg={cover} underLay={true} overLay={false}>
               <HeroDetail listing={listing} exClass='pb-5'/>
            </ParallaxSection> */}
            <section className="d-none d-lg-block bg-transparent hide_if_empty shadow-0 rounded-0 py-0 px-0 overflow-visible">
                <MegaGalleryMini imgShadows columnsObj={{0: 3, 1024: 4}} gutter={10} exClass='minw-100' listing={listing} setActiveKey={setActiveKey}/>
            </section>
            {detailView}
            <Section fullWidth overlay={false}  dark={false} exClass='p-0 bg-transparent'>
              <ListingInfoCard styleObj={{width: '100%'}} listing={listing} exClass={'border-0 mx-auto'}/>
            </Section>
            
            {/* {servs2} */}
            {shopView}
            {servicesView}
            {ticketsHint}
            {reviewsView}
            {socialsView}
            {/* <WpComments
          maxDepth={1}
          postID={listing.id}
          hostUrl={WPDomain}
          allowComments={user ? true : false}
          //user = {userObj}
        /> */}
            {faqsView}
            {tagsView}
            {googleReviewsView}
            {galleryView}
        {/* <footer>
            <div className="container">
                <div className="row">
                    <div className="col-lg-3">
                        <img src="/archi/images/logo.png" className="logo-small" alt=""/><br/>We are passionate about transforming spaces into stunning, functional, and personalized environments. With years of experience in the industry, we specialize in creating exceptional interior designs that reflect our clients unique style and meet their specific needs.
                    </div>

                    <div className="col-lg-3">
                        <div className="widget widget_recent_post">
                            <h3>Latest News</h3>
                            <ul>
                                <li><a href="/archi/">The Essentials Interior Design Tips</a></li>
                                <li><a href="#">Functional Wall-to-Wall Shelves</a></li>
                                <li><a href="#">9 Unique Ways to Display Your TV</a></li>
                                <li><a href="#">The 5 Secrets to Minimal Design</a></li>
                                <li><a href="#">Make a Huge Impact With Multiples</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="col-lg-3">
                        <h3>Contact Us</h3>
                        <div className="widget widget-address">
                            <address>
                                <span>100 S Main St, Los Angeles, CA</span>
                                <span><strong>Phone:</strong>(208) 333 9296</span>
                                <span><strong>Fax:</strong>(208) 333 9298</span>
                                <span><strong>Email:</strong><a href="/archi/mailto:contact@archi-interior.com">contact@archi-interior.com</a></span>
                                <span><strong>Web:</strong><a href="#">http://archi-interior.com</a></span>
                            </address>
                        </div>
                    </div>

                    <div className="col-lg-3">
                        <div className="widget widget_recent_post">
                            <h3>Our Services</h3>
                            <ul>
                                <li><a href="#">Interior Design</a></li>
                                <li><a href="#">Architecture</a></li>
                                <li><a href="#">Industry</a></li>
                                <li><a href="#">Consulting</a></li>
                                <li><a href="#">Photography</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className="subfooter">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            &copy; Copyright 2024 - Archi Interior Design Template by <span className="id-color">Designesia</span>
                        </div>
                        <div className="col-md-6 text-right">
                            <div className="social-icons">
                                <a href="#"><i className="fa-brands fa-facebook-f"></i></a>
                                <a href="#"><i className="fa-brands fa-x-twitter"></i></a>
                                <a href="#"><i className="fa-brands fa-instagram"></i></a>
                                <a href="#"><i className="fa-brands fa-youtube"></i></a>
                                <a href="#"><i className="fa-brands fa-skype"></i></a>
                                <a href="#"><i className="fa-brands fa-dribbble"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <a href="#" id="back-to-top"></a>
        </footer> */}
        {/*<!-- footer close -->*/}
        </div>
    </div>
</main>
</div>
</>
  )
}
export default Archi;