import { useSetRecoilState } from 'recoil';
import {useEffect} from 'react';
import { locationState, noticeState } from '~/contexts/contexts';
import { fetchLocation } from '~/server/WpRest';
//import { showNotice } from '~/appComponents/components/UI/Notifications';
//import LocationExtractor from '~/appComponents/components/UI/LocationExtractor';


function LocationStater() {
    
    const setLocation = useSetRecoilState(locationState);
    const setNotice = useSetRecoilState(noticeState);

    let stateObj = {}

    async function alternateLocater(){
      let iPlocObj = await getIPLoc();
          if(iPlocObj){
           stateObj = {coords:'unknown', ...iPlocObj}
          }
      setNotice({message:'We are unable to detect your location', title: 'Unknown Location', titleAnnex: 'Now'});
      setLocation(stateObj);
    }
 
    function getUserLocation() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(location_success, location_error, {enableHighAccuracy: true});
        } else {
          console.log("Geolocation not supported");
          alternateLocater();
        }
      }

        const getLoc = async(location) => await fetchLocation({longitude:location.coords.lon, latitude:location.coords.lat});
        const getIPLoc = async() => await fetchLocation();

        //const getAddress = async (coords, loc, setLoc) => { return LocationExtractor(coords).then((res) => setLoc({...loc, add:res})) }
    
     
      async function location_success(position) {
        setLocation({});
        let lat =  position.coords.latitude ?? null, lon = position.coords.longitude;
        if(lat){
            stateObj = {coords:{lat:lat, lon: lon}}
            const locObj = await getLoc(stateObj);
            if(locObj){
             stateObj = {...stateObj, ...locObj}
            }
        }
        setLocation(stateObj);
      }
    
      async function location_error() {
        console.log("Unable to retrieve your location");
        alternateLocater();
      }
    
      useEffect(() => {
        getUserLocation()
      }, []);
    
     /*  useEffect(() => {
        if(location?.coords){
          const loc = fetchLocation({longitude:location.coords.lon, latitude:location.coords.lat});
        const getAddress = async () => {
        return LocationExtractor(location.coords).then((res) => setLocation({...location, add:res}))
        }
        getAddress();
      }
      }, [location?.coords]);
     */


  return (
    <div className='location_stater'></div>
  )
}
export default LocationStater