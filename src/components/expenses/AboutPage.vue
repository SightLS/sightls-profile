<template>
  <div> <!-- Это теперь единственный корневой элемент -->
    <div class="about">
      <p>К сожалению, БД, которое я делал в 2021 на superbase пропало...</p>
    </div>
    
    <FightMain/>
  </div>
</template>

<script>

import FightMain from '../fighting/FightMain.vue';
export default {
  name: 'AboutPage',
  components: {
    FightMain
  }
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
