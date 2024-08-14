import { cleanHtml, shuffleArray, srcWithFallback, randomEither, resizedImage } from "@/helpers/universal";
import Head from "next/head"
import Script from "next/script";
import DateView from '@/components/UI/partials/dateViews/DateView';
import CountDownUI from '@/components/UI/CountDownUI';
import { spliderVariableWidth } from "@/helpers/sliders";
import Splider from "@/components/UI/partials/Splider";
import TagsCloud from "../../partials/TagsCloud";
import { DualColorHeader } from "@/components/UI/Partials";
import { Suspense } from "react";
import { BookingView } from "@/pages/events/[slug]";
import FAQs from "@/components/UI/FAQs";

function Rockfest({listing, setActiveKey}) {
    const {title, cover, gallery:l_gal, item_min_price_html, short_desc, meta, venue, id, dir_tags} = listing ?? {};
    const {_job_location, listing_gallery, _wwd_services, _wwd_intro_detail, _wwd_intro_title, _welcome_message, _wcu, "_frequently-asked-questions":faqs} = meta ?? {}
    let sponsors = meta['_event-sponsors'], wcu = _wcu[0] ?? null;
    const gallery = l_gal?.length > 0 ? [...l_gal] : [...listing_gallery]
    let sponsorsView, tagsView, strengthsView, faqsView;

    if(listing){
        if(dir_tags?.length > 0){
            const customRenderer = (tag, size, color) => {
                const styles = {
                  margin: '0px 5px 10px',
                  verticalAlign: 'middle',
                  display: 'inline-block',
                }
            
                const { className, style, ...props } = tag.props || {}
                const fontSize = size + 'px'
                const key = tag.key || tag.value
                const tagStyle = { ...styles, color, fontSize, ...style }
              
                let tagClassName = 'tag-cloud-tag'
                if (className) {
                  tagClassName += ' ' + className
                }
              
                return (
                  <span className={tagClassName} style={tagStyle} key={key} {...props}>
                    <span className="bg_filler z1"/><span className="_hash color-gray-dark z-2 position-relative">#</span><span className="z-2 position-relative">{tag.value}</span>
                  </span>
                )
              }

            let tagClick = (tag) => {
                router.push({
                    pathname: '/explore/events',
                    query: { tags: tag.slug },
                  })
            }
            tagsView = <div data-aos="zoom-in">
                <div className='tags_row py-5'>
                <div className='row_content'>
                    <TagsCloud renderer={customRenderer} minSize={25} maxSize={48} live dark ids={dir_tags} /* hue={color} */ onClickFunc={tagClick}/>
                    <DualColorHeader exClass='vertical_text lg_text' title={'# Tagged In'} />
                 </div>
                 </div></div>
        }

        if(faqs?.length > 0){
            let trimFaqs = faqs?.slice(0,3);
        faqsView = <div className="card card-style partial_border across_border shadow mt-4 mb-4" data-aos="zoom-in">
                <div className="content px-3 py-2">
                   
                    {trimFaqs?.length > 0 && <FAQs faqs={trimFaqs} postID={id}/>}
                    <button onClick={() => setActiveKey('faqs')} className="shadow-lg-m rounded-l color-white bg-secondary mb-0 btn btn-xxs mb-3 font-900 shadow-lg">
                        Get More Answers
                    </button>
                </div>
            </div>
        }

        if(wcu?.list?.length > 0){ 
            const {descript, sub_title,title} = wcu;

            strengthsView =   <Suspense offset={150} once height={200}>
                            <div className="listing_services padded_container">                                           
                                <div className="services_intro padded_container text-center mx-auto w-75 mb-70">
                                    <h2 className="section_head dark_text">{title}</h2>
                                    <h3 className="section_subHead gray_text">{descript}</h3>
                                </div>
                                <div className="services_body mx-auto">
                                    {wcu?.list.map((item, index) => {
                                        let {item_description, item_title, mylisting_accordion_photo} = item; 
                                    return <div className="service_item" key={index} data-aos="zoom-in">
                                        <div className="serv_number"><span>{`0${index + 1}`}</span></div>
                                        {mylisting_accordion_photo &&  
                                            <div className="serv_image" >
                                                <div className="image_bg shadow-card shadow-card-l" style={{  backgroundImage: `url("${resizedImage(mylisting_accordion_photo, 'medium_large')}")`  }}></div>
                                            </div>
                                        }
                                        <div className="serv_content">
                                            <h4 className="serv_heading text-30 lh-1"   dangerouslySetInnerHTML={{   __html: item_title}} />
                                            <hr className='border-loud opacity-100 w-48 my-2' style={{borderTopWidth: '3px'}}/>
                                            <p className="serv_descript opacity-70"   dangerouslySetInnerHTML={{   __html: item_description}} />
                                        </div>
                                    </div>
                                    }
                                    )
                                    }
                                </div>
                                <>{ <BookingView setActiveKey={setActiveKey} text='Grab your slot' exClass='color-theme px-4 py-2 rounded-5 '/>}</>
                            </div>
                            </Suspense>
        }
    }
  return (
    <>
    <Head>
        <link href="/rockfest/css/animate.css" rel="stylesheet" type="text/css" />
        <link href="/rockfest/css/magnific-popup.css" rel="stylesheet" type="text/css"/>
        <link href="/rockfest/css/style.css" rel="stylesheet" type="text/css" />
        <link id="colors" href="/rockfest/css/colors/scheme-01.css" rel="stylesheet" type="text/css" />
        <link href="/rockfest/css/coloring.css" rel="stylesheet" type="text/css" />
    </Head>
    <div className="page_wrapper rockfest">
<section id='page_body' className="dark-scheme">
    <div id="wrapper">
        {/* <div id="preloader">
            <div className="preloader1"></div>
        </div> */}
        {/* header begin */}
       {/* <header className="transparent">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="de-flex sm-pt10">
                            <div className="de-flex-col">
                                <div className="de-flex-col">
                                    <div id="logo">
                                        <a href="index.html">
                                            <img alt="" src="/rockfest/images/logo.png" />
                                        </a>
                                    </div>
                                </div>
                                <div className="de-flex-col">
                                </div>
                            </div>
                            <div className="de-flex-col header-col-mid">
                                <ul id="mainmenu">
                                    <li><a href="#de-carousel">Home</a></li>                                   
                                    <li><a href="#section-artists">Artists</a></li>                  
                                    <li><a href="#section-schedule">Schedule</a></li>             
                                    <li><a href="#section-tickets">Tickets</a></li>
                                    <li><a href="#section-gallery">Gallery</a></li>
                                    <li><a href="index.html">Pages</a>
                                        <ul>
                                            <li><a href="01_rockfest-blog.html">Blog</a></li>
                                            <li><a href="01_rockfest-contact.html">Contact</a></li>
                                            <li><a href="01_rockfest-gallery.html">Gallery</a></li>
                                        </ul>
                                    </li>
                                    
                                </ul>
                            </div>
                            <div className="de-flex-col">
                                <div className="menu_side_area">
                                    <a href="#section-tickets" className="btn-main"><i className="fa fa-sign-in"></i><span>Buy Ticket</span></a>
                                    <span id="menu-btn"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header> */}
        {/* header close */}
        {/* content begin */}
        <div className="no-bottom no-top" id="content">
            <div id="top"></div>
            <section id="section-hero" className="no-top no-bottom shadow-2-strong">
                    <div className="hero h-screen bg-cover" style={{background: `url(${srcWithFallback(cover)})`}}>
                        <div className="mask h-100">
                            <div className="d-flex justify-content-center align-items-end pb-5 h-100">
                                <div className="container text-white text-center">
                                    <div className="row">
                                        <div className="col-md-6 offset-md-3">
                                            <h1 className="mb-3 hero_title truncate-4" data-aos='fade-down'>{cleanHtml(title?.rendered)}</h1>
                                            <p className="lead fadeInUp" data-aos='fade-up' data-aos-delay=".3s">{cleanHtml(short_desc)}</p>
                                            <div className="spacer-10"></div>
                                            <a href="#section-artists" className="btn-main wow fadeInUp" data-wow-delay=".6s">Explore</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            </section>
            {/* <section id="de-carousel" className="no-top no-bottom carousel slide carousel-fade shadow-2-strong" data-mdb-ride="carousel">
        
                <ol className="carousel-indicators">
                    <li data-mdb-target="#de-carousel" data-mdb-slide-to="0" className="active"></li>
                    <li data-mdb-target="#de-carousel" data-mdb-slide-to="1"></li>
                    <li data-mdb-target="#de-carousel" data-mdb-slide-to="2"></li>
                </ol>

                <div className="carousel-inner">
                
                    <div className="carousel-item active" data-bgimage={`url(${srcWithFallback(cover)})`}>
                        <div className="mask">
                            <div className="d-flex justify-content-center align-items-center h-100">
                                <div className="container text-white text-center">
                                    <div className="row">
                                        <div className="col-md-6 offset-md-3">
                                            <h1 className="mb-3" data-aos='fade-down'>{cleanHtml(title?.rendered)}</h1>
                                            <p className="lead fadeInUp" data-aos='fade-up' data-aos-delay=".3s">{cleanHtml(short_desc)}</p>
                                            <div className="spacer-10"></div>
                                            <a href="#section-artists" className="btn-main wow fadeInUp" data-wow-delay=".6s">Explore</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/
                    <div className="carousel-item" data-bgimage="url(/rockfest/images/slider/2.jpg)">
                        <div className="mask">
                            <div className="d-flex justify-content-center align-items-center h-100 wow f">
                                <div className="container text-white text-center">
                                    <div className="row">
                                        <div className="col-md-6 offset-md-3">
                                            <h1 className="mb-3 wow fadeInUp">Be a part of musical history</h1>
                                            <p className="lead wow fadeInUp" data-wow-delay=".3s">The biggest music event in decades. Attended by more than 100 musicians from all over the world. Get your ticket now!</p>
                                            <div className="spacer-10"></div>
                                            <a href="#section-artists" className="btn-main wow fadeInUp" data-wow-delay=".6s">Explore</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            
                <a className="carousel-control-prev" href="#de-carousel" role="button" data-mdb-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#de-carousel" role="button" data-mdb-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </a>
            </section> */}
            {/* Carousel wrapper */}
            <section id="section-date">
                <div className="container">
                    <div className="row g-custom-x align-items-center">
                        <div className="col-lg-12">
                            <div className="text-center">
                                {/* <h2 className="" data-aos='fade-in' data-wow-delay="0s">March 23-28</h2> */}
                                <DateView fromActive={true} eventId={id} styleObj={{letterSpacing: '10px'}} exClass={'text-50 font-title fw-bold'} stringy format={'MMMM DD'}/>
                                <h3 className="wow fadeInUp" data-wow-delay=".2s"/><span className="id-color">{_job_location}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section id="section-intro">
                <div className="container px-0">
                    <div className="row g-custom-x align-items-center mb-5">
                        <div className="col-lg-12">
                            <div className="text-center">
                                <div className="wm text-nowrap">{cleanHtml(title?.rendered)}</div>
                                <h2 className='lh-1'><span className="id-color">@</span> {venue}</h2>
                                <div className="small-border bg-color-2"></div>
                                <div className="spacer-single"></div>
                            </div>
                        </div>
                        {shuffleArray(gallery).splice(0,3).map((el) => {
                        return <div className="col-md-4">
                            <div className="de-image-text s2">
                                {/* <a href="#" className="d-text">
                                    <h3>Kiss</h3>
                                </a> */}
                                <img src={el} className="w-100 object-cover color" alt="" style={{height: '25vh', filter: 'grayscale(1)'}}/>
                            </div>
                        </div>}
                        )}
                    </div>
                    <div className="row">
                        <div className="col-md-10 offset-md-1 text-center">
                            <div className="spacer-single"></div>
                            <p className="list-inline-style-1 text-24 fw-300 lh-15 text-capitalize" style={{letterSpacing: '3px'}}>
                               {cleanHtml(short_desc)}
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <section id="section-tags">
                <div className="container">
                    <div className="text-center">
                        <div className="wm">Tags</div>
                        <h2 className='lh-1'><span className="id-color">Our</span> Tags</h2>
                        <div className="small-border bg-color-2"></div>
                        {tagsView}
                        <div className="spacer-single"></div>
                    </div>
                </div>
            </section>
            {wcu?.list?.length > 0 && <section id="section-wcu">
                <div className="container">
                    <div className="">
                        <div className="wm text-center">Reasons</div>
                        <h2 className='lh-1 text-center'><span className="id-color">Why</span> Attend</h2>
                        <div className="small-border bg-color-2 text-center"></div>
                        {strengthsView}
                        <div className="spacer-single"></div>
                    </div>
                </div>
            </section>}
            {/* <section id="section-artists">
                <div className="container">
                    <div className="row g-custom-x align-items-center">
                        <div className="col-lg-12">
                            <div className="text-center">
                                <div className="wm">Artists</div>
                                <h2><span className="id-color">01</span> Artists</h2>
                                <div className="small-border bg-color-2"></div>
                                <div className="spacer-single"></div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="de-image-text s2">
                                <a href="#" className="d-text">
                                    <h3>Kiss</h3>
                                </a>
                                <img src="/rockfest/images/misc/featured-1.jpg" className="img-fluid" alt=""/>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="de-image-text s2">
                                <a href="#" className="d-text">
                                    <h3>Guns n Roses</h3>
                                </a>
                                <img src="/rockfest/images/misc/featured-2.jpg" className="img-fluid" alt=""/>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="de-image-text s2">
                                <a href="#" className="d-text">
                                    <h3>Pearl Jam</h3>
                                </a>
                                <img src="/rockfest/images/misc/featured-3.jpg" className="img-fluid" alt=""/>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-10 offset-md-1 text-center">
                            <div className="spacer-single"></div>
                            <ul className="list-inline-style-1">
                                <li>Halestorm</li>
                                <li>Chevelle</li>
                                <li>Joan Jett</li>
                                <li>In This Moment</li>
                                <li>The Hives</li>
                                <li>Gojira</li>
                                <li>The Distillers</li>
                                <li>Action Bronson</li>
                                <li>The Struts</li>
                                <li>Refused</li>
                                <li>Killswitch Engage</li>
                                <li>Parkway Drive</li>
                                <li>Beartooth</li>
                                <li>Scars on Broadway</li>
                                <li>Architects</li>
                                <li>Tom Morrelo</li>
                                <li>Avatar</li>
                                <li>Bad Wolves</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section> */}
            {_wwd_services?.length > 0 && <section id="section-acivities" aria-label="section-services-tab">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="text-center">
                                <div className="wm  text-truncate lh-1 mt-n5">{_wwd_intro_title}</div>
                                <h2 className='lh-1 text-26'><span className="id-color">02</span> {_wwd_intro_title}</h2>
                                <div className="small-border bg-color"></div>
                            </div>
                        </div>
                        <div className="spacer-single"></div>
                        <div className="col-md-12 position-relative z-1">
                            <div className="de_tab tab_style_4 text-center">
                                <ul className="de_nav de_nav_dark nav nav-tabs" id='reasonTabs' role="tablist">
                                    {_wwd_services.map((el, i) => {
                                        const{ft_title, ft_description} = el;
                                        return <li style={{maxWidth: '200px'}} className={`nav-link opacity-80 ${i == 0 ? 'active' : ''}`} aria-selected={i == 0 ? true : false} data-bs-toggle="tab" data-bs-target={`#tab${i+1}`} id={`nav${i+1}-tab`}>
                                        <h3 className='lh-1'> #<span>0{i + 1}</span></h3>
                                        <h4 className='text-truncate d-block'>{ft_title}</h4>
                                        </li>
                                    })}
                                    
                                </ul>
                                <div className="tab-content" id='reasonTabsContent'>
                                    {_wwd_services.map((el, i) => {
                                        const{ft_title, ft_description, mylisting_accordion_photo} = el;
                                        return <div id={`tab${i + 1}`} className={`tab_single_content pb-0 tab-pane fade bg-cover ${i==0 ? 'show active' : ''}`} role="tabpanel" style={{background : `url(${mylisting_accordion_photo}`, height: '50vh'}}>
                                        <div className="row h-100 align-items-end position-relative px-5 pt-45">
                                            <div className={`z-2 col-md-12 mx-3 text-${randomEither(['right','left','center'])} m${randomEither(['s','e'])}-auto px-5 mb-40 w-75`}>
                                                <ul className="list-boxed-s1">
                                                    <li>
                                                        <h3 className='mb-3 lh-1'>{ft_title}</h3><span></span> 
                                                        <p className='position-relative z10 color-white'>{ft_description}</p>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className = 'bg-overlay top-0' style={{background: '#00000078'}}/>
                                        </div>
                                    </div>
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>}
            {/* <section id="section-schedule" aria-label="section-services-tab">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="text-center">
                                <div className="wm">Schedule</div>
                                <h2><span className="id-color">02</span> Schedule</h2>
                                <div className="small-border bg-color"></div>
                            </div>
                        </div>
                        <div className="spacer-single"></div>
                        <div className="col-md-12">
                            <div className="de_tab tab_style_4 text-center">
                                <ul className="de_nav de_nav_dark">
                                    <li className="active" data-link="#section-services-tab">
                                        <h3>Day <span>01</span></h3>
                                        <h4>March 20, 2022</h4>
                                    </li>
                                    <li data-link="#section-services-tab">
                                        <h3>Day <span>02</span></h3>
                                        <h4>March 21, 2022</h4>
                                    </li>
                                    <li data-link="#section-services-tab">
                                        <h3>Day <span>03</span></h3>
                                        <h4>March 22, 2022</h4>
                                    </li>
                                    <li data-link="#section-services-tab">
                                        <h3>Day <span>04</span></h3>
                                        <h4>March 23, 2022</h4>
                                    </li>
                                    <li data-link="#section-services-tab">
                                        <h3>Day <span>05</span></h3>
                                        <h4>March 24, 2022</h4>
                                    </li>
                                </ul>
                                <div className="de_tab_content text-left">
                                    <div id="tab1" className="tab_single_content" data-bgimage="url(/rockfest/images/background/t1.jpg) top">
                                        <div className="row">
                                            <div className="col-md-12 text-center">
                                                <ul className="list-boxed-s1">
                                                    <li>
                                                        <h3>Guns N Roses</h3><span></span>
                                                    </li>
                                                    <li>
                                                        <h3>The Hives</h3><span></span>
                                                    </li>
                                                    <li>
                                                        <h3>Gojira</h3><span></span>
                                                    </li>
                                                    <li>
                                                        <h3>Joan Jett</h3><span></span>
                                                    </li>
                                                    <li>
                                                        <h3>Action Bronson</h3><span></span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div id="tab2" className="tab_single_content" data-bgimage="url(/rockfest/images/background/t2.jpg) top">
                                        <div className="row">
                                            <div className="col-md-12 text-center">
                                                <ul className="list-boxed-s1">
                                                    <li>
                                                        <h3>Kiss</h3><span></span>
                                                    </li>
                                                    <li>
                                                        <h3>The Distillers</h3><span></span>
                                                    </li>
                                                    <li>
                                                        <h3>Halestorm</h3><span></span>
                                                    </li>
                                                    <li>
                                                        <h3>Chevelle</h3><span></span>
                                                    </li>
                                                    <li>
                                                        <h3>In This Moment</h3><span></span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div id="tab3" className="tab_single_content" data-bgimage="url(/rockfest/images/background/t3.jpg) top">
                                        <div className="row">
                                            <div className="col-md-12 text-center">
                                                <ul className="list-boxed-s1">
                                                    <li>
                                                        <h3>Pearl Jam</h3><span></span>
                                                    </li>
                                                    <li>
                                                        <h3>Killswitch Engage</h3><span></span>
                                                    </li>
                                                    <li>
                                                        <h3>The Struts</h3><span></span>
                                                    </li>
                                                    <li>
                                                        <h3>Refused</h3><span></span>
                                                    </li>
                                                    <li>
                                                        <h3>Parkway Drive</h3><span></span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div id="tab4" className="tab_single_content" data-bgimage="url(/rockfest/images/background/t4.jpg) top">
                                        <div className="row">
                                            <div className="col-md-12 text-center">
                                                <ul className="list-boxed-s1">
                                                    <li>
                                                        <h3>Guns N Roses</h3><span></span>
                                                    </li>
                                                    <li>
                                                        <h3>Beartooth</h3><span></span>
                                                    </li>
                                                    <li>
                                                        <h3>Scars on Broadway</h3><span></span>
                                                    </li>
                                                    <li>
                                                        <h3>Architects</h3><span></span>
                                                    </li>
                                                    <li>
                                                        <h3>Tom Morrelo</h3><span></span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div id="tab5" className="tab_single_content" data-bgimage="url(/rockfest/images/background/t5.jpg) top">
                                        <div className="row">
                                            <div className="col-md-12 text-center">
                                                <ul className="list-boxed-s1">
                                                    <li>
                                                        <h3>Kiss</h3><span></span>
                                                    </li>
                                                    <li>
                                                        <h3>Pearl Jam</h3><span></span>
                                                    </li>
                                                    <li>
                                                        <h3>Guns N Roses</h3><span></span>
                                                    </li>
                                                    <li>
                                                        <h3>Avatar</h3><span></span>
                                                    </li>
                                                    <li>
                                                        <h3>Bad Wolves</h3><span></span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section> */}
            <section id="section-tickets">
                <div className="container px-0">
                    <div className="row">
                        <div className="col-md-12 text-center">
                            <div className="wm">Frequent</div>
                            <h2 className="mt-10 lh-1"><span className="id-color">03</span> FAQs</h2>
                            <div className="small-border bg-color"></div>
                        </div>
                        <div className="spacer-single"></div>
                    </div>
                    <div className="g-custom-x">
                        {faqsView}
                    </div>
                </div>
            </section>
            {/* <section id="section-tickets">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 text-center">
                            <div className="wm">Tickets</div>
                            <h2 className="mt-10 lh-1"><span className="id-color">03</span> Tickets</h2>
                            <div className="small-border bg-color"></div>
                        </div>
                        <div className="spacer-single"></div>
                    </div>
                    <div className="row g-custom-x">
                        <div className="col-lg-4 col-md-6 col-sm-12">
                            <div className="pricing-s1 mb-sm-30">
                                <div className="top text-center">
                                    <h2>One-Day</h2>
                                </div>
                                <div className="mid text-center bg-color-secondary text-light">
                                    <p className="price">
                                        <span className="currency">$</span>
                                        <span className="m opt-1">49.89</span>
                                    </p>
                                </div>
                                <div className="bottom">
                                    <ul>
                                        <li><i className="icon_check"></i>Ticket for one day</li>
                                        <li><i className="icon_check"></i>Chance to win doorprize</li>
                                        <li><i className="icon_close"></i><s>Free official merchandise</s></li>
                                        <li><i className="icon_close"></i><s>Free artist photo + signature</s></li>
                                        <li><i className="icon_close"></i><s>Hotel Voucher</s></li>
                                    </ul>
                                </div>
                                <div className="action text-center">
                                    <a href="01_rockfest-ticket.html" className="btn-main">Buy Ticket</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12">
                            <div className="pricing-s1 mb-sm-30">
                                <div className="top text-center">
                                    <h2>Three-Days</h2>
                                </div>
                                <div className="mid text-center bg-color-secondary text-light">
                                    <p className="price">
                                        <span className="currency">$</span>
                                        <span className="m opt-1">69.89</span>
                                    </p>
                                </div>
                                <div className="bottom">
                                    <ul>
                                        <li><i className="icon_check"></i>Ticket for three days</li>
                                        <li><i className="icon_check"></i>Chance to win doorprize</li>
                                        <li><i className="icon_check"></i>Free official merchandise</li>
                                        <li><i className="icon_close"></i><s>Free artist photo + signature</s></li>
                                        <li><i className="icon_close"></i><s>Hotel Voucher</s></li>
                                    </ul>
                                </div>
                                <div className="action text-center">
                                    <a href="01_rockfest-ticket.html" className="btn-main">Buy Ticket</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12">
                            <div className="pricing-s1 mb-sm-30">
                                <div className="top text-center">
                                    <h2>All-Days</h2>
                                </div>
                                <div className="mid text-center bg-color-secondary text-light">
                                    <p className="price">
                                        <span className="currency">$</span>
                                        <span className="m opt-1">89.89</span>
                                    </p>
                                </div>
                                <div className="bottom">
                                    <ul>
                                        <li><i className="icon_check"></i>Ticket for all days</li>
                                        <li><i className="icon_check"></i>Chance to win doorprize</li>
                                        <li><i className="icon_check"></i>Free official merchandise</li>
                                        <li><i className="icon_check"></i>Free artist photo + signature</li>
                                        <li><i className="icon_check"></i>Hotel Voucher</li>
                                    </ul>
                                </div>
                                <div className="action text-center">
                                    <a href="01_rockfest-ticket.html" className="btn-main">Buy Ticket</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section> */}
            {/* <section id="section-gallery">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 text-center">
                            <div className="wm">Gallery</div>
                            <h2 className="mt-10 lh-1"><span className="id-color">04</span> Gallery</h2>
                            <div className="small-border bg-color"></div>
                        </div>
                        <div className="spacer-single"></div>
                    </div>
                    <div className="row">
                        <div className="col-md-8 offset-md-2">
                            <div id="carouselExampleIndicators" className="carousel slide carousel-fade" data-mdb-ride="carousel">
                                <div className="carousel-inner mb-5">
                                    <div className="carousel-item active">
                                        <img src="/rockfest/images/gallery/1.jpg" className="d-block w-100" alt="" />
                                    </div>
                                    <div className="carousel-item">
                                        <img src="/rockfest/images/gallery/2.jpg" className="d-block w-100" alt="" />
                                    </div>
                                    <div className="carousel-item">
                                        <img src="/rockfest/images/gallery/3.jpg" className="d-block w-100" alt="" />
                                    </div>
                                    <div className="carousel-item">
                                        <img src="/rockfest/images/gallery/4.jpg" className="d-block w-100" alt="" />
                                    </div>
                                    <div className="carousel-item">
                                        <img src="/rockfest/images/gallery/5.jpg" className="d-block w-100" alt="" />
                                    </div>
                                    <div className="carousel-item">
                                        <img src="/rockfest/images/gallery/6.jpg" className="d-block w-100" alt="" />
                                    </div>

                                </div>
                                <button className="carousel-control-prev" type="button" data-mdb-target="#carouselExampleIndicators" data-mdb-slide="prev">
                                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Previous</span>
                                </button>
                                <button className="carousel-control-next" type="button" data-mdb-target="#carouselExampleIndicators" data-mdb-slide="next">
                                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Next</span>
                                </button>
                                <div className="carousel-indicators" style="margin-bottom: -20px;">
                                    <button type="button" data-mdb-target="#carouselExampleIndicators" data-mdb-slide-to="0" className="active" aria-current="true" aria-label="Slide 1" style="width: 100px;">
                                        <img className="d-block w-100 img-fluid" src="/rockfest/images/gallery/1.jpg" alt="" />
                                    </button>
                                    <button type="button" data-mdb-target="#carouselExampleIndicators" data-mdb-slide-to="1" aria-label="Slide 2" style="width: 100px;">
                                        <img className="d-block w-100 img-fluid" src="/rockfest/images/gallery/2.jpg" alt="" />
                                    </button>
                                    <button type="button" data-mdb-target="#carouselExampleIndicators" data-mdb-slide-to="2" aria-label="Slide 3" style="width: 100px;">
                                        <img className="d-block w-100 img-fluid" src="/rockfest/images/gallery/3.jpg" alt="" />
                                    </button>
                                    <button type="button" data-mdb-target="#carouselExampleIndicators" data-mdb-slide-to="3" aria-label="Slide 4" style="width: 100px;">
                                        <img className="d-block w-100 img-fluid" src="/rockfest/images/gallery/4.jpg" alt="" />
                                    </button>
                                    <button type="button" data-mdb-target="#carouselExampleIndicators" data-mdb-slide-to="4" aria-label="Slide 5" style="width: 100px;">
                                        <img className="d-block w-100 img-fluid" src="/rockfest/images/gallery/5.jpg" alt="" />
                                    </button>
                                    <button type="button" data-mdb-target="#carouselExampleIndicators" data-mdb-slide-to="5" aria-label="Slide 6" style="width: 100px;">
                                        <img className="d-block w-100 img-fluid" src="/rockfest/images/gallery/6.jpg" alt="" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section> */}
            {sponsors?.length > 0 && <section>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 text-center">
                            <div className="wm">Sponsors</div>
                            <h2 className="mt-10 lh-1"><span className="id-color">05</span> Sponsored by:</h2>
                            <div className="small-border bg-color"></div>
                        </div>
                        <div className="spacer-single"></div>
                    </div>
                    <div className="row g-custom-x">
                    <Splider  options={{...spliderVariableWidth, rows: 2, gap : { row: '1rem' }}}>
                            {sponsors?.map((el, index) => {
                                        const {img_name, img_link, mylisting_accordion_photo} = el;
                                        return <a className='w-auto' href={img_link} target="_blank"><img
                                        alt="image" style={{objectFit: 'contain', height:'80px'}}
                                        src={mylisting_accordion_photo}
                                        className={`logo_image pr-20`}
                                        /></a>}
                                        )} 
                        </Splider>
                    </div>
                </div>
            </section>}
            <section id="section-countdown" aria-label="section">
                <div className="container">
                    <div className="row">
                        <div className="col-md-10 offset-md-1">
                            <div className="wm">Begin in</div>
                            <CountDownUI exClass={'justify-center d-flex'} light fromActive eventId={id}/>
                            <div id="defaultCountdown"></div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
        {/* content close */}
        <a href="#" id="back-to-top"></a>
        {/* footer begin */}
        {/* <footer>
            <div className="container">
                <div className="row">
                    <div className="col-md-3 col-sm-6 col-xs-1">
                        <div className="widget">
                            <h5>Contact Info</h5>
                            <address className="s1">
                                <span><i className="id-color fa fa-map-marker fa-lg"></i>08 W 36th St, New York, NY 10001</span>
                                <span><i className="id-color fa fa-phone fa-lg"></i>+1 333 1000 2000</span>
                                <span><i className="id-color fa fa-envelope-o fa-lg"></i><a href="mailto:contact@example.com">contact@example.com</a></span>
                            </address>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-6 col-xs-1">
                        <div className="widget">
                            <h5>Quick Links</h5>
                            <ul>
                                <li><a href="01_rockfest-blog.html">Blog</a></li>
                                <li><a href="01_rockfest-gallery.html">Gallery</a></li>
                                <li><a href="01_rockfest-contact.html">Contact Us</a></li>
                                <li><a href="#section-tickets">Ticket</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-6 col-xs-1">
                        <div className="widget">
                            <h5>Latest Blog</h5>
                            <ul>
                                <li><a href="01_rockfest-blog-single.html">Unreleased Footage of Pearl Jam</a></li>
                                <li><a href="01_rockfest-blog-single.html">Kiss Announce New Single</a></li>
                                <li><a href="01_rockfest-blog-single.html">Guns N' Roses Announce Tour</a></li>
                                <li><a href="01_rockfest-blog-single.html">Tom Morello New Collaboration</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-6 col-xs-1">
                        <div className="widget">
                            <h5>Newsletter</h5>
                            <p>Signup for our newsletter to get the latest news in your inbox.</p>
                            <form action="blank.php" className="row form-dark" id="form_subscribe" method="post" name="form_subscribe">
                                <div className="col text-center">
                                    <input className="form-control" id="txt_subscribe" name="txt_subscribe" placeholder="enter your email" type="text" /> <a href="#" id="btn-subscribe"><i className="arrow_right bg-color-secondary"></i></a>
                                    <div className="clearfix"></div>
                                </div>
                            </form>
                            <div className="spacer-10"></div>
                            <small>Your email is safe with us. We don't spam.</small>
                        </div>
                    </div>
                </div>
            </div>
            <div className="subfooter">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="de-flex">
                                <div className="de-flex-col">
                                    <a href="index.html">
                                        <img alt="" className="f-logo" src="/rockfest/images/logo.png" /><span className="copy">&copy; Copyright 2022 - Rockfest by Designesia</span>
                                    </a>
                                </div>
                                <div className="de-flex-col">
                                    <div className="social-icons">
                                        <a href="#"><i className="fa fa-facebook fa-lg"></i></a>
                                        <a href="#"><i className="fa fa-twitter fa-lg"></i></a>
                                        <a href="#"><i className="fa fa-linkedin fa-lg"></i></a>
                                        <a href="#"><i className="fa fa-pinterest fa-lg"></i></a>
                                        <a href="#"><i className="fa fa-rss fa-lg"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer> */}
        {/* footer close */}
    </div>
    {/* <Script src="/rockfest/js/owl.carousel.js"></Script> */}
    <Script src="/rockfest/js/wow.min.js"></Script>

    {/* Javascript Files============================ */}
    {/* <Script src="/rockfest/js/jquery.min.js"></Script>
    <Script src="/rockfest/js/bootstrap.min.js"></Script>
    <Script src="/rockfest/js/bootstrap.bundle.min.js"></Script>
    
    <Script src="/rockfest/js/jquery.isotope.min.js"></Script>
    <Script src="/rockfest/js/easing.js"></Script>
    <Script src="/rockfest/js/owl.carousel.js"></Script>
    <Script src="/rockfest/js/jquery.magnific-popup.min.js"></Script>
    <Script src="/rockfest/js/enquire.min.js"></Script>
    <Script src="/rockfest/js/jquery.plugin.js"></Script>
    <Script src="/rockfest/js/jquery.countTo.js"></Script>
    <Script src="/rockfest/js/jquery.countdown.js"></Script>
    <Script src="/rockfest/js/jquery.lazy.min.js"></Script>
    <Script src="/rockfest/js/jquery.lazy.plugins.min.js"></Script>
    <Script src="/rockfest/js/mdb.min.js"></Script>
    <Script src="/rockfest/js/jquery.countdown.js"></Script>
    <Script src="/rockfest/js/countdown-custom.js"></Script>
    <Script src="/rockfest/js/cookit.js"></Script>    
    <Script src="/rockfest/js/designesia.js"></Script> */}
</section>
</div>
</>
  )
}
export default Rockfest

