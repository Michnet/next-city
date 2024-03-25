import {fetchListing} from '@/helpers/rest'
//import SideGrid from './SideGrid';
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry";
import { useEffect, useState } from 'react';

const ProductSide = ({listingId}) => {
  const [listing, setListing] = useState(null);
  

  const getOthers = async() => {
    let theLoad = await fetchListing(listingId, {_fields: 'acf'});
    if(theLoad){
      setListing(theLoad.listing)
    }
  }
  
  useEffect(() => {
    if(!listing){
      getOthers();
    }
    return () => {
      setListing(null)
    }
  }, [listingId]);

  
  let storeMerchView;
  if(listing){
    const {general_merchandise} = listing?.acf ?? {}

    if(general_merchandise?.length > 0){
      console.log('gnr', general_merchandise)
      //storeMerchView = <SideGrid title={'On sale at this event'} ids={general_merchandise}  orderby={'price'} listy border/>
    }else{ 
      console.log('Not long', listing);
      storeMerchView = <></>}
 }
  
  return (
      <div className='side_content'>
         <ResponsiveMasonry columnsCountBreakPoints={{479: 1, 575: 2, 768: 3, 991: 1, 1200 : 1}}>
            <Masonry gutter="10px"> 
                {storeMerchView}
            </Masonry>
          </ResponsiveMasonry>
    </div>
  )
}

export default ProductSide