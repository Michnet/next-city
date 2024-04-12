import  {useRef} from "react";
import { scrollToSpot, useDidMountEffect } from "@/helpers/universal";

const PageScroller = ({activeKey, resetKey}) => {
  
  const tabRef = useRef(null);
  const scroller = () => scrollToSpot(tabRef, 120);

useDidMountEffect(() => {
  scroller(); 
}, [activeKey]);    

    return (
      <>
      <div id='page_scroller' ref={tabRef}/>
      </>               
    );
}

export default PageScroller;


