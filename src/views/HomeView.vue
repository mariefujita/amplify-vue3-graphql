<template>
  <div class="home">
    <app-login />
  </div>
</template>

<script>
import AppLogin from '@/components/AppLogin.vue'
// @ is an alias to /src
export default {
  name: 'HomeView',
  components: {
    AppLogin
  }
}
</script>
