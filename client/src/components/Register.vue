<template>
<v-layout row>
  <v-flex xs8 sm6 offset-sm3 offset-xs2>
    <panel title="Register">
        <form name="tab-tracker-form" autocomplete="off">
          <v-text-field name="email" label="Give me your email" v-model="email" type="email" single-line></v-text-field>
          <v-text-field name="password" label="What is your pass?" v-model="password" type="password" autocomplete="new-password" single-line></v-text-field>
          <div class="error" v-html="error" />
          <v-btn class="grey darken-4 white--text" @click="register" type="button" name="button">Register</v-btn>
        </form>
    </panel>
  </v-flex>
</v-layout>
</template>

<script>
import AuthenticationService from '@/services/authenticationService'
import Panel from '@/components/Panel'
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
        const response = await AuthenticationService.register({
          email: this.email,
          password: this.password
        })
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  },
  components: {
    Panel
  }
}
</script>

<style scoped>
.error {
  color: red;
}
</style>
