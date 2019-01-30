<template>
  <div id="herolist-container">
    <view class='ul'>
      <block v-for="(item, index) in heroList" :key="index">
        <view class='li'>
          <navigator class='a' :url="'/pages/herodetail/main?id='+ item.id">
            <image :src="item.iconUrl" class='image'></image>
            <text>{{ item.name }}</text>
          </navigator>
        </view>
      </block>
    </view>
  </div>
</template>

<script>
  import heroList from '../../../static/data/hero_list.js'
  export default {
    data() {
      return {
        heroList
      }
    }
  }
</script>

<style scoped>
  .ul {
    display: flex;
    flex-wrap: wrap;
  }
  .ul .li {
    width: 33.33%;
  }
  .ul .li .a {
    display: block;
  }
  .ul .li .a .image {
    display: block;
    margin: 10px auto;
    width: 100px;
    height: 100px;
  }
  .ul .li .a text {
    display: block;
    text-align: center;
  }
</style>
