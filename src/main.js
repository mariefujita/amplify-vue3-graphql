import { createApp } from 'vue'
import App from './App.vue'
import './assets/tailwind.css'
import router from './router'
import store from './store'
import Amplify from 'aws-amplify'
import { applyPolyfills, defineCustomElements } from '@aws-amplify/ui-components/loader'
import AmplifyVue from '@aws-amplify/ui-vue'
import aws_exports from './aws-exports'
import '@aws-amplify/ui-vue/styles.css'

Amplify.configure(aws_exports)
applyPolyfills().then(() => {
  defineCustomElements(window);
})

createApp(App).use(store).use(router).use(AmplifyVue).mount('#app')
