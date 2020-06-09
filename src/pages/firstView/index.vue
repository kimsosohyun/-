<template>
  <div>
    <Swiper :indicator-dots="index!==3" @change="change" indicator-color="purple" indicator-active-color="pink">
      <swiper-item>
        <img  src="../../../static/images/22.jpg" alt="">
      </swiper-item>
      <swiper-item>
        <img src="../../../static/images/11.jpg" alt="">
      </swiper-item>
      <swiper-item>
        <img src="../../../static/images/33.jpg" alt="">
      </swiper-item>
      <swiper-item>
        <img src="../../../static/images/44.jpg" alt="">
      </swiper-item>
    </Swiper>

    <button @click="toIndex" v-show="index===3">立即开始</button>

  </div>
</template>

<script>

export default {
  data(){
    return {
      index:-1
    }
  },
  methods:{
    change(el){
      this.index=el.mp.detail.current;
    },
    toIndex(){
      wx.switchTab(  //跳转到 tabBar 页面
        //navigateTo 保留当前页面，跳转到应用内的某个页面。但是不能跳到 tabbar 页面。
        {
          url:"/pages/index/main"
        }
      )
    }
  }
}
</script>

<style>
  view{
    width: 100%;
    height: 100%;
  }
  swiper {
    width: 100%;
    height: 100%;
  }
  swiper_item{
    width: 100%;
    height: 100%;
  }
  img{
    width: 100%;
    height: 100%;
  }
  button{
    position: absolute;
    bottom:20rpx;
    width: 220rpx;
    left: 50%;
    margin-left: -110rpx;
    background: rgba(255,255,255,0.5);
    color: purple;
  }
</style>
