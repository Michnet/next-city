function SingleReview({ review, user, listingId, noTime, reload, width='auto', exClass='', transparent }) {
    const {author, date, content, title, rating_data} = review;
    
    const {rating, id} = review ?? {}

  return (
    <div className={`card card-style mb-0 shadow-sm ${exClass} ${transparent ? 'bg-transparent shadow-0 border-o' : ''}`} style={{width: width}}>
      <div className="content">
        <div>
          <div className="d-flex mb-10">
            <div>
              <div className='rev_avatar rounded-m me-2' style={{width: '40px'}} dangerouslySetInnerHTML={{ __html: author.avatar }} />
            </div>
            <div className="d-flex flex-column">
                <h6 className="font-14 lh-1">{author.name}</h6>
                <span className="lightText font-10">{date.human_diff}</span>
            </div>
            <div className="ms-auto align-self-end">
              
            </div>
          </div>
          <div className="divider mb-10"/>
          <div className="rev_content">
            <h5>{title}</h5>
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
            <p className="line-height-m pt-2">
            {content}
          </p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default SingleReview;
