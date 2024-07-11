import { Skeleton } from "@/components/skeletons/Skeletons";
import Splider from "@/components/UI/partials/Splider";
import Image from "next/image";
import { useState } from "react";

import Lightbox from "yet-another-react-lightbox";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/plugins/thumbnails.css";

function HeaderGallery({product, variant, currency, stickyHeader, cartAction}) {

    const [state, setState] = useState(
        {galleryImg: null,
        productImages: null,
        nextImg: null,
        galleryCarousel: null,
        variantCarousel: null,
        photoIndex: 0,
        isOpen: false,
    });


  // Views
  let StickyAppBar,
  slideItems,
  gallerySlideItems,
  lightboxImages = [],
  stickyHeaderView,
  productImages;

  if (product) {

    if (variant) {
        let tempImgs = product.images;
        //[...tempImgs][0] = variant.image;
        productImages = [variant.image, ...tempImgs];
    } else {
        productImages = product.images;
    }
    productImages.map((item) => {
        lightboxImages.push(item.src);
    });

    if (productImages) {
        slideItems = productImages.map((item, i) => (
            <div key={i}><div>
            <div className="item" key={item.id} style={{width: '80px'}}>
                <Image quality={90} height='80' width='80' src={item.thumbnail ?? item.src} style={{objectFit: 'cover'}} onContextMenu={(e)=> {e.preventDefault(); return false; }} alt={product.name} 
                className={`${process.env.NEXT_PUBLIC_IMAGE_FIT === 'cover' ? 'obj-cover' : 'obj-contain'}`}/>
            </div>
            </div>
            </div>
        ));



        const imgList = productImages.map((item, index) => {
        return <div style={{minHeight: 300}} key={index}>
                    <Image quality={100} placeholder={<Skeleton height={400}/>} onClick={(e) => handleOpenLightbox(e, index)} priority={index=== 0 ? true : false} style={{objectFit: 'cover', minHeight: 300 }} fill  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" src={item.woocommerce_single ?? item.src} onContextMenu={(e)=> {e.preventDefault(); return false; }} alt={product.name} 
                    className={`${process.env.NEXT_PUBLIC_IMAGE_FIT === 'cover' ? 'obj-cover' : 'obj-contain'}`}/>
            </div>
        } 
        );
        gallerySlideItems = <Splider options={{type:'fade'}}
                                className="mySwiper2"
                            >
                            {imgList}
                        </Splider>
        
    }else{
        gallerySlideItems = <Skeleton height={'300px'} />
    }
  }

  return (
    <div className="ps-product__thumbnail" data-vertical="true">
                    <div className="ps-wrapper in_view">
                        {gallerySlideItems}
                    </div>
                <Splider options={{isNavigation: true}}
                    className="gallery-thumbs"
                    >
                    {slideItems}
                </Splider>
                <Lightbox
                slides={slides()}
                open={photoIndex >= 0}
                //open = {false}
                index={photoIndex}
                //close={() => setSlideIndex(-1)}
                plugins={[Fullscreen, Slideshow, Thumbnails, Zoom]}
            />
                {/* {isOpen && (
                    <Lightbox
                        style={{zIndex: 20000}}
                        mainSrc={lightboxImages[photoIndex]}
                        nextSrc={
                            lightboxImages[
                                (photoIndex + 1) % lightboxImages.length
                            ]
                        }
                        prevSrc={
                            lightboxImages[
                                (photoIndex + lightboxImages.length - 1) %
                                    lightboxImages.length
                            ]
                        }
                        onCloseRequest={() => setState({...state, isOpen: false })}
                        onMovePrevRequest={() =>
                            setState({
                                ...state,
                                photoIndex:
                                    (photoIndex + lightboxImages.length - 1) %
                                    lightboxImages.length,
                            })
                        }
                        onMoveNextRequest={() =>
                            setState({
                                ...state,
                                photoIndex:
                                    (photoIndex + 1) % lightboxImages.length,
                            })
                        }
                    />
                )} */}
            
            </div>
  )
}
export default HeaderGallery