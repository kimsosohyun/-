<template>
    <div id="comment">
      <div class="title">
        <h1>{{data.title}}</h1>
        <div class="ava_info" v-if="data.author">
          <img :src="data.author.avatar" alt="">
          <span>{{data.author.name}}</span>
          <i>:</i>
        </div>
      </div>

      <div class="Spoiler">
        <p>这篇影评可能有剧透</p>
      </div>

      <div class="list">
        <p>
          {{data.content}}
        </p>
        <i>{{data.created_at}}</i>
      </div>

      <div class="btns">
        <button  @click="add" :class="{active_btn:add_click}">有用:{{data.useful_count}}</button>
        <button  @click="dec" :class="{active_btn:dec_click}">无用:{{data.useless_count}}</button>
      </div>
    </div>
</template>

<script>
  export default {
    name: 'index',
    data(){
      return {
        data:{
        },
        add_click:false,
        dec_click:false

      }
    },
    mounted(){
      this.data=JSON.parse(this.$mp.query.data);
      var that=this;
      wx.getStorage({
        key: this.data.id,
        success (res) {
          if (res.data==1){
            that.add_click=true;
            that.dec_click=false;
            that.data.useful_count+=1;
          }
          else{
            that.add_click=false;
            that.dec_click=true;
            that.data.useless_count+=1;
          }
        },
        fail(err){
          that.add_click=false;
          that.dec_click=false;
        }
      })
    },
    methods:{
      add(){
        var that=this;
        if (!this.add_click){
          if (this.dec_click){
            this.data.useless_count-=1;
          }
          this.dec_click=false;
          this.add_click=true;
          this.data.useful_count+=1;
          wx.setStorage({
            key:that.data.id,
            data:1
          })
        }
      },
      dec(){
        var that=this;
        if (!this.dec_click){
          if (this.add_click){
            this.data.useful_count-=1;
          }
          this.add_click=false;
          this.dec_click=true;
          this.data.useless_count+=1;
          wx.setStorage({
            key:that.data.id,
            data:0
          })
        }
      }
    }
  }
</script>

<style>
  #comment{
    padding-left: 12rpx;
    padding-right: 12rpx;
  }
  .title h1{
    font-size:42rpx;
    letter-spacing: 2rpx;
    font-weight: bold;
    line-height: 80rpx;
    text-align: center;
  }
  .ava_info{
    width: 100%;
    height: 100rpx;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    position: relative;
    flex-wrap: wrap;
  }
  .ava_info img{
    margin-left: 10rpx;
    width: 60rpx;
    height: 60rpx;
  }
  .ava_info span{
    font-size: 32rpx;
    padding-left: 10rpx;
  }
  .ava_info i{
    color: #999;
  }
  .list i{
    padding-top: 10rpx;
    color: #999;
    width: 100%;
    font-size: 28rpx;
  }
  .Spoiler{
    border-left: 8rpx solid #999;
    height: 70rpx;
  }
  .Spoiler p{
    line-height: 70rpx;
    font-size: 32rpx;
    color: #999;
    padding-left: 16rpx;
  }
  .list{
  }
  .list p{
    line-height:54rpx;
    font-size:30rpx;
    color: #111;
    font-family: Arial, Helvetica, sans-serif;
    word-wrap: break-word;
    white-space: pre-wrap;
  }
  .btns button{
    width: 34%;
    background:rgb(255,255,255);
    display: inline-block;
    border: 4rpx solid black;
   font-size: 30rpx;
    height: 90rpx;
    line-height: 90rpx;
    color: black;
  }
  .btns{
    padding: 16rpx 0 26rpx;
    display: flex;
    justify-content: center;
  }
  .active_btn{
    background: pink !important;
  }
</style>
