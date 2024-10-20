/* import { Client } from "react-hydration-provider";
import { randomEither, resizedImage,  shuffleArray, srcWithFallback } from '@/helpers/universal';
import ListingInfoCard from "@/components/listing/landingPages/hero/partials/ListingInfoCard";
import ListingDetail from "../../profileInfo/ListingDetail";
import PostReviews from './../../reviews/postReviews';
import FeaturesTabs from "@/components/UI/features/FeaturesTabs";
import Section from "@/components/UI/sections/Section";
import {DualColorHeader, SocialLinks } from '@/components/UI/Partials';
import TagsCloud from '@/components/listing/partials/TagsCloud';
import FAQs from "@/components/UI/FAQs";
import { GalleryPlate, HorizontalGrid } from "@/components/UI/Galleries/MegaGallery";
import { Heading1, HeadingSeparatorDot } from "@/components/UI/partials/headings/Heading1";
import MegaGalleryMini from "@/components/UI/Galleries/MegaGalleryMini";
import  ListingProductsSimple  from '@/components/listing/shop/ListingProductsSimple';
import { PriceView } from "@/components/UI/PriceView";
import FeaturesCarousel from "@/components/UI/features/FeaturesCarousel";
import { useRouter } from "next/navigation";
 */


function Claiming({listing, setActiveKey, colorHex, color}){

  return (<>
    <>
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
        <div id="content" className="bg-transparent no-bottom no-top">
        {/* section service begin */}
            <section id="section-side-3" className="side-bg no-padding mt70 sm-mt0 text-light" data-bgcolor="#27374c">
                <div className="image-container col-md-6 offset-md-6 pull-right" data-delay="0">
                    <div className="background-image" style={{background: 'url(/archi/images/background/bg-side-11.jpg)'}} ></div>
                </div>

                <div className="container">
                    <div className="row">
                        <div className="inner-padding">
                            <div className="col-md-5  fadeInLeft" data--delay=".5s">
                                <h2>Interior Design Experts<span className="id-color">.</span></h2>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                                    ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                                    ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
                                    in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                                    cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
                                    laudantium.</p>
                                <div className="spacer-single"></div>
                                <a href="service-1.html" className="btn-line">Read More</a>
                            </div>
                            <div className="clearfix"></div>
                        </div>
                    </div>
                </div>
            </section>
            {/* section service close */}

            {/* section begin */}
            <section id="section-features">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4  fadeInUp" data--delay=".2s">
                            <h3>Interior Expertise</h3>
                            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque
                            ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                        </div>

                        <div className="col-md-4  fadeInUp" data--delay=".4s">
                            <h3>Awards Winning</h3>
                            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque
                            ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                        </div>

                        <div className="col-md-4  fadeInUp" data--delay=".4s">
                            <h3>Free Consultation</h3>
                            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque
                            ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                        </div>

                    </div>
                </div>
            </section>
            {/* section close */}

            {/* section service begin */}
            <section id="section-side-4" className="side-bg no-padding" data-bgcolor="#f2f2f2">
                <div className="image-container col-md-6 pull-left" data-delay="0">
                    <div className="background-image" style={{background: 'url(/archi/images/background/bg-side-12.jpg)'}} data-bgimage="url(/archi/images/background/bg-side-12.jpg)"></div>
                </div>

                <div className="container">
                    <div className="row">
                        <div className="inner-padding">
                            <div className="col-md-5 offset-md-7  fadeInRight" data--delay=".5s">
                                <h2>Stand Out Design<span className="id-color">.</span></h2>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                                    ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                                    ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
                                    in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                                    cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
                                    laudantium.</p>
                                <div className="spacer-single"></div>
                                <a href="service-1.html" className="btn-line black">Read More</a>
                            </div>
                            <div className="clearfix"></div>
                        </div>
                    </div>
                </div>
            </section>
            {/* section service close */}

            {/* section begin */}
            <section id="section-fun-facts" className="text-light" data-bgcolor="#33353a">
                <div className="container">

                    <div className="row align-items-center">
                        <div className="col-md-3 fadeIn" data--delay="0">
                            <h2>Fun Facts</h2>
                        </div>
                                <div className="col-md-3  fadeIn" data--delay=".25s">
                                    <div className="de_count no-padding">
                                        <h3 className="timer" data-to="2350" data-speed="2500">0</h3>
                                        <span className="text-light">Hours of Works</span>
                                    </div>
                                </div>

                                <div className="col-md-3  fadeIn" data--delay=".5s">
                                    <div className="de_count no-padding">
                                        <h3 className="timer" data-to="128" data-speed="2500">0</h3>
                                        <span className="text-light">Projects Complete</span>
                                    </div>
                                </div>

                                <div className="col-md-3  fadeIn" data--delay=".75s">
                                    <div className="de_count no-padding">
                                        <h3 className="timer" data-to="750" data-speed="2500">0</h3>
                                        <span className="text-light">Slice of Pizza</span>
                                    </div>
                                </div>
                           
                    </div>

                </div>
            </section>
            {/* section close */}

            {/* section begin */}
            <section id="section-portfolio" aria-label="section-portfolio" className="no-top no-bottom">
                <div className="grid" data-col="4" data-gridspace="0" data-ratio="466/700">
                    <div className="grid-sizer"></div>
                    <div className="grid-item residential">
                        {/* gallery item */}
                        <div className="item">
                            <div className="picframe">
                                <a className="simple-ajax-popup-align-top" href="project-details-1.html">
                                    <span className="overlay">
                                        <span className="pf_title">
                                            <span className="project-name">Eco Green Interior</span>
                                        </span>
                                    </span>
                                </a>
                                <img src="/archi/images/portfolio-new/pf%20(1).jpg" alt="" />
                            </div>
                        </div>
                        {/* close gallery item */}
                    </div>
                    <div className="grid-item large-width hospitaly">
                        {/* gallery item */}
                        <div className="item">
                            <div className="picframe">
                                <a className="simple-ajax-popup-align-top" href="project-details-2.html">
                                    <span className="overlay">
                                        <span className="pf_title">
                                            <span className="project-name">Modern Elegance Suite</span>
                                        </span>
                                    </span>
                                </a>

                                <img src="/archi/images/portfolio-new/pf%20(2).jpg" alt="" />
                            </div>
                        </div>
                        {/* close gallery item */}
                    </div>
                    <div className="grid-item large-height hospitaly">
                        {/* gallery item */}
                        <div className="item">
                            <div className="picframe">
                                <a className="simple-ajax-popup-align-top" href="project-details-3.html">
                                    <span className="overlay">
                                        <span className="pf_title">
                                            <span className="project-name">Apartment Renovation</span>
                                        </span>
                                    </span>
                                </a>

                                <img src="/archi/images/portfolio-new/pf%20(3).jpg" alt="" />
                            </div>
                        </div>
                        {/* close gallery item */}
                    </div>
                    <div className="grid-item residential">
                        {/* gallery item */}
                        <div className="item">
                            <div className="picframe">
                                <a className="simple-ajax-popup-align-top" href="project-details-youtube.html">
                                    <span className="overlay">
                                        <span className="pf_title">
                                            <span className="project-name">Youtube Video</span>
                                        </span>
                                    </span>
                                </a>
                                <img src="/archi/images/portfolio-new/pf%20(4).jpg" alt="" />
                            </div>
                        </div>
                        {/* close gallery item */}
                    </div>
                    <div className="grid-item large-height office">
                        {/* gallery item */}
                        <div className="item">
                            <div className="picframe">
                                <a className="simple-ajax-popup-align-top" href="project-details-vimeo.html">
                                    <span className="overlay">
                                        <span className="pf_title">
                                            <span className="project-name">Vimeo Video</span>
                                        </span>
                                    </span>
                                </a>
                                <img src="/archi/images/portfolio-new/pf%20(5).jpg" alt="" />
                            </div>
                        </div>
                        {/* close gallery item */}
                    </div>
                    <div className="grid-item commercial">
                        {/* gallery item */}
                        <div className="item">
                            <div className="picframe">
                                <a className="simple-ajax-popup-align-top" href="project-details.html">
                                    <span className="overlay">
                                        <span className="pf_title">
                                            <span className="project-name">Restaurant In Texas</span>
                                        </span>
                                    </span>
                                </a>
                                <img src="/archi/images/portfolio-new/pf%20(6).jpg" alt="" />
                            </div>
                        </div>
                        {/* close gallery item */}
                    </div>

                    <div className="grid-item large-width office">
                        {/* gallery item */}
                        <div className="item office">
                            <div className="picframe">
                                <a className="simple-ajax-popup-align-top" href="project-details.html">
                                    <span className="overlay">
                                        <span className="pf_title">
                                            <span className="project-name">Office On Space</span>
                                        </span>
                                    </span>
                                </a>

                                <img src="/archi/images/portfolio-new/pf%20(8).jpg" alt="" />
                            </div>
                        </div>
                        {/* close gallery item */}
                    </div>

                    <div className="grid-item residential">
                        {/* gallery item */}
                        <div className="item residential">
                            <div className="picframe">
                                <a className="simple-ajax-popup-align-top">
                                    <span className="overlay">
                                        <span className="pf_title">
                                            <span className="project-name">Summer House</span>
                                        </span>
                                    </span>
                                </a>

                                <img src="/archi/images/portfolio-new/pf%20(7).jpg" alt="" />
                            </div>
                        </div>
                        {/* close gallery item */}
                    </div>


                </div>
            </section>
            {/* section close */}

            {/* section begin */}
            <section id="section-text">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4  fadeInUp" data--delay=".2s">
                            <h3>Guaranteed Works</h3>
                            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque
                            ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                        </div>

                        <div className="col-md-4  fadeInUp" data--delay=".4s">
                            <h3>Detailed Price</h3>
                            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque
                            ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                        </div>

                        <div className="col-md-4  fadeInUp" data--delay=".4s">
                            <h3>24 / 7 Support</h3>
                            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque
                            ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                        </div>

                    </div>
                </div>
            </section>
            {/* section close */}

            {/* section begin */}
            <section id="view-all-projects" className="call-to-action text-light padding40" data-bgcolor="#27374c" aria-label="cta">
                <div className="container">
                    <div className="row">
                        <div className="col-md-9">
                            <h2 className="mt20">Get free consultation.</h2>
                        </div>

                        <div className="col-md-3">
                            <a href="contact.html" className="btn-line  fadeInUp">Request Now</a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
</main>
</div>
</>
  )
}
export default Claiming;