<template>
    <div>
      <div class="info_main">
        <h1>{{data.title}}
        <i>({{data.year}})</i>
        </h1>
        <div class="main">
          <img v-if="data.images" :src="data.images.medium" alt="">

          <div class="star">
            <span>豆瓣评分</span>
            <ul>
              <li v-for="(star,index) in starArr" :key="index" :class="star">
              </li>
            </ul>
            <span>播放源</span>
            <div v-if="data.videos" class="have_data">
              <b  v-for="(item,index) in data.videos" :key="index">{{item.source.name}}</b>
            </div>
            <div v-else class="have_noData">
              暂无资源
            </div>
          </div>

          <div class="list">
            <p v-if="data.directors"><i>导演: </i>{{data.directors[0].name}}</p>
            <p v-if="data.writers"><i>编剧: </i>{{data.writers[0].name}}</p>
            <p v-if="data.casts"><i>主演: </i>{{data.casts[0].name+"/"+data.casts[1].name}}</p>
            <p><i>类型: </i>{{data.genres}}</p>
            <p><i>制片国家/地区: </i>{{data.countries}}</p>
            <p><i>语言: </i>{{data.languages}}</p>
            <p v-if="data.pubdates"><i>上映日期: </i>{{data.pubdates[0]}}</p>
            <p><i>片长: </i>{{data.durations}}</p>
            <p v-if="data.aka"><i>又名: </i>{{data.aka[0]}}</p>

          </div>
        </div>
      </div>

      <div class="plot">
        <h2>{{data.title}}的剧情简介 · · · · · ·</h2>
        <p>{{data.summary}}</p>
      </div>

      <div class="performer">
        <h2>{{data.title}}的演职员 · · · · · ·</h2>
        <ul>
          <li v-for="(item,index) in data.casts" :key="index">
            <img :src="item.avatars.medium" alt="">
            <span>{{item.name}}</span>
            <span>{{item.name_en}}</span>
          </li>
        </ul>
      </div>

      <div class="pics">
        <h2>{{data.title}}的图片 · · · · · · </h2>
        <!--<ul>-->
          <!--<li>-->
            <!--<img src="/static/images/2.jpg" alt="">-->
          <!--</li>-->
          <!--<li>-->
            <!--<img src="/static/images/2.jpg" alt="">-->
          <!--</li>-->
          <!--<li>-->
            <!--<img src="/static/images/2.jpg" alt="">-->
          <!--</li>-->
          <!--<li>-->
            <!--<img src="/static/images/2.jpg" alt="">-->
          <!--</li>-->
          <!--<li>-->
            <!--<img src="/static/images/2.jpg" alt="">-->
          <!--</li>-->
        <!--</ul>-->
        <Swiper id="swiper" indicator-dots  indicator-color="purple" indicator-active-color="pink">
          <swiper-item v-for="(item,index) in data.photos" :key="index">
            <img  :src="item.image" alt="">
          </swiper-item>
        </Swiper>
      </div>
    </div>
</template>

<script>
  var Fly=require("flyio/dist/npm/wx")
  var fly=new Fly
  export default {
    name: 'index',
    data(){
      return {
        id:0,
        data:{}
      }
    },
    onShareAppMessage(res){
      console.log(res.from)
      return{
      }
    },
    mounted(){
      this.id=this.$mp.query.id;
      var that=this;
      fly.post("https://douban.uieee.com/v2/movie/subject/"+this.id)
        .then(function (response) {
          that.data=response.data;
          wx.setNavigationBarTitle({
            title: that.data.title
          })
          console.log(that.data)
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    computed: {
      starArr () {
        if (typeof this.data.rating==="undefined"){
         return 0;
        }
        var arr = [];
        var score = this.data.rating.average/2;
        var intScore=Math.floor(score)
        for (var i=0;i<intScore;i++){
          arr.push("on")
        }
        if (score-intScore>=0.5){
          arr.push("half")
        }
        while (arr.length<5){//全星和半星都加完了还不够就加灰星
          arr.push("off")
        }
        return arr;
      }
    }
  }
</script>

<style>
  .info_main{
    padding-top: 20rpx;
    padding-left: 16rpx;
  }
  .info_main h1{
    font-size: 50rpx;
  }
  .info_main h1 i{
    color: #888;
    display: inline;
  }
  .info_main img{
    width: 260rpx;
    height: 400rpx;
  }
  .main{
    padding-top: 20rpx;
  }
  .main .list p{
    font-size: 30rpx;
  }
  .main .list p i{
    color: #666;
    display: inline;
  }
  .star{
    margin-top: 50rpx;
    float: right;
    padding-right: 136rpx;
    padding-left: 20rpx;
    border-left: 1rpx solid rgba(225,225,225,1);
    padding-bottom: 30rpx;

  }
  .star span{
    font-size: 30rpx;
    color: #9b9b9b;
  }
  .star ul{
    margin-top: 10rpx;
    margin-bottom: 10rpx;
  }
  .star ul li{
    float: left;
    width: 26rpx;
    height: 26rpx;
  }
  .have_data b{
    color: #007722;
    font-size: 28rpx;
  }
  .have_noData{
    font-size: 28rpx;
  }
  .on{
    /*background:url("/static/images/star_on.png") no-repeat;
    在wxss中不能用本地路径的照片作背景。
    */
    background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC0AAAAsCAYAAADxRjE/AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NTRGNkRGNkM2QjgyMTFFNkFFQjVFRkIyNzZERjNFOEQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NTRGNkRGNkQ2QjgyMTFFNkFFQjVFRkIyNzZERjNFOEQiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo1NEY2REY2QTZCODIxMUU2QUVCNUVGQjI3NkRGM0U4RCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo1NEY2REY2QjZCODIxMUU2QUVCNUVGQjI3NkRGM0U4RCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PqM4pwoAAALTSURBVHja1Jk9aBRBFMd3DyVERQtzagyiGMWgQVEEE3KEFIIi2hxiFwiC60fa1GlMm/r8aFJYiZAmiBamsjhBEMEmYEQ5MNHEQvEzCY7/2fsHLsvdZnZ3Xm4c+DG7s7Oz/3v35r2ZXV/d9aTKTdal2F6BSjywLyj6Detu26JzQoIHwDEyYHtwKdHDDY6tFAn32As+gE08XwH7wUeX3SOoEezxOHDZ0ptp5fZI+xytveyipYt1BHtsK7o6EW+lvNY00Toe98dc7183ZjdB9LClPhs2EbczpG1dp98PhsRvLkzEIQPBHvsMueAefs3iyHQh5TfDPfRD86ANFEDSUa6D52ARLMBFVFrRW8BusIuC2imqtm0P67xF1/obCq8yz/oz+MQfNbemLVA/tejDOHkG9nn/R6msWvoIeAIOOC74PThf6x76r38MTjoq+BW4APeYj07EbeAROOeY4KfgMgR/rxfydOMlMOGQ4IlQEwU3itN6+XgVjDkgeCzUEqjlJHH6GrgjuC2LC4M3IPZ+2uRyETwErRsk+Be4AsFTWTPiGTDFZCNZFkMjBeqFrTR+iLG8U0jwrI7BEPzW9tojz1h+2rLgl4zBCxKrPD1oScDKJVPBaZemvQKiE42ZRnRBQHSiMZP69E7OcInSBhf5ImHpHsFw1yPlHgVB0QUp0X2CovskfFq/p/uaIJ3PsjZNRjp974gujrJa+pSh4CVw26u+Term8ZLBfa18hlX3MPn7psFxMAp+k1G2TdtykSSi4xKA3ikPgrNgps71GV4bZN9MSSaXcXYrvvPoAg943qgo9uniPSptBDGdiAdrJtZqeR0u1D2vnCEu6w3GiUh7JybjOxuW7o3sI0e40it76UuZY4xwTGMXySV0jUlwFIx71Q9AWcsKrDrOMSdNXcRUdAd36foTRMV6WglUBRT5jA5bPt0C/ojkwej76Xt+C9pin/VPgAEA+uC+HhbvvDEAAAAASUVORK5CYII=") no-repeat;
    background-size: cover;
  }
  .off{
    background:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC0AAAAsCAYAAADxRjE/AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MkMwOTcxNjU2QjgzMTFFNkFFQjVFRkIyNzZERjNFOEQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MkMwOTcxNjY2QjgzMTFFNkFFQjVFRkIyNzZERjNFOEQiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo1NEY2REY3MjZCODIxMUU2QUVCNUVGQjI3NkRGM0U4RCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDoyQzA5NzE2NDZCODMxMUU2QUVCNUVGQjI3NkRGM0U4RCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PigKqswAAAKoSURBVHja7JnPS1RRFMffDGPMTGEWw/R0EbZwwFeLSggXtWsR9E+0cuV/Yxvb1L6FE4pEuBB0IWElEqNoCxmixVhgo2iDUn1PnInLy3md+7xH74AHvrx5c3995r5z7z3nTWZi8nmgZBFfa0mVxseeWHecC/TspgQ6jWWVgAegK6yBboGOOnz2FroIDRr3g/yd19DDsX6z/J230J0Ah12O5Rr6RgdXKHKZl9BRyrIzg74K9SeU93Mdr6AjR3VODfoCVBHUq3BdL6ArwpAgJ/xxpwIdKdV1Dl3g2IL24D6Ldn3chtoWnj57YT1wxghNcwxCyvPeal4LsfKMo6f0C/oBHRii+/3Y9U8ZQtkjgr6Mm8fQpaA7bI/c4zs0C+12ATAxzrZX/A70CnoElTwF/gq9hnvsmwuRfGca+uwhMDFNE/Bxu8ch/RpowyPgDZ7hw6Qc8Sc0Tw4P3T1j4PfQcjz5TTrFlhn8gcPtzWYbXADseppsfJ19/aFy5m7aETQH4PpJTkRqPMMbvLbRGDNJwDbHeAOqQk1FYOq7CuCGy9ijyeDbCsDbDCyalGyKx1dTgK4BWOx+aaK8awrQVn2mgQ4VoENN6Lxl7CyOsRFX57Wgy4q7R1kLOlSEDs+hjbo2sXbT8jAqwa9FPDbxRElYn6LEFegD39+BbgsmKMdjNFxCSx7fF2iRMyEzWvwE3Q/+/69A6Bo6aXVTprwEbXYo3+Ggawga5Yw+9Q7iYqbXoLdQS9DHJkeN94Lj32OHLhdib/Dve+dvHEAtCIHb1uI2Ve7DtCIWY6+rmS7H8sh30EdedGmNfHcKugWNQD3GWE0XM91+bFvQS2j1hMB/dxpEd6vc55bURaQzfZGz9LrGqQJwykXfwDWuB4I/laQzPacFHIOv81iJ9luAAQDJc5t9CPDJEAAAAABJRU5ErkJggg==") no-repeat;
    background-size: cover;
  }
  .half{
    background:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC0AAAAsCAYAAADxRjE/AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MkMwOTcxNkQ2QjgzMTFFNkFFQjVFRkIyNzZERjNFOEQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MkMwOTcxNkU2QjgzMTFFNkFFQjVFRkIyNzZERjNFOEQiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDoyQzA5NzE2QjZCODMxMUU2QUVCNUVGQjI3NkRGM0U4RCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDoyQzA5NzE2QzZCODMxMUU2QUVCNUVGQjI3NkRGM0U4RCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PktRSmsAAAYDSURBVHja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") no-repeat;
    background-size: cover;
  }
  .plot,.performer,.pics{
    padding-top: 20rpx;
    padding-left: 16rpx;
    padding-right: 16rpx;
  }
  .plot h2,.performer h2,.pics h2{
    font-size: 36rpx;
    color: #007722;
  }
  .plot p{
    font-size: 28rpx;
    line-height: 40rpx;
    text-indent: 28rpx;
  }
  .performer ul {
    display: flex;
    flex-wrap: wrap;
  }
  .performer ul li{
    border-bottom: 1rpx solid #ddd;
    background: rgba(245,245,245,0.5);
    width: 50%;
    height: 440rpx;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    align-items: center;
  }
  .performer ul li:nth-of-type(2n+1){
    border-right: 1rpx solid #ddd;
  }
  .performer ul li img{
    margin-top: 30rpx;
    border: 1rpx solid black;
    width: 200rpx;
    height: 300rpx;
    border-radius: 2rpx;
  }
  .performer ul li span{
    font-size: 32rpx;
    line-height: 50rpx;
    max-width: 100%;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap
  }
  /*.pics ul li{*/
    /*width: 60%;*/
    /*height: 400rpx;*/
    /*margin-top: 12rpx;*/
    /*background: red;*/
    /*box-sizing: border-box;*/
    /*border: 1rpx solid black;*/
  /*}*/
  /*.pics ul li:nth-of-type(2n){*/
    /*float: right;*/
    /*margin-right: 40rpx;*/
  /*}*/
  /*.pics ul li:nth-of-type(2n+1){*/
    /*float: left;*/
    /*margin-left: 40rpx;*/
  /*}*/
  /*.pics ul li img{*/
    /*width: 100%;*/
    /*height: 100%;*/
  /*}*/
  #swiper{
    margin: 20rpx 0;
    width: 100%;
    height: 500rpx;
  }
  #swiper swiper-item{
    width: 100%;
  }
  #swiper img{
    width: 100%;
    height: 100%;
  }
</style>
