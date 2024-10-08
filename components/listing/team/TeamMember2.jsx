
//import { truncateString } from "../../../../server/UniversalFunctions";

import { Avatar } from "@/components/UI/Partials";
import { resizedImage } from "@/helpers/universal";

const TeamMember2 = ({member, styles, avatarSize=100}) => {
  const {brief_description, first_name, last_name, mylisting_accordion_photo, qualifications, job_title} = member;
  return (
    <div className="team-member gx-slide-item mx-0 w-fit">
      <div className={`mem_pic`}> <Avatar rounded width={avatarSize} height={avatarSize} src={`${resizedImage(mylisting_accordion_photo, 'medium')}`} alt="..."/> 
      </div>
      <div className="mem__details"> 
        <p className="mem_name mb-n2"><span className="f_name fw-300 color-listing-theme">{first_name}</span><span className="l_name">{last_name}</span></p>
        <p className="mem_qual">{qualifications}</p>
        <span className="mem_position">{job_title}</span>
        <p className="mem_intro gray_text truncate-3">{brief_description}</p>
      </div>
    </div>
  )
};

export default TeamMember2;

