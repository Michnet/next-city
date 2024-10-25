import { cleanString } from "@/helpers/universal";
import dayjs from "dayjs";

function SingleReview2({google=false, review, user, preview, listingId, noTime, reload, width='auto', exClass='', transparent }) {
    

    if(google){
      const {author_name, author_url, profile_photo_url, text, time,  rating} = review;

      return (
        <div className={`review_card_2 card card-style shadow-sm ${exClass} ${transparent ? 'bg-transparent shadow-0 border-o' : ''}`} style={{width: width}}>
          <div className="de_testi">
              <blockquote>
             {/*  <h5 className="'font-17 text-20 mb-2 color-white fw-100">{title}</h5> */}
                  <p className="rev_content mb-3">
                    {cleanString(text)}
                  </p>
                  <div id={`score_stars`} className='score_stars'
                    style={{
                        width: '100px',
                        height: '18px',
                         backgroundColor: 'var(--bs-gray-200)',
                        backgroundImage: 'linear-gradient(45deg, var(--highlight), #FF9800)',
                        maskImage: `url(/img/general/stars.svg)`,
                        backgroundSize: `${100/5 * parseFloat(rating)}% 100%`,
                        backgroundRepeat: 'no-repeat',
                        maskRepeat: 'no-repeat'
                      }}
                    />
                  <div className="de_testi_by d-flex mt-1 align-items-center">
                  <div className='rev_avatar rounded-m me-2' style={{width: '40px'}}><img src={profile_photo_url}/></div> <div className="d-flex flex-column">
                      <h6 className="font-14 lh-1 color-highlight">{author_name}</h6>
                      <span className="lightText font-12">{`${dayjs.unix(time).format('h:ma, DD MMM YYYY')}`}</span>
                  </div>
                  </div>
              </blockquote>
          </div>
        </div>
      );

    }else{
      const {author, date, content, title, rating_data} = review;
      const {rating, id} = review ?? {}
      return (
        <div className={`review_card_2 card card-style shadow-sm ${exClass} ${transparent ? 'bg-transparent shadow-0 border-o' : ''}`} style={{width: width}}>
          <div className="de_testi">
              <blockquote>
              <h5 className="'font-17 text-20 mb-2 color-white fw-100">{title}</h5>
                  <p>
                    {content}
                  </p>
                  <div id={`score_stars_${id}`} className='score_stars'
                    style={{
                        width: '100px',
                        height: '18px',
                         backgroundColor: 'var(--bs-gray-200)',
                        backgroundImage: 'linear-gradient(45deg, var(--highlight), #FF9800)',
                        maskImage: `url(/img/general/stars.svg)`,
                        backgroundSize: `${parseFloat(rating)}% 100%`,
                        backgroundRepeat: 'no-repeat',
                        maskRepeat: 'no-repeat'
                      }}
                    />
                  <div className="de_testi_by d-flex mt-1 align-items-center">
                  <div className='rev_avatar rounded-m me-2' style={{width: '40px'}} dangerouslySetInnerHTML={{ __html: author.avatar }} /> <div className="d-flex flex-column">
                      <h6 className="font-14 lh-1 color-highlight">{author.name}</h6>
                      <span className="lightText font-10">{date.human_diff}</span>
                  </div>
                  </div>
              </blockquote>
          </div>
        </div>
      );
    }

  
}
export default SingleReview2;
