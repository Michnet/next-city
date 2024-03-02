import { useEffect, useState } from "react";
import { LoaderDualRingBoxed } from "../skeletons/Loaders";

const FAQs = ({postID, faqs}) => {

    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
      if(faqs?.length >  0){
        console.log('seeen it', faqs);
        setLoading(false);
      }else{
        console.log('Not seeen', faqs)
      }
    
      return () => {
        setLoading(true);
      }
    }, [postID, faqs]);
    
   
    return (
      <><div className="border-0 accordion-s">
        {loading ? <LoaderDualRingBoxed/> : <>
        {faqs?.length > 0 ? 
        <div class="accordion border-0 accordion-s" id={`accord_${postID}`}>{
          faqs.map((item, index) => (
                <div key={index} class="accordion-item">
                    <button aria-expanded={index == 0 ? true : false} class="accordion-button collapsed px-0 bb-thin" type="button" data-bs-toggle="collapse" data-bs-target={`#accord_${postID}_${index}`}>
                    <span class="font-600 font-13 line-height-s">{item.faq_question}</span>
                    <i class="bi bi-plus font-20"></i>
                    </button>
                    <div id={`accord_${postID}_${index}`} class={`accordion-collapse collapse ${index == 0 ? 'show' : ''}`} data-bs-parent={`#accord_${postID}`}>
                    <p class="pb-3 opacity-60">
                     {item.faq_answer}
                    </p>
                    </div>
                </div>
        ))}</div> : <div>No questions answered yet</div>
        }</>
        }
        </div>
      </>
    );
  };
  
  export default FAQs;
  