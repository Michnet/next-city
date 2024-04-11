import dynamic from "next/dynamic";

import Masonry, {ResponsiveMasonry} from "react-responsive-masonry";
import {useEffect, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import Image from "next/image";
import { cleanHtml, randomBetween, shuffleArray, textSizeClass } from "@/helpers/universal";
import { LoaderDualRingBoxed, LoaderEllipsis } from "@/components/skeletons/Loaders";
import { siteSettings, fallbackImgBlur, fallbackImgSrcSet } from "@/helpers/base";

export const GalleryPlate = ({item, overlay, highlight, onclickFunc, content, exClass, styleObj}) => {
  const [theme, setTheme] = useState('#000');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
   /*  if(overlay){
        color(item);
    } */
    setLoading(false);
  }, [item])
  
  return <div style={{ backgroundImage: `url("${typeof item === 'string' ? item : item.url}")`}} className={`shadow-bg shadow-bg-m gallery_plate pointer ${exClass ?? ''}`} onClick={() => onclickFunc()} >
    {loading ? <div className="d-flex justify-center align-center h-100 align-items-center"><LoaderEllipsis/></div> : 
      <>
      <div className={`mega_item`}>
        {typeof item === 'string' ? 
        <Image unoptimized  onErrorCapture = {(e) => {e.target.src = '/images/bg/fallback.jpg', e.target.srcset= {fallbackImgSrcSet}}}
        /* onErrorCapture={() => {return <img src='/images/Lyvecity.png'/>;}} */ quality={90} className="h-auto w-100" width={400} height={200} data-aos="fade" data-aos-offset={100} data-aos-once="true" data-aos-delay={30}
                    alt="LyveCity" src={item}/>
                    :
        <Image placeholder="blur" blurDataURL={item.blurUrl ?? fallbackImgBlur} unoptimized  onErrorCapture = {(e) => {e.target.src = '/images/bg/fallback.jpg', e.target.srcset= {fallbackImgSrcSet}}} quality={90} className="h-auto w-100" width={400} height={200} data-aos="fade" data-aos-offset={100} data-aos-once="true" data-aos-delay={30}
                  alt="LyveCity" src={item.url}/>}
                  {content}
                   </div>
    {overlay && <div className="plate_overlay" style={{background: `rgba(${theme.toString()})`}}></div>}
    {highlight && <div className="plate_highlight"></div>}
      </>
    }
    </div>;
}


export const HorizontalGrid = ({children, height}) => {
  return <div style={{height : height ?? 180}} className="horizontal_grid">
          {children}
  </div>
}

const MegaGallery = ({listing, color, upcoming}) => {
  const {landing, marketing, team, performers, gallery:l_gallery, id, galleryWithBlurs} = listing;
  const {greeting} = landing;
  const {punch_lines} = marketing;
  const [slideIndex, setSlideIndex] = useState(-1);
  const [loading, setLoading] = useState(true);
  const [gallery, setGallery] = useState(listing?.galleryWithBlurs ?? l_gallery)
  const punchlines = Array.isArray(punch_lines) ? punch_lines.map((el) => el.text) : [];

  function itemIndex(item){
     return gallery.indexOf(item);
  }


  function slides() {
    return gallery.map((pic) => {
      return {
        src : pic.url 
      }
    })
  }

  function teamLinks(group){
    let theArr = [];
    if(Array.isArray(group) && group?.length > 0){
      group.map((mem) => {
        theArr.push(mem.mylisting_accordion_photo)
       })
    }
    return theArr;
  }
  /* const Tags = () => <div className='tags_row'>
              <div className='row_content'>
                  <TagsCloud ids={dir_tags}/>
                  <DualColorHeader exClass='vertical_text lg_text' title={'# Tagged In'} />
              </div>
              </div> */

  const textArr = shuffleArray([greeting, ...punchlines]);

  let textOptions = textArr.splice(0, 7), galleryView;

  let megaGall = shuffleArray([...textOptions, ...gallery, ...teamLinks(team), ...teamLinks(performers)]);

  let highlightIndex = [4,7,11,17]
  let Grid1 = () => <HorizontalGrid>
  {shuffleArray([gallery[0], gallery[1], gallery[3]]).map((item, index) => {
    if (typeof item?.url === 'string') {
      if(item?.url.includes(siteSettings.wpDomain)){
        return  <GalleryPlate onclickFunc = {() => setSlideIndex(itemIndex(item))}  item={item} key={index} highlight={highlightIndex.includes(index)} overlay={index == 3}/>;
        }/* else{
          if(item?.url.length > 0){
            let backGs = ['300', '400', '500', '600'];
          return <div className={`mega_item text_box bg-gray-${backGs[Math.floor(Math.random()*backGs.length)]}`}>
            <p className={`_text truncate-7 ${item?.length < 15 ? 'biggy' : ''} ${item?.length < 90 && item?.length > 15? 'medium' : ''}`}>{item}</p>
          </div>
          }
        } */
    }else{
      if(item?.includes(siteSettings.wpDomain)){
        return  <GalleryPlate onclickFunc = {() => setSlideIndex(itemIndex(item))}  item={item} key={index} highlight={highlightIndex.includes(index)} overlay={index == 3}/>;
      }else{
        return <>{item}</>
      }
    }
  }
  )}
  
  </HorizontalGrid>;

let datePlate = randomBetween(0, gallery?.length);

let chunkHeight = 1200;

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
    setGallery(listing?.galleryWithBlurs?.length > 0 ? listing?.galleryWithBlurs : listing?.gallery)
    setLoading(false);
    setSlideIndex(-1);
  }
}, [listing.id]);

function revealMore(e){
  let container_el = document.getElementById("wall_gallery_container");
  let inner_el = document.getElementById("wall_gallery");
  let extBtn = document.getElementById('gallery_extender');

  let innerHeight = inner_el.offsetHeight;

  if(container_el){
    let outerHeight = container_el.offsetHeight;
    container_el.style.maxHeight = `${outerHeight + chunkHeight}px`;
    hideBtn(extBtn, innerHeight > outerHeight);
  }
}

let backGs = ['100', '200', '300', '400'];

if(typeof window !== 'undefined'){
  if(localStorage.getItem('LyveState-Theme')){
    if(localStorage.getItem('LyveState-Theme') == "dark-mode"){
      backGs = ['600', '700', '800', '900'];
    }
}
}



galleryView = <>
        <div id = 'wall_gallery_container' className="position-relative overflow-hidden">
          <div id='wall_gallery' className="mega_gallery _vertical" onLoad={() =>   setUpToggler()}>
        {megaGall.length > 2 && <ResponsiveMasonry columnsCountBreakPoints={{0: 2, 768: 3, 1024: 4}}>
            <Masonry gutter="10px">
            {megaGall.map((item, index) => {
              if (typeof item === 'string') {
                if(item.includes(siteSettings.wpDomain)){
                  return  <GalleryPlate onclickFunc = {() => setSlideIndex(itemIndex(item))} /* data-bs-toggle='modal' data-bs-target="#photo_view" */  item={item} key={index} highlight={highlightIndex.includes(index)} overlay={index == randomBetween(0, gallery?.length)}/>;
                }else{
                  if(item?.length > 0){
                  return <div key={index} className={`mega_item text_box bg-gray-${backGs[Math.floor(Math.random()*backGs.length)]}`}>
                    <p className={`_text truncate-7 ${textSizeClass({text : item})}`}>{cleanHtml(item)}</p>
                  </div>
                  }
                }
              }else{
                if(item?.url?.includes(siteSettings.wpDomain)){
                  /* if(item == gallery.filter((el, index) => index == datePlate)[0]){
                    return  <GalleryPlate exClass={'_date_plate'} styleObj={{minHeight: '250px'}}  onclickFunc = {() => setSlideIndex(itemIndex(item))}  item={item} key={index}  
                    content = {<div  className="_date_box position-absolute h-100 top-0 w-100 d-flex gap-3 flex-column justify-center align-items-center"><div>
                    <DateView exClass={'bg-transparent'} customDate={upcoming?.start}/>
                    </div>
                    {upcoming?.gcal_link ? <Link href={upcoming?.gcal_link}>
                      <button className="btn btn-outline-loud rounded-0">
                        Add to calendar 
                      </button></Link> : <></>}
                    </div>}/>;
                  }else{ */
                    return  <GalleryPlate onclickFunc = {() => setSlideIndex(itemIndex(item))} /* data-bs-toggle='modal' data-bs-target="#photo_view" */  item={item} key={index} highlight={highlightIndex.includes(index)} overlay={index == randomBetween(0, gallery?.length)}/>;
                  //}
                  }else{
                    return <>{item}</>
                  }
              }
            }
            )}
            
            </Masonry>
        </ResponsiveMasonry>}
        </div>
        <>{megaGall.length > 2 ? <div id='gallery_extender' className="w-100 d-flex align-items-end  w-100 justify-center"><button onClick={() => revealMore()}  className="default-link btn btn-m rounded-s gradient-highlight shadow-bg shadow-bg-s px-5 mb-0 mt-2">Show more Wall</button></div>  : <></>}</>
        </div>
        
</>

return (
  <>{ loading ? <div style={{height: '300px'}}><LoaderDualRingBoxed/></div>
      :
      <>
      
        {galleryView}
        {/* gallery?.length > 0 && <BSModal  noPadding noOverlay modal_id={'photo_view'} content={<Lightbox
                slides={slides()}
                open={slideIndex >= 0}
                //open = {false}
                index={1}
                close={() => setSlideIndex(0)}
                plugins={[Fullscreen, Slideshow, Thumbnails, Zoom]}
            />}
          /> */}
          <Lightbox
                slides={slides()}
                open={slideIndex >= 0}
                //open = {false}
                index={slideIndex}
                close={() => setSlideIndex(-1)}
                plugins={[Fullscreen, Slideshow, Thumbnails, Zoom]}
            />
      </>}</>
  )
}

//const MegaGallery = memo(MegaGalleryConst);
export default MegaGallery
