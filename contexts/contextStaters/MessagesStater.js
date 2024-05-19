import { useRecoilValue, useSetRecoilState } from "recoil";
import { authState, messagesState } from "../atoms";
import useSWR from "swr";
import { getBPThreadsUrl, fetcher } from "@/helpers/rest";
import { useEffect } from "react";


const MessagesStater = () => {
     
    const setMsgs = useSetRecoilState(messagesState);
    const {user, token} = useRecoilValue(authState);
  
  let payload = {
    user_id : user?.id,
  }
  
  useEffect(() => {
  }, [token])
  
  
  const {data:messages, error} = useSWR(user ? getBPThreadsUrl(payload, token) : null, fetcher, {
      revalidateIfStale: false, revalidateOnFocus: false, revalidateOnReconnect: false,
       refreshInterval: 120000 });
      if(Array.isArray(messages)){
          setMsgs(messages);
      }else{
          setMsgs([])
      }
  }

export default MessagesStater