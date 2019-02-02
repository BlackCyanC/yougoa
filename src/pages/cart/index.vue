<template>
  <div>
    <!-- 空的购物车 -->
    <div class="empty" v-show="isEmpty==true">
      <i class='iconfont icon-gouwuche'></i>
      <p>你还没有添加任何商品</p>
      <p>Token常驻, 故只需一次登录验证</p>
    </div>
    <!-- 非空的购物车 -->
    <div class="full" v-show="isEmpty==false">
      <!-- 地址区域 -->
      <div @click="chooseAddress" class="address-box">
        <div class="item">
          <div class="left">收货人:{{userName}}</div>
          <div class="right">{{mobile}} <i class='iconfont icon-jiantouyou'></i></div>
        </div>
        <div class="item">
          <div class="left">收货地址:{{address}}</div>
        </div>
        <div class="bottom-line"></div>
      </div>
      <!-- 商品区域 -->
      <div class="goods-box">
        <div class="title">
          <i class='iconfont icon-dianpu'>优购生活馆</i>
        </div>
        <scroll-view scroll-y scroll-with-animation class="scroll-box">
          <div class="items">
            <div class="item" v-for="(item, index) in cartDetailData" :key="item.goods_id" @touchstart='touchstart' @touchend='touchend' @touchmove="touchmove" :data-index="index">
              <div class="left">
                <!-- 双向数据绑定 -->
                <input type="radio" :checked="item.isSelected" @click="item.isSelected=!item.isSelected">
              </div>
              <div class="right">
                <div class="sub-left">
                  <img :src="item.goods_small_logo" alt="">
                </div>
                <div class="sub-right">
                  <div class="goods-title">{{item.goods_name}}</div>
                  <div class="sub-right-bottom">
                    <div class="price">¥{{item.goods_price}}</div>
                    <div class="num-box">
                      <span @click="item.buyCount==1?item.buyCount=1:item.buyCount--">-</span>
                      <span>{{item.buyCount}}</span>
                      <span @click="item.buyCount++">+</span>
                    </div>
                  </div>
                </div>
              </div>
              <div v-show="item.isShowDel" class="del-box" @click="delOne(index)">
                <i class='iconfont icon-shanchu'></i>
              </div>
            </div>
          </div>
        </scroll-view>
      </div>
      <!-- 底部的控制器区域 -->
      <div class="control-box">
        <div class="left">
          <input type="radio" @click='checkAll' :checked="isSelectedAll"> 全选
        </div>
        <div class="right">
          <div class="price-box">
            <div class="top">合计:<span>{{totalPrice}}</span></div>
            <div class="bottom">包含运费</div>
          </div>
          <button @click="payOrder">结算({{totalCount}})</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import cart from "../../utils/cart";
  import hxios from "../../utils/index";
  export default {
    data: function() {
      return {
        // 购物车是否为空
        isEmpty: true,
        // 购物车的商品数据
        cartData: {},
        // 地址数据
        address: {},
        // 用户名
        userName: "",
        // 地址
        address: "",
        // 电话
        mobile: "",
        // 购物车商品详细数据
        cartDetailData: [],
        // 是否全选
        isSelectedAll: true,
        // 起始坐标
        startX: 0,
        // 结束坐标
        endX: 0
      };
    },
    // 事件
    methods: {
      chooseAddress() {
        // 调用微信的api获取地址即可
        wx.chooseAddress({
          success: res => {
            // 用户名
            // console.log(res.userName);
            this.userName = res.userName;
            // 邮编
            // console.log(res.postalCode);
            // 省市区
            // console.log(res.provinceName);
            // console.log(res.cityName);
            // console.log(res.countyName);
            // 详细地址
            // console.log(res.detailInfo);
            this.address =
              res.provinceName + res.cityName + res.countyName + res.detailInfo;
            // console.log(res.nationalCode);
            // console.log(res.telNumber);
            this.mobile = res.telNumber;
            // 使用工具函数缓存地址
            cart.saveAddress(res).then(res => {
              console.log(res);
            });
          }
        });
      },
      // 全部选中
      checkAll(event) {
        console.log("点击了");
        console.log(event);
        // 取反全选的状态即可
        this.isSelectedAll = !this.isSelectedAll;
        // 把上面的所有选项的选中状态 变得跟自己一样
        this.cartDetailData.forEach(v => {
          v.isSelected = this.isSelectedAll;
        });
      },
      // 滑动开始
      touchstart(event) {
        // console.log("触摸开始");
        // console.log(event);
        // 记录起始的坐标
        this.startX = this.endX = event.clientX;
      },
      // 滑动中
      touchmove(event) {
        // console.log('滑动中');
        // console.log(event);
        // 保存移动的坐标
        this.endX = event.clientX;
      },
      // 滑动结束
      // touchend中无法获取停止的坐标
      touchend(event) {
        // console.log("触摸结束");
        // console.log(event);
        // 根据起始坐标 跟结束的坐标 的差值判断移动的方向
        // console.log(this.endX - this.startX);
        let moveX = this.endX - this.startX;
        this.endX = 0;
        this.startX = 0;
        // 获取显示的索引值
        let index = event.currentTarget.dataset.index;
        console.log(moveX);
        if (moveX < 0) {
          // console.log('左滑');
          this.cartDetailData[index].isShowDel = true;
        } else {
          // console.log("右滑");
          this.cartDetailData[index].isShowDel = false;
        }
      },
      // 删除某一条数据
      delOne(index) {
        // console.log(index);
        // 删除数据
        this.cartDetailData.splice(index, 1);
        // 同步保存到缓存中
        cart.updateCartData(this.cartDetailData);
        console.log(this.cartDetailData.length);
        if (this.cartDetailData.length === 0) {
          this.isEmpty = true
        }
      },
      // 提交订单
      payOrder() {
        wx.getStorage({
          key: 'token',
          success: async tokenRes => {
            // 如果有 token 发起提交订单
            console.log(tokenRes);
            let goods = []
            this.cartDetailData.forEach(v => {
              if (this.cartDetailData.isSelected == true) {
                goods.push({
                  goods_id: v.goods_id,
                  goods_number: v.buyCount,
                  goods_price: v.goods_price
                })
              }
            })
            // 提交订单信息
            let orderRes = await hxios.post({
              url: "api/public/v1/my/orders/create",
              header: {
                "Authorization": tokenRes.data
              },
              data: {
                order_price: this.totalPrice,
                consignee_addr: this.address,
                goods
              }
            })
            console.log("提交订单");
            console.log(orderRes);
            this.cartDetailData = this.cartDetailData.filter(v => {
              return v.isSelected === false
            })
            // 生成交易订单
            let payRes = await hxios.post({
              url: "api/public/v1/my/orders/req_unifiedorder",
              data: {
                order_number: orderRes.data.message.order_number
              },
              header: {
                Authorization: tokenRes.data
              }
            })
            console.log("生成交易订单");
            console.log(payRes);
            // 调用微信接口生成支付二维码
            wx.requestPayment({
              timeStamp: payRes.data.message.wxorder.timeStamp, //时间戳从1970年1月1日00:00:00至今的秒数,即当前的时间,
              nonceStr: payRes.data.message.wxorder.nonceStr, //随机字符串，长度为32个字符以下,
              package: payRes.data.message.wxorder.package, //统一下单接口返回的 prepay_id 参数值，提交格式如：prepay_id=*,
              signType: payRes.data.message.wxorder.signType, //签名算法，暂支持 MD5,
              paySign: payRes.data.message.wxorder.paySign, //签名,具体签名方案参见小程序支付接口文档,
              success: res => {
                console.log(res);
                wx.showToast({
                  title: "支付成功", //提示的内容,
                  icon: "success", //图标,
                  duration: 2000, //延迟时间,
                  mask: true, //显示透明蒙层，防止触摸穿透,
                  success: res => {}
                });
              },
              fail: () => {
                console.log("失败啦");
              },
              complete: () => {}
            });
            if (payRes.data.meta.status == 401) {
              console.log("弹框");
              wx.showModal({
                title: "提示", //提示的标题,
                content: res.data.meta.msg, //提示的内容,
                showCancel: true, //是否显示取消按钮,
                cancelText: "取消", //取消按钮的文字，默认为取消，最多 4 个字符,
                cancelColor: "#000000", //取消按钮的文字颜色,
                confirmText: "确定", //确定按钮的文字，默认为取消，最多 4 个字符,
                confirmColor: "#3CC51F", //确定按钮的文字颜色,
                success: res => {
                  if (res.confirm) {
                    // console.log('用户点击确定')
                    wx.switchTab({
                      url: "/pages/mine/main"
                    });
                  } else if (res.cancel) {
                    // console.log('用户点击取消')
                  }
                }
              });
            }
          },
          fail: () => {
            wx.showModal({
              title: '提示', //提示的标题,
              content: '请先登录后下单', //提示的内容,
              showCancel: true, //是否显示取消按钮,
              cancelText: '取消', //取消按钮的文字，默认为取消，最多 4 个字符,
              cancelColor: '#000000', //取消按钮的文字颜色,
              confirmText: '确定', //确定按钮的文字，默认为取消，最多 4 个字符,
              confirmColor: '#3CC51F', //确定按钮的文字颜色,
              success: res => {
                if (res.confirm) {
                  wx.switchTab({
                    url: '/pages/mine/main'
                  });
                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
              }
            });
          },
          complete: () => {}
        })
      }
    },
    // 计算属性
    computed: {
      // isSelectedAll() {
      //   // 选中的个数 跟总个数的比较
      //   let num = 0;
      //   this.cartDetailData.forEach(v => {
      //     if (v.isSelected == true) {
      //       num++;
      //     }
      //   });
      //   return this.cartDetailData.length == num;
      // },
      // 总价
      totalPrice() {
        let num = 0;
        this.cartDetailData.forEach(v => {
          if (v.isSelected == true) {
            num += v.buyCount * v.goods_price;
          }
        });
        return num;
      },
      // 总数
      totalCount() {
        let num = 0;
        this.cartDetailData.forEach(v => {
          if (v.isSelected == true) {
            num += v.buyCount;
          }
        });
        return num;
      }
    },
    // 侦听器
    watch: {
      cartDetailData: {
        // 引用类型的数据 val 和 oldVal都是一个值
        handler: function(val, oldVal) {
          // 传递给购物车函数
          cart.updateCartData(this.cartDetailData);
          if (val.length === 0) {
            this.isEmpty = true
          }
        },
        // 深度监听
        deep: true
      }
    },
    // 页面打开时 获取购物车数据
    onShow() {
      console.log("购物车页面显示啦");
      // 获取购物车数据
      cart
        .getCartData()
        .then(res => {
          //   console.log(res);
          // 数据在 res.data
          this.cartData = res.data;
          // 在这里才有商品数据
          // 获取 购物车详细数据
          // 生成 id 用来获取详细信息
          let ids = "";
          // for (const key in this.cartData) {
          //   ids += key;
          //   ids += ",";
          // }
          // // 去掉最后一个,
          // ids = ids.slice(0, ids.length - 1);
          ids = Object.keys(this.cartData)
          console.log(ids);
          hxios
            .get({
              url: `api/public/v1/goods/goodslist?goods_ids=${ids}`
            })
            .then(res => {
              // console.log(res);
              // 自己设置购买的个数
              res.data.message.forEach(v => {
                // 购买个数
                v.buyCount = this.cartData[v.goods_id];
                // 是否选中
                v.isSelected = true;
                // 否显示删除按钮
                v.isShowDel = false;
              });
              this.cartDetailData = res.data.message;
              // 如果有数据 说明购物车不是空的
              this.isEmpty = false;
            });
        })
        .catch(res => {
          // console.log(res);
          // 如果能够到这里 说明购物车是空的
          this.isEmpty = true;
        });
      // 获取收货地址数据
      cart.getAddress().then(res => {
        // console.log(res);
        // 设置到页面上
        this.userName = res.userName;
        this.address =
          res.provinceName + res.cityName + res.countyName + res.detailInfo;
        this.mobile = res.telNumber;
      });
    }
  };
</script>

<style lang="less">
  @main-color: #00bfbf;
  .empty {
    height: 100%;
    text-align: center;
    padding-top: 100rpx;
    .iconfont {
      font-size: 100rpx;
      padding: 20rpx;
      background-color: @main-color;
      color: yellow;
      display: block;
      width: 180rpx;
      height: 180rpx;
      line-height: 180rpx;
      border-radius: 50%;
      margin: 0 auto;
    }
    p {
      font-size: 28rpx;
      margin-top: 50rpx;
    }
  } // 有内容的盒子
  .full {
    .address-box {
      .item {
        height: 102rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-left: 16rpx;
        padding-right: 36rpx;
        font-size: 32rpx;
        .left {}
        .right {
          .iconfont {
            display: inline-block;
          }
        }
      }
      .bottom-line {
        height: 14rpx; // 使用背景平铺 实现线型效果
        background-repeat: repeat-x; // 背景大小
        background-size: 150rpx 14rpx; // 线型渐变
        // 颜色  蓝色(22.5%) 白色(22.5-27.5) 红色(27.5-72.5) 白色(72.5-77.5) 蓝色(77.5-100%)  合一起 100%
        // 第一个颜色  从0开始 到多少为止
        // 中间的颜色 第一次出现 从多少开始
        // 中间的颜色 第二次出现 到多少结束
        // 最后一个颜色 从多少开始 到 100%
        // 如果这种写法较为复杂 可以使用图片来实现
        background-image: linear-gradient( -45deg, blue 22.5%, white 22.5%, white 27.5%, red 27.5%, red 72.5%, white 72.5%, white 77.5%, blue 77.5%);
      }
    } // 商品盒子
    .goods-box {
      .title {
        height: 86rpx;
        padding-left: 32rpx;
        line-height: 86rpx;
        font-size: 28rpx;
        border-bottom: 1px solid gray;
        .iconfont {}
      }
      .item {
        display: flex;
        height: 210rpx;
        position: relative;
        .left {
          width: 90rpx;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .right {
          flex: 1;
          border-bottom: 1rpx solid gray;
          display: flex;
          .sub-left {
            padding: 25rpx;
            img {
              display: block;
              width: 160rpx;
              height: 160rpx;
            }
          }
          .sub-right {
            padding: 25rpx 0;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .goods-title {
              font-size: 28rpx;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
            }
            .sub-right-bottom {
              display: flex;
              justify-content: space-between;
              align-items: flex-end;
              vertical-align: bottom;
              font-size: 28rpx;
              line-height: 28rpx;
              transform: translateY(10rpx);
              .price {
                color: @main-color;
              }
              .num-box {
                span {
                  width: 60rpx;
                  height: 50rpx;
                  border: 2rpx solid #000;
                  text-align: center;
                  line-height: 50rpx;
                  font-size: 30rpx;
                  display: inline-block;
                }
                span:nth-child(2) {
                  // 透明的意思
                  border-color: transparent;
                }
              }
            }
          }
        } // 脱标
        .del-box {
          position: absolute;
          width: 200rpx;
          height: 100%;
          right: 0;
          top: 0;
          opacity: 0.5;
          .iconfont {
            display: block;
            width: 100%;
            height: 100%;
            text-align: center;
            line-height: 210rpx;
            font-size: 40rpx;
            color: white;
            background-color: @main-color;
          }
        }
      }
    }
  } // 底部的控制器区域
  .control-box {
    position: fixed;
    width: 100%;
    padding-left: 30rpx;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    left: 0;
    bottom: 0;
    background-color: white;
    .left {
      input {
        margin-right: 30rpx;
      }
    }
    .right {
      display: flex;
      .price-box {
        font-size: 30rpx;
        margin-right: 20rpx;
        padding-top: 20rpx;
        .top {
          span {
            color: @main-color;
            &:before {
              content: "¥";
              font-size: 20rpx;
            }
          }
        }
        .bottom {
          color: gray;
          font-size: 20rpx;
        }
      }
      button {
        height: 100rpx;
        width: 230rpx;
        color: white;
        background-color: @main-color;
        text-align: center;
        line-height: 100rpx;
        font-size: 30rpx;
      }
    }
  }
  .address-box {
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
  .goods-box {
    position: absolute;
    top: 218rpx;
    left: 0;
    .title {
      position: absolute;
      top: 0;
      width: 100%;
      height: 88rpx;
      z-index: 99;
      background-color: white;
    }
    .items {
      position: relative;
      box-sizing: border-box;
      padding-bottom: 100rpx;
      top: 88rpx;
      height: 800rpx;
    }
  }
   ::-webkit-scrollbar {
    width: 0;
    height: 0;
    color: transparent;
  }
</style>
