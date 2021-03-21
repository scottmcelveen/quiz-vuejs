<template>
    <div id="login">
        <amplify-authenticator>
            <amplify-sign-up
                slot="sign-up"
                username-alias="email"
                :form-fields.prop="formFields"
                ></amplify-sign-up>
        </amplify-authenticator>
        <v-snackbar v-model="snackbar" color="red" top :timeout="5000">{{snackbar}}</v-snackbar>
    </div>
</template>

<script>
import { Hub } from 'aws-amplify'
import router from '../router'

const listener = (data) => {
  switch (data.payload.event) {
      case 'signIn':
          console.log('signed in')
          var redirect = localStorage.getItem('quiz-vuejsloginredirect')
          localStorage.removeItem('quiz-vuejsloginredirect')
          console.log(redirect)
          if(redirect) {
              router.replace(redirect)
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
            ],
            snackbar: this.$route.params.message
        }
    }
}
</script>