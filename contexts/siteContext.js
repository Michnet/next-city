import {  useEffect } from "react";
//import {getDirTerms } from "../../server/WpRest";
import { Dir_categories, Dir_locations, Dir_tags, Shop_categories } from "@/public/data/localCache";
import { atom } from 'recoil';
import { useSetRecoilState } from 'recoil';

//export const SiteContext = ({children}) => <>{children}</>;


export const siteState = atom({
    key: 'siteState', 
    default: {}, 
});


export default function SiteProvider(){

const setState = useSetRecoilState(siteState);


/* 
async function marketQuery(shopCatsLoad, dirCatsLoad, dirTagsLoad) {
    const localDirTags = localStorage.getItem('dirTags');
    if(!localDirTags){
        const taxonomy = 'dir_tags';
        const dirTagsResult = await getDirTerms(taxonomy, dirTagsLoad);
        if (dirTagsResult) {
            localStorage.setItem('dirTags', JSON.stringify(dirTagsResult.items))
        }
    }
    } */

    let stateObj = {}
 


useEffect(() => {
    
    if(Dir_categories){
        stateObj.dirCats = Dir_categories
      //  setDirCats(Dir_categories);
    }
    if(Shop_categories){
        stateObj.shopCats = Shop_categories
    //setShopCats(Shop_categories);
    }
    if(Dir_locations){
        stateObj.dirLocations = Dir_locations
    //setDirLocations(Dir_locations);
    }
    if(Dir_tags){
        stateObj.dirTagsLoad = Dir_tags
    //setDirTags(Dir_tags);
    }
    const shopCatsLoad = {}
    const dirCatsLoad = {per_page: 100}
    const dirTagsLoad = {per_page: 100}
    //marketQuery(shopCatsLoad, dirCatsLoad, dirTagsLoad);

    setState({...stateObj});

}, [ Dir_categories, Dir_locations, Dir_tags, Shop_categories]);
   
    return (<div id="siteState"/>);
} 