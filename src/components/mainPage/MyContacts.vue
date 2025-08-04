<template>
  <section class="contacts container">
    <h1>Мои контакты</h1>
    <div class="contacts__list">
      <div class="contacts__item">
        <div class="logo__container">
          <a href="https://t.me/SightLS" target="_blank" rel="noopener noreferrer" class="logo-link">
            <img class="logo" src="../../assets/telegram.png" alt="Telegram" loading="lazy">
          </a>
          <img class="arrow" src="../../assets/arrow-transition.png" alt="" aria-hidden="true">
        </div>
        <p class="contacts__link">@sightls</p>
      </div>
      
      <div class="contacts__item">
        <div class="logo__container">
          <button type="button" @click="copyMail" class="mail-button" aria-label="Скопировать email">
            <img class="logo" src="../../assets/Gmail_Logo.png" alt="Email" loading="lazy">
          </button>
          <img class="arrow" src="../../assets/arrow-copy.png" alt="" aria-hidden="true">
        </div>
        <p><a href="mailto:sightlesssf46@gmail.com" class="contacts__link">{{ mail }}</a><span style="color: #555"> — это майлту ссылка</span></p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'MyContacts',
  data: () => ({
    mail: 'sightlesssf46@gmail.com',
    isCopied: false
  }),
  methods: {
    async copyMail() {
      try {
        await navigator.clipboard.writeText(this.mail);
        this.isCopied = true;
        setTimeout(() => {
          this.isCopied = false;
        }, 2000);
      } catch (err) {
        console.error('Не удалось скопировать email:', err);
      }
    }
  }
}
</script>

<style scoped lang="scss">
h1 {
  margin-bottom: 160px;
}

button.mail-button {
  position: relative;
  bottom: 15px;
  border: none;
  font: inherit;
  color: inherit;
  background-color: transparent;
  cursor: pointer;
  padding: 0;
}

.logo__container {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.contacts__list {
  display: flex;
  justify-content: space-around;
}

.contacts {
  height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: center;

  &__list {
    display: flex;
  }

  &__link {
    width: 100%;
    text-align: center;
  }
}

.logo {
  width: 70px;
  transition: width 0.2s ease;
}

.logo-link:hover .logo,
.mail-button:hover .logo {
  width: 80px;
  cursor: pointer;
}

.logo-link:active .logo,
.mail-button:active .logo {
  width: 75px;
}

section {
  margin-bottom: 100px;
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
  align-items: center;
}

@media (max-width: 420px) {
  .arrow {
    display: none;
  }
  
  .contacts {
    height: 60vh;

    &__list {
      display: flex;
      flex-direction: column;
      gap: 30px;
    }
  }
  
  button.mail-button {
    bottom: 0;
  }
}
</style>