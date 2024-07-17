import  {useState, useEffect} from "react";
import {Cookies} from "react-cookie";
import { editUser,  getMe, getSocialUser, getUserRest } from '@/helpers/rest';
//import { UICleanup } from "~/server/UniversalFunctions";
import { atom, useSetRecoilState } from "recoil";
import { authState, userMetaState } from "@/contexts/atoms";
import { useSession, signOut, getSession, signIn } from "next-auth/react";
import { authKey, kyFetch, serializeQuery, WPDomain } from './base';
import { useRouter } from "next/router";
import { messageServiceWorker } from './universal';
import { Client } from "react-hydration-provider";

export const useAuthState = atom({
  key: 'useAuthState', 
  default: {}, 
});

function theAuth(){
  if (typeof window !== 'undefined') {
  return JSON.parse(window.localStorage.getItem('u_cred'));
  }
 }

 function deleteStoreUser(){
  if (typeof window !== 'undefined') {
        localStorage.removeItem('User');
    }
 }

function useProvideAuth () {
  const setRecoilAuth = useSetRecoilState(authState);
  const setUseAuthState = useSetRecoilState(useAuthState);
  //const setUMetaState = useSetRecoilState(userMetaState);
  const router = useRouter();

  function setTheAuth(authObj){
    localStorage.setItem('u_cred', JSON.stringify(authObj));
    setRecoilAuth(authObj)
  }

   const {auth_type, soc_updater, user:ucred_user, token:ucred_token} = theAuth()  ?? {};

   function sessionToken(){
    if (typeof window !== 'undefined') {
      return JSON.parse(window.localStorage.getItem('next-auth.session-token'));
      }
   }

   function storeUser(userObj=null){
    if (typeof window !== 'undefined') {
        if(userObj){
          localStorage.setItem('User', JSON.stringify(userObj));
        }else{
          return JSON.parse(window.localStorage.getItem('User'));
        }
      }
   }

  const [isLoadingUser, setLoadingUser] = useState(true);
  const [error, setError] = useState('');
  const { data: session, status } = useSession();

  console.log('auth status', status);

  const {user, oauth_token, oauth_token_secret, provider, access_token} = useSession().session ?? {};


  const cookies = new Cookies();

  const fetchStart = () => {
    setTheAuth({...theAuth(), loading :true});
    setError('');
  }

  const fetchSuccess = () => {
    setTheAuth({...theAuth(), loading:false});
    setError('');
  }

  const logOutSuccess = () => {
    setTheAuth({...theAuth, loading:false});
    setError('');
  }

  const fetchError = (error) => {
    setTheAuth({...theAuth, loading:false});
    setError(error);
    handleError(error);
  }

  function handleError (err){
  }

  async function fetchUserFunc({email, jwt, authType}){
    const restUser = await getUserRest({key:'email', val: email, with_meta: true});
    if(restUser){
        storeUser(restUser.user);
        //setUMetaState(restUser?.user?.user_meta);
        setTheAuth({...theAuth(), user: restUser.user, token:jwt, auth_type: authType})
    }
}

const userUpdate = async(data, callbackFun) => {
  fetchStart();
  if (typeof window !== 'undefined') {
    const editing = await editUser(data);
    if(editing){
      if(callbackFun){
        callbackFun()
      }
      fetchSuccess();
    }
  }
};

/* 
async function getUserMeta(){
 const myData = await getMe();
 if(myData){
  setUserMeta(myData);
  localStorage.setItem('UMeta', JSON.stringify(myData));
 }
}


  function refreshWpBySocial(userData, token, func){
  }

  
  async function fetchUserFunc({email, jwt, authType}){
      const restUser = await getUserRest({key:'email', val: email, with_meta: true});
      if(restUser){
          storeUser(restUser.user);
          setUMetaState(restUser?.user?.user_meta);
          setTheAuth({...theAuth(), user: restUser.user, token:jwt, auth_type: authType})
      }
  }

  async function updateClientSession(){
   // let jwtTok = cookies.get('token');
    const checkSession = await getSession();
    if (checkSession?.user) {
      const checkedUser = checkSession.user;
       await fetchUserFunc({email: checkedUser.email});
    }
  }

  */

  const userSignup = async (payload, callbackFun) => {
    fetchStart();
    try{ 
      const data = await kyFetch.post(`${WPDomain}/wp-json/jwt-auth/v1/users`, {json: {...payload, Auth_Key: authKey}}).json();
      if(data){
        if (data.result) {
          fetchSuccess();
          //WPRepository.defaults.headers.common['Authorization'] = 'Bearer ' + data.token.access_token;
          cookies.set('token', data.token.access_token);
          if (callbackFun) callbackFun();
          //UICleanup();
        } else {
          fetchError(data.error);
        }
      }}catch(error) {
        fetchError(error.message);
      };
  };

  const sendReqTw = async(token, platform) => {
    //setTheAuth({...theAuth(), loading :true});
    const {oauth_token} = token;
    const res = await getSocialUser(JSON.stringify(token), platform);
    if(res){
      const {user, jwt} = res;
      userLoginBySocial(user, jwt, oauth_token, '');
    }
    //setTheAuth({...theAuth(), loading:false});
  }

  async function refreshUser(token, func){

    if(status === "authenticated"){

      try{ 
        const refreshData = await kyFetch.post(`${WPDomain}/wp-json/jwt-auth/v1/auth/refresh?JWT=${token}`).json()
        if (refreshData.success) {

          const newToken = refreshData.data.jwt;
          cookies.remove('token');
  
          cookies.set('token', newToken);
          setTheAuth({...theAuth(), token:newToken});
          if(func){
            func()
          }
          setLoadingUser(false);
        }else{
          userSignOut();
        }
      }catch(e){
          console.log(e)
          userSignOut()
      }; 

      if(func){
        func()
      }
      setLoadingUser(false);
   }else{
    console.log('not authenticated');
    userSignOut();
   }
  }
  
const userLoginBySocial = async(userData, token, acc_token, soc_refresh_token, callbackFun) => {
             
    const {username} = userData;
    //fetchStart();

    let oldSocToken = cookies.get("soc_token");
    let oldToken = cookies.get("token");  

    if(oldSocToken){
      cookies.remove('soc_token');
    } 

    if(oldToken){
      cookies.remove('token');
    }

    try {
      const res = await kyFetch.get(`${WPDomain}/wp-json/jwt-auth/v1/autologin?JWT=${token}&name=${username}`).json();
      if(res.success){
        console.log('sucess', res)
        cookies.set('token', token);
        cookies.set('soc_token', acc_token);

        localStorage.setItem('User', JSON.stringify(userData));
        setTheAuth({...theAuth(), auth_type: 'social', token:token,  soc_token: acc_token, soc_updater: soc_refresh_token, user: userData});
      }else{
        console.log('failed', res)
      }
    } catch (error) {
      console.log('setting social login error', error)
      setTheAuth({...theAuth(), loading:false}) 
    }

    if (callbackFun) callbackFun();  

    fetchSuccess(); 
    //setTheAuth({...theAuth, loading:false});
    //router.reload();
    return true;
  };

const userSignOut = async () => {
    let localJwt = cookies.get('token');
    if(localJwt){
      cookies.remove('token');
    }
    setTheAuth({auth_type: 'none'});

    deleteStoreUser();
    if(status == 'authenticated'){
      signOut()
    }
    //router.reload();
};


async function loginFunc(jwt, username){
  if(status === "authenticated"){
      const {provider} = session ?? {};
      if(provider && provider !== 'undefined'){
        if(provider !== 'lyve_city'){
          let accessTokenObj = {};

          const {user, oauth_token, oauth_token_secret, provider, access_token} = session ?? {};
          if(provider == 'twitter'){
            accessTokenObj = {oauth_token: oauth_token, oauth_token_secret: oauth_token_secret, user_id: `${user.id}`}
          }else{
            accessTokenObj = {access_token: access_token, id_token: `${user.sub}`}
          }
        sendReqTw(accessTokenObj, provider);
        }else{
          cookies.set('token', jwt);
          signIn('lyve_city', {username: username, token: jwt, redirect: false}).then(async(res) => {
          if(res.ok){
            const checkSession = await getSession();
            if (checkSession?.user) {
              const checkedUser = checkSession.user;
                await fetchUserFunc({email: checkedUser.email, jwt: jwt, authType: 'native'});
            }
          }
          })
        }
    }
   }else{
    await userSignOut();
    /* try{ let data = await kyFetch.get(`${WPDomain}/wp-json/jwt-auth/v1/autologin?JWT=${jwt}&name=${username}`).json();
    if(data){
      const {data: loginData} = data;
      if(loginData.success){
          setTheAuth({auth_type: 'native', user: loginData.user, token:jwt});
          setUser(loginData.user);
          localStorage.setItem('User', JSON.stringify(loginData.user));
          setToken(jwt);
          //getSocials(parseInt(loginData?.user?.id), jwt);
          //if (callbackFun) callbackFun();  
          fetchSuccess(); 
        }
    }
    }catch(error){
        
    } */
   }
}


 const userLogin = async(loginData) => {
   const oldToken = cookies.get("token");
   if(oldToken){
     cookies.remove('token');
   }
   try {
  //let data = await kyFetch.post(`${WPDomain}/wp-json/jwt-auth/v1/auth`, {json: {...loginData}, signal:signal}).json();
    let data = messageServiceWorker({type:'auth', loginData});
    
  }catch (error) {
      setTheAuth({...theAuth, loading:false})  
    }
 };

 async function getAuthUser(){
 if(navigator.onLine){
  if (typeof window !== 'undefined') {
    const token = cookies.get("token");

    if(auth_type == 'none'){
      if(status === "authenticated"){
        userSignOut()
      }else{
        return;
      }
    }else{
      //const userData = JSON.parse(window.localStorage.getItem('User'));

      if(token){
         try{
         const kyValid = await kyFetch.get(`${WPDomain}/wp-json/jwt-auth/v1/auth/validate?JWT=${token}`).json();
            if (kyValid.success) {
              console.log('option 1 auth', theAuth());
              if(!ucred_user || auth_type == 'none'){
                const validatedData = kyValid.data;
                let validatedUsername = validatedData?.jwt[0].payload?.username
                loginFunc(token, validatedUsername);
              }
            }else{
              console.log('option 2', kyValid);
              refreshUser(token);
            }
         }catch(e){
          console.log('option 3', e);
            console.log(e)
         }
      }else if(ucred_token){
        console.log('option 4 with no data');
        refreshUser(ucred_token);
      }else{
        userSignOut();
      }
    }
  }
  }
}
function setUpMessaging(){
  if (navigator.serviceWorker) {    
    navigator.serviceWorker.addEventListener("message", (event) => {

      let incoming = event.data; 
      const {type, swResponse} = incoming;
      if(type == 'auth'){
      const oldToken = cookies.get("token");
      if(oldToken){
        cookies.remove('token');
      }
        const {authResponse:data, loginData} = swResponse;
        if (data?.success) {
          console.log('useAuth auth user data', data)
          const {auth_user, data:jwtData} = data;
          if(jwtData.jwt){
            const {username} = loginData;
            cookies.set('token', jwtData.jwt);
             signIn('lyve_city', {username: username, token: jwtData.jwt, redirect: false}).then(async(res) => {
              if(res.ok){
                  storeUser(auth_user);
                  setTheAuth({...theAuth(), user: auth_user, token:jwtData.jwt, auth_type: 'native'})
              }
             })
          }
         // router.reload();

         return data;
        }else{
          console.log('failed', data)
          return data;
        }
      }
    });
  }
}
useEffect(() => {
  //getAuthUser();
   /* const interval = setInterval(() => {
     getAuthUser();
   }, 600000);
   return () => clearInterval(interval); */
   //setUpMessaging();
 }, []);

 let functionsObj = {userLogin,setUpMessaging, userSignOut, userLoginBySocial, getAuthUser, userSignup, userUpdate/* , getAuthUser, userUpdate,  , , getUserMeta */}
  setUseAuthState(functionsObj);
  return functionsObj;
}


export function AuthProvider() {
  const authFunctions = useProvideAuth();
  const {getAuthUser,setUpMessaging} = authFunctions;
  useEffect(() => {
    setUpMessaging();
     getAuthUser();
     const interval = setInterval(() => {
       getAuthUser();
     }, 10000);
     return () => clearInterval(interval);
   }, []);

   
  return <Client><div className = 'auth_provider'></div></Client>;
}

