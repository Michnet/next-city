import dynamic from "next/dynamic";
import { LoaderRingBoxed } from "../Loaders";


export function urlString(str, theArray=[]){
  if(theArray?.length > 0){
    let found = theArray.find((v) => {
      return str.includes(v)});
      return found !== undefined ? found : 'undefined';
  }return 'undefined';
}


const PageLoader = ({route}) => {

  let loaderView;
  let listingRoutes = ['/events/','/places/','/special-sales/'];
if(route){
  if(route.includes(urlString(route, listingRoutes))){
    const ListingSkeleton = dynamic(() => import("./ListingSkeleton"));
    loaderView = <ListingSkeleton/>
  }else{
    loaderView = <div style={{height: '100vh'}}><LoaderRingBoxed/></div>
  }
}else{
  loaderView = <div style={{height: '100vh'}}><LoaderRingBoxed/></div>
}
  
  return <>{loaderView}</>
}

export default PageLoader;