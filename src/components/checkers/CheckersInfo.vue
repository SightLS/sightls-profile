<template>
  <div class="checkers-info container">
    <h1>Шашки</h1>
    <p>Это просто шашки. Люблю играть в них, поэтому решил написать свои. стилей не много, чтобы не весили много.<br>
      Написаны чисто на js и vue, сторонних библеотек не подключал.<br>
      Если желаете попробовать поиграть, нажмите "играть"(игра заупститься прямо в этом окне).</p>
    <a href="https://github.com/SightLS/vue_checkers" target="_blank">Вот ссылка на репозиторий на github.</a><br>
    <button @click="show = !show"><h2>{{ play }}</h2></button>
    <AppCheckers v-if="show"/>
  </div>
</template>

<script>
import AppCheckers from '@/views/AppCheckers'

export default {
  name: 'CheckersInfo',
  components: {
    AppCheckers
  },
  data: () => ({
    show: false,
    play: 'играть'
  }),
  beforeUpdate () {
    !this.show ? this.play = 'играть' : this.play = 'выключить'
  }
}
</script>

<style scoped lang="scss">
button {
  position: relative;
  bottom: -100px;
  margin-bottom: 200px;
  border: 1px solid red;
  padding: 15px;
  background-color: red;
  border-radius: 10px;
  height: 60px;
  color: aliceblue;
}

button:hover {
  cursor: pointer;
}

a {
  position: relative;
  bottom: -20px;
}
</style>
