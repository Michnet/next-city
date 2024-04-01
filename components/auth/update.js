
//import IntlMessages from "../../../util/IntlMessages";
// import {useAuth, useAuthState} from "../../../util/use-auth";
// import CircularProgress from "../../../appComponents components/CircularProgress";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { authState } from "@/contexts/atoms";
import { useAuthState } from "@/helpers/use-auth";
import { CircularProgress } from "../skeletons/Loaders";


const UpdateUser = ({id}) => {
  //const {isLoading, getAuthUser, userUpdate} = useAuth;
  const {getAuthUser, userUpdate} = useRecoilValue(useAuthState);
  const {token, user, isLoading} = useRecoilValue(authState);
  const [params, setParams] = useState({user_id: id});
  const {first_name, last_name, email,description,name} = user ?? {};


  const onFinish = event => {
    event.preventDefault();
    userUpdate({...params, JWT: token}, () => {
      getAuthUser();
    } );
  };

  return (
    <div className="gx-app-login-wrap">
      <div className="gx-app-login-container">
        <div>

          <div>
            <form
              onSubmit={(e) => onFinish(e)}
              className="gx-signin-form gx-form-row0">
              <div  className="mb-3">
                <label for="nameInput" className="form-label mb-0">Display Name</label>
                <div id="nameHelp" className="form-text">Name shown to other users on the site</div>
                <input defaultValue={name} type="text" className="form-control" id="nameInput" aria-describedby="nameHelp" placeholder="Name" required onChange={(e) => setParams({...params, display_name:e.target.value})}/>
              </div>

              <div  className="mb-3">
                <label for="emailInput" className="form-label mb-0">Email address</label>
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                <input defaultValue={email} type="email" className="form-control" id="emailInput" aria-describedby="emailHelp" placeholder="Email" onChange={(e) => setParams({...params, email:e.target.value})}/>
              </div>

              <div  className="mb-3">
                <label for="firstNameInput" className="form-label mb-0">First Name</label>
                <input defaultValue={first_name} type="text" className="form-control" id="firstNameInput" placeholder="First Name"  onChange={(e) => setParams({...params, first_name:e.target.value})}/>
              </div>

              <div  className="mb-3">
                <label for="lasttNameInput" className="form-label mb-0">Last Name</label>
                <input defaultValue={last_name} type="text" className="form-control" id="lasttNameInput" placeholder="Last Name" onChange={(e) => setParams({...params, last_name:e.target.value})}/>
              </div>
              {/* <div className="mb-3">
                <label for="_pass" className="form-label mb-0">Password</label>
                <input type="password" className="form-control" id="_pass" placeholder="Password" required onChange={(e) => setParams({...params, password:e.target.value})}/>
              </div> */}
              <div className="mb-3 form-check">
                <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                <label className="form-check-label" for="exampleCheck1">By signing up, I accept the Terms of service</label>
              </div>

                <div><button  className="btn btn-theme" type="submit">
                  Update Profile
                </button>
              </div>
            </form>
          </div>
          {isLoading &&
          <div className="gx-loader-view">
            <CircularProgress/>
          </div>}
        </div>
      </div>
    </div>
  );
};

export default UpdateUser;
