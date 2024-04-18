//import  HomeIcon from "react-line-awesome/dist/icons/HomeIcon";
//import {CalendarPlusIcon, CheckCircleIcon, EyeIcon, FireIcon, HeartOIcon, StarOIcon, StreetViewIcon } from "react-line-awesome";
import { useRouter } from "next/router";
import { useState } from "react";
//import LocationExtractor from "~/appComponents/components/UI/LocationExtractor";
import { useRecoilValue } from "recoil";
import { actionsState, authState, locationState } from "@/contexts/atoms";
//import { fetchLocation } from "~/server/WpRest";

export const eventsThisWeek =  {
  'event-date': 'this-week',
}

export const eventsNextWeek = {
  'event-date' : 'next-week',
}

export const eventsToday = {
  'event-date' : 'today',
}

export const eventsThisMonth = {
  'event-date' : 'this-month',
}

export const sortTopRated = {
  sort: 'top-rated'
}
export const sortLatest = {
  sort: 'latest'
}

export const sortEventDate = {
  sort : 'order-by-date'
}

export const sortRandom = {
  sort: 'random'
}

const ExplorerFilter = () => {
  const router = useRouter();
  const {query} = router;
  const {city, city_zone, coords} = useRecoilValue(locationState);

  //const [address, setAddress] = useState(null);
  const [proximity, setProximity] = useState(20);
  const [filterId, setFilterId] = useState('home');
  //const [coords, setCoords] = useState(null);

  const {user} = useRecoilValue(authState);
  const actions = useRecoilValue(actionsState);
  const {viewed} = actions;
  

  const nearbyObj = {
    sort: 'nearby',
    lat : coords?.lat ?? null,
    lon : coords?.lon ?? null,
    proximity : proximity,
    search_location: city ? `${city_zone}-${city}` : '' 
  }


  const mainLinks = [
    {id:'home',
    url : '/explore/events',
    title: 'Home',
    icon: <i className="bi bi-house"/>
    },
    /* {id:'free',
    url : '#',
    title: 'Free Events',
    icon: <CheckCircleIcon/>
    }, */
    /* {id:'trending',
    url : '#',
    title: 'Trending',
    icon: <FireIcon/>
    }, */
    {id:'top-rated',
    title: 'Top Rated',
    icon: <i className="bi bi-star"/>,
    params: sortTopRated
    },
    {id:'latest',
    title: 'Latest',
    icon: <i className="bi bi-calendar2-check"/>,
    params: sortLatest
    }
  ]

  let myLibrary = [
    {id:'near',
    title: 'Near Me',
    icon: <i className="bi bi-geo"/>,
    params: nearbyObj,
    func: () => {
      //if(address){
        let url = {pathname: '/explore/events', query: {...nearbyObj}}
        router.push(url, url)
      //}
    }
    },
  ];

  if(viewed?.length > 0){
      myLibrary.push({id:'viewed',
      url : '#',
      title: 'View History',
      icon: <i className="bi bi-eye"/>,
      func: () => {
        let url = {pathname: '/explore/events', query: {include_ids:viewed.join(',')}}
        router.push(url, url)
    }
      })
  }

  if(user){
    const {user_meta} = user;
    const {likes} = user_meta;
    if(likes?.length > 0){
      myLibrary.push({id:'liked',
      func: () => {
          let url = {pathname: '/explore/events', query: {...query, include_ids:likes.join(',')}}
          router.push(url, url, {shallow: true})
      },
      title: 'My Favourites',
      icon: <i className="bi bi-heart"/>
      })
    }
  }

  let LinkItem = ({item}) => {
    const {id, title, url, icon, params, func} = item;
      const itemParams = params ?? {};
      return <li className={`top_filter_item nav-item ${filterId === id ? 'active' : ''}`}>
                <button onClick={() => {
                  setFilterId(id); 
                  if(func){func()
                  }else{
                    let urlObj = {pathname: url ?? '/explore/events', query: id=== 'home' ? {} : {...query, ...itemParams}}
                    router.push(urlObj, urlObj, {shallow: true})}
                  }
                }  
                className="nav-link text-nowrap  d-flex gap-1 gap-md-3  border-md-0 align-items-center py-1">
                          <span className="text-15" style={{color: 'var(--bs-gray-500)'}}>{icon}</span>{title}
                </button>
              </li>
  }

  return (
    <>
               <div className="view_filter">
              <div className="d-flex flex-row flex-md-column flex-nowrap py-10 gap-2 no-scrollbar gap-md-0" style={{overflow: 'hidden', overflowX: 'auto'}}>

                <div className="filter_section ">
                  <h4 className="d-none d-md-block text-light-1 fw-bold text-uppercase px-3 my-3 text-13 gray_text">Main</h4>
                  <ul className="nav flex-row flex-nowrap flex-md-column gap-2 gap-md-0 mb-0">
                    
                    {mainLinks.map((el) => (<LinkItem key={el.id} item={el}/>))}
                  </ul>
                </div>

                <div className="filter_section">
                  <h4 className="d-none d-md-block text-light-1 fw-bold text-uppercase px-3 my-3 text-13 gray_text">Library</h4>
                  <ul className="nav flex-row flex-md-column flex-nowrap gap-2 gap-md-0  mb-0">
                    {myLibrary.map((el) => (<LinkItem key={el.id} item={el}/>))}
                  </ul>
                </div>

               
              </div>
               </div>
            
    </>
  );
};

export default ExplorerFilter;
