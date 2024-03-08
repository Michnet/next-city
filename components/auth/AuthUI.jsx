import SignIn from '@/components/auth/signIn';
import SignUp from '@/components/auth/signUp';
import SocialLogin from '@/components/auth/SocialLogin';
import { WPDomain } from '@/helpers/base';
import { useState } from 'react';


function AuthUI() {
//const [loading, setLoading] = useState(false);
const [loginForm, setLoginForm] = useState(true);

  return (

        <div className="card mb-0" >
            <div>
                <div className="ps-5 pe-5 sm:px-15 py-5">
                  <div className='d-flex flex-row justify-center gap-2 align-items-end'>  
                    <div className={`access_toggler ${loginForm ? '_active' : ''}`} onClick ={() => setLoginForm(true)}>
                        <h1 className="text-center font-800 mb-0">Sign In</h1>
                        <p className="color-highlight text-center mt-1 form_desc">Let's get you logged in</p>
                    </div>

                    <div className="divider vertical"></div>

                    <div className={`access_toggler ${!loginForm ? '_active' : ''}`} onClick ={() => setLoginForm(false)}>
                        <h1 className="text-center font-800 mb-0">Sign Up</h1>
                        <p className="color-highlight text-center mt-1 form_desc">Create an Account. It's free!</p>
                    </div></div>

                    <div className="divider mt-4 spacer"></div>

                    {loginForm ? 
                    <SignIn/>
                    :
                    <SignUp/>
                    }
                    <div className="d-flex mt-4 mb-4">
                        <div className="w-50 font-11 pb-2 text-start"><span onClick={() => setLoginForm(!loginForm)} href="page-signup-2.html">{loginForm ? "I'm new here " : 'Already a member'}</span></div>
                        
                        <div className="w-50 font-11 pb-2 text-end"><a target={'_blank'} href={`${WPDomain}/my-account/lost-password`}>Forgot Credentials</a></div>
                    </div>

                    <div className="divider mt-4"></div>

                    <SocialLogin/>
                </div>
            </div>
        </div>
  )
}
export default AuthUI