//import ArchiHeader from "./parts/ArchiHeader";
import Head from "next/head"
import { Client } from "react-hydration-provider";
import { useEffect, Suspense } from "react";
import ParallaxSection from "@/components/UI/sections/ParallaxSection";
import { randomEither, resizedImage, cleanHtml, shuffleArray, srcWithFallback } from '@/helpers/universal';
import ListingInfoCard from "@/components/listing/landingPages/hero/partials/ListingInfoCard";
import ListingDetail from "../../profileInfo/ListingDetail";
import PostReviews from './../../reviews/postReviews';
import DualColorTitle from "@/components/UI/partials/headings/DualColorTitle";
import Features from "@/components/UI/features/Features";
import FeaturesTabs from "@/components/UI/features/FeaturesTabs";
import Section from "@/components/UI/sections/Section";
import {DualColorHeader, SocialLinks } from '@/components/UI/Partials';
import TagsCloud from '@/components/listing/partials/TagsCloud';
import FAQs from "@/components/UI/FAQs";
import { GalleryPlate, HorizontalGrid } from "@/components/UI/Galleries/MegaGallery";
import { siteColors, siteSettings } from "@/helpers/base";
import { ParallaxBanner } from "react-scroll-parallax";
import ParallaxChildSection from "@/components/UI/sections/ParallaxChildSection";
import { Heading1, HeadingSeparatorDot } from "@/components/UI/partials/headings/Heading1";
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';



function Archi({listing, setActiveKey, colorHex}){
    const {meta, title, cover, content, about_us,id, author_id, type, dir_tags} = listing ?? {};
    const {_wcu, _event_program, _stats, _links, "_event-sponsors": sponsors, "_special-guests": special_guests, _job_gallery:gallery, _performers, _wwd} = meta ?? {};
    const {faqs} = about_us ?? {};
    let wcu = _wcu[0] ?? null

    let detailView, reviewsView, servicesView, galleryView, servs2, tagsView, faqsView, socialsView, horizontalGallery, horizontalGallery2;
    if(listing){
        if(_links?.length > 0){
            socialsView = <Section dark={false} bgUrl={`${randomEither(gallery)}`} exClass='py-1 bg-fixed'>
            <div className='p-5'>
            {/* <div className='card card-style partial_border double_left bottom_left my-5 p-5'> */}
                <Heading1 exClass='mb-5' title={'Our Social Profiles'} subtitle="Connect & Engage"/>
                <SocialLinks iconsOnly={false} exClass='_large flex-wrap' links={_links}/></div>
            {/* </div> */}
        </Section>
            
           
          }
        if(content){
            detailView = <Section dark={false} bgUrl={`${randomEither(gallery)}`} exClass='py-3 bg-fixed'>
                <div className='p-2 p-sm-5'>
                    <ListingDetail textExClass='' type={type}  detail={content} id={listing.id}/>
                </div>
            </Section>
          }
          if(dir_tags?.length > 0){
            let tagClick = (tag) => {
                router.push({
                    pathname: '/explore/events',
                    query: { tags: tag.slug },
                  })
            }
            tagsView = <Section exClass='py-4 bg-fixed' title='Our Tags' descript={''} id="tags" bgUrl={srcWithFallback(randomEither(gallery))}>
                <div data-aos="zoom-in">
                <div className='tags_row card card-style across_border partial_border mb-50'>
                <div className='row_content'>
                    <TagsCloud live hue={colorHex} dark={false} ids={dir_tags} /* hue={color} */ onClickFunc={tagClick}/>
                    <DualColorHeader exClass='vertical_text lg_text' title={'# Tagged In'} />
                 </div>
                 </div></div>
                 </Section>
        }
        if(gallery?.length > 0){
            let megaGall = shuffleArray([...gallery]);
            if(megaGall?.length > 0){
                let grid1Arr = megaGall.slice(0,4);
                let grid2Arr = megaGall.slice(4, 7);

                horizontalGallery = <HorizontalGrid gutter={0}>
                {grid1Arr.map((item, index) => {
                  if (typeof item == 'string') {
                    if(item?.length > 0){
                      if(item?.includes(siteSettings.wpDomain) || item?.includes(siteSettings.cdnDomain)){
                        return  <GalleryPlate imgSize='medium_large' item={item} key={index}/>;
                      }
                    }
                  }else{
                    if(item?.url?.includes(siteSettings.wpDomain)){
                        return  <GalleryPlate imgSize='medium_large' item={item} key={index}/>;
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
                          if(item?.includes(siteSettings.wpDomain) || item?.includes(siteSettings.cdnDomain)){
                            return  <GalleryPlate imgSize='medium_large' item={item} key={index}/>;
                          }
                        }
                      }else{
                        if(item?.url?.includes(siteSettings.wpDomain)){
                            return  <GalleryPlate imgSize='medium_large' item={item} key={index}/>;
                          }else{
                            return <>{item}</>
                          }
                      }
                    }
                    )}
                    </HorizontalGrid>; 
                }
            }

            galleryView = <><section id="section-portfolio" className="no-top no-bottom w-100" aria-label="section-portfolio">
                            <Section  id="gallery" exClass={'p-0 bg-color'}   className="row g-0" data-aos='fade-up' data-aos-delay=".3s">
                                <div className='overlay-bg z-2 opacity-70'>
                                    <button onClick={() => setActiveKey('gallery')} className='btn border-0 btn-dark handy bg-transparent text-30 rounded-0 p-2 px-4'>Our Gallery</button>
                                </div>
                            <ParallaxChildSection  translateY={[0, 0]} speed={15} expanded={true} translateX= {[10, 0]}>
                                <div style={{minWidth: '110%'}}>{horizontalGallery}</div>
                            </ParallaxChildSection>
                            <ParallaxChildSection  translateY={[0, 0]} speed={-5} expanded={true} translateX= {[-10, 0]}>
                                <div style={{minWidth: '110%'}}>{horizontalGallery2}</div>
                            </ParallaxChildSection>
                            </Section> 
                        </section>
                        
                        <section id="view-all-projects" className="call-to-action bg-color text-center" data-speed="5" data-type="background" aria-label="view-all-projects">
                            <div className="overlay-bg"/>
                            <button onClick={() => setActiveKey('gallery')} className="btn btn-line py-3 btn-big">See Full Gallery</button>
                        </section></>
        }
          if(_wwd?.length > 0){
            if(_wwd[0].list?.length > 0){

                        servicesView = <section id="section-about"><Features features={_wwd} defTitle='What we do'/></section>

                        servs2 = <Section id="section-steps" exClass="jarallax text-light bg-fixed" bgUrl={randomEither(gallery)}>
                                    <FeaturesTabs features={_wwd} defTitle='What we do'/>
                                </Section>
            }
           }

           if(faqs?.length > 0){
                    let trimFaqs = faqs?.slice(0,3);
                faqsView = <Section dark={false} exClass='bg-fixed py-5' bgUrl={`${randomEither(gallery)}`}>
                    {/* <div className='overlay-bg position-relative z-0'/> */}
                        <HeadingSeparatorDot align='right' title={'FAQs'} subtitle={'Frequently asked'}/>
                <div className="card card-style partial_border across_border shadow mt-4 mb- position-relative z-1" data-aos="zoom-in">
                        <div className="content px-3 py-2">
                            
                            {trimFaqs?.length > 0 && <FAQs exClass='transparent highlighty' faqs={trimFaqs} postID={id}/>}
                            <button onClick={() => setActiveKey('faqs')} className="shadow-lg-m rounded-l color-white bg-secondary mb-0 btn btn-xxs mb-3 font-900 shadow-lg">
                                Get More Answers
                            </button>
                        </div>
                    </div>
                    </Section>
                }

          reviewsView = <Suspense offset={150} once height={200} data-aos="zoom-in">
            <Section  exClass='py-5 bg-fixed' id='reviews' title='User Reviews' bgUrl={`${srcWithFallback(randomEither(gallery))}`}>
                <div>
              <Client>
                    <PostReviews sliderOptions={{padding: {left: '20px'}}} light={false} headerLess={true} cardType={2} transparentCards={true} preview fromActive author_id={author_id} withButton setActiveKey={setActiveKey}  id={id}  limit={3} carousel /* bgImage={processImg(gallery)} *//></Client></div>
              </Section>
              </Suspense>
              
    }

  return (<>
    <Head>
        <link href="/archi/css/bootstrap.min.css" rel="stylesheet" type="text/css" id="bootstrap" />
        <link href="/archi/css/plugins.css" rel="stylesheet" type="text/css"/>
        <link href="/archi/css/style.css" rel="stylesheet" type="text/css"/>
        <link href="/archi/css/color.css" rel="stylesheet" type="text/css"/>

        <link rel="stylesheet" href="/archi/css/bg.css" type="text/css"/>
        <link rel="stylesheet" href="/archi/css/colors/yellow.css" type="text/css" id="colors"/>
        <link rel="stylesheet" href="/archi/rs-plugin/css/settings.css" type="text/css"/>
        <link rel="stylesheet" href="/archi/css/rev-settings.css" type="text/css"/>
    </Head>
    <div className="page_wrapper archi">
<main id="homepage">
    <div id="wrapper" className="">
        {/* <ArchiHeader/> */}
        {/*<!-- content begin -->*/}
        <div id="content" className="no-bottom no-top">
           {/*  <ParallaxSection faintBg={true} exClass='themedOverlay' bg={cover} underLay={true} overLay={false}>
               <HeroDetail listing={listing} exClass='pb-5'/>
            </ParallaxSection> */}
            <Section exClass='p-0'>
              <ListingInfoCard styleObj={{width: '100%'}} listing={listing} exClass={'border-0 mx-auto'}/>
            </Section>
            {/* <ResponsiveMasonry className='hero_grid' columnsCountBreakPoints={{0: 1, 575: 2}}>
            <Masonry className='grid_box' gutter='10px'> */}
            {detailView}
            {servs2}
            {servicesView}
            {galleryView}
            {socialsView}
            {reviewsView}
            {faqsView}
            {tagsView}
            {/* </Masonry>
            </ResponsiveMasonry> */}
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
<style>{``}
</style>
</>
  )
}
export default Archi;