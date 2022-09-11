<template>
  <section>
    <div class="about container">
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
        <br>
        <br>
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
      <div class="education">
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
    <transitionComponent/>
  </section>
</template>

<script>
import transitionComponent from '@/components/mainPage/transitionComponent'

export default {
  name: 'AboutMe',
  components: {
    transitionComponent
  }
}
</script>

<style scoped lang="scss">
ul{
  padding-left: 30px;
}
li {
  list-style-type: none;
  margin-bottom: 3px;
}
ul li:before {
  content:  "-";
  position: relative;
  left:     -5px;
}
.list{
  width: 100%;
}
section{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 100px;
}
.about {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-row-gap: 80px;
  margin-bottom: 50px;
}
.about-me{
  grid-column-start: 1;
  grid-column-end: 3;
  text-align: left;
  width: 100%;
}
h4{
  margin-bottom: -20px;
}
</style>
