<template>
  <div id="index-container">
    <searchbox></searchbox>
    <!-- 轮播图区域 -->
    <div class="swiper-container">
      <swiper indicator-dots autoplay circular indicator-active-color="#00bfbf">
        <swiper-item v-for="(item, index) in swiperList" :key="index">
          <img :src="item.image_src" class="img"></img>
        </swiper-item>
      </swiper>
    </div>
    <!-- 分类按钮区域 -->
    <div class="category-container">
      <div class="item" v-for="item in categoryList">
        <img :src="item.image_src" alt>
        <p>{{item.name}}</p>
      </div>
    </div>
    <!-- 楼层区域 -->
    <div class="floor-container">
      <div class="floor" v-for="item in floorList">
        <!-- 顶部 -->
        <div class="top">
          <img :src="item.floor_title.image_src" alt>
          <h3>{{item.floor_title.name}}</h3>
        </div>
        <!-- 底部 -->
        <div class="bottom">
          <img v-for="(it,i)  in item.product_list" :src="it.image_src" alt>
        </div>
      </div>
    </div>
    <!-- 我是底线 -->
    <div class="bottom-line">
      <i class="iconfont icon-xiao"></i> 我是有底线的
    </div>
    <!-- 返回顶部 -->
    <div class="back-top" @click="tTop" v-show="isShow">
      <i class="iconfont icon-jiantoushang"></i> 顶部
    </div>
  </div>
</template>

<script>
  import hxios from '../../utils/index.js'
  import searchbox from '../../components/Search.vue'
  export default {
    data() {
      return {
        swiperList: [],
        categoryList: [],
        floorList: [],
        isShow: false
      }
    },
    methods: {
      tTop() {
        wx.pageScrollTo({
          scrollTop: 0,
          duration: 300
        })
      }
    },
    components: {
      searchbox
    },
    async onLoad() {
      let swiperReq = hxios.get({
        url: "api/public/v1/home/swiperdata"
      })
      let categoryReq = hxios.get({
        url: "api/public/v1/home/catitems"
      })
      let floorReq = hxios.get({
        url: "api/public/v1/home/floordata"
      })
      let Res = await Promise.all([swiperReq, categoryReq, floorReq])
      this.swiperList = Res[0].data.message
      this.categoryList = Res[1].data.message
      this.floorList = Res[2].data.message.reverse()
    },
    onPageScroll(event) {
      if (event.scrollTop > 170) {
        this.isShow = true;
      } else {
        this.isShow = false;
      }
    }
  }
</script>

<style lang="less" scoped>
  @main-color: #00bfbf;
  #index-container {
    padding-top: 100rpx;
    position: relative;
    swiper {
      width: 100vw;
      .img {
        width: 100%;
      }
    }
    .swiper-container {
      swiper {
        height: 340rpx;
        swiper-item {
          height: 100%;
        }
      }
      img {
        display: block;
        width: 100%;
        height: 100%;
      }
    } // 分类按钮区域
    .category-container {
      display: flex;
      padding-top: 24rpx;
      padding: 29rpx;
      background-color: white;
      .item {
        flex: 1;
        img {
          display: block;
          width: 128rpx;
          height: 128rpx;
          margin: 0 auto;
        }
        p {
          text-align: center;
          margin-top: 10rpx;
          font-size: 24rpx;
        }
      }
    } // 楼层数据
    .floor-container {
      .floor {
        .top {
          padding-top: 30rpx;
          padding-bottom: 30rpx;
          padding-left: 15rpx;
          position: relative;
          height: 90rpx;
          box-sizing: border-box;
          h3 {
            color: @main-color;
            position: absolute;
            left: 30rpx;
            top: 50%;
            transform: translateY(-50%);
          }
          img {
            position: absolute;
            height: 90rpx;
            left: 0;
            top: 0;
            display: block;
            width: 100%;
          }
        }
        .bottom {
          padding: 20rpx 0 0 16rpx;
          overflow: hidden;
          img {
            display: block;
            width: 33.333%;
            float: left;
            width: 230rpx;
            height: 190rpx;
            margin-right: 10rpx;
            &:first-child {
              width: 230rpx;
              height: 390rpx;
            }
            &:nth-child(2) {
              margin-bottom: 10rpx;
            }
            &:nth-child(3) {
              margin-bottom: 10rpx;
            }
          }
        }
      }
    } // 底线
    .bottom-line {
      display: flex;
      justify-content: center;
      color: #999999;
      font-size: 24rpx;
      margin-top: 20rpx;
    } // 返回顶部
    .back-top {
      position: fixed;
      bottom: 15rpx;
      right: 15rpx;
      text-align: center;
      width: 90rpx;
      height: 90rpx;
      border-radius: 50%;
      background: @main-color;
      font-size: 20rpx;
    }
  }
</style>