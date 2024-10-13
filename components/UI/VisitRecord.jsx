"use client";

import { useEffect } from 'react';
import {useRecoilValue, useRecoilState } from 'recoil';
import { actionsState, locationState } from '@/contexts/atoms';
import { recordVisit } from '@/helpers/rest';

const controller = new AbortController();

function VisitRecord({Id}) {
  const [actions, setActions] = useRecoilState(actionsState);
  const {city} = useRecoilValue(locationState);
  const {viewed} = actions;

  const {signal} = controller;

  const postVisit = async(payload, signal) => {
        await recordVisit(payload, signal);
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
        controller.abort();
  }
  
  useEffect(() => {
    let load = {listing_id : Id}
    if(city && city !== 'undefined'){
      load.city = city;
    }
   postVisit(load, signal)
   return () => controller.abort();
  }, [Id])
  

  return (
    <></>
  )
}

export default VisitRecord
