import dynamic from "next/dynamic";
import { LoaderRingBoxed } from "../Loaders";


const PageLoader = ({route}) => {

  console.log('loaderRoute', route);
  let loaderView;
  
  if(route.includes('/events/')){
    const ListingSkeleton = dynamic(() => import("./ListingSkeleton"));
    loaderView = <ListingSkeleton/>
  }else{
    loaderView = <div style={{height: '100vh'}}><LoaderRingBoxed/></div>
  }
  
  return <>{loaderView}</>
}

export default PageLoader;