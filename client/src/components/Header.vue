<template>
<v-toolbar fixed class="grey darken-4">
  <v-toolbar-title class="mr-4 white--text">
    <router-link tag="span" class="home" :to="{name:'songs'}">
      TabTacker
    </router-link>
  </v-toolbar-title>
  <v-btn flat dark :to="{name:'songs'}">
    Browse
  </v-btn>
  <v-spacer></v-spacer>
  <v-toolbar-items>
    <v-btn v-if="!$store.state.isUserLoggedIn" flat dark :to="{name:'login'}">
      Login
    </v-btn>
    <v-btn v-if="!$store.state.isUserLoggedIn" flat dark :to="{name:'register'}">
      Sign Up
    </v-btn>
    <v-btn v-if="$store.state.isUserLoggedIn" flat dark @click="logout">
      Log Out
    </v-btn>
  </v-toolbar-items>
</v-toolbar>
</template>

<script>
export default {
  methods: {
    logout () {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      this.$router.push({
        name: 'songs'
      })
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
