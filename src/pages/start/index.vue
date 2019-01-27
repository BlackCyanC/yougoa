<template>
  <div id="start-container">
    <h3>我的微信小程序开发</h3>
    <h6>案例:</h6>
    <ul>
      <li><a @click="goList" href="/pages/list/main">LOL英雄信息查询</a></li>
      <li><a @click="goIndex" href="">YouGo商城</a></li>
    </ul>
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
  }
</style>
