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
              <i className="fal fa-chevron-circle-right text-24"/>
            </button></Link>}</>
            :
            <></>
        }</>
    );
  }

  
export function PreviousPostLink() {
    const router = useRouter()
   
    return (
      <button className="nav_switch link" type="button" onClick={() => router.back()}>
        <i className="fal fa-chevron-circle-left text-24"/>
      </button>
    )
  }