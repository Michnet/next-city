import  { useState, useEffect} from 'react';
import { useRouter } from 'next/router';
import { Dir_tags, Dir_categories, Dir_locations } from '@/public/data/localCache';
import { closeMenus } from '@/helpers/appjs';

const SearchForm1 = ({cancelSearchModal}) => {

  const baseCat = 106;

  const [catOptions, setCatOptions] = useState(null);
  const [keyword, setKeyword] = useState(null);
  const [parentCat, setParentCat] = useState({id : baseCat, slug : 'events'});
  const [grandCatId, setGrandCatId] = useState(null);
  
  const [locOptions, setLocOptions] = useState(null);
  const [parentLoc, setParentLoc] = useState({id : 0});
  const [grandLocId, setGrandLocId] = useState(null);

  const [tagOptions, setTagOptions] = useState(null);
  const [selectTags, setSelectTags] = useState([]);
  const [tagList, setTagList] = useState([]);

  const router = useRouter();


  function createOptions(catOptions, parentCat, grandCatId, placeholder, baseId){
    let optionsArr = [];
    if(parentCat){
      if(parentCat.id !== baseId){
        if(catOptions.length > 0){
         optionsArr.push(<option disabled value={parentCat.id} dangerouslySetInnerHTML={{__html: 'All in ' + parentCat.name}}/>)
        }else{
          optionsArr.push(<option disabled value={parentCat.id} dangerouslySetInnerHTML={{__html: parentCat.name}}/>)
        }
      }else{
        optionsArr.push(<option className='parent' disabled value={parentCat.id} dangerouslySetInnerHTML={{__html: placeholder}}/>)
      }
    }

    if(parentCat.id !== baseId){
      optionsArr.push(<option className='reset' value={baseId} dangerouslySetInnerHTML={{__html: "Reset"}}/>)
      }
      if(grandCatId){
        optionsArr.push(<option className='reset set-back' value={grandCatId} dangerouslySetInnerHTML={{__html: "Back"}}/>)
        } 
    
    catOptions.map((each) => {
       optionsArr.push(
        <option tagName={each.name} value={each.id} dangerouslySetInnerHTML={{__html:`${each.name}<span class="option-label">${''}</span></p>`}}/>
       )
    });
  
    return optionsArr
  }

  function createTagOptions(catOptions, placeholder){
    let optionsArr = [];
 
    if(selectTags.length > 0){
      optionsArr.push(<option>{selectTags.length} selected</option>)
    }else{
      optionsArr.push(<option >Select Features</option>)
    }
   

    catOptions?.map((each) => {
       optionsArr.push( <>{/* <Option value={parseInt(each.id)} key={each.id}>{each.name}</Option> */}
        { <option selected={selectTags?.includes(each.slug)} onClick={(e) => {
          setupTags(e.target.value, selectTags, setSelectTags); 
          setupTags(e.target.label, tagList, setTagList)
        }} 
          value={each.slug} 
          dangerouslySetInnerHTML={{__html:`${each.name}<span class="option-label">${''}</span>`}}/> }</>
       )
    });

    return optionsArr
  }

  function selectParent(value, catOptions, setGrandCatId, setParentCat, dirCats){
    if(value !== "0"){
      const target = catOptions.filter(el => el.id === parseInt(value))[0];
      if(target){
        if(target.parent !== 0){
          setGrandCatId(target.parent);
        }else{
          setGrandCatId(null)
        }
        setParentCat(target);
      }else{
        const grandTarget = dirCats.filter(el => el.id === parseInt(value))[0];
        if(grandTarget){
          if(grandTarget.parent !== 0){
            setGrandCatId(grandTarget.parent);
          }else{
            setGrandCatId(null)
          }
        setParentCat(grandTarget);}
      }
    }else{
      setParentCat({id : 0});
    }
  }

  useEffect(() => {
    if(Dir_categories){
      const childsArr = Dir_categories.filter(child => child.parent === parentCat.id);
      setCatOptions(childsArr);
    }
  }, [Dir_categories, parentCat]);

  useEffect(() => {
    if(Dir_tags){
    setTagOptions(Dir_tags)
    }
  }, [Dir_tags])
  

  useEffect(() => {
    if(Dir_locations){
      const locsArr = Dir_locations.filter(child => child.parent === parentLoc.id);
      setLocOptions(locsArr);
    }
  }, [Dir_locations, parentLoc]);
  

const onSubmit = () => {

  let payload ={};

  if(parentCat.id !== 0){
    payload.category=parentCat.slug
  }
  if(parentLoc.id !== 0){
    payload.location=parentLoc.slug
  }
  if(keyword){
    payload.search_keywords=keyword
  }
  if(selectTags){
    payload.tag = selectTags.join(',')
  }

  if(cancelSearchModal){
    
    router.push({
      pathname: '/search',
      query: payload
    }); 

    cancelSearchModal();
  }else{
    router.push({
      pathname: '/search',
      query: payload
    }); 
  }

 
};

let featuresView;

if(tagList.length > 0){

  function theArr(tagz){
    let arr = [];
    tagz.map((tag) => {
      arr.push(tag.label)});

      return arr;
  }

  if(tagList.length > 1){
    let tempArr = [...tagList];
    const lastTag = tempArr.pop();
    const firstPart = tempArr.map((tag) => {
      return <span><span className='hint _tag' dangerouslySetInnerHTML={{__html: tag}}/>, </span>
    });
    const lastPart = (<span className='hint _tag'>{lastTag}</span>)
    featuresView = <>{firstPart.concat(" and ", lastPart)}</>
  }else{
    featuresView = <>{<span className='hint _tag'>{tagList.toString()}</span>}</>
  }
 
}

function removeTag(arr, value) {
  var index = arr.indexOf(value);
 
    arr.splice(index, 1);
  
  return arr;
}


function setupTags(value, arr, setArr){
  if(arr.length > 0){
    if(arr.includes(value)){
      setArr(removeTag([...arr], value));
    }else{
      setArr([...arr, value])
    }
  }else{
    setArr([...arr, value])
  }
}


  return (
    <div className='search_form'>
        
        <div class="form-bg">
    <div class="container">
                <div class="form-container shadow-none bg-transparent">
                    <form class="form-horizontal">
                        <div class="form-group">
                            <label>Key word(s)</label>
                            <input placeholder="Enter Key words ..." onChange={(e) => setKeyword(e.target.value)} type="text" class="form-control" />
                        </div>
                        {catOptions && 
                          <div class="form-group">
                          <label>Category</label>
                          <select 
                            className="form-control"
                            value={parentCat.id}
                            onChange={(e) => {selectParent(e.target.value, catOptions, setGrandCatId, setParentCat, Dir_categories);}}>
                            {createOptions(catOptions, parentCat, grandCatId, 'All Categories', 106)}
                          </select>
                          </div>
                        }
                        {locOptions && 
                          <div class="form-group">
                          <label>Location</label>
                          <select 
                            className="form-control"
                            value={parentLoc.id}
                            onChange={(e) => selectParent(e.target.value, locOptions, setGrandLocId, setParentLoc, Dir_locations)}>
                            {createOptions(locOptions, parentLoc, grandLocId, 'Everywhere', 0)}
                          </select>
                          </div>}
                        <div class="form-group _features">
                            <label>Features</label>
                            <select className="form-control" multiple>
                            {createTagOptions(tagOptions, 'All Features')}
                            </select>
                        </div>
                    </form>
                </div>
    </div>
</div>

      

        {!parentCat === {id : 0} || !parentLoc === {id : 0} || selectTags.length > 0 && 
        <div className='search-description rounded-8 p-3 mb-4 border-type-1'>
          <p className='descript_wrap'> Searching 
            {keyword && <span> for <span className='hint fw-600 color-theme'>{keyword}</span></span>}
            {<span> in <span className='hint' dangerouslySetInnerHTML={{__html : `${parentCat.name ? parentCat.name : 'all'}`}}/> listings</span>}
            {parentLoc.name && <span> located in <span className='hint' dangerouslySetInnerHTML={{__html: parentLoc.name}}/></span>}
            {selectTags?.length > 0 && <span> with {featuresView}</span>}
          </p>
        </div>}

        <div className='position-sticky' style={{bottom: '20px'}}>
            <button className='btn btn-theme rounded-22 px-35' onClick={() => {closeMenus(); onSubmit()}}>Search</button>
        </div>
    </div>
  );
};

export default SearchForm1;