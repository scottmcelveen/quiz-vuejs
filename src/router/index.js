import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Admin from '../views/Admin.vue'
import Login from '../views/Login.vue'
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
  console.log('checking session')
  try {
    var session = await Auth.currentSession()
    console.log(session)
  }
  catch {
    console.log(to)
    localStorage.setItem('quiz-vuejsloginredirect', to.path)
    next({ name: 'Login', params: { message: 'You need to be logged in to go there!' }})
  }
  next()
}

export default router
