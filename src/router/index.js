import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Admin from '../views/Admin.vue'
import Login from '../views/Login.vue'
import store from '../store'
import { Auth } from 'aws-amplify'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    beforeEnter: requireAuth
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

async function requireAuth (to, from, next) {
  try {
    var session = await Auth.currentSession()
    var accessTokenPayload = session.getAccessToken().decodePayload()
    console.log(accessTokenPayload)
    console.log('That was the payload')
    var groups = accessTokenPayload['cognito:groups']
    console.log('Got groups')
    console.log(groups)
    if(!groups.find(g => g == 'ScottGroupNoIAMRole')) {
      console.log('Couldnt find desired group')
      store.commit('setSnackMessage', { message: 'You need admin privileges to access the admin page' })
      next({name:'Home', replace: true})
    }
    else {
      console.log('all good')
      next()
    }
  }
  catch(err) {
    console.log('ERROR GETTING CURRENT SESSION')
    localStorage.setItem('quiz-vuejsloginredirect', to.path)
    console.log('about to set next() in catch')
    //next({ name: 'Login', params: { message: 'You need to be logged in to go there!' }})
    store.commit('setSnackMessage', { message: 'You need to be logged in to go there!' })
    next({ name: 'Login' })
  }
}

export default router
