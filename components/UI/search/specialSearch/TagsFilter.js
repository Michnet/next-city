import {  Dir_tags } from "@/public/data/localCache";
import { sortArray } from "@/helpers/universal";

const TagsFilter = ({tags, setTags, query}) => {

  let queryTags = query?.tags ?? null;

    function procesTag(e, slug){
       let selected = e.target.checked;
       if(selected){
         setTags([...tags, slug])
       }else{
        let tempArr = [...tags]
        const index = tempArr.indexOf(slug);
        const x = tempArr.splice(index, 1);
        setTags(tempArr);
       }
    }
    return (
      <>
      <div className="group_header" >
           {/*  <h6 className='tax_parent'><span className='field_label'>Features</span>{`${selectTags.length > 0 ? '' : 'All Features'}`}</h6> */}
            {/* <div className='select_tags'>{processTagsTitle(selectTags)}</div> */}
        </div>

        {sortArray(Dir_tags, 'count', false).slice(0, 10).map((filter) => {
            const {name, count, id, slug} = filter;
            let active = queryTags && queryTags.includes(slug);
            return (
                <div key={id} className="row y-gap-10 items-center justify-left flex-nowrap">
                    <div className="col-auto">
                    <div className="form-checkbox d-flex text-14">
                        <input disabled={active} checked={active} type="checkbox" onChange={(e) => procesTag(e, slug)}/>
                        <div className="form-checkbox__mark">
                        <div className="form-checkbox__icon icon-check" />
                        </div>
                        <div className={`ml-10 ${active ? '_active opacity-50' : 'opacity-80'}`}>
                          {name}
                          <span className={`badge bg-highlight`}>{count}</span>
                        </div>
                    </div>
                    </div>
                </div>
                )
            }
        )}


{/* {Dir_tags && Dir_tags.length > 0 && 
    <div> <div className="group_header" extra={<span className='group_icon'> <i className="las la-tags"></i></span>} header={<div><h6 className='tax_parent'><span className='field_label'>Place Features</span>{`${selectTags.length > 0 ? '' : 'All Features'}`}</h6><div className='select_tags'>{processTagsTitle(selectTags)}</div></div>} key="4">
        </div>
          <input placeholder="Type to filter ..." onChange={(e) => filterOptions(e.target.value, Dir_tags, setTags)}/>
          <div className='list_box'>
        <TagCloud
            className='search_tags tag-cloud  listing_tags'
            shuffle={false}
            minSize={12}
            maxSize={32}
            tags={createOptions(tags, {id:0}, null, 'All Features')}
            colorOptions={{
                luminosity: 'dark',
                //hue: 'blue',
              }}
            renderer={customTagRenderer}
            onClick={tag =>  setupTags(tag.props, selectTags, setSelectTags)}
        />
        </div>
</div>} */}
      </>
    );
  };
  
  export default TagsFilter;