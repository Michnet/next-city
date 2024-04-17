import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

const Photos = ({ photoList }) => {
  const [index, setIndex] = useState(-1);

  function slides() {
    return photoList.map((pic, index) => {
      return {
        src : pic 
      }
    })
  }

  return (
    <div className="photo_grid">
      <div className="d-grid">
          {photoList.map((photo, index) => {
            if(index < 4){
            return <div className="grid_img" key={index}>
              <img alt="..." src={photo} onClick={() => setIndex(index)}/>
            </div>
            }
})}
        </div>

      <Lightbox
                slides={slides()}
                open={index >= 0}
                index={index}
                close={() => setIndex(-1)}
                plugins={[Fullscreen, Slideshow, Thumbnails, Zoom]}
            />
    </div>
  );
};
export default Photos;
