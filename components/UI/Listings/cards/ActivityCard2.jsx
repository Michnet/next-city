import { LoaderSiteLogo } from "@/components/skeletons/Loaders";
import { cleanHtml, shuffleArray } from "@/helpers/universal";
import Link from "next/link";
import { memo, useMemo } from "react";
//import Slider from "react-slick";
// import PostLike from "~/appComponents/components/Social/PostLike";
import { ListingMeta, ListingMetaMini } from "../../Partials";
import DateView from "../../partials/dateViews/DateView";
import DateViewState from "../../partials/dateViews/DateViewState";
import PostLike from "../../partials/social/PostLike";
import { PriceView } from "../../PriceView";

const processImg = (images, cover) => {
  if(images && images.length > 0){
      const targetImg = images[Math.floor(Math.random()*images.length)];
      return targetImg
  }else if(cover){
      return cover;
  }
}

const ActivityCard2Const = ({listing, exClass, size, mini, width}) => {

  const {id, title, short_desc, event_date, page_views, rating, acf, locations, level, ticket_min_price_html, xtra_large_thumb, gallery} = listing;
  const slicedGal = shuffleArray(gallery).slice(0, 5);
  const imgArr = [xtra_large_thumb, ...slicedGal];
  const {likes} = acf?.community ?? {};
 

  var itemSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };


  const imgSrc = useMemo(() => processImg(imgArr), [listing.id] );

  // custom navigation
  function Arrow(props) {
    let className =
      props.type === "next"
        ? "slick_arrow-between slick_arrow -next arrow-md flex-center button -blue-1 bg-theme shadow-1 size-30 rounded-full sm:d-none js-next"
        : "slick_arrow-between slick_arrow -prev arrow-md flex-center button -blue-1 bg-theme shadow-1 size-30 rounded-full sm:d-none js-prev";
    className += " arrow";
    const char =
      props.type === "next" ? (
        <>
          <i className="icon icon-chevron-right text-12"></i>
        </>
      ) : (
        <>
          <span className="icon icon-chevron-left text-12"></span>
        </>
      );
    return (
      <button className={className} onClick={props.onClick}>
        {char}
      </button>
    );
  }
  
  return (
          <div style={{width: width ?? 300}} className={`card card-style listing_card ${exClass ?? ''} ${mini ? '_mini' : ''}`}
            key={id} data-aos="fade" data-aos-once="true" data-aos-delay={60}
          >
            <div
              className="activityCard -type-2  hover-inside-slider"
            >
              <div className="activityCard__image position-relative ratio ratio-4x3">
                <div className="inside-slider topped_dots roundy">
                  {/* <Slider
                  focusOnSelect
                  autoplay
                  swipe={false}
                  touchMove={true}
                  autoplaySpeed={6000}
                  fade
                  pauseOnHover
                    {...itemSettings}
                    arrows={false}
                    nextArrow={<Arrow type="next" />}
                    prevArrow={<Arrow type="prev" />}
                  >
                    {imgArr?.map((slide, i) => (
                      <div className="cardImage ratio ratio-4:3" key={i}>
                        <div className="cardImage__content ">
                          <img
                          quality={90}
                            width={size ? size  : 400}
                            height={size ? size  : 'auto'}
                            //className="col-12 js-lazy"
                            placeholder={<LoaderSiteLogo/>}
                            src={slide}
                            onError={(e) => {e.target.src = '/images/bg/fallback-sm.jpg'}}
                            alt="image"
                          />
                        </div>
                      </div>
                    ))}
                  </Slider> */}
                  <img
                          quality={90}
                            width={size ? size  : '100%'}
                            height={size ? size  : '100%'}
                            className="object-cover js-lazy"
                            placeholder={<LoaderSiteLogo/>}
                            src={imgSrc}
                            onError={(e) => {e.target.src = '/images/bg/fallback-sm.jpg'}}
                            alt="image"
                          />
                  {mini && event_date && event_date[0] ? <DateView customDate={event_date[0].start} customEndDate={event_date[0].end} exClass='card_date mr-10'/> : <></>}
                  <div className="stats_box">
                    <div className="_lefty d-flex flex-column align-items-start gap-2">
                    {/* {mini ? <></> : <ListingMetaMini page_likes={likes?.length ?? null}  page_views={page_views} ratings={rating}/>} */}
                    {!mini && event_date && event_date[0] ? <DateViewState exClass={mini ? '_texty bg-theme' : ''} customDate={event_date[0].start} customEndDate={event_date[0].end} eventId={id}/> : <></>}
                    </div>
                    <div className="cardImage__leftBadge position-relative bottom-0">
                    
                    </div>
                    {ticket_min_price_html && <PriceView preText={''}  exClass={'_inline'} priceHTml={ticket_min_price_html}/> }
                  </div>
                  <div className="cardImage__wishlist">
                    <PostLike listing={id}/>
                  </div>
                </div>
                
              </div>
              {/* End .tourCard__image */}

              <div className="activityCard__content">
              {!mini && event_date && event_date[0] ? <DateView customDate={event_date[0].start} customEndDate={event_date[0].end} exClass='position-relative card_date outliney darky border-light'/> : <></>}
                <div className=' mb-0 w-100 content-collapsible'>
                  <div className="flex-grow-1">
                    <Link href={`/events/${listing.slug}`}>
                      <h4 className={`activityCard__title lh-13 text-dark-1 ${mini ? 'd-block text-truncate mb-0' : ''}`}>
                        <span >{cleanHtml(title?.rendered)}</span>
                      </h4>
                    </Link>
                    
                    {/* <p className="card_desc truncate-2 mb-1">{short_desc}</p> */}
                    <div className={`d-flex flex-wrap justify-start align-items-center gap-1`}>
                      {mini ? <></> : <ListingMetaMini filled page_likes={likes?.length ?? null}  page_views={page_views} ratings={rating}/>}
                      <ListingMeta filled location={locations?.length > 0 ? locations[0].name : null} duration={listing.duration}/>
                    </div>
                    <div className={`d-flex flex-${mini ? 'column' : 'row'} justify-between align-items-${mini ? 'start' : 'center'}`}></div>
                  </div>
                </div>
                
              </div>
            </div>
          </div>
  );
};

const ActivityCard2 = memo(ActivityCard2Const);
export default ActivityCard2;
