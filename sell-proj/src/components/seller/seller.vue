<template>
  <div class="seller">
    <div class="seller-title">
      <p class="title-name">{{seller.name}}</p>
      <div class="title-score">
        <span class="user-star"><star :score="score"></star></span>
        <span class="number">(661) 月售{{seller.sellCount}}单</span>
      </div>
      <div class="heart">
        <div class="favorite" @click="store"><span class='iconfont' :class="{store:activeStore}">&#xe602;</span><p>{{stored}}</p></div>
      </div>
    </div>
    <div class="deli"></div>
    <div class="seller-server">
      <div class="delivery-money">
        <p class="minPrice01">起送价</p>
        <p class="minPrice02">{{seller.minPrice}}<a>元</a></p>
      </div>
      <div class="server-money">
        <p class="deliveryPrice01">商家配送</p>
        <p class="deliveryPrice02">{{seller.deliveryPrice}}<a>元</a></p>
      </div>
      <div class="server-time">
        <p class="deliveryTime01">平均配送时间</p>
        <p class="deliveryTime02">{{seller.deliveryTime}}<a>元</a></p>
      </div>
    </div>
    <div class="division"></div>
    <div class="notice">
      <div class="notice-title">公告与活动</div>
      <div class="notice-content">{{seller.bulletin}}</div>
    </div>
    <div class="count-sum">
      <div v-for="(item,index) in seller.supports" :key='index'> 
        <span :class="classMap[item.type]"></span>
        <span class="description">{{item.description}}</span>
      </div>
    </div>
    <div class="division"></div>
    <div class="seller-photo">
      <p>商家实景</p>
      <span class="spann1">
      <div v-for="(itm,inx) in seller.pics" :key="inx" class="photo-detail">
        <img :src="itm">
      </div> 
      </span>
    </div>
    <div class="division"></div>
    <div class="seller-info">
      <p>商家信息</p>
      <div class="division_02"></div>
      <ul v-for="(ite,a) in seller.infos" :key="a">
        <li>{{ite}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
  import star from '../star/star.vue'
  export default {
  data(){
    return{
      score:3.9,
      classMap:[],
      activeStore:false
    };
  },
  mounted() {//挂载
      this.classMap=['decrease','discount','special','invoice','guarantee'];//数组 类名的数组
      // this.seller=this.$store.state.seller
  },
  computed:{
    seller(){
      return this.$store.state.seller
    },
    stored(){
      return this.activeStore?'已收藏':'未收藏'
    }
  },
  methods:{
    store(){
      this.activeStore=!this.activeStore
    }
  },
    components:{
    star
  }
}
</script>

<style>
.store{
  color:rgb(240,20,20);
}
.seller{
	overflow:auto;
  height:500px;
}
.seller::-webkit-scrollbar{
	display:none;
}
.seller-title{
  /* border:1px solid red; */
  
  margin-left:18px;
  margin-top:18px;
  position:relative;
}
.seller-title .title-name{
  font-size:14px;
  color:rgb(7,17,27);
  line-height:14px;
  /* border:1px solid green; */
}
.seller-title .title-score{
  display:flex;
}
.seller-title .title-score .user-star{
  background-size:5px 10px;
}
.seller-title .title-score .number{
  font-size:10px;
  color:rgb(77,85,93);
  line-height:18px;
}
.seller-title .heart{
  /* border:1px solid black; */
  position:absolute;
  right:18px;
  top:0;
  text-align:center;
}
.seller-title .heart{
  font-size:24px;
  line-height:24px;
}
.seller-title .heart p{
  font-size:10px;
  color:rgb(77,85,93);
  line-height:10px;
}
.seller .deli{
  border-bottom:1px solid rgba(7,17,27,0.1);
  margin-left:5%;
  width:90%;
  height:18px;
  display:inline-block;
}
.seller .seller-server{
  display:flex;
  /* width:100%; */
  text-align:center;
  margin-left:5%;
  margin-bottom:18px;
}
.seller .seller-server .delivery-money,
.seller .seller-server .server-money,
.seller .seller-server .server-time{
  text-align:center;
  margin-top:18px;
  padding:0 40px;
}
.seller .seller-server .delivery-money,
.seller .seller-server .server-money{
  border-right:1px solid rgba(7,17,27,0.1);
}
.seller .seller-server .delivery-money .minPrice01,
.seller .seller-server .server-money .deliveryPrice01,
.seller .seller-server .server-time .deliveryTime01{
  font-size:10px;
  color:rgb(147,153,159);
  line-height:10px;
}
.seller .seller-server .delivery-money .minPrice02,
.seller .seller-server .server-money .deliveryPrice02,
.seller .seller-server .server-time .deliveryTime02{
  font-size:24px;
  font-weight:100;
  color:rgb(7,17,27);
  line-height:24px;
}
.seller .seller-server .delivery-money .minPrice02 a,
.seller .seller-server .server-money .deliveryPrice02 a,
.seller .seller-server .server-time .deliveryTime02 a{
  font-size:10px;
}
.seller .division{
  width:100%;
  height:18px;
  background:rgba(147,153,159,0.1);
  border-top:1px solid rgba(7,17,27,0.1); 
  border-bottom:1px solid rgba(7,17,27,0.1);
}
.seller .notice{
  width:90%;
  margin-top:18px;
  margin:18px auto 0;
  border-bottom:1px solid rgba(7,17,27,0.1);
  padding-bottom:16px;
}
.seller .notice .notice-title{
  font-size:14px;
  color:rgb(7,17,27);
  margin-left:-4px;
}
.seller .notice .notice-content{
  font-size:12px;
  font-weight:100;
  color:rgb(240,20,20);
  line-height:24px;
  margin-top:8px;
  margin-left:12px;
  margin-right:12px;
}
.seller .decrease{
  display: inline-block;
  width: 16px;
  height: 16px;
  background: url('../header/img/decrease_1@2x.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.seller .discount{
  display: inline-block;
  width: 16px;
  height: 16px;
  background: url('../header/img/discount_1@2x.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.seller .invoice{
  display: inline-block;
  width: 16px;
  height: 16px;
  background: url('../header/img/invoice_1@2x.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.seller .special{
  display: inline-block;
  width: 16px;
  height: 16px;
  background: url('../header/img/special_1@2x.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.seller .guarantee{
  display: inline-block;
  width: 16px;
  height: 16px;
  background: url('../header/img/guarantee_1@2x.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.seller .count-sum{
  margin-top:18px;
  font-size:0;
  width:90%;
  margin-left:7%;
  margin-bottom:16px;
}
.seller .count-sum .description{
  font-size:12px;
  font-weight:100;
  color:rgb(7,17,27);
  display:inline-block;
  margin-left:6px;
  line-height:18px;
} 
.seller .division_02{
  margin-top:18px;
  width:90%;
  margin-left:5%;
  border-top:1px solid rgba(7,17,27,0.1);
}
.seller-photo{
  margin-left:18px;
}
.seller-photo p{
  margin-top:18px;
  font-size:14px;
  color:rgb(7,17,27);
}
.seller-photo .spann1{
  display:flex;
  overflow:auto;
  margin-top:12px;
}
.seller-photo .spann1::-webkit-scrollbar{
  display:none;
}
.seller-photo .spann1 img{
  width:120px;
  height:90px;
  padding:0 6px 18px;
}
.seller-info p{
  margin:18px 0 0 18px;
  font-size:14px;
}
.seller-info .division_02{
  width:90%;
  margin-left:5%;
  border-bottom:1px solid rgba(7,17,27,0.1);
}
.seller-info ul li{
  font-size:12px;
  font-weight:200;
  color:rgb(7,17,27);
  width:90%;
  margin-left:5%;
  padding:16px 0;
  border-bottom:1px solid rgba(7,17,27,0.1);
}
</style>