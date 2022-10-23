<template>
  <footer>
    <div class="container">
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
      <span>©Все права чет там)</span>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'AppFooter'
}
</script>

<style scoped lang="scss">

footer{
  height: 105px;
  background-color: rgb(255, 46, 65);
  nav{
    display: flex;
    margin-top: 20px;
    justify-content: center;
    gap: 20px;
  }
  .logo{
    max-width: 40px;
    padding-top: 20px;
  }
}

</style>
