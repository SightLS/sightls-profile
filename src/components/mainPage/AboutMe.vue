<template>
  <section class="about-section">
    <div class="about-container">
      <button class="nav-arrow" @click="prevPage" :aria-label="'Previous page'">
        <span class="arrow">&#8249;</span>
      </button>

      <div class="about-content">
        <div class="about-me">
          <h1 class="section-title">Обо мне</h1>
          <p class="about-description">
            Привет! Я Рамиль, фронтенд-разработчик с уверенными знаниями во frontend и крепкой базой в backend-разработке.
            Создаю интерактивные интерфейсы, игровые механики, реализую сложную логику на JavaScript и TypeScript, умею интегрировать ИИ в веб-приложения и использовать современные API.
            <br><br>
            Уверенно работаю с серверной частью на Node.js и Express, развертываю и настраиваю приложения с помощью Docker, PM2 и Nginx.
            Имею практический опыт настройки SSL/TLS сертификатов, работы с REST API, а также обеспечения безопасности серверов и клиентов.
            <br><br>
            Хорошо ориентируюсь в системах Linux (Debian, Ubuntu, Kali).
            <br><br>
            Постоянно развиваюсь и прокачиваю инженерный подход: оптимизирую архитектуру, думаю о производительности и удобстве поддержки кода.
            Уверенно работаю в команде, готов активно участвовать в код-ревью, умею оценивать сроки задач и не боюсь сложных технических вызовов.
          </p>
        </div>

        <transition name="pop-slide" mode="out-in">
          <div :key="currentPage" ref="pageRef" class="page">
            <div v-if="currentPage === 0" class="skills-container">
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

            <div v-else class="education-page">
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
    
    <transitionComponent />
  </section>
</template>

<script>
import transitionComponent from '@/components/mainPage/transitionComponent'

export default {
  name: 'AboutMe',
  components: {
    transitionComponent
  },
  data() {
    return {
      currentPage: 0,
      totalPages: 2,
      skills: [
        "Адаптивная и кроссбраузерная вёрстка (HTML5, CSS3, SCSS/SASS)",
        "Pixel Perfect, семантика, методология БЭМ",
        "Создание современной анимации (CSS, JS)",
        "JavaScript (ES6+), TypeScript, ООП, SOLID",
        "Разработка SPA на Vue 2 и 3 (Options API и Composition API)",
        "Проектирование и реализация сложной логики интерфейсов и игр",
        "Интеграция AI/ML API",
        "Асинхронность и многопоточность (Web Workers, Node.js потоки)",
        "Уверенная работа с backend (Node.js, Express)",
        "Развёртывание и настройка приложений (Docker, Nginx, PM2)",
        "Работа с SSL/TLS сертификатами (Let's Encrypt, OpenSSL)",
        "Администрирование Linux-систем (Debian, Ubuntu, Kali)",
        "Работа с чужим кодом, рефакторинг, планирование задач",
        "Командная работа, участие в код-ревью, оценка сроков"
      ],
      technologies: [
        "Vue.js 2 / 3, Composition API, Vuex, Vue Router",
        "TypeScript, JavaScript (ES6+)",
        "Ajax",
        "JSON",
        "Node.js",
        "Express",
        "Docker, Docker Compose",
        "PM2",
        "Nginx (reverse proxy, SSL, проксирование)",
        "SSL/TLS сертификаты (HTTPS)",
        "Linux (Debian, Ubuntu, Kali)",
        "HTML5, CSS3, SCSS/SASS",
        "Webpack, Vite",
        "Vuetify, Bootstrap",
        "Git, GitHub, GitLab",
        "REST API, WebSocket"
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
  min-height: 1100px;
  position: relative;
  overflow: hidden;
  transition: height 0.3s ease;
}

.about-me {
  position: relative;
  z-index: 2;
}

.page {
  padding: 1rem;
  width: 100%;
  min-height: 800px;
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
  position: relative;
  z-index: 3;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    transform: scale(1.1);
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.1);
  }

  &:active {
    transform: scale(0.95);
    transition: transform 0.1s;
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
    color: #ccc;
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
    background: #555;
    margin: 0 5px;
    padding: 0;
    cursor: pointer;
    transition: all 0.3s ease;
    
    &.active {
      transform: scale(1.2);
      background: #ccc;
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

.pop-slide-enter-active,
.pop-slide-leave-active {
  transition: all 0.6s cubic-bezier(0.68, -0.55, 0.27, 1.55);
}

.pop-slide-enter-from {
  opacity: 0;
  transform: translateY(50px) scale(0.9);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.pop-slide-leave-to {
  opacity: 0;
  transform: translateY(-50px) scale(0.9);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
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
    height: 600px
  }
  
  .skills-column {
    min-width: 100%;
  }
}
</style>