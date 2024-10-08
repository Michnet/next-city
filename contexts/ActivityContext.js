import { atom, useRecoilValue } from 'recoil';
import useSWRInfinite from "swr/infinite";
import { useSetRecoilState } from 'recoil';
import { useEffect } from 'react';
import { bPActivitiesUrl, bpPublicActivitiesUrl, fetcher } from '@/helpers/rest';
import { authState } from './atoms';

export const activityState = atom({
    key: 'activityState', 
    default: {}, 
});

export default function ActivityProvider(){
    const setAtomState = useSetRecoilState(activityState);
    let alert = '', setAlert=() => alert;
    const {user, token} = useRecoilValue(authState);

    const PAGE_SIZE = 5;

    const payload = {
        per_page : PAGE_SIZE
    }
    if(token){
       // payload.JWT = token
    }


    const { data, error, mutate, size, setSize, isValidating } = useSWRInfinite(
        (index) =>`${/* user ? bPActivitiesUrl(payload) :  */bpPublicActivitiesUrl(payload)}&page=${
            index + 1
          }`,
        fetcher,
       /*  {refreshInterval : 120000} */
        { revalidateIfStale: false, revalidateOnFocus: false, revalidateOnReconnect: false }
      );

        const activities = data ? [].concat(...data) : [];
        const isLoadingInitialData = !data && !error;
        const isLoadingMore =
            isLoadingInitialData ||
            (size > 0 && data && typeof data[size - 1] === "undefined");
        const isEmpty = data?.[0]?.length === 0;
        const isReachingEnd =
            isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE);
        const isRefreshing = isValidating && data && data.length === size;

    useEffect(() => {
        setAtomState({activities, alert, setAlert, size, setSize, isLoadingInitialData, isLoadingMore,isReachingEnd});
    }, [activities])
    

    return (<div id='ActivityState'/>
    )
}

