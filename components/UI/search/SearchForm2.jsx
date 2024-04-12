import  { useState, useEffect} from 'react';
import { useRouter } from 'next/router';
import { Dir_tags, Dir_categories, Dir_locations } from '@/public/data/localCache';
import { closeMenus } from '@/helpers/appjs';
import { siteColors } from '@/helpers/base';
import { randomEither } from '@/helpers/universal';

const SearchForm2 = ({cancelSearchModal}) => {

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
  const [summary, setSummary] = useState(true);

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
//console.log(selectTags);
/* function  processTagsTitle(tagOptions){
  let arrView;
  if(tagOptions && tagOptions.length > 0){
      arrView = <> {tagOptions.map((tag) => {
        return <span>{tag.replace(/&amp;/g, '&')}<span onClick={() => setupTags(tag, selectTags, setSelectTags)} className='clear_tag'>x</span></span>;
      }) }</>
  }

  return arrView;
} */
let featuresView;

if(tagList.length > 0){

  function theArr(tagz){
    let arr = [];
    tagz.map((tag) => {
      arr.push(tag.label)});

      return arr;
  }
  let colorClass = `color-${randomEither(siteColors)}-dark`;
  if(tagList.length > 1){
    
    let tempArr = [...tagList];
    const lastTag = tempArr.pop();
    const firstPart = tempArr.map((tag) => {
      return <span><span className={`hint _tag ${colorClass}`} dangerouslySetInnerHTML={{__html: tag}}/>, </span>
    });
    const lastPart = (<span className={`hint _tag ${colorClass}`}>{lastTag}</span>)
    featuresView = <>{firstPart.concat(" and ", lastPart)}</>
  }else{
    featuresView = <>{<span className={`hint _tag ${colorClass}`}>{tagList.toString()}</span>}</>
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

function setupTagsWithLabels(e){
  setupTags(e.target.value, selectTags, setSelectTags); 
  setupTags(e.target.label, tagList, setTagList)
}

  let filled = parentCat.id != baseCat || parentLoc.id != 0 || selectTags.length > 0 || keyword?.length > 0;

  return (
    <div className='search_form'>
        
        <div class="form-bg">
    <div class="container">
                <div class="form-container shadow-none bg-transparent">
                {summary && <>{filled && 
                  <div className='search-description rounded-8 p-3 mb-4 border-type-1 position-sticky bg-theme z-2' style={{top: '10px'}}>
                    <p className='descript_wrap'> Searching 
                      {keyword && <span> for <span className='hint fw-600 color-theme text_underline'>{keyword}</span></span>}
                      {<span> in <span className={`hint color-${randomEither(siteColors)}-dark`} dangerouslySetInnerHTML={{__html : `${parentCat.name ? parentCat.name : 'all'}`}}/> listings</span>}
                      {parentLoc.name && <span> located in <span className={`hint color-${randomEither(siteColors)}-dark`} dangerouslySetInnerHTML={{__html: parentLoc.name}}/></span>}
                      {selectTags?.length > 0 && <span> with {featuresView}</span>}
                    </p>
                  </div>}</>}
                    <form class="form-horizontal">
                        <div class="form-group">
                            <label className="color-highlight text-uppercase font-700 font-11 pos-relative mb-0">Key word(s)</label>
                            <input placeholder="Enter Key words ..." onChange={(e) => setKeyword(e.target.value)} type="text" class="form-control" />

                           {/*  <div className="input-style has-borders no-icon mb-4 input-style-always-active">
                                <label className="color-highlight text-uppercase font-700 font-11">Key word(s)</label>
                                <input placeholder="Enter Key words ..." onChange={(e) => setKeyword(e.target.value)} type="text"/>
                            </div> */}
                        </div>
                        {catOptions && 
                          <div class="form-group">
                            <div className="input-style has-borders no-icon mb-4 input-style-always-active">
                                <label className="color-highlight text-uppercase font-700 font-11">Category</label>
                                <select value={parentCat.id}
                            onChange={(e) => {selectParent(e.target.value, catOptions, setGrandCatId, setParentCat, Dir_categories);}}>
                                  {createOptions(catOptions, parentCat, grandCatId, 'All Categories', 106)}
                                </select>
                                <span><i className="fa fa-chevron-down"></i></span>
                            </div>
                          </div>
                        }
                        {locOptions && 
                          <div class="form-group">

                            <div className="input-style has-borders no-icon mb-4 input-style-always-active">
                                <label className="color-highlight text-uppercase font-700 font-11">Location</label>
                                <select value={parentLoc.id}
                            onChange={(e) => selectParent(e.target.value, locOptions, setGrandLocId, setParentLoc, Dir_locations)}>
                                  {createOptions(locOptions, parentLoc, grandLocId, 'Everywhere', 0)}
                                </select>
                                <span><i className="fa fa-chevron-down"></i></span>
                            </div>
                          </div>}
                        <div class="form-group _features">
                        <label className="color-highlight text-uppercase font-700 font-11 pos-relative ms-2 mb-0">Tags</label>
                                {/* <p className='group_status lh-13 opacity-70 ms-2'>{processTagsTitle(tagList)}</p> */}
                            <div className="input-style has-borders no-icon mb-4 input-style-always-active">
                               
                                <select  multiple>
                                {createTagOptions(tagOptions, 'All Features')}
                                </select>
                                <span><i className="fa fa-chevron-down"></i></span>
                            </div>
                        </div>
                    </form>
                </div>
    </div>
</div>

      
        <div className='position-sticky row_flex justify-between align-items-center' style={{bottom: '20px'}}>
            <button className='btn btn-theme rounded-22 px-35' onClick={() => {closeMenus(); onSubmit()}}>Search</button>
            {filled && <button className="btn btn-xs mb-0 btn-secondary px-3 bg-theme color-theme border opacity-70" onClick={() => setSummary(!summary)}>{summary ? 'Hide Summary' : 'Show Summary'}</button>}
        </div>
    </div>
  );
};

export default SearchForm2;