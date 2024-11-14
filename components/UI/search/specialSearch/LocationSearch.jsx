import { useEffect, useState } from "react";
//import { useRecoilValue } from "recoil";
import { ActiveQueryOption } from "@/components/UI/Partials";
//import { siteState } from "~/appComponents/contexts/siteContext";
import { Dir_locations } from "@/public/data/localCache";
//import { getDirTerms } from "~/server/WpRest";
import { cleanHtml } from "@/helpers/universal";

const LocationSearch = ({params, setParams, query, locations, region}) => {
  //const {slug} = region;
  let baseCat = 0;

  const [options, setOptions] = useState(locations ?? null);
  const [selectedItem, setSelectedItem] = useState(query && query['region'] ? {slug: query['region']} : null);
  const [selectedID, setSelectedID] = useState(query && query['region'] ? Dir_locations.filter((el) => el.slug == query['region'])[0].id : baseCat);


  /* function parentTerm(){
    if(selectedItem?.slug){
      return selectedItem.slug
    }else
    if(slug) {
        return slug; 
    }else{
      if(query && query['region']){
        return query['region'];
      }else{
        return null;
      }
    }
  } */

  //const {Dir_locations} = useRecoilValue(siteState);

function reset(){
  setSelectedID(null)
  setSelectedItem(null);
  setOptions(Dir_locations?.filter((el) => el.parent == 0));
  const tempObj = {...params}
  delete tempObj['region'];
  setParams({...tempObj});
}
  let payload = {per_page: 100}
  if(selectedID){
    payload.parent = selectedID;
  }else{
    payload.parent = 0 
  }

  function getTerms(){
    let theTerms = Dir_locations?.filter((el) => el.parent == selectedID);
    if(theTerms?.length > 0){
      setOptions(theTerms);

    }else{
      setOptions(null)
    }
  }

  useEffect(() => {
    if(options){
      return;
    }else{
      getTerms();
    }
  }, []);

  useEffect(() => {
    if(selectedID){
    setParams({...params, region : selectedItem?.slug});
    getTerms();
    }
  }, [selectedID, Dir_locations]);
  

  const handleOptionClick = (id) => {
    setSelectedID(id)
    setSelectedItem(options.filter((el) => el.id == id)[0]);
  };

  return (
    <>
    {query && query['region'] && <ActiveQueryOption query={query} queryKey="region"/>}
    <div className="searchMenu-loc lg:px-0 js-form-dd js-liverSearch">
      <div
        data-bs-toggle="dropdown"
        data-bs-auto-close="true"
        data-bs-offset="0,22"
      >
        <div className="option_box mb-1">{selectedItem ? <h3 className="text-16">{cleanHtml(selectedItem?.name)}</h3> : <></>}</div>
      </div>

      <div >
          {options?.length > 0 &&
            <select value={selectedID} onChange={(e) => handleOptionClick(e.target.value)}>
            {options?.length > 0 ? <option value={selectedID} className="gray_text">{selectedID != 0 ? 'Choose a sublocation' : 'Choose Location'}</option> : <></>}
            {options.map((item) => (
              <option
                className={`-link d-block col-12 text-left rounded-4 px-20 py-15 js-search-option mb-1 ${
                  selectedItem && selectedItem.id === item.id ? "active" : ""
                }`}
                key={item.id}
                role="button"
                value={item.id}
              >
                      {cleanHtml(item.name)}
              </option>
            ))}
          </select>}
        {selectedID != 0 && <button type="button" className="btn-outline-secondary btn btn-sm rounded" onClick={() => reset()}>Reset</button>}
      </div>
    </div>
    </>
  );
};

export default LocationSearch;
