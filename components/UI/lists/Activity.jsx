import { useRecoilValue } from "recoil";
import { authState } from "@/contexts/atoms";
import SiteActivity from "./SiteActivity";
import ProfileHeader from "../user/ProfileHeader";

function Activity() {
    const {user, token} = useRecoilValue(authState);

  return (
    <div className="recent_activity">
		<ProfileHeader user={user}/>
		<div className="mb-4"></div>

        <SiteActivity user={user} token={token}/>
    </div>
    )
}
export default Activity;