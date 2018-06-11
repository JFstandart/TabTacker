<template>
  <div>
    <h1>Register</h1>
    <input type="text"
           name="email"
           v-model="email"
           placeholder="Give me your email">
    <br>
    <input type="password"
           name="password"
           v-model="password"
           placeholder="What is your pass?">
    <br>
    <button @click="register" type="button" name="button">Register</button>
  </div>
</template>

<script>
import authenticationService from '@/services/authenticationService'
export default {
  data () {
    return {
      email: '',
      password:''
    }
  },
  methods: {
    async register () {
      const response = await authenticationService.register({
        email:this.email,
        password:this.password
      })
      console.log(response.data);
    }
  }
}
</script>

<style scoped>

</style>
