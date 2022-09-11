<template>
<div class="animated_block">
  <div class="block_poduglom">
    <div class="text-top">
      SightLS sights SightLS sight SightLS sight SightLS sight SightLS sight SightLS sight SightLS sight SightLS sight
      SightLS sights SightLS sight SightLS sight SightLS sight SightLS sight
      SightLS sights SightLS sight SightLS sight SightLS sight SightLS sight SightLS sight SightLS sight SightLS sight
      SightLS sights SightLS sight SightLS sight SightLS sight SightLS sight
      SightLS sights SightLS sight SightLS sight SightLS sight SightLS
    </div>
  </div>
  <div class="block_poduglom2">
    <div class="text-bottom">
      SightLS sights SightLS sight SightLS sight SightLS sight SightLS sight SightLS sight SightLS sight SightLS sight
      SightLS sights SightLS sight SightLS sight SightLS sight SightLS sight
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'transitionComponent'
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
.block_poduglom2{
  @extend .block_poduglom;
  background-color: #131313;
}
.animated_block{
  width: 4100px;
  margin-left: 0px;
}
.text-top {
  position: relative;
  animation: floatingText 100s linear infinite;
  font-size: 21px;
  color: aliceblue;
}
.text-bottom{
  padding-top: 10px;
  color: aliceblue;
  position: relative;
  animation: floatingText 150s linear infinite;
  font-size: 50px;
}

@keyframes floatingText {
  0% {
    margin-left: 0;
  }
  50% {
    margin-left: -2000px;
  }
  100%{
    margin-left: 0;
  }
}

</style>
