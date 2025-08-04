<template>
  <footer class="app-footer">
    <div class="container">
      <nav class="social-links">
        <a href="https://github.com/SightLS" target="_blank" rel="noopener">
          <img class="logo" src="../assets/GitHub-logo.png" alt="GitHub">
        </a>
        <a href="https://t.me/SightLS" target="_blank" rel="noopener">
          <img class="logo" src="../assets/telegram.png" alt="Telegram">
        </a>
        <a href="https://vk.com/sightls" target="_blank" rel="noopener">
          <img class="logo" src="../assets/VK_Logo.png" alt="VK">
        </a>
        <a href="https://discordapp.com/users/363734265239961602/" target="_blank" rel="noopener">
          <img class="logo" src="../assets/Discord-Logo-White.png" alt="Discord">
        </a>
      </nav>
      <span class="copyright">© Все права чет там)</span>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'AppFooter'
}
</script>

<style scoped lang="scss">
.app-footer {
  height: 105px;
  background-color: rgb(255, 46, 65);
  display: flex;
  align-items: center;

  .container {
    width: 100%;
    text-align: center;
  }

  .social-links {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-bottom: 10px;

    a {
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }

    .logo {
      max-width: 40px;
      height: auto;
    }
  }

  .copyright {
    display: block;
    font-size: 14px;
    color: white;
  }
}
</style>
