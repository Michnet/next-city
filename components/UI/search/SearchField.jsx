import { advancedFetchListings } from "@/helpers/rest";
import { useComputed, useSignal, useSignalEffect } from "@preact/signals-react"

function SearchField() {
  let keyWordObj = useSignal('');
  let keyWord = useComputed(() => keyWordObj.value);

  useSignalEffect(() => {
    console.log('kewyord', keyWordObj)
    if(keyWord?.length > 2){
        const listings = advancedFetchListings({keyword:keyWordObj.value});
        if(listings){
            console.log('search list', listings)
        }
    }
  });

  return (
   <>
   <div className="content mt-n4">
            <div className="search-box bg-theme color-theme rounded-m shadow-l">
                <i className="fa fa-search"></i>
                <input type="text" className="border-0" placeholder="Search for a place... (try island)" data-search onChange={(e) => {keyWordObj.value = e.target.value}}/>
				<a href="#" className="clear-search disabled no-click mt-0"></a>
				<a href="#" data-menu="menu-filter" className="color-theme"><i className="fa fa-sliders me-n3"></i></a>
            </div>
            <div className="search-results disabled-search-list mt-3">
                <div className="card card-style mx-0 px-2 p-0 mb-0">
                    <a href="#" className="d-flex py-2" data-filter-item data-filter-name="all maldives tropical island escape">
                        <div>
                            <img src="/images/travel/6s.jpg" className="rounded-sm me-3" width="50" alt="img"/>
                        </div>
                        <div>
                            <span className="color-highlight font-400 d-block pt-0 text-uppercase font-10">Tropical Island</span>
                            <strong className="color-theme font-16 d-block mt-n2">Maldives</strong>
                        </div>
                        <div className="ms-auto text-end align-self-center pe-2">
                            <h5 className="line-height-xs font-18 pt-3">$1450</h5>
                            <span className="font-10 d-block mt-n2">For 7 Nights</span>
                        </div>
                    </a>
                </div>
            </div>
        </div>
        <div className="search-no-results disabled mt-4">
            <div className="card card-style">
                <div className="content">
                    <h1>No Results</h1>
                    <p>
                        Your search brought up no results. Try using a different keyword. Or try typying all
                        to see all items in the demo. These can be linked to anything you want.
                    </p>
                </div>
            </div>
        </div>
   </>
  )
}
export default SearchField