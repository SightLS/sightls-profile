<template>
    <div class="container game-page">
      <div class="button-group" v-if="showMain">
        <button @click="showMain = false">Вернуться к описанию</button>
        <button @click="restartGame">Перезапустить</button>
      </div>
  
      <FightingAbout v-if="!showMain" />
      
      <button v-if="!showMain" @click="showMain = true">Играть</button>
  
      <FightingMain v-if="showMain" :key="gameKey" />
    </div>
  </template>
  
  <script>
  import FightingMain from '@/components/fighting/FightMain.vue'
  import FightingAbout from '@/components/fighting/FightingAbout.vue';
  
  export default {
    name: 'FightingView',
    components: {
      FightingMain,
      FightingAbout
    },
    data() {
      return {
        showMain: false,
        gameKey: 0
      }
    },
    methods: {
      restartGame() {
        this.gameKey += 1;
      },
      // отключаем стандартное поведение клавиш
      disableScroll(e) {
        if (this.showMain) {
          const keysToPrevent = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '];
          if (keysToPrevent.includes(e.key)) {
            e.preventDefault();
          }
        }
      },
      addKeyListener() {
        window.addEventListener('keydown', this.disableScroll);
      },
      removeKeyListener() {
        window.removeEventListener('keydown', this.disableScroll);
      }
    },
    mounted() {
      this.addKeyListener();
    },
    beforeDestroy() {
      this.removeKeyListener();
    }
  }
  </script>
  
  <style scoped>
  .game-page {
    margin-bottom: 2em;
  }
  
  button {
    margin-top: 2rem;
    background-color: rgb(255, 46, 65);
    color: #fff;
    border: none;
    padding: 0.75em 1.5em;
    font-size: 1rem;
    font-weight: 600;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease, box-shadow 0.2s ease;
    box-shadow: 0 2px 8px rgba(255, 46, 65, 0.3);
    margin: 0.5em 0.5em 1em 0;
  }
  
  button:hover {
    background-color: rgb(230, 40, 58);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(255, 46, 65, 0.4);
  }
  
  button:active {
    transform: translateY(0);
    box-shadow: 0 2px 6px rgba(255, 46, 65, 0.3);
  }
  
  .button-group {
    display: flex;
    gap: 1em;
    margin-bottom: 1em;
  }
  </style>