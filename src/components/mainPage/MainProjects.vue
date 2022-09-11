<template>
 <section class="projects">
   <div class="container">
     <div class="headline">
       <h1>Projects</h1>
     </div>
      <div class="projects__list">
        <div class="projects__item">
          <router-link to="/checkers">шашки</router-link>
        </div>
        <div class="projects__item">
          <router-link to="/checkers-info">dasda</router-link>
        </div>
        <div class="projects__item">another</div>
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
.headline{
  position: relative;
  width: 100%;
  text-align: left;
}
.container{
  height: 100vh;
  display: flex;
  flex-direction: column;
  margin-bottom: 40px;
}
.projects__list{
  height: 800px;
  display: flex;
  width: 100%;
  flex-direction: column;
}
.projects__item{
  transform: skewY(-1.3deg);
  border: 1px solid black;
  height: 100%;
  width: 100%;
  text-align: left;
}
</style>
