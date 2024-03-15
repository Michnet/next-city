import { siteState } from '@/contexts/siteContext';
import { useRouter } from 'next/router';
//import { useSearchParams } from 'next/navigation';
import  {useEffect, useState} from 'react';
import { useRecoilValue } from 'recoil';
//import {siteState } from '../../../contexts/siteContext';
import { TermIcon } from '../partials/termLinks';
//import TermCarouselIcon from './TermCarouselIcon';

const TermsGrid = ({id, listy, exClass}) => {
    const [cats, setCats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [orderBy, setOrderBy] = useState('count');

    const {query} = useRouter();
    const queryCategory = query?.category

    const { dirCats} = useRecoilValue(siteState);
     
    function getTaxonomies() {
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
      }

useEffect(() => {
getTaxonomies();
  
  }, [dirCats]);

  let catsArray;
  if(cats){
   catsArray = cats.map(cat => {
       return <div className={`${listy ? 'col listy px-0' : 'col-md-3 col-sm-4 col-xs-6'}`}> <TermIcon exClass={cat.slug === queryCategory ? 'active' : null}  key = {cat.id} item = {cat} /> </div>
   })
  }

    return (
        <div className={`terms_grid contain ${exClass ?? ''}`}>
            <div className='row'> {catsArray} </div>
            
        </div>
    )
}

export default TermsGrid
