import { createStore } from 'vuex'
import { auth } from './auth/auth'
import { albumInfo } from './albums/albums'

export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth,
    albumInfo
  }
})
