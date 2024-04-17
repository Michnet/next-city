
import { Avatar } from "@/components/UI/Partials";
import Widget from "@/components/UI/partials/Widget";

const TeamMini = ({list, rounded, title, description}) => {
  return (
    <Widget styleName="gx-card-profile-sm" headless title={title} description={description}>
      <div className="gx-pt-2">
        <ul className="list-unstyled d-flex flex-row gap-2">
          {list.map((user, index) => {
              const {first_name, last_name, mylisting_accordion_photo} = user;
              return <li className="mb-2" key={index}>
                <div className="gx-user-card">
                  <Avatar width={70} height={70} rounded={rounded} src={mylisting_accordion_photo}/>
                  <div className="_content">
                    <h6>{first_name}</h6>
                  </div>
                </div>
              </li>;
            })}
        </ul>
      </div>
    </Widget>
  )
};
export default TeamMini;
