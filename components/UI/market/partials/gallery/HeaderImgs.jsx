import { Splide, SplideSlide } from "@splidejs/react-splide"
import React, { useEffect, useRef } from "react"

export const HeaderImgs = ({product, variant}) => {
  /**
   * The main Splide component.
   */
  let mainRef = useRef(null)

  /**
   * The thumbnail Splide component.
   */
  let thumbsRef = useRef(null)


  useEffect(() => {
    if (mainRef.current &&
        thumbsRef.current &&
        thumbsRef.current.splide
      ) {
        mainRef.current.sync(thumbsRef.current.splide)
      }
  
    /* return () => {
      second
    } */
  }, [])
  

    const mainOptions = {
      type: "loop",
      perPage: 1,
      perMove: 1,
      gap: "1rem",
      pagination: false,
      height: "350px"
    }

    const thumbsOptions = {
      type: "slide",
      rewind: true,
      gap: "1rem",
      pagination: false,
      fixedWidth: 110,
      fixedHeight: 70,
      cover: true,
      focus: "center",
      isNavigation: true
    }

    let slideImages;

    if (variant) {
        let tempImgs = product.images;
        //[...tempImgs][0] = variant.image;
        slideImages = [variant.image, ...tempImgs];
    } else {
        slideImages = product.images;
    }

    function slides() {
        return slideImages.map(slide => (
          <SplideSlide key={slide.src}>
            <img src={slide.src} alt={slide.alt} />
          </SplideSlide>
        ))
      }

    return (
      <div className="pdt_hero mb-2">
        <Splide
            //style={{height: 300}}
          className="main_frame mb-1"
          options={mainOptions}
          ref={mainRef}
          aria-labelledby="thumbnail-slider-example"
        >
          {slides()}
        </Splide>

        {slideImages?.length > 1 && <Splide
          options={thumbsOptions}
          className="thumbs_frame"
          ref={thumbsRef}
          aria-label="The carousel with thumbnails. Selecting a thumbnail will change the main carousel"
        >
          {slides()}
        </Splide>}
      </div>
    )
}
