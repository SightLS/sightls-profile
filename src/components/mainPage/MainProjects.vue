<template>
  <section class="projects">
    <div class="container">
      <h1>Projects</h1>
      <div class="projects__list">
        <router-link to="/expenses" class="projects__item">
            <img src="../../assets/projectsPageImages/expenses.png" alt="">
            <p>Расход денежных затрат</p>
        </router-link>
        <router-link to="/checkers-info" class="projects__item">
          <img src="../../assets/projectsPageImages/checkers.jpg" alt="">
          <p>Шашки сделанные на vue.js</p>
        </router-link>
        <a href="https://github.com/SightLS?tab=repositories" target="_blank" class="projects__item projects__last">
          <img src="../../assets/projectsPageImages/git.jpg" alt="">
          <p>Так же у меня есть много других проектов на github</p>
        </a>
        <a href="https://github.com/SightLS/sightls-profile" target="_blank">P.S вот ссылка на репозиторий данного проекта</a>
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

.container {
  display: flex;
  flex-direction: column;
  margin-bottom: 40px;
}

.projects__list {
  display: flex;
  width: 100%;
  flex-direction: column;
}

.projects__item {
  background-color: rgba(255, 46, 65, 0.7);
  transform: skewY(-1.7deg);
  height: 200px;
  width: 70%;
  text-align: left;
  margin-bottom: 20px;
  display: flex;
  gap: 40px;
  align-items: center;
}
.projects__last{
  margin-bottom: 90px;
}
.projects__item:hover {
  background-color: rgba(255, 46, 65, 1);
  box-shadow: 0px 5px 10px 12px rgba(255, 46, 65, 0.2);
}

img {
  height: 100%;
}
@media (max-width: 420px) {
  img {
    height: 100%;
  }
  .projects__item {
    background-color: rgba(255, 46, 65, 0.7);
    transform: skewY(-1.7deg);
    height: 140px;
    width: 100%;
    text-align: left;
    margin-bottom: 20px;
    display: flex;
    gap: 40px;
    align-items: center;
  }
}

</style>
