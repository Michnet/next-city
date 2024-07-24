import { pwaName } from '@/helpers/appjs';
import { getDirTermsUrl, getDirTerms} from '@/helpers/rest';
import { getLocalTaxonomy } from "@/helpers/rest";
import {useEffect, useState, memo } from 'react';
import { TagCloud } from 'react-tagcloud';

const TagsCloudConst = ({ids, dark, hue, itemsList, onClickFunc, live=false}) => {

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
  //hue: hue ?? 'monochrome',
  hue: hue ?? typeof window !== 'undefined' ? localStorage.getItem(pwaName+'-Highlight') : null
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



  return (
    <><TagCloud
    minSize={16}
    maxSize={38}
    tags={createTags()}
    colorOptions={color_options}
    onClick = {onClickFunc ? (tag) => onClickFunc(tag) : null}
  />
  </>
  )
}

const TagsCloud = memo(TagsCloudConst)
export default TagsCloud