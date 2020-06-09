<template>
  <div>
    <Swiper v-if="now.length" id="swiper" indicator-dots  indicator-color="purple" indicator-active-color="pink">
      <swiper-item>
        <img :src="now[0].images.small" alt="">
      </swiper-item>
      <swiper-item>
        <img :src="now[1].images.small" alt="">
      </swiper-item>
      <swiper-item>
        <img :src="now[2].images.small" alt="">
      </swiper-item>
    </Swiper>

    <div class="list">
      <div class="item_l">
        <div class="list_title">
          <h2>正在热映</h2>
        </div>
        <ul class="list_main">
          <li v-for="(item,index) in now" :key="index" @click="toDetails(item.id)">
            <img :src="item.images.medium" alt="">
            <p>{{item.title}}</p>
            <p>评分：{{item.rating.average}}</p>
          </li>
        </ul>
      </div>
      <div class="item_l">
        <div class="list_title">
          <h2>电影TOP20</h2>
        </div>
        <ul class="list_main">
          <li v-for="(item,index) in top20" :key="index" @click="toDetails(item.id)">
            <img :src="item.images.medium" alt="">
            <p>{{item.title}}</p>
            <p>评分：{{item.rating.average}}</p>
          </li>
        </ul>
      </div>

    </div>
  </div>
</template>

<script>
  var Fly=require("flyio/dist/npm/wx")
  var fly=new Fly
export default {
  data(){
    return {
      now:[],
      top20:[]
    }
  },
  methods:{
    toDetails(id){
      wx.navigateTo({
          url:"/pages/details/main?id="+id
      })
    }
  },
 mounted() {

   var that=this;
   fly.post("https://douban.uieee.com/v2/movie/in_theaters")
     .then(function (response) {
       that.now=response.data.subjects;
       console.log(that.now)
     })
     .catch(function (error) {
       console.log(error);
     });

   fly.post("https://douban.uieee.com/v2/movie/top250")
     .then(function (response) {
       that.top20=response.data.subjects;
     })
     .catch(function (error) {
       console.log(error);
     });
 }
}
</script>

<style>
  #swiper {
    width: 100%;
    height: 360rpx;
  }
  #swiper swiper_item{
    width: 100%;
    height: 100%;
  }
  #swiper img{
    width: 100%;
    height: 100%;
  }
  .list{
    width: 100%;
  }
  .list_title{
    width: 100%;
  }
  .list h2{
    height: 60rpx;
    line-height: 60rpx;
    font-size: 30rpx;
    padding-left: 10rpx;
    border-bottom: 1rpx solid #ddd;
  }
  .list ul {
    display: flex;
    flex-wrap:wrap;
  }
  .list_main li{
    border-bottom: 1rpx solid #ddd;
    background: rgba(245,245,245,0.5);
    width: 50%;
    height: 340rpx;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    /*设置主轴的方向为竖直，使得内容竖直排列*/
    box-sizing: border-box;
    align-items: center;
    /*侧轴方向上即水平方向上按照居中的形式排列*/
  }
  .list_main li:nth-of-type(2n+1){
    border-right: 1rpx solid #ddd;
  }
  .list_main li img{
    margin-top: 30rpx;
    border: 1rpx solid black;
    width: 200rpx;
    height: 200rpx;
    border-radius: 10rpx;
  }
  .list_main li p{
    font-size: 32rpx;
    line-height: 50rpx;
    max-width: 100%;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap
  }
</style>
