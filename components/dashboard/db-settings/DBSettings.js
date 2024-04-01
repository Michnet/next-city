// import UpdateUser from "~/routes/userAuth/SignUp/update";
//import SettingsTabs from "./components/SettingsTabs";

import UpdateUser from "@/components/auth/update";

const DBSettings = ({userId}) => {
  return (
    <>
      <div className='user_edit'>
                <h1 className="text-30 lh-14 fw-600">Settings</h1>
                <div className="text-15 text-light-1 mb-20">
                  Edit your profile.
                </div>

            <div className="py-30 px-30 rounded-4 bg-theme shadow-3">
              {/* <SettingsTabs /> */}
              <UpdateUser id={userId}/>
            </div>
          </div>
    </>
  );
};

export default DBSettings;
