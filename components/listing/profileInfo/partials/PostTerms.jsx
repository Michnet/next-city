//import { DualColorHeader } from "@/components/UI/Partials";
//import TermTag from "@/components/UI/partials/TermTag";
import Widget from "@/components/UI/partials/Widget";
import { getLocalTaxonomy } from "@/helpers/rest";
import Link from "next/link";
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
      termsView = <Widget 
                    title= {title}
                    headless = {title ? false : true}
                    >
                      <div className="listing_tags">
                        {terms.map((item) => {
                          const {name, taxonomy, slug } = item ?? {};
                          return <Link href={`/explore?${linkTax}=${slug}`} className={'icon-box color-theme'}>

                            <span className="gx-media-body row_flex gap-2 justify-between mb-2 align-items-center">
                              <span  className="gx-text-truncate icon_text" dangerouslySetInnerHTML={{__html: name}}/>
                              <i className='far fa-chevron-right opacity-40'/>
                            </span>
                          </Link>
                        })}
                      </div>
                    </Widget>
    }else{
        termsView = <></>
    }
    return <>{termsView}</>
}

export default PostTerms