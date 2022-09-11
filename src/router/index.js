import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/checkers',
    name: 'checkers',
    component: () => import('../views/AppCheckers.vue')
  },
  {
    path: '/checkers-info',
    name: 'checkers-info',
    component: () => import('../views/InfoCheckersView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
