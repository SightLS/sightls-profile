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
*,
*::before,
*::after {
  box-sizing: border-box;
}
ul[class],
ol[class] {
  padding: 0;
}
body,
h1,
h2,
h3,
h4,
p,
ul[class],
ol[class],
li,
figure,
figcaption,
blockquote,
dl,
dd {
  margin: 0;
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
  text-decoration: none;
}
.container {
  width: 1250px;
  margin: 0 auto;
}
.content{
  min-height: calc(100vh - 260px);
}
</style>
