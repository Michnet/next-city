import  {useEffect, useState} from 'react';
// import { submitReview } from '../../../../server/WpRest';
//import { useAuth } from '../../../../util/use-auth';
// import ReviewCard from './parts/ReviewCard';
// import GuestPrompt from 'routes/userAuth/GuestPrompt';
// import { LoaderDualRingBoxed } from '../../skeletons/React-content-loader/Loaders';
import { useRecoilState } from 'recoil';
import { authState } from '@/contexts/atoms';
import { submitReview } from '@/helpers/rest';
import ReviewCard from './ReviewCard';
import GuestPrompt from '@/components/UI/GuestPrompt';
import { LoaderDualRingBoxed } from '@/components/skeletons/Loaders';
//import CallToActions from '@/components/UI/CallToActions';

function ReviewSubmit({source_id, reloadAll, author_id}) {

    const initialScore = 7;
    const field_step = 0.5;
    const field_max = 10;

    let formView;

    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [customerService, setCustomerService] = useState(initialScore);
    const [ambiance, setAmbiance] = useState(initialScore);
    const [pricing, setPricing] = useState(initialScore);
    const [expertise, setExpertise] = useState(initialScore);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    //const [collection, setCollection ] = useState(null)

    const [theAuth, setTheAuth] = useRecoilState(authState);
    const {user} = theAuth;
    
    let userOwned = user?.id === author_id; 

    useEffect(() => {
      setLoading(false);
      setResponse(null);
    }, [user, source_id]);  
    
    const  paramArr = [
        {
            field_label : "Customer Service",
            field_value : customerService,
            field_setter: setCustomerService
        },
        {
            field_label : "Ambiance",
            field_value : ambiance,
            field_setter: setAmbiance
        },
        {
            field_label : "Expertise",
            field_value : expertise,
            field_setter: setExpertise
        },
        {
            field_label : "Pricing",
            field_value : pricing,
            field_setter: setPricing
        }
    ]

    async function submitScore(){
        const  dataArr = [
            {
                field_label : "Customer Service",
                field_value : customerService,
                field_step,
                field_max
            },
            {
                field_label : "Ambiance",
                field_value : ambiance,
                field_step,
                field_max
            },
            {
                field_label : "Expertise",
                field_value : expertise,
                field_step,
                field_max
            },
            {
                field_label : "Pricing",
                field_value : pricing,
                field_step,
                field_max
            }
        ]
        const payload = {
        source_id : source_id,
        title : title,
        content : description,
        author_id : user.id,
        rating_data : JSON.stringify(dataArr)
       
       }
       setLoading(true);
       const score = await submitReview(payload);
       if(score){
        const {user_meta} = score.data.data;
            if(user_meta){
                let oldUser = theAuth.user;
                let oldUserMeta = oldUser.user_meta;
                console.log('setTheAuth', theAuth)
                setTheAuth({...theAuth, user: {...oldUser, user_meta:{...oldUserMeta, reviewed : user_meta}}});
            }
           setResponse(score.data);
           setLoading(false);
           reloadAll();
       }else{
         setLoading(false);
       }
    }

    if(loading){
        formView = <div className='d-flex align-items-center'><LoaderDualRingBoxed/></div>
    }else{if(user){
        if(userOwned){
            formView = <></>
        }else{
            if(!response){
                if(loading){
                    formView = <div className='d-flex align-items-center'><LoaderDualRingBoxed/></div>
                }else{
            formView = (
                <><div className='mb-20 mt-10 sc_heading_3'>
                    <h5>Let others know</h5>
                    <h4>Add a review</h4>
                </div>
                    <div className='d-flex flex-column'>
                    <input type={'text'} showCount maxLength={20} onChange={e => setTitle(e.target.value)} placeholder='Review Title' className='review_title d-block'/>
                    <textArea rows={3} showCount maxLength={300} onChange={e => setDescription(e.target.value)} placeholder="A brief description of your review" className='review_descript d-block'/>
                    </div>
                
                <div className="review_criteria">
                    {paramArr.map((item, i) => {
                    let {field_label, field_value, field_setter} = item;
                     return  <div className="review_item" key={i}>
                                <h5>{field_label}</h5>
                                <div className="review_score">
                                    <div className='slider_box'> 
                                        <input onChange={(e) => field_setter(e.target.value)} type="range" class="form-range" min={0} max={field_max} value={field_value} step={field_step}/>
                                    </div> 
                                    <div className="score_box">
                                        <h4>{field_value}</h4><span>/10</span>
                                    </div>
                                </div>
                            </div>
                    })
                    }
                    </div>
                    <div className="footer">
                        <button className='btn btn-theme radius-30' onClick={submitScore}>Submit</button>
                    </div>
                </>
            )}}else{
                const {data} = response;
                formView = <ReviewCard review={data.item} noTime/>
            }
        }
        
    }else{
        formView = (
            <>
                <GuestPrompt title={'Login/Register to add a review'}/>
            </>
        )
    }
    }



 
  return (
    <div className='review_form' key={source_id}>  

        {formView}

   </div>
  )
}

export default ReviewSubmit