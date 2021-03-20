import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@aws-amplify/ui-vue';
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports-env';
Amplify.configure(awsconfig);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
