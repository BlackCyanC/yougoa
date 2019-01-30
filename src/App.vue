<script>
  export default {
    created() {
      // 调用API从本地缓存中获取数据
      const logs = wx.getStorageSync('logs') || []
      logs.unshift(Date.now())
      wx.setStorageSync('logs', logs)
      console.log('app created and cache logs by setStorageSync')
    }
  }
</script>

<style lang="less">
  @import "../static/icon/iconfont.css";
</style>

<style lang="less" scoped>
  .movie {
    scroll-view {
      width: 100%;
      overflow: hidden;
      white-space: nowrap;
      padding-top: 40rpx;
    }
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
</style>


