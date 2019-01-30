<template>
  <div class="star-box">
    <img v-if="num>=1" src="/static/fullStar.png" alt>
    <img v-else src="/static/emptyStar.png" alt>
    <img v-if="num>=2" src="/static/fullStar.png" alt>
    <img v-else src="/static/emptyStar.png" alt>
    <img v-if="num>=3" src="/static/fullStar.png" alt>
    <img v-else src="/static/emptyStar.png" alt>
    <img v-if="num>=4" src="/static/fullStar.png" alt>
    <img v-else src="/static/emptyStar.png" alt>
    <img v-if="num>=5" src="/static/fullStar.png" alt>
    <img v-else src="/static/emptyStar.png" alt>
  </div>
</template>
<script>
  export default {
    props: ["num"]
  };
</script>
<style lang="less">
  .star-box {
    display: flex;
    img {
      width: 20rpx;
      height: 20rpx;
    }
  }
</style>