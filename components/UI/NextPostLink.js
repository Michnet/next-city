import { nextPostState } from "@/contexts/atoms";
import Link from "next/link";
import { useRecoilValue } from "recoil";

const NextPostLink = ({current}) => {
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

  export default NextPostLink;