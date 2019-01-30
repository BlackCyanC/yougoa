<template>
  <div id="start-container">
    <h3>我的微信小程序开发</h3>
    <h6>案例:</h6>
    <ul>
      <li><a href="/pages/herolist/main">LOL英雄信息查询</a></li>
      <li><a href="/pages/movieindex/main">黑板豆电影</a></li>
      <li><a @click="goIndex" href="">YouGo商城</a></li>
    </ul>
    <h5><a href="/pages/myinfo/main">关于我</a></h5>
  </div>
</template>

<script>
  export default {
    data() {
      return {}
    },
    methods: {
      goIndex() {
        wx.switchTab({
          url: "/pages/index/main"
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  #start-container {
     font-family: "SimSun";
    h3 {
      padding-top: 40rpx;
      text-align: center;
     padding-bottom: 40rpx;
    }
    h6 {
      padding-left: 60rpx;
    }
    ul {
      padding-left: 160rpx;
      list-style: none;
      li {
        list-style: none;
        a {
          text-decoration: underline;
        }
      }
    }
    h5 {
      margin-top: 60rpx;
        padding-left: 60rpx;
    }
  }
</style>
