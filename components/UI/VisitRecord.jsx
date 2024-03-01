import { useEffect } from 'react';
import {useRecoilValue, useRecoilState } from 'recoil';
import { actionsState, locationState } from '@/contexts/atoms';
import { recordVisit } from '@/helpers/rest';

function VisitRecord({Id}) {
  const [actions, setActions] = useRecoilState(actionsState);
  const {city} = useRecoilValue(locationState);
  const {viewed} = actions;

  const postVisit = async(payload) => {
        await recordVisit(payload);
        if(viewed?.length > 0){
          let index = viewed.indexOf(Id);
          if(index > -1){
            return;
          }else{
            setActions({...actions, viewed:[...viewed, Id]})
          }
        }else{
          setActions({...actions, viewed:[Id]});
        }
  }
  
  useEffect(() => {
    let load = {listing_id : Id}
    if(city && city !== 'undefined'){
      load.city = city;
    }
   postVisit(load)
  }, [Id])
  

  return (
    <></>
  )
}

export default VisitRecord
