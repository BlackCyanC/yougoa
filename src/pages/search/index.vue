<template>
  <div class="search-container">
    <!-- 顶部的搜索盒子 -->
    <div class="search-box">
      <icon type="search" size="14"></icon>
      <input type="text" placeholder="请输入你想要的商品">
      <button>取消</button>
    </div>
    <!-- 底部的容器 -->
    <div class="bottom">
      <div class="history-box">
        <div class="title-box">
          <span>历史搜索</span>
          <i class="iconfont icon-shanchu"></i>
        </div>
        <div class="items">
          <div class="item">
            {{ message }}
            <i class="iconfont icon-shanchu"></i>
          </div>
        </div>
      </div>
      <div class="result-box"></div>
    </div>
  </div>
</template>

<script>
  // 导入hxios
  import hxios from '../../utils/index.js';
  export default {
    name: "search",
    data() {
      return {
        message: "小米"
      }
    }
  };
</script>

<style lang="less">
  .search-box {
    display: flex;
    position: relative;
    padding: 30rpx 15rpx;
    background-color: #eeeeee;
    icon {
      position: absolute;
      left: 35rpx;
      top: 50%;
      transform: translateY(-50%);
    }
    input {
      flex: 1;
      height: 60rpx;
      padding-left: 70rpx;
      margin-right: 20rpx;
      font-size: 25rpx;
      color: #aaa;
      background: white;
    }
    button {
      font-size: 28rpx;
      text-align: center;
      line-height: 60rpx;
      width: 160rpx;
      height: 60rpx;
      background-color: #eee;
      border-color: black;
      box-shadow: 0 0 10rpx cyan;
    }
  } // 历史记录
  .bottom {
    .history-box {
      padding: 30rpx 30rpx 0 15rpx;
      .title-box {
        display: flex;
        justify-content: space-between;
        span {
          font-size: 30rpx;
        }
        i {
          color: #ddd;
        }
      }
      .items {
        margin-top: 30rpx;
        display: flex;
        flex-wrap: wrap;
        .item {
          height: 65rpx;
          padding: 0 20rpx;
          line-height: 65rpx;
          background-color: #dddddd;
          font-size: 25rpx;
          margin-right: 30rpx;
          margin-bottom: 15rpx;
          position: relative;
          border-radius: 10rpx;
          i {
            position: absolute;
            top: 0;
            right: 0;
            transform: translate(50%, -50%);
          }
        }
      }
    }
  }
</style>
