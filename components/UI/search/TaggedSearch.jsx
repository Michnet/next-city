import  { useState, useEffect, memo, useMemo } from 'react';
import { useRouter } from 'next/router';
import { Dir_tags, Dir_categories, Dir_locations } from '@/public/data/localCache';
import { TagCloud } from 'react-tagcloud';
//import { Accordion, AccordionBody, AccordionHeader, AccordionItem } from 'react-bootstrap';
//import { Accordion } from 'react-bootstrap';

const TaggedSearchConst = ({accordion, category, location, queryTags, setSearchCat, setSearchTags, modal}) => {

  const router = useRouter();
  const basecat = '106';

  const [catOptions, setCatOptions] = useState(null);
  const [keyword, setKeyword] = useState('');
  const [parentCat, setParentCat] = useState({id : basecat});
  const [grandCatId, setGrandCatId] = useState(null);
  
  const [tags, setTags] = useState(null);
  const [tagOptions, setTagOptions] = useState(null)
  const [selectTags, setSelectTags] = useState([]);
  
  const [locOptions, setLocOptions] = useState(null);
  const [parentLoc, setParentLoc] = useState({id : 0});
  const [grandLocId, setGrandLocId] = useState(null);

  let infoView;

  if(keyword || parentCat.id !== 0 || parentLoc.id !== 0){
      infoView =    <div className='search-description'>
                    <p className='descript_wrap'> Searching 
                        {keyword && <span> for <span className='hint'>{keyword}</span></span>}
                        {<span> in <span className='hint' dangerouslySetInnerHTML={{__html : `${parentCat.name ? parentCat.name : 'all'}`}}/> listings</span>}
                        {parentLoc.name && <span> located in <span className='hint' dangerouslySetInnerHTML={{__html: parentLoc.name}}/></span>}
                    </p>
                    </div>
  }else{
      infoView =    <div className='search-description'>
                        <p className='descript_wrap'> Searching for everything, everywhere
                        </p>
                    </div>
  }

  function createOptions(catOptions, parentCat, grandCatId, placeholder){
    let optionsArr = [];
    
    if(catOptions){
    if(catOptions.length > 0){
    catOptions.map((each) => {
       optionsArr.push(
        { 
            value : each.name.replace(/&amp;/g, '&'), 
            count : each.count ? each.count : each?.extra_meta?.total, 
            props : {...each}
           }
       )
    })}
  }

  
    return optionsArr
  }

  function selectParent(id, catOptions, setGrandCatId, setParentCat, Dir_categories, setSearchVar){
    if(id !== "0"){
      if(setSearchVar){
      setSearchVar(id)
    }
      const target = catOptions.filter(el => el.id === id)[0];
      if(target){
        if(target.parent !== 0){
          setGrandCatId(target.parent);
        }else{
          setGrandCatId(null)
        }
        setParentCat(target);
      }else{
        const grandTarget = Dir_categories.filter(el => el.id === id)[0];
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
    if(category){
      setParentCat(category)
    }
    if(location){
      setParentLoc(location)
    }

    if(queryTags){
      setSelectTags(queryTags);
    }
  }, [category, location, queryTags])

  useEffect(() => {
    if(Dir_locations){
      const locsArr = Dir_locations.filter(child => child.parent === parentLoc.id);
      setLocOptions(locsArr);
    }
  }, [Dir_locations, parentLoc]);

  useEffect(() => {
    if(Dir_tags){
      setTags(Dir_tags);
    }
  }, [Dir_tags]);

  useEffect(() => {
  if(selectTags.length > 0){
    let arr = [];
    selectTags.map((tag) => {
     arr.push(tag.id)
    });
    if(setSearchTags){
    setSearchTags(arr)
    }
  }else{
    if(setSearchTags){
    setSearchTags(null)
    }
  }
  }, [selectTags])
  
  

const submit = () => {

  let payload ={};

  if(parentCat.id !== 0){
    payload.category=parentCat.slug
    
  }
  if(parentLoc.id !== 0){
    payload.location=parentLoc.slug
  }
  if(keyword){
    payload.keyword=keyword
  }

  if(selectTags && selectTags.length > 0){
    var tagArr = [];
    selectTags.map((tag) =>tagArr.push(tag.id));
    payload.tag=tagArr.join(',')
  }

router.push({
    pathname: '/search',
    query: payload
  });  
};

const customRenderer = (tag, size, color) => {
    return (
      <a eventKey={tag.props.id} 
      style={{ 
          color, 
          animation: 'blinker 3s linear infinite',
          animationDelay: `${Math.random() * 2}s`,
          margin: '0 5px 2px 0',
          padding: '3px', 
          fontSize: `15px`,
          display : 'block'
          }} 
        className={`tag-cloud-tag ${tag.props.exClass ? tag.props.exClass : ''}`} >
        {tag.value}
      </a>
    )
  }

  const customTagRenderer = (tag, size, color) => {
    return (
      <a eventKey={tag.props.id} 
      style={{ 
          color, 
          animation: 'blinker 3s linear infinite',
          animationDelay: `${Math.random() * 2}s`,
          margin: '0 5px 5px 0',
          padding: '3px 6px', 
          borderWidth : '1px',
          //fontSize: size,
          display : 'block'
          }} 
        className={`tag-cloud-tag ${tag.props.exClass ? tag.props.exClass : ''} ${selectTags.filter((el) => el.id === tag.props.id).length > 0 ? 'checked' : ''}`} >
        {tag.value}
      </a>
    )
  }

  const color_options = {
    luminosity: 'dark',
   // hue: 'purple',
  }

  function createFilterables(parent, pool){
    const filterables = pool.filter(child => child.parent === parent.id);
    return filterables;
  }


  const filterCats = useMemo(() => createFilterables(parentCat, Dir_categories), [parentCat, Dir_categories]);
  const filterLocs = useMemo(() => createFilterables(parentLoc, Dir_locations), [parentLoc, Dir_locations]);

  
  function filterOptions(searchStr, newfilterables, setNew){
    setNew( newfilterables.filter(x => x.name.toLowerCase().includes(searchStr.toLowerCase()))
    );
  }

  function removeTag(arr, value) {
    const theItem = arr.filter((item) => item.id === value.id )[0]
    var index = arr.indexOf(theItem);
   
      arr.splice(index, 1);
    
    return arr;
  }

  function setupTags(value, arr, setArr){
    if(arr.length > 0){
      if(arr.filter((item) => item.id === value.id ).length > 0){
        setArr(removeTag([...arr], value));
      }else{
        setArr([...arr, value])
      }
    }else{
      setArr([...arr, value])
    }
  }

  function  processTitle(parentCat, catOptions, placeholder, addonText){
    if(parentCat){
    if(parentCat.name){
      if(catOptions && catOptions.length > 0){
        return addonText + parentCat.name.replace(/&amp;/g, '&'); 
      }else{
        return parentCat.name.replace(/&amp;/g, '&');
      }
    }else{
      return placeholder
    }
  }else{
    return placeholder
  }
  }

  function  processTagsTitle(tagOptions){
    let arrView;
    if(tagOptions && tagOptions.length > 0){
        arrView = <> {tagOptions.map((tag) => {
          return <span>{tag.name.replace(/&amp;/g, '&')}<span onClick={() => setupTags(tag, selectTags, setSelectTags)} className='clear_tag'>x</span></span>;
        }) }</>
    }

    return arrView;
  }

  let searhID = 'lc_search'


  return (
    <div className={`search_form tagged ${modal? '_modal' : ''}`}>

        <div className='search_form_content'>
        <div className="accordion border-0 accordion-s" id={`accord_${searhID}`}>

                <div className="accordion-item">
                    <button  className="accordion-button collapsed px-0 bb-thin" type="button" data-bs-toggle="collapse" data-bs-target={`#accord_${searhID}_keyword`}>

                      <i className="las la-search"></i>
                      {/* <span className="font-600 font-13 line-height-s">keyword(s)</span> */}
                      <h6 className='tax_parent hiden'><span className='field_label'>Key Word(s)</span>{`${keyword}`}</h6>
                      <i className="bi bi-plus font-20"></i>
                    </button>

                    <div id={`accord_${searhID}_keyword`} className={`accordion-collapse collapse `} data-bs-parent={`#accord_${searhID}`}>
                     <input className='border-0' placeholder="Enter Key words ..." onChange={(e) => setKeyword(e.target.value)}/>
                    </div>
                </div>

                {/**cats */}
                {catOptions && <div className="accordion-item">
                    <button className="accordion-button collapsed px-0 bb-thin" type="button" data-bs-toggle="collapse" data-bs-target={`#accord_${searhID}_category`}>

                      <span className='group_icon'> <i className="las la-project-diagram"></i></span>
                      <h6 className='tax_parent'><span className='field_label'>Category</span>{`${processTitle(parentCat, catOptions, 'All Categories', 'All in ')}`}</h6>
                      <i className="bi bi-plus font-20"></i>

                    </button>

                    <div id={`accord_${searhID}_category`} className={`accordion-collapse collapse `} data-bs-parent={`#accord_${searhID}`}>
                        {catOptions.length > 0 && <>
                        <input className='group_filter' placeholder="Type a category name ..." onChange={(e) => filterOptions(e.target.value,  filterCats, setCatOptions)}/>
                        <div className='list_box' >
                        <TagCloud
                            className={`search_tags tag-cloud ${parentCat.id !== 0 ? 'buttoned' : ''}`}
                            shuffle={false}
                            minSize={12}
                            maxSize={38}
                            tags={createOptions(catOptions, parentCat, grandCatId, 'All Categories')}
                            colorOptions={color_options}
                            renderer={customRenderer}
                            onClick={tag => selectParent(tag.props.id, catOptions, setGrandCatId, setParentCat, Dir_categories, setSearchCat)}
                        />
                        </div></>}
                        {parentCat.id !== 0 && <div className='list_buttons'>

                      {grandCatId && <button className='_back_list btn-sm' onClick={() => selectParent(grandCatId, catOptions, setGrandCatId, setParentCat, Dir_categories, setSearchCat)}>Step Back</button>}
                    </div>}
                    </div>
                </div>}
        </div>
            {/* <Accordion flush expandIconPosition='end' accordion={accordion} className='search_tags_accordion' ghost >
            {catOptions &&  
            <AccordionItem  eventKey="2">
                <AccordionHeader></AccordionHeader>
                <AccordionBody>{catOptions.length > 0 && <>
                    <input className='group_filter' placeholder="Type a category name ..." onChange={(e) => filterOptions(e.target.value,  filterCats, setCatOptions)}/>
                    <div className='list_box' >
                    <TagCloud
                        className={`search_tags tag-cloud ${parentCat.id !== 0 ? 'buttoned' : ''}`}
                        shuffle={false}
                        minSize={12}
                        maxSize={38}
                        tags={createOptions(catOptions, parentCat, grandCatId, 'All Categories')}
                        colorOptions={color_options}
                        renderer={customRenderer}
                        onClick={tag => selectParent(tag.props.id, catOptions, setGrandCatId, setParentCat, Dir_categories, setSearchCat)}
                    />
                    </div></>}
                    {parentCat.id !== 0 && <div className='list_buttons'>

                      {grandCatId && <button className='_back_list btn-sm' onClick={() => selectParent(grandCatId, catOptions, setGrandCatId, setParentCat, Dir_categories, setSearchCat)}>Step Back</button>}
                    </div>}</AccordionBody>
                </AccordionItem>}
            {locOptions && 
                <AccordionItem  extra={<span className='group_icon'> <i className="las la-map-marker-alt"></i></span>}  eventKey="3">
                  <AccordionHeader><h6 className='tax_parent'><span className='field_label'>Location</span>{`${processTitle(parentLoc, locOptions, 'Everywhere', 'Everywhere in ')}`}</h6></AccordionHeader>
                    <AccordionBody>
                      {locOptions.length > 0 && <><input className='group_filter' placeholder="Type a location name ..." onChange={(e) => filterOptions(e.target.value, filterLocs, setLocOptions)}/>
                       <div className='list_box'>
                    <TagCloud
                        className='search_tags tag-cloud'
                        shuffle={false}
                        minSize={12}
                        maxSize={38}
                        tags={createOptions(locOptions, parentLoc, grandLocId, 'Everywhere')}
                        colorOptions={{
                            luminosity: 'light',
                            hue: 'purple',
                          }}
                        renderer={customRenderer}
                        onClick={tag => selectParent(tag.props.id, locOptions, setGrandLocId, setParentLoc, Dir_locations)}
                    />
                      </div> </>}
                    {parentLoc.id !== 0 && <div className='list_buttons'>
                      

                      {grandLocId && <button className='_back_list btn-sm' onClick={() => selectParent(grandLocId, locOptions, setGrandLocId, setParentLoc, Dir_locations)}>Step Back</button>}
                    </div>}</AccordionBody>
            </AccordionItem>}

            {Dir_tags && Dir_tags.length > 0 && 
                <AccordionItem  extra={<span className='group_icon'> <i className="las la-tags"></i></span>} eventKey="4">
                  <AccordionHeader><div><h6 className='tax_parent'><span className='field_label'>Place Features</span>{`${selectTags.length > 0 ? '' : 'All Features'}`}</h6><div className='select_tags'>{processTagsTitle(selectTags)}</div></div></AccordionHeader>

                     <AccordionBody> 
                      <input className='group_filter' placeholder="Type to filter ..." onChange={(e) => filterOptions(e.target.value, Dir_tags, setTags)}/>
                      <div className='list_box'>
                    <TagCloud
                        className='search_tags tag-cloud  listing_tags'
                        shuffle={false}
                        minSize={12}
                        maxSize={32}
                        tags={createOptions(tags, {id:0}, null, 'All Features')}
                        colorOptions={{
                            luminosity: 'dark',
                          }}
                        renderer={customTagRenderer}
                        onClick={tag =>  setupTags(tag.props, selectTags, setSelectTags)}
                    />
                    </div></AccordionBody>
            </AccordionItem>}
            </Accordion> */}
        
           {infoView}
        </div>

        <button className='btn btn-success rounded-22' onClick={() => submit()}>Search</button>
    </div>
  );
};

const TaggedSearch = memo(TaggedSearchConst);
export default TaggedSearch;