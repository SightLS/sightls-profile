<template>
  <section class="about-section">
    <div class="about-container">
      <button class="nav-arrow" @click="prevPage" :aria-label="'Previous page'">
        <span class="arrow">&#8249;</span>
      </button>
      
      <div class="about-content">
        <transition name="fade-slide" mode="out-in">
          <div v-if="currentPage === 0" key="about" class="page about-page">
            <div class="about-me">
              <h1 class="section-title">Обо мне</h1>
              <p class="about-description">
                Привет! Я Рамиль, фронтенд-разработчик. Мои главные качества:
                ответственность, адекватное восприятие критики, нацеленность на результат.
                Люблю решать сложные задачи и быстро обучаюсь новому. Имею военный билет
                категории В.
              </p>
            </div>
            
            <div class="skills-container">
              <div class="skills-column">
                <h3 class="skills-title">Мои навыки:</h3>
                <ul class="skills-list">
                  <li v-for="(skill, index) in skills" :key="'skill-'+index" class="skill-item">
                    {{ skill }}
                  </li>
                </ul>
              </div>
              
              <div class="skills-column">
                <h3 class="skills-title">Технологический стек:</h3>
                <ul class="skills-list">
                  <li v-for="(tech, index) in technologies" :key="'tech-'+index" class="skill-item">
                    {{ tech }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <div v-else key="education" class="page education-page">
            <h1 class="section-title">Образование</h1>
            
            <div class="education-block">
              <h2 class="education-type">Неоконченное высшее образование</h2>
              <h3 class="institution">Астраханский государственный технический университет</h3>
              <p class="faculty">Институт информационных технологий и коммуникаций</p>
              <p class="specialty">Специалист по защите информации</p>
            </div>
            
            <div class="education-block">
              <h2 class="education-type">Среднее специальное образование</h2>
              <h3 class="institution">Астраханский государственный университет</h3>
              <p class="faculty">Факультет среднего профессионального образования</p>
              <p class="specialty">Монтаж, эксплуатация и ремонт электрооборудования промышленных предприятий</p>
            </div>
          </div>
        </transition>
      </div>
      
      <button class="nav-arrow" @click="nextPage" :aria-label="'Next page'">
        <span class="arrow">&#8250;</span>
      </button>
    </div>
    
    <div class="page-indicators">
      <button 
        v-for="(page, index) in totalPages" 
        :key="'indicator-'+index"
        :class="{ active: currentPage === index }"
        @click="goToPage(index)"
        :aria-label="'Go to page ' + (index + 1)"
      ></button>
    </div>
  </section>
</template>

<script>
export default {
  name: 'AboutMe',
  data() {
    return {
      currentPage: 0,
      totalPages: 2,
      skills: [
        'Верстка на HTML5, CSS3 (адаптивная, кроссбраузерная, PixelPerfect)',
        'Создание современной веб-анимации (CSS, JS)',
        'JavaScript (ES6, ООП)',
        'Применение паттернов программирования',
        'Vue 2 (Vuex, Vue Router)',
        'Анализ и работа с чужим кодом',
        'Командная работа',
        'Оценка сроков выполнения задач'
      ],
      technologies: [
        'Vue.js', 
        'Vuex, Vue Router',
        'HTML5, CSS3',
        'SCSS/SASS',
        'Webpack',
        'Bootstrap',
        'Git',
        'БЭМ',
        'Vuetify'
      ]
    }
  },
  methods: {
    nextPage() {
      this.currentPage = (this.currentPage + 1) % this.totalPages;
    },
    prevPage() {
      this.currentPage = (this.currentPage - 1 + this.totalPages) % this.totalPages;
    },
    goToPage(index) {
      this.currentPage = index;
    }
  }
}
</script>

<style scoped lang="scss">
.about-section {
  padding: 2rem 0;
  margin-bottom: 4rem;
}

.about-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.about-content {
  flex: 1;
  min-height: 500px;
  position: relative;
  overflow: hidden;
}

.page {
  padding: 1rem;
}

.nav-arrow {
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 2rem;
  transition: all 0.3s ease;
  border-radius: 50%;
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
    transform: scale(1.1);
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
  }
}

.section-title {
  font-size: 2rem;
  margin-bottom: 1.5rem;
}

.about-description {
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
}

.skills-container {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  margin-top: 2rem;
}

.skills-column {
  flex: 1;
  min-width: 300px;
}

.skills-title {
  font-size: 1.3rem;
  margin-bottom: 1rem;
}

.skills-list {
  list-style-type: none;
  padding-left: 0;
}

.skill-item {
  position: relative;
  padding-left: 1.5rem;
  margin-bottom: 0.8rem;
  line-height: 1.5;
  
  &::before {
    content: "•";
    position: absolute;
    left: 0;
    font-size: 1.2rem;
  }
}

.education-block {
  margin-bottom: 2rem;
  
  &:last-child {
    margin-bottom: 0;
  }
}

.education-type {
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
}

.institution {
  font-size: 1.1rem;
  margin-bottom: 0.3rem;
}

.faculty, .specialty {
  font-size: 1rem;
  margin-bottom: 0.3rem;
}

.page-indicators {
  display: flex;
  justify-content: center;
  margin-top: 1rem;
  
  button {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    border: none;
    background: #ccc;
    margin: 0 5px;
    padding: 0;
    cursor: pointer;
    transition: all 0.3s ease;
    
    &.active {
      transform: scale(1.2);
    }
    
    &:focus {
      outline: none;
    }
  }
}
.arrow{
  color: #fff;
  font-size: 50px;
}
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.4s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

@media (max-width: 768px) {
  .about-container {
    flex-direction: column;
  }
  
  .nav-arrow {
    order: 2;
    margin: 1rem 0;
  }
  
  .about-content {
    order: 1;
    width: 100%;
  }
  
  .skills-column {
    min-width: 100%;
  }
}
</style>