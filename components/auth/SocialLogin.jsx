//import { useGoogleLogin } from "@react-oauth/google";
import { memo, useEffect, useState } from "react";
//import { LoaderEllipsis } from "~/appComponents/components/skeletons/React-content-loader/Loaders";
//import { serializeQuery, siteKeys } from "~/server/Base";
//import { useRecoilState } from "recoil";
//import { authState } from "~/contexts/contexts";
import { getProviders, signIn, useSession } from "next-auth/react";
import { useRecoilValue } from "recoil";
import { useAuthState } from "@/helpers/use-auth";
import { authState } from "@/contexts/atoms";
import { getSocialUser } from "@/helpers/rest";
import { LoaderDualRing } from "../skeletons/Loaders";


const SocialLoginConst = () => {
  const {userLoginBySocial, userSignOut} = useRecoilValue(useAuthState);
  const {user} = useRecoilValue(authState);
  const [loading, setLoading] = useState(false);
  const [loadingId, setLoadingId] = useState(null);
  const { data: session, status } = useSession();
  const [providers, setProviders] = useState(null);

  async function getProvs(){
    let fetchproviders =  await getProviders();
    if(fetchproviders){
      setProviders(fetchproviders)
    }
  }


  useEffect(() => {
    getProvs()
  }, []);


  const sendReqTw = async(token, platform, signal) => {
    setLoading(true);
    const {oauth_token} = token;
    if(token){
      const res = await getSocialUser(JSON.stringify(token), platform);
      if(res){
        const {user, jwt} = res;
        userLoginBySocial(user, jwt, oauth_token, '');
      }
    }
    setLoading(false);
  }

/* 
const sendReq = async(token, platform) => {
  setLoading(true);
  const {access_token, refresh_token} = JSON.parse(token);
  const res = await getSocialUser(token, platform);
  if(res){
    const {data} = res;
    const {user, jwt} = data;
    userLoginBySocial(user, jwt, access_token, refresh_token);
  }
  setLoading(false);
} */

  useEffect(() => {
    setLoading(true)
  const controller = new AbortController();
  const signal = controller.signal;

    if(user){
      setLoading(false);
        return;
    }else{
      if(status === "authenticated"){
        const {user, oauth_token, oauth_token_secret, provider, access_token} = session ?? {};
        if(provider && provider !== 'undefined'){
          let accessTokenObj = {};
          if(provider == 'twitter'){
            accessTokenObj = {oauth_token: oauth_token, oauth_token_secret: oauth_token_secret, user_id: `${user.id}`}
          }else{
            accessTokenObj = {access_token: access_token, id_token: `${user.sub}`}
          }
        sendReqTw(accessTokenObj, provider, signal);
       }
      }
    }
    setLoading(false);
    return () => {controller.abort(); setLoading(false)};

  }, [session]);
  
 /*  
const googleLogin = useGoogleLogin({
  flow: 'auth-code',
  onSuccess: async (codeResponse) => {
      const tokens = await getSocialUserToken(codeResponse.code);
          if(tokens){
            await sendReq(tokens, 'google');
          }
  },
  onError: errorResponse => console.log(errorResponse),
}); */
console.log('session', session);

const tw_x = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-twitter-x" viewBox="0 0 16 16">
<path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865l8.875 11.633Z"/>
</svg>;

  return (
      <div className='social_auth'>
        <p className="mb-3 fw-bold text-center">Other Options</p>
        {/* <button style={{lineHeight: '20px'}} className="btn btn-outline-danger soc_login"  onClick={() => googleLogin()}>
          {loading ? <LoaderEllipsis/> : <><i className="bi bi-google mr-10 text-18"></i> Sign in with Google</>  }
        </button> */}

        {!session && <>
          {providers &&
              Object.values(providers).map(provider => {
                const {id} = provider;
                if(id == 'lyve_city'){
                  return;
                }
                return <button id={id} style={{height: 50}} key={id} className={`auth_btn btn mb-3 rounded-sm text-dark w-100 rounded-0 mr-0 align-items-center d-flex gap-3 justify-center ${loadingId == id ? 'border-light' : ''}`} onClick={(e) => {setLoadingId(id); setLoading(true); signIn(provider.id)}} >
                  <>{loading && loadingId == id  ? <LoaderDualRing size={30}/> : 
                    <>{id == 'twitter' ? tw_x : 
                    <img src={`https://authjs.dev/img/providers/${id}.svg`}/>} 
                    {' '}Sign in with{' '} 
                    {id == 'twitter' ? 'X (Twitter)' : provider.name}</>
                    }</>
                  </button>
            })}
         {/*  <button className="btn btn-secondary" onClick={() => signIn()}>Sign in</button> */}
        </>}
        {session && <>
          <p className="text-center">Signed in as {session.user.name}</p> <br/>
          <button className="btn btn-dark w-100" onClick={() => {setLoading(true); userSignOut()}}>{loading ? <LoaderDualRing size={30}/> : 'Sign Out'}</button>
        </>}

      </div>
  )
}
const SocialLogin = memo(SocialLoginConst);
export default SocialLogin;