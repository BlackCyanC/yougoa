<template>

  <div id='order-container'>
    <h1>权限有限, 支付功能无法正常运行</h1>

    <!-- tab-bar -->
    <div class="tab-bar">
      <div class="item" :class="{active:selectedIndex==0}" @click="selectedIndex=0">全部</div>
      <div class="item" :class="{active:selectedIndex==1}" @click="selectedIndex=1">待付款</div>
      <div class="item" :class="{active:selectedIndex==2}" @click="selectedIndex=2">已付款</div>
      <div class="item" :class="{active:selectedIndex==3}" @click="selectedIndex=3">退款/退货</div>
    </div>
    <!-- tab-content -->
    <div class="tab-content">
      <div class="item" v-show="selectedIndex==0">
        <div class="section" v-for="(item, index) in orderList" :key="item.order_id">
          <div class="goods-item" v-for="(it, i) in item.goods" :key="it.goods_id">
            <div class="left">
              <img :src="it.goods_small_logo" alt="">
            </div>
            <div class="right">
              <div class="title">{{it.goods_name}}</div>
              <div class="bottom">
                <div class="price">{{it.goods_price}}</div>
                <span>x{{it.goods_number}}</span>
              </div>
            </div>
          </div>
          <!-- 总价盒子 -->
          <div class="total-price">
            共{{item.total_count}}商品 总计: ¥{{item.total_price}}(含运费0.00)
          </div>
          <!-- 订单号盒子 -->
          <div class="order-num">
            <div class="left">订单号:{{item.order_number}}</div>
            <button>支付</button>
          </div>
        </div>
      </div>
      <div class="item" v-show="selectedIndex==1">
        <div class="section" v-for="(item, index) in noPayOrderList" :key="item.order_id">
          <div class="goods-item" v-for="(it, i) in item.goods" :key="it.goods_id">
            <div class="left">
              <img :src="it.goods_small_logo" alt="">
            </div>
            <div class="right">
              <div class="title">{{it.goods_name}}</div>
              <div class="bottom">
                <div class="price">{{it.goods_price}}</div>
                <span>x{{it.goods_number}}</span>
              </div>
            </div>
          </div>
          <!-- 总价盒子 -->
          <div class="total-price">
            共{{item.total_count}}商品 总计: ¥{{item.total_price}}(含运费0.00)
          </div>
          <!-- 订单号盒子 -->
          <div class="order-num">
            <div class="left">订单号:{{item.order_number}}</div>
            <button @click='payOrder(item.order_number)'>支付</button>
          </div>
        </div>
      </div>
      <div class="item" v-show="selectedIndex==2">3</div>
      <div class="item" v-show="selectedIndex==3">4</div>
    </div>
  </div>
</template>

<script>
  // 导入hxios
  import hxios from "../../utils/index";
  export default {
    data: function() {
      return {
        // 选中的索引
        selectedIndex: 0,
        // 保存订单列表数据
        orderList: [],
        // 待付款订单
        noPayOrderList: [],
        // token
        token: ""
      };
    },
    methods: {
      payOrder(order_number) {
        hxios
          .post({
            url: "api/public/v1/my/orders/req_unifiedorder",
            data: {
              order_number
            },
            header: {
              Authorization: this.token
            }
          })
          .then(res => {
            // console.log(res);
            // 发起微信支付了
            wx.requestPayment({
              timeStamp: res.data.message.wxorder.timeStamp, //时间戳从1970年1月1日00:00:00至今的秒数,即当前的时间,
              nonceStr: res.data.message.wxorder.nonceStr, //随机字符串，长度为32个字符以下,
              package: res.data.message.wxorder.package, //统一下单接口返回的 prepay_id 参数值，提交格式如：prepay_id=*,
              signType: res.data.message.wxorder.signType, //签名算法，暂支持 MD5,
              paySign: res.data.message.wxorder.paySign, //签名,具体签名方案参见小程序支付接口文档,
              success: res => {
                // console.log(res);
                wx.showToast({
                  title: "支付成功", //提示的内容,
                  icon: "success", //图标,
                  duration: 2000, //延迟时间,
                  mask: true, //显示透明蒙层，防止触摸穿透,
                  success: res => {}
                });
              },
              fail: () => {},
              complete: () => {}
            });
          });
      }
    },
    // 这个方法 在小程序完成创建之后 就已经执行了
    // 而我们的需求是 进入到 订单页 再去进行判断
    onShow() {
      // 获取缓存的token
      wx.getStorage({
        key: "token",
        success: res => {
          // 这里保存的就是token
          console.log(res.data);
          let token = res.data;
          this.token = token;
          // 成功之后才有token
          hxios
            .get({
              url: "api/public/v1/my/orders/all?type=1",
              header: {
                Authorization: token
              }
            })
            .then(res => {
              console.log(res);
              this.orderList = res.data.message.orders;
              // 获取未支付的订单
              return hxios.get({
                url: "api/public/v1/my/orders/all?type=2",
                header: {
                  Authorization: token
                }
              });
            })
            .then(res => {
              console.log(res);
              this.noPayOrderList = res.data.message.orders;
            });
        },
        fail: () => {
          // 说明用户没有登录
          // 提示用户
          wx.showToast({
            title: "还没登录呢", //提示的内容,
            icon: "none", //图标,
            duration: 2000, //延迟时间,
            mask: true, //显示透明蒙层，防止触摸穿透,
            success: res => {
              // console.log(res);
              // 切换到 个人页
              setTimeout(() => {
                wx.switchTab({
                  url: "/pages/my/main"
                });
              }, 500);
            }
          });
          // 打会 个人中心页
        },
        complete: () => {}
      });
    }
  };
</script>

<style lang="less">
  @main-color: #00bfbf;
  #order-container {
    .tab-bar {
      height: 100rpx;
      display: flex;
      text-align: center;
      align-items: center;
      .item {
        flex: 1;
        font-size: 30rpx;
        height: 100%;
        box-sizing: border-box;
        line-height: 100rpx;
        &.active {
          color: @main-color;
          border-bottom: 10rpx solid @main-color;
        }
      }
    }
    .tab-content {
      padding-top: 30rpx;
      background-color: #ccc;
      .item {}
    }
  } // 订单区域的布局
  .section {
    padding-left: 16rpx;
    box-sizing: border-box;
    margin-bottom: 30rpx;
    background-color: white;
    .goods-item {
      display: flex;
      height: 230rpx;
      padding: 30rpx 0;
      align-items: center;
      box-sizing: border-box;
      border-bottom: 1rpx solid gray;
      .left {
        margin-right: 20rpx;
        img {
          width: 180rpx;
          height: 160rpx;
          display: block;
        }
      }
      .right {
        flex: 1;
        height: 100%;
        padding-right: 20rpx;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .title {
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }
        .bottom {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          .price {
            color: @main-color;
          }
          .price::before {
            content: "¥";
            color: @main-color;
            font-size: 20rpx;
          }
          span {
            font-size: 20rpx;
          }
        }
      }
    } // 总价
    .total-price {
      text-align: right;
      line-height: 90rpx;
      height: 90rpx;
      font-size: 24rpx;
      color: #ccc;
      padding-right: 30rpx;
    } // 订单号
    .order-num {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 24rpx;
      color: #ccc;
      border-top: 1rpx solid gray;
      height: 90rpx;
      .left {}
      button {
        width: 160rpx;
        height: 60rpx;
        color: @main-color;
        text-align: center;
        line-height: 60rpx;
      }
    }
  }
</style>
