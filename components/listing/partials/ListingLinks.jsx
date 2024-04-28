import { nextPostState } from "@/contexts/atoms";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";

export const NextPostLink = ({current, styleObj}) => {
    const nextP = useRecoilValue(nextPostState);
  
    return (
       <>{nextP ? <>{
        nextP == current ? <></> :
        <Link href={`/events/${nextP}`} style={{...styleObj}}><button className="nav_switch">
              <i className="fas fa-chevron-circle-right"/>
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