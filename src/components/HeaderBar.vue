<template>
  <header :class="['fixed-header', { 'scrolled': isScrolled }]">
    <div class="container header-container">
      <div class="logo-container">
        <router-link to="/">
          <img src="../assets/sightls-logo.png" alt="SightLS" class="logo-sightls">
        </router-link>
      </div>
      <nav class="primary-links">
        <router-link @click.native="scrollToAbout" to="/" class="nav-link">Обо мне</router-link>
        <router-link @click.native="scrollToProject" to="/" class="nav-link">Проекты</router-link>
        <router-link @click.native="scrollToContacts" to="/" class="nav-link">Контакты</router-link>
      </nav>
      <nav class="secondary-links">
        <a href="https://github.com/SightLS" target="_blank" class="social-link">
          <img class="logo" src="../assets/GitHub-logo.png" alt="GitHub">
        </a>
        <a href="https://t.me/SightLS" target="_blank" class="social-link">
          <img class="logo" src="../assets/telegram.png" alt="Telegram">
        </a>
        <a href="https://vk.com/sightls" target="_blank" class="social-link">
          <img class="logo" src="../assets/VK_Logo.png" alt="VK">
        </a>
        <a href="https://discordapp.com/users/363734265239961602/" target="_blank" class="social-link">
          <img class="logo" src="../assets/Discord-Logo-White.png" alt="Discord">
        </a>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  name: 'HeaderBar',
  data() {
    return {
      isScrolled: false
    };
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
      this.isScrolled = window.scrollY > 50;
    },
    scrollToProject() {
      const Projects = document.querySelector('.projects');
      Projects.scrollIntoView({
        block: 'nearest',
        behavior: 'smooth'
      });
    },
    scrollToAbout() {
      const Projects = document.querySelector('.about');
      Projects.scrollIntoView({
        block: 'nearest',
        behavior: 'smooth'
      });
    },
    scrollToContacts() {
      const Projects = document.querySelector('.contacts');
      Projects.scrollIntoView({
        block: 'nearest',
        behavior: 'smooth'
      });
    }
  }
};
</script>

<style scoped lang="scss">
.fixed-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  height: 115px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 46, 65, 0.95);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: height 0.4s ease, background-color 0.4s ease;

  &.scrolled {
    height: 70px;
    background-color: rgba(255, 46, 65, 0.9);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
  }
}

.header-container {
  width: 100%;
  max-width: 1200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}

.logo-sightls {
  max-height: 50px;
  transition: max-height 0.4s ease;

  .scrolled & {
    max-height: 35px;
  }
}

.primary-links {
  display: flex;
  gap: 30px;
}

.nav-link {
  color: #fff;
  text-decoration: none;
  font-size: 18px;
  position: relative;
  transition: font-size 0.4s ease;

  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0;
    height: 2px;
    background-color: #fff;
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 100%;
  }

  .scrolled & {
    font-size: 16px;
  }
}

.secondary-links {
  display: flex;
  gap: 20px;
}

.social-link {
  opacity: 0.8;
  transition: opacity 0.3s ease, transform 0.3s ease;

  &:hover {
    opacity: 1;
    transform: translateY(-2px);
  }
}

.logo {
  max-width: 40px;
  transition: max-width 0.4s ease;

  .scrolled & {
    max-width: 30px;
  }
}

@media (max-width: 420px) {
  .fixed-header {
    height: 70px;
  }

  .logo-sightls {
    display: none;
  }

  .primary-links {
    width: auto;
    gap: 15px;
    
    .nav-link {
      font-size: 16px;
    }
  }

  .secondary-links {
    display: none;
  }
  
  .header-container {
    justify-content: center;
    padding: 0 10px;
  }
}
</style>