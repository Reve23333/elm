<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img width="64" height="64" :src="seller.avatar" /> <!--头像是可变的数据，所以就要加个v-bind绑定-->
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span><!-- 行级标签-->
          <span>{{seller.name}}</span>
        </div>
        <div class="discription">
          {{seller.description}}/{{seller.deliveryTime}}分送达
        </div>
        <div v-if="seller.supports"  class="supports">
          <!--要相应的图标与 数据一一对应  无需把数据定死  从classMap里拿到type：0、1..找出类名的哪一个-->
          <span :class="classMap[seller.supports[0].type]"></span>
          <span>{{seller.supports[0].description}}</span>
        </div>
      </div>
       <div class="count-wrapper" v-if="seller.supports">
         <span class="count">{{seller.supports.length}}个</span>
         <span class="gt">></span>
       </div>
    </div>
    <div @click="showDetail" class="bulletin-wrapper">
      <!-- <span class="gg"></span> -->
      <span class="gg"></span>
       {{seller.bulletin}}
      <span class="gt"></span>
    </div>
    <div class="bk">
      <img width="100%" height="100%" :src="seller.avatar"/>
    </div>
    <!--不能直接出来-->
    <div v-show="detailShow" class="detail">
      <div class="detail-wrapper clearfix">
        <div class="detail-main">
          <div class="detail-header">{{seller.name}}</div>
          <star :score="score" class="star"></star><!--不能直接当成一个标签来直接设置样式-->
          <div class="detail-discount">
            <div class="detail-discount-wrapper">
               <p></p>
               <span class="detail-discount-text">优惠信息</span>
               <p></p>
            </div>
            <div class="count-sum">
              <div v-for="(item,index) in seller.supports" :key='index'> 
                <span  :class="classMap[item.type]"></span>
                <span class="span2">{{item.description}}</span>
              </div>
            </div>
            <div class="detail-discount-wrapper">
              <p></p>
              <span class="detail-discount-text">商家公告</span>
              <p></p>
            </div>
            <div class="detail-discount-bulletin">{{seller.bulletin}}</div>
          </div>
        </div>
      </div>
      <div @click="btnClose" class="detail-close"><i class="iconfont" style="font-size:20px">&#xe71d;</i></div>
    </div>
  </div>
</template>

<script>
  import star from '../star/star.vue'
  export default{
    props:{//父——>子传递数据
      seller:{}
    },
    data(){
      return{
        score:3.9,
        detailShow:false,
        classMap:[]
      };
    },
    mounted() {//挂载
      this.classMap=['decrease','discount','invoice','special','guarantee'];//数组 类名的数组
    },
    methods:{
      showDetail(){
        this.detailShow=true;
      },
      btnClose(){
        this.detailShow=false;
      }
    },
    components:{
      star
    }
  }
</script>

<style>
  .header{
    color:#fff;
    position: relative;
    background: rgba(7,17,27,0.5);
  }
   .header .content-wrapper{
    padding: 24px 12px 18px 24px;
    font-size: 0;/*avatar父元素 与其父元素还有间距便设font-size */
    position: relative;
  }
  .header .avatar{
    display: inline-block;
  }
  .header .content{
     display: inline-block;
     margin-left: 16px;
  }
  .header .brand{
    display: inline-block;
    width: 30px;
    height: 18px;
    background: url('./img/brand@2x.png');
    background-repeat: no-repeat;
    background-size: 100%;
  }
  .header .title{
    font-size: 16px;/*子元素寄存在父元素中,父元素为0*/
    font-weight: bold;
    line-height: 18px;
    margin-bottom: 8px;
  }
  .header .discription{
    font-size: 12px;
    font-weight: 200;
    line-height: 12px;
    margin-bottom: 10px;
  }
  .header .supports{
    font-size: 10px;
  }
  .header .decrease{
    display: inline-block;
    width: 12px;
    height: 12px;
    background: url('./img/decrease_1@2x.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
  .header .discount{
    display: inline-block;
    width: 12px;
    height: 12px;
    background: url('./img/discount_1@2x.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
  .header .invoice{
    display: inline-block;
    width: 12px;
    height: 12px;
    background: url('./img/invoice_1@2x.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
  .header .special{
    display: inline-block;
    width: 12px;
    height: 12px;
    background: url('./img/special_1@2x.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
  .header .guarantee{
    display: inline-block;
    width: 12px;
    height: 12px;
    background: url('./img/guarantee_1@2x.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
  .header .count-wrapper{
    position: absolute;/*绝对定位* 因此父元素相对定位*/
    right: 12px;
    bottom: 18px;
    height: 24px;
    width:50px;
    paddind:0 8px;
    line-height: 24px;
    font-size: 10px;
    font-weight: 200;
    background: rgba(0,0,0,0.2);
    border-radius:24px;
    text-align:center;
  }
  .header .gt{
    margin-left: 2px;
  }
  .header .bulletin-wrapper{
    height: 28px;
    background: rgba(7,17,27,0.2);
    overflow: hidden;/*超出部分隐藏*/
    white-space: nowrap;/*规定段落中的文本不进行换行 */
    text-overflow: ellipsis;/*ellipsis：显示省略符号来代表被修剪的文本。*/
    width: 100%;/*需要配合宽度来使用*/
    font-size: 10px;
    font-weight: 200;
    line-height: 28px;
  }
  .header .bulletin-wrapper .gg{
    display:inline-block;
    width:24px;
    height:12px;
    line-height:12px;
    background:url("./img/bulletin@2x.png") no-repeat;
    background-size:100% 100%;
  }
  .header .bulletion{
    /* display: inline-block; */
    overflow: hidden;/*超出部分隐藏*/
    white-space: nowrap;/*规定段落中的文本不进行换行 */
    text-overflow: ellipsis;/*ellipsis：显示省略符号来代表被修剪的文本。*/
    width: 100%;/*需要配合宽度来使用*/
    font-size: 20px;
    font-weight: 200;
    line-height: 28px;
  }
  .header .bk{
    position: absolute;/*根据查出的商家而定，所以直接在头部再加一层  绝对定位 外容器相对*/
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    filter: blur(10px);/*过滤器模糊*/
  }
  /* 设置遮罩层 */
  .header .detail{
    position:fixed;
    z-index:1;
    top:0;
    left:0;
    width:100%;
    height:100%;
    background:rgba(7,17,27,.8);
    overflow: auto;
  }
  .header .detail .detail-header{
    font-size:18px;
    font-weight: 350;
    text-align:center;
    margin-top:64px;
  }
  .header .detail-main .star{
    text-align:center;
  }
  .header .detail-main .star span{
    margin:12px 0;
    padding:0 12px;
  }
  .header .detail-discount-wrapper{
    height: 30px;
    line-height: 30px;
    font-size: 24px;
    text-align: center;
  }
  .header .detail-discount-wrapper p{
    display: inline-block;
    width: 112px;
    border: 1px solid rgba(255,255,255,.2);
    margin-bottom:4px;
  }
  .header .detail-discount .detail-discount-text{
    font-size:18px;
    font-weight:350px;
    color:rgb(255,255,255);
    line-height:14px;
  }
  .header .detail-discount .count-sum{
    font-size:12px;
    display:flex;
    flex-direction:column;
    margin:0 0 18px 46px;
  }
  .header .detail-discount .count-sum div{
    flex:-1;
    margin:12px 0;
    font-size:0;
  }
  .header .detail-discount .count-sum div .span2{
    font-size:12px;
    margin-left:6px;
  }
  .detail-discount .detail-discount-bulletin{
    font-size:12px;
    font-weight:100;
    line-height:24px;
    padding:24px 48px;
  }
  .header .detail-main{
    margin-top: 64px;
    padding-bottom: 64px;
  }
  .header .detail-close{
    margin: -64px 50% 0 ;
    display:block;
  }
  /* .detail .detail-close{
    position:absolute;
    bottom:64px;
    left:50%;
    font-size:40px;
    /* border:1px solid red; */
    /* margin: 10px auto 0 auto; */
    /* padding-bottom:50px; */
    /* display:inline-block;
    text-align:center;/*  

  }
  /* .clearfix ::after{
    display: block;
    content: ".";
    height: 0;
    clear: both;
    visibility: hidden;
  } */
  /* .header .detail{
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background: rgba(7,17,27,0.8);
  }
  .header .detail-wrapper{
    min-height: 100%;
    width: 100%;
    padding: 64px 36px;
  }
  .header .detail-main{
    margin-top: 64px;
    padding-bottom: 64px;
  }
  .header .detail-close{
    margin: -64px auto 0 auto ;
  
  }
  .clearfix ::after{
    display: block;
    content: ".";
    height: 0;
    clear: both;
    visibility: hidden;
  }
   .header .detail-header{
     margin: 64px 0 16px 0;
     font-size: 16px;
     font-weight: 350;
     color: rgb(255,255,255);
     line-height: 16px;
     text-align: center;
   }
   .header .detail-star{
     height: 24px;
     margin-bottom: 28px;
   }
    .header .detail-discount{
     margin: 0 36px 0 36px;
     text-align: center;

   }
   .header .detail-discount-wrapper{
       height: 30px;
          line-height: 30px;
          font-size: 24px;
          text-align: center;
   }
   .header .line{
     display: inline-block;
         width: 150px;
         border: 1px solid black;
   }
   .header .detail-discount-text{
      color: black;
         vertical-align: middle;
         vertical-align: -20%;
         margin: 0 30px;
          display: inline-block;
   } */

</style>
