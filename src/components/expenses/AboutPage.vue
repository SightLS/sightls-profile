<template>
  <div>
    <p>Приложение написал на vue.js. В данном приложение я использовал vue-router, vuex, так же написал отдельный плагин
    для модального окна и создал кастомную дерикторию для реализации v-click-outside.<br>
    Мобильной версии нет</p>
    <a href="https://github.com/SightLS/Expenses" target="_blank">github.com/SightLS/Expenses</a>
  </div>
</template>

<script>
export default {
  name: 'AboutPage'
}
</script>

<style scoped>
p{
  margin-bottom: 10px;
}
@media (max-width: 420px) {
  div{
    width: 400px;
    padding-left: 30px;
  }
}

</style>
