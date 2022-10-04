<template>
  <div class="wrapper">
    <div class="modal-content" v-click-outside="close">
      <h2 class="title"> {{ title }} </h2>
      <expensesForm
        @add-expenses="addExpenses"
        :categoryList="categoryList"
      />
    </div>
  </div>
</template>

<script>
import expensesForm from '@/components/expenses/expensesForm'
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'ModalWindowAddPayment',
  components: {
    expensesForm
  },
  props: {
    settings: {
      type: Object,
      default: () => ({})
    }
  },
  data: () => ({
    showModal: true
  }),
  computed: {
    ...mapGetters(['categoryList']),
    title () {
      return this.settings?.title || 'Modal window'
    }
  },
  methods: {
    ...mapMutations(['ADD_PAYMENT']),
    addExpenses (data) {
      this.ADD_PAYMENT(data)
    },
    close () {
      if (this.showModal !== true) {
        this.$modal.hide()
      }
    }
  },
  mounted () {
    setTimeout(() => {
      this.showModal = false
    }, 0)
  }
}
</script>

<style scoped lang="scss">
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: rgba(20, 0, 0, 0.2);
  position: absolute;
  top: 0;
  left: 0;
  gap: 20px;
}

.modal-content {
  max-width: 825px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  gap: 20px;
  border-radius: 8px;
  padding: 40px;
}
.title{
  color: #0c0b0b;
}
</style>
