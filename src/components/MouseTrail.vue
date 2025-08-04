<template>
  <canvas ref="canvas" class="mouse-trail-canvas"></canvas>
</template>

<script>
export default {
  name: 'MouseTrail',
  mounted() {
    const canvas = this.$refs.canvas;
    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const trail = [];
    const maxTrailLength = 60;
    let isInteractiveElement = false;

    const updateCanvasSize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('resize', updateCanvasSize);

    // Проверяем, является ли элемент интерактивным
    const isInteractive = (element) => {
  while (element && element !== document.body) {
    const interactiveTags = ['A', 'BUTTON', 'INPUT', 'SELECT', 'TEXTAREA', 'LABEL'];
    if (interactiveTags.includes(element.tagName)) return true;

    const role = element.getAttribute('role');
    if (['button', 'link', 'checkbox'].includes(role)) return true;

    const computedStyle = window.getComputedStyle(element);
    if (computedStyle.cursor === 'pointer') return true;

    element = element.parentElement;
  }
  return false;
};


    const onMouseMove = (e) => {
      trail.push({
        x: e.clientX,
        y: e.clientY,
        alpha: 1
      });
      if (trail.length > maxTrailLength) trail.shift();
      
      // Проверяем элемент под курсором
      const element = document.elementFromPoint(e.clientX, e.clientY);
      isInteractiveElement = isInteractive(element);
    };

    window.addEventListener('mousemove', onMouseMove);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      if (trail.length > 20) {
        for (let i = 0; i < trail.length - 1; i++) {
          const t1 = trail[i];
          const t2 = trail[i + 1];

          t1.alpha *= 0.985;
          t2.alpha *= 0.985;

          ctx.beginPath();
          ctx.moveTo(t1.x, t1.y);
          ctx.lineTo(t2.x, t2.y);

          const gradient = ctx.createLinearGradient(t1.x, t1.y, t2.x, t2.y);
          gradient.addColorStop(0, `hsla(${(i * 10) % 360}, 100%, 50%, ${t1.alpha})`);
          gradient.addColorStop(1, `hsla(${(i * 10 + 30) % 360}, 100%, 50%, ${t2.alpha})`);

          ctx.strokeStyle = gradient;
          ctx.lineWidth = 3;
          ctx.lineCap = 'round';
          ctx.stroke();
        }

        while (trail.length > 0 && trail[0].alpha < 0.05) {
          trail.shift();
        }
      }

      // Кружок курсора с изменяемым размером
      if (trail.length > 0) {
        const last = trail[trail.length - 1];
        ctx.beginPath();
        const radius = isInteractiveElement ? 10 : 5; // Больше на интерактивных элементах
        ctx.arc(last.x, last.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${(trail.length * 10) % 360}, 100%, 50%, ${isInteractiveElement ? 0.9 : 0.7})`;
        ctx.fill();
      }

      requestAnimationFrame(draw);
    };

    document.body.style.cursor = 'none';
    this.$once('hook:beforeDestroy', () => {
      document.body.style.cursor = '';
      window.removeEventListener('resize', updateCanvasSize);
      window.removeEventListener('mousemove', onMouseMove);
    });

    draw();
  }
}
</script>

<style scoped>
.mouse-trail-canvas {
  position: fixed;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 9999;
}
</style>