<template>
<v-layout row>
  <v-flex xs8 sm6 offset-sm3 offset-xs2>
    <panel title="Login">
      <v-text-field name="email" label="What is your email" v-model="email" type="email" single-line></v-text-field>
      <v-text-field name="password" label="What is your pass?" v-model="password" type="password" single-line></v-text-field>
      <div class="error" v-html="error" />
      <v-btn class="grey darken-4 white--text" @click="login" type="button" name="button">Login</v-btn>
    </panel>
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
        this.$router.push({
          name: 'songs'
        })
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  }
}
</script>

<style scoped>
.error{
  background-color: #ff5252 !important;
  border: none !important;
  color:#000;
}
</style>
