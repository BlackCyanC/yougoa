<template>
  <div id="herodetail-container">
    <!-- 轮播图区域 -->
    <swiper indicator-dots autoplay circular indicator-color='rgba(255, 255, 255, .8)' indicator-active-color='#0ff'>
      <block v-for="(item, index) in currentHero.bgs" :key="index">
        <swiper-item>
          <image :src="item"></image>
        </swiper-item>
      </block>
    </swiper>
    <!-- 底部的内容 -->
    <view class="bottom">
      <view class="left">
        <text class="title">{{currentHero.title}}</text>
        <text class="name">{{currentHero.name}}</text>
        <view class='tags'>
          <text v-for="(item, i) in currentHero.tags" :key="i">{{item}}</text>
        </view>
        <!-- 技能 -->
        <view class="ability-box">
          <view>
            <text>生存能力</text>
            <progress border-radius='5' active stroke-width='10' activeColor='#f2c500' :percent="currentHero.Ability.life" />
          </view>
          <view>
            <text>物理攻击</text>
            <progress border-radius='5' active stroke-width='10' activeColor='#00ffff' :percent="currentHero.Ability.physical" />
          </view>
          <view>
            <text>魔法攻击</text>
            <progress border-radius='5' active stroke-width='10' activeColor='#f59d00' :percent="currentHero.Ability.magic" />
          </view>
          <view>
            <text>操作难度</text>
            <progress border-radius='5' active stroke-width='10' activeColor='#cb8cff' :percent="currentHero.Ability.difficulty" />
          </view>
        </view>
      </view>
      <view class="right">{{currentHero.story}}</view>
    </view>
  </div>
</template>

<script>
  import heroDetails from '../../../static/data/hero_details.js'
  export default {
    data() {
      return {
        heroDetails,
        currentHero: {}
      }
    },
    onLoad(options) {
      let id = options.id;
      this.getCurrentHero(id)
      console.log(this.currentHero)
    },
    methods: {
      getCurrentHero(id) {
        let info = this.heroDetails.filter(v => {
          return v.id === id
        })[0]
        this.currentHero = info
      },
    }
  }
</script>

<style scoped>
page {
  background-color: black;
  color: white;
}

swiper {
}

swiper swiper-item {
}

swiper swiper-item image {
  display: block;
  width: 100%;
}

/*  */

.bottom {
  display: flex;
}

.bottom .left {
  width: 200px;
  background-color: #3b4f5c;
  padding-left: 20px;
  /* 怪异盒模型  */
  box-sizing: border-box;
}

.bottom .left .title {
  margin-top: 20px;
  margin-bottom: 5px;
  font-weight: 900;
  display: block;
}

.bottom .left .name {
  font-weight: 900;
  font-size: 40px;
  display: block;
}

.bottom .left .tags {
  padding: 5px 0;
}

.bottom .left .tags >text {
  padding: 5px;
  font-size: 14px;
  background-color: #038a72;
  margin-right: 5px;
  border-radius: 3px;
}

.bottom .left .ability-box {
  padding-right: 10px;
}

.bottom .left .ability-box >view {
  display: flex;
  margin: 5px 0;
}

.bottom .left .ability-box >view>text {
  font-size: 14px;
  margin-right: 5px;
}

.bottom .left .ability-box >view>progress {
  flex: 1;
}

.bottom .right {
  flex: 1;
  font-size: 14px;
  padding: 5px;
}

</style>
