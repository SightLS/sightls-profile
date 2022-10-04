<template>
  <div class="expenses">
    <button @click="addPayment">Add new cost</button>
    <expensesList :paymentsList="paymentsList"/>
  </div>
</template>

<script>
import expensesList from '@/components/expenses/ExpensesList'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'App',
  components: {
    expensesList
  },
  data: () => ({
    showModal: false
    // addExpensesLink: []
  }),
  computed: {
    ...mapGetters(['paymentsList'])
  },
  methods: {
    ...mapActions(['fetchData', 'fetchCategoryData']),
    addPayment () {
      this.$modal.show({
        title: 'Add new payment'
      })
    }
  },
  created () {
    this.fetchData()
    this.fetchCategoryData()
  }
}
</script>

<style scoped lang="scss">
.expenses-form {
  width: 250px;
}

.expenses {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

button {
  background-color: #32AB9B;
  border: 0;
  width: 300px;
  height: 30px;
  border-radius: 5px;
  position: relative;
  left: -130px;
  color: white;
  margin-bottom: 30px;
}

button:hover {
  cursor: pointer;
}

</style>
