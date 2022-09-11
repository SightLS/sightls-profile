<template>
  <section class="contacts container">
    <h1>Мои контакты</h1>
    <div class="contacts__list">
      <div class="contacts__item">
        <div class="logo__container">
          <a href="https://t.me/SightLS" target="_blank">
            <img class="logo" src="../../assets/telegram.png" alt="telegram">
          </a>
          <img class="arrow" src="../../assets/arrow-transition.png" alt="">
        </div>
        <p class="contacts__link">@sightls</p>
      </div>
      <div class="contacts__item">
        <div class="logo__container">
          <button href="#" @click="copyMail()">
            <img class="logo" src="../../assets/Gmail_Logo.png" alt="mail">
          </button>
          <img class="arrow" src="../../assets/arrow-copy.png" alt="">
        </div>
        <p class="contacts__link">{{ mail }}</p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'MyContacts',
  data: () => ({
    mail: 'sightlesssf46@gmail.com'
  }),
  methods: {
    copyMail () {
      navigator.clipboard.writeText(this.mail)
    }
  }
}
</script>

<style scoped lang="scss">
h1 {
  margin-bottom: 160px;
}
button {
  position: relative;
  bottom: 15px;
  border: none;
  font: inherit;
  color: inherit;
  background-color: transparent;
}
.logo__container {
  display: flex;
  flex-direction: row;
}
.contacts__list{
  display: flex;
  justify-content: space-around;
}
.contacts {
  height: 60vh;

  &__list {
    display: flex;
  }
  &__link{
    width: 100%;
    position: relative;
    left: 73px;
  }
}

.logo {
  width: 70px;
}
.logo:hover{
  width: 80px;
  cursor: pointer;
}
.logo:active{
  width: 75px;
}
.arrow {
  position: relative;
  bottom: 20px;
  left: 40px;
  max-width: 400px;
}

.contacts__item {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
