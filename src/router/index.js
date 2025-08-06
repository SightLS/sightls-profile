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
    path: '/fighting',
    name: 'fighting',
    component: () => import(/* webpackChunkName: "fighting" */'../views/FightingView.vue')
  },
  {
    path: '/expenses',
    name: 'expenses',
    component: () => import(/* webpackChunkName: "expenses" */'../views/ExpensesView.vue'),
    children: [
      {
        path: '',
        redirect: 'about-expenses'
      },
      {
        path: '/expenses/main',
        name: 'expenses-main',
        component: () => import(/* webpackChunkName: "expensesMain" */'../../src/views/expensesPages/ExpensesMain')
      },
      {
        path: '/expenses/about-expenses',
        name: 'about-expenses',
        component: () => import(/* webpackChunkName: "about-expenses" */'../../src/views/expensesPages/AboutExpenses')
      }
    ]
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
