<template>
<v-layout row>
  <v-flex xs8 sm6 offset-sm3 offset-xs2>
    <div class="white elevation-2">
      <v-toolbar flat dense class="grey darken-4" dark>
        <v-toolbar-title class="white--text">Login</v-toolbar-title>
      </v-toolbar>
      <div class="pl-4 pr-4 pt-2 pb-2">
        <v-text-field name="email" label="What is your email" v-model="email" type="email" single-line></v-text-field>
        <v-text-field name="password" label="What is your pass?" v-model="password" type="password" single-line></v-text-field>
        <div class="error" v-html="error" />
        <v-btn class="grey darken-4 white--text" @click="login" type="button" name="button">Login</v-btn>
      </div>
    </div>
  </v-flex>
</v-layout>
</template>

<script>
import AuthenticationService from '@/services/authenticationService'
export default {
  data () {
    return {
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
    async login () {
      try {
        const response = await AuthenticationService.login({
          email: this.email,
          password: this.password
        })
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  }
}
</script>

<style scoped>
.error {
  color: red;
}
</style>
