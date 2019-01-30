<template>
  <div class="search-container">
    <!-- 顶部的搜索盒子 -->
    <div class="search-box">
      <icon type="search" size="14"></icon>
      <input type="text" placeholder="请输入你想要的商品" @change="onChange" v-model.trim="inputValue">
      <button @click="goBack">取消</button>
    </div>
    <!-- 底部的容器 -->
    <div class="bottom">
      <div class="history-box" v-if="results.length===0">
        <div class="title-box">
          <span>历史搜索</span>
          <i class="iconfont icon-shanchu" @click="clear"></i>
        </div>
        <div class="items">
          <div class="item" v-for="(item, index) in itemList" :key="index">
            <div @click="addAndChange(index)">{{ item }}</div>
            <i class="iconfont icon-shanchu" @click="deleteOne(index)"></i>
          </div>
        </div>
      </div>
      <div class="result-box" v-else="results.length===0">
        <div class="filter-box">
          <div class="filter active">综合</div>
          <div class="filter">销量</div>
          <div class="filter" @click="sortWithPrice">价格
            <div class="arrow-box">
              <span>▲</span>
              <span>▼</span>
            </div>
          </div>
        </div>
        <!-- 商品盒子 -->
        <div class="goods-box">
          <div class="item" v-for="(item, index) in results" :key="item.goods_id">
            <div class="left">
              <img :src="item.goods_small_logo" alt>
            </div>
            <div class="right">
              <div class="top">{{item.goods_name}}</div>
              <div class="bottom">
                ¥
                <span>{{item.goods_price}}</span>.00
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  // 导入hxios
  import hxios from '../../utils/index.js';
  import {
    log
  } from 'util';
  import {
    setTimeout
  } from 'timers';
  export default {
    name: "search",
    data() {
      return {
        itemList: [],
        inputValue: "",
        results: [],
        sort: false
      }
    },
    methods: {
      async onChange() {
        console.log("change");
        // 判断是否为空
        if (this.inputValue) {
          // 是否已存在
          let index = this.itemList.findIndex(v => {
            return v === this.inputValue
          })
          // 存在删除
          if (index != -1) {
            this.itemList.splice(index, 1)
          }
          // 新添加到数组首位
          this.itemList.unshift(this.inputValue)
          let res = await hxios.get({
            url: `api/public/v1/goods/search?query=${this.inputValue}`
          })
          console.log(res);
          this.results = res.data.message.goods
        }
      },
      // 点击取消返回上一页
      goBack() {
        console.log("back");
        wx.navigateBack({
          delta: 1
        })
      },
      // 点击删除某一个
      deleteOne(i) {
        console.log("delete");
        this.itemList.splice(i, 1)
      },
      // 全清
      clear() {
        this.itemList = []
      },
      // 点击标签添加进输入框
      addAndChange(i) {
        let nowInputValue = this.itemList[i]
        this.itemList.splice(i, 1)
        this.itemList.unshift(nowInputValue)
        // 异步设置, why? 不知道
        setTimeout(async() => {
          this.inputValue = nowInputValue
          let res = await hxios.get({
            url: `api/public/v1/goods/search?query=${this.inputValue}`
          })
          console.log(res);
          this.results = res.data.message.goods
        }, 0)
      },
      // 点击价格按钮切换排序方式
      sortWithPrice() {
        this.sort = !this.sort
        this.results.sort(this.sortFuc('goods_price'))
      },
      sortFuc(refer, sort = this.sort) {
        return function(a, b) {
          let aValue = a[refer]
          let bValue = b[refer]
          if (sort) {
            return aValue - bValue
          } else {
            return bValue - aValue
          }
        }
      }
    },
    watch: {
      itemList() {
        console.log("watch");
        // 存入本地缓存
        wx.setStorage({
          key: 'itemList',
          data: this.itemList
        })
        this.inputValue = ''
      }
    },
    created() {
      wx.getStorage({
        key: 'itemList',
        success: (res) => {
          console.log(res.data)
          this.itemList = res.data
        },
        fail: () => {
          console.log("nothing");
          wx.setStorage({
            key: 'itemList',
            data: this.itemList
          });
        },
      })
    }
  };
</script>

<style lang="less">
  @main-color: #00bfbf;
  .search-box {
    display: flex;
    position: relative;
    padding: 30rpx 15rpx;
    background-color: #eeeeee !important;
    z-index: 999;
    icon {
      position: absolute;
      left: 35rpx;
      top: 50%;
      transform: translateY(-50%);
    }
    input {
      flex: 1;
      height: 60rpx;
      padding-left: 70rpx;
      margin-right: 20rpx;
      font-size: 25rpx;
      color: #aaa;
      background: white;
    }
    button {
      font-size: 28rpx;
      text-align: center;
      line-height: 60rpx;
      width: 160rpx;
      height: 60rpx;
      background-color: #eee;
      border-color: black;
      box-shadow: 0 0 10rpx cyan;
    }
  } // 历史记录
  .bottom {
    .history-box {
      padding: 30rpx 30rpx 0 15rpx;
      .title-box {
        display: flex;
        justify-content: space-between;
        span {
          font-size: 30rpx;
        }
        i {
          color: #ddd;
        }
      }
      .items {
        margin-top: 30rpx;
        display: flex;
        flex-wrap: wrap;
        .item {
          height: 65rpx;
          padding: 0 20rpx;
          line-height: 65rpx;
          background-color: #dddddd;
          font-size: 25rpx;
          margin-right: 30rpx;
          margin-bottom: 15rpx;
          position: relative;
          border-radius: 10rpx;
          i {
            position: absolute;
            top: 0;
            right: 0;
            transform: translate(50%, -50%);
          }
        }
      }
    }
  } // 搜索结果
  .result-box {
    .filter-box {
      display: flex;
      align-items: center;
      height: 100rpx;
      border-bottom: 1rpx solid gray;
      .filter {
        flex: 1;
        text-align: center;
        font-size: 30rpx;
        &.active {
          color: @main-color;
        }
        &:last-child {
          display: flex;
          align-items: center;
          justify-content: center;
          .arrow-box {
            span {
              display: block;
              transform: scaleY(0.6);
            }
          }
        }
      }
    } // 商品盒子
    .goods-box {
      padding-left: 20rpx;
      .item {
        display: flex;
        height: 260rpx;
        border-bottom: 1rpx solid #eee;
        padding: 30rpx 0;
        box-sizing: border-box;
        .left {
          margin-right: 20rpx;
          img {
            width: 200rpx;
            height: 200rpx;
            display: block;
          }
        }
        .right {
          padding-right: 30rpx;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .top {
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            font-size: 30rpx;
          }
          .bottom {
            color: @main-color;
            font-size: 22rpx;
            span {
              font-size: 32rpx;
            }
          }
        }
      }
    }
  } // 使用弹性布局约束 高度
  .search-container {
    position: relative;
    padding-top: 120rpx;
    .search-box {
      position: fixed;
      width: 100%;
      left: 0;
      top: 0;
      height: 60rpx;
    }
    .result-box {
      position: relative;
      padding-top: 100rpx;
      .filter-box {
        position: fixed;
        background: white;
        width: 100%;
        left: 0;
        top: 120rpx;
      }
    }
  }
</style>
