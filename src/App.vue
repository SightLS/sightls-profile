<template>
  <div id="app">
    <HeaderBar/>
    <div class="content">
      <router-view/>
    </div>
    <AppFooter/>
  </div>
</template>

<script>
import HeaderBar from '@/components/HeaderBar'
import AppFooter from '@/components/AppFooter'

export default {
  components: {
    HeaderBar,
    AppFooter
  }
}
</script>
<style lang="scss">
* {
  padding: 0;
  margin: 0 auto;
}

#app {
  overflow: hidden;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: aliceblue;
  box-sizing: border-box;
  background-color: #131313;
}
html,
body {
  height: 100%;
}
h1 {
  margin-bottom: 50px;
}

a {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: aliceblue;
}
.container {
  width: 1250px;
}
html,
body {
  height: 100%;
}
.content{
  min-height: calc(100vh - 415px);
}
</style>
