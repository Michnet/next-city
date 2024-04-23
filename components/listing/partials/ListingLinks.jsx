import { nextPostState } from "@/contexts/atoms";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";

export const NextPostLink = ({current}) => {
    const nextP = useRecoilValue(nextPostState);
  
    return (
       <>{nextP ? <>{
        nextP == current ? <></> :
        <Link href={`/events/${nextP}`}><button className="nav_switch">
              <i className="bi bi-chevron-right"/>
            </button></Link>}</>
            :
            <></>
        }</>
    );
  }

  
export function PreviousPostLink() {
    const router = useRouter()
   
    return (
      <button className="nav_switch" type="button" onClick={() => router.back()}>
        <i className="bi bi-chevron-left"/>
      </button>
    )
  }