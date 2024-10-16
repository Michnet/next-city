"use client";
import { siteState } from '@/contexts/siteContext';
import { closeMenus } from "@/helpers/appjs"
import { getDirTerms } from '@/helpers/rest';
//import { useRouter } from 'next/router';
import { useSearchParams, useRouter} from 'next/navigation';
import  {useEffect, useState} from 'react';
import { useRecoilValue } from 'recoil';
//import {siteState } from '../../../contexts/siteContext';
import { TermIcon } from '../partials/termLinks';
//import TermCarouselIcon from './TermCarouselIcon';

const TermsGrid = ({id, listy, exClass, shadowy=true}) => {
    const [cats, setCats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [orderBy, setOrderBy] = useState('count');

    const searchParams = useSearchParams()
 
    const queryCategory = searchParams.get('category')

    //const {query} = useRouter();
    //const queryCategory = query?.category
    let taxfields = "id,count,extra_meta,term_meta,description,parent,name,slug";


    const { dirCats} = useRecoilValue(siteState);

    const catsFilterArr = {
        _fields : taxfields,
        parent: 0 ?? 0,
        per_page: 5,
        orderby:'count',
        order: 'desc'
      }
      //Get event categories
      async function getCats(){
        const eCats = await getDirTerms('categories', catsFilterArr);
        if(eCats){
            setCats(eCats); 
        }
        setLoading(false);
      }
     
   /*  function getTaxonomies() {
        if(dirCats){
            const catId = () => {
                if(id){ 
                    return id
                }else {
                return 0 }
            }
            const editedList = dirCats.filter(item => item.parent === catId() && item.count > 0).sort((a, b) => (a[orderBy] < b[orderBy]) ? 1 : -1);

            setCats(editedList);
            setLoading(false);
        }
      } */

useEffect(() => {
   getCats();
  
  }, [id]);
/* useEffect(() => {
   getCats();
  
  }, [dirCats]); */

  let catsArray;
  if(cats){
   catsArray = cats.map(cat => {
       return <div className={`${listy ? 'col listy px-0' : 'col-md-3 col-sm-4 col-xs-6'}`}> <TermIcon onClick={() => closeMenus()} shadowy exClass={cat.slug === queryCategory ? 'active' : null}  key = {cat.id} item = {cat} /> </div>
   })
  }

    return (
        <div className={`terms_grid contain ${exClass ?? ''}`}>
            <div className='row'> {catsArray} </div>
            
        </div>
    )
}

export default TermsGrid
