<template>
  <!-- 搜索区域 -->
  <div class="search" @click="toSearch">
    <input type="text" placeholder="搜索">
    <icon type="search" size="12" class="icon"></icon>
  </div>
</template>
<script>
  export default {
    name: "search",
    methods: {
      toSearch() {
        wx.navigateTo({
          url: '/pages/search/main'
        })
      }
    }
  }
</script>
<style scoped lang="less">
  @main-color: #00bfbf;
  .search {
    position: fixed;
    z-index: 999;
    left: 0;
    top: 0;
    width: 100%;
    padding: 20rpx 16rpx;
    background: @main-color;
    box-sizing: border-box;
    font-size: 24rpx;
    input {
      padding-left: 376rpx;
      height: 60rpx;
      background: white;
      border-radius: 6rpx;
    }
    .icon {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }
</style>