<template>
  <div id="index-container">
    <div class="search">
      <input type="text" placeholder="搜索">
      <icon type="search" size="12" class="icon"></icon>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {}
    }
  }
</script>

<style lang="less" scoped>
  @main-color: #ff2d4a;
  #index-container {
    .search {
      width: 100%;
      position: fixed;
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
  }
</style>
