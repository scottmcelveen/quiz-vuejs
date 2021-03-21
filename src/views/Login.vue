<template>
    <div id="login">
        <h2>{{$route.params.message}}</h2>
        <amplify-authenticator>
        </amplify-authenticator>
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
              router.push(redirect)
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
    name: 'Login'
}
</script>