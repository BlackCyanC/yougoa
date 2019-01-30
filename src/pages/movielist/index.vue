<template>
  <div id="listContainer movie">
    <headercom></headercom>
    <!-- 横向滚动区域 -->
    <scroll-view scroll-y scroll-with-animation>
      <div class="item" v-for="item in moviesList" :key="item.id">
        <a :href="'/pages/movieinfo/main?id=' + item.id">
          <img :src="item.images.small" alt>
          <p>{{item.title}}</p>
          <div v-if="item.rating.average!=0" class="score-box">
            <div class="star-box">
              <img v-if="item.rating.starNum>=1" src="/static/fullStar.png" alt>
              <img v-else src="/static/emptyStar.png" alt>
              <img v-if="item.rating.starNum>=2" src="/static/fullStar.png" alt>
              <img v-else src="/static/emptyStar.png" alt>
              <img v-if="item.rating.starNum>=3" src="/static/fullStar.png" alt>
              <img v-else src="/static/emptyStar.png" alt>
              <img v-if="item.rating.starNum>=4" src="/static/fullStar.png" alt>
              <img v-else src="/static/emptyStar.png" alt>
              <img v-if="item.rating.starNum>=5" src="/static/fullStar.png" alt>
              <img v-else src="/static/emptyStar.png" alt>
            </div>
            <div class="score">{{item.rating.average}}</div>
          </div>
          <span v-else>暂无评分</span>
        </a>
      </div>
    </scroll-view>
  </div>
</template>

<script>
  import hxios from '../../utils/index02.js'
  import header from '../../components/Header.vue'
  export default {
    data() {
      return {
        type: "",
        urlReq: "https://douban.uieee.com/v2/movie/",
        start: 0,
        count: 9,
        moviesList: []
      }
    },
    components: {
      headercom: header
    },
    async onLoad(options) {
      this.type = options.type
      this.urlReq += this.type
      let res = await hxios.get({
        url: this.urlReq,
        data: {
          start: this.start,
          count: this.count
        }
      })
      // 为了计算方便  准备一个星星个数
      res.data.subjects.forEach(v => {
        v.rating.starNum = Math.round(v.rating.average / 2);
      })
      this.moviesList = res.data.subjects;
      console.log(res);
      console.log(this.moviesList);
    },
    async onReachBottom() {
      this.start += this.count
      this.count = 6
      let res = await hxios.get({
        url: this.urlReq,
        data: {
          start: this.start,
          count: this.count
        }
      })
      res.data.subjects.forEach(v => {
        v.rating.starNum = Math.round(v.rating.average / 2);
      })
      this.moviesList = this.moviesList.concat(res.data.subjects);
      console.log(res);
      console.log(this.moviesList);
    },
    async onPullDownRefresh() {
      wx.showNavigationBarLoading()
      this.start = 0;
      this.count = 9;
      let res = await hxios.get({
        url: this.urlReq,
        data: {
          start: this.start,
          count: this.count
        }
      })
      // 为了计算方便  准备一个星星个数
      res.data.subjects.forEach(v => {
        v.rating.starNum = Math.round(v.rating.average / 2);
      })
      this.moviesList = res.data.subjects;
      wx.hideNavigationBarLoading()
    }
  }
</script>

<style lang="less" scoped>
  scroll-view {
    width: 100%;
    padding-top: 40rpx;
  }
  .item {
    display: inline-block;
    width: 33.33333%;
    margin: 10rpx 0 0;
    a {
      display: block;
      margin: 0 auto;
      img {
        display: block;
        margin: 0 auto;
        width: 80%;
        height: 280rpx;
      }
      p {
        padding: 15rpx 0;
        text-align: center;
        overflow: hidden;
        /*超出部分隐藏*/
        white-space: nowrap;
        /*不换行*/
        text-overflow: ellipsis;
        /*超出部分文字以...显示*/
      }
      .score-box {
        display: flex;
        align-items: center;
        .star-box {
          display: flex;
          img {
            width: 20rpx;
            height: 20rpx;
          }
        }
        .score {
          font-size: 24rpx;
          color: #c81305;
        }
      }
      span {
        font-size: 25rpx;
        color: #adadad;
        display: block;
        text-align: center;
      }
    }
  }
</style>

