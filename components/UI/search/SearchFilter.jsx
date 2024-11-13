import  {memo, useEffect, useState} from 'react';
import { useRouter } from 'next/router';
// import { Dir_categories } from '@/public/data/localCache';
//import CustomScrollbars from 'util/CustomScrollbars';
// import TaggedSearch from 'appComponents/components/SearchForms/TaggedSearch';
import { Dir_categories, Dir_locations, Dir_tags } from '@/public/data/localCache';
import TaggedSearch from './TaggedSearch';

function SearchFilterConst() {
    const router = useRouter();

    const [cats, setCats] = useState(null);
    const [locations, setLocations] = useState(null);
    const [parentCats, setParentCats] = useState(null);
    const [category, setCategory] = useState(null);
    const [location, setLocation] = useState(null);
    const [orderBy, setOrderBy] = useState('count');
    const [tags, setTags] = useState(null);
    const [searchCat, setSearchCat] = useState(null);
    const [searchTags, setSearchTags] = useState(null);

    const {query} = router;

    function getQueryVariable(id, pool){
    return pool.filter((item) => item.id === id)[0];
    }

    function getQueryTagVariable(ids, pool){
        if(ids && ids.length > 0){
            let finalArr =[];
            ids.map((id) => {
                finalArr.push(pool.filter((item) => item.id === parseInt(id))[0])
            })

            return finalArr;
        }    
    }

    
    useEffect(() => {
        let catId;
        if(query.category){
            catId = query.category
        }
        //getTaxonomies();
    }, [query]);

      useEffect(() => {
        if(Dir_categories){
            setCats(Dir_categories);
        }
        if(Dir_locations){
            setLocations(Dir_locations)
        }
      }, [Dir_categories, Dir_locations]);

      useEffect(() => {
        if(Dir_categories){
            if(query.category){
            setCategory(getQueryVariable(parseInt(query.category), Dir_categories))
            }
        }
        if(Dir_locations){
            if(query.location){
                setLocation(getQueryVariable(parseInt(query.location), Dir_locations))
            }
        }

        if(Dir_tags){
            if(query.tags){
                setTags(getQueryTagVariable(query.tags.split(','), Dir_tags))
            }
        }

      }, [router]);
      
      

    function filteredSearch(){
     
        let filter = {};
        //const cat = router.query.category;
        
         if(searchCat){
             filter.category = searchCat
         }
         if(searchTags){
            filter.tags = searchTags.join(',')
        }
        resetValues();
         
        router.push({
         pathname: '/search',
         query: filter
       }, undefined, {shallow : false});
        setMobVisible(false);

    }

    function resetValues(){
        setCategory(null);
        setSearchCat(null);
        setCats(null);
        setParentCats(null);
    }

    function resetSearch(){
        resetValues();
        router.push({
            pathname: '/search'
          });
    }

    function setChosenCats(e){

        if(searchCat){
            var c = e.concat(...searchCat)
            var d = c.filter((item, pos) => c.indexOf(item) === pos);
            setSearchCat(d)
        }else{
            setSearchCat(e);
        }
    }
    let catsView, tagsList, catsList;

    return (
            <div className='filter_body'>
                    <TaggedSearch modal accordion   
                            category={category} location={location} queryTags={tags} setSearchCat={setSearchCat}
                            setSearchTags={setSearchTags}
                            />
          {/*       <Collapse defaultActiveKey={'cats'} expandIconPosition='right' ghost>
                    {cats && 
                        <Panel header="By Category" key="cats">
                            {catsView }
                        </Panel>}
                    {parentCats && 
                        <Panel header="By Category" key="cats">
                            {catsView }
                        </Panel>}
                    {tagsList && 
                        <Panel header="By tags" key="2">
                            <div className='search_filter_group'>
                                <h4>Tags</h4>
                                <Checkbox.Group options={tagsList} onChange={e => {setSearchTags(e)}} />
                            </div>
                        </Panel>}
                    </Collapse> */}
                    
            </div>
            
    )
}

const SearchFilter = memo(SearchFilterConst);
export default SearchFilter;
