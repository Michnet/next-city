import { LoaderEllipsis } from '@/components/skeletons/Loaders';
import { deleteReview } from '@/helpers/rest';
import  {useEffect, useState} from 'react';
//import { BSModal } from '~/appComponents/components/UI/components';
//import EditReview from '../EditReview';

function ReviewCard({review, user, listingId, noTime, reload}){
    const [editable, setEditable] = useState(false);
    const [deleted, setDeleted] = useState(false);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);

    const {rating, id} = review ?? {}

    useEffect(() => {
      setLoading(false)
    
      return () => {
        setLoading(false);
      }
    }, [review])
    
    let itemView, buttonView, ratingView, userView;

    
    async function deleteIt(){
        const payload = {
            id: review.id,
            post_id : listingId,
            author : user.id,           
           }
           setLoading(true);
           const score = await deleteReview(payload);
           if(score){
            const {success, data} = score.data;
            if(success){
              setLoading(false); 
              setDeleted(true);
              reload();
            }
        }            
            /* const {user_meta} = score.data;
            if(user_meta){
                let oldUser = theAuth.user;
                let oldUserMeta = oldUser.user_meta;
                setTheAuth({...theAuth, user: {...oldUser, user_meta:{...oldUserMeta, reviewed : user_meta}}});
            }
               setResponse(score.data);
               reloadAll(); */
           
    }
    
    if(!loading){

        const {author, date, content, title, rating_data} = review;

        userView = <>
        { <div className='rev_avatar' dangerouslySetInnerHTML={{ __html: author.avatar }} /> }
                                <div className='user_meta'><h5 className='author_name'>{author.name}</h5>
                                {noTime ?  <></> : <span className='rev_date'> {date.human_diff}</span>}</div>
                                </>

        if(user){
            const userId = user.id;
            const authorId = parseInt(author.id)
            if(userId === authorId){
            buttonView = <div className='review_actions d-flex flex-row gap-2'>
                <button className='btn btn-sm btn-secondary user_actions' onClick={() => setEditable(true)}>Edit Review</button>
                <button className='btn btn-sm  btn-outline-secondary user_actions' data-bs-target="#delete_review" data-bs-toggle='modal'>Delete Review</button>
                </div>
            }
        } 

        if(rating){
            const computed = parseFloat(rating)/10;
            ratingView = <>
                <span className=' card_score'>
                    {computed}
                </span>                
                </>
        }
        let perc = parseFloat(rating)
        const scores = <>{open?  rating_data.map((criteria) => {
            const {field_max, field_label, field_value} = criteria;
                return (
                    <div className='criteria_score d-grid flex-row' key={criteria.field_label}>
                        <h6 className='criteria_name'>{criteria.field_label}</h6>
                        <div className='score_base overflow-hidden' style={{height: '10px', background: 'var(--bs-gray-200)'}}>
                            <div className='score_line' style={{height: '100%',  width: `${(field_value/field_max)*100}%`}}/>
                        </div>
                    </div>
                );
        }) : <div><div id={`score_stars_${id}`} className='score_stars'
                style={{
                    width: '130px',
                    height: '40px',
                     backgroundColor: 'var(--bs-gray-200)',
                    backgroundImage: 'linear-gradient(45deg, var(--theme), #29ff75)',
                    maskImage: `url(/img/general/stars.svg)`,
                    backgroundSize: `${parseFloat(rating)}% 100%`,
                    backgroundRepeat: 'no-repeat',
                    maskRepeat: 'no-repeat'
                  }}
                />
            </div>}</>
        if(deleted){
            itemView = <div><p>Review deleted successfully</p></div>

        }else{
            if(!editable){
            itemView = <>
                    <div className="side_sec user_content d-none d-md-block">
                            {userView}
                    </div>
                    <div className='main_sec'>
                    <div className="d-block d-md-none px-20 pt-20 d-flex flex-row gap-3 align-items-center">
                            {userView}
                    </div>
                    <div className="body_sec">
                        <div className="review_content">
                            <div className='_content'>
                                <h5 className='rev_title '>{title}</h5>
                                <p className='rev_content'>{content}</p>
                            </div>
                            <div className='_rating'>
                                {ratingView}
                            </div>
                        </div>
                        {scores}
                        <button className='btn btn-sm border-light mb-10' onClick={() => setOpen(!open)}>{open ? 'Hide detail' : 'Show Detail'}</button>
                        </div>
                    <div className="footer_sec">
                    {buttonView }
                    </div>
                    </div>
                </>
            }else{
                itemView = <div clasName='w-100'>
                {/* <EditReview review={review} listingId={listingId}/> */}
                <button className='user_actions btn btn-warning _cancel' onClick={() => setEditable(false)}>Cancel</button>
                </div>
            }
        }
    }else{
        itemView = <div><LoaderEllipsis/></div>
    }

   

    let deleter = <div className="card">
                    <div className="card-header">
                    Confirm Action
                    </div>
                    <div className="card-body">
                    {/* <h5 className="card-title">Special title treatment</h5> */}
                    <p className="card-text mb-20">Are you sure you want to delete this review?</p>
                    <button className="btn btn-outline-theme" data-bs-target="#delete_review" data-bs-dismiss='modal' onClick={() => deleteIt()}>Yes, delete it</button>
                    <button className="btn btn-theme" data-bs-target="#delete_review" data-bs-dismiss='modal'>No, keep it</button>
                    </div>
                </div>

  return (
    <><div className='review_card'>
        {itemView}
    </div>
    {/* <BSModal noPadding centered noOverlay modal_id={'delete_review'} content={deleter}/> */}
    </>
  )
}

export default ReviewCard