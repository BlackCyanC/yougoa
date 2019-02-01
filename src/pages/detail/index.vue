<template>
  <div id='detail-container'>
    <!-- 轮播图 -->
    <swiper indicator-dots autoplay circular>
      <swiper-item v-for="(item, index) in goodsInfo.pics" :key="item.pics_id" @click='previewImg(item.pics_big)'>
        <image mode="aspectFill" :src="item.pics_mid"></image>
      </swiper-item>
    </swiper>
    <!-- 商品的基本信息 -->
    <div class="goodsinfo">
      <div class="price">¥{{goodsInfo.goods_price}}</div>
      <div class="name-box">
        <div class="left">
          {{goodsInfo.goods_name}}
        </div>
        <div class="right">
          <i class="iconfont icon-shoucang"></i> 收藏
        </div>
      </div>
      <div class="express">
        快递:&nbsp;&nbsp;&nbsp;免运费
      </div>
    </div>
    <!-- 选项区域 -->
    <div class="section">
      <div class="item hot">
        <span>促销</span> 满300减30元
      </div>
      <div class="item">
        <span>已选</span> 黑色/S/1件
      </div>
    </div>
    <div class="section">
      <div class="item" @click="chooseAddress">送至 {{address}} <i class='iconfont icon-jiantouyou'></i></div>
    </div>
    <!-- tab栏切换 -->
    <div class="tab-bar">
      <div class="bar-item" @click="tabIndex=0" :class="{active:tabIndex==0}">图文介绍</div>
      <div class="bar-item" @click="tabIndex=1" :class="{active:tabIndex==1}">规格参数</div>
    </div>
    <div class="tab-content">
      <!-- 商品详情 -->
      <div class="content-item" v-show="tabIndex==0" v-html="goodsInfo.goods_introduce"></div>
      <!-- 规格参数 -->
      <div class="content-item" v-show="tabIndex==1">
        <div class='row' v-for="(item, index) in goodsInfo.attrs" :key="item.goods_id">
          <div class='col'>{{item.attr_name}}</div>
          <div class='col'>{{item.attr_value}}</div>
        </div>
      </div>
    </div>
    <!-- 底部的控制器区域 -->
    <div class="control-box">
      <div class="item" @click="callKefu">
        <i class='iconfont icon-kefu'></i> 联系客服
      </div>
      <div class="item" @click="toCart">
        <i class='iconfont icon-gouwuche'></i> 购物车
      </div>
      <button @click="add2Cart(goodsInfo.goods_id)" class="cart">加入购物车</button>
      <button class="buy">立即购买</button>
    </div>
  </div>
</template>

<script>
  // 导入hxios
  import hxios from "../../utils/index.js";
  // 导入购物车的操纵模块
  import cart from "../../utils/cart.js";
  export default {
    data: function() {
      return {
        //    商品id
        id: 0,
        // 商品详情
        goodsInfo: {},
        // 收货地址
        address: "",
        // tan显示的索引
        tabIndex: 0
      };
    },
    // 事件
    methods: {
      previewImg(current) {
        // 准备一个 用来预览的数组
        let urls = [];
        this.goodsInfo.pics.forEach(v => {
          urls.push(v.pics_big);
        });
        wx.previewImage({
          current, // 当前显示图片的http链接
          urls // 需要预览的图片http链接列表
        });
      },
      // 联系客服
      callKefu() {
        wx.makePhoneCall({
          phoneNumber: "18888888888" // 仅为示例，并非真实的电话号码
        });
      },
      // 选择地址
      chooseAddress() {
        // 微信小程序中 也需要上下文绑定
        // let that = this;
        wx.chooseAddress({
          success: res => {
            this.address = res.provinceName + res.cityName + res.countyName;
          }
        });
      },
      // 加入购物车
      add2Cart(goods_id) {
        // console.log(goods_id);
        // 调用自己封装的函数
        cart.add2Cart(goods_id);
      },
      // 去购物车页面
      toCart() {
        console.log("跳!!");
        // wx.navigateTo({ url: "/pages/cart/main" });
        // 购物车页面 是配置在 tabbar中 不能使用navigateTo 进行跳转 需要使用另外一个函数
        wx.switchTab({
          url: "/pages/cart/main"
        });
      }
    },
    onLoad(options) {
      console.log(options);
      this.id = options.id;
      // 获取网络数据
      hxios.get({
        url: `api/public/v1/goods/detail?goods_id=${this.id}`
      }).then(res => {
        console.log(res);
        this.goodsInfo = res.data.message;
      });
    }
  };
</script>

<style lang='less'>
  @main-color: #00bfbf;
  // 使用padding 让底部的内容 向上
  page {
    padding-bottom: 90rpx;
  }
  swiper {
    height: 700rpx;
  }
  swiper-item {
    image {
      display: block;
      width: 100%;
      height: 700rpx;
    }
  }
  // 商品基本信息
  .goodsinfo {
    padding: 0 15rpx;
    box-sizing: border-box;
    .price {
      color: @main-color;
      font-size: 36rpx;
      padding: 40rpx 0;
    }
    .name-box {
      display: flex;
      .left {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        font-size: 32rpx;
        padding-right: 80rpx;
      }
      .right {
        width: 144rpx;
        text-align: center;
        border-left: 1rpx solid gray;
        font-size: 22rpx;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .iconfont {
          display: block;
          margin: 0 auto;
        }
      }
    }
    .express {
      padding: 35rpx 0;
      color: #ccc;
      font-size: 25rpx;
    }
  }
  // 底部的控制区域
  .control-box {
    display: flex;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 90rpx;
    background: #ccc;
    .item {
      flex: 2;
      text-align: center;
      font-size: 24rpx;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .iconfont {
        display: block;
        margin: 0 auto;
      }
    }
    button {
      flex: 3;
      height: 100%;
      color: white;
      border-radius: 0;
      border: none;
    }
    .cart {
      background-color: #f4b73f;
    }
    .buy {
      background-color: @main-color;
    }
  }
  // 选项区域
  .section {
    margin-bottom: 10rpx;
    padding-top: 10rpx;
    background-color: gray;
    .item {
      background-color: white;
      height: 100rpx;
      line-height: 100rpx;
      color: gray;
      font-size: 30rpx;
      span {
        color: black;
      }
      .iconfont {
        display: inline-block;
      }
    }
    .item.hot {
      color: @main-color;
    } // 微信小程序 并不支持 所有的选择器
    // &:first-of-type{
    //   background-color: hotpink;
    //   .item:first-child{
    //     color:@main-color;
    //   }
    // }
  }
  // 自己实现tab栏
  .tab-bar {
    display: flex;
    padding-top: 18rpx;
    background-color: gray;
    .bar-item {
      flex: 1;
      background: white;
      height: 100rpx;
      line-height: 100rpx;
      font-size: 22rpx;
      text-align: center;
      &.active {
        color: @main-color;
        border-bottom: 8rpx solid @main-color;
      }
    }
  }
  .tab-content {
    // 规格参数
    .content-item {
      padding-top: 10rpx;
      .row {
        padding: 0 10rpx;
        box-sizing: border-box;
        display: flex;
        .col {
          flex: 1;
          height: 88rpx;
          line-height: 88rpx;
          text-align: center;
          font-size: 22rpx;
          border: 1rpx solid gray; // 合并 高度方向上的 线段
          margin-top: -1rpx;
          &.col:last-child {
            // 合并宽度方向上的线段
            margin-left: -1rpx;
          }
        }
      }
    }
  }
</style>
