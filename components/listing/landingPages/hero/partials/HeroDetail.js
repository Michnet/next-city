import dynamic from 'next/dynamic';
import { cleanHtml, randomEither } from '@/helpers/universal';
import { useRecoilValue } from 'recoil';
import { Client } from 'react-hydration-provider';
import {homeurl, siteColorNamesArray, WPDomain } from "@/helpers/base";
import { memo, useEffect } from 'react';
import DateViewDescriptive from '@/components/UI/partials/dateViews/DateViewDescriptive';
import DateViewString from '@/components/UI/partials/dateViews/DateViewString';
import { PriceView } from '@/components/UI/PriceView';
import { UISizes } from '@/contexts/atoms';
import CountDownUI from '@/components/UI/CountDownUI';
import styles from '@/components/listing/styles/home1.module.css';
import { ListingMetaMini, PreviousRouteLink } from '@/components/UI/Partials';
import Link from 'next/link';
import PostLike from '@/components/UI/partials/social/PostLike';
import NextPostLink from '@/components/UI/NextPostLink';
import { openOffCanvas } from '@/helpers/appjs';
import { hashtag } from '@/helpers/universal';

const HeroDetailConst = ({listing, activeKey, color, setActiveKey, user, token, exClass=''}) => {
  const {cover, page_views, title, rating, acf, category, author_id, venue,tagline, short_desc, gallery, id, type, locations, ticket_min_price_html, xtra_large_thumb, whatsapp, phone} = listing ?? {};
  const {greeting} = listing?.landing ?? {};
  const {general_merchandise} = acf ?? {}
  const {likes, gen} = acf?.community ?? {};
  const {rl_awesome, color:catColor, name:catName} = category ?? {};
  const {isMobile, isLargeTab} = useRecoilValue(UISizes);

  let galArr = [], greetingView, firstWord='', lastWords='', actionTwoLink, actionLink, freshDesc;
  
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
      greetingView = <p className="greeting_msg smLine">{greeting}</p>
  }else{
      greetingView = <p className="greeting_msg smLine">Welcome to <span className="_title text-outlined"   dangerouslySetInnerHTML={{   __html: listing?.title?.rendered}}/></p>
  }

  if(user){
    if(author_id == user.id){
      actionLink = <Link
        href={`${WPDomain}/my-account/my-listings/?action=edit&job_id=${listing.id}&lc_tok=${token}`}
        className="listing_edit rounded-5 btn btn-sm m-0 btn-outline-secondary"
        target='_blank'>Edit Listing</Link>
    }

    if(user?.id === 1){
     actionTwoLink = <Link
       href={`${homeurl}/api/revalidate?path=/${type}s/${listing.slug}`}
       className="btn btn-sm m-0 btn-outline-secondary listing_edit rounded-5"
       target='_blank'>Rebuild Listing</Link>
   }
 }

  return (<div>
    <div>
        <div className={`hero_detail ${exClass}`}>
            <div className='hero_title _detail sm:px-10 md:px-35 md:pb-20 pt-0 pt-30 d-block d-lg-grid gap-4 align-items-center z-2 position-relative'>
            
             <div className='profile_name d-none d-md-block'>
             
             <ListingMetaMini filled  exClass={'pos-relative z-2 justify-end'} page_likes={likes?.length ?? null}  page_views={page_views} ratings={rating}/>
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
            <div className='d-md-block _right card card-style mx-0 p-4 p-sm-5'> 
              <Client>
              <div className='row_flex gap-2 justify-between mb-3'>
              {<button data-aos='fade-left' onClick={() => {setActiveKey(general_merchandise?.length > 0 ? 'merchandise' : 'private-chat')}}  className="big_btn btn btn-m shadow-bg shadow-bg-m  rounded-s text-uppercase text-nowrap font-900 color-white shadow-s bg-listing btn-icon text-start">
                    <i className={`far fa-${general_merchandise?.length > 0 ? 'store' : 'comment-smile'} font-20 text-center color-white`}></i>
                    {general_merchandise?.length > 0 ? 'See Store' : 'Contact'}
                  </button>}
                <div className='row_flex gap-2 justify-end item_switch align-items-center' data-aos='fade-right'>
                  <PreviousRouteLink/>
                  <NextPostLink current={listing.slug} styleObj={{width: '50px', maxWidth: '50px'}}/>
              </div>
            </div>
             <div>
                <div className='status_greeting' data-aos='zoom-in'>
                  {/* <DateViewState fromActive exClass={'dotty ripple'} eventId={id}/> */}
                  <div className='row_flex gap-2'>{actionLink}{actionTwoLink}</div>
                  <p className = 'mb-10 smLine'>
                        {greetingView}
                  </p>
                </div>
              </div>
              <p className = 'mb-20 text-14 smLine opacity-60' data-aos='zoom-in'>
                  <span  dangerouslySetInnerHTML={{__html: hashtag(short_desc)}}/>
              </p></Client>
              {ticket_min_price_html ? <PriceView priceHTml={ticket_min_price_html} exClass={'_inline _hero mb-10 d-block'}/> : <></>}
                <div className={`gap-2 flex-wrap d-flex justify-between`}>
                  <div className="color-theme d-flex align-items-center text-center hero_actions" data-aos='fade-up'>
                    {phone && <a style={{width: '50px', maxWidth: '50px'}} className={''} href={`tel:${phone}`}><i className={`border-theme color-${randomEither(siteColorNamesArray)}-dark fal fa-phone text-center text-24`}></i><span>Call</span></a>}
                    <button onClick={(e) => setActiveKey('private-chat')} style={{width: '50px'}} className={`link`}><i className={`border-theme color-${randomEither(siteColorNamesArray)}-dark ${activeKey == 'private-chat' ? '_active fas' : 'fal'} fa-comment-dots text-center text-24`}/><span>Chat</span></button>
                    <PostLike likedEl={<div style={{width: '50px'}} className="link"><i className={`border-theme color-${randomEither(siteColorNamesArray)}-dark fas fa-heart text-center text-24`}/><span>Save</span></div>} 
                        unlikedEl={<div style={{width: '50px'}} className="link"><i className={`border-theme color-${randomEither(siteColorNamesArray)}-dark fal fa-heart text-center text-24`}/><span>Save</span></div>} listing={id} user={user}/>
                        <button data-menu='listingActions' onClick={(e) => openOffCanvas(e)} style={{width: '50px'}} className={'link'}><i className={`border-theme color-${randomEither(siteColorNamesArray)}-dark fas fa-ellipsis-h text-center text-24`}></i>
                        <span>More</span></button>
                    
                    </div>
                 {/*  <button onClick={() => setActiveKey('private-chat')}
                    className={`btn text-truncate color-theme rounded ${styles['learn-more']} ${styles['button']} ${styles['button-outline']} ${styles['button-md-border']} `}
                  >
                    Learn More
                  </button> */}
                </div>
              </div>
            </div>

    </div></div>
    </div>
  )
}
const HeroDetail = memo(HeroDetailConst);
export default HeroDetail;
