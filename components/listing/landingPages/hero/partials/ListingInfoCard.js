import { Client } from 'react-hydration-provider';
import { memo, useEffect } from 'react';
import DateViewDescriptive from '@/components/UI/partials/dateViews/DateViewDescriptive';
import DateViewString from '@/components/UI/partials/dateViews/DateViewString';
import CountDownUI from '@/components/UI/CountDownUI';
import styles from '@/components/listing/styles/home1.module.css';

const ListingInfoCardConst = ({listing, activeKey, styleObj = {}, color, setActiveKey, user, token, exClass=''}) => {
  const {title, author_id, venue,tagline,gallery, id, type} = listing ?? {};
  const {greeting} = listing?.landing ?? {};

  let galArr = [], greetingView, firstWord='', lastWords='';
  let locStyle = {...styleObj}
  
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

  return (<div className={`listing_info_card bg-transparent theme-dark ${exClass}`} style={{...locStyle}}>
          <div className={`card card-style m-0 rounded-0 border-0 bg-theme`} data-aos='zoom-in'>
          <div
            className={`z-1 p-5 pb-3 position-relative ${styles['section-container']} bg-transparent card card-style border-0 rounded-0 w-auto m-0`}
          >
            {/* <div className='overlay position-absolute w-100 h-full top-0 bg-cover' style={{background: `url(/images/bg/connect.png)`}}/> */}
            <div style={{rowGap: '20px', columnGap: '40px'}} className={`row md:flex-row flex-md-nowrap flex-col position-relative`}>
              <div className={`col-12 col-md-6 text-right items-end px-0 ${styles['container4']}`}>
              <span className={styles['text19']} data-aos='fade-left'><DateViewString eventId={listing?.id}  format={'MMMM D'}/></span>
              {tagline && <span className={`text-18 color-theme`} style={{fontWeight: '200'}} data-aos='fade-right'>
                  {tagline}
                </span>}
                {venue && <span className={`text-30 fw-600 opacity-50 truncate-4 smLine`} data-aos='fade-left'>
                  <span className='fw-300'>@</span>
                  {venue}
                </span>}
              </div>
              <Client><div className="flex-grow-1 gap-2 d-flex md:items-end items-start flex-column col-12 col-md-6 px-0" data-aos='fade-right'>
                {id ? <><CountDownUI light fromActive eventId={id} />
              {<DateViewDescriptive fromActive eventId={id} exClass={'_hero mb-10'} light/>}</> : <></>}
              </div>
            </Client>
            </div>
            </div>
          </div>
    </div>
  )
}
const ListingInfoCard = memo(ListingInfoCardConst);
export default ListingInfoCard;
