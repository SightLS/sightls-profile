<template>
  <header>
    <div class="container header">
      <div class="logo-container">
        <router-link to="/">
          <img src="../assets/sightls-logo.png" alt="SightLS" class="logo-sightls">
        </router-link>
      </div>
      <nav class="primary-links">
        <router-link @click.native="scrollToAbout" to="/">Обо мне</router-link>
        <router-link @click.native="scrollToProject" to="/">Проекты</router-link>
        <router-link @click.native="scrollToContacts" to="/">Контакты</router-link>
      </nav>
      <nav class="secondary-links">
        <a href="https://github.com/SightLS" target="_blank">
          <img class="logo" src="../assets/GitHub-logo.png" alt="GitHub">
        </a>
        <a href="https://t.me/SightLS" target="_blank">
          <img class="logo" src="../assets/telegram.png" alt="Telegram">
        </a>
        <a href="https://vk.com/sightls" target="_blank">
          <img class="logo" src="../assets/VK_Logo.png" alt="VK">
        </a>
        <a href="https://discordapp.com/users/363734265239961602/" target="_blank">
          <img class="logo" src="../assets/Discord-Logo-White.png" alt="Discord">
        </a>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  name: 'HeaderBar',
  methods: {
    scrollToProject () {
      const Projects = document.querySelector('.projects')
      Projects.scrollIntoView({
        block: 'nearest',
        behavior: 'smooth'
      })
    },
    scrollToAbout () {
      const Projects = document.querySelector('.about')
      Projects.scrollIntoView({
        block: 'nearest',
        behavior: 'smooth'
      })
    },
    scrollToContacts () {
      const Projects = document.querySelector('.contacts')
      Projects.scrollIntoView({
        block: 'nearest',
        behavior: 'smooth'
      })
    }
  }
}
</script>

<style scoped lang="scss">
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

header {
  margin-bottom: 40px;
  display: flex;
  backdrop-filter: blur(30px);
  height: 115px;
  align-items: center;
  justify-content: center;
  background-color: rgb(255, 46, 65);
}

.logo-sightls {
  max-height: 50px;
}

.logo-container {
  margin: 0;
}

.primary-links {
  display: flex;
  gap: 10px;
  width: 300px;
}

.secondary-links {
  @extend .primary-links;
  gap: 40px;
}

.logo {
  max-width: 40px;
}

</style>
