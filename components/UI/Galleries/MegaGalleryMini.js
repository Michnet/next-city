//import dynamic from "next/dynamic";

import Masonry, {ResponsiveMasonry} from "react-responsive-masonry";
import {useEffect, useState } from "react";
import { GalleryPlate } from "./MegaGallery";

import { cleanHtml, randomBetween, shuffleArray, textSizeClass } from "@/helpers/universal";
import { LoaderDualRingBoxed } from "@/components/skeletons/Loaders";
import { siteSettings } from "@/helpers/base";

export const HorizontalGrid = ({children, height}) => {
  return <div style={{height : height ?? 180}} className="horizontal_grid">
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

  const textArr = shuffleArray([greeting, ...punchlines]);

  let textOptions = textArr.splice(0, 2), galleryView;
  let miniGall = gallery?.length > 0  ? gallery.splice(0, 5) : [];
  let megaGall = shuffleArray([...textOptions, ...miniGall]);

  let highlightIndex = [4,7,11,17]


let chunkHeight = 500;

function hideBtn(el, condition){
  if(condition){
    el.classList.add('d-block');
    el.classList.remove('d-none');
  }else{
    el.classList.add('d-none')
    el.classList.remove('d-block');
  }
}

function setUpToggler(){

  if (typeof window !== 'undefined') {
  let container_el = document.getElementById("wall_gallery_container");
  let inner_el = document.getElementById("wall_gallery");
  let extBtn = document.getElementById('gallery_extender');

  if(container_el){
    container_el.style.maxHeight = `${chunkHeight}px`
    if(extBtn){
      if(inner_el){
        let innerHeight = inner_el.offsetHeight;
        hideBtn(extBtn, innerHeight > chunkHeight);
      }
    }
  }
}
}

useEffect(() => {
  setLoading(true)
  if(listing){
    setGallery(l_gallery?.length > 0 ? l_gallery : listing?.gallery)
    setLoading(false);
    setSlideIndex(-1);
  }
  return () => setGallery([])
}, [listing.id]);

galleryView = <> 
        {/* <Grid1/> */}
        <div id = 'wall_gallery_container' className="position-relative overflow-hidden">
          <div id='mini_wall_gallery' className="mega_gallery _vertical pos-relative z-1 px-10">
        {megaGall.length > 0 && <ResponsiveMasonry columnsCountBreakPoints={{0: 1, 575: 2, 768: 3, 1024: 4}}>
            <Masonry gutter="10px">
            {megaGall.map((item, index) => {
              if (typeof item == 'string') {
                if(item?.length > 0){
                  if(item?.includes(siteSettings.wpDomain)){
                    return  <GalleryPlate onclickFunc = {() => setSlideIndex(itemIndex(item))} item={item} key={index} highlight={highlightIndex.includes(index)} overlay={index == randomBetween(0, gallery?.length)}/>;
                  }/* else{
                      let backGs = ['100', '200', '300', '400'];
                    return <div key={index} className={`mega_item text_box bg-gray-${backGs[Math.floor(Math.random()*backGs.length)]}`}>
                      <p className={`_text truncate-7 ${textSizeClass({text : item})}`}>{cleanHtml(item)}</p>
                    </div>
                  } */
                }
              }else{
                if(item?.url?.includes(siteSettings.wpDomain)){
                    return  <GalleryPlate onclickFunc = {() => setSlideIndex(itemIndex(item))} item={item} key={index} highlight={highlightIndex.includes(index)} overlay={index == randomBetween(0, gallery?.length)}/>;
                  }else{
                    return <>{item}</>
                  }
              }
            }
            )}
            
            </Masonry>
        </ResponsiveMasonry>}
        </div>
        <div id='gallery_extender' className="w-100 position-absolute bottom-0 z-2"><div onClick={() => setActiveKey('gallery')}  className="d-flex align-items-center w-100 h-100 justify-center"><span className="show_more btn btn-light">See Gallery</span></div>
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
