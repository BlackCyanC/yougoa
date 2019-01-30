<template>
  <div>
    <headercom></headercom>
    <!-- 热映区域 -->
    <div class="section movie">
      <div class="top">
        <div class="title">影院热映</div>
        <a href="/pages/movielist/main?type=in_theaters">更多</a>
      </div>
      <!-- 横向滚动区域 -->
      <scroll-view scroll-x scroll-with-animation>
        <div class="item" v-for="item in hotMovies" :key="item.id">
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
    <!-- top250 -->
    <div class="section">
      <div class="top">
        <div class="title">经典电影</div>
        <a href="/pages/movielist/main?type=top250">更多</a>
      </div>
      <!-- 横向滚动区域 -->
      <scroll-view scroll-x scroll-with-animation>
        <div class="item" v-for="item in topMovies" :key="item.id">
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
    <!-- 热映区域 -->
    <div class="section movie">
      <div class="top">
        <div class="title">影院热映</div>
        <a href="/pages/movielist/main?type=in_theaters">更多</a>
      </div>
      <!-- 横向滚动区域 -->
      <scroll-view scroll-x scroll-with-animation>
        <div class="item" v-for="item in hotMovies" :key="item.id">
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
  </div>
</template>

<script>
  // 导入自己抽取的 ajax
  import hxios from "../../utils/index02.js"
  import header from '../../components/Header.vue'
  export default {
    data() {
      return {
        // 热映电影
        hotMovies: [],
        // 经典电影
        topMovies: []
      };
    },
    components: {
      headercom: header
    },
    async onLoad() {
      console.log("ok");
      // 获取豆瓣数据
      let hotRes = await hxios.get({
        url: "https://autumnfish.cn/v2/movie/in_theaters"
      });
      console.log(hotRes);
      // 为了计算方便  准备一个星星个数
      hotRes.data.subjects.forEach(v => {
        v.rating.starNum = Math.round(v.rating.average / 2);
      });
      // console.log(hotRes);
      this.hotMovies = hotRes.data.subjects;
      // top250
      // 获取豆瓣数据
      let topMovies = await hxios.get({
        url: "https://douban.uieee.com/v2/movie/top250"
      });
      // 为了计算方便  准备一个星星个数
      topMovies.data.subjects.forEach(v => {
        v.rating.starNum = Math.round(v.rating.average / 2);
      });
      console.log(topMovies);
      this.topMovies = topMovies.data.subjects;
    }
  };
</script>

<style scoped lang="less">
 ::-webkit-scrollbar {
    width: 0;
    height: 0;
    color: transparent;
  }
  // 豆绿
  @douGreen: #05b512; // 区域
  .section {
    .top {
      display: flex;
      padding: 25rpx 30rpx 0;
      justify-content: space-between;
      .title {
        font-size: 34rpx;
        font-weight: 500;
      }
      a {
        font-size: 28rpx;
        color: @douGreen;
      }
    } // 滚动区域
    scroll-view {
      width: 100%;
      overflow: hidden;
      white-space: nowrap;
      padding-top: 40rpx;
      .item {
        display: inline-block;
        width: 200rpx;
        margin-left: 25rpx;
        a {
          display: block;
          img {
            display: block;
            width: 100%;
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
    }
  }
</style>
