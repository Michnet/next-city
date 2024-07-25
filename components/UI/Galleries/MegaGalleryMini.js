//import dynamic from "next/dynamic";

import Masonry, {ResponsiveMasonry} from "react-responsive-masonry";
import {useEffect, useState } from "react";
import { GalleryPlate } from "./MegaGallery";

import { cleanHtml, randomBetween, randomEither, shuffleArray, textSizeClass } from "@/helpers/universal";
import { LoaderDualRingBoxed } from "@/components/skeletons/Loaders";
import { siteColors, siteSettings } from "@/helpers/base";

export const HorizontalGrid = ({children, height}) => {
  return <div style={{height : height ?? 180, marginBottom: '3px', gap: '3px'}} className="horizontal_grid">
          {children}
  </div>
}

const MegaGalleryMini = ({listing, color, setActiveKey}) => {
  const {landing, marketing,id, galleryWithBlurs, meta} = listing;
  const {_job_gallery:l_gallery} = meta ?? {};
  const {greeting} = landing;
  const {punch_lines} = marketing;
  const [slideIndex, setSlideIndex] = useState(-1);
  const [loading, setLoading] = useState(true);
  const [gallery, setGallery] = useState([])

  const punchlines = Array.isArray(punch_lines) ? punch_lines.map((el) => el.text) : [];

  function itemIndex(item){
     return gallery.indexOf(item);
  }

  const textArr = shuffleArray([...punchlines]);

  let textOptions = textArr.splice(0, 1), galleryView;
  let miniGall = gallery?.length > 0  ? [...gallery].splice(0, 5) : [];
  let megaGall = shuffleArray([...textOptions, ...miniGall]);
  let grid1Arr = megaGall.slice(0,2);
  let gallArr = megaGall.slice(2);
  

  let highlightIndex = [4,7,11,17]


useEffect(() => {
  setLoading(true)
  if(listing){
    setGallery(l_gallery?.length > 0 ? l_gallery : listing?.gallery)
    setLoading(false);
    setSlideIndex(-1);
  }
  return () => setGallery([])
}, [listing.id]);

let Grid1 = () => <HorizontalGrid>
  {shuffleArray([...grid1Arr]).map((item, index) => {
    if (typeof item == 'string') {
      if(item?.length > 0){
        if(item?.includes(siteSettings.wpDomain) || item?.includes(siteSettings.cdnDomain)){
          return  <GalleryPlate imgSize='medium_large' item={item} key={index} highlight={highlightIndex.includes(index)} overlay={index == randomBetween(0, gallery?.length)}/>;
        }else{
            //let backGs = ['100', '200', '300', '400'];
          return <div key={index} className={`mega_item card card-style m-0 text_box p-4 justify-end bg-listing`}>
            <p className={`_text truncate-7 color-white ${textSizeClass({text : item})}`}>{cleanHtml(item)}</p>
          </div>
        }
      }
    }else{
      if(item?.url?.includes(siteSettings.wpDomain)){
          return  <GalleryPlate imgSize='medium_large' item={item} key={index} highlight={highlightIndex.includes(index)} overlay={index == randomBetween(0, gallery?.length)}/>;
        }else{
          return <>{item}</>
        }
    }
  }
  )}
  
  </HorizontalGrid>;

galleryView = <> 
        
        <div id = 'wall_gallery_container' className="position-relative overflow-hidden">
          <div id='mini_wall_gallery' className="mega_gallery _vertical pos-relative z-1 mx-2 overflow-hidden rounded-4">
          <Grid1/>
        {gallArr.length > 0 && <ResponsiveMasonry className="masonry vertical_grid" columnsCountBreakPoints={{0: 2, 768: 3, 1024: 4}}>
            <Masonry gutter ='3px'>
            {gallArr.map((item, index) => {
              if (typeof item == 'string') {
                if(item?.length > 0){
                  if(item?.includes(siteSettings.wpDomain) || item?.includes(siteSettings.cdnDomain)){
                    return  <GalleryPlate item={item} key={index} highlight={highlightIndex.includes(index)} /* overlay={index == randomBetween(0, gallery?.length)} *//>;
                  }else{
                      //let backGs = ['100', '200', '300', '400'];
                    return <div key={index} className={`mega_item card card-style m-0 text_box p-4 justify-end bg-listing`}>
                      <p className={`_text truncate-7 color-white ${textSizeClass({text : item})}`}>{cleanHtml(item)}</p>
                    </div>
                  }
                }
              }else{
                if(item?.url?.includes(siteSettings.wpDomain)){
                    return  <GalleryPlate item={item} key={index} highlight={highlightIndex.includes(index)} /* overlay={index == randomBetween(0, gallery?.length)} *//>;
                  }else{
                    return <>{item}</>
                  }
              }
            }
            )}
            
            </Masonry>
        </ResponsiveMasonry>}
        </div>
        <div id='gallery_extender' className="w-100 position-absolute bottom-0 z-2"><div onClick={() => setActiveKey('gallery')}  className="d-flex align-items-center w-100 h-100 justify-center"><button className="show_more btn btn-l bg-theme color-theme">See Gallery</button></div>
        </div>
      </div>
</>

return (
  <>{ loading ? <div style={{height: '300px'}}><LoaderDualRingBoxed/></div>
      :
      <>
        {galleryView}
      </>}</>
  )
}

//const MegaGalleryMini = memo(MegaGalleryConst);
export default MegaGalleryMini
