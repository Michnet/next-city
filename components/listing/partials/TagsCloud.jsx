import { getDirTermsUrl } from '@/helpers/rest';
import {useEffect, useState, memo } from 'react';
import { TagCloud } from 'react-tagcloud';

const TagsCloudConst = ({ids, dark, hue, itemsList, onClickFunc}) => {

  const [items, setItems] = useState([]);
  //const {colorTheme} = useRecoilValue(UIState);
 // const {colors} = colorTheme;

  async function getTags(signal){
    const filterArr = {
       _fields : "id,count,extra_meta,term_meta,description,parent,name,slug",
       include: ids.join(',')
   }
     let data = await fetch(getDirTermsUrl('tags', filterArr, signal));
     const theTags = await data.json();
     if(theTags){
        setItems(theTags);
     }
 
   }



   //const items = useSWRImmutable(/* fetchCondition() ? null :  */getDirTermsUrl('tags', filterArr), fetcher)

useEffect(() => {
  const controller = new AbortController();
  const signal = controller.signal;

  if(itemsList){
    setItems(itemsList)
  }else{
    if(ids){
      getTags(signal)
      }
  }
  return () => controller.abort();
}, [ids,/*  Dir_tags,  */hue, itemsList]) 


const color_options = {
  luminosity: dark ? 'dark' : 'light',
  hue: hue ?? 'monochrome',
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
    //onClick={tag => alert(`'${tag.slug}' was selected!`)}
    onClick = {onClickFunc ? (tag) => onClickFunc(tag) : null}
  />
  </>
  )
}

const TagsCloud = memo(TagsCloudConst)
export default TagsCloud