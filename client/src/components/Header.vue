<template>
<v-toolbar fixed class="grey darken-4">
  <v-toolbar-title class="mr-4 white--text">
    <span class="home" @click="navigateTo({name:'root'})">
      TabTacker
    </span>
  </v-toolbar-title>
  <!--TODO: Implement-->
  <!--<v-toolbar-items>
    <v-btn flat dark>Browser</v-btn>
  </v-toolbar-items>-->
  <v-spacer></v-spacer>
  <v-toolbar-items>
    <v-btn v-if="!$store.state.isUserLoggedIn" flat dark @click="navigateTo({name:'login'})">
      Login
    </v-btn>
    <v-btn v-if="!$store.state.isUserLoggedIn" flat dark @click="navigateTo({name:'register'})">
      Sign Up
    </v-btn>
  </v-toolbar-items>
</v-toolbar>
</template>

<script>
export default {
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    }
  }
}
</script>

<style scoped>
.home {
  cursor: pointer;
}

.home:hover {
  color: #999;
}
</style>
