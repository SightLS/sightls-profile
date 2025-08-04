<template>
  <div class="app-layout">
    <mouse-trail />
    <header-bar />
    
    <main class="app-content">
      <chat />
      <router-view />
    </main>
    
    <app-footer />
  </div>
</template>

<script>
export default {
  name: 'AppLayout',
  components: {
    HeaderBar: () => import('@/components/HeaderBar'),
    AppFooter: () => import('@/components/AppFooter'),
    MouseTrail: () => import('@/components/MouseTrail'),
    Chat: () => import('@/components/chat/Chat'),
  }
}
</script>

<style lang="scss">
:root {
  --bg-color: #131313;
  --text-color: aliceblue;
  --container-width: 1250px;
  --mobile-container-width: 400px;
  --content-min-height: calc(100vh - 260px);
}

*,
*::before,
*::after {
  box-sizing: border-box;
}
* {
  cursor: none !important;
}
/* Remove default margin and padding */
body,
h1, h2, h3, h4,
p,
ul, ol,
li,
figure,
figcaption,
blockquote,
dl, dd {
  margin: 0;
  padding: 0;
}

ul[class],
ol[class] {
  list-style: none;
}
html {
  height: 100%;
  cursor: default !important;
}

body {
  min-height: 100%;
  font-family: 'Avenir', 'Helvetica', 'Arial', sans-serif;
  color: var(--text-color);
  background-color: var(--bg-color);
  line-height: 1.5;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  overflow: hidden;
}

.app-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.app-content {
  flex: 1;
  min-height: var(--content-min-height);
}

h1 {
  margin-bottom: 3.125rem; /* 50px */
}

a {
  color: inherit;
  text-decoration: none;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.8;
  }
}
.app-footer {
  margin-top: auto;
}
.container {
  width: var(--container-width);
  margin: 0 auto;
  padding: 0 1rem;
}

@media (max-width: 420px) {
  .container {
    width: var(--mobile-container-width);
  }
}

/* Accessibility improvements */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
</style>