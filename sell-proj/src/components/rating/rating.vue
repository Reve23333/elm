<template>
  <div class="rating">
	<div class="rating-title">
	   <div class="rating-left">
		   <h3 class="score">3.9</h3>
		   <h5 class="score_text">综合评分</h5>
		   <h6 class="rank">高于周边商家</h6>
	   </div>
	   <div class="line"></div>
	   <div class="rating-right">
		   <div class="attitude">服务态度<star :score="seller.serviceScore" class="star1"></star><span class="star-text" style="color:rgb(255,153,0);font-size:12px;margin-left:12px">{{seller.serviceScore}}</span></div>
		   <div class="shopping">商品评分<star :score="seller.foodScore" class="star2"></star><span class="star-text" style="color:rgb(255,153,0);font-size:12px;margin-left:12px">{{seller.foodScore}}</span></div>
		   <div class="time">送达时间<span style="margin-left:12px;color:rgb(147,153,159)">{{seller.deliveryTime}}分钟</span></div>
	   </div>
	</div>
	<div class="title-bottom"></div>
    <div class="satisfaction">
		<div class="all" @click='showAll'>全部{{all}}</div>
		<div class="satisfied" @click='showSatisfied'>满意{{satisfied}}</div>
		<div class="dispointed" @click='showDispointed'>不满意{{dispointed}}</div>
	</div>
	<div class="choose">&nbsp;<i class="iconfont" @click="onlyCon" :class='{onlyCon:onlycon}'>&#xe659;</i><span>只看有内容的评价</span></div>
	<div class="rating-detail">   
		<div v-for='(item,index) in ratings' :key="index" class="detail">
			<div class="detail-every">
                <img class="detail-photo" :src="item.avatar">
				<div class="every-right"> 
					<p class="user-name">{{item.username}}</p>
				    <span class="user-score"><star :score="item.score" class="user-star"></star></span>
				    <span class="user-time">{{item.deliveryTime}}</span>
					<p class="user-text">{{item.text}}</p>
					<span v-for="(itm,inx) in item.recommend" :key="inx" class="user-like">{{itm}}</span>
				</div>
			</div>
	    </div>
    </div>
  </div>
</template>

<script>
const ERR_OK=0;
import star from '../star/star.vue'
export default {

	data(){
		return{
			onlycon:false,
			ratingType:0,
			active:'satisfied'
		}
	},
	computed:{
		ratings(){
			if(this.ratingType==0){
				return this.$store.state.ratings
			}else if(this.ratingType==1){
				return this.$store.state.ratings.filter(item=>{return item.rateType==0})
			}else if(this.ratingType==2){
				return this.$store.state.ratings.filter(item=>{return item.rateType==1})
			}else if(this.ratingType==3){
				return this.$store.state.ratings.filter(item=>{return item.text!==''})
			}
		},
		seller(){
			return this.$store.state.seller
		},
		all(){
			return this.$store.state.ratings.length
		},
		satisfied(){
			let satisfied=0
			for(let i=0; i<this.$store.state.ratings.length;i++){
				if(this.$store.state.ratings[i].rateType==0){
					satisfied++
				}
			}
			return satisfied
		},
		dispointed(){
			let dispointed=0
			for(let j=0;j<this.$store.state.ratings.length;j++){
				if(this.$store.state.ratings[j].rateType==1){
					dispointed++
				}
			}
			return dispointed
		}
	},
	mounted(){
		this.$http.get("http://localhost:1900/ratings").then((response)=>{
			if(response.data.errno==ERR_OK){
				this.$store.state.ratings=response.data.data;
			}
		});
	},
	components:{
	  star,
	},
	methods:{
		showSatisfied(){
			this.ratingType=1
			this.active='satisfied'
		},
		showDispointed(){
			this.ratingType=2
			this.active="didspointed"
		},
		showAll(){
			this.ratingType=0
		},
		onlyCon(){
			if(this.ratingType==3){
				this.ratingType=0
			}else{
				this.ratingType=3
				this.onlycon=!this.onlycon
			}
		}
	}
}
</script>

<style>
.rating .choose .onlyCon{
	color:green;
}
.rating{
	overflow:auto;
}
.rating::-webkit-scrollbar{
	display:none;
}
.rating-title{
	display:flex;
	width:100%;
	height:100px;
}
.rating-title .rating-left{
	text-align:center;
	width:138px;
	height:100px;
}
.rating-title .rating-left .score{
	font-size:24px;
	color:rgb(255,153,0);
	line-height:28px;
	margin-top:18px;
}
.rating-title .rating-left .score_text{
	font-size:12px;
	color:rgb(7,17,27);
	line-height:12px;
	top:12px;
	margin-top:6px;
}
.rating-title .rating-left .rank{
	font-size:10px;
	color:rgb(7,17,27);
	line-height:10px;
	margin-top:8px;
}
.rating-title .line{
    border-right:1px solid rgba(0,0,0,.2);
	height:70px;
	margin-top:16px;
}	
.rating-title .rating-right{
	margin-top:18px;
	display:inline-block;
	width:100%;
	
}
.rating-title .rating-right .attitude,
.rating-title .rating-right .shopping,
.rating-title .rating-right .time{
	display:flex;
	margin-left:24px;
	font-size:12px;
	color:rgb(7,17,27);
	line-height:18px;
}
.rating-title .rating-right .attitude .star1 span,
.rating-title .rating-right .shopping .star2 span{
	font-size:10px;
	display:inline-block;
	margin-left:12px;
	/* margin-top:1px; */
}
.title-bottom{
	width:100%;
	height:20px;
	border-top:1px solid rgba(147,153,159,0.2);
	border-bottom:1px solid rgba(147,153,159,0.2);
	background:rgba(147,153,159,0.1)
}
.satisfaction{
	display:flex;
	width:100%;
	height:72px;
	/* border-bottom:1px solid rgba(147,153,159,0.5); */
	/* line-height:72px; */
}
.satisfaction .all,
.satisfaction .satisfied,
.satisfaction .dispointed{
	background:rgb(0,160,200);
	display:inline-block;
	text-align:center;
	font-size:12px;
	color:#fff;
	width:55px;
	height:30px;
	line-height:30px;
	margin-top:18px;
	margin-left:20px;
}
.satisfaction .satisfied{
	background:rgba(0,160,200,0.5);
	color:black;
} 
.satisfaction .dispointed{
	background:rgba(147,153,159,0.2);
	color:black;
} 
.choose{
	width:100%;
	position:relative;
	padding:24px 0;
	/* height:72px;
	line-height:72px; */
	border-top:1px solid rgba(147,153,159,0.5);
	border-bottom:1px solid rgba(147,153,159,0.5);
}
.choose i{
	border-radius:50%;
	padding:1px;
	color:#fff;
	background:rgba(147,153,159,0.7);
}
.choose span{
	margin-left:5px;
	color:rgba(147,153,159,0.9)
}
.rating-detail{
	width:90%;
	margin-left:5%;
	height:230px;
	/* border:1px solid red; */
}
.rating-detail .detail .detail-photo{
	width:28px;
	height:28px;
	border-radius:50%;
}
.rating-detail .detail .detail-every{
	border-bottom:1px solid rgba(147,153,159,0.2);
	padding:10px;
	display:flex;
}
.rating-detail .detail .detail-every .every-right{
	margin-left:10px;
}
.rating-detail .detail .detail-every .every-right .user-name{
	font-size:10px;
	color:rgb(7,17,27);
}
.rating-detail .detail .detail-every .every-right .user-star{
	/* border:1px solid black; */
	display:inline-block;
}
.rating-detail .detail .detail-every .every-right .user-text, .user-time{
	font-size:12px;
	color:rgb(7,17,27);
	line-height:18px;
}
.rating-detail .detail .detail-every .every-right .user-like{
	border:1px solid grey;
	font-size:12px;
	margin-left:4px;
	padding:1px;
}
</style>