import SkeletonCube from "@/components/skeletons/SkeletonCube";
import { cleanHtml, shuffleArray } from "@/helpers/universal";
import Link from "next/link";
// import TermTag from "~/appComponents/components/partials/TermTag";
// import SkeletonCube from "~/appComponents/components/skeletons/SkeletonCube";
// import { cleanHtml, shuffleArray } from "~/server/UniversalFunctions";
import { ListingMeta, ListingMetaMini } from "../../Partials";
import DateView from "../../partials/dateViews/DateView";
import TermTag from "../../partials/TermTag";
//import { getEventDates } from "~/server/WpRest";

const TimelineCard = ({item, noButton, styleName, color, flipped}) => {
  //const [dates, setDates] = useState(null);

  const {id, title, short_desc, slug, page_views, rating, category, locations, level, xtra_large_thumb, gallery,event_date} = item;
  const slicedGal = shuffleArray(gallery).slice(0, 5);const imgArr = [xtra_large_thumb, ...slicedGal];

  /* const getDates = async(payload) => {
    const fetchdDates = await getEventDates(payload);
    if(fetchdDates){
        setDates(fetchdDates.data)
    }
  } */

 /* 
  useEffect(() => {
    getDates({event_id:id, f_key : 'event-date', upcoming_instances : 1})
    const interval = setInterval(() => {
      getDates({event_id:id, f_key : 'event-date', upcoming_instances : 1})
    }, 60000);
    return () => clearInterval(interval);
  }, []); */

  
  return (
          <div
            className={`timeline_card _horizontal ${flipped ? '_flipped' : ''}`}
            key={id}
            data-aos="fade"
            data-aos-delay={60}
          >
            <div className={`gx-timeline-item gx-timeline-time-item ${styleName ?? ''}`}>
              <div className="gx-timeline-time"><p className="fw-bold text-20">{event_date && event_date[0] ? <DateView  customDate={event_date[0].start} stringy/> : <></>}</p></div>
              <div className={`gx-timeline-badge`} style={{background: `${color ?? 'var(--bgTheme)'}`}}><p></p></div>
              <div className="gx-timeline-panel p-0">
                {/* <h4 className={`gx-timeline-tile gx-text-${color}`}>{title.rendered}</h4> */}
                {/* <p>{short_desc}</p> */}
                <div
              className="activityCard1 -type-1  hover-inside-slider"
            >
              <div className='card_content row_flex align-items-stretch overflow-hidden'>
                  <div className="thumb" style={{width: '30%'}}>
                    <img src={xtra_large_thumb} placeholder={<SkeletonCube height={'100%'}/>} style={{height: '100%', minWidth: '100%', objectFit: 'cover'}}/>
                  </div>
                  <div className='content px-10 m-0' style={{width: '70%'}}>
                    <TermTag exTagClass={'mb-0 font-13'} term={category} type={'hash'}/>
                    <Link href={`/events/${slug}`}>
                      <h4 className="activityCard1__title lh-13 truncate-2 text-dark-1 text-14 fw-600">
                        <span>{cleanHtml(title.rendered)}</span>
                      </h4>
                    </Link>
                    <ListingMetaMini page_views={page_views} ratings={rating} />
                   {/*  {tagline && <p className="truncate-2  text-12">{tagline}</p>} */}
                    <div className="d-flex flex-row flex-nowrap gap-2"><ListingMeta location={locations?.length > 0 ? locations[0].name : null}/> {/* {dates?.length > 0 ? <DateViewRelative date={dates[0].start} endDate={dates[0].end}/> : null} */}
                    </div>
                    {/* <div className={`content_footer gx-align-items-center d-flex my-1`}>
                          {noButton ? null : 
                          <Link href={`/events/${slug}`}>
                            <button className="btn card_btn gx-mb-1 btn-outline-secondary">
                              Take a peak
                            </button>
                          </Link>}
                    </div> */}
                  </div>
                </div>
            </div>
              </div>
            </div>
          </div>
  );
};

export default TimelineCard;
