<template>
  <div class="mime-container">
    <!-- 头部 -->
    <div class="header">
      <div class="icon-box">
        <i class="iconfont icon-shezhi"></i>
        <button open-type="getUserInfo" @getuserinfo="getUserInfo">
                    <img :src="icon" alt>
                  </button>
        <i class="iconfont icon-xiaoxi"></i>
      </div>
      <p>{{info}}</p>
    </div>
    <div class="body-box">
      <!-- 历史 -->
      <div class="history-box">
        <div class="item">
          <p>0</p>
          <p>收藏的店铺</p>
        </div>
        <div class="item">
          <p>0</p>
          <p>收藏的商品</p>
        </div>
        <div class="item">
          <p>0</p>
          <p>关注的商品</p>
        </div>
        <div class="item">
          <p>0</p>
          <p>我的足迹</p>
        </div>
      </div>
      <!-- 订单 -->
      <div class="order-box">
        <div class="title">我的订单</div>
        <div class="bottom">
          <div class="item">
            <i class="iconfont icon-daifukuan"></i> 待付款
          </div>
          <div class="item">
            <i class="iconfont icon-daishouhuo"></i> 待收货
          </div>
          <div class="item">
            <i class="iconfont icon-tuikuan"></i> 退款/退货
          </div>
          <div class="item" @click="toOrder">
            <i class="iconfont icon-dingdan"></i> 全部订单
          </div>
        </div>
      </div>
      <!-- 选项区域 -->
      <div class="option-box">
        <div class="option" @click="getAddress">
          <div class="left">收货地址管理</div>
          <div class="right">
            <i class="iconfont icon-jiantouyou"></i>
          </div>
        </div>
      </div>
      <div class="option-box">
        <div class="option" @click="callKF">
          <div class="left">联系我</div>
          <div class="right">176-8801-8176</div>
        </div>
        <div class="option">
          <div class="left">意见反馈</div>
          <div class="right">
            <i class="iconfont icon-jiantouyou"></i>
          </div>
        </div>
        <div class="option">
          <div class="left">关于我</div>
          <div class="right">
            <i class="iconfont icon-jiantouyou"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import hxios from '../../utils/index.js'
  export default {
    data() {
      return {
        icon: "/static/icon/icon.png",
        info: "登录/注册"
      };
    },
    // 方法
    methods: {
      getUserInfo(event) {
        this.icon = event.mp.detail.userInfo.avatarUrl;
        this.info = event.mp.detail.userInfo.nickName;
        wx.login({
          success: loginRes => {
            console.log(loginRes.code)
            wx.getUserInfo({
              withCredentials: true,
              success: res => {
                console.log("获取用户私密信息");
                console.log(res);
                hxios.post({
                  url: "api/public/v1/users/wxlogin",
                  data: {
                    code: loginRes.code,
                    encryptedData: res.encryptedData,
                    iv: res.iv,
                    rawData: res.rawData,
                    signature: res.signature
                  },
                }).then(res => {
                  console.log(res);
                  wx.setStorage({
                    key: 'token',
                    data: res.token || 'BlackCyan'
                  });
                })
              },
              fail: (err) => {
                throw err
              },
            });
          },
          fail: (err) => {
            throw err
          },
        });
      },
      // 地址获取
      getAddress() {
        wx.chooseAddress({
          success(res) {
            console.log(res.userName);
            console.log(res.postalCode);
            console.log(res.provinceName);
            console.log(res.cityName);
            console.log(res.countyName);
            console.log(res.detailInfo);
            console.log(res.nationalCode);
            console.log(res.telNumber);
          }
        });
      },
      // 打电话给客服
      callKF() {
        console.log(1);
        wx.makePhoneCall({
          phoneNumber: "17688018176"
        });
      },
      // 订单页
      toOrder() {
        wx.navigateTo({
          url: '/pages/order/main'
        });
      }
    }
  };
</script>

<style lang="less">
  @main-color: #00bfbf;
  page {
    background-color: skyblue;
  }
  .header {
    height: 430rpx;
    background-color: @main-color;
    padding-top: 120rpx;
    box-sizing: border-box;
    .icon-box {
      display: flex;
      align-items: center;
      justify-content: center;
      .iconfont {
        color: white;
      }
      button {
        margin: 0 65rpx;
        width: 130rpx;
        border-radius: 50%;
        height: 130rpx;
        overflow: hidden;
        border: 5rpx solid white;
        padding: 0;
        img {
          width: 130rpx;
          height: 130rpx;
        }
      }
    }
    p {
      text-align: center;
      margin-top: 20rpx;
      color: white;
      font-size: 28rpx;
    }
  }
  .body-box {
    transform: translateY(-26rpx);
    padding: 0 20rpx;
    >div {
      background-color: white;
    }
    .history-box {
      height: 120rpx;
      display: flex;
      align-items: center;
      text-align: center;
      color: #aaa;
      font-size: 22rpx;
      .item {
        flex: 1;
      }
    }
    .order-box {
      margin-top: 20rpx;
      .title {
        height: 90rpx;
        border-bottom: 1rpx solid #aaa;
        line-height: 90rpx;
        padding-left: 30rpx;
        font-size: 30rpx;
      }
      .bottom {
        display: flex;
        align-items: center;
        text-align: center;
        height: 130rpx;
        .item {
          flex: 1;
          font-size: 24rpx;
          i {
            color: @main-color;
            font-size: 60rpx;
            margin-bottom: 10rpx;
          }
        }
      }
    } // 选项区域
    .option-box {
      margin-top: 20rpx;
      padding-left: 30rpx;
      .option {
        height: 84rpx;
        font-size: 28rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-right: 30rpx;
        border-bottom: 1rpx solid #aaa;
        &:last-child {
          border-bottom: none;
        }
      }
    }
  }
</style>
