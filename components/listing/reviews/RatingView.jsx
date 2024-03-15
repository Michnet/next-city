const RatingView = ({rating, id}) => {
    return (<>
        {rating ? <div className="d-flex -flex-row flex-nowrap mb-0 align-items-center">
            <strong className="color-theme pe-2">{rating}</strong>
            <div id={`score_stars_${id}`} className='score_stars'
            style={{
                width: '100px',
                height: '18px',
                backgroundColor: 'var(--bs-gray-200)',
                backgroundImage: 'linear-gradient(45deg, var(--highlight), #FF9800)',
                maskImage: `url(/img/general/stars.svg)`,
                backgroundSize: `${parseFloat(rating)*10}% 100%`,
                backgroundRepeat: 'no-repeat',
                maskRepeat: 'no-repeat'
            }}
            />                    
        </div>
        :<></>}
        </>
    )
}

export default RatingView;