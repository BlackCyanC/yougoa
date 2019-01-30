<template>
  <!-- 顶部 -->
  <div class="header">
    <div class="left">黑板豆</div>
    <div class="right">
      <a href="#">电影</a>
      <a href="#">图书</a>
      <a href="#">广播</a>
      <a href="#">小组</a>
      <!-- 小程序自带的标签 图标 -->
      <icon type="search" color="#05b512" @click="goSearch" />
    </div>
  </div>
</template>
<script>
  export default {
    name: 'header',
    data() {
      return {}
    },
   methods: {
      goSearch() {
      console.log(1);
      wx.navigateTo({
        url: '/pages/moviesearch/main'
      });
    }
   }
  }
</script>
<style scoped lang="less">
  @douGreen: #05b512;
  .header {
    height: 105rpx;
    display: flex;
    align-items: center;
    padding: 0 40rpx;
    justify-content: space-between;
    border-bottom: 2rpx solid @douGreen;
    .left {
      color: @douGreen;
      font-size: 50rpx;
      font-weight: 700;
    }
    .right {
      display: flex;
      a {
        font-size: 30rpx;
        margin-right: 30rpx;
        &:nth-child(1) {
          color: #2585e8;
        }
        &:nth-child(2) {
          color: #a5806a;
        }
        &:nth-child(3) {
          color: #e4ab1d;
        }
        &:nth-child(4) {
          color: #30b9cd;
        }
      }
      icon {
        color: @douGreen;
      }
    }
  }
</style>