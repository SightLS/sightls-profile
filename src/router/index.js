import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "homePage" */'../views/HomeView.vue')
  },
  {
    path: '/checkers-info',
    name: 'checkers-info',
    component: () => import(/* webpackChunkName: "checkers" */'../views/InfoCheckersView.vue')
  },
  {
    path: '/not-found',
    name: 'NotFound',
    component: () => import(/* webpackChunkName: "NotFound" */'../../src/views/NotFound.vue')
  },
  {
    path: '*',
    redirect: {
      name: 'NotFound'
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
