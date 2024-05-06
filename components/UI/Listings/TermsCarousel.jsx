import { getLocalTaxonomy } from "@/helpers/rest";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Splider from "../partials/Splider";
import { TermIcon } from "../partials/termLinks"

function TermsCarousel({items=[], slug, type, queryLink, queryKey, heady, exClass, filterArr, setFilterArr, inactiveLinks, infinity, imagey, variant, taxonomy}){
    const {query} = useRouter();
    const [locItems, setLocItems] = useState(items)


    function parentTerm(){
        if(query[`${queryKey}`]){ 
            return query[`${queryKey}`];
        }else if(slug) {
            return slug; 
        }else{
            return 'events';
        }
    }

    function fetchCondition(){
        console.log('running condition')
        if(locItems?.length > 0){
            if(query){
                if(query[`${queryKey}`]){
                    return false;
                }else{
                    return true;
                }
            }else{
                true;
            }
        }else{
            return false;
        }
    }

    useEffect(() => {
         /* if(fetchCondition()){
            return;
         }else{ */
            getLocalTaxonomy({taxonomy: 'categories', parent_slug : parentTerm(), setter:setLocItems});
         //}
       }, [query]);
    
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
            return <><TermIcon item={cat} key={i}  shadowy/></>
        }) }/* if(type === 'shop_cats'){
            catsArray = locItems.map(cat => {
                return <div onClick={() => setFilterArr({...filterArr, category:cat.id})}><TermCarouselItemImg key = {cat.id} term = {cat} inactive={inactiveLinks}/></div>
            })
        } */
        }




  return (
    <>{catsArray?.length > 0 ? <Splider height={100} options={{pagination: false, arrows: false, height: 100, autoWidth: true, wheel: true, padding: { left: 10, right: 15, top:7}, perPage:1, autoplay: true, perMove: 1, interval:4000, type:'loop'}}>
        {catsArray}
    </Splider> : <></>}</>
  )
}
export default TermsCarousel