import Masonry, {ResponsiveMasonry} from "react-responsive-masonry";
import {useEffect, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import Image from "next/image";
import { cleanHtml, randomBetween, randomEither, resizedImage, shuffleArray, textSizeClass } from "@/helpers/universal";
import { LoaderDualRingBoxed, LoaderEllipsis } from "@/components/skeletons/Loaders";
import { siteSettings, fallbackImgBlur, fallbackImgSrcSet } from "@/helpers/base";

export const GalleryPlate = ({item, overlay, highlight, onclickFunc = null, content, exClass, styleObj, imgSize='medium'}) => {
  const [theme, setTheme] = useState('#000');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
   /*  if(overlay){
        color(item);
    } */
    setLoading(false);
  }, [item])
  
  return <div /* style={{background: `url(${resizedImage(item, imgSize)})`}} */ className={` gallery_plate pointer ${exClass ?? ''}`} onClick={onclickFunc ? () => onclickFunc() : null} >
    {loading ? <div className="d-flex justify-center align-center h-100 align-items-center"><LoaderEllipsis/></div> : 
      <>
      <div className={`mega_item`}>
        {typeof item === 'string' ? 
        <Image data-aos='zoom-in' unoptimized  onErrorCapture = {(e) => {e.target.src = '/images/bg/fallback.jpg', e.target.srcset= {fallbackImgSrcSet}}}
        /* onErrorCapture={() => {return <img src='/images/Lyvecity.png'/>;}} */ quality={100} className="h-auto w-100" width={400} height={200} data-aos="fade" data-aos-offset={100} data-aos-once="true" data-aos-delay={30}
                    alt="LyveCity" src={resizedImage(item, imgSize)}/>
                    :
        <Image data-aos='zoom-in' placeholder="blur" blurDataURL={item.blurUrl ?? fallbackImgBlur} unoptimized  onErrorCapture = {(e) => {e.target.src = '/images/bg/fallback.jpg', e.target.srcset= {fallbackImgSrcSet}}} quality={100} className="h-auto w-100" width={400} height={200} data-aos="fade" data-aos-offset={100} data-aos-once="true" data-aos-delay={30}
                  alt="LyveCity" src={resizedImage(item.url, imgSize)}/>}
                  {content}
                   </div>
    {overlay && <div className="plate_overlay" style={{background: `rgba(${theme.toString()})`}}></div>}
    {highlight && <div className="plate_highlight"></div>}
      </>
    }
    </div>;
}


export const HorizontalGrid = ({children, height, gutter='10px'}) => {
  return <div style={{height : height ?? 150, marginBottom: gutter, gap: gutter}} className="horizontal_grid">
          {children}
  </div>
}

const MegaGallery = ({listing, color, upcoming}) => {
  const {landing, marketing, team, performers, id, gallery:l_gallery, meta} = listing;
  //const {_job_gallery:l_gallery} = meta ?? {};
  const {greeting} = landing;
  const {punch_lines} = marketing;
  const [slideIndex, setSlideIndex] = useState(-1);
  const [miniGrid, setMiniGrid] = useState(false);
  const [loading, setLoading] = useState(true);
  const [gallery, setGallery] = useState([])
  const punchlines = Array.isArray(punch_lines) ? punch_lines.map((el) => el.text) : [];
  const [gridFactor, setGridFactor] = useState(1)
  

  function itemIndex(item){
     return gallery.indexOf(item);
  }


  function slides() {
    return gallery.map((pic) => {
      return {
        src : pic 
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

  //let megaGall = shuffleArray([...textOptions, ...gallery, ...teamLinks(team), ...teamLinks(performers)]);
  let megaGall = [...gallery, ...teamLinks(team), ...teamLinks(performers)];

  let highlightIndex = [4,7,11,17]

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
    setGallery(l_gallery?.length > 0 ? l_gallery : listing?.gallery);    
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

let gridObj = {0: 1 + gridFactor, 575: 2 + gridFactor, 768: 3 + gridFactor, 1024: 4 + gridFactor}

galleryView = <>
        <div id = 'wall_gallery_container' className={`position-relative overflow-hidden ${miniGrid ? 'mini_grid' : ''}`}>
          <div id='wall_gallery' className="mega_gallery _vertical" onLoad={() =>   setUpToggler()}>
        {megaGall.length > 2 && <ResponsiveMasonry columnsCountBreakPoints={{...gridObj}}>
            <Masonry gutter={miniGrid ? '5px' : "10px"}>
            {megaGall.map((item, index) => {
              if (typeof item === 'string') {
                if(item.includes(siteSettings.wpDomain) || item.includes(siteSettings.cdnDomain)){
                  return  <GalleryPlate imgSize={gridFactor == 0 ? 'medium_large' : 'medium'} onclickFunc = {() => setSlideIndex(itemIndex(item))} /* data-bs-toggle='modal' data-bs-target="#photo_view" */  item={item} key={index} highlight={highlightIndex.includes(index)} overlay={index == randomBetween(0, gallery?.length)}/>;
                }else{
                  if(item?.length > 0){
                  return <div key={index} className={`mega_item text_box bg-gray-${randomEither(backGs)}`}>
                    <p className={`_text truncate-7 ${textSizeClass({text : item})}`}>{cleanHtml(item)}</p>
                  </div>
                  }
                }
              }else{
                if(item?.url?.includes(siteSettings.wpDomain) || item?.url?.includes(siteSettings.cdnDomain)){
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
                    return  <GalleryPlate imgSize={gridFactor == 0 ? 'medium_large' : 'medium'} onclickFunc = {() => setSlideIndex(itemIndex(item))} /* data-bs-toggle='modal' data-bs-target="#photo_view" */  item={item} key={index} highlight={highlightIndex.includes(index)} overlay={index == randomBetween(0, gallery?.length)}/>;
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
        <>{megaGall.length > 2 ? <div id='gallery_extender' className="bg-gradient-fade w-100 d-flex align-items-end  w-100 justify-center"><button onClick={() => revealMore()}  className="default-link btn btn-m rounded-s gradient-highlight shadow-bg shadow-bg-s px-5 mb-0 mt-2">Show more Wall</button></div>  : <></>}</>
        </div>
        
</>

return (
  <>{ loading ? <div style={{height: '300px'}}><LoaderDualRingBoxed/></div>
      :
      <>
        <div className='row_flex justify-end p-2 mb-3'>
          <div className='row_flex gallery_grids gap-3' style={{width: 'fit-content'}}>
            <i className={`far fa-window-maximize text-25 ${gridFactor == 0 && 'color-highlight'}`} onClick={() => setGridFactor(0)}/>
            <i className={`fas fa-th-large text-25 ${gridFactor == 1 && 'color-highlight'}`} onClick={() => setGridFactor(1)}/>
            <i className={`fas fa-th text-25 ${gridFactor == 2 && 'color-highlight'}`} onClick={() => setGridFactor(2)}/>
          </div>
        </div>
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
