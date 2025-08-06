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

html, body {
  overflow-x: hidden;
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
  padding-top: 115px;
  min-height: 100%;
  font-family: 'Inter', sans-serif;
  color: var(--text-color);
  background-color: var(--bg-color);
  line-height: 1.6; 
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
  font-size: 3rem;
  margin-bottom: 2rem;
}

h2 {
  font-size: 2rem; 
  margin-bottom: 1.5rem; 
  margin-top: 2rem; 
}

h3 {
  font-size: 1.5rem; 
  margin-bottom: 1rem; 
  margin-top: 1.5rem; 
}

h4 {
  font-size: 1.25rem;
  margin-bottom: 0.5rem; 
  margin-top: 1rem; 
}

p {
  margin-bottom: 1rem; 
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
  max-width: 100%;
  margin: 0 auto;
  padding: 0 1rem;
}

@media (max-width: 420px) {
  .container {
    width: var(--mobile-container-width);
  }
}

@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
</style>