import { useEffect, useState } from "react";
import { Dir_categories } from "@/public/data/localCache";
import { cleanHtml } from "@/helpers/universal";
import { ActiveQueryOption } from "@/components/UI/Partials";


const CategorySearch = ({category, setCategory, params, setParams, categories, query}) => {
  const {slug} = category ?? {}

  let baseCat = 106;

  const [selectedItem, setSelectedItem] = useState(null);
  const [options, setOptions] = useState(categories ?? null);
  const [selectedID, setSelectedID] = useState(baseCat);


  function parentTerm(){
    if(selectedItem?.slug){
      return selectedItem.slug
    }else
    if(slug) {
        return slug; 
    }else{
        return 'events';
    }
}
function reset(){
  setSelectedItem(null);
  setSelectedID(baseCat);
  if(setCategory){
  setCategory(null);
  }
  setOptions(Dir_categories?.filter((el) => el.parent == baseCat));
  const tempObj = {...params}
  delete tempObj['category'];
  setParams({...tempObj});
}
  let payload ={
    parent_slug : parentTerm()
  }
 

  function getTerms(){
    //const theTerms = await getDirTerms('categories', payload);
    let theTerms = selectedID ? Dir_categories?.filter((el) => el.parent == selectedID) : Dir_categories?.filter((el) => el.parent == baseCat);
    if(theTerms?.length > 0){
      setOptions(theTerms);
    }else{
      setOptions(null)
    }
  }

  useEffect(() => {
    if(categories){
      return;
    }else{
      getTerms();
    }
  }, []);

  useEffect(() => {
    if(selectedID != baseCat){
    setParams({...params, category : selectedItem?.slug});
   }
   getTerms();
  }, [selectedItem, selectedID, Dir_categories]);

  useEffect(() => {
    if(category){
    setSelectedItem(category);
    }
  }, [category])
  
  
/* 
  const handleOptionClick = (item) => {
    setSelectedItem(item);
  };
 */
  const handleOptionClick = (id) => {
    setSelectedID(id)
    setSelectedItem(options.filter((el) => el.id == id)[0]);
  };

  let baseState = selectedID == null || selectedID == 'undefined' || selectedID == baseCat;

  return (
    <>
      {query && query['category'] && <ActiveQueryOption query={query} queryKey="category"/>}
      <div className="searchMenu-loc lg:px-0 js-form-dd js-liverSearch">
      <div
          data-bs-toggle="dropdown"
          data-bs-auto-close="true"
          data-bs-offset="0,22"
        >
          <div className="option_box mb-1">{selectedItem ? <h3 className="text-16">{selectedItem?.name}</h3> : <></>}</div>
        </div>

        <div >
            {options?.length > 0 &&
              <select value={selectedID} onChange={(e) => handleOptionClick(e.target.value)}>
              {options?.length > 0 ? <option value={selectedID} className="gray_text">{baseState ? 'Choose a category' : 'Choose a subcategory'}</option> : <></>}
              {options.map((item) => (
                <option className={`-link d-block col-12 text-left rounded-4 px-20 py-15 js-search-option mb-1 ${ selectedItem && selectedItem.id === item.id ? "active" : "" }`}
                  key={item.id}
                  role="button"
                  value={item.id}
                >
                        {cleanHtml(item.name)}
                </option>
              ))}
            </select>}
          {baseState ? <></> : <button type="button" className="btn-outline-secondary btn btn-sm rounded" onClick={() => reset()}>Reset</button>}
        </div>
      </div>
    </>
  );
};

export default CategorySearch;
