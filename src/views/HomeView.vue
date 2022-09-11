<template>
  <div class="home">
    <main>
      <AboutMe/>
      <MainProjects/>
      <MyContacts/>
    </main>
  </div>
</template>

<script>
import AboutMe from '@/components/mainPage/AboutMe'
import MainProjects from '@/components/mainPage/MainProjects'
import MyContacts from '@/components/mainPage/MyContacts'
export default {
  name: 'HomeView',
  components: {
    AboutMe,
    MainProjects,
    MyContacts
  }
}
</script>
