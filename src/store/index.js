import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0,
    snackMessage: null
  },
  mutations: {
    increment (state) {
      state.count++
    },
    setSnackMessage (state, data) {
      state.snackMessage = data.message
    }
  },
  actions: {
  },
  modules: {
  }
})
