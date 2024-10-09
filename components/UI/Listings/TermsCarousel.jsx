import { getDirTerms, getLocalTaxonomy } from "@/helpers/rest";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Splider from "../partials/Splider";
import { TermIconBox } from "../partials/termLinks"
import Mirrored from './../partials/Mirrored';

function TermsCarousel({items=[], slug, listingType, type, flipped=false, queryKey, heady, exClass='', filterArr, setFilterArr, inactiveLinks, infinity, imagey, variant, taxonomy}){
    const {query} = useRouter();
    const [locItems, setLocItems] = useState(items);
    const[loading, setLoading] = useState(true);

    function parentTerm(){
        if(query[`${queryKey}`]){ 
            return query[`${queryKey}`];
        }else if(slug) {
            return slug; 
        }else{
            return null;
        }
    }

    let localSlug=  parentTerm();

    let taxfields = "id,count,extra_meta,term_meta,description,parent,name,slug";

    const catsFilterArr = {
        _fields : taxfields,
        per_page: 15,
        orderby:'count',
        order: 'desc'
      }
      async function getCats(pCatId){
        const eCats = await getDirTerms('categories', {...catsFilterArr, parent: pCatId});
        if(eCats){
            setLocItems(eCats); 
        }
        setLoading(false);
      }
      //Get event categories
      async function getPCat(){
      if(localSlug){
        const pCats = await getDirTerms('categories', {_fields: 'id', slug: localSlug});
        if(pCats){
           await getCats(pCats[0]?.id);
         }else{
            await getCats('0')
         }
        }else{
           await getCats('0')
        }
      }
      

    useEffect(() => {
         /* if(fetchCondition()){
            return;
         }else{ */
            //getLocalTaxonomy({taxonomy: 'categories', parent_slug : parentTerm(), setter:setLocItems});
         //}
         getPCat();
       }, [query, slug, listingType,type]);
    
       useEffect(() => {
        if(locItems?.length > 0){
            items = [...locItems];
        }
       }, [locItems]);

       const splitIndex = infinity ? locItems?.length : 6;
        //const columns = generateTempArray(heady ? locItems?.length : splitIndex).map((item) => ( 'auto' ));

        let catsArray;
        if(locItems?.length > 0){
            if(type === 'dir_cats'){
        catsArray = locItems.map((cat, i) => {
            return <TermIconBox listingType={listingType} flipped={flipped} exClass='mb-3 mx-1 rounded-4' item={cat} key={i}  shadowy/>
            /* return <Mirrored exClass='mb-4' YDistance={50} gap='3px' skewDegrees={0}><TermIconBox listingType={listingType} flipped={flipped} exClass='mx-1 rounded-4' item={cat} key={i}  shadowy/></Mirrored> */
        }) }/* if(type === 'shop_cats'){
            catsArray = locItems.map(cat => {
                return <div onClick={() => setFilterArr({...filterArr, category:cat.id})}><TermCarouselItemImg key = {cat.id} term = {cat} inactive={inactiveLinks}/></div>
            })
        } */
        }




  return (
    <>{catsArray?.length > 0 ? <Splider exClass={`terms_carousel ${exClass}`} options={{pagination: false, breakpoints: { 600: {pagination: false}, }, arrows: false, autoWidth: true, wheel: true, padding: { left: 10, right: 15, top:7}, perPage:1, autoplay: false, perMove: 1, interval:4000, type:'loop'}}>
        {catsArray}
    </Splider> : <></>}</>
  )
}
export default TermsCarousel