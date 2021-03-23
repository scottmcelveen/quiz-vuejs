<template>
    <div id="login">
        <amplify-authenticator>
            <amplify-sign-up
                slot="sign-up"
                username-alias="email"
                :form-fields.prop="formFields"
                ></amplify-sign-up>
        </amplify-authenticator>
    </div>
</template>

<script>
import { Hub } from 'aws-amplify'
import router from '../router'
import { Auth } from 'aws-amplify'

const listener = (data) => {
  switch (data.payload.event) {
      case 'signIn':
          console.log('signed in')
          var redirect = localStorage.getItem('quiz-vuejsloginredirect')
          localStorage.removeItem('quiz-vuejsloginredirect')
          Auth.currentUserPoolUser()
            .then((data) => {
                // returns a CognitoUser
                // with accessToken { jwtToken: string, payload: any}
                // with idToken { jwtToken: string, payload: any} payload.email
                // with refreshToken { token: string }
                console.log('currentUserPoolUser')
                console.log(data)
                console.log('currentUserPoolUser')
            })
          Auth.currentAuthenticatedUser()
            .then((data) => {
                // returns a CognitoUser
                // with attributes { email: string }
                // with signInUserSession : CognitoUserSession
                console.log('currentAuthenticatedUser')
                console.log(data)
                console.log('currentAuthenticatedUser')
            })
          Auth.currentSession()
            .then((data) => {
                // returns a CognitoUserSession
                // with attributes { email: string }
                // with signInUserSession : CognitoUserSession
                console.log('currentSession')
                console.log(data)
                console.log(data.accessToken.jwtToken)
                console.log(data.idToken.jwtToken)
                console.log('currentSession')
            })
          Auth.currentUserInfo()
            .then((data) => {
                // returns a CognitoUserSession
                // with attributes { email: string }
                // with signInUserSession : CognitoUserSession
                console.log('currentUserInfo')
                console.log(data)
                console.log('currentUserInfo')
            })
          if(redirect) {
              console.log('doing a redirect')
              router.replace(redirect, () => {})
          }
          break;
      case 'signOut':
          console.log('signed out')
          router.push({ name: 'Home', replace: true })
          break;
  }
}

Hub.listen('auth', listener);

export default {
    name: 'Login',
    data() {
        return {
            formFields: [
                {
                    type: 'email',
                    label: 'Email',
                    placeholder: 'email address',
                    required: true,
                },{
                    type: 'password',
                    label: 'Password',
                    placeholder: 'password',
                    required: true,
                }
            ]
        }
    }
}
</script>