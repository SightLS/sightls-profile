import Vue from 'vue'
// 1 52
import Vuex from 'vuex'
import categoryList from '@/store/categoryList'
import expensesList from '@/store/expensesList'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    expensesList,
    categoryList
  }
})
