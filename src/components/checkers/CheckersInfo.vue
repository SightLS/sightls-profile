<template>
  <div class="checkers-info container">
    <h1>Шашки</h1>
    <p>Это просто шашки. Люблю играть в них, поэтому решил написать свои. стилей не много, чтобы не весили много.<br>
      Написаны чисто на js и vue, сторонних библеотек, кроме howler, нет.<br>
      Если желаете попробовать поиграть, нажмите "играть"(игра запуститься прямо в этом окне).</p>
    <a href="https://github.com/SightLS/vue_checkers" target="_blank">Репозитрий на github.</a><br>
    <button @click="show = !show"><h2>{{ play }}</h2></button>
    <BoardCheckers v-if="show"/>
  </div>
</template>

<script>

export default {
  name: 'CheckersInfo',
  components: {
    BoardCheckers: () => import('@/components/checkers/BoardCheckers')
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
  border: 1px solid rgb(255, 46, 65);;
  padding: 15px;
  background-color: rgb(255, 46, 65);
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
