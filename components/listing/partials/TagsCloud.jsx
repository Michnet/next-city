//import { pwaName } from '@/helpers/appjs';
import { getDirTermsUrl, getDirTerms} from '@/helpers/rest';
import { getLocalTaxonomy } from "@/helpers/rest";
import {useEffect, useState, memo } from 'react';
import { TagCloud } from 'react-tagcloud';

const TagsCloudConst = ({ids, hashed=false, renderer=null, dark, hue = 'monochrome', itemsList, onClickFunc, live=false, minSize=16, maxSize=38}) => {

  const [items, setItems] = useState([]);
  //const {colorTheme} = useRecoilValue(UIState);
 // const {colors} = colorTheme;
 const filterArr = {
  _fields : "id,count,extra_meta,term_meta,description,parent,name,slug",
  include: ids?.join(',')
}

  async function getTags(signal){
     let data = live ? await fetch(getDirTermsUrl('tags', filterArr, signal)) : 
     await getLocalTaxonomy({taxonomy: 'tags', include_ids: ids, setter:setItems});
 
   }

useEffect(() => {
  const controller = new AbortController();
  const signal = controller.signal;

  if(itemsList){
    setItems(itemsList)
  }else{
    if(ids){
      if(live){
        let data = getDirTerms('tags', filterArr, signal, setItems);
        
      }else{
        getLocalTaxonomy({taxonomy: 'tags', include_ids: ids, setter:setItems, signal:signal})
      }
      }
  }
  return () => controller.abort();
}, [ids,hue, itemsList]) 


const color_options = {
  luminosity: dark ? 'dark' : 'light',
  hue: hue
  //hue: hue ?? 'monochrome',
  //hue: hue ?? typeof window !== 'undefined' ? localStorage.getItem(pwaName+'-Highlight') : null
}

  function createTags(ids){
    let tagData = [];

    if(items?.length > 0){
  items.map((item) => {
       //const theItem = Dir_tags.find(el => el.id === item);
       //if(theItem){
        tagData.push(
          {value : item.name,
           count : item.count,
           slug : item.slug
          })
       //}
      })
    }
    return tagData;
  }

  const baseRenderer = (tag, size, color) => {
    const styles = {
      margin: '0px 3px',
      verticalAlign: 'middle',
      display: 'inline-block',
    }

    const { className, style, ...props } = tag.props || {}
    const fontSize = size + 'px'
    const key = tag.key || tag.value
    const tagStyle = { ...styles, color, fontSize, ...style }
  
    let tagClassName = 'tag-cloud-tag'
    if (className) {
      tagClassName += ' ' + className
    }
  
    return (
      <span className={tagClassName} style={tagStyle} key={key} {...props}>
        {hashed ? '#' : <></>}{tag.value}
      </span>
    )
  }



  return (
    <><TagCloud
    minSize={minSize}
    maxSize={maxSize}
    tags={createTags()}
    colorOptions={color_options}
    renderer={renderer ??  baseRenderer}
    onClick = {onClickFunc ? (tag) => onClickFunc(tag) : null}
  />
  </>
  )
}

const TagsCloud = memo(TagsCloudConst)
export default TagsCloud