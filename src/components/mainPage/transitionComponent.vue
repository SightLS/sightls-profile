<template>
  <div class="animated_block">
    <div class="block_poduglom">
      <div class="text-top">
        {{ bannerSightLSUp }}
      </div>
    </div>
    <div class="block_poduglom2">
      <div class="text-bottom">
          {{ bannerSightLSDown }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'transitionComponent',
  methods: {},
  computed: {
    bannerSightLSUp () {
      const banner = []
      for (let i = 0; i < 51; i++) {
        banner.push('SightLS')
      }
      return banner.join(' ')
    },
    bannerSightLSDown () {
      const banner = []
      for (let i = 0; i < 21; i++) {
        banner.push('SightLS')
      }
      return banner.join(' ')
    }
  }
}
</script>

<style scoped lang="scss">
.block_poduglom {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  transform: skewY(-1.3deg);
  background-color: rgb(255, 46, 65);
}

.block_poduglom2 {
  @extend .block_poduglom;
  background-color: #131313;
}

.animated_block {
  width: 4100px;
  margin-left: 0px;
}

.text-top {
  position: relative;
  animation: floatingText 100s linear infinite;
  font-size: 21px;
  color: aliceblue;
}

.text-bottom {
  padding-top: 10px;
  color: aliceblue;
  position: relative;
  animation: floatingText 150s linear infinite;
  font-size: 50px;
}

@keyframes floatingText {
  0% {
    margin-left: -100px;
  }
  50% {
    margin-left: -2000px;
  }
  100% {
    margin-left: -100px;
  }
}

</style>
