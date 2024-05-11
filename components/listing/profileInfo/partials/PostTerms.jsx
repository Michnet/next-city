import { DualColorHeader } from "@/components/UI/Partials";
import TermTag from "@/components/UI/partials/TermTag";
import Widget from "@/components/UI/partials/Widget";
import { getLocalTaxonomy } from "@/helpers/rest";
import { useEffect, useState } from "react";

const PostTerms = ({post, termKey, title,taxonomy, linkTax}) => {
    const [terms, setTerms] = useState(null)

  let termsView;

  useEffect(() => {
    if(post){
      const termIds = post[`${termKey}`];
      if(termIds){
      getLocalTaxonomy({include_ids: termIds, setter:setTerms, taxonomy:taxonomy});
    }
  }
  }, [post]);
   
    if(terms?.length > 0){
      termsView = <Widget freeHeader
                    title= {title}
                    headless = {title ? false : true}
                    >
                      <div className="listing_tags">
                        {terms.map((item) => {
                          return <TermTag linkTax={linkTax} key={item.id} term={item} type={'icon-box'} collection/>
                        })}
                      </div>
                    </Widget>
    }else{
        termsView = <></>
    }
    return <>{termsView}</>
}

export default PostTerms