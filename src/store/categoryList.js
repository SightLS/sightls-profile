export default {
  state: {
    categoryList: []
  },
  getters: {
    categoryList: (state) => state.categoryList
  },
  mutations: {
    SET_CATEGORY_LIST (state, categoryList) {
      state.categoryList = categoryList
    }
  },
  actions: {
    fetchCategoryData ({ commit }) {
      const initialCategoryList = [
        'Sport', 'Food', 'Transport', 'Education', 'Another'
      ]

      commit('SET_CATEGORY_LIST', initialCategoryList)
    }
  },
  modules: {}
}
