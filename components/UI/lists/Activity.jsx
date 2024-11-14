import { useRecoilValue } from "recoil";
import { authState } from "@/contexts/atoms";
//import SiteActivity from "./SiteActivity";
import ProfileHeader from "../user/ProfileHeader";
import { SectionHeader } from "../Partials";
import SiteActivityWorker from "./SiteActivityWorker";

function Activity() {
    const {user, token} = useRecoilValue(authState);

  return (
    <div className="recent_activity">
		{user ? <ProfileHeader user={user}/> : <SectionHeader iconClass={'far fa-map'} bgClass={'bg-twitter'} exClass='px-3 mb-2 py-10'  title={'Around LyveCity'} subTitle={'City Updates'}/>}
		<div className="mb-4"></div>

        <SiteActivityWorker user={user} token={token}/>
    </div>
    )
}
export default Activity;