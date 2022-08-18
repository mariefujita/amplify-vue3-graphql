<template>
  <div>
    <form class="flex flex-col items-center" novalidate @submit.prevent="login">
      <div class="flex flex-col user">
        <label class="block text-grey-700 text-sm font-bold mb-2" for="username">Username</label>
        <input
          v-model="username"
          type="text"
          id="username"
          class="shadow appearance-none w-full px-3 py-2 mt-2 border rounded-md text-grey-700 loading-tight">
      </div>
      <div class="flex flex-col mt-5 mb-10">
        <label class="block text-grey-700 text-sm font-bold mb-2" for="password">Password</label>
        <input
          v-model="password"
          type="password"
          id="password"
          class="shadow appearance-none w-full px-3 py-2 mt-2 border rounded-md text-grey-700 loading-tight">
      </div>
      <button type="submit" class="btn-blue">Sign in</button>
    </form>
    <div v-if="error" class="text--red-600">{{ error.message }}</div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'AppLogin',
  data () {
    return {
      username: '',
      password: '',
      error: ''
    }
  },
  methods: {
    async login() {
      try {
        await this.loginVue({
          username: this.username,
          password: this.password
        })
        this.$router.push('/albums')
      } catch (e) {
        this.error = e
      }
    },
    ...mapActions({
      loginVue: 'auth/login'
    })
  }
}
</script>

<style lang="scss" scoped>

</style>
