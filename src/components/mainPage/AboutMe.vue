<template>
  <section>
    <div class="about container">
      <div class="arrow" @click="switchPagePrev">
        <span>&#8249;</span>
      </div>
      <div class="about__content">
        <transition name="fade">
          <div class="first-page" v-if="pagesSlider === 0">
            <div class="about-me">
              <h1>Обо мне</h1>
              <p>Привет! Я Рамиль. Являюсь фронтэнд разработчком. Мои главные черты: <br>
                Ответственный, нормально воспринимаю критику. Нацелен на результат. <br>
                Люблю решать сложные задачи. Быстрая обучаемость. Так же есть военник,<br>
                так что проблем с военкоматом не будет.
              </p>
            </div>
            <div class="list">
              <div class="can">
                <h4>Могу:</h4><br><br>
                <ul>
                  <li>Верстать на HTML5, CSS3 (адаптивно, кроссбраузерно, PixelPerfect).</li>
                  <li>внедрить современную веб-анимацию (CSS, JS)</li>
                  <li>писать на JS (ES6, ООП)</li>
                  <li>применять паттерны программирования</li>
                  <li>писать на Vue 2 (Vuex, Vue Router)</li>
                  <li>разобраться в чужом коде</li>
                  <li>работать в команде</li>
                  <li>оценивать сроки работы</li>
                </ul>
              </div>
              <div class="stack">
                <h4>Применение стека технологий/Цифровые навыки:</h4><br><br>
                <ul>
                  <li>vue</li>
                  <li>Vuex Vue-router</li>
                  <li>HTML5 CSS3</li>
                  <li>Scss Sass</li>
                  <li>Webpack</li>
                  <li>Bootstrap</li>
                  <li>Git</li>
                  <li>БЭМ</li>
                </ul>
              </div>
            </div>
          </div>
        </transition>
        <transition name="fade">
          <div class="education-page" v-if="pagesSlider === 1">
            <div class="education">
              <h1>Образование</h1>
              <h2>Неоконченное высшее образование</h2>
              <br>
              <h3>Астраханский государственный технический университет</h3>
              <h5>Институт информационных технологий и коммуникаций</h5>
              <br>
              <p>специалист по защите информации</p>
              <br>
              <br>
              <br>
              <h2>Среднее специальное образование</h2>
              <br>
              <h3>Астраханский государственный университет</h3>
              <h5>Факультет среднего профессионального образования</h5>
              <br>
              <p>монтаж эксплуатация и ремонт электрооборудования промышленных предприятий</p>
            </div>
          </div>
        </transition>
      </div>
      <div class="arrow" @click="switchPageNext">
        <span>&#8250;</span>
      </div>
    </div>
    <transitionComponent/>
  </section>
</template>

<script>
import transitionComponent from '@/components/mainPage/transitionComponent'

export default {
  name: 'AboutMe',
  components: {
    transitionComponent
  },
  data: () => ({
    pagesSlider: 0
  }),
  methods: {
    switchPageNext () {
      let page = this.pagesSlider
      if (this.pagesSlider < 1) {
        this.pagesSlider = false
        setTimeout(() => {
          this.pagesSlider = ++page
        }, 500)
      } else {
        this.pagesSlider = false
        setTimeout(() => {
          this.pagesSlider = 0
        }, 500)
      }
    },
    switchPagePrev () {
      let page = this.pagesSlider
      if (this.pagesSlider > 0) {
        this.pagesSlider = false
        setTimeout(() => {
          this.pagesSlider = --page
        }, 500)
      } else {
        this.pagesSlider = false
        setTimeout(() => {
          this.pagesSlider = 1
        }, 500)
      }
    }
  },
  updated () {
  }
}
</script>

<style scoped lang="scss">
.about {
  height: 550px;
  display: flex;
  justify-content: space-between;
}

.about__content {
  width: 86%;
}

button {
  height: 60px;
  width: 100px;
}

.arrow {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 5%;
}
.arrow:hover{
  background-color: rgba(56, 56, 56, 0.1);
  box-shadow: 0px 5px 10px 2px rgba(56, 56, 56, 0.1);
}

span {
  font-size: 50px;
}

.arrow:hover {
  cursor: pointer;
}

ul {
  padding-left: 30px;
}

li {
  list-style-type: none;
  margin-bottom: 3px;
}

.btn-menu {
  display: flex;
  justify-content: space-between;
  margin-bottom: 40px;

}

ul li:before {
  content: "-";
  position: relative;
  left: -5px;
}

.education {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 55%;
}

.list {
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
}

.can {
  width: 45%;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

.fade-enter {
  opacity: 0;
}

.stack {
  width: 45%;
}

section {
  margin-bottom: 100px;
}

.about {
  margin-bottom: 120px;
}

.about-me {
  margin-bottom: 40px;
}

h4 {
  margin-bottom: -20px;
}
</style>
