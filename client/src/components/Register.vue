<template>
<v-layout column>
  <v-flex xs6 offset-xs3>
    <div class="white elevation-2">
      <v-toolbar flat dense class="cyan" dark>
        <v-toolbar-title>Register</v-toolbar-title>
      </v-toolbar>
      <div class="pl-4 pr-4 pt-2 pb-2">
        <input type="text" name="email" v-model="email" placeholder="Give me your email">
        <br>
        <input type="password" name="password" v-model="password" placeholder="What is your pass?">
        <br>
        <div class="error" v-html="error" />
        <v-btn class="cyan" @click="register" type="button" name="button">Register</v-btn>
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
    async register () {
      try {
        await AuthenticationService.register({
          email: this.email,
          password: this.password
        })
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
