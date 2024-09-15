function SingleReview2({ review, user, preview, listingId, noTime, reload, width='auto', exClass='', transparent }) {
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
              <div className="de_testi_by d-flex mt-1">
              <div className='rev_avatar rounded-m me-2' style={{width: '40px'}} dangerouslySetInnerHTML={{ __html: author.avatar }} /> <div className="d-flex flex-column">
                  <h6 className="font-14 lh-1">{author.name}</h6>
                  <span className="lightText font-10">{date.human_diff}</span>
              </div>
              </div>
          </blockquote>
      </div>
    </div>
  );
}
export default SingleReview2;
