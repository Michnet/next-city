import { Heading1 } from "@/components/UI/partials/headings/Heading1"
import Search from "@/components/UI/search/Search"
import { Client } from "react-hydration-provider"
import RelatedByTaxSplide from "../RelatedByTaxSplide"
import { memo } from "react";

function RelatedListingsConst({category, type=null, locations, dir_categories, listingId}) {
  return (
    <Client>
              <div className="pt-3 hide_if_empty">
                <RelatedByTaxSplide type={type} nextUpdater random taxonomy={`category`} taxName={category?.name} slug={category?.slug} ids={dir_categories} exclude={listingId}/>
                <Heading1 exClass="mx-3 mb-0" title={'More Options'} subtitle={'Other Pages you may like'}/>
                <Search type={type} columnObj={{0: 1, 420: 2, 600: 3, 992:2, 1024:3,1240: 4}} propQuery={{category: category?.slug, exclude:listingId}} hideHeading={true}/>
                </div>
              {locations?.length > 0 && 
                <>
                  <div className="pt-3 hide_if_empty"><RelatedByTaxSplide type={type} taxonomy={`region`} slug={locations[0]?.slug} taxName={locations[0]?.name} exclude={listingId}/></div>
                </>}
        </Client>
  )
}

const RelatedListings = memo(RelatedListingsConst);
export default RelatedListings;