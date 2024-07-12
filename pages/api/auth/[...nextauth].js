import NextAuth from "next-auth"
import TwitterProvider from "next-auth/providers/twitter";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

import { siteSettings, WPDomain } from "@/helpers/base";
import { decodeJWT } from "@/helpers/universal";
//import { Cookies } from "react-cookie";


export const authOptions = { providers: [
    TwitterProvider({
      clientId: siteSettings.siteKeys.tw_api_key,
      clientSecret: siteSettings.siteKeys.tw_api_secret,
    }),
    GoogleProvider({
      clientId: siteSettings.siteKeys.g_auth_client_id,
      clientSecret: siteSettings.siteKeys.g_auth_client_secret
    }),
    CredentialsProvider({
      id: 'lyve_city',
      type: 'credentials',
      name: "LyveCity Account",
     
     credentials : {
        username: { type: "text"},
        token: { type: "hidden"},
        password: { label: "Password", type: "password" }
      },

       async authorize(credentials, req) {
        //return null;
             const {token, username} = credentials;
        
            let loginEnd = `wp-json/jwt-auth/v1/autologin?JWT=${token}&name=${username}`;

            const res = await fetch(`${WPDomain}/${loginEnd}`);
            const loginObj = await res.json();
            
            const user = loginObj.user;

            if(user){
              return {
                id: user.id,
                name: user.name,
                user: user, 
                jwtObj: decodeJWT(token),
               // wpToken : data.jwt
              }
            }else{
              return null;
            }
        }
       /*  credentials : {
          username: { type: "text", label: 'User Name'},
          password: { label: "Password", type: "password", label: "Password" }
        },

      async authorize(credentials, req) {
        const {username} = credentials;
        console.log('authorise credentials', credentials);
        const endPoint = `wp-json/jwt-auth/v1/auth`;

        const res = await fetch(`${WPDomain}/${endPoint}`, {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" }
        });
        const authObj = await res.json();
        if (res.ok && authObj) {
          const {success} = authObj;
          if(success){
            const {data} = authObj;
            let loginEnd = `wp-json/jwt-auth/v1/autologin?JWT=${data.jwt}&name=${username}`;

            const res = await fetch(`${WPDomain}/${loginEnd}`);
            const loginObj = await res.json();
            
            const user = loginObj.user;
              return {
                id: user.id,
                name: user.name,
                user: user, 
                jwtObj: decodeJWT(data.jwt),
                wpToken : data.jwt
              };
          }else{
            return null;
          }
        }
        return null
      } */
    })
  ],
  callbacks: {

    async signIn({ user, account, profile, email, credentials }) {
      let {type} = account;
      if(type == 'credentials'){
        account.userObj = user;
        //console.log('signin user', user)
        return user;
      }
      const isAllowedToSignIn = true;
      if (isAllowedToSignIn) {
        return user;
      } else {
        return false
      }
    },

    async jwt({ token, account, profile }) {
      if (account) {
        let {type, userObj} = account ?? {};
        const {jwtObj, user} = userObj ?? {};
        if(type == 'credentials'){
          if(userObj){
            token = jwtObj; 
          }
          if(user){
            profile = {...user};
          }
        }else{
          token.accessToken = account.access_token
          token.refreshToken = account.refresh_token
          token.provider = account.provider
          token.oauthToken = account.oauth_token
          token.oauthTokenSecret = account.oauth_token_secret
          token.id = profile.id
          token.sub = profile.sub
        }
      }
      return token
    },
    async session({ session, token, user }) {
   
      session.access_token = token.accessToken
      session.oauth_token = token.oauthToken
      session.refresh_token = token.refreshToken
      session.provider = token.provider
      session.oauth_token_secret = token.oauthTokenSecret
      session.user.id = token.id
      session.user.sub = token.sub
      
      return session
    }
  },
  session: {
    strategy: "jwt",
  },
  theme: {
    colorScheme: "auto", // "auto" | "dark" | "light"
    //brandColor: "", // Hex color code
    logo: "/app/logos/Lyvecity.png", // Absolute URL to image
    //buttonText: "" // Hex color code
  },
  /* pages: {
    signIn: '/auth/signin'
  }, */
  secret: 'nCU4vhNuNrXZfxlr8snYOOT-cjjItR2L3fzuR'
}

export default NextAuth(authOptions);