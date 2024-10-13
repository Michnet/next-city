"use client";

import { useEffect, useState } from "react";
import { LoaderDualRingBoxed } from "../skeletons/Loaders";

const FAQs = ({postID, faqs, exClass=''}) => {

    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
      if(faqs?.length >  0){
        setLoading(false);
      }
    
      return () => {
        setLoading(true);
      }
    }, [postID, faqs]);
    
   
    return (
      <><div className={`border-0 accordion-s ${exClass}`}>
        {loading ? <LoaderDualRingBoxed/> : <>
        {faqs?.length > 0 ? 
        <>
        <div className="accordion border-0 accordion-s" id={`accord_${postID}`}>{
          faqs.map((item, index) => (
                <div key={index} className="accordion-item">
                    <button aria-expanded={index == 0 ? true : false} className="accordion-button collapsed px-0 bb-thin" type="button" data-bs-toggle="collapse" data-bs-target={`#accord_${postID}_${index}`}>
                    <span className="line-height-s faq_qn">{item.faq_question}</span>
                    <i className="bi bi-plus font-20"></i>
                    </button>
                    <div id={`accord_${postID}_${index}`} className={`accordion-collapse collapse ${index == 0 ? 'show' : ''}`} data-bs-parent={`#accord_${postID}`}>
                    <p className="pb-3 opacity-60 faq_ans">
                     {item.faq_answer}
                    </p>
                    </div>
                </div>
        ))}</div></> : <div>No questions answered yet</div>
        }</>
        }
        </div>
      </>
    );
  };
  
  export default FAQs;
  