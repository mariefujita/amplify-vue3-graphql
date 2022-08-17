<template>
  <div>
    <form v-if="!confirmPassword" class="flex flex-col items-center" novalidate @submit.prevent="signUp">
      <div class="flex flex-col user">
        <label class="block text-grey-700 text-sm font-bold mb-2" for="username">Username</label>
        <input
          v-model="username"
          type="text"
          id="username"
          class="shadow appearance-none w-full px-3 py-2 mt-2 border rounded-md text-grey-700 loading-tight">
      </div>
      <div class="flex flex-col mt-10">
        <label class="block text-grey-700 text-sm font-bold mb-2" for="password">Password</label>
        <input
          v-model="password"
          type="password"
          id="password"
          class="shadow appearance-none w-full px-3 py-2 mt-2 border rounded-md text-gray-700 loading-tight">
      </div>
      <div class="flex flex-col mt-10 mb-5">
        <label class="block text-grey-700 text-sm font-bold mb-2" for="email">Email</label>
        <input
          v-model="email"
          type="email"
          id="email"
          class="shadow appearance-none w-full px-3 py-2 mt-2 border rounded-md text-grey-700 loading-tight">
      </div>
      <button type="submit" class="btn-blue">Sign Up</button>
    </form>
    <div v-if="error" class="text--red-600">{{ error.message }}</div>
    <div v-if="confirmPassword" class="w-4/12 m-auto">
      <h3>Enter your code. Please check your email</h3>
      <div class="flex flex-col mt-2 mb-2">
        <label class="block text-grey-700 text-sm font-bold" for="password">Code</label>
        <input
          v-model="code"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
          type="text"
        />
      </div>
      <button class="btn-blue" @click="confirmSignUp">Confirm Code</button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      username: '',
      password: '',
      email: '',
      error: '',
      confirmPassword: false,
      code: ''
    }
  },
  methods: {
    async signUp () {
      if (!this.email || !this.password) {
        return
      }
      try {
        await this.$store.dispatch('auth/signup', {
          username: this.username,
          password: this.password,
          email: this.email
        })
        this.confirmPassword = true
      } catch (e) {
        this.error = e
      }
    },
    async confirmSignUp () {
      if (!this.username || !this.code) {
        return
      }
      try {
        const { username, password, code } = this
        await this.$store.dispatch('auth/ConfirmSignUp', {
          username,
          code
        })
        await this.$store.dispatch('auth/login', {
          username,
          password
        })
        this.$router.push('/albums')
      } catch (e) {
        console.log(e)
        this.error = e
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
