<template>
  <div> <!-- Это теперь единственный корневой элемент -->
    <div class="about">
      <p>К сожалению, БД, которое я делал в 2021 на superbase пропало. Сейчас все заполненно рандомными данными прямо на фронте, но тут осталось классное модальное окно. В данном приложение я использовал vue-router, vuex, так же написал отдельный плагин для модального окна и создал кастомную дерикторию для реализации v-click-outside.</p>
    </div>
  </div>
</template>

<script>

export default {
  name: 'AboutPage',
  components: {}
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
