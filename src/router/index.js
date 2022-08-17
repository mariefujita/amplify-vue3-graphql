import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SignUpPage from '@/views/SignUpPage'
import AlbumsPage from '@/views/AlbumsPage'
import AlbumDetailPage from '@/views/AlbumDetailPage'
import { Auth } from 'aws-amplify'


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/signup',
    name: 'SignUpPage',
    component: SignUpPage
  },
  {
    path: '/album/:id',
    name: 'AlbumDetailPage',
    component: AlbumDetailPage,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/albums',
    name: 'AlbumsPage',
    component: AlbumsPage,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const isAuthenticated = await Auth.currentUserInfo()

  if (requiresAuth && !isAuthenticated) {
    next('/')
  } else {
    next()
  }
})

export default router
