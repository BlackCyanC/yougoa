<template>
  <div class="detail-container movie">
    <!-- 使用header组件 -->
    <!-- <headercom></headercom> -->
    <!-- app下载推广页 -->
    <img class="app" src="/static/app.png" alt>
    <!-- 电影简介 -->
    <div class="brief-container">
      <div class="left">
        <div class="title">{{movieDetail.title}}</div>
        <div class="score-box">
          <starcom :num="num"></starcom>
          <div class="score">{{movieDetail.rating.average}}</div>
          <div class="comments">{{movieDetail.ratings_count}}人评价</div>
        </div>
        <!-- brief -->
        <div class="brief">{{brief}}</div>
      </div>
      <div class="right">
        <img :src="movieDetail.images.small" alt>
      </div>
    </div>
    <!-- 看不看按钮 -->
    <div class="button-container">
      <button>想看</button>
      <button>看过</button>
    </div>
    <!-- 频道 -->
    <div class="channel-box">
      <div class="title">所属频道</div>
      <div class="tags">
        <div class="tag" v-for="item in movieDetail.tags">{{item}}</div>
      </div>
    </div>
    <!-- 剧情简介 -->
    <div class="story-box">
      <div class="title">{{movieDetail.title}}的剧情简介</div>
      <div class="story">
        {{isShow?littleSummary:movieDetail.summary}}
        <span @click="isShow=!isShow" class="more">({{isShow?'展开':"合上"}})</span>
      </div>
    </div>
    <!-- 影人 -->
    <div class="writers-box">
      <div class="title">影人</div>
      <scroll-view scroll-x scroll-with-animation>
        <div class="item" v-for="(item, index) in movieDetail.writers" :key="item.id">
          <a href="#">
            <img :src="item.avatars.small" alt>
            <p>{{item.name}}</p>
            <p>演员</p>
          </a>
        </div>
      </scroll-view>
    </div>
  </div>
</template>

<script>
  // 导入自己抽取的 ajax
  import hxios from "../../utils/index02.js";
  // 导入抽取的组件
  import header from "../../components/Header.vue";
  import star from "../../components/Star.vue";
  export default {
    data() {
      return {
        // 电影id
        id: "",
        // 电影详情
        movieDetail: {},
        // 星星的个数
        num: 0,
        // 缩略简介
        littleSummary: "",
        // 显示展开按钮
        isShow: true
      };
    },
    // 注册组件
    components: {
      headercom: header,
      starcom: star
    },
    // 获取id 调用接口获取数据
    async onLoad(options) {
      console.log(options.id);
      this.id = options.id;
      // 获取详细数据
      let res = await hxios.get({
        url: `https://douban.uieee.com/v2/movie/subject/${this.id}`
      });
      // console.log(res);
      this.movieDetail = res.data;
      // 计算星星的个数
      this.num = Math.round(this.movieDetail.rating.average / 2);
      // 保存缩略剧情简介
      this.littleSummary = this.movieDetail.summary.slice(0, 98) + "...";
      wx.setNavigationBarTitle({
        title: this.movieDetail.title
      })
    },
    // 计算属性
    computed: {
      brief() {
        if (!this.movieDetail) {
          return;
        }
        // 拼接 需要的数据
        let tem = "";
        tem += this.movieDetail.durations[0];
        tem += "/";
        // 标签
        tem += this.movieDetail.genres.join("/");
        // 导演
        tem += this.movieDetail.directors[0].name;
        // 主演
        this.movieDetail.writers.forEach(v => {
          tem += v.name;
          tem += "/";
        });
        return tem;
      }
    }
  };
</script>

<style scoped lang="less">
  .detail-container {
    padding: 105rpx 30rpx 0;
  }
  .app {
    display: block;
    width: 100%;
    height: 160rpx;
  }
  .brief-container {
    display: flex;
    padding-top: 60rpx;
    .left {
      flex: 1;
      .title {
        font-size: 50rpx;
        margin-bottom: 20rpx;
      }
      .score-box {
        display: flex;
        font-size: 25rpx;
        justify-content: center;
        .score {
          margin-right: 25rpx;
        }
        .comments {
          color: #aaaaaa;
        }
      }
      .brief {
        font-size: 35rpx;
      }
    }
    .right {
      margin-left: 60rpx;
      align-self: flex-end;
      img {
        width: 200rpx;
        height: 300rpx;
      }
    }
  } // 按钮
  .button-container {
    display: flex;
    align-items: center;
    button {
      width: 330rpx;
      height: 60rpx;
      border: 1rpx solid #ffb712;
      color: #ffb712;
      font-size: 33rpx;
      line-height: 60rpx;
      &:first-child {
        margin: 20rpx;
      }
    }
  } // 频道
  .channel-box {
    .title {
      color: #adadad;
      font-size: 28rpx;
    }
    .tags {
      display: flex;
      flex-wrap: wrap;
      .tag {
        height: 60rpx;
        padding: 0 16rpx;
        font-size: 26rpx;
        border-radius: 30rpx;
        text-align: center;
        line-height: 60rpx;
        color: #45be59;
        border: 1rpx solid #45be59;
        background-color: #effaf0;
        margin-right: 20rpx;
        margin-top: 20rpx;
      }
    }
  } // 剧情简介
  .story-box {
    padding-top: 40rpx;
    font-size: 25rpx;
    .title {
      color: #aaa;
    }
    .story {
      margin-top: 40rpx;
    }
    .more {
      color: yellowgreen;
      background-attachment: hotpink;
    }
  }
  .writers-box {
    padding-top: 30rpx;
    .title {
      font-size: 30rpx;
      color: #aaa;
    }
    scroll-view {
      width: 100%;
      overflow: hidden;
      white-space: nowrap;
      .item {
        display: inline-block;
        a {
          width: 160rpx;
          display: block;
          margin-right: 10rpx;
          img {
            height: 220rpx;
            width: 100%;
            display: block;
          }
          p {
            margin-top: 30rpx;
            font-size: 30rpx;
            text-align: center;
            &:last-child {
              color: #aaa;
            }
          }
        }
      }
    }
  }
</style>
