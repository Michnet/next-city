import  {useState, useEffect, memo} from "react";
//import { getDirTerms, fetchListings } from "../../../../server/WpRest";
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry";
//import SectionHeading from "appComponents/components/partials/SectionHeading";
//import { LoaderBlueBars } from "appComponents/components/loaders/loaders";

//import DualColorHeader from "../../partials/DualColorHeader";
import { useRecoilValue } from "recoil";
import { authState } from "@/contexts/atoms";
import dynamic from "next/dynamic";
//import CallToActions from "~/components/common/CallToActions";
import Link from "next/link";
import { fetchListings, getDirTerms } from "@/helpers/rest";
import { CircularProgress } from "@/components/skeletons/Loaders";
import { DualColorHeader } from "../Partials";
import CallToActions from "../CallToActions";

const ListingsBlockConst = ({noCats, author, forAuthor, icon, title, widgey, ids, sidebar, mini, randomize, keyId, layout, exClass, items}) => {
const [loading, setLoading] = useState(true);
const [listings, setListings] = useState(items ?? []);
const [category, setCategory] = useState('');
const [cats, setCats] = useState(null);
const [page, setPage] = useState(1);
const [totalPages, setTotalPages] = useState(0);

const {user, token} = useRecoilValue(authState);

const [horizontal, setHorizontal] = useState(layout== 'horizontal');

  
async function getTaxonomies(taxonomy, catFilter) {
  const catsResult = await getDirTerms(taxonomy, catFilter);
  if (catsResult) {
 
      setCats(catsResult.items);
  
  }
}

async function listingsQuery(payload) {
  const fetchedListings = await fetchListings(payload);
  if (fetchedListings) {
      setListings(fetchedListings.items);
      setLoading(false);
     /*  setQueryPage(1);*/
      setTotalPages( parseInt(fetchedListings.totalPages, 10)); 
      return fetchedListings;
  } else {
      setListings([]);
      setLoading(false);
  }
}

async function listingsQueryMore(payload) {
  const fetchedListings = await fetchListings(payload);
  if (fetchedListings) {
     
      setListings(listings.concat(fetchedListings.items));
      setLoading(false);
     /*  setQueryPage(1);*/
      setTotalPages( parseInt(fetchedListings.totalPages, 10)); 
      return fetchedListings;
  } else {
      setListings([]);
      setLoading(false);
  }
}

function reset(){
  setListings([]);
  setLoading(true);
  setPage(1);
}

const payload = {
  _fields : "id,title,slug,event_date,featured_media,featured,rating,acf,short_desc,page_views,level,category,_links,type,xtra_large_thumb, gallery,locations",
  _embed : true,
  per_page : 5,
  page: page
  }
  if(author){
    payload.author = author;
  }
  if(ids){
    payload.include = ids
  }
  if(category){
    payload.category = category 
  }
  if(keyId){
    payload.exclude = keyId
  }
  if(randomize){
    payload.random = 'true'
  }

useEffect(() => {
  if(!noCats){
    const taxonomy = 'dir_categories'
      const catPayLoad = {
        _fields: 'id,count,description,name,slug',
        order: 'desc',
        orderby: 'count',
        per_page: 3
    }
      getTaxonomies(taxonomy, catPayLoad);
  }  

}, []);

useEffect(() => {
 if(!items){
  listingsQueryMore(payload); 
 }
}, [page]);

useEffect(() => {
  reset();
  listingsQuery(payload); 
 }, [category])

useEffect(() => {
 reset();
 setCategory('');
 listingsQuery(payload); 
}, [keyId])


//const { data:listings, error } = useSWR(fetchListingsUrl({...load, _embed : true }), fetcher);


let catsList, listingsView, loadingView, Card;
if(cats){
    catsList = cats.map(cat => {
      return <button disabled={category == cat.id} type="button" className={`btn ${category == cat.id ? 'active' : ''}`} onClick={() => setCategory(cat.id)} key={cat.id} >{<span dangerouslySetInnerHTML={{__html: cat.name}}/>}</button>
        
    });
}

if(listings){
  if(forAuthor){
    //Card = dynamic(() => import("./AuthorListingCard"));
    listingsView = <div className="row md:ml-0 md:mr-0"> { listings.map((listing) =>{
      return <div className={`col-12 ${sidebar ? 'col-md-6' : 'col-md-12 '} col-xl-12 md:pl-0 md:pr-0`}> 
        <Card token={token} user={user}  key={listing.id} data={listing} mini={mini}/>
        </div> 
    })} 
      </div>
  }else{
    if(horizontal){
      listingsView = <div className="row md:ml-0 md:mr-0"> { listings.map((listing) =>{
    const {type} = listing;
    if(type === "event"){
     // Card = dynamic(() => import("~/components/activity/ActivityCard3"));
      return <Card key={listing.id} item={listing} exClass={'mb-3 p-0'} dateWidth = {'120px'}/>
    }
    //Card = dynamic(() => import("./ListingCard-Horizontal"));
    return <div className={`col-12 ${sidebar ? 'col-md-6' : 'col-md-12 '} col-xl-12 md:pl-0 md:pr-0`}> 
      <Card user={user}  key={listing.id} data={listing} mini={mini}/>
      </div> 
  })} 
    </div>
  }else{
    //Card = dynamic(() => import("~/components/activity/ActivityCard2"));
    listingsView = <ResponsiveMasonry columnsCountBreakPoints={sidebar ? {0 : 1, 479 : 2, 768 : 3, 1199 : 1} : {479: 2, 750: 3, 900: 3}}>
    <Masonry gutter="10px">{ listings.map((listing) => {
      const {type} = listing;
      if(type === 'event'){
        return <Card exClass={`mb-1 bg-transparent ${mini ? ' _mini' : ''}`} item={listing}/>
      }
      //Card = dynamic(() => import("./ListingCard"));
      <Card key={listing.id} listing={listing} user={user} layout={layout}/> 
  })
  }  </Masonry>
  </ResponsiveMasonry>
}
  }
}  else {
  if(forAuthor){
    listingsView = <CallToActions light bgClass={'bg-white'} icon={'bi-add'} title={'Create your first page'} descript={"You have not created your first listing page yet. You can start now. It's totally free"} actionComponent={<Link className="btn btn-theme" href={'/add-listing'}>Create Your First Page</Link>}/>
  }else{
    listingsView = <div>No pages found that match your search ...</div>
  }
}

if(loading){
  loadingView = <CircularProgress/>
}

    return (
      <div className={`shadow-none ${widgey ? 'widgey' : ''} ${exClass ?? ''}`}>
        <div className={`row justify-between block_head`}>
          {title && <DualColorHeader exClass="col col-sm-3 px-0" antIcon={icon} title={title}/>}
          <div className="block_head_right col col-sm-9 px-0">
              {noCats ? <></> : <div className="gx-mx-sm-2">
                <div className="gx-radio-group-link gx-radio-group-link">
                  {catsList}
                </div>
              </div>}
              <div className='view_type'>
                <button disabled={!horizontal} onClick={() => setHorizontal(false)}><i className="las la-border-all"></i></button>
                <button disabled={horizontal} onClick={() => setHorizontal(true)}><i className="las la-th-list"></i></button>
            </div>
          </div>
        </div>

        <div>{listingsView}</div>
        {loadingView}

        {totalPages > page ? <button className="btn btn-sm btn-secondary mt-3" onClick={() => {setLoading(true); setPage(page + 1)}}>Show More</button> : null}

      </div>
    );
  }

const ListingsBlock = memo(ListingsBlockConst);
export default ListingsBlock;
