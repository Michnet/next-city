//import dynamic from 'next/dynamic';
import Image from 'next/image';
// const ListingProductsMini = dynamic(() => import('../ListingProducts/ListingProductsMini'));
import { memo, Suspense, useMemo, useEffect } from 'react';
// const TeamMember2 = dynamic(() => import('../Team/TeamMember2'));
import { Client } from 'react-hydration-provider';
// import { BookingView } from '~/pages/events/[slug]';
import Splider from '@/components/UI/partials/Splider';
import { PostThumbnailSrc, srcWithFallback } from '@/helpers/universal';
import { CustomRow, DualColorHeader } from '@/components/UI/Partials';
import TagsCloud from '../partials/TagsCloud';
import MegaGalleryMini from '@/components/UI/Galleries/MegaGalleryMini';
import ListingProductsMini from '../partials/ListingProductsMini';
import TeamMember2 from '../team/TeamMember2';
import { BookingView } from '@/pages/events/[slug]';
import {spliderVariableWidth} from '@/helpers/sliders'
import PostReviews from '../reviews/postReviews';
import FAQs from "@/components/UI/FAQs";
import { useRouter } from 'next/router';
import ProfileInfo from '../profileInfo/ProfileInfo';
import { PriceView } from '@/components/UI/PriceView';
import ListingDetail from '../profileInfo/ListingDetail';
import ListingStats from '../profileInfo/partials/ListingStats';
import Widget from "@/components/UI/partials/Widget";


function processImg(images, cover){
    if(images && images.length > 0){
        const targetImg = images[Math.floor(Math.random()*images.length)];
        return targetImg
    }else if(cover){
        return cover;
    }
}

const BusinessOneConst = ({listing, cover, color, scroller, setActiveKey, upcoming, styles}) => {
    
    const {address, venue, about_us, locations, author_id, rating, id, short_desc, content, dir_tags, ticket_min_price_html, landing,xtra_large_thumb, category, marketing, team, performers, meta, listing_store} = listing ?? {};
    const {tickets} = listing_store;
    const {_wcu, _event_program, _stats, _links, "_event-sponsors": sponsors, "_special-guests": special_guests, _job_gallery:gallery} = meta ?? {};
    const {list:wcu_list} = _wcu ? _wcu[0] : {};
    const { general_merchandise} = listing?.acf ?? {};
    const {wcu, what_we_do} = marketing ??  {};
    const {faqs} = about_us ?? {};
    const router = useRouter();

    const cachedListing = useMemo( () => listing, [listing.id] );
    
    let statsView, greetingView, faqsView, strengthsView, galleryView, detailView, teamView, sponsorsView, featuredImgSrc,  largeFeaturedImgSrc, shopView, servicesView, reviewsView, tagsView, descriptView, guestsView, catView, ticketsHint;

    if(listing){
        if(_stats?.length > 0){
            statsView = <Widget
            freeHeader 
            title= 'Event stats'
            subtitle={'Key stats about event'}
            coverClass={'backdropGray'}
            exClass=''
            cover= {srcWithFallback(processImg(gallery, cover))}
            icon = {'fas fa-stopwatch-20'}
            >
                    <ListingStats stats={_stats}/>
            </Widget>
            
           }

        if(faqs?.length > 0){
            let trimFaqs = faqs?.slice(0,3);
        faqsView = <div className="card card-style shadow mt-4">
                <div className="content">
                    <div className="d-flex pb-2 border-bottom mb-3 ">
                        <div>
                            <h6 className="mb-n1 opacity-80 color-highlight">FAQs</h6>
                            <h3>Common Questions</h3>
                        </div>
                        <div className="align-self-center ms-auto">
                        <i className="bi bi-question-circle-fill font-24 color-red-dark"></i>
                        </div>
                    </div>
                    {trimFaqs?.length > 0 && <FAQs faqs={trimFaqs} postID={id}/>}
                    <button onClick={() => setActiveKey('faqs')} className="shadow-lg-m rounded-l color-white bg-secondary mb-0 btn btn-xxs mb-3 font-900 shadow-lg">
                        Get More Answers
                    </button>
                </div>
            </div>
        }

        if(content){
            detailView = <ListingDetail detail={content} id={listing.id}/>
          }

        if(tickets?.length > 0){
            ticketsHint = <><div className='mb-20 sc_heading_3 px-4 mt-4'>
            <h5>Engage Now</h5>
            <h4>Booking Options</h4>
        </div>
        <div className='bg-theme p-0 bg-cover card card-style mb-3 lefty' style={{backgroundImage: `url("${cover}")`}}>
                                <div className='ps-data d-flex flex-column p-3 bg-gradient-fade backdropGray'>
                                        <div className="coverImg_box position-relative mb-4" style={{ background: "var(--bg-gray)" }}> 
                                            <div className='cover_content pt-50'>
                                                <h4>Online Booking Available</h4>
                                                <div className='divider mt-3 w-25'/>
                                                <>{ticket_min_price_html && <PriceView preText={'Starting from'}  exClass={'_inline text-20'} priceHTml={ticket_min_price_html}/> }</> 
                                            </div>
                                            
                                        </div>
                                        <div className='content_box'>
                                            {<button onClick={() => setActiveKey('tickets')} className={`btn btn-m shadow-bg shadow-bg-m mb-3 rounded-l text-uppercase text-nowrap font-900 shadow-s btn-icon text-start ${`gradient-${color}`}`}>
                                                    <i className="fas fa-qrcode font-15 text-center bg-transparent"/>
                                                      See Options
                                                </button>}

                                            <div className='card_footer'>            
                                            </div>

                                        </div>
                                </div>
                        </div>
                        </>
        }

        if(category){
            const {rl_awesome, color, name:catName} = category;
            catView = <div  className="icon_box">
                    <span className="icon_icon"> <i className="bi bi-hash"/>  </span>
                    <Client><span className="text-truncate icon_text" dangerouslySetInnerHTML={{__html: catName}}/></Client>
                  </div>
        }

        featuredImgSrc = PostThumbnailSrc(listing, 'medium');
        largeFeaturedImgSrc = PostThumbnailSrc(listing, 'medium_large');

        if(sponsors?.length > 0){
            sponsorsView = <div className={'d-block w-100 image_links py-28'}>
                   <div className='mb-20 mt-10 sc_heading_3 text-center'><h5>Proudly Sponsored By</h5></div>
                    <Splider height={110} options={{...spliderVariableWidth}}>
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
        }

        //if(listing?.gallery.length > 0){
            galleryView = <MegaGalleryMini setActiveKey={setActiveKey} upcoming={upcoming} listing={cachedListing}/>
        //}
        let fbGreeting = <p className="greeting_msg">Welcome to <span className="_title text-outlined"   dangerouslySetInnerHTML={{__html: listing?.title?.rendered}}/></p>

        if(landing){
            const {greeting} = landing;
            if(greeting){
                greetingView = <p className="greeting_msg">{greeting}</p>
            }else{
                greetingView = <>{fbGreeting}</>
            }
        }else{
            greetingView = <>{fbGreeting}</>
        }
        
        if(short_desc){
            descriptView = <>
            {/* <TextBox text={short_desc} bgUrl= {`${processImg(gallery)}`} imgUrl= {`${listing.xtra_large_thumb}`}/> */}

            <div className={`_text_box_block listing_intro padded_container pos-relative pb-5`} >
            {<Image fill style={{objectFit:"cover"}} src= {srcWithFallback(processImg(gallery))}/>}
            <div className="section_overlay gray-fil">
            </div>
            <div className="section_overlay_content flex_container">
                {<div className='border_box listing_greeting'> 
                    <div className="featuredImg_box" style={{backgroundImage: `url('${srcWithFallback(xtra_large_thumb)}')`}}>
                    </div>
                </div>}
                <div className={'excerptView'}>
                <div className="meta flex-grow-1 col-12 col-md-6 md:px-0 opacity-70">
                    {catView}
                    <div className="_location icon_box align-items-start d-inline-flex">
                    {venue && <> <span className="icon_icon"><i>@</i></span> 
                      <span className="list_location loc_venue mb-0">{venue}</span><br/>
                        
                        </>}
                    </div>
                    <div className="_location icon_box align-items-start d-inline-flex">
                      <span className="icon_icon"><i className="bi bi-pin-map"/></span> 
                      <p>{address && <><span className="list_location loc_address">{address}</span><br/></>}
                        {locations?.length > 0 ? <><span className="list_location loc_name">{locations[0]?.name}</span></> : <></>}
                        </p>
                    </div>
                  </div>
                </div>
            </div>
        </div>

                           {/*  <FeatureOne image_src={processImg(gallery)} text={short_desc}/> */}
                            </>
            
        }
        if(dir_tags?.length > 0){
            let tagClick = (tag) => {
                router.push({
                    pathname: '/explore/events',
                    query: { tags: tag.slug },
                  })
            }
            tagsView = <div>
                <div className='mb-20 sc_heading_3 px-4 mt-4'>
                    <h5>Listing Features</h5>
                    <h4>Page Tags</h4>
                </div>
                <div className='tags_row py-5 card card-style'>
                <div className='row_content'>
                    <TagsCloud hue={'var(--highlight)'} dark ids={dir_tags} /* hue={color} */ onClickFunc={tagClick}/>
                    <DualColorHeader exClass='vertical_text lg_text' title={'# Tagged In'} />
                 </div>
                 </div></div>
        }
       
        //if(rating > 0){
                reviewsView = <Suspense offset={150} once height={200}>
                <div className="wide_container px-3" 
                    >
                    <Client><PostReviews fromActive author_id={author_id} withButton setActiveKey={setActiveKey}  id={id}  limit={3} carousel /* bgImage={processImg(gallery)} *//></Client>
                    </div>
                    </Suspense>
        //}

        if(Array.isArray(wcu?.list)){
        if(wcu?.list?.length > 0){
            const reasons = wcu.list;
            const reasonArr =  reasons.map((reason) => {
                return <div className="strength_item"  style={{height: '250px', width: '400px', maxWidth: '95vw'}}>
                            <div className="content m-0">
                                <div className="image_bg">
                                  <Image fill style={{objectFit:"cover"}} src= {`${reason?.mylisting_accordion_photo}`}/>
                                </div>
                               
                                <div className="strength_content">
                                    <div className="content_box d-flex flex-column align-items-end align">
                                        <h5 className="strength_heading">{reason.ft_title}</h5>
                                        <hr className='border-loud opacity-100 w-48' style={{borderTopWidth: '3px'}}/>
                                        <p className="strength_descript">{reason.ft_description}</p>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
            });
            strengthsView = <>
                    <Suspense offset={150} once height={200}>
                    <div className="listing_strengths">
                   {/*  <div className="vertical_label dark_bg _bold"><h3 className="vertical_text">Why You Can't Miss</h3></div> */}
                        <div className="row_content row">
                            {wcu?.wcu_intro_title ? <div className="strengths_intro col-12 col-md-4 mt-4 px-3 text-center text-md-end">
                                <h3 className="section_head dark_text">{wcu.wcu_intro_title}</h3>
                                <h4 className="section_subHead gray_text mb-3">{wcu.wcu_intro_detail}</h4>
                            </div> : <></>}
                            <div className="strengths_body col-12 col-md-8 p-0">
                                <Splider exClass={'in_color card card-style'} options={{perMove:1, perPage:1, padding:{right: '20%'}}} height={'250px'} showDots>{reasonArr}</Splider>
                            </div>
                        </div>
                    </div>
                   </Suspense>
            </>
        }
        }
        if(team?.length > 0){
                    teamView = <Suspense offset={150} once height={200}>
                                    <div className="wide_container listing_team card card-style">
                                        <div className="team_intro padded_container">
                                            {/* <h3 className="section_head dark_text">{team_intro.team_intro_title}</h3> */}
                                            {/* <DualColorHeader title={team_intro.team_intro_title}/>
                                            <h4 className="section_subHead">{team_intro.team_intro_description}</h4> */}
                                        </div>

                                            <Splider>
                                                {team.map((tmMember, index) => <TeamMember2 styles={styles} member={tmMember} key={index}/>
                                                )}                                              
                                            </Splider>
                                    </div>
                                </Suspense>

        }

        if(special_guests?.length > 0){
            guestsView = <Suspense offset={150} once height={200}>
                            <div className="wide_container listing_team _square ">
                                <div className="team_intro px-3 ms-auto" >
                                    {/* <h3 className="section_head dark_text">{team_intro.team_intro_title}</h3> */}
                                    {/* <DualColorHeader title={team_intro.team_intro_title}/>
                                    <h4 className="section_subHead">{team_intro.team_intro_description}</h4> */}
                                    <div className='mb-20 mt-10 sc_heading_3 righty'>
                                        <h5>Who Else Is Coming</h5>
                                        <h4>Meet our guests</h4>
                                    </div>
                                </div>

                                <Splider height={270} exClass='card card-style righty py-3' options={{...spliderVariableWidth, pagination: true, gap:20, type:'slide', padding: { left: 20, right: 40 }}} className="p-0">
                                    {special_guests.map((tmMember, index) => <TeamMember2 avatarSize={110} styles={styles} mirrored height={120} width={120} member={tmMember} key={index}/>
                                                    )} 
                                </Splider>
                            </div>
                        </Suspense>

        }
        /* if(our_team){
            const {team_intro, tm_members} = our_team;
            if(tm_members?.length > 0){
                    teamView = <Suspense offset={150} once height={200}>
                                    <div className="wide_container listing_team white_bg">
                                        <div className="team_intro padded_container" >
                                            <h3 className="section_head dark_text">{team_intro.team_intro_title}</h3>
                                            <DualColorHeader title={team_intro.team_intro_title}/>
                                            <h4 className="section_subHead">{team_intro.team_intro_description}</h4>
                                        </div>

                                            <Splider {...carousel1}
                                                items={tm_members.map((tmMember, index) => <TeamMember member={tmMember} key={index}/>
                                                )} 
                                                disableDotsControls
                                                responsive = {{
                                                    0: {
                                                        items: 1,
                                                    },
                                                    420: {
                                                        items: 2,
                                                    },
                                                    575: {
                                                        items: 3
                                                    },
                                                    768: {
                                                        items: 5
                                                    
                                                    }
                                                }}                                              
                                                />
                                    </div>
                                </Suspense>
            }

        } */
        if(what_we_do?.wwd_services?.length > 0){
            const {wwd_intro_title, wwd_intro_detail, wwd_services} = what_we_do;

            servicesView =   <Suspense offset={150} once height={200}>
                                <div className="listing_services padded_container">                                           
                                    <div className="services_intro padded_container">
                                        <h2 className="section_head dark_text">{wwd_intro_title}</h2>
                                        <h3 className="section_subHead gray_text">{wwd_intro_detail}</h3>
                                    </div>
                                    <div className="services_body">
                                        {wwd_services.map((service, index) => 
                                        <div className="service_item" key={index} data-aos="zoom-in">
                                            <div className="serv_number"><span>{`0${index + 1}`}</span></div>
                                            {service.mylisting_accordion_photo &&  
                                                <div className="serv_image" >
                                                    <div className="image_bg shadow-card shadow-card-l" style={{  backgroundImage: `url("${service?.mylisting_accordion_photo}")`  }}></div>
                                                </div>
                                            }
                                            <div className="serv_content">
                                                <h4 className="serv_heading"   dangerouslySetInnerHTML={{   __html: service.ft_title}} />
                                                <hr className='border-loud opacity-100 w-48 my-2' style={{borderTopWidth: '3px'}}/>
                                                <p className="serv_descript"   dangerouslySetInnerHTML={{   __html: service.ft_description}} />
                                            </div>
                                        </div>
                                        )}
                                    </div>
                                    <>{ <BookingView setActiveKey={setActiveKey} text='Grab your slot' exClass='px-4 py-2'/>}</>
                                </div>
                                </Suspense>
        }
        if(general_merchandise){
            const headContent = <DualColorHeader title={'Our Shop'} exClass={'version_1'}/>
            const bodyContent = <><ListingProductsMini  ids={general_merchandise} exClass={'_landing'}/>
            </>
            let sideContent = <div className="side_content" >
                <Client><Image fill style={{objectFit:"cover"}} src= {`${srcWithFallback(processImg(gallery))}`}/></Client>
                <div className='cover_overlay full_ht whitey _gray'></div>
                <button className='lg_btn dark_btn' onClick={() => {setActiveKey("8"); scroller()}}>Visit Our Store</button>
            </div>
            shopView = <Suspense offset={150} once height={200}>
                <CustomRow 
                    bodyContent={bodyContent} 
                    headContent={headContent} 
                    exClass={'layout_1 shop_section'}
                    sideContent={sideContent}
                />
                </Suspense>
        }
    }
    
    return (
        <div className={`landing_row ${styles['landing_page']}`}>
            {/* <div className={`home_intro _greeting`}>
               <div className="flex_container row"> 
                    <div className={`greeting_box col-12 col-md-8`}>
                    <div className="greetingView">
                    <Client>{greetingView}</Client>
                    </div>
                    </div>
                    {gallery[1] && <div style={{backgroundSize: 'cover', minHeight: 200, background: `url(${gallery[1]})`}} className='bg-cover col-12 col-md-4'></div>}
                </div>
            </div>  */}

            <Client>{galleryView}</Client>
            {detailView}
            <Client>{descriptView}</Client> 
            <Client>{tagsView}</Client>        
            {/* {shopView} */}
            {reviewsView}
            {teamView}
            {guestsView}
            {ticketsHint}
            {servicesView}
            {statsView}
            {strengthsView }
            {faqsView}
            {sponsorsView}
            <ProfileInfo exClass={'px-lg-0 px-3 py-15'} listing={cachedListing} setActiveKey={setActiveKey}/>
        </div>
    )
}

const BusinessOne = memo(BusinessOneConst);
export default BusinessOne;
