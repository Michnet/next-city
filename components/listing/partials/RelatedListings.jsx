import { Heading1 } from "@/components/UI/partials/headings/Heading1"
import Search from "@/components/UI/search/Search"
import { Client } from "react-hydration-provider"
import RelatedByTaxSplide from "../RelatedByTaxSplide"
import { memo } from "react";

function RelatedListingsConst({category, locations, dir_categories, listingId}) {
  return (
    <Client>
              <div className="pt-3 hide_if_empty">
                <RelatedByTaxSplide nextUpdater random taxonomy={`category`} taxName={category?.name} slug={category?.slug} ids={dir_categories} exclude={listingId}/>
                <Heading1 exClass="mx-3 mb-0" title={'More Options'} subtitle={'Other Pages you may like'}/>
                <Search propQuery={{category: category?.slug, exclude:listingId}} hideHeading={true}/>
                </div>
              {locations?.length > 0 && 
                <>
                  <div className="pt-3 hide_if_empty"><RelatedByTaxSplide taxonomy={`region`} slug={locations[0]?.slug} taxName={locations[0]?.name} exclude={listingId}/></div>
                </>}
        </Client>
  )
}

const RelatedListings = memo(RelatedListingsConst);
export default RelatedListings;