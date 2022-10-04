<template>
  <div class="form">
    <input placeholder="value" v-model="value" type="number">
    <select v-model="category">
      <option value="" selected disabled hidden>select a category</option>
      <option v-for="category in categoryList"
              :key="category"
              :value="category"
      >{{ category }}
      </option>
    </select>
    <input placeholder="date" v-model="date">
    <button @click="checkForm()">Add</button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'expensesForm',
  props: {
    categoryList: {
      type: Array,
      default: () => []
    }
  },
  data: () => ({
    value: '',
    category: '',
    date: ''
  }),
  methods: {
    checkForm () {
      if (this.value && this.category) {
        this.addExpenses()
      } else {
        this.formError()
      }
    },
    addExpenses () {
      const {
        value,
        category,
        date
      } = this
      const data = {
        value,
        category,
        // date: this.date ? this.date : this.currentDay
        date: date || this.currentDay
      }
      const check = this.paymentsList.some((e) => {
        const check2 = e.some((i) => {
          return JSON.stringify(i) === JSON.stringify(this.data)
        })
        return check2
      })
      if (check !== true) {
        this.$emit('add-expenses', data)
      } else {
        alert('одно и тоже')
        this.data = data
      }
    },
    formError () {
      this.$el.querySelectorAll(['input', 'select']).forEach((e) => {
        if (!e.value) {
          e.classList.add('empty')
        }
      })
    },
    kek () {
      this.$el.querySelectorAll(['input', 'select']).forEach((e) => {
        if (e.value) {
          e.classList.remove('empty')
        }
      })
    },
    localDataPush () {
      const {
        value,
        category,
        date
      } = this
      this.data = {
        value,
        category,
        date
      }
    }
  },
  computed: {
    currentDay () {
      const currentDate = new Date()
      const day = currentDate.getDate()
      const month = currentDate.getMonth() + 1
      const year = currentDate.getFullYear()
      return `${day}.${month}.${year}`
    },
    ...mapGetters(['paymentsList'])
  },
  beforeUpdate () {
    this.kek()
    this.localDataPush()
  }
  // created () {
  //   if (this.addExpensesLink.length) {
  //     this.category = this.addExpensesLink[0]
  //     this.value = this.addExpensesLink[1]
  //     this.date = this.currentDay
  //   }
  //   console.log(this.addExpensesLink, 'dasdas')
  // }
}
</script>

<style scoped lang="scss">
.form {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 20px;
}

input {
  box-sizing: border-box;
  width: 200px;
  height: 40px;
  border: 0px;
  box-shadow: 4px 4px 50px 0px rgba(36, 132, 206, 0.4);
  border-radius: 10px;
  text-align: center;
  outline: none;
}

select {
  @extend input
}

select:focus {
  box-shadow: 4px 4px 50px 0px rgba(36, 132, 206, 6);
  animation-name: slidein;
  animation-duration: 0s;
}

input:focus {
  box-shadow: 4px 4px 50px 0px rgba(36, 132, 206, 6);
  width: 240px;
  animation-duration: 0.5s;
  animation-name: slidein;
  overflow: hidden;
}

.empty {
  box-shadow: 4px 4px 50px 0px rgba(255, 0, 0, 0.6);
}

@keyframes slidein {
  0% {
    box-shadow: 4px 4px 50px 0px rgba(36, 132, 206, 0.4);
  }
  50% {
    box-shadow: 7px 7px 50px 0px rgba(36, 132, 206, 15);
  }
  100% {
    box-shadow: 4px 4px 50px 0px rgba(36, 132, 206, 6);
  }
}

button {
  background-color: #32AB9B;
  border: 0;
  width: 100px;
  height: 40px;
  border-radius: 5px;
  margin-left: 94px;
}
</style>
