<template>
  <div id="expensesView">
    <nav class="navigation-expenses">
      <router-link to="/expenses/main">main</router-link>
      <router-link to="/expenses/about-expenses">about</router-link>
    </nav>
    <main class="conatiner">
      <router-view></router-view>
    </main>
    <transition name="fade">
      <ModalWindowAddPayment v-if="showModal" :settings="modalSetting"/>
    </transition>
  </div>
</template>

<script>
import ModalWindowAddPayment from '../components/expenses/ModalWindowAddPayment'

export default {
  name: 'expenses',
  components: {
    ModalWindowAddPayment
  },
  data: () => ({
    showModal: false,
    modalSetting: {}
  }),
  methods: {
    modalOpen (settings) {
      this.modalSetting = settings
      this.showModal = true
    },
    modalClose () {
      this.showModal = false
    }
  },
  mounted () {
    this.$modal.EventBus.$on('show', this.modalOpen)
    this.$modal.EventBus.$on('hide', this.modalClose)
  }
}
</script>

<style lang="scss">

.navigation-expenses {
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 40px;
  margin-bottom: 40px;
}
button:hover{
  cursor: pointer;
}

.conatiner {
  width: 1000px;
  margin: 0 auto;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
