<template>
  <div>
      <div class="input">
        <input type="text" v-model="content" @confirm="toSearch" placeholder="让我看看这有什么~~" placeholder-class="placeholder"  confirm-type="完成" >
      </div>
      <div class="list">
        <ul>
          <li v-for="(item,index) in data" :key="index" @click="toComment(item)">
            <div class="ava_info" v-if="item.author">
              <img :src="item.author.avatar" alt="">
              <span>{{item.author.name}}:</span>
              <i>></i>
            </div>
            <div class="content_info">
              <p>
                {{item.summary}}
              </p>
            </div>
          </li>
        </ul>

        <div class="loading" v-if="loadingShow">
          <img v-if="!close" src="/static/images/loading.png" alt="">
          <span>{{close?"人家是有底线的~":"加载中"}}</span>
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
      content:"",
      data:[],
      num:0,
      loadingShow:false,
      close:false
    }
  },
  onReachBottom(){
    this.loadingShow=true;
    var that=this;
    if (this.num>18||this.close){
      console.log(2)
      this.close=true;
      setTimeout(()=>{
        that.loadingShow=false;
      },800)
      return ;
    }
    this.num+=10;
    fly.post("https://douban.uieee.com/v2/movie/subject/1295644/reviews?count=10&&start="+this.num)
      .then(function (response) {
        if (response.data.reviews.length===0){
          console.log(1)
          that.close=true;
          setTimeout(()=>{
            that.loadingShow=false;
          },800)
          return ;
        }
        that.data=that.data.concat(response.data.reviews);
        that.loadingShow=false;
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  ,
  methods: {
    toSearch(){
     if (this.content.trim()){
      //   wx.request({
      //     url:"https://douban.uieee.com/v2/movie/subject/34924541/reviews",
      //     method:"POST",
      //     success(res){
      //       console.log(res)
      //     }
      //   })
      //
      // VM247 asdebug.js:1 POST https://douban.uieee.com/v2/movie/subject/34924541/reviews 400 (Bad Request)
      // 一直报错也不知道为什么，豆瓣的搜索API又有问题，也不知道电影的具体id，所以只有发固定数据，
      //  得到固定数据进行展现
       this.close=false;
       this.num=0;
       var that=this;
       fly.post("https://douban.uieee.com/v2/movie/subject/1295644/reviews?count=10")
         .then(function (response) {
           that.data=response.data.reviews
         })
         .catch(function (error) {
           console.log(error);
         });
      }
    },
    toComment(item){
      wx.navigateTo({
        url:"/pages/comment/main?data="+JSON.stringify(item)
      })
    }
  }
}
</script>

<style>
  @-webkit-keyframes rotate{
    0%{
      -webkit-transform:rotate(0deg);
    }
    100%{
      -webkit-transform:rotate(360deg);
    }
  }
  .loading{
    width: 100%;
    height: 100rpx;
    /*background: red;*/
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .loading img{
    width: 50rpx;
    height: 50rpx;
    animation: 1.2s rotate infinite linear;
  }
  .loading span{
    color: #888888;
    padding-left: 10rpx;
    font-size: 28rpx;
  }
  .input{
    width: 100%;
    height: 100rpx;
  }
  .input input{
    width: 600rpx;
    padding:14rpx 0;
    font-size: 32rpx;
    margin: 0 auto;
    border-bottom: 1rpx solid black;

  }
  .placeholder{
    color: black;
    text-align: center;
  }
  .list ul {
    width: 90%;
    margin: 0 auto 10rpx;
  }
  .list li{
    width: 100%;
    margin-top: 10rpx;
  }
  .ava_info{
    width: 100%;
    height: 100rpx;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    position: relative;
  }
  .ava_info img{
    width: 70rpx;
    height: 70rpx;
    border-radius: 50%;
    border: 1rpx solid lightcoral;
  }
  .ava_info span{
    font-size: 32rpx;
    padding-left: 10rpx;
  }
  .ava_info i{
    font-size: 40rpx;
    position: absolute;
    right: 10rpx;
    color: lightcoral;
  }
  .content_info {
    border-bottom: 2rpx solid lightcoral;
  }
  .content_info p{
    padding: 10rpx;
    font-size: 28rpx;
  }

</style>
