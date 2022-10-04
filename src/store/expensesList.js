export default {
  state: {
    paymentsList: []
  },
  getters: {
    paymentsList: (state) => state.paymentsList
  },
  mutations: {
    SET_PAYMENTS_LIST (state, paymentsList) {
      state.paymentsList = paymentsList
    },
    ADD_PAYMENT (state, payment) {
      if (state.paymentsList[state.paymentsList.length - 1].length < 5) {
        state.paymentsList[state.paymentsList.length - 1].push(payment)
      } else {
        state.paymentsList.push([])
        state.paymentsList[state.paymentsList.length - 1].push(payment)
      }
      // }
    }
  },
  actions: {
    fetchData ({ commit }) {
      setTimeout(() => {
        const initialPaymentsList = [
          [
            {
              date: '28.03.2020',
              category: 'Food',
              value: 1488
            },
            {
              date: '14.88.2002',
              category: 'Sport',
              value: 1231
            },
            {
              date: '32.22.2800',
              category: 'Transport',
              value: 2033
            },
            {
              date: '14.88.2002',
              category: 'Education',
              value: 1231
            },
            {
              date: '32.22.2800',
              category: 'Food',
              value: 2033
            }
          ],
          [{
            date: '32.22.2800',
            category: 'Food',
            value: 2033
          }]
        ]

        commit('SET_PAYMENTS_LIST', initialPaymentsList)
      }, 500)
    }
  }
}
