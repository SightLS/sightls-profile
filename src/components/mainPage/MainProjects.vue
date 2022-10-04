<template>
  <section class="projects">
    <div class="container">
      <div class="headline">
        <h1>Projects</h1>
      </div>
      <div class="projects__list">
        <router-link to="/checkers-info">
          <div class="projects__item">
            <p>Шашки</p>
          </div>
        </router-link>
        <div class="projects__item">
          <a href="https://github.com/SightLS/vue-expenses-project" target="_blank">Расчет затрат</a>
        </div>
        <div class="projects__item">
          <a href="https://github.com/SightLS/vue-expenses-project" target="_blank">Много других моих проектов на
            GitHub</a>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'MainProjects'
}
</script>

<style scoped lang="scss">
.headline {
  position: relative;
  width: 100%;
  text-align: left;
}

.container {
  display: flex;
  flex-direction: column;
  margin-bottom: 40px;
}

.projects__list {
  height: 200px;
  display: flex;
  width: 100%;
  flex-direction: column;
}

.projects__item {
  background-color: rgb(255, 46, 65);
  transform: skewY(-1.3deg);
  border: 1px solid black;
  height: 40px;
  width: 100%;
  text-align: left;
  margin-bottom: 20px;
}
.projects__item:hover{
  height: 50px;
  width: 110%;
}
</style>
