<template>
  <div class="moviesearch-container movie">
    <!-- 搜索框 -->
    <div class="search-box">
      <a href="#" @click="goBack">关闭</a>
      <input type="text">
      <icon type="search" size="24"></icon>
    </div>
    <div class="items">
      <div class="item" v-for="item in list">
        <div class="title" :style="{color:item.color}">{{item.title}}</div>
        <div class="subTitle">{{item.subTitle}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  // 导入自己抽取的 ajax
  import hxios from "../../utils/index.js";
  export default {
    data() {
      return {
        list: [{
            color: "rgb(35, 132, 232)",
            title: "电影",
            subTitle: "影院热映"
          },
          {
            color: "rgb(230, 70, 126)",
            title: "同城",
            subTitle: "周末活动"
          },
          {
            color: "rgb(159, 120, 96)",
            title: "阅读",
            subTitle: "电子书"
          },
          {
            color: "rgb(225, 100, 77)",
            title: "广播",
            subTitle: "友邻动态"
          },
          {
            color: "rgb(122, 106, 219)",
            title: "电视",
            subTitle: "正在热播"
          },
          {
            color: "rgb(42, 184, 204)",
            title: "小组",
            subTitle: "志趣相投"
          },
          {
            color: "rgb(87, 116, 197)",
            title: "游戏",
            subTitle: "虚拟世界"
          },
          {
            color: "rgb(64, 207, 169)",
            title: "FM",
            subTitle: "红心歌单"
          },
          {
            color: "rgb(159, 120, 96)",
            title: "图书",
            subTitle: "畅销排行"
          },
          {
            color: "rgb(244, 143, 46)",
            title: "音乐",
            subTitle: "新碟榜"
          },
          {
            color: "rgb(89, 108, 221)",
            title: "应用",
            subTitle: "玩手机"
          },
          {
            color: "rgb(66, 189, 86)",
            title: "豆品",
            subTitle: "生活美学"
          }
        ]
      }
    },
    methods: {
      goBack() {
        wx.navigateBack({
          delta: 1
        })
      }
    }
  };
</script>

<style scoped lang="less">
  // 搜索框
  .search-box {
    display: flex;
    position: relative;
    align-items: center;
    padding: 0 40rpx;
    height: 120rpx;
    border-bottom: 1rpx solid #aaa;
    a {
      font-size: 40rpx;
      color: #42bd56;
      margin-right: 20rpx;
    }
    input {
      flex: 1;
      height: 75rpx;
      background-color: white;
      border: solid 1px #ccc;
    }
    icon {
      position: absolute;
      top: 50%;
      right: 50%;
      transform: translate(50%, -50%);
    }
  } // 列表
  .items {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column; // 竖着要换行 高度要固定
    height: 700rpx;
    .item {
      width: 33.333%;
      text-align: center;
      margin-top: 60rpx;
      .title {
        font-size: 50rpx;
      }
      .subTitle {
        font-size: 22rpx;
        color: #aaa;
      }
    }
  }
</style>
