<template>
  <div>
    <ul class="flex justify-end">
      <li v-if="!user" class="mr-6">
        <router-link to="/">
          <a class="text-blue-500 hover:text-blue-800 cursor-pointer">Login</a>
        </router-link>
      </li>
      <li v-if="!user" class="mr-6">
        <router-link to="/signup">
          <a class="text-blue-500 hover:text-blue-800 cursor-pointer">Sign Up</a>
        </router-link>
      </li>
      <li v-if="user" class="mr-6">
        <div class="font-semibold text-black-500">
          Welcome {{ user.username }}
        </div>
      </li>
      <li v-if="user" class="mr-6">
        <router-link to="/albums">
          <a class="text-blue-500 hover:text-blue-800 cursor-pointer">Albums</a>
        </router-link>
      </li>
      <li v-if="user" class="mr-6">
        <div class="text-blue-500 hover:text-blue-800 cursor-pointer" @click="logout">Logout</div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
  export default {
    computed: {
      ...mapGetters({
        user: 'auth/user'
      })
    },
    methods: {
      async logout () {
        await this.$store.dispatch('auth/logout')
        this.$router.push('/')
      }
    }
  }
</script>
