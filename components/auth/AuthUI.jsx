import SignIn from '@/components/auth/signIn';
import SignUp from '@/components/auth/signUp';
import SocialLogin from '@/components/auth/SocialLogin';
//import { authState } from '@/contexts/atoms';
import { WPDomain } from '@/helpers/base';
import { useState } from 'react';
//import { useRecoilValue } from 'recoil';
import { useSession } from "next-auth/react";
import { useRecoilValue } from 'recoil';
import { authState } from '@/contexts/atoms';

function AuthUI() {
//const [loading, setLoading] = useState(false);
const [loginForm, setLoginForm] = useState(true);
const { data: session, status } = useSession();
const {user} = useRecoilValue(authState)


  return (

        <div className="card mb-0" >
            <div>
                <div className="px-4 sm:px-15 py-3 pb-2">
                {user ? <></> : <>
                    {/* <div className='d-flex flex-row justify-center gap-2 align-items-end mb-3'>  
                    <div className={`access_toggler ${loginForm ? '_active' : ''}`} onClick ={() => setLoginForm(true)}>
                        <h1 className="text-center font-800 mb-0">Sign In</h1>
                        <p className="color-highlight text-center mt-1 form_desc">Let's get you logged in</p>
                    </div>

                    <div className="divider vertical"></div>

                    <div className={`access_toggler ${!loginForm ? '_active' : ''}`} onClick ={() => setLoginForm(false)}>
                        <h1 className="text-center font-800 mb-0">Sign Up</h1>
                        <p className="color-highlight text-center mt-1 form_desc">Create an Account. It's free!</p>
                    </div></div> */}


                    {/* <>{loginForm ? <SignIn/> : <SignUp/> }</> */} 
                    <SignIn/> 
                    {/* <div className="d-flex mt-4 mb-4">
                        <div className="w-50 font-13 pb-2 text-start"><span className='text-decoration-underline' style={{cursor: 'pointer'}} onClick={() => setLoginForm(!loginForm)} href="page-signup-2.html">{loginForm ? "I'm new here " : 'Already a member'}</span></div>
                        
                        <div className="w-50 font-13 pb-2 text-end"><a target={'_blank'} href={`${WPDomain}/my-account/lost-password`}>Forgot Credentials</a></div>
                    </div> */}
                    <p className="mb-3 fw-bold text-center mt-3">Other Options</p>

                    </>}
                    <SocialLogin/>
                </div>
            </div>
        </div>
  )
}
export default AuthUI