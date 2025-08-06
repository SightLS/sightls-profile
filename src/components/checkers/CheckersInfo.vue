<template>
  <div class="checkers-info container">
    <h1>Шашки</h1>
    <p>Это просто шашки. Люблю играть в них, поэтому решил написать свои. стилей не много, чтобы не весили много.<br>
      Написаны чисто на js и vue, сторонних библеотек, кроме howler, нет.<br>
      Если желаете попробовать поиграть, нажмите "играть"(игра запуститься прямо в этом окне).</p>
    <a href="https://github.com/SightLS/vue_checkers" target="_blank">Репозитрий на github.</a><br>
    <button @click="show = !show">{{ play }}</button>
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
  margin-top: 2rem;
  background-color: rgb(255, 46, 65);
  color: #fff;
  border: none;
  padding: 0.75em 1.5em;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease, box-shadow 0.2s ease;
  box-shadow: 0 2px 8px rgba(255, 46, 65, 0.3);
}

button:hover {
  background-color: rgb(230, 40, 58);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(255, 46, 65, 0.4);
}

button:active {
  transform: translateY(0);
  box-shadow: 0 2px 6px rgba(255, 46, 65, 0.3);
}

</style>
