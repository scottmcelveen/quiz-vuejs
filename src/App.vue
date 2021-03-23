<template>
  <v-app>
    <v-snackbar v-model="snackMessage" color="red" top :timeout="5000">{{snackMessage}}</v-snackbar>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import store from './store'

export default {
  name: 'App',

  components: {
  },

  data: () => ({
  }),

  computed: {
    snackMessage () {
      return store.state.snackMessage
    }
  }
};
</script>
