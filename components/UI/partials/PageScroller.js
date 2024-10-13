"use client";

import  {useRef, useEffect} from "react";
import { scrollToSpot } from "@/helpers/universal";



export const useDidMountEffect = (func, deps) => {
  const didMount = useRef(false);

  useEffect(() => {
      if (didMount.current) func();
      else didMount.current = true;
  }, deps);
}

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


