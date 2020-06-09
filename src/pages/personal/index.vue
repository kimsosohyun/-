<template>
  <div>
    <div class="login">
      <img :src="userInfo.avatarUrl?userInfo.avatarUrl:'/static/images/44.jpg'" alt="">
      <button open-type="getUserInfo" @getuserinfo="getU">{{userInfo.nickName?userInfo.nickName:"登录"}}</button>
    </div>
  </div>
</template>

<script>

export default {
  data(){
    return {
      userInfo:{}
    }
  },
  mounted(){
    var that=this;
    wx.getUserInfo({
      success (res) {
        that.userInfo=res.userInfo;
      },
      fail(rej){
        console.log(rej)
      }
    })
  },
  methods:{
    getU(res){
      if (res.mp.detail.userInfo){
        this.userInfo=res.mp.detail.userInfo;
      }

    },
  }
}
</script>

<style>
  .login{
    background: rgba(0,0,0,1);
    width: 100%;
    height: 380rpx;
    text-align: center;
  }
  .login img{
    margin: 20rpx 0;
    width: 160rpx;
    height: 160rpx;
    border-radius: 50%;
    border: 6rpx solid pink;
  }
  .login button {
    width: 80%;
    margin: 0 auto;
    height: 80rpx;
    line-height: 80rpx;
    margin-top: 10rpx;
    background: pink;
    font-size: 32rpx;
  }
</style>
