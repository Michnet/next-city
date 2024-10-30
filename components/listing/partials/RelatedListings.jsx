"use client";

import { Heading1 } from "@/components/UI/partials/headings/Heading1"
import Search from "@/components/UI/search/Search"
import { Client } from "react-hydration-provider"
import RelatedByTaxSplide from "../RelatedByTaxSplide"
import { memo } from "react";
//import LazyLoad from "react-lazyload";

function RelatedListingsConst({category, type=null, locations, dir_categories, listingId}) {
  return (
    <Client>
              <div className="pt-3 hide_if_empty">
                <RelatedByTaxSplide titleComp={<Heading1 exClass='px-3 mb-2'  title={`More ${type}s`} subtitle={`Other ${type}s you may like`}/>} type={type} nextUpdater random  exclude={listingId}/>
                <RelatedByTaxSplide random taxonomy={`category`} taxName={category?.name} slug={category?.slug} ids={dir_categories} exclude={listingId}/>
                {locations?.length > 0 && 
                <>
                  <div className="pt-3 hide_if_empty"><RelatedByTaxSplide  taxonomy={`region`} slug={locations[0]?.slug} taxName={locations[0]?.name} exclude={listingId}/></div>
                </>}
                   {/* <Heading1 exClass="mx-3 mb-0" title={'More Options'} subtitle={'Other Pages you may like'}/> */}
                  <Search title='Explore' subtitle={'Other Pages you may like'} type={type} columnObj={{0: 1, 420: 2, 600: 3, 992:2, 1024:3,1240: 4}} propQuery={{category: category?.slug, exclude:listingId}} hideHeading={true}/>
                </div>
        </Client>
  )
}

const RelatedListings = memo(RelatedListingsConst);
export default RelatedListings;